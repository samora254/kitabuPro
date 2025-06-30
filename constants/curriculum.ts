// Curriculum Data Structure Types

export interface LearningObjective {
  id: string;
  description: string;
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  assessmentCriteria: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'interactive' | 'document' | 'quiz' | 'exercise';
  url: string;
  duration?: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningStyles: ('visual' | 'auditory' | 'reading' | 'kinesthetic')[];
  description: string;
  thumbnailUrl?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group' | 'discussion' | 'project' | 'experiment';
  duration: number; // in minutes
  materials: string[];
  steps: string[];
  learningObjectiveIds: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'test' | 'project' | 'presentation' | 'essay';
  questions?: {
    id: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
    options?: string[];
    correctAnswer?: string | number;
    points: number;
  }[];
  rubric?: {
    criteria: string;
    levels: {
      level: string;
      description: string;
      points: number;
    }[];
  }[];
  totalPoints: number;
  passingScore: number;
  duration: number; // in minutes
  learningObjectiveIds: string[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  keyTerms: { term: string; definition: string }[];
  learningObjectives: LearningObjective[];
  resources: Resource[];
  activities: Activity[];
  assessments: Assessment[];
  prerequisites?: string[]; // Topic IDs
  nextTopics?: string[]; // Topic IDs
  estimatedDuration: number; // in minutes
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  unitAssessment?: Assessment;
  estimatedDuration: number; // in minutes
}

export interface Curriculum {
  id: string;
  subject: string;
  grade: string;
  title: string;
  description: string;
  units: Unit[];
  standards: {
    code: string;
    description: string;
  }[];
  version: string;
  lastUpdated: string;
}

// Learning Style Preferences
export interface LearningStylePreference {
  visual: number; // 0-100
  auditory: number; // 0-100
  reading: number; // 0-100
  kinesthetic: number; // 0-100
}

// Student Progress Type
export interface StudentProgress {
  userId: string;
  curriculumId: string;
  completedTopics: {
    topicId: string;
    completedAt: string;
    score?: number;
    masteryLevel?: 'not-started' | 'learning' | 'practicing' | 'mastered';
  }[];
  completedAssessments: {
    assessmentId: string;
    completedAt: string;
    score: number;
    answers?: Record<string, any>;
  }[];
  learningPath?: {
    currentTopicId: string;
    recommendedTopicIds: string[];
    recommendedResourceIds: string[];
  };
  learningStylePreference: LearningStylePreference;
  strengths: string[];
  areasForImprovement: string[];
  lastActivity: string;
}

// Curriculum Service Types
export interface CurriculumSearchParams {
  subject?: string;
  grade?: string;
  query?: string;
  topicId?: string;
  unitId?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  learningStyle?: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
}

export interface CurriculumRecommendation {
  topicId: string;
  title: string;
  description: string;
  resources: Resource[];
  reason: string;
  relevanceScore: number;
}