import AsyncStorage from '@react-native-async-storage/async-storage';
import { Curriculum, Topic, Resource, StudentProgress, CurriculumRecommendation } from '@/constants/curriculum';
import { curricula } from '@/data/curriculum';

// Define types for curriculum data structure
export interface CurriculumSubStrand {
  id: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  learningExperiences: string[];
  keyInquiryQuestions: string[];
}

export interface CurriculumStrand {
  id: string;
  title: string;
  description: string;
  subStrands: CurriculumSubStrand[];
}

export interface Subject {
  id: string;
  name: string;
  grade: string;
  description: string;
  strands: CurriculumStrand[];
}

// Storage keys
const STUDENT_PROGRESS_KEY = 'kitabu_student_progress';
const CURRICULUM_DATA_KEY = 'kitabu_curriculum_data';

// Service functions
const CurriculumService = {
  // Get all available curricula
  getAllCurricula: (): Curriculum[] => {
    return curricula;
  },
  
  // Get curriculum by ID
  getCurriculum: (id: string): Curriculum | null => {
    const allCurricula = CurriculumService.getAllCurricula();
    return allCurricula.find(c => c.id === id) || null;
  },
  
  // Get curricula by subject and grade
  getCurriculaBySubjectAndGrade: (subject: string, grade: string): Curriculum[] => {
    const allCurricula = CurriculumService.getAllCurricula();
    return allCurricula.filter(c => 
      c.subject.toLowerCase() === subject.toLowerCase() && 
      c.grade.toLowerCase() === grade.toLowerCase()
    );
  },
  
  // Get topic by ID
  getTopic: (topicId: string): { topic: Topic, curriculum: Curriculum } | null => {
    const allCurricula = CurriculumService.getAllCurricula();
    
    for (const curriculum of allCurricula) {
      for (const unit of curriculum.units) {
        for (const topic of unit.topics) {
          if (topic.id === topicId) {
            return { topic, curriculum };
          }
        }
      }
    }
    
    return null;
  },
  
  // Get recommended resources for a topic based on learning style
  getRecommendedResources: (
    topicId: string,
    learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic'
  ): Resource[] => {
    const topicResult = CurriculumService.getTopic(topicId);
    if (!topicResult) return [];
    
    const { topic } = topicResult;
    
    // Filter resources by learning style
    return topic.resources.filter(resource => 
      resource.learningStyles.includes(learningStyle)
    );
  },
  
  // Get student progress
  getStudentProgress: async (userId: string): Promise<StudentProgress | null> => {
    try {
      const key = `${STUDENT_PROGRESS_KEY}_${userId}`;
      const progressJson = await AsyncStorage.getItem(key);
      return progressJson ? JSON.parse(progressJson) : null;
    } catch (error) {
      console.error('Error getting student progress:', error);
      return null;
    }
  },
  
  // Save student progress
  saveStudentProgress: async (progress: StudentProgress): Promise<void> => {
    try {
      const key = `${STUDENT_PROGRESS_KEY}_${progress.userId}`;
      await AsyncStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving student progress:', error);
      throw error;
    }
  },
  
  // Get personalized recommendations
  getPersonalizedRecommendations: async (
    userId: string,
    count: number = 3
  ): Promise<CurriculumRecommendation[]> => {
    try {
      // Get student progress
      const progress = await CurriculumService.getStudentProgress(userId);
      if (!progress) {
        // If no progress, recommend first topics from each curriculum
        const curricula = CurriculumService.getAllCurricula();
        const recommendations: CurriculumRecommendation[] = [];
        
        for (const curriculum of curricula) {
          if (curriculum.units.length > 0 && curriculum.units[0].topics.length > 0) {
            const topic = curriculum.units[0].topics[0];
            recommendations.push({
              topicId: topic.id,
              title: topic.title,
              description: topic.description,
              resources: topic.resources,
              reason: 'Recommended for beginners',
              relevanceScore: 1.0
            });
            
            if (recommendations.length >= count) break;
          }
        }
        
        return recommendations;
      }
      
      // Get completed topics
      const completedTopicIds = progress.completedTopics.map(ct => ct.topicId);
      
      // Get all topics
      const allTopics: { topic: Topic, curriculum: Curriculum }[] = [];
      const curricula = CurriculumService.getAllCurricula();
      
      for (const curriculum of curricula) {
        for (const unit of curriculum.units) {
          for (const topic of unit.topics) {
            allTopics.push({ topic, curriculum });
          }
        }
      }
      
      // Filter out completed topics
      const incompleteTopics = allTopics.filter(t => !completedTopicIds.includes(t.topic.id));
      
      // Simple recommendation logic (in a real app, this would be more sophisticated)
      const recommendations: CurriculumRecommendation[] = [];
      
      // If there are topics in the learning path, prioritize those
      if (progress.learningPath?.recommendedTopicIds) {
        for (const recTopicId of progress.learningPath.recommendedTopicIds) {
          const topicData = incompleteTopics.find(t => t.topic.id === recTopicId);
          if (topicData) {
            recommendations.push({
              topicId: topicData.topic.id,
              title: topicData.topic.title,
              description: topicData.topic.description,
              resources: topicData.topic.resources,
              reason: 'Recommended based on your learning path',
              relevanceScore: 0.9
            });
            
            if (recommendations.length >= count) break;
          }
        }
      }
      
      // If we still need more recommendations, add topics based on prerequisites
      if (recommendations.length < count) {
        // Find topics where prerequisites are completed
        for (const topicData of incompleteTopics) {
          if (recommendations.some(r => r.topicId === topicData.topic.id)) continue;
          
          const prereqsMet = !topicData.topic.prerequisites || 
            topicData.topic.prerequisites.every(p => completedTopicIds.includes(p));
          
          if (prereqsMet) {
            recommendations.push({
              topicId: topicData.topic.id,
              title: topicData.topic.title,
              description: topicData.topic.description,
              resources: topicData.topic.resources,
              reason: 'Ready to learn based on your progress',
              relevanceScore: 0.8
            });
            
            if (recommendations.length >= count) break;
          }
        }
      }
      
      // If we still need more, add random incomplete topics
      if (recommendations.length < count) {
        const remainingTopics = incompleteTopics.filter(t => 
          !recommendations.some(r => r.topicId === t.topic.id)
        );
        
        for (const topicData of remainingTopics) {
          recommendations.push({
            topicId: topicData.topic.id,
            title: topicData.topic.title,
            description: topicData.topic.description,
            resources: topicData.topic.resources,
            reason: 'Suggested for exploration',
            relevanceScore: 0.7
          });
          
          if (recommendations.length >= count) break;
        }
      }
      
      return recommendations;
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return [];
    }
  },
  
  // Mark topic as completed
  markTopicCompleted: async (
    userId: string,
    topicId: string,
    score?: number
  ): Promise<boolean> => {
    try {
      // Get student progress
      let progress = await CurriculumService.getStudentProgress(userId);
      
      if (!progress) {
        // Create new progress record
        const topicResult = CurriculumService.getTopic(topicId);
        if (!topicResult) return false;
        
        progress = {
          userId,
          curriculumId: topicResult.curriculum.id,
          completedTopics: [],
          completedAssessments: [],
          learningStylePreference: {
            visual: 25,
            auditory: 25,
            reading: 25,
            kinesthetic: 25
          },
          strengths: [],
          areasForImprovement: [],
          lastActivity: new Date().toISOString()
        };
      }
      
      // Check if topic is already completed
      const existingIndex = progress.completedTopics.findIndex(ct => ct.topicId === topicId);
      
      if (existingIndex >= 0) {
        // Update existing completion
        progress.completedTopics[existingIndex] = {
          topicId,
          completedAt: new Date().toISOString(),
          score,
          masteryLevel: score ? (score >= 90 ? 'mastered' : score >= 70 ? 'practicing' : 'learning') : 'learning'
        };
      } else {
        // Add new completion
        progress.completedTopics.push({
          topicId,
          completedAt: new Date().toISOString(),
          score,
          masteryLevel: score ? (score >= 90 ? 'mastered' : score >= 70 ? 'practicing' : 'learning') : 'learning'
        });
      }
      
      // Update last activity
      progress.lastActivity = new Date().toISOString();
      
      // Save progress
      await CurriculumService.saveStudentProgress(progress);
      
      return true;
    } catch (error) {
      console.error('Error marking topic as completed:', error);
      return false;
    }
  },
  
  // Record assessment completion
  recordAssessmentCompletion: async (
    userId: string,
    assessmentId: string,
    score: number,
    answers?: Record<string, any>
  ): Promise<boolean> => {
    try {
      // Get student progress
      let progress = await CurriculumService.getStudentProgress(userId);
      
      if (!progress) {
        // Cannot record assessment without existing progress
        return false;
      }
      
      // Check if assessment is already completed
      const existingIndex = progress.completedAssessments.findIndex(ca => ca.assessmentId === assessmentId);
      
      if (existingIndex >= 0) {
        // Update existing completion
        progress.completedAssessments[existingIndex] = {
          assessmentId,
          completedAt: new Date().toISOString(),
          score,
          answers
        };
      } else {
        // Add new completion
        progress.completedAssessments.push({
          assessmentId,
          completedAt: new Date().toISOString(),
          score,
          answers
        });
      }
      
      // Update last activity
      progress.lastActivity = new Date().toISOString();
      
      // Save progress
      await CurriculumService.saveStudentProgress(progress);
      
      return true;
    } catch (error) {
      console.error('Error recording assessment completion:', error);
      return false;
    }
  },
  
  // Update learning style preference
  updateLearningStylePreference: async (
    userId: string,
    preference: {
      visual?: number;
      auditory?: number;
      reading?: number;
      kinesthetic?: number;
    }
  ): Promise<boolean> => {
    try {
      // Get student progress
      let progress = await CurriculumService.getStudentProgress(userId);
      
      if (!progress) {
        // Create new progress record
        progress = {
          userId,
          curriculumId: '',
          completedTopics: [],
          completedAssessments: [],
          learningStylePreference: {
            visual: preference.visual || 25,
            auditory: preference.auditory || 25,
            reading: preference.reading || 25,
            kinesthetic: preference.kinesthetic || 25
          },
          strengths: [],
          areasForImprovement: [],
          lastActivity: new Date().toISOString()
        };
      } else {
        // Update existing preference
        progress.learningStylePreference = {
          visual: preference.visual !== undefined ? preference.visual : progress.learningStylePreference.visual,
          auditory: preference.auditory !== undefined ? preference.auditory : progress.learningStylePreference.auditory,
          reading: preference.reading !== undefined ? preference.reading : progress.learningStylePreference.reading,
          kinesthetic: preference.kinesthetic !== undefined ? preference.kinesthetic : progress.learningStylePreference.kinesthetic
        };
      }
      
      // Update last activity
      progress.lastActivity = new Date().toISOString();
      
      // Save progress
      await CurriculumService.saveStudentProgress(progress);
      
      return true;
    } catch (error) {
      console.error('Error updating learning style preference:', error);
      return false;
    }
  },

  // Functions for the curriculum data structure
  getAllSubjects: async (): Promise<Subject[]> => {
    try {
      // Try to get subjects from AsyncStorage
      const storedData = await AsyncStorage.getItem(CURRICULUM_DATA_KEY);
      if (storedData) {
        return JSON.parse(storedData);
      }
      
      // If no stored data, return empty array
      return [];
    } catch (error) {
      console.error('Error getting subjects:', error);
      return [];
    }
  },
  
  getSubjectById: async (id: string): Promise<Subject | null> => {
    try {
      const subjects = await CurriculumService.getAllSubjects();
      return subjects.find(s => s.id === id) || null;
    } catch (error) {
      console.error('Error getting subject by ID:', error);
      return null;
    }
  },
  
  saveSubject: async (subject: Subject): Promise<boolean> => {
    try {
      // Get all subjects
      const subjects = await CurriculumService.getAllSubjects();
      
      // Check if subject already exists
      const existingIndex = subjects.findIndex(s => s.id === subject.id);
      
      if (existingIndex >= 0) {
        // Update existing subject
        subjects[existingIndex] = subject;
      } else {
        // Add new subject
        subjects.push(subject);
      }
      
      // Save updated subjects
      await AsyncStorage.setItem(CURRICULUM_DATA_KEY, JSON.stringify(subjects));
      
      return true;
    } catch (error) {
      console.error('Error saving subject:', error);
      return false;
    }
  },
  
  deleteSubject: async (id: string): Promise<boolean> => {
    try {
      // Get all subjects
      const subjects = await CurriculumService.getAllSubjects();
      
      // Filter out the subject to delete
      const updatedSubjects = subjects.filter(s => s.id !== id);
      
      // Save updated subjects
      await AsyncStorage.setItem(CURRICULUM_DATA_KEY, JSON.stringify(updatedSubjects));
      
      return true;
    } catch (error) {
      console.error('Error deleting subject:', error);
      return false;
    }
  },
  
  searchCurriculum: async (query: string): Promise<any[]> => {
    try {
      // Get all subjects
      const subjects = await CurriculumService.getAllSubjects();
      
      // Search results
      const results: any[] = [];
      
      // Search in subjects, strands, and sub-strands
      for (const subject of subjects) {
        // Search in strands
        for (const strand of subject.strands) {
          if (
            strand.title.toLowerCase().includes(query.toLowerCase()) ||
            strand.description.toLowerCase().includes(query.toLowerCase())
          ) {
            results.push({
              type: 'strand',
              subject: subject.name,
              grade: subject.grade,
              item: strand
            });
          }
          
          // Search in sub-strands
          for (const subStrand of strand.subStrands) {
            if (
              subStrand.title.toLowerCase().includes(query.toLowerCase()) ||
              subStrand.description.toLowerCase().includes(query.toLowerCase()) ||
              subStrand.learningOutcomes.some(lo => lo.toLowerCase().includes(query.toLowerCase())) ||
              subStrand.learningExperiences.some(le => le.toLowerCase().includes(query.toLowerCase())) ||
              subStrand.keyInquiryQuestions.some(kiq => kiq.toLowerCase().includes(query.toLowerCase()))
            ) {
              results.push({
                type: 'subStrand',
                subject: subject.name,
                grade: subject.grade,
                strand: strand.title,
                item: subStrand
              });
            }
          }
        }
      }
      
      return results;
    } catch (error) {
      console.error('Error searching curriculum:', error);
      return [];
    }
  }
};

