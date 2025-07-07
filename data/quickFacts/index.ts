import { mathematicsQuickFacts } from './mathematics';
import { englishQuickFacts } from './english';
import { scienceQuickFacts } from './science';
import { kiswahiliQuickFacts } from './kiswahili';
import { homeScienceQuickFacts } from './homeScience';
import { socialStudiesQuickFacts } from './socialStudies';
import { QuickFactsBank } from './types';

// Export all quick facts banks
export const quickFactsBanks = {
  mathematics: mathematicsQuickFacts,
  english: englishQuickFacts,
  science: scienceQuickFacts,
  kiswahili: kiswahiliQuickFacts,
  'home-science': homeScienceQuickFacts,
  'social-studies': socialStudiesQuickFacts
};

// Export individual quick facts banks
export { 
  mathematicsQuickFacts, 
  englishQuickFacts,
  scienceQuickFacts,
  kiswahiliQuickFacts,
  homeScienceQuickFacts,
  socialStudiesQuickFacts
};

// Export types
export * from './types';