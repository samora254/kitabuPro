// QuickFacts Data Types

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: DifficultyLevel;
  tags: string[];
  imageUrl?: string;
  timeRecommended: number; // in seconds
}

export interface FlashcardSet {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  subtopic?: string;
  grade: string;
  flashcards: Flashcard[];
  totalCards: number;
  estimatedTime: number; // in seconds
  difficulty: DifficultyLevel;
}

export interface QuickFactsBank {
  subject: string;
  grades: string[];
  topics: {
    name: string;
    subtopics?: string[];
  }[];
  flashcardSets: FlashcardSet[];
}

export interface UserFlashcardProgress {
  userId: string;
  flashcardId: string;
  lastSeen: string; // ISO date string
  timesCorrect: number;
  timesIncorrect: number;
  isBookmarked: boolean;
  averageResponseTime: number; // in seconds
}

export interface ChallengeResult {
  userId: string;
  setId: string;
  date: string; // ISO date string
  score: number;
  totalCards: number;
  timeSpent: number; // in seconds
  bookmarkedCards: string[]; // flashcard IDs
}