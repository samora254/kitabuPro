
export interface LearningObjective {
  id: string;
  description: string;
  bloomsLevel: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  assessmentCriteria: string[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
  learningObjectives: LearningObjective[];
  keyTerms: string[];
  activities: Activity[];
  assessments: Assessment[];
  estimatedHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Activity {
  id: string;
  name: string;
  type: 'reading' | 'exercise' | 'experiment' | 'project' | 'discussion';
  description: string;
  instructions: string[];
  materials: string[];
  duration: number;
  adaptations: {
    visualLearner?: string;
    auditoryLearner?: string;
    kinestheticLearner?: string;
  };
}

export interface Assessment {
  id: string;
  name: string;
  type: 'formative' | 'summative' | 'diagnostic';
  format: 'quiz' | 'essay' | 'project' | 'presentation' | 'practical';
  rubric: RubricCriteria[];
  passingScore: number;
}

export interface RubricCriteria {
  criterion: string;
  levels: {
    level: number;
    description: string;
    points: number;
  }[];
}

export interface Grade {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  developmentalStage: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  grades: Grade[];
  topics: Topic[];
  crossCurricularLinks: string[];
  nationalStandards: string[];
}

export interface CurriculumFramework {
  id: string;
  name: string;
  country: string;
  educationalSystem: string;
  version: string;
  subjects: Subject[];
  generalCapabilities: string[];
  crossCurricularPriorities: string[];
}
