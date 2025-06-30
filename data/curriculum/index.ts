import { homeScience } from './homeScience';
import { english } from './english';
import { kiswahili } from './kiswahili';
import { Curriculum } from '@/constants/curriculum';

// Export all curricula
export const curricula: Curriculum[] = [
  homeScience,
  english,
  kiswahili
];

// Export individual curricula
export { homeScience, english, kiswahili };