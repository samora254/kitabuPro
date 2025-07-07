/**
 * Subject-specific theme configurations for consistent styling across the app
 */

export interface SubjectTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  lightTextColor: string;
}

export const subjectThemes: Record<string, SubjectTheme> = {
  mathematics: {
    primaryColor: '#E879F9',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#FFF5F5',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  },
  english: {
    primaryColor: '#60A5FA',
    secondaryColor: '#48BB78',
    accentColor: '#F59E0B',
    backgroundColor: '#E6FFFA',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  },
  science: {
    primaryColor: '#45B7D1',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    backgroundColor: '#E6F6FF',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  },
  'social-studies': {
    primaryColor: '#FBBF24',
    secondaryColor: '#48BB78',
    accentColor: '#F59E0B',
    backgroundColor: '#F0FFF4',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  },
  kiswahili: {
    primaryColor: '#34D399',
    secondaryColor: '#48BB78',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFF0',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  },
  'home-science': {
    primaryColor: '#FB7185', 
    secondaryColor: '#48BB78',
    accentColor: '#F59E0B',
    backgroundColor: '#FFF5F7',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  },
  default: {
    primaryColor: '#4299E1',
    secondaryColor: '#48BB78',
    accentColor: '#F59E0B',
    backgroundColor: '#F7FAFC',
    textColor: '#2D3748',
    lightTextColor: '#718096',
  }
};

/**
 * Get theme for a specific subject
 * @param subjectId The subject identifier
 * @returns The subject theme or default theme if not found
 */
export function getSubjectTheme(subjectId: string): SubjectTheme {
  return subjectThemes[subjectId] || subjectThemes.default;
}

/**
 * Get quiz style props from a subject theme
 * @param theme The subject theme
 * @returns Object with style props for the quiz components
 */
export function getQuizStyleProps(theme: SubjectTheme) {
  return {
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    accentColor: theme.accentColor,
  };
}