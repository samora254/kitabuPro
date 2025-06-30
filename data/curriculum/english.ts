import { Curriculum } from '@/constants/curriculum';

export const english: Curriculum = {
  id: 'english-grade8',
  subject: 'English',
  grade: 'Grade 8',
  title: 'English Language Grade 8',
  description: 'The English subject at the junior secondary school level exposes learners to both knowledge and use of the English language, and literary appreciation. It builds on the competencies acquired at the upper primary school level in Listening, Speaking, Reading, Writing, and Grammar in Use.',
  units: [
    {
      id: 'human-rights',
      title: 'Human Rights',
      description: 'This unit explores various aspects of human rights through listening, speaking, reading, writing, and grammar activities.',
      topics: [
        {
          id: 'human-rights-polite-language',
          title: 'Polite Language and Telephone Etiquette',
          description: 'This topic focuses on the use of polite language in telephone conversations, helping learners develop effective communication skills.',
          keyTerms: [
            { term: 'Etiquette', definition: 'The customary code of polite behavior in society or among members of a particular profession or group.' },
            { term: 'Polite language', definition: 'Words and expressions used to show respect and consideration for others during communication.' }
          ],
          learningObjectives: [
            {
              id: 'hr-pl-obj1',
              description: 'Identify polite words and phrases in telephone conversations',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can recognize polite expressions in a dialogue', 'Can distinguish between polite and impolite language']
            },
            {
              id: 'hr-pl-obj2',
              description: 'Conduct a telephone conversation using polite words and expressions',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Can use appropriate greetings', 'Can maintain politeness throughout a conversation', 'Can end a conversation politely']
            }
          ],
          resources: [
            {
              id: 'hr-pl-res1',
              title: 'Telephone Etiquette Basics',
              type: 'video',
              url: 'https://example.com/telephone-etiquette',
              duration: 15,
              difficulty: 'beginner',
              learningStyles: ['visual', 'auditory'],
              description: 'A video demonstrating proper telephone etiquette and polite expressions to use during phone conversations.',
              thumbnailUrl: 'https://images.pexels.com/photos/1181253/pexels-photo-1181253.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
              id: 'hr-pl-res2',
              title: 'Polite Expressions Reference Guide',
              type: 'document',
              url: 'https://example.com/polite-expressions-guide',
              duration: 10,
              difficulty: 'beginner',
              learningStyles: ['reading'],
              description: 'A comprehensive guide to polite expressions used in telephone conversations and other communication contexts.'
            }
          ],
          activities: [
            {
              id: 'hr-pl-act1',
              title: 'Role Play: Telephone Conversations',
              description: 'Practice telephone conversations in pairs using polite language and proper etiquette.',
              type: 'group',
              duration: 30,
              materials: ['Role play cards', 'List of polite expressions'],
              steps: [
                'Form pairs with a classmate',
                'Choose a scenario from the role play cards',
                'Plan your conversation using polite expressions',
                'Take turns role-playing the conversation',
                'Provide feedback to each other on the use of polite language'
              ],
              learningObjectiveIds: ['hr-pl-obj1', 'hr-pl-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'hr-pl-assess1',
              title: 'Telephone Etiquette Quiz',
              description: 'A quiz to test your knowledge of polite language and telephone etiquette.',
              type: 'quiz',
              questions: [
                {
                  id: 'hr-pl-q1',
                  text: 'Which of the following is a polite way to answer a phone call?',
                  type: 'multiple-choice',
                  options: [
                    'Yeah?',
                    'Hello, this is [your name] speaking. How may I help you?',
                    'What do you want?',
                    'Who is this?'
                  ],
                  correctAnswer: 1,
                  points: 2
                },
                {
                  id: 'hr-pl-q2',
                  text: 'What should you do if you need to put someone on hold during a phone call?',
                  type: 'multiple-choice',
                  options: [
                    'Just put them on hold without saying anything',
                    'Tell them to wait and immediately put them on hold',
                    'Ask politely if you can put them on hold and wait for their response',
                    'Hang up and call back later'
                  ],
                  correctAnswer: 2,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 15,
              learningObjectiveIds: ['hr-pl-obj1', 'hr-pl-obj2']
            }
          ],
          estimatedDuration: 120
        },
        {
          id: 'human-rights-extensive-reading',
          title: 'Extensive Reading: Independent Reading',
          description: 'This topic focuses on developing the habit of reading widely for information and enjoyment, with a focus on human rights themes.',
          keyTerms: [
            { term: 'Extensive reading', definition: 'Reading widely and in quantity to develop general reading skills and enjoyment.' },
            { term: 'Skimming', definition: 'Reading quickly to get the main idea of a text.' },
            { term: 'Scanning', definition: 'Reading quickly to find specific information in a text.' }
          ],
          learningObjectives: [
            {
              id: 'hr-er-obj1',
              description: 'Identify print and non-print texts that are interesting to read',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can select appropriate reading materials', 'Can explain why certain texts are interesting']
            },
            {
              id: 'hr-er-obj2',
              description: 'Read a range of texts for information',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Can extract key information from texts', 'Can discuss the content of what they have read']
            }
          ],
          resources: [
            {
              id: 'hr-er-res1',
              title: 'Human Rights Reading List',
              type: 'document',
              url: 'https://example.com/human-rights-reading-list',
              duration: 10,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'A curated list of books, articles, and online resources about human rights suitable for Grade 8 students.'
            },
            {
              id: 'hr-er-res2',
              title: 'Effective Reading Strategies',
              type: 'video',
              url: 'https://example.com/reading-strategies',
              duration: 12,
              difficulty: 'beginner',
              learningStyles: ['visual', 'auditory'],
              description: 'Learn techniques for effective reading, including skimming, scanning, and note-taking.',
              thumbnailUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
          ],
          activities: [
            {
              id: 'hr-er-act1',
              title: 'Independent Reading Session',
              description: 'Select and read materials on human rights for a specified period of time.',
              type: 'individual',
              duration: 45,
              materials: ['Reading materials on human rights', 'Dictionary', 'Notebook'],
              steps: [
                'Choose a text on human rights that interests you',
                'Read the text at your own pace',
                'Note down any unfamiliar words and look up their meanings',
                'Write a brief summary of what you have read',
                'Share your findings with a partner or small group'
              ],
              learningObjectiveIds: ['hr-er-obj1', 'hr-er-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'hr-er-assess1',
              title: 'Reading Log',
              description: 'Keep a log of the texts you have read, including summaries and reflections.',
              type: 'project',
              rubric: [
                {
                  criteria: 'Quantity of reading',
                  levels: [
                    { level: 'Excellent', description: 'Read more than 5 texts', points: 5 },
                    { level: 'Good', description: 'Read 3-4 texts', points: 4 },
                    { level: 'Satisfactory', description: 'Read 1-2 texts', points: 3 },
                    { level: 'Needs improvement', description: 'Did not complete any reading', points: 1 }
                  ]
                },
                {
                  criteria: 'Quality of summaries',
                  levels: [
                    { level: 'Excellent', description: 'Detailed and insightful summaries', points: 5 },
                    { level: 'Good', description: 'Clear and accurate summaries', points: 4 },
                    { level: 'Satisfactory', description: 'Basic summaries with some inaccuracies', points: 3 },
                    { level: 'Needs improvement', description: 'Incomplete or inaccurate summaries', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 0, // Ongoing assessment
              learningObjectiveIds: ['hr-er-obj1', 'hr-er-obj2']
            }
          ],
          estimatedDuration: 180
        },
        {
          id: 'human-rights-compound-nouns',
          title: 'Word Classes: Compound Nouns',
          description: 'This topic focuses on identifying and using compound nouns correctly in communication.',
          keyTerms: [
            { term: 'Compound noun', definition: 'A noun made up of two or more words that function as a single unit.' },
            { term: 'Hyphenated compound', definition: 'A compound noun where the words are joined by a hyphen, e.g., mother-in-law.' },
            { term: 'Closed compound', definition: 'A compound noun written as one word, e.g., classroom.' },
            { term: 'Open compound', definition: 'A compound noun written as separate words, e.g., swimming pool.' }
          ],
          learningObjectives: [
            {
              id: 'hr-cn-obj1',
              description: 'Identify compound nouns in a text',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can recognize different types of compound nouns', 'Can distinguish compound nouns from other word classes']
            },
            {
              id: 'hr-cn-obj2',
              description: 'Use compound nouns in their singular and plural forms',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Can form the plural of different types of compound nouns', 'Can use compound nouns correctly in sentences']
            }
          ],
          resources: [
            {
              id: 'hr-cn-res1',
              title: 'Understanding Compound Nouns',
              type: 'article',
              url: 'https://example.com/compound-nouns',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'An article explaining what compound nouns are, their types, and how to form their plurals.'
            },
            {
              id: 'hr-cn-res2',
              title: 'Compound Nouns in Context',
              type: 'interactive',
              url: 'https://example.com/compound-nouns-interactive',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['visual', 'kinesthetic'],
              description: 'An interactive exercise where you identify compound nouns in context and practice forming their plurals.'
            }
          ],
          activities: [
            {
              id: 'hr-cn-act1',
              title: 'Compound Noun Hunt',
              description: 'Listen to an audio recording on human rights and identify the compound nouns used.',
              type: 'group',
              duration: 30,
              materials: ['Audio recording', 'Notebook', 'Pen'],
              steps: [
                'Listen to the audio recording on human rights',
                'In groups, identify the compound nouns used in the text',
                'Categorize the compound nouns into two-word or three-word nouns',
                'Form the plurals of the compound nouns identified',
                'Use the compound nouns in sentences'
              ],
              learningObjectiveIds: ['hr-cn-obj1', 'hr-cn-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'hr-cn-assess1',
              title: 'Compound Nouns Assessment',
              description: 'A test to assess your understanding of compound nouns and your ability to use them correctly.',
              type: 'quiz',
              questions: [
                {
                  id: 'hr-cn-q1',
                  text: 'Which of the following is a compound noun?',
                  type: 'multiple-choice',
                  options: [
                    'Quickly',
                    'Beautiful',
                    'Toothbrush',
                    'Running'
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: 'hr-cn-q2',
                  text: 'What is the plural form of "mother-in-law"?',
                  type: 'multiple-choice',
                  options: [
                    'Mother-in-laws',
                    'Mothers-in-law',
                    'Mothers-in-laws',
                    'Mother-in-lawes'
                  ],
                  correctAnswer: 1,
                  points: 1
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['hr-cn-obj1', 'hr-cn-obj2']
            }
          ],
          estimatedDuration: 150
        }
      ],
      estimatedDuration: 450
    },
    {
      id: 'scientific-innovations',
      title: 'Scientific Innovations',
      description: 'This unit explores scientific innovations through various language skills and activities.',
      topics: [
        {
          id: 'scientific-innovations-oral-presentation',
          title: 'Oral Presentation: Songs',
          description: 'This topic focuses on developing oral presentation skills through songs related to scientific innovations.',
          keyTerms: [
            { term: 'Oral presentation', definition: 'A speech or talk given to an audience, often with visual aids.' },
            { term: 'Performance techniques', definition: 'Methods used to enhance a presentation, such as voice modulation, gestures, and facial expressions.' }
          ],
          learningObjectives: [
            {
              id: 'si-op-obj1',
              description: 'Identify features of songs',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can recognize rhythm, rhyme, and other poetic devices in songs', 'Can identify the structure of songs']
            },
            {
              id: 'si-op-obj2',
              description: 'Use performance techniques when singing',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Can use appropriate voice modulation', 'Can incorporate gestures and facial expressions', 'Can maintain audience engagement']
            },
            {
              id: 'si-op-obj3',
              description: 'Write songs on a scientific innovation',
              bloomsLevel: 'create',
              assessmentCriteria: ['Can compose lyrics related to scientific innovations', 'Can incorporate poetic devices in the song']
            }
          ],
          resources: [
            {
              id: 'si-op-res1',
              title: 'Effective Oral Presentation Techniques',
              type: 'video',
              url: 'https://example.com/oral-presentation-techniques',
              duration: 18,
              difficulty: 'intermediate',
              learningStyles: ['visual', 'auditory'],
              description: 'A video demonstrating effective techniques for oral presentations, including voice modulation, gestures, and audience engagement.',
              thumbnailUrl: 'https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=400'
            },
            {
              id: 'si-op-res2',
              title: 'Songs about Scientific Innovations',
              type: 'audio',
              url: 'https://example.com/science-songs',
              duration: 25,
              difficulty: 'beginner',
              learningStyles: ['auditory'],
              description: 'A collection of songs about various scientific innovations to inspire your own compositions.'
            }
          ],
          activities: [
            {
              id: 'si-op-act1',
              title: 'Song Performance Workshop',
              description: 'Watch recordings of songs from the Kenya drama and music festivals and analyze the performance techniques.',
              type: 'group',
              duration: 45,
              materials: ['Video recordings', 'Notebook', 'Pen'],
              steps: [
                'Watch recordings of songs from the Kenya drama and music festivals',
                'In groups, discuss the performance techniques that make the presentations appealing',
                'Identify songs of your choice and present them to the rest of the class',
                'Write songs on scientific innovations',
                'Recite and record the songs or poems in groups',
                'Watch the recordings and discuss the non-verbal aspects of the performance'
              ],
              learningObjectiveIds: ['si-op-obj1', 'si-op-obj2', 'si-op-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'si-op-assess1',
              title: 'Song Composition and Performance',
              description: 'Compose and perform a song about a scientific innovation.',
              type: 'presentation',
              rubric: [
                {
                  criteria: 'Content relevance',
                  levels: [
                    { level: 'Excellent', description: 'Song clearly relates to a scientific innovation with accurate information', points: 5 },
                    { level: 'Good', description: 'Song relates to a scientific innovation with mostly accurate information', points: 4 },
                    { level: 'Satisfactory', description: 'Song somewhat relates to a scientific innovation with some inaccuracies', points: 3 },
                    { level: 'Needs improvement', description: 'Song barely relates to a scientific innovation with many inaccuracies', points: 1 }
                  ]
                },
                {
                  criteria: 'Performance quality',
                  levels: [
                    { level: 'Excellent', description: 'Excellent use of voice modulation, gestures, and facial expressions', points: 5 },
                    { level: 'Good', description: 'Good use of voice modulation, gestures, and facial expressions', points: 4 },
                    { level: 'Satisfactory', description: 'Some use of voice modulation, gestures, and facial expressions', points: 3 },
                    { level: 'Needs improvement', description: 'Limited use of voice modulation, gestures, and facial expressions', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 30,
              learningObjectiveIds: ['si-op-obj1', 'si-op-obj2', 'si-op-obj3']
            }
          ],
          estimatedDuration: 180
        },
        {
          id: 'scientific-innovations-intensive-reading',
          title: 'Intensive Reading: Simple Poems',
          description: 'This topic focuses on reading and analyzing simple poems related to scientific innovations.',
          keyTerms: [
            { term: 'Persona', definition: 'The voice or character speaking in a poem.' },
            { term: 'Repetition', definition: 'A literary device where words, phrases, or lines are repeated for emphasis or effect.' }
          ],
          learningObjectives: [
            {
              id: 'si-ir-obj1',
              description: 'Identify the persona in a given poem',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can determine who is speaking in the poem', 'Can explain how the persona is revealed through the poem']
            },
            {
              id: 'si-ir-obj2',
              description: 'Identify instances of repetition in a given poem',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Can recognize repeated words, phrases, or lines', 'Can explain the effect of repetition in the poem']
            },
            {
              id: 'si-ir-obj3',
              description: 'Explain what the poem is about',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can identify the main theme or message of the poem', 'Can explain the surface and deeper meaning of the poem']
            }
          ],
          resources: [
            {
              id: 'si-ir-res1',
              title: 'Analyzing Poetry: A Guide',
              type: 'article',
              url: 'https://example.com/poetry-analysis',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'A comprehensive guide to analyzing poetry, including identifying the persona, repetition, and other literary devices.'
            },
            {
              id: 'si-ir-res2',
              title: 'Poems about Scientific Discoveries',
              type: 'document',
              url: 'https://example.com/science-poems',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'A collection of poems about various scientific discoveries and innovations.'
            }
          ],
          activities: [
            {
              id: 'si-ir-act1',
              title: 'Poetry Analysis Workshop',
              description: 'Read, analyze, and discuss poems related to scientific innovations.',
              type: 'group',
              duration: 60,
              materials: ['Printed poems', 'Notebook', 'Pen'],
              steps: [
                'Read the given poem for enjoyment',
                'Recite/rap and dramatize the given poem',
                'Discuss in pairs the voice that speaks in the poem',
                'Explain the words, phrases, and sentences in the poem that help decipher the surface and deeper meaning',
                'In groups, relate the message in the poem with real-life experiences',
                'Compose, type, and share poems related to scientific innovations',
                'Display the poems on a chart or poster in class or on the school notice board'
              ],
              learningObjectiveIds: ['si-ir-obj1', 'si-ir-obj2', 'si-ir-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'si-ir-assess1',
              title: 'Poetry Analysis',
              description: 'Analyze a poem about a scientific innovation, identifying the persona, repetition, and main message.',
              type: 'essay',
              rubric: [
                {
                  criteria: 'Identification of persona',
                  levels: [
                    { level: 'Excellent', description: 'Accurately identifies and illustrates the persona with textual evidence', points: 5 },
                    { level: 'Good', description: 'Accurately identifies the persona with some textual evidence', points: 4 },
                    { level: 'Satisfactory', description: 'Identifies the persona with limited textual evidence', points: 3 },
                    { level: 'Needs improvement', description: 'Incorrectly identifies the persona or provides no textual evidence', points: 1 }
                  ]
                },
                {
                  criteria: 'Analysis of repetition',
                  levels: [
                    { level: 'Excellent', description: 'Identifies all instances of repetition and explains their effect', points: 5 },
                    { level: 'Good', description: 'Identifies most instances of repetition and explains their effect', points: 4 },
                    { level: 'Satisfactory', description: 'Identifies some instances of repetition with limited explanation', points: 3 },
                    { level: 'Needs improvement', description: 'Fails to identify repetition or explain its effect', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 45,
              learningObjectiveIds: ['si-ir-obj1', 'si-ir-obj2', 'si-ir-obj3']
            }
          ],
          estimatedDuration: 180
        }
      ],
      estimatedDuration: 360
    },
    {
      id: 'pollution',
      title: 'Pollution',
      description: 'This unit explores the theme of pollution through various language skills and activities.',
      topics: [
        {
          id: 'pollution-listening-comprehension',
          title: 'Listening Comprehension: Cause and Effect',
          description: 'This topic focuses on developing listening comprehension skills through cause and effect texts about pollution.',
          keyTerms: [
            { term: 'Cause and effect', definition: 'A relationship where one event (the cause) makes another event happen (the effect).' },
            { term: 'Main idea', definition: 'The central point or most important thought in a text.' },
            { term: 'Context clues', definition: 'Information from the text that helps readers understand the meaning of unfamiliar words.' }
          ],
          learningObjectives: [
            {
              id: 'pol-lc-obj1',
              description: 'Identify the main idea from a cause and effect text',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Can state the central point of the text', 'Can distinguish between main ideas and supporting details']
            },
            {
              id: 'pol-lc-obj2',
              description: 'Pinpoint specific information from a cause and effect text',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Can locate and extract specific details from the text', 'Can answer questions based on the text accurately']
            },
            {
              id: 'pol-lc-obj3',
              description: 'Infer the meanings of unfamiliar words using context clues',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Can use surrounding words and sentences to determine word meanings', 'Can explain how context helps in understanding unfamiliar words']
            }
          ],
          resources: [
            {
              id: 'pol-lc-res1',
              title: 'Causes and Effects of Air Pollution',
              type: 'audio',
              url: 'https://example.com/air-pollution-audio',
              duration: 12,
              difficulty: 'intermediate',
              learningStyles: ['auditory'],
              description: 'An audio recording discussing the causes and effects of air pollution on the environment and human health.'
            },
            {
              id: 'pol-lc-res2',
              title: 'Understanding Context Clues',
              type: 'article',
              url: 'https://example.com/context-clues',
              duration: 15,
              difficulty: 'beginner',
              learningStyles: ['reading'],
              description: 'An article explaining different types of context clues and how to use them to determine the meaning of unfamiliar words.'
            }
          ],
          activities: [
            {
              id: 'pol-lc-act1',
              title: 'Listening for Main Ideas and Details',
              description: 'Listen to a cause and effect text on pollution and identify the main ideas and specific details.',
              type: 'individual',
              duration: 30,
              materials: ['Audio recording', 'Worksheet', 'Pen'],
              steps: [
                'Listen to a cause and effect text on pollution being read by the teacher or from a digital device',
                'Pick out the main idea from the text',
                'Respond to oral questions based on the text',
                'Identify and write down the ideas presented in the text',
                'Make a list of unfamiliar words and practice pronouncing them in pairs',
                'Give the meaning of specific words using context clues',
                'Look up the meanings of unfamiliar words from an online or offline dictionary',
                'Use the words to construct sentences'
              ],
              learningObjectiveIds: ['pol-lc-obj1', 'pol-lc-obj2', 'pol-lc-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'pol-lc-assess1',
              title: 'Listening Comprehension Assessment',
              description: 'A test to assess your ability to identify main ideas, extract specific information, and infer word meanings from a listening text.',
              type: 'quiz',
              questions: [
                {
                  id: 'pol-lc-q1',
                  text: 'What is the main idea of the text?',
                  type: 'multiple-choice',
                  options: [
                    'The causes of pollution',
                    'The effects of pollution on human health',
                    'Ways to reduce pollution',
                    'The history of pollution'
                  ],
                  correctAnswer: 1,
                  points: 2
                },
                {
                  id: 'pol-lc-q2',
                  text: 'Based on the context, what does the word "mitigate" mean in the text?',
                  type: 'multiple-choice',
                  options: [
                    'To make worse',
                    'To ignore',
                    'To reduce or lessen',
                    'To study'
                  ],
                  correctAnswer: 2,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['pol-lc-obj1', 'pol-lc-obj2', 'pol-lc-obj3']
            }
          ],
          estimatedDuration: 120
        }
      ],
      estimatedDuration: 120
    }
  ],
  standards: [
    {
      code: 'ENG8.1',
      description: 'Listen and respond appropriately to relevant information in a variety of contexts'
    },
    {
      code: 'ENG8.2',
      description: 'Read a wide variety of texts fluently, accurately, and interpretively for lifelong learning'
    },
    {
      code: 'ENG8.3',
      description: 'Develop critical thinking skills for life'
    },
    {
      code: 'ENG8.4',
      description: 'Read and analyse literary works and relate them to real life experiences'
    },
    {
      code: 'ENG8.5',
      description: 'Develop a lifelong interest in reading on a wide range of subjects'
    },
    {
      code: 'ENG8.6',
      description: 'Use grammatical forms to communicate appropriately in different settings'
    },
    {
      code: 'ENG8.7',
      description: 'Write texts legibly, creatively, and cohesively to empower them for life'
    },
    {
      code: 'ENG8.8',
      description: 'Apply digital literacy skills to enhance proficiency in english'
    },
    {
      code: 'ENG8.9',
      description: 'Appreciate the role of English as a medium for creativity and talent development'
    }
  ],
  version: '1.0.0',
  lastUpdated: '2023-06-15'
};