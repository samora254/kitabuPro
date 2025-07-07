// Question Bank Types

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';

export type QuestionType = 
  | 'multiple-choice' 
  | 'true-false' 
  | 'short-answer' 
  | 'essay' 
  | 'matching' 
  | 'fill-in-blank';

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  topic: string;
  subtopic?: string;
  grade: string;
  points: number;
  timeEstimate: number; // in seconds
  tags?: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation?: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
  explanation?: string;
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'short-answer';
  correctAnswer: string;
  acceptableAnswers?: string[]; // alternative correct answers
  explanation?: string;
}

export interface EssayQuestion extends BaseQuestion {
  type: 'essay';
  sampleAnswer?: string;
  rubric?: {
    criteria: string;
    points: number;
  }[];
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  items: string[];
  matches: string[];
  correctMatches: number[]; // indices of matches corresponding to items
  explanation?: string;
}

export interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill-in-blank';
  text: string; // Text with blanks marked as __BLANK__
  blanks: string[]; // Correct answers for each blank
  acceptableAnswers?: string[][]; // Alternative correct answers for each blank
  explanation?: string;
}

export type Question = 
  | MultipleChoiceQuestion 
  | TrueFalseQuestion 
  | ShortAnswerQuestion 
  | EssayQuestion
  | MatchingQuestion
  | FillInBlankQuestion;

export interface QuestionSet {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  topic: string;
  subtopic?: string;
  questions: Question[];
  totalPoints: number;
  estimatedTime: number; // in seconds
  difficulty: QuestionDifficulty;
  tags?: string[];
}

export interface QuestionBank {
  subject: string;
  grades: string[];
  topics: {
    name: string;
    subtopics?: string[];
  }[];
  questionSets: QuestionSet[];
}