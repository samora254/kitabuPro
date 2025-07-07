import { mathQuestions } from './mathematics';
import { englishQuestions } from './english';
import { scienceQuestions } from './science';
import { socialStudiesQuestions } from './socialStudies';
import { kiswahiliQuestions } from './kiswahili';

// Export all question banks
export const questionBanks = {
  mathematics: mathQuestions,
  english: englishQuestions,
  science: scienceQuestions,
  socialStudies: socialStudiesQuestions,
  kiswahili: kiswahiliQuestions,
};

// Export individual question banks
export { 
  mathQuestions, 
  englishQuestions, 
  scienceQuestions, 
  socialStudiesQuestions,
  kiswahiliQuestions
};