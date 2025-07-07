import { QuestionBank } from './types';

export const socialStudiesQuestions: QuestionBank = {
  subject: "Social Studies",
  grades: ["Grade 8"],
  topics: [
    { name: "Geography", subtopics: ["Physical Geography", "Human Geography", "Map Skills"] },
    { name: "History", subtopics: ["World History", "African History", "Kenyan History"] },
    { name: "Civics", subtopics: ["Government", "Citizenship", "Human Rights"] },
    { name: "Economics", subtopics: ["Basic Economics", "Trade", "Resources"] }
  ],
  questionSets: [
    {
      id: "ss-geography-set-1",
      title: "Physical Geography of Kenya",
      description: "Test your knowledge of Kenya's physical features and geography.",
      subject: "Social Studies",
      grade: "Grade 8",
      topic: "Geography",
      subtopic: "Physical Geography",
      questions: [
        {
          id: "ss-geo-q1",
          text: "Which of the following is the highest mountain in Kenya?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Geography",
          subtopic: "Physical Geography",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Mount Elgon", "Mount Kenya", "Mount Kilimanjaro", "Aberdare Range"],
          correctAnswer: 1,
          explanation: "Mount Kenya is the highest mountain in Kenya and the second-highest in Africa, after Mount Kilimanjaro (which is in Tanzania)."
        },
        {
          id: "ss-geo-q2",
          text: "Which of the following is NOT one of Kenya's major lakes?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Geography",
          subtopic: "Physical Geography",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Lake Victoria", "Lake Tanganyika", "Lake Turkana", "Lake Naivasha"],
          correctAnswer: 1,
          explanation: "Lake Tanganyika is not in Kenya. It is shared by Tanzania, Democratic Republic of Congo, Burundi, and Zambia. The other lakes listed are all found in Kenya."
        },
        {
          id: "ss-geo-q3",
          text: "Which of the following is Kenya's largest river?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Geography",
          subtopic: "Physical Geography",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["River Tana", "River Athi", "River Nzoia", "River Yala"],
          correctAnswer: 0,
          explanation: "River Tana is the longest river in Kenya, flowing for about 1,000 kilometers before emptying into the Indian Ocean."
        },
        {
          id: "ss-geo-q4",
          text: "Which of the following best describes Kenya's climate?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Geography",
          subtopic: "Physical Geography",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Uniformly hot and humid throughout the country",
            "Varies from tropical along the coast to arid in the interior",
            "Cold and rainy throughout the year",
            "Temperate with four distinct seasons"
          ],
          correctAnswer: 1,
          explanation: "Kenya's climate varies by region, from tropical along the coast to arid in the northern and eastern parts, with cooler temperatures in the highlands."
        },
        {
          id: "ss-geo-q5",
          text: "Which of the following is a major feature of the Rift Valley in Kenya?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Geography",
          subtopic: "Physical Geography",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Coastal beaches",
            "Dense rainforests",
            "Lakes and volcanic mountains",
            "Large river deltas"
          ],
          correctAnswer: 2,
          explanation: "The Rift Valley in Kenya features several lakes (such as Lake Nakuru and Lake Naivasha) and volcanic mountains (such as Mount Longonot)."
        }
      ],
      totalPoints: 45,
      estimatedTime: 130,
      difficulty: "medium"
    },
    {
      id: "ss-history-set-1",
      title: "Kenyan Independence",
      description: "Test your knowledge of Kenya's struggle for independence and early post-colonial period.",
      subject: "Social Studies",
      grade: "Grade 8",
      topic: "History",
      subtopic: "Kenyan History",
      questions: [
        {
          id: "ss-hist-q1",
          text: "In which year did Kenya gain independence from British colonial rule?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "History",
          subtopic: "Kenyan History",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["1960", "1963", "1965", "1970"],
          correctAnswer: 1,
          explanation: "Kenya gained independence from British colonial rule on December 12, 1963."
        },
        {
          id: "ss-hist-q2",
          text: "Who was Kenya's first president after independence?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "History",
          subtopic: "Kenyan History",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Tom Mboya", "Oginga Odinga", "Jomo Kenyatta", "Daniel arap Moi"],
          correctAnswer: 2,
          explanation: "Jomo Kenyatta was Kenya's first president after independence, serving from 1964 to 1978."
        },
        {
          id: "ss-hist-q3",
          text: "Which of the following was a major nationalist movement that fought for Kenya's independence?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "History",
          subtopic: "Kenyan History",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["KANU", "Mau Mau", "FORD", "NARC"],
          correctAnswer: 1,
          explanation: "The Mau Mau was a militant nationalist movement that fought against British colonial rule in Kenya during the 1950s, contributing significantly to the struggle for independence."
        },
        {
          id: "ss-hist-q4",
          text: "What was the name of the agreement that granted Kenya internal self-government in 1963 before full independence?",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "History",
          subtopic: "Kenyan History",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 30,
          options: [
            "Madaraka Agreement",
            "Lancaster House Agreement",
            "Nairobi Accord",
            "Kenyatta Declaration"
          ],
          correctAnswer: 1,
          explanation: "The Lancaster House Agreement, reached in London in 1962, established the framework for Kenya's independence constitution and led to internal self-government in June 1963."
        },
        {
          id: "ss-hist-q5",
          text: "Which of the following was NOT one of the main grievances of Kenyans during the colonial period?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "History",
          subtopic: "Kenyan History",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Land alienation",
            "Forced labor",
            "Racial discrimination",
            "Access to free education"
          ],
          correctAnswer: 3,
          explanation: "Access to free education was not a main grievance during the colonial period. The primary grievances were land alienation (Europeans taking African lands), forced labor, racial discrimination, and heavy taxation."
        }
      ],
      totalPoints: 45,
      estimatedTime: 125,
      difficulty: "medium"
    },
    {
      id: "ss-civics-set-1",
      title: "Kenyan Government and Constitution",
      description: "Test your knowledge of Kenya's government structure and constitutional framework.",
      subject: "Social Studies",
      grade: "Grade 8",
      topic: "Civics",
      subtopic: "Government",
      questions: [
        {
          id: "ss-civ-q1",
          text: "What type of government system does Kenya have?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Civics",
          subtopic: "Government",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "Monarchy",
            "Presidential system",
            "Parliamentary system",
            "Military dictatorship"
          ],
          correctAnswer: 1,
          explanation: "Kenya has a presidential system of government where the President is both head of state and head of government."
        },
        {
          id: "ss-civ-q2",
          text: "When was the current Constitution of Kenya promulgated?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Civics",
          subtopic: "Government",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["2005", "2007", "2010", "2013"],
          correctAnswer: 2,
          explanation: "The current Constitution of Kenya was promulgated on August 27, 2010, after being approved in a referendum."
        },
        {
          id: "ss-civ-q3",
          text: "How many levels of government does Kenya have under the 2010 Constitution?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Civics",
          subtopic: "Government",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["One", "Two", "Three", "Four"],
          correctAnswer: 1,
          explanation: "Kenya has two levels of government: the national government and 47 county governments, establishing a devolved system of governance."
        },
        {
          id: "ss-civ-q4",
          text: "Which of the following is NOT one of the three arms of government in Kenya?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Civics",
          subtopic: "Government",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Executive", "Legislature", "Judiciary", "County Assembly"],
          correctAnswer: 3,
          explanation: "The three arms of government in Kenya are the Executive, Legislature (Parliament), and Judiciary. County Assemblies are part of the county governments, not a separate arm of the national government."
        },
        {
          id: "ss-civ-q5",
          text: "How many counties are there in Kenya?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Civics",
          subtopic: "Government",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["8", "27", "47", "54"],
          correctAnswer: 2,
          explanation: "Kenya is divided into 47 counties, each with its own government led by a governor."
        }
      ],
      totalPoints: 30,
      estimatedTime: 105,
      difficulty: "easy"
    },
    {
      id: "ss-economics-set-1",
      title: "Basic Economics Concepts",
      description: "Test your understanding of basic economic concepts and principles.",
      subject: "Social Studies",
      grade: "Grade 8",
      topic: "Economics",
      subtopic: "Basic Economics",
      questions: [
        {
          id: "ss-econ-q1",
          text: "What is economics?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Economics",
          subtopic: "Basic Economics",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "The study of money only",
            "The study of how society manages its scarce resources",
            "The study of business management",
            "The study of government spending"
          ],
          correctAnswer: 1,
          explanation: "Economics is the study of how society manages its scarce resources. It examines how individuals, businesses, governments, and nations make choices about how to allocate resources."
        },
        {
          id: "ss-econ-q2",
          text: "What is the difference between goods and services?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Economics",
          subtopic: "Basic Economics",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 25,
          options: [
            "Goods are expensive, services are cheap",
            "Goods are tangible items, services are intangible activities",
            "Goods are produced locally, services are imported",
            "Goods are for businesses, services are for individuals"
          ],
          correctAnswer: 1,
          explanation: "Goods are tangible, physical products that can be touched, seen, and stored (like food, clothing, or books). Services are intangible activities performed by people (like teaching, healthcare, or transportation)."
        },
        {
          id: "ss-econ-q3",
          text: "What is meant by 'demand' in economics?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Economics",
          subtopic: "Basic Economics",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "The total amount of goods available in the market",
            "The willingness and ability of consumers to purchase goods at various prices",
            "The cost of producing goods",
            "The government's request for certain products"
          ],
          correctAnswer: 1,
          explanation: "In economics, demand refers to the willingness and ability of consumers to purchase a good or service at various price levels. It's not just about wanting something, but also having the means to buy it."
        },
        {
          id: "ss-econ-q4",
          text: "What happens to demand when the price of a good increases (assuming all other factors remain constant)?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Economics",
          subtopic: "Basic Economics",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Demand increases",
            "Demand decreases",
            "Demand remains the same",
            "Demand becomes zero"
          ],
          correctAnswer: 1,
          explanation: "According to the law of demand, when the price of a good increases (and all other factors remain constant), the quantity demanded decreases. This is because consumers are generally less willing to buy products at higher prices."
        },
        {
          id: "ss-econ-q5",
          text: "What is 'supply' in economics?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Economics",
          subtopic: "Basic Economics",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "The total amount of money in an economy",
            "The willingness and ability of producers to provide goods at various prices",
            "The government's distribution of resources",
            "The total demand for all products"
          ],
          correctAnswer: 1,
          explanation: "Supply in economics refers to the willingness and ability of producers to provide goods and services at various price levels. It represents how much of a good producers are willing to offer at different prices."
        }
      ],
      totalPoints: 40,
      estimatedTime: 135,
      difficulty: "medium"
    }
  ]
};