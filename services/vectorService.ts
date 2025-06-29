
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';
import CurriculumService from './curriculumService';
import { Topic, Activity, LearningObjective } from '../constants/curriculum';

export interface VectorMetadata {
  subjectId: string;
  gradeId: string;
  topicId: string;
  contentType: 'topic' | 'activity' | 'objective' | 'assessment';
  difficulty: string;
  bloomsLevel?: string;
  estimatedHours?: number;
}

export class VectorService {
  private static instance: VectorService;
  private pinecone: Pinecone;
  private openai: OpenAI;
  private indexName = 'curriculum-content';

  private constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || ''
    });
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || ''
    });
  }

  static getInstance(): VectorService {
    if (!VectorService.instance) {
      VectorService.instance = new VectorService();
    }
    return VectorService.instance;
  }

  async initializeIndex() {
    try {
      const existingIndexes = await this.pinecone.listIndexes();
      const indexExists = existingIndexes.indexes?.some(index => index.name === this.indexName);

      if (!indexExists) {
        await this.pinecone.createIndex({
          name: this.indexName,
          dimension: 1536, // OpenAI embedding dimension
          metric: 'cosine',
          spec: {
            serverless: {
              cloud: 'aws',
              region: 'us-east-1'
            }
          }
        });
      }
    } catch (error) {
      console.error('Failed to initialize Pinecone index:', error);
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error('Failed to generate embedding:', error);
      return [];
    }
  }

  async indexCurriculumContent(subjectId: string, gradeId: string) {
    const curriculumService = CurriculumService.getInstance();
    const curriculum = curriculumService.getCurriculumBySubjectAndGrade(subjectId, gradeId);
    
    if (!curriculum) {
      console.error('Curriculum not found');
      return;
    }

    const index = this.pinecone.index(this.indexName);
    const vectors = [];

    // Index topics
    for (const topic of curriculum.topics) {
      const topicText = `${topic.name}. ${topic.description}. Key terms: ${topic.keyTerms.join(', ')}`;
      const embedding = await this.generateEmbedding(topicText);
      
      if (embedding.length > 0) {
        vectors.push({
          id: `${subjectId}-${gradeId}-${topic.id}`,
          values: embedding,
          metadata: {
            subjectId,
            gradeId,
            topicId: topic.id,
            contentType: 'topic',
            difficulty: topic.difficulty,
            estimatedHours: topic.estimatedHours,
            content: topicText
          } as VectorMetadata & { content: string }
        });
      }

      // Index learning objectives
      for (const objective of topic.learningObjectives) {
        const objectiveText = `Learning objective: ${objective.description}. Assessment criteria: ${objective.assessmentCriteria.join(', ')}`;
        const objEmbedding = await this.generateEmbedding(objectiveText);
        
        if (objEmbedding.length > 0) {
          vectors.push({
            id: `${subjectId}-${gradeId}-${topic.id}-obj-${objective.id}`,
            values: objEmbedding,
            metadata: {
              subjectId,
              gradeId,
              topicId: topic.id,
              contentType: 'objective',
              difficulty: topic.difficulty,
              bloomsLevel: objective.bloomsLevel,
              content: objectiveText
            } as VectorMetadata & { content: string }
          });
        }
      }

      // Index activities
      for (const activity of topic.activities) {
        const activityText = `Activity: ${activity.name}. ${activity.description}. Instructions: ${activity.instructions.join(' ')}`;
        const actEmbedding = await this.generateEmbedding(activityText);
        
        if (actEmbedding.length > 0) {
          vectors.push({
            id: `${subjectId}-${gradeId}-${topic.id}-act-${activity.id}`,
            values: actEmbedding,
            metadata: {
              subjectId,
              gradeId,
              topicId: topic.id,
              contentType: 'activity',
              difficulty: topic.difficulty,
              content: activityText
            } as VectorMetadata & { content: string }
          });
        }
      }
    }

    // Batch upsert vectors
    if (vectors.length > 0) {
      try {
        await index.upsert(vectors);
        console.log(`Indexed ${vectors.length} curriculum items for ${subjectId} Grade ${gradeId}`);
      } catch (error) {
        console.error('Failed to upsert vectors:', error);
      }
    }
  }

  async searchSimilarContent(
    query: string,
    options: {
      subjectId?: string;
      gradeId?: string;
      contentType?: string;
      difficulty?: string;
      topK?: number;
    } = {}
  ) {
    const queryEmbedding = await this.generateEmbedding(query);
    if (queryEmbedding.length === 0) return [];

    const index = this.pinecone.index(this.indexName);
    
    // Build filter based on options
    const filter: any = {};
    if (options.subjectId) filter.subjectId = options.subjectId;
    if (options.gradeId) filter.gradeId = options.gradeId;
    if (options.contentType) filter.contentType = options.contentType;
    if (options.difficulty) filter.difficulty = options.difficulty;

    try {
      const searchResponse = await index.query({
        vector: queryEmbedding,
        topK: options.topK || 10,
        filter: Object.keys(filter).length > 0 ? filter : undefined,
        includeMetadata: true
      });

      return searchResponse.matches || [];
    } catch (error) {
      console.error('Failed to search vectors:', error);
      return [];
    }
  }

  async getRecommendations(
    studentProgress: {
      completedTopics: string[];
      currentTopic?: string;
      learningStyle?: 'visual' | 'auditory' | 'kinesthetic';
      difficulty?: string;
    },
    subjectId: string,
    gradeId: string
  ) {
    // Create a query based on student's current progress
    const query = `Next learning topic for student who completed: ${studentProgress.completedTopics.join(', ')}`;
    
    const results = await this.searchSimilarContent(query, {
      subjectId,
      gradeId,
      contentType: 'topic',
      difficulty: studentProgress.difficulty,
      topK: 5
    });

    // Filter out already completed topics
    return results.filter(result => 
      !studentProgress.completedTopics.includes(result.metadata?.topicId as string)
    );
  }

  async enhanceAIContext(query: string, subjectId: string, gradeId: string): Promise<string> {
    // Search for relevant curriculum content
    const relevantContent = await this.searchSimilarContent(query, {
      subjectId,
      gradeId,
      topK: 3
    });

    let enhancedContext = `Student Query: ${query}\n\nRelevant Curriculum Content:\n`;
    
    relevantContent.forEach((match, index) => {
      enhancedContext += `${index + 1}. ${match.metadata?.content}\n`;
      enhancedContext += `   Difficulty: ${match.metadata?.difficulty}\n`;
      enhancedContext += `   Content Type: ${match.metadata?.contentType}\n\n`;
    });

    return enhancedContext;
  }
}

export default VectorService;
