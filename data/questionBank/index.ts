import { mathQuestions } from './mathematics';
import { englishQuestions } from './english';
import { scienceQuestions } from './science';
import { socialStudiesQuestions } from './socialStudies';
import { kiswahiliQuestions } from './kiswahili';
import { homeScience } from './homeScience';

// Export all question banks
export const questionBanks = {
  mathematics: mathQuestions,
  english: englishQuestions,
  science: scienceQuestions,
  'social-studies': socialStudiesQuestions,
  kiswahili: kiswahiliQuestions,
  'home-science': homeScience
};

// Export individual question banks
export { 
  mathQuestions, 
  englishQuestions, 
  scienceQuestions, 
  socialStudiesQuestions,
  kiswahiliQuestions,
  homeScience
};