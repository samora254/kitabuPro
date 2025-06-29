
import { CurriculumFramework, Subject, Topic, Activity, Assessment } from '../constants/curriculum';

class CurriculumService {
  private static instance: CurriculumService;
  private curriculumData: Map<string, any> = new Map();
  private searchIndex: Map<string, string[]> = new Map();

  private constructor() {
    this.loadCurriculumData();
  }

  static getInstance(): CurriculumService {
    if (!CurriculumService.instance) {
      CurriculumService.instance = new CurriculumService();
    }
    return CurriculumService.instance;
  }

  private async loadCurriculumData() {
    try {
      // In a real implementation, you would load from multiple JSON files
      // For now, we'll simulate with the sample data
      const mathGrade8 = await import('../data/curriculum/mathematics-grade8.json');
      this.curriculumData.set('math-grade8-kenya', mathGrade8.default);
      this.buildSearchIndex();
    } catch (error) {
      console.error('Failed to load curriculum data:', error);
    }
  }

  private buildSearchIndex() {
    // Build a search index for quick content retrieval
    this.curriculumData.forEach((curriculum, key) => {
      const searchTerms: string[] = [];
      
      // Index subject and grade information
      searchTerms.push(curriculum.subject.name.toLowerCase());
      searchTerms.push(curriculum.grade.name.toLowerCase());
      
      // Index topics and their content
      curriculum.topics.forEach((topic: Topic) => {
        searchTerms.push(topic.name.toLowerCase());
        searchTerms.push(topic.description.toLowerCase());
        searchTerms.push(...topic.keyTerms.map((term: string) => term.toLowerCase()));
        
        // Index learning objectives
        topic.learningObjectives.forEach((obj: any) => {
          searchTerms.push(obj.description.toLowerCase());
        });
        
        // Index activities
        topic.activities.forEach((activity: Activity) => {
          searchTerms.push(activity.name.toLowerCase());
          searchTerms.push(activity.description.toLowerCase());
        });
      });
      
      this.searchIndex.set(key, searchTerms);
    });
  }

  getCurriculumBySubjectAndGrade(subjectId: string, gradeId: string): any | null {
    const key = `${subjectId}-${gradeId}-kenya`;
    return this.curriculumData.get(key) || null;
  }

  getTopicById(subjectId: string, gradeId: string, topicId: string): Topic | null {
    const curriculum = this.getCurriculumBySubjectAndGrade(subjectId, gradeId);
    if (!curriculum) return null;
    
    return curriculum.topics.find((topic: Topic) => topic.id === topicId) || null;
  }

  getActivitiesForTopic(subjectId: string, gradeId: string, topicId: string): Activity[] {
    const topic = this.getTopicById(subjectId, gradeId, topicId);
    return topic?.activities || [];
  }

  getAssessmentsForTopic(subjectId: string, gradeId: string, topicId: string): Assessment[] {
    const topic = this.getTopicById(subjectId, gradeId, topicId);
    return topic?.assessments || [];
  }

  searchCurriculum(query: string, subjectId?: string, gradeId?: string): any[] {
    const results: any[] = [];
    const searchTerm = query.toLowerCase();
    
    this.searchIndex.forEach((terms, key) => {
      if (terms.some(term => term.includes(searchTerm))) {
        const curriculum = this.curriculumData.get(key);
        if (curriculum) {
          // Filter by subject and grade if specified
          if (subjectId && curriculum.subject.id !== subjectId) return;
          if (gradeId && curriculum.grade.id !== gradeId) return;
          
          results.push(curriculum);
        }
      }
    });
    
    return results;
  }

  getAdaptationsForLearningStyle(
    subjectId: string, 
    gradeId: string, 
    topicId: string, 
    learningStyle: 'visual' | 'auditory' | 'kinesthetic'
  ): string[] {
    const activities = this.getActivitiesForTopic(subjectId, gradeId, topicId);
    const adaptations: string[] = [];
    
    activities.forEach(activity => {
      const adaptationKey = `${learningStyle}Learner` as keyof typeof activity.adaptations;
      const adaptation = activity.adaptations[adaptationKey];
      if (adaptation) {
        adaptations.push(adaptation);
      }
    });
    
    return adaptations;
  }

  getPrerequisites(subjectId: string, gradeId: string, topicId: string): string[] {
    const topic = this.getTopicById(subjectId, gradeId, topicId);
    return topic?.prerequisites || [];
  }

  getLearningObjectives(subjectId: string, gradeId: string, topicId: string): any[] {
    const topic = this.getTopicById(subjectId, gradeId, topicId);
    return topic?.learningObjectives || [];
  }

  getKeyTerms(subjectId: string, gradeId: string, topicId: string): string[] {
    const topic = this.getTopicById(subjectId, gradeId, topicId);
    return topic?.keyTerms || [];
  }

  // AI Integration helper methods
  getContentForAIContext(subjectId: string, gradeId: string, topicId?: string): string {
    const curriculum = this.getCurriculumBySubjectAndGrade(subjectId, gradeId);
    if (!curriculum) return '';
    
    let context = `Subject: ${curriculum.subject.name}\n`;
    context += `Grade: ${curriculum.grade.name}\n`;
    context += `Age Range: ${curriculum.grade.ageRange}\n\n`;
    
    if (topicId) {
      const topic = this.getTopicById(subjectId, gradeId, topicId);
      if (topic) {
        context += `Current Topic: ${topic.name}\n`;
        context += `Description: ${topic.description}\n`;
        context += `Key Terms: ${topic.keyTerms.join(', ')}\n`;
        context += `Learning Objectives:\n`;
        topic.learningObjectives.forEach((obj, index) => {
          context += `${index + 1}. ${obj.description}\n`;
        });
        context += `\nPrerequisites: ${topic.prerequisites.join(', ')}\n`;
      }
    } else {
      context += 'Available Topics:\n';
      curriculum.topics.forEach((topic: Topic, index: number) => {
        context += `${index + 1}. ${topic.name}: ${topic.description}\n`;
      });
    }
    
    return context;
  }
}

export default CurriculumService;