// Initialize English Grade 8 curriculum
export const initializeEnglishGrade8Curriculum = async (): Promise<boolean> => {
  try {
    // Create English subject
    const english: Subject = {
      id: 'english',
      name: 'English',
      grade: 'Grade 8',
      description: 'The English subject at the junior secondary school level exposes learners to both knowledge and use of the English language, and literary appreciation.',
      strands: [
        {
          id: 'listening-speaking',
          title: 'Listening and Speaking',
          description: 'This strand focuses on developing listening and speaking skills for effective communication in various contexts.',
          subStrands: [
            {
              id: 'polite-language',
              title: 'Polite Language: Telephone Etiquette',
              description: 'This sub-strand focuses on the use of polite language in telephone conversations, helping learners develop effective communication skills.',
              learningOutcomes: [
                'Identify polite words and phrases in telephone conversations',
                'Conduct a telephone conversation using polite words and expressions',
                'Acknowledge the significance of etiquette in telephone conversations'
              ],
              learningExperiences: [
                'Listen and identify words and phrases that indicate polite language in a telephone conversation',
                'Role play in pairs a telephone dialogue on human rights using polite language',
                'Match polite telephone expressions with appropriate responses',
                'Practice leaving and taking telephone messages over the phone using polite language'
              ],
              keyInquiryQuestions: [
                'Why should one be polite when speaking over the telephone?',
                'How do we ensure politeness in a telephone conversion?'
              ]
            },
            {
              id: 'oral-presentation',
              title: 'Oral Presentation: Songs',
              description: 'This sub-strand focuses on developing oral presentation skills through songs related to various themes.',
              learningOutcomes: [
                'Identify features of songs',
                'Use performance techniques when singing',
                'Write songs on a given theme',
                'Appreciate the role of songs in the society'
              ],
              learningExperiences: [
                'Watch recordings of songs from the Kenya drama and music festivals',
                'Discuss performance techniques that make presentations appealing',
                'Identify songs of choice and present them to the class',
                'Write songs on various themes',
                'Recite and record songs or poems in groups',
                'Watch the recordings and discuss non-verbal aspects of performance'
              ],
              keyInquiryQuestions: [
                'What makes songs interesting?',
                'How can one improve the presentation of a song?'
              ]
            }
          ]
        },
        {
          id: 'reading',
          title: 'Reading',
          description: 'This strand focuses on developing reading skills for comprehension, analysis, and enjoyment of various texts.',
          subStrands: [
            {
              id: 'extensive-reading',
              title: 'Extensive Reading: Independent Reading',
              description: 'This sub-strand focuses on developing the habit of reading widely for information and enjoyment.',
              learningOutcomes: [
                'Identify print and non-print texts that are interesting to read',
                'Read a range of texts for information',
                'Appreciate the importance of reading for enjoyment'
              ],
              learningExperiences: [
                'Skim through grade appropriate print and electronic reading material',
                'Scan grade appropriate print and electronic reading material',
                'Read materials on various themes at their pace for a specified period of time',
                'Discuss what they have read in groups',
                'Write down the main ideas in the texts they have read',
                'Use a dictionary to look up the meaning of vocabulary acquired from independent reading',
                'Infer the meaning of words as used in the texts'
              ],
              keyInquiryQuestions: [
                'Why should one read widely?',
                'What should one consider when selecting a reading text?'
              ]
            },
            {
              id: 'intensive-reading-poems',
              title: 'Intensive Reading: Simple Poems',
              description: 'This sub-strand focuses on reading and analyzing simple poems related to various themes.',
              learningOutcomes: [
                'Identify the persona in a given poem',
                'Identify instances of repetition in a given poem',
                'Explain what the poem is about',
                'Acknowledge the role of poems in communication'
              ],
              learningExperiences: [
                'Read a given poem for enjoyment',
                'Recite/rap and dramatize the given poem',
                'Discuss in pairs the voice that speaks in the poem',
                'Explain the words, phrases and sentences in the poem that help decipher the surface and deeper meaning',
                'In groups, relate the message in the poem with real life experiences',
                'Compose, type and share poems related to various themes',
                'Display poems on a chart or poster in class or the school notice board'
              ],
              keyInquiryQuestions: [
                'How is a poem different from a passage?',
                'How can you say what is in the poem in your own words?'
              ]
            }
          ]
        },
        {
          id: 'grammar-in-use',
          title: 'Grammar in Use',
          description: 'This strand focuses on developing knowledge and correct use of grammatical structures in English.',
          subStrands: [
            {
              id: 'compound-nouns',
              title: 'Word Classes: Compound Nouns',
              description: 'This sub-strand focuses on identifying and using compound nouns correctly in communication.',
              learningOutcomes: [
                'Identify compound nouns in a text',
                'Use compound nouns in their singular and plural forms',
                'Appreciate the importance of compound nouns in communication'
              ],
              learningExperiences: [
                'Listen to an audio recording and identify compound nouns used in the text',
                'Categorize compound nouns into two-word or three-word nouns from a given list',
                'Form separate and hyphenated compound nouns by combining two or more words',
                'Form plurals of compound nouns from a completion table',
                'Write sentences using compound nouns in their singular and plural forms',
                'Search online and offline for more examples of compound nouns',
                'Use compound nouns to form sentences from a substitution table',
                'Assess the correctness of sentences with peers'
              ],
              keyInquiryQuestions: [
                'Why should we use compound nouns when communicating?',
                'How do compound nouns form plurals?'
              ]
            },
            {
              id: 'primary-auxiliaries',
              title: 'Word Classes: Primary Auxiliaries',
              description: 'This sub-strand focuses on identifying and using primary auxiliary verbs correctly in communication.',
              learningOutcomes: [
                'Identify primary auxiliary verbs in a text',
                'Use primary auxiliary verbs in sentences correctly',
                'Appreciate the importance of primary auxiliary verbs in communication'
              ],
              learningExperiences: [
                'Identify primary auxiliary verbs from a text',
                'Search for the functions of primary auxiliary verbs from the internet or text books',
                'Write down sentences using each of the primary auxiliary verbs individually',
                'In small groups, write a short paragraph using primary auxiliary verbs',
                'Read out the paragraphs to the rest of the class',
                'Fill in blank spaces in sentences given using the correct form of the primary auxiliary verbs',
                'Engage in a question and answer session using primary auxiliary verbs'
              ],
              keyInquiryQuestions: [
                'Which words describe actions and which ones describe state?',
                'What are the functions of verbs in sentences?'
              ]
            }
          ]
        },
        {
          id: 'writing',
          title: 'Writing',
          description: 'This strand focuses on developing writing skills for various purposes and audiences.',
          subStrands: [
            {
              id: 'writing-legibly',
              title: 'Writing Legibly and Neatly',
              description: 'This sub-strand focuses on developing the skill of writing legibly and neatly for effective communication.',
              learningOutcomes: [
                'Classify letters according to height differentials',
                'Write a text, legibly and neatly',
                'Advocate the need for legibility and neatness in writing'
              ],
              learningExperiences: [
                'Copy a provided passage and shape upper and lower case letters appropriately',
                'Copy a provided passage and space letters, words and sentences correctly',
                'Rewrite a provided text legibly and neatly',
                'Cancel words or sentences neatly when composing a text',
                'Split words that are joined appropriately',
                'Write dictated sentences legibly and neatly',
                'Write a narrative composition legibly and neatly',
                'Cancel neatly upon making mistakes as they listen to the excerpt that is dictated'
              ],
              keyInquiryQuestions: [
                'Why should one write legibly and neatly?',
                'What are the qualities of a good handwriting?'
              ]
            },
            {
              id: 'punctuation',
              title: 'Mechanics of Writing: Punctuation',
              description: 'This sub-strand focuses on the correct use of punctuation marks in writing.',
              learningOutcomes: [
                'Punctuate a given text using commas, apostrophes, and capital letters correctly',
                'Use the apostrophe, comma and capital letter appropriately in composition writing',
                'Advocate the use of correct punctuation in writing'
              ],
              learningExperiences: [
                'Search online and offline on uses of the comma, apostrophe and capital letter',
                'In pairs, read a given text and take note of the commas, apostrophes and capital letters used',
                'Explain how the commas and the apostrophes are used in the text',
                'In pairs, discuss the role of capital letters as used in various words or sentences in the passage',
                'Punctuate a passage correctly using commas, apostrophes, or capital letters where necessary',
                'Write a short composition using capital letters, commas and apostrophes correctly',
                'In pairs, assess each other\'s composition and discuss how the punctuation marks and capital letters are used',
                'In groups, search for more uses of the apostrophe and brackets from books or the internet'
              ],
              keyInquiryQuestions: [
                'Why should a text be well punctuated?',
                'How does wrong punctation affect writing?'
              ]
            }
          ]
        }
      ]
    };
    
    // Save the subject
    await CurriculumService.saveSubject(english);
    
    return true;
  } catch (error) {
    console.error('Error initializing English curriculum:', error);
    return false;
  }
};

// Initialize Kiswahili Grade 8 curriculum
export const initializeKiswahiliGrade8Curriculum = async (): Promise<boolean> => {
  try {
    // Create Kiswahili subject
    const kiswahili: Subject = {
      id: 'kiswahili',
      name: 'Kiswahili',
      grade: 'Grade 8',
      description: 'Somo la Kiswahili litampa mwanafunzi wa Daraja la Awali la Shule za Upili umilisi katika shughuli za kila siku. Umilisi huu utajengea haiba na uwezo wake wa kuwasiliana na kuhusiana katika jamii, kitaifa na kimataifa.',
      strands: [
        {
          id: 'kusikiliza-kuzungumza',
          title: 'Kusikiliza na Kuzungumza',
          description: 'Mada hii inalenga kukuza stadi za kusikiliza na kuzungumza kwa ufasaha.',
          subStrands: [
            {
              id: 'mahojiano',
              title: 'Kusikiliza na Kujibu Mahojiano',
              description: 'Mada hii ndogo inalenga kukuza stadi ya kusikiliza na kujibu mahojiano kwa kutumia lugha ya adabu.',
              learningOutcomes: [
                'Kutambua vipengele vya kuzingatia katika kusikiliza mahojiano',
                'Kutambua vipengele vya kuzingatia katika kujibu mahojiano',
                'Kutumia vipengele vifaavyo katika kusikiliza na kujibu mahojiano ipasavyo'
              ],
              learningExperiences: [
                'Kutambua vipengele vya kuzingatia katika kusikiliza mahojiano akiwa katika kikundi',
                'Kutambua vipengele vya kuzingatia katika kujibu mahojiano akiwa peke yake au katika kikundi',
                'Kusikiliza mahojiano kuhusu suala lengwa katika kifaa cha kidijitali na kutambua vipengele vya kusikiliza na kujibu mahojiano vilivyozingatiwa',
                'Kushiriki mahojiano kuhusu suala lengwa akiwa na wenzake, mzazi au mlezi kwa kuzingatia vipengele vifaavyo vya kusikiliza na kujibu mahojiano'
              ],
              keyInquiryQuestions: [
                'Je, ni vipengele vipi vinavyofaa kuzingatiwa katika kusikiliza mahojiano?'
              ]
            },
            {
              id: 'hadithi-mighani',
              title: 'Hadithi: Mighani',
              description: 'Mada hii ndogo inalenga kukuza stadi ya kusikiliza na kuzungumza kupitia mighani.',
              learningOutcomes: [
                'Kueleza maana ya mighani ili kuibainisha',
                'Kueleza sifa za mighani ili kuipambanua',
                'Kujadili vipengele vya uwasilishaji wa mighani',
                'Kusimulia mighani kwa kuzingatia vipengele vya uwasilishaji'
              ],
              learningExperiences: [
                'Kueleza maana ya mighani akiwa peke yake au katika kikundi',
                'Kushiriki na wenzake katika kikundi kueleza sifa za mighani',
                'Kujadili vipengele vya kuzingatia katika uwasilishaji wa mighani akiwa peke yake au katika kikundi',
                'Kusikiliza mighani ikisimuliwa katika vifaa vya kidijitali na kubainisha sifa na vipengele vya uwasilishaji vilivyozingatiwa',
                'Kusimulia mighani katika kikundi kwa kuzingatia vipengele vifaavyo vya uwasilishaji'
              ],
              keyInquiryQuestions: [
                'Je, unaposimulia mighani unafaa kuzingatia vipengele gani?',
                'Je, mighani ina sifa gani?'
              ]
            }
          ]
        },
        {
          id: 'kusoma',
          title: 'Kusoma',
          description: 'Mada hii inalenga kukuza stadi ya kusoma kwa ufasaha na kwa ufahamu.',
          subStrands: [
            {
              id: 'ufahamu-simulizi',
              title: 'Ufahamu wa Kifungu cha Simulizi',
              description: 'Mada hii ndogo inalenga kukuza stadi ya kusoma kwa ufahamu kupitia vifungu vya simulizi.',
              learningOutcomes: [
                'Kudondoa habari mahususi katika kifungu cha ufahamu',
                'Kupanga matukio yanavyofuatana katika kifungu cha ufahamu',
                'Kufanya utabiri na ufasiri kutokana na kifungu cha ufahamu',
                'Kueleza maana ya msamiati katika kifungu cha ufahamu'
              ],
              learningExperiences: [
                'Kusoma kifungu kwenye kitabu au kifaa cha kidijitali akiwa peke yake',
                'Kudondoa habari mahususi katika kifungu simulizi cha ufahamu',
                'Kupanga matukio yanavyofuatana katika kifungu cha ufahamu akiwa katika kikundi',
                'Kufanya utabiri na ufasiri kutokana na kifungu cha ufahamu alichosoma akiwa na mwenzake',
                'Kutambua msamiati katika kifungu cha ufahamu na kuueleza kwa kutumia kamusi akiwa katika kikundi'
              ],
              keyInquiryQuestions: [
                'Je, tunapataje habari mahususi katika kifungu cha ufahamu?',
                'Je, ni mambo gani yanayoweza kukusaidia kuelewa kifungu cha ufahamu?'
              ]
            },
            {
              id: 'kusoma-kina-tamthilia',
              title: 'Kusoma kwa Kina: Tamthilia',
              description: 'Mada hii ndogo inalenga kukuza stadi ya kusoma kwa kina kupitia tamthilia.',
              learningOutcomes: [
                'Kueleza maana ya tamthilia ili kuipambanua',
                'Kujadili sifa za tamthilia kama utanzu wa fasihi andishi'
              ],
              learningExperiences: [
                'Kufafanua maana ya tamthilia akiwa peke yake, wawiliwawili au katika kikundi',
                'Kutafiti maktabani au mtandaoni kuhusu sifa za tamthilia akiwa peke yake au katika kikundi',
                'Kuwawasilishia wenzake utafiti wake darasani au kuwasambazia mtandaoni',
                'Kusoma tamthilia iliyoteuliwa na mwalimu na kutambua sifa zake akiwa peke yake, wawiliwawili au katika kikundi'
              ],
              keyInquiryQuestions: [
                'Je, tamthilia uliyowahi kusoma ilikuwa inahusu nini?'
              ]
            }
          ]
        },
        {
          id: 'kuandika',
          title: 'Kuandika',
          description: 'Mada hii inalenga kukuza stadi ya kuandika kwa ufasaha na kwa ubunifu.',
          subStrands: [
            {
              id: 'viakifishi',
              title: 'Viakifishi: Alama ya Hisi na Ritifaa',
              description: 'Mada hii ndogo inalenga kukuza stadi ya kuandika kwa kuzingatia matumizi sahihi ya alama ya hisi na ritifaa.',
              learningOutcomes: [
                'Kutambua matumizi ya alama ya hisi na ritifaa katika matini',
                'Kutumia alama ya hisi na ritifaa ipasavyo katika matini'
              ],
              learningExperiences: [
                'Kutambua alama ya hisi na ritifaa katika maneno, sentensi au vifungu vya maneno kwenye matini andishi na za kidijitali wakiwa wawiliwawili',
                'Kuandika maneno, sentensi au vifungu vya maneno kuhusu suala lengwa kwa kutumia alama ya hisi na ritifaa ipasavyo kwenye kitabu au kifaa cha kidijitali',
                'Kuandika kwenye tarakilishi, kifungu kifupi kuhusu suala lengwa kwa kutumia alama ya hisi na ritifaa ipasavyo na kuwasambazia wenzake kwenye mtandao ili wakitolee maoni'
              ],
              keyInquiryQuestions: [
                'Je, alama ya hisi huonyesha hisia zipi?',
                'Je, alama ya ritifaa hutumiwa vipi katika maandishi?'
              ]
            },
            {
              id: 'barua-kirafiki',
              title: 'Barua ya Kirafiki ya Kutoa Shukrani',
              description: 'Mada hii ndogo inalenga kukuza stadi ya kuandika barua ya kirafiki ya kutoa shukrani.',
              learningOutcomes: [
                'Kueleza umuhimu wa barua ya kirafiki ya kutoa shukrani',
                'Kutambua ujumbe unaoafiki barua ya kirafiki ya kutoa shukrani',
                'Kutambua vipengele vya kimuundo vya barua ya kirafiki ya kutoa shukrani',
                'Kuandika barua ya kirafiki ya kutoa shukrani kwa kuzingatia ujumbe, lugha na muundo ipasavyo'
              ],
              learningExperiences: [
                'Kueleza umuhimu wa kuandika barua ya kirafiki ya kutoa shukrani kuhusu masuala mbalimbali akiwa peke yake',
                'Kutambua ujumbe unaoafiki barua ya kirafiki ya kutoa shukrani kwa kujadiliana na mwenzake',
                'Kutambua lugha inayofaa kwa uandishi wa barua ya kirafiki ya kutoa shukrani katika kikundi',
                'Kujadili katika kikundi vipengele vya kimuundo vya barua ya kirafiki ya kutoa shukrani',
                'Kuandika barua ya kirafiki ya kutoa shukrani daftarini au kwenye tarakilishi'
              ],
              keyInquiryQuestions: [
                'Je, ni mambo gani yanayoweza kukufanya uandike barua ya kirafiki ya kutoa shukrani?',
                'Barua ya kirafiki ya kutoa shukrani huwa na vipengele gani?'
              ]
            }
          ]
        },
        {
          id: 'sarufi',
          title: 'Sarufi',
          description: 'Mada hii inalenga kukuza stadi ya sarufi kupitia matumizi sahihi ya viwakilishi na nyakati.',
          subStrands: [
            {
              id: 'viwakilishi-nafsi',
              title: 'Viwakilishi: vya nafsi, vionyeshi na vya idadi',
              description: 'Mada hii ndogo inalenga kukuza stadi ya sarufi kupitia matumizi sahihi ya viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi.',
              learningOutcomes: [
                'Kutambua viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika matini',
                'Kutumia ipasavyo viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika matini'
              ],
              learningExperiences: [
                'Kuchopoa viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika kapu maneno, chati, mti maneno au katika tarakilishi',
                'Kutaja viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi akiwa na wenzake katika kikundi',
                'Kutambua viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika sentensi au vifungu kwenye vitabu au tarakilishi kwa kuvipigia mstari au kuvikolezea wino'
              ],
              keyInquiryQuestions: [
                'Viwakilishi vina umuhimu gani katika mawasiliano?'
              ]
            },
            {
              id: 'viwakilishi-vimilikishi',
              title: 'Viwakilishi Vimilikishi na Visisitizi',
              description: 'Mada hii ndogo inalenga kukuza stadi ya sarufi kupitia matumizi sahihi ya viwakilishi vimilikishi na visisitizi.',
              learningOutcomes: [
                'Kutambua viwakilishi vimilikishi na visisitizi katika matini',
                'Kutumia viwakilishi vimilikishi na visisitizi ifaavyo katika matini'
              ],
              learningExperiences: [
                'Kuchopoa viwakilishi vimilikishi na visisitizi katika kapu maneno, orodha ya maneno, sentensi, vifungu au katika tarakilishi',
                'Kutaja viwakilishi vimilikishi na visisitizi akiwa na wenzake katika kikundi',
                'Kutambua viwakilishi vimilikishi na visisitizi katika orodha ya maneno, sentensi, vifungu kwenye vitabu au tarakilishi kwa kuvipigia mstari au kuvikolezea wino'
              ],
              keyInquiryQuestions: [
                'Unazingatia nini unapotumia viwakilishi vimilikishi?',
                'Je, viwakilishi visisitizi vina muhimu gani katika mawasiliano?'
              ]
            }
          ]
        }
      ]
    };
    
    // Save the subject
    await CurriculumService.saveSubject(kiswahili);
    
    return true;
  } catch (error) {
    console.error('Error initializing Kiswahili curriculum:', error);
    return false;
  }
};

export default CurriculumService;
export const curriculumService = CurriculumService;