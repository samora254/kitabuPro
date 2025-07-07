import { QuestionBank } from './types';

export const englishQuestions: QuestionBank = {
  subject: "English",
  grades: ["Grade 8"],
  topics: [
    { name: "Grammar", subtopics: ["Parts of Speech", "Tenses", "Punctuation"] },
    { name: "Reading Comprehension", subtopics: ["Main Idea", "Supporting Details", "Inference"] },
    { name: "Writing", subtopics: ["Essays", "Letters", "Creative Writing"] },
    { name: "Vocabulary", subtopics: ["Word Meanings", "Context Clues", "Synonyms and Antonyms"] }
  ],
  questionSets: [
    {
      id: "english-grammar-set-1",
      title: "Parts of Speech",
      description: "Test your knowledge of different parts of speech in English.",
      subject: "English",
      grade: "Grade 8",
      topic: "Grammar",
      subtopic: "Parts of Speech",
      questions: [
        {
          id: "eng-g-q1",
          text: "Which of the following is a noun?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Grammar",
          subtopic: "Parts of Speech",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Run", "Beautiful", "Happiness", "Quickly"],
          correctAnswer: 2,
          explanation: "Happiness is a noun because it names a feeling or state of being."
        },
        {
          id: "eng-g-q2",
          text: "Identify the verb in the following sentence: 'The students completed their assignments.'",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Grammar",
          subtopic: "Parts of Speech",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["The", "students", "completed", "assignments"],
          correctAnswer: 2,
          explanation: "Completed is the verb as it shows the action performed by the students."
        },
        {
          id: "eng-g-q3",
          text: "Which word in the following sentence is an adjective? 'The beautiful painting hangs on the wall.'",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Grammar",
          subtopic: "Parts of Speech",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["The", "beautiful", "hangs", "wall"],
          correctAnswer: 1,
          explanation: "Beautiful is an adjective because it describes the painting."
        },
        {
          id: "eng-g-q4",
          text: "Which of the following is an adverb?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Grammar",
          subtopic: "Parts of Speech",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Happy", "Table", "Slowly", "They"],
          correctAnswer: 2,
          explanation: "Slowly is an adverb because it typically describes how an action is performed."
        },
        {
          id: "eng-g-q5",
          text: "Identify the preposition in the following sentence: 'The book is under the table.'",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Grammar",
          subtopic: "Parts of Speech",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["The", "book", "is", "under"],
          correctAnswer: 3,
          explanation: "Under is a preposition because it shows the relationship between the book and the table."
        }
      ],
      totalPoints: 35,
      estimatedTime: 110,
      difficulty: "easy"
    },
    {
      id: "english-grammar-set-2",
      title: "Tenses",
      description: "Test your understanding of different tenses in English.",
      subject: "English",
      grade: "Grade 8",
      topic: "Grammar",
      subtopic: "Tenses",
      questions: [
        {
          id: "eng-t-q1",
          text: "Which tense is used in the sentence: 'I am writing a letter.'?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Grammar",
          subtopic: "Tenses",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Simple Present", "Present Continuous", "Simple Past", "Present Perfect"],
          correctAnswer: 1,
          explanation: "Present Continuous tense is used for actions happening at the moment of speaking, formed with 'am/is/are' + present participle."
        },
        {
          id: "eng-t-q2",
          text: "Identify the tense: 'She has lived in Nairobi for five years.'",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Grammar",
          subtopic: "Tenses",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Simple Present", "Present Continuous", "Present Perfect", "Simple Past"],
          correctAnswer: 2,
          explanation: "Present Perfect tense is used for actions that started in the past and continue to the present, formed with 'has/have' + past participle."
        },
        {
          id: "eng-t-q3",
          text: "Which sentence is in the Past Perfect tense?",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "Grammar",
          subtopic: "Tenses",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 30,
          options: [
            "I went to the market.",
            "I had gone to the market before she arrived.",
            "I have been to the market.",
            "I will go to the market."
          ],
          correctAnswer: 1,
          explanation: "Past Perfect tense is used for actions completed before another past action, formed with 'had' + past participle."
        },
        {
          id: "eng-t-q4",
          text: "What tense should be used to complete this sentence? 'By next year, I _____ in Nairobi for ten years.'",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "Grammar",
          subtopic: "Tenses",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 30,
          options: ["will live", "will have lived", "have lived", "had lived"],
          correctAnswer: 1,
          explanation: "Future Perfect tense is used for actions that will be completed before a specific time in the future, formed with 'will have' + past participle."
        }
      ],
      totalPoints: 50,
      estimatedTime: 110,
      difficulty: "medium"
    },
    {
      id: "english-reading-set-1",
      title: "Reading Comprehension: Main Idea",
      description: "Practice identifying the main idea in passages.",
      subject: "English",
      grade: "Grade 8",
      topic: "Reading Comprehension",
      subtopic: "Main Idea",
      questions: [
        {
          id: "eng-r-q1",
          text: "Read the passage and identify the main idea:\n\nPlastic pollution is one of the most pressing environmental issues facing our planet today. Every year, millions of tons of plastic waste end up in our oceans, harming marine life and ecosystems. Plastic bags, bottles, and packaging materials can take hundreds of years to decompose. Many marine animals mistake plastic for food, leading to injury or death. To address this problem, many countries have begun to ban single-use plastics and promote recycling initiatives.",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Reading Comprehension",
          subtopic: "Main Idea",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 60,
          options: [
            "Plastic takes hundreds of years to decompose.",
            "Marine animals often mistake plastic for food.",
            "Plastic pollution is a serious environmental problem affecting oceans and marine life.",
            "Many countries are banning single-use plastics."
          ],
          correctAnswer: 2,
          explanation: "The main idea summarizes the entire passage, which focuses on plastic pollution as an environmental issue, its effects, and some solutions."
        },
        {
          id: "eng-r-q2",
          text: "Read the passage and identify the main idea:\n\nExercise is essential for maintaining good health. Regular physical activity strengthens the heart and improves circulation. It helps control weight and reduces the risk of diseases like diabetes and high blood pressure. Exercise also releases endorphins, which improve mood and reduce stress. Additionally, staying active can increase energy levels and promote better sleep.",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Reading Comprehension",
          subtopic: "Main Idea",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 60,
          options: [
            "Exercise helps control weight.",
            "Regular physical activity is important for overall health and well-being.",
            "Exercise releases endorphins that improve mood.",
            "Exercise can help you sleep better."
          ],
          correctAnswer: 1,
          explanation: "The main idea encompasses the overall message that exercise is important for health, with the other options being supporting details."
        }
      ],
      totalPoints: 20,
      estimatedTime: 120,
      difficulty: "medium"
    },
    {
      id: "english-vocabulary-set-1",
      title: "Vocabulary in Context",
      description: "Test your ability to determine word meanings from context.",
      subject: "English",
      grade: "Grade 8",
      topic: "Vocabulary",
      subtopic: "Context Clues",
      questions: [
        {
          id: "eng-v-q1",
          text: "What does the word 'diligent' mean in the following sentence?\n\n'Sarah is a diligent student who always completes her homework on time and studies for every test.'",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Vocabulary",
          subtopic: "Context Clues",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: ["Lazy", "Hardworking", "Intelligent", "Forgetful"],
          correctAnswer: 1,
          explanation: "The context clues 'always completes her homework on time and studies for every test' suggest that 'diligent' means hardworking or showing persistent effort."
        },
        {
          id: "eng-v-q2",
          text: "What does the word 'frugal' mean in the following sentence?\n\n'Despite winning the lottery, Mr. Johnson remained frugal, carefully saving most of his money and avoiding unnecessary purchases.'",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "Vocabulary",
          subtopic: "Context Clues",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 30,
          options: ["Wealthy", "Economical", "Generous", "Wasteful"],
          correctAnswer: 1,
          explanation: "The context clues 'carefully saving most of his money and avoiding unnecessary purchases' indicate that 'frugal' means economical or careful with money."
        },
        {
          id: "eng-v-q3",
          text: "What does the word 'amiable' mean in the following sentence?\n\n'The new teacher was amiable and approachable, always greeting students with a warm smile and offering help when needed.'",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "Vocabulary",
          subtopic: "Context Clues",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 30,
          options: ["Strict", "Friendly", "Intelligent", "Boring"],
          correctAnswer: 1,
          explanation: "The context clues 'approachable,' 'greeting students with a warm smile,' and 'offering help' suggest that 'amiable' means friendly or pleasant."
        }
      ],
      totalPoints: 40,
      estimatedTime: 90,
      difficulty: "medium"
    },
    {
      id: "english-writing-set-1",
      title: "Essay Writing",
      description: "Test your knowledge of essay structure and organization.",
      subject: "English",
      grade: "Grade 8",
      topic: "Writing",
      subtopic: "Essays",
      questions: [
        {
          id: "eng-w-q1",
          text: "Which of the following is NOT typically part of an essay introduction?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Writing",
          subtopic: "Essays",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "Hook or attention grabber",
            "Thesis statement",
            "Background information",
            "Detailed evidence and examples"
          ],
          correctAnswer: 3,
          explanation: "Detailed evidence and examples belong in the body paragraphs of an essay, not in the introduction."
        },
        {
          id: "eng-w-q2",
          text: "What is the main purpose of a thesis statement in an essay?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Writing",
          subtopic: "Essays",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "To summarize the entire essay",
            "To state the main argument or point of the essay",
            "To introduce the topic in a general way",
            "To provide background information"
          ],
          correctAnswer: 1,
          explanation: "A thesis statement presents the main argument or central point that the essay will develop and support."
        },
        {
          id: "eng-w-q3",
          text: "Which of the following is the best example of a topic sentence for a body paragraph in an essay about the benefits of exercise?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Writing",
          subtopic: "Essays",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Exercise is good for you.",
            "Regular physical activity improves cardiovascular health by strengthening the heart and improving circulation.",
            "There are many types of exercise including running, swimming, and cycling.",
            "According to a recent study, 60% of people don't get enough exercise."
          ],
          correctAnswer: 1,
          explanation: "A good topic sentence clearly states the main point of the paragraph. Option B specifically identifies one benefit of exercise (improved cardiovascular health) that the paragraph will discuss."
        }
      ],
      totalPoints: 30,
      estimatedTime: 80,
      difficulty: "medium"
    }
  ]
};