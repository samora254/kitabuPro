import AsyncStorage from '@react-native-async-storage/async-storage';
import { questionBanks } from '@/data/questionBank';
import { 
  Question, 
  QuestionSet, 
  QuestionBank, 
  QuestionDifficulty, 
  QuestionType 
} from '@/data/questionBank/types';

// Storage keys
const QUESTION_PROGRESS_KEY = 'kitabu_question_progress';
const CUSTOM_QUESTIONS_KEY = 'kitabu_custom_questions';

// User progress interface
interface QuestionProgress {
  userId: string;
  answeredQuestions: {
    questionId: string;
    lastAnswered: string;
    timesAnswered: number;
    timesCorrect: number;
    averageResponseTime: number; // in seconds
  }[];
  completedSets: {
    setId: string;
    completedAt: string;
    score: number;
    totalPossible: number;
  }[];
  masteryLevels: {
    topic: string;
    subtopic?: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
    lastUpdated: string;
  }[];
}

// Service functions
const QuestionBankService = {
  // Get all question banks
  getAllQuestionBanks: (): Record<string, QuestionBank> => {
    return questionBanks;
  },
  
  // Get question bank by subject
  getQuestionBank: (subject: string): QuestionBank | null => {
    const subjectKey = subject.toLowerCase().replace(/\s+/g, '');
    return questionBanks[subjectKey as keyof typeof questionBanks] || null;
  },
  
  // Get question sets by subject and grade
  getQuestionSets: (subject: string, grade: string): QuestionSet[] => {
    const bank = QuestionBankService.getQuestionBank(subject);
    if (!bank) return [];
    
    return bank.questionSets.filter(set => set.grade === grade);
  },
  
  // Get question sets by topic
  getQuestionSetsByTopic: (subject: string, topic: string, subtopic?: string): QuestionSet[] => {
    const bank = QuestionBankService.getQuestionBank(subject);
    if (!bank) return [];
    
    return bank.questionSets.filter(set => {
      if (subtopic) {
        return set.topic === topic && set.subtopic === subtopic;
      }
      return set.topic === topic;
    });
  },
  
  // Get question set by ID
  getQuestionSet: (setId: string): QuestionSet | null => {
    for (const subject in questionBanks) {
      const bank = questionBanks[subject as keyof typeof questionBanks];
      const set = bank.questionSets.find(s => s.id === setId);
      if (set) return set;
    }
    return null;
  },
  
  // Get question by ID
  getQuestion: (questionId: string): Question | null => {
    for (const subject in questionBanks) {
      const bank = questionBanks[subject as keyof typeof questionBanks];
      for (const set of bank.questionSets) {
        const question = set.questions.find(q => q.id === questionId);
        if (question) return question;
      }
    }
    return null;
  },
  
  // Get questions by difficulty
  getQuestionsByDifficulty: (subject: string, difficulty: QuestionDifficulty): Question[] => {
    const bank = QuestionBankService.getQuestionBank(subject);
    if (!bank) return [];
    
    const questions: Question[] = [];
    for (const set of bank.questionSets) {
      questions.push(...set.questions.filter(q => q.difficulty === difficulty));
    }
    return questions;
  },
  
  // Get questions by type
  getQuestionsByType: (subject: string, type: QuestionType): Question[] => {
    const bank = QuestionBankService.getQuestionBank(subject);
    if (!bank) return [];
    
    const questions: Question[] = [];
    for (const set of bank.questionSets) {
      questions.push(...set.questions.filter(q => q.type === type));
    }
    return questions;
  },
  
  // Generate a quiz from available questions
  generateQuiz: (
    subject: string,
    grade: string,
    topic?: string | undefined,
    subtopic?: string,
    difficulty?: QuestionDifficulty,
    questionCount: number = 10
  ): QuestionSet => {
    const bank = QuestionBankService.getQuestionBank(subject);
    if (!bank) {
      return {
        id: 'generated-quiz',
        title: 'Generated Quiz',
        description: 'No questions available',
        subject,
        grade,
        topic: topic || 'Mixed',
        questions: [],
        totalPoints: 0,
        estimatedTime: 0,
        difficulty: 'medium'
      };
    }
    
    // Filter questions based on criteria
    let availableQuestions: Question[] = [];
    
    for (const set of bank.questionSets) {
      if (set.grade !== grade) continue;
      
      let setQuestions = [...set.questions];
      
      if (topic && typeof topic === 'string') {
        setQuestions = setQuestions.filter(q => q.topic === topic);
      }
      
      if (subtopic) {
        setQuestions = setQuestions.filter(q => q.subtopic === subtopic);
      }
      
      if (difficulty) {
        setQuestions = setQuestions.filter(q => q.difficulty === difficulty);
      }
      
      availableQuestions.push(...setQuestions);
    }
    
    // Shuffle and select questions
    availableQuestions = QuestionBankService.shuffleArray(availableQuestions);
    
    // If not enough questions, just use what we have
    if (availableQuestions.length < questionCount) {
      questionCount = availableQuestions.length;
    }
    
    const selectedQuestions = availableQuestions.slice(0, questionCount);
    
    // Calculate total points and estimated time
    const totalPoints = selectedQuestions.reduce((sum, q) => sum + q.points, 0);
    const estimatedTime = selectedQuestions.reduce((sum, q) => sum + q.timeEstimate, 0);
    
    // Determine overall difficulty
    let difficultyScore = 0;
    selectedQuestions.forEach(q => {
      if (q.difficulty === 'easy') difficultyScore += 1;
      else if (q.difficulty === 'medium') difficultyScore += 2;
      else if (q.difficulty === 'hard') difficultyScore += 3;
    });
    
    const avgDifficulty = difficultyScore / selectedQuestions.length;
    let quizDifficulty: QuestionDifficulty = 'medium';
    if (avgDifficulty < 1.5) quizDifficulty = 'easy';
    else if (avgDifficulty > 2.5) quizDifficulty = 'hard';
    
    return {
      id: `generated-quiz-${Date.now()}`,
      title: topic ? `${topic} Quiz` : `${subject} Quiz`,
      description: `A generated quiz for ${grade} ${subject}${topic ? ` on ${topic}` : ''}`,
      subject,
      grade,
      topic: topic || 'Mixed',
      subtopic,
      questions: selectedQuestions,
      totalPoints,
      estimatedTime,
      difficulty: quizDifficulty,
      tags: [subject.toLowerCase(), grade.toLowerCase(), 'quiz']
    };
  },
  
  // Get user question progress
  getUserProgress: async (userId: string): Promise<QuestionProgress | null> => {
    try {
      const key = `${QUESTION_PROGRESS_KEY}_${userId}`;
      const progressJson = await AsyncStorage.getItem(key);
      return progressJson ? JSON.parse(progressJson) : null;
    } catch (error) {
      console.error('Error getting user question progress:', error);
      return null;
    }
  },
  
  // Save user question progress
  saveUserProgress: async (progress: QuestionProgress): Promise<void> => {
    try {
      const key = `${QUESTION_PROGRESS_KEY}_${progress.userId}`;
      await AsyncStorage.setItem(key, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving user question progress:', error);
      throw error;
    }
  },
  
  // Record a question attempt
  recordQuestionAttempt: async (
    userId: string,
    questionId: string,
    isCorrect: boolean,
    responseTime: number
  ): Promise<void> => {
    try {
      // Get user progress
      let progress = await QuestionBankService.getUserProgress(userId);
      
      if (!progress) {
        // Create new progress record
        progress = {
          userId,
          answeredQuestions: [],
          completedSets: [],
          masteryLevels: []
        };
      }
      
      // Check if question has been answered before
      const existingIndex = progress.answeredQuestions.findIndex(q => q.questionId === questionId);
      
      if (existingIndex >= 0) {
        // Update existing record
        const existing = progress.answeredQuestions[existingIndex];
        progress.answeredQuestions[existingIndex] = {
          questionId,
          lastAnswered: new Date().toISOString(),
          timesAnswered: existing.timesAnswered + 1,
          timesCorrect: existing.timesCorrect + (isCorrect ? 1 : 0),
          averageResponseTime: (existing.averageResponseTime * existing.timesAnswered + responseTime) / (existing.timesAnswered + 1)
        };
      } else {
        // Add new record
        progress.answeredQuestions.push({
          questionId,
          lastAnswered: new Date().toISOString(),
          timesAnswered: 1,
          timesCorrect: isCorrect ? 1 : 0,
          averageResponseTime: responseTime
        });
      }
      
      // Save progress
      await QuestionBankService.saveUserProgress(progress);
      
      // Update mastery levels
      await QuestionBankService.updateMasteryLevels(userId);
    } catch (error) {
      console.error('Error recording question attempt:', error);
      throw error;
    }
  },
  
  // Record completion of a question set
  recordSetCompletion: async (
    userId: string,
    setId: string,
    score: number,
    totalPossible: number
  ): Promise<void> => {
    try {
      // Get user progress
      let progress = await QuestionBankService.getUserProgress(userId);
      
      if (!progress) {
        // Create new progress record
        progress = {
          userId,
          answeredQuestions: [],
          completedSets: [],
          masteryLevels: []
        };
      }
      
      // Check if set has been completed before
      const existingIndex = progress.completedSets.findIndex(s => s.setId === setId);
      
      if (existingIndex >= 0) {
        // Update existing record
        progress.completedSets[existingIndex] = {
          setId,
          completedAt: new Date().toISOString(),
          score,
          totalPossible
        };
      } else {
        // Add new record
        progress.completedSets.push({
          setId,
          completedAt: new Date().toISOString(),
          score,
          totalPossible
        });
      }
      
      // Save progress
      await QuestionBankService.saveUserProgress(progress);
      
      // Update mastery levels
      await QuestionBankService.updateMasteryLevels(userId);
    } catch (error) {
      console.error('Error recording set completion:', error);
      throw error;
    }
  },
  
  // Update mastery levels based on question performance
  updateMasteryLevels: async (userId: string): Promise<void> => {
    try {
      // Get user progress
      const progress = await QuestionBankService.getUserProgress(userId);
      if (!progress) return;
      
      // Get all question banks
      const banks = QuestionBankService.getAllQuestionBanks();
      
      // Track topics and subtopics
      const topicPerformance: Record<string, {
        correct: number;
        total: number;
        subtopics: Record<string, { correct: number; total: number }>
      }> = {};
      
      // Process answered questions
      for (const answered of progress.answeredQuestions) {
        // Find the question
        const question = QuestionBankService.getQuestion(answered.questionId);
        if (!question) continue;
        
        const { topic, subtopic } = question;
        
        // Initialize topic if needed
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = {
            correct: 0,
            total: 0,
            subtopics: {}
          };
        }
        
        // Update topic stats
        topicPerformance[topic].correct += answered.timesCorrect;
        topicPerformance[topic].total += answered.timesAnswered;
        
        // Update subtopic stats if available
        if (subtopic) {
          if (!topicPerformance[topic].subtopics[subtopic]) {
            topicPerformance[topic].subtopics[subtopic] = {
              correct: 0,
              total: 0
            };
          }
          
          topicPerformance[topic].subtopics[subtopic].correct += answered.timesCorrect;
          topicPerformance[topic].subtopics[subtopic].total += answered.timesAnswered;
        }
      }
      
      // Calculate mastery levels
      const newMasteryLevels: QuestionProgress['masteryLevels'] = [];
      
      for (const topic in topicPerformance) {
        const { correct, total, subtopics } = topicPerformance[topic];
        
        // Calculate topic mastery
        const accuracy = correct / total;
        let masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
        
        if (total < 5) {
          masteryLevel = 'beginner';
        } else if (accuracy < 0.6) {
          masteryLevel = 'beginner';
        } else if (accuracy < 0.8) {
          masteryLevel = 'intermediate';
        } else if (accuracy < 0.95) {
          masteryLevel = 'advanced';
        } else {
          masteryLevel = 'mastered';
        }
        
        newMasteryLevels.push({
          topic,
          level: masteryLevel,
          lastUpdated: new Date().toISOString()
        });
        
        // Calculate subtopic mastery
        for (const subtopic in subtopics) {
          const { correct, total } = subtopics[subtopic];
          
          // Calculate subtopic mastery
          const accuracy = correct / total;
          let masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
          
          if (total < 5) {
            masteryLevel = 'beginner';
          } else if (accuracy < 0.6) {
            masteryLevel = 'beginner';
          } else if (accuracy < 0.8) {
            masteryLevel = 'intermediate';
          } else if (accuracy < 0.95) {
            masteryLevel = 'advanced';
          } else {
            masteryLevel = 'mastered';
          }
          
          newMasteryLevels.push({
            topic,
            subtopic,
            level: masteryLevel,
            lastUpdated: new Date().toISOString()
          });
        }
      }
      
      // Update progress with new mastery levels
      progress.masteryLevels = newMasteryLevels;
      
      // Save updated progress
      await QuestionBankService.saveUserProgress(progress);
    } catch (error) {
      console.error('Error updating mastery levels:', error);
      throw error;
    }
  },
  
  // Get recommended questions based on user progress
  getRecommendedQuestions: async (
    userId: string,
    subject: string,
    count: number = 10
  ): Promise<Question[]> => {
    try {
      // Get user progress
      const progress = await QuestionBankService.getUserProgress(userId);
      if (!progress) {
        // If no progress, return random questions
        return QuestionBankService.getRandomQuestions(subject, count);
      }
      
      // Get mastery levels
      const masteryLevels = progress.masteryLevels;
      
      // Get question bank
      const bank = QuestionBankService.getQuestionBank(subject);
      if (!bank) return [];
      
      // Collect all questions from the subject
      const allQuestions: Question[] = [];
      for (const set of bank.questionSets) {
        allQuestions.push(...set.questions);
      }
      
      // Filter out questions that have been answered correctly multiple times
      const answeredQuestionIds = new Set(
        progress.answeredQuestions
          .filter(q => q.timesCorrect >= 2)
          .map(q => q.questionId)
      );
      
      let availableQuestions = allQuestions.filter(q => !answeredQuestionIds.has(q.id));
      
      // If not enough questions, include some previously answered ones
      if (availableQuestions.length < count) {
        const additionalQuestions = allQuestions.filter(q => answeredQuestionIds.has(q.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, count - availableQuestions.length);
        
        availableQuestions = [...availableQuestions, ...additionalQuestions];
      }
      
      // Score questions based on mastery levels
      const scoredQuestions = availableQuestions.map(question => {
        let score = 0;
        
        // Find topic mastery
        const topicMastery = masteryLevels.find(m => 
          m.topic === question.topic && !m.subtopic
        );
        
        // Find subtopic mastery if applicable
        const subtopicMastery = question.subtopic ? 
          masteryLevels.find(m => 
            m.topic === question.topic && m.subtopic === question.subtopic
          ) : null;
        
        // Score based on mastery level
        if (subtopicMastery) {
          // Prioritize questions from subtopics with lower mastery
          switch (subtopicMastery.level) {
            case 'beginner': score += 4; break;
            case 'intermediate': score += 3; break;
            case 'advanced': score += 2; break;
            case 'mastered': score += 1; break;
          }
        } else if (topicMastery) {
          // Prioritize questions from topics with lower mastery
          switch (topicMastery.level) {
            case 'beginner': score += 4; break;
            case 'intermediate': score += 3; break;
            case 'advanced': score += 2; break;
            case 'mastered': score += 1; break;
          }
        } else {
          // No mastery data, prioritize these questions
          score += 5;
        }
        
        // Adjust score based on difficulty
        switch (question.difficulty) {
          case 'easy': score += 1; break;
          case 'medium': score += 2; break;
          case 'hard': score += 3; break;
        }
        
        return { question, score };
      });
      
      // Sort by score (descending) and add some randomness
      scoredQuestions.sort((a, b) => {
        const scoreDiff = b.score - a.score;
        if (scoreDiff !== 0) return scoreDiff;
        return Math.random() - 0.5; // Add randomness for questions with the same score
      });
      
      // Return the top N questions
      return scoredQuestions.slice(0, count).map(sq => sq.question);
    } catch (error) {
      console.error('Error getting recommended questions:', error);
      return [];
    }
  },
  
  // Get random questions
  getRandomQuestions: (subject: string, count: number = 10): Question[] => {
    const bank = QuestionBankService.getQuestionBank(subject);
    if (!bank) return [];
    
    // Collect all questions
    const allQuestions: Question[] = [];
    for (const set of bank.questionSets) {
      allQuestions.push(...set.questions);
    }
    
    // Shuffle and return
    return QuestionBankService.shuffleArray(allQuestions).slice(0, count);
  },
  
  // Helper function to shuffle an array
  shuffleArray: <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
};

export default QuestionBankService;