import { Curriculum } from '@/constants/curriculum';

export const science: Curriculum = {
  id: 'science-grade8',
  subject: 'Integrated Science',
  grade: 'Grade 8',
  title: 'Integrated Science Grade 8',
  description: 'The Integrated Science curriculum for Grade 8 builds on the competencies acquired in Grade 7. It focuses on developing scientific knowledge, skills, and attitudes through practical and theoretical approaches to learning.',
  units: [
    {
      id: 'scientific-processes',
      title: 'Scientific Processes',
      description: 'This unit explores the scientific method and processes used in scientific investigations.',
      topics: [
        {
          id: 'scientific-method',
          title: 'Scientific Method',
          description: 'Understanding the steps of the scientific method and how to apply them in investigations.',
          keyTerms: [
            { term: 'Hypothesis', definition: 'A proposed explanation for a phenomenon that can be tested through experimentation.' },
            { term: 'Variable', definition: 'A factor that can be changed, measured, or controlled in an experiment.' }
          ],
          learningObjectives: [
            {
              id: 'sm-obj1',
              description: 'Identify the steps of the scientific method',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can list the steps in correct order', 'Can explain the purpose of each step']
            },
            {
              id: 'sm-obj2',
              description: 'Design a simple scientific investigation',
              bloomsLevel: 'create',
              assessmentCriteria: ['Can formulate a testable hypothesis', 'Can identify variables to control']
            }
          ],
          resources: [
            {
              id: 'sm-res1',
              title: 'Introduction to Scientific Method',
              type: 'video',
              url: 'https://example.com/scientific-method',
              duration: 15,
              difficulty: 'beginner',
              learningStyles: ['visual', 'auditory'],
              description: 'A video explaining the steps of the scientific method with examples.',
              thumbnailUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
              id: 'sm-res2',
              title: 'Scientific Method Practice Guide',
              type: 'document',
              url: 'https://example.com/scientific-method-guide',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'A comprehensive guide to applying the scientific method in various investigations.'
            }
          ],
          activities: [
            {
              id: 'sm-act1',
              title: 'Design an Experiment',
              description: 'Design and conduct a simple experiment to test a hypothesis about plant growth.',
              type: 'group',
              duration: 45,
              materials: ['Plant seeds', 'Soil', 'Water', 'Containers', 'Measuring tools'],
              steps: [
                'Form groups of 3-4 students',
                'Formulate a hypothesis about factors affecting plant growth',
                'Design an experiment with control and experimental groups',
                'Conduct the experiment over a period of time',
                'Record observations and measurements',
                'Analyze results and draw conclusions',
                'Present findings to the class'
              ],
              learningObjectiveIds: ['sm-obj1', 'sm-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'sm-assess1',
              title: 'Scientific Method Quiz',
              description: 'A quiz to test understanding of the scientific method and its application.',
              type: 'quiz',
              questions: [
                {
                  id: 'sm-q1',
                  text: 'What is the first step in the scientific method?',
                  type: 'multiple-choice',
                  options: [
                    'Form a hypothesis',
                    'Ask a question',
                    'Conduct an experiment',
                    'Analyze results'
                  ],
                  correctAnswer: 1,
                  points: 2
                },
                {
                  id: 'sm-q2',
                  text: 'What is a control group in an experiment?',
                  type: 'multiple-choice',
                  options: [
                    'The group that receives the experimental treatment',
                    'The group that controls the experiment',
                    'The group that remains unchanged for comparison',
                    'The group that analyzes the results'
                  ],
                  correctAnswer: 2,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['sm-obj1', 'sm-obj2']
            }
          ],
          estimatedDuration: 180
        }
      ],
      estimatedDuration: 180
    },
    {
      id: 'matter',
      title: 'Matter',
      description: 'This unit covers the properties and behavior of matter.',
      topics: [
        {
          id: 'states-of-matter',
          title: 'States of Matter',
          description: 'Understanding the different states of matter and their properties.',
          keyTerms: [
            { term: 'Solid', definition: 'A state of matter characterized by structural rigidity and resistance to changes of shape or volume.' },
            { term: 'Liquid', definition: 'A state of matter that has a definite volume but no fixed shape.' },
            { term: 'Gas', definition: 'A state of matter that has neither a definite shape nor volume.' }
          ],
          learningObjectives: [
            {
              id: 'som-obj1',
              description: 'Identify the properties of solids, liquids, and gases',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can list properties of each state', 'Can explain differences between states']
            },
            {
              id: 'som-obj2',
              description: 'Explain phase changes between states of matter',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Can describe processes like melting and evaporation', 'Can explain energy changes during phase transitions']
            }
          ],
          resources: [],
          activities: [],
          assessments: [],
          estimatedDuration: 180
        }
      ],
      estimatedDuration: 180
    }
  ],
  standards: [
    {
      code: 'SCI8.1',
      description: 'Understand and apply the scientific method in investigations'
    },
    {
      code: 'SCI8.2',
      description: 'Analyze the properties and behavior of matter'
    },
    {
      code: 'SCI8.3',
      description: 'Investigate energy forms, transformations, and applications'
    }
  ],
  version: '1.0.0',
  lastUpdated: '2023-06-15'
};