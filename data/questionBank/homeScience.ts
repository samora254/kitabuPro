import { QuestionBank } from './types';

export const homeScience: QuestionBank = {
  subject: "Home Science",
  grades: ["Grade 8"],
  topics: [
    { name: "Foods and Nutrition", subtopics: ["Food Groups", "Meal Planning", "Food Preparation"] },
    { name: "Consumer Education", subtopics: ["Consumer Rights", "Budgeting", "Shopping Practices"] },
    { name: "Textile and Clothing", subtopics: ["Fibers and Fabrics", "Clothing Construction", "Care of Clothing"] },
    { name: "Caring for the Family", subtopics: ["Family Relationships", "Child Care", "Home Management"] }
  ],
  questionSets: [
    {
      id: "home-science-foods-set-1",
      title: "Food Groups and Nutrition",
      description: "Test your knowledge of different food groups and their nutritional value.",
      subject: "Home Science",
      grade: "Grade 8",
      topic: "Foods and Nutrition",
      subtopic: "Food Groups",
      questions: [
        {
          id: "hs-fn-q1",
          text: "Which of the following is a good source of protein?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Foods and Nutrition",
          subtopic: "Food Groups",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Apples", "Beans", "Rice", "Butter"],
          correctAnswer: 1,
          explanation: "Beans are a good source of plant-based protein. They are part of the legume family which is known for its high protein content."
        },
        {
          id: "hs-fn-q2",
          text: "Which food group provides the body with energy?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Foods and Nutrition",
          subtopic: "Food Groups",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Proteins", "Carbohydrates", "Vitamins", "Minerals"],
          correctAnswer: 1,
          explanation: "Carbohydrates are the body's main source of energy. They are broken down into glucose which cells use for energy."
        },
        {
          id: "hs-fn-q3",
          text: "Which of the following is NOT a function of vitamins in the body?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Foods and Nutrition",
          subtopic: "Food Groups",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Promoting growth and development",
            "Providing energy",
            "Supporting immune function",
            "Helping in blood clotting"
          ],
          correctAnswer: 1,
          explanation: "Vitamins do not provide energy. Their main functions include promoting growth, supporting immune function, and helping in various bodily processes like blood clotting (Vitamin K)."
        },
        {
          id: "hs-fn-q4",
          text: "Which vitamin is produced when the skin is exposed to sunlight?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Foods and Nutrition",
          subtopic: "Food Groups",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
          correctAnswer: 3,
          explanation: "Vitamin D is produced when the skin is exposed to sunlight. It helps the body absorb calcium and is important for bone health."
        },
        {
          id: "hs-fn-q5",
          text: "Which of the following is a good source of calcium?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Foods and Nutrition",
          subtopic: "Food Groups",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Oranges", "Milk", "Chicken", "Rice"],
          correctAnswer: 1,
          explanation: "Milk and dairy products are excellent sources of calcium, which is essential for strong bones and teeth."
        }
      ],
      totalPoints: 35,
      estimatedTime: 115,
      difficulty: "easy"
    },
    {
      id: "home-science-foods-set-2",
      title: "Meal Planning",
      description: "Test your knowledge of meal planning principles and practices.",
      subject: "Home Science",
      grade: "Grade 8",
      topic: "Foods and Nutrition",
      subtopic: "Meal Planning",
      questions: [
        {
          id: "hs-mp-q1",
          text: "What is the main purpose of meal planning?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Foods and Nutrition",
          subtopic: "Meal Planning",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 25,
          options: [
            "To spend more money on food",
            "To ensure balanced nutrition and efficient use of resources",
            "To cook only expensive meals",
            "To avoid cooking at home"
          ],
          correctAnswer: 1,
          explanation: "Meal planning helps ensure balanced nutrition while making efficient use of time, money, and other resources."
        },
        {
          id: "hs-mp-q2",
          text: "Which of the following is NOT a factor to consider when planning meals?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Foods and Nutrition",
          subtopic: "Meal Planning",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Nutritional needs of family members",
            "Available budget",
            "The color of the dining table",
            "Food preferences of family members"
          ],
          correctAnswer: 2,
          explanation: "While factors like nutritional needs, budget, and food preferences are important in meal planning, the color of the dining table is not relevant to the nutritional or practical aspects of meal planning."
        },
        {
          id: "hs-mp-q3",
          text: "What is a balanced meal?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Foods and Nutrition",
          subtopic: "Meal Planning",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "A meal with only vegetables",
            "A meal with only proteins",
            "A meal containing appropriate portions of different food groups",
            "A meal that is expensive"
          ],
          correctAnswer: 2,
          explanation: "A balanced meal contains appropriate portions of different food groups (carbohydrates, proteins, fats, vitamins, and minerals) to provide all the nutrients the body needs."
        },
        {
          id: "hs-mp-q4",
          text: "Which of the following is a good practice in meal planning?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Foods and Nutrition",
          subtopic: "Meal Planning",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 25,
          options: [
            "Planning meals just before cooking",
            "Ignoring family preferences",
            "Making a shopping list based on planned meals",
            "Buying food without checking what you already have"
          ],
          correctAnswer: 2,
          explanation: "Making a shopping list based on planned meals helps ensure you buy only what you need, reducing waste and saving money."
        },
        {
          id: "hs-mp-q5",
          text: "What is the recommended number of meals per day for most people?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Foods and Nutrition",
          subtopic: "Meal Planning",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["1-2", "3-5", "6-7", "8-10"],
          correctAnswer: 1,
          explanation: "Most nutritionists recommend 3 main meals (breakfast, lunch, dinner) with 1-2 small snacks in between, totaling 3-5 eating occasions per day."
        }
      ],
      totalPoints: 35,
      estimatedTime: 130,
      difficulty: "medium"
    },
    {
      id: "home-science-textiles-set-1",
      title: "Fibers and Fabrics",
      description: "Test your knowledge of different types of fibers and fabrics.",
      subject: "Home Science",
      grade: "Grade 8",
      topic: "Textile and Clothing",
      subtopic: "Fibers and Fabrics",
      questions: [
        {
          id: "hs-tf-q1",
          text: "Which of the following is a natural fiber?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Textile and Clothing",
          subtopic: "Fibers and Fabrics",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Nylon", "Polyester", "Cotton", "Acrylic"],
          correctAnswer: 2,
          explanation: "Cotton is a natural fiber that comes from the cotton plant. Nylon, polyester, and acrylic are all synthetic (man-made) fibers."
        },
        {
          id: "hs-tf-q2",
          text: "Which of the following fabrics is made from animal fiber?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Textile and Clothing",
          subtopic: "Fibers and Fabrics",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Cotton", "Linen", "Wool", "Rayon"],
          correctAnswer: 2,
          explanation: "Wool is an animal fiber that comes from sheep. Cotton and linen are plant fibers, while rayon is a semi-synthetic fiber made from cellulose."
        },
        {
          id: "hs-tf-q3",
          text: "Which property makes cotton fabric suitable for hot weather?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Textile and Clothing",
          subtopic: "Fibers and Fabrics",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "It is waterproof",
            "It is highly absorbent and breathable",
            "It retains heat well",
            "It is very stretchy"
          ],
          correctAnswer: 1,
          explanation: "Cotton is highly absorbent and breathable, allowing sweat to evaporate easily, which makes it comfortable to wear in hot weather."
        },
        {
          id: "hs-tf-q4",
          text: "Which fabric is known for its strength and durability, commonly used for jeans?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Textile and Clothing",
          subtopic: "Fibers and Fabrics",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Silk", "Denim", "Chiffon", "Satin"],
          correctAnswer: 1,
          explanation: "Denim is a strong, durable cotton twill fabric that is commonly used for making jeans and other hard-wearing garments."
        },
        {
          id: "hs-tf-q5",
          text: "Which of the following is a characteristic of synthetic fibers?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Textile and Clothing",
          subtopic: "Fibers and Fabrics",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "They are all derived from plants",
            "They are biodegradable",
            "They are man-made from chemicals",
            "They are all derived from animals"
          ],
          correctAnswer: 2,
          explanation: "Synthetic fibers are man-made fibers produced from chemical compounds, usually derived from petroleum. Examples include polyester, nylon, and acrylic."
        }
      ],
      totalPoints: 40,
      estimatedTime: 120,
      difficulty: "medium"
    },
    {
      id: "home-science-family-set-1",
      title: "Family Relationships",
      description: "Test your understanding of family relationships and dynamics.",
      subject: "Home Science",
      grade: "Grade 8",
      topic: "Caring for the Family",
      subtopic: "Family Relationships",
      questions: [
        {
          id: "hs-fr-q1",
          text: "What is a nuclear family?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Caring for the Family",
          subtopic: "Family Relationships",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "A family with many children",
            "A family consisting of parents and their children only",
            "A family with extended relatives living together",
            "A family with adopted children"
          ],
          correctAnswer: 1,
          explanation: "A nuclear family consists of parents (mother and father) and their children only, without other relatives."
        },
        {
          id: "hs-fr-q2",
          text: "Which of the following is NOT a function of the family?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Caring for the Family",
          subtopic: "Family Relationships",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "Providing love and emotional support",
            "Socialization of children",
            "Economic support",
            "Determining government policies"
          ],
          correctAnswer: 3,
          explanation: "Determining government policies is not a function of the family. Families provide love, socialization, economic support, protection, and other personal needs."
        },
        {
          id: "hs-fr-q3",
          text: "What is an extended family?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Caring for the Family",
          subtopic: "Family Relationships",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "A family with more than four children",
            "A family consisting of parents and children only",
            "A family that includes relatives beyond the nuclear family",
            "A family where parents are divorced"
          ],
          correctAnswer: 2,
          explanation: "An extended family includes relatives beyond the nuclear family, such as grandparents, aunts, uncles, and cousins, often living together or in close proximity."
        },
        {
          id: "hs-fr-q4",
          text: "Which of the following is an important value in maintaining healthy family relationships?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Caring for the Family",
          subtopic: "Family Relationships",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "Competition among family members",
            "Keeping secrets from each other",
            "Respect and communication",
            "Spending as little time together as possible"
          ],
          correctAnswer: 2,
          explanation: "Respect and communication are essential values for maintaining healthy family relationships. They foster understanding, trust, and emotional bonding among family members."
        },
        {
          id: "hs-fr-q5",
          text: "What is the term for a family headed by a single parent?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Caring for the Family",
          subtopic: "Family Relationships",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "Nuclear family",
            "Single-parent family",
            "Extended family",
            "Blended family"
          ],
          correctAnswer: 1,
          explanation: "A single-parent family is headed by one parent (either mother or father) who is responsible for raising the children, often due to divorce, death, or choice."
        }
      ],
      totalPoints: 35,
      estimatedTime: 110,
      difficulty: "easy"
    }
  ]
};