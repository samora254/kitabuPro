import AsyncStorage from '@react-native-async-storage/async-storage';
import { quickFactsBanks } from '@/data/quickFacts';
import { 
  QuickFactsBank, 
  FlashcardSet, 
  Flashcard, 
  UserFlashcardProgress, 
  ChallengeResult,
  DifficultyLevel
} from '@/data/quickFacts/types';

// Storage keys
const USER_FLASHCARD_PROGRESS_KEY = 'kitabu_flashcard_progress';
const CHALLENGE_RESULTS_KEY = 'kitabu_challenge_results';
const BOOKMARKED_FLASHCARDS_KEY = 'kitabu_bookmarked_flashcards';

// Service functions
const QuickFactsService = {
  // Get all quick facts banks
  getAllQuickFactsBanks: (): Record<string, QuickFactsBank> => {
    return quickFactsBanks;
  },
  
  // Get quick facts bank by subject
  getQuickFactsBank: (subject: string): QuickFactsBank | null => {
    const subjectKey = subject.toLowerCase().replace(/\s+/g, '-');
    return quickFactsBanks[subjectKey as keyof typeof quickFactsBanks] || null;
  },
  
  // Get flashcard sets by subject and grade
  getFlashcardSets: (subject: string, grade: string): FlashcardSet[] => {
    const bank = QuickFactsService.getQuickFactsBank(subject);
    if (!bank) return [];
    
    return bank.flashcardSets.filter(set => set.grade === grade);
  },
  
  // Get flashcard sets by topic
  getFlashcardSetsByTopic: (subject: string, topic: string, subtopic?: string): FlashcardSet[] => {
    const bank = QuickFactsService.getQuickFactsBank(subject);
    if (!bank) return [];
    
    return bank.flashcardSets.filter(set => {
      if (subtopic) {
        return set.topic === topic && set.subtopic === subtopic;
      }
      return set.topic === topic;
    });
  },
  
  // Get flashcard set by ID
  getFlashcardSet: (setId: string): FlashcardSet | null => {
    for (const subject in quickFactsBanks) {
      const bank = quickFactsBanks[subject as keyof typeof quickFactsBanks];
      const set = bank.flashcardSets.find(s => s.id === setId);
      if (set) return set;
    }
    return null;
  },
  
  // Get flashcard by ID
  getFlashcard: (flashcardId: string): Flashcard | null => {
    for (const subject in quickFactsBanks) {
      const bank = quickFactsBanks[subject as keyof typeof quickFactsBanks];
      for (const set of bank.flashcardSets) {
        const flashcard = set.flashcards.find(f => f.id === flashcardId);
        if (flashcard) return flashcard;
      }
    }
    return null;
  },
  
  // Get flashcards by difficulty
  getFlashcardsByDifficulty: (subject: string, difficulty: DifficultyLevel): Flashcard[] => {
    const bank = QuickFactsService.getQuickFactsBank(subject);
    if (!bank) return [];
    
    const flashcards: Flashcard[] = [];
    for (const set of bank.flashcardSets) {
      flashcards.push(...set.flashcards.filter(f => f.difficulty === difficulty));
    }
    return flashcards;
  },
  
  // Generate a flashcard challenge
  generateFlashcardChallenge: (
    subject: string,
    topic?: string,
    subtopic?: string,
    difficulty?: DifficultyLevel,
    cardCount: number = 10
  ): FlashcardSet | null => {
    const bank = QuickFactsService.getQuickFactsBank(subject);
    if (!bank) return null;
    
    // Filter flashcards based on criteria
    let availableFlashcards: Flashcard[] = [];
    
    for (const set of bank.flashcardSets) {
      if (topic && set.topic !== topic) continue;
      if (subtopic && set.subtopic !== subtopic) continue;
      
      let setFlashcards = [...set.flashcards];
      
      if (difficulty) {
        setFlashcards = setFlashcards.filter(f => f.difficulty === difficulty);
      }
      
      availableFlashcards.push(...setFlashcards);
    }
    
    // If no flashcards match criteria, return null
    if (availableFlashcards.length === 0) return null;
    
    // Shuffle and select flashcards
    availableFlashcards = QuickFactsService.shuffleArray(availableFlashcards);
    
    // If not enough flashcards, just use what we have
    if (availableFlashcards.length < cardCount) {
      cardCount = availableFlashcards.length;
    }
    
    const selectedFlashcards = availableFlashcards.slice(0, cardCount);
    
    // Calculate estimated time
    const estimatedTime = selectedFlashcards.reduce((sum, f) => sum + f.timeRecommended, 0);
    
    // Determine overall difficulty
    let difficultyScore = 0;
    selectedFlashcards.forEach(f => {
      if (f.difficulty === 'easy') difficultyScore += 1;
      else if (f.difficulty === 'medium') difficultyScore += 2;
      else if (f.difficulty === 'hard') difficultyScore += 3;
    });
    
    const avgDifficulty = difficultyScore / selectedFlashcards.length;
    let challengeDifficulty: DifficultyLevel = 'medium';
    if (avgDifficulty < 1.5) challengeDifficulty = 'easy';
    else if (avgDifficulty > 2.5) challengeDifficulty = 'hard';
    
    // Create challenge set
    return {
      id: `challenge-${Date.now()}`,
      title: topic ? `${topic} Challenge` : `${subject} Challenge`,
      description: `A quick facts challenge for ${subject}${topic ? ` on ${topic}` : ''}`,
      subject,
      topic: topic || 'Mixed',
      subtopic,
      grade: "Grade 8", // Default to Grade 8
      flashcards: selectedFlashcards,
      totalCards: selectedFlashcards.length,
      estimatedTime,
      difficulty: challengeDifficulty
    };
  },
  
  // Get user flashcard progress
  getUserFlashcardProgress: async (userId: string): Promise<UserFlashcardProgress[]> => {
    try {
      const key = `${USER_FLASHCARD_PROGRESS_KEY}_${userId}`;
      const progressJson = await AsyncStorage.getItem(key);
      return progressJson ? JSON.parse(progressJson) : [];
    } catch (error) {
      console.error('Error getting user flashcard progress:', error);
      return [];
    }
  },
  
  // Save user flashcard progress
  saveUserFlashcardProgress: async (progress: UserFlashcardProgress): Promise<void> => {
    try {
      const userId = progress.userId;
      const key = `${USER_FLASHCARD_PROGRESS_KEY}_${userId}`;
      
      // Get existing progress
      const existingProgressJson = await AsyncStorage.getItem(key);
      const existingProgress: UserFlashcardProgress[] = existingProgressJson 
        ? JSON.parse(existingProgressJson) 
        : [];
      
      // Check if flashcard progress already exists
      const existingIndex = existingProgress.findIndex(p => 
        p.userId === progress.userId && p.flashcardId === progress.flashcardId
      );
      
      if (existingIndex >= 0) {
        // Update existing progress
        existingProgress[existingIndex] = progress;
      } else {
        // Add new progress
        existingProgress.push(progress);
      }
      
      // Save updated progress
      await AsyncStorage.setItem(key, JSON.stringify(existingProgress));
    } catch (error) {
      console.error('Error saving user flashcard progress:', error);
      throw error;
    }
  },
  
  // Get bookmarked flashcards
  getBookmarkedFlashcards: async (userId: string): Promise<string[]> => {
    try {
      const key = `${BOOKMARKED_FLASHCARDS_KEY}_${userId}`;
      const bookmarksJson = await AsyncStorage.getItem(key);
      return bookmarksJson ? JSON.parse(bookmarksJson) : [];
    } catch (error) {
      console.error('Error getting bookmarked flashcards:', error);
      return [];
    }
  },
  
  // Toggle flashcard bookmark
  toggleFlashcardBookmark: async (userId: string, flashcardId: string): Promise<boolean> => {
    try {
      const key = `${BOOKMARKED_FLASHCARDS_KEY}_${userId}`;
      
      // Get existing bookmarks
      const bookmarksJson = await AsyncStorage.getItem(key);
      const bookmarks: string[] = bookmarksJson ? JSON.parse(bookmarksJson) : [];
      
      // Check if flashcard is already bookmarked
      const index = bookmarks.indexOf(flashcardId);
      
      if (index >= 0) {
        // Remove bookmark
        bookmarks.splice(index, 1);
        
        // Update user progress if it exists
        const progress = await QuickFactsService.getUserFlashcardProgress(userId);
        const progressIndex = progress.findIndex(p => p.flashcardId === flashcardId);
        
        if (progressIndex >= 0) {
          progress[progressIndex].isBookmarked = false;
          await AsyncStorage.setItem(
            `${USER_FLASHCARD_PROGRESS_KEY}_${userId}`, 
            JSON.stringify(progress)
          );
        }
        
        // Save updated bookmarks
        await AsyncStorage.setItem(key, JSON.stringify(bookmarks));
        return false; // Indicates bookmark was removed
      } else {
        // Add bookmark
        bookmarks.push(flashcardId);
        
        // Update user progress if it exists
        const progress = await QuickFactsService.getUserFlashcardProgress(userId);
        const progressIndex = progress.findIndex(p => p.flashcardId === flashcardId);
        
        if (progressIndex >= 0) {
          progress[progressIndex].isBookmarked = true;
          await AsyncStorage.setItem(
            `${USER_FLASHCARD_PROGRESS_KEY}_${userId}`, 
            JSON.stringify(progress)
          );
        } else {
          // Create new progress entry
          const newProgress: UserFlashcardProgress = {
            userId,
            flashcardId,
            lastSeen: new Date().toISOString(),
            timesCorrect: 0,
            timesIncorrect: 0,
            isBookmarked: true,
            averageResponseTime: 0
          };
          
          await QuickFactsService.saveUserFlashcardProgress(newProgress);
        }
        
        // Save updated bookmarks
        await AsyncStorage.setItem(key, JSON.stringify(bookmarks));
        return true; // Indicates bookmark was added
      }
    } catch (error) {
      console.error('Error toggling flashcard bookmark:', error);
      throw error;
    }
  },
  
  // Save challenge result
  saveChallengeResult: async (result: ChallengeResult): Promise<void> => {
    try {
      const key = `${CHALLENGE_RESULTS_KEY}_${result.userId}`;
      
      // Get existing results
      const resultsJson = await AsyncStorage.getItem(key);
      const results: ChallengeResult[] = resultsJson ? JSON.parse(resultsJson) : [];
      
      // Add new result
      results.push(result);
      
      // Save updated results
      await AsyncStorage.setItem(key, JSON.stringify(results));
    } catch (error) {
      console.error('Error saving challenge result:', error);
      throw error;
    }
  },
  
  // Get challenge results
  getChallengeResults: async (userId: string): Promise<ChallengeResult[]> => {
    try {
      const key = `${CHALLENGE_RESULTS_KEY}_${userId}`;
      const resultsJson = await AsyncStorage.getItem(key);
      return resultsJson ? JSON.parse(resultsJson) : [];
    } catch (error) {
      console.error('Error getting challenge results:', error);
      return [];
    }
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

export default QuickFactsService;