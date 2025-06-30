import { Curriculum } from '@/constants/curriculum';

export const homeScience: Curriculum = {
  id: "home-science-grade8",
  subject: "Home Science",
  grade: "Grade 8",
  title: "Home Science Grade 8 Curriculum",
  description: "Home Science is an applied and integrated science that aims at improving the quality of life for the individual, family and the community. As a discipline, it covers aspects of caring for the self, family and community, housing the family, home care, laundrywork, maternal health-care, foods, nutrition, textiles, clothing, and consumer education.",
  units: [
    {
      id: "foods-and-nutrition",
      title: "Foods and Nutrition",
      description: "This unit covers kitchen gardening, cooking starchy carbohydrate foods, meal presentation, meals for special groups, and meals for special occasions.",
      topics: [
        {
          id: "kitchen-garden",
          title: "Kitchen Garden",
          description: "A kitchen garden is a space where herbs and vegetables are grown around the house for household use. Kitchen gardens are planted with a purpose of providing food and herbs for the family throughout the year.",
          keyTerms: [
            {
              term: "Food security",
              definition: "The state of having reliable access to a sufficient quantity of affordable, nutritious food."
            },
            {
              term: "Nutrition security",
              definition: "Access to essential nutrients, not just calories, required for healthy growth and development."
            },
            {
              term: "Kitchen garden",
              definition: "A small garden where herbs, fruits, and vegetables are grown for household consumption."
            },
            {
              term: "Organic gardening",
              definition: "Gardening without the use of synthetic fertilizers and pesticides."
            }
          ],
          learningObjectives: [
            {
              id: "lo-kitchen-garden-1",
              description: "Explain the role of a kitchen garden in food and nutrition security",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Accurately explains at least 5 roles of a kitchen garden in food and nutrition security"
              ]
            },
            {
              id: "lo-kitchen-garden-2",
              description: "Describe innovative technologies for kitchen gardening",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Correctly describes at least 5 innovative technologies for kitchen gardening"
              ]
            },
            {
              id: "lo-kitchen-garden-3",
              description: "Classify food crops suitable for growing in a kitchen garden",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Accurately classifies at least 5 food crops suitable for growing in a kitchen garden"
              ]
            },
            {
              id: "lo-kitchen-garden-4",
              description: "Establish a kitchen garden for provision of healthy and affordable food",
              bloomsLevel: "create",
              assessmentCriteria: [
                "Successfully establishes a kitchen garden for provision of healthy and affordable food"
              ]
            }
          ],
          resources: [
            {
              id: "kitchen-garden-video-1",
              title: "Setting Up a Kitchen Garden",
              type: "video",
              url: "https://example.com/kitchen-garden-video",
              duration: 15,
              difficulty: "beginner",
              learningStyles: ["visual", "kinesthetic"],
              description: "A step-by-step guide on how to set up a kitchen garden using modern techniques.",
              thumbnailUrl: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "kitchen-garden-article-1",
              title: "Benefits of Kitchen Gardens",
              type: "article",
              url: "https://example.com/kitchen-garden-benefits",
              duration: 10,
              difficulty: "beginner",
              learningStyles: ["reading"],
              description: "An article explaining the various benefits of maintaining a kitchen garden for food and nutrition security."
            },
            {
              id: "kitchen-garden-interactive-1",
              title: "Kitchen Garden Planner",
              type: "interactive",
              url: "https://example.com/kitchen-garden-planner",
              duration: 20,
              difficulty: "intermediate",
              learningStyles: ["visual", "kinesthetic"],
              description: "An interactive tool to help plan your kitchen garden layout and crop selection."
            }
          ],
          activities: [
            {
              id: "kitchen-garden-activity-1",
              title: "Design a Kitchen Garden Layout",
              description: "Create a layout plan for a kitchen garden that includes different types of vegetables, herbs, and fruits.",
              type: "individual",
              duration: 45,
              materials: ["Paper", "Pencils", "Colored markers", "Ruler"],
              steps: [
                "Research different kitchen garden layouts",
                "Consider the space available and sunlight patterns",
                "Draw a layout plan with measurements",
                "Label different sections for various crops",
                "Include a legend explaining your choices"
              ],
              learningObjectiveIds: ["lo-kitchen-garden-1", "lo-kitchen-garden-2"],
              difficulty: "intermediate"
            },
            {
              id: "kitchen-garden-activity-2",
              title: "Create a Container Garden",
              description: "Establish a small container garden using recycled materials.",
              type: "group",
              duration: 90,
              materials: ["Recycled containers", "Soil", "Seeds or seedlings", "Watering can", "Labels"],
              steps: [
                "Collect suitable containers for planting",
                "Prepare containers with drainage holes",
                "Fill containers with appropriate soil mix",
                "Plant seeds or seedlings according to instructions",
                "Label each container with plant name and date",
                "Create a watering and care schedule"
              ],
              learningObjectiveIds: ["lo-kitchen-garden-3", "lo-kitchen-garden-4"],
              difficulty: "beginner"
            }
          ],
          assessments: [
            {
              id: "kitchen-garden-quiz-1",
              title: "Kitchen Garden Basics Quiz",
              description: "Test your knowledge about kitchen gardens and their importance for food security.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "What is the main purpose of a kitchen garden?",
                  type: "multiple-choice",
                  options: [
                    "Decoration only",
                    "Providing food for household consumption",
                    "Commercial farming",
                    "Scientific research"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q2",
                  text: "Which of these is NOT an innovative kitchen gardening technology?",
                  type: "multiple-choice",
                  options: [
                    "Vertical gardening",
                    "Hydroponics",
                    "Tractor plowing",
                    "Container gardening"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q3",
                  text: "List three benefits of having a kitchen garden.",
                  type: "short-answer",
                  points: 3
                }
              ],
              totalPoints: 5,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-kitchen-garden-1", "lo-kitchen-garden-2"]
            },
            {
              id: "kitchen-garden-project-1",
              title: "Kitchen Garden Implementation Project",
              description: "Plan, create, and maintain a kitchen garden over a two-week period.",
              type: "project",
              rubric: [
                {
                  criteria: "Garden Design",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Creative and efficient use of space with appropriate plant selection",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Good use of space with mostly appropriate plant selection",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Poor use of space or inappropriate plant selection",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Implementation",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Garden fully established with proper techniques",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Garden established with minor issues",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Garden poorly established with major issues",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Documentation",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Comprehensive records of garden progress and maintenance",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Adequate records of garden progress and maintenance",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Minimal or no records of garden progress and maintenance",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 15,
              passingScore: 9,
              duration: 1440, // 24 hours (over 2 weeks)
              learningObjectiveIds: ["lo-kitchen-garden-3", "lo-kitchen-garden-4"]
            }
          ],
          estimatedDuration: 360 // 6 hours
        },
        {
          id: "cooking-starchy-carbohydrates",
          title: "Cooking Starchy Carbohydrate Foods",
          description: "This topic covers methods of heat transfer when cooking foods, classification of carbohydrate foods, effects of heat on starchy carbohydrate foods, and ways to conserve food nutrients when cooking.",
          keyTerms: [
            {
              term: "Heat transfer",
              definition: "The movement of thermal energy from one object or substance to another."
            },
            {
              term: "Radiation",
              definition: "The transfer of heat through electromagnetic waves without direct contact."
            },
            {
              term: "Conduction",
              definition: "The transfer of heat through direct contact between substances."
            },
            {
              term: "Convection",
              definition: "The transfer of heat through the movement of fluids (liquids or gases)."
            },
            {
              term: "Gelatinization",
              definition: "The process where starch granules absorb water and swell when heated in a liquid, causing thickening."
            },
            {
              term: "Dextrinization",
              definition: "The breakdown of starch into dextrins by dry heat, causing browning and flavor changes."
            }
          ],
          learningObjectives: [
            {
              id: "lo-carbs-1",
              description: "Describe methods of heat transfer when cooking foods",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Correctly describes radiation, conduction, and convection methods of heat transfer"
              ]
            },
            {
              id: "lo-carbs-2",
              description: "Classify carbohydrate foods found in different localities",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Accurately classifies carbohydrate foods into starchy foods, simple and double sugars"
              ]
            },
            {
              id: "lo-carbs-3",
              description: "Explain the effect of heat on starchy carbohydrate foods",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Correctly explains effects of heat on taste, aroma, texture, color, and consistency of starchy foods"
              ]
            },
            {
              id: "lo-carbs-4",
              description: "Practice ways to conserve food nutrients when cooking carbohydrate foods",
              bloomsLevel: "apply",
              assessmentCriteria: [
                "Demonstrates at least 5 ways to conserve nutrients when cooking carbohydrate foods"
              ]
            }
          ],
          resources: [
            {
              id: "carbs-video-1",
              title: "Heat Transfer in Cooking",
              type: "video",
              url: "https://example.com/heat-transfer-video",
              duration: 12,
              difficulty: "beginner",
              learningStyles: ["visual", "auditory"],
              description: "An educational video explaining the three methods of heat transfer in cooking with examples.",
              thumbnailUrl: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "carbs-article-1",
              title: "Understanding Gelatinization and Dextrinization",
              type: "article",
              url: "https://example.com/starch-cooking-processes",
              duration: 15,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "A detailed article explaining the scientific processes that occur when starchy foods are cooked."
            },
            {
              id: "carbs-interactive-1",
              title: "Carbohydrate Classification Interactive",
              type: "interactive",
              url: "https://example.com/carb-classification",
              duration: 20,
              difficulty: "beginner",
              learningStyles: ["visual", "kinesthetic"],
              description: "An interactive tool to help classify different carbohydrate foods based on their composition."
            }
          ],
          activities: [
            {
              id: "carbs-activity-1",
              title: "Investigating Heat Effects on Starchy Foods",
              description: "Conduct experiments to observe and record the effects of heat on different starchy carbohydrate foods.",
              type: "group",
              duration: 60,
              materials: ["Various starchy foods (potatoes, rice, pasta, bread)", "Cooking equipment", "Observation sheets", "Pens"],
              steps: [
                "Divide into groups and assign different starchy foods",
                "Cook each food using different methods (boiling, baking, frying)",
                "Observe and record changes in taste, aroma, texture, color, and consistency",
                "Compare results between different cooking methods",
                "Present findings to the class"
              ],
              learningObjectiveIds: ["lo-carbs-3"],
              difficulty: "intermediate"
            },
            {
              id: "carbs-activity-2",
              title: "Nutrient Conservation Techniques",
              description: "Practice different techniques to conserve nutrients when cooking carbohydrate foods.",
              type: "individual",
              duration: 45,
              materials: ["Potatoes", "Rice", "Cooking equipment", "Measuring tools"],
              steps: [
                "Research nutrient conservation techniques",
                "Prepare a cooking plan that incorporates these techniques",
                "Cook starchy foods using the techniques",
                "Document the process and explain how each technique helps conserve nutrients",
                "Evaluate the results"
              ],
              learningObjectiveIds: ["lo-carbs-4"],
              difficulty: "intermediate"
            }
          ],
          assessments: [
            {
              id: "carbs-quiz-1",
              title: "Heat Transfer and Carbohydrate Cooking Quiz",
              description: "Test your knowledge about heat transfer methods and their effects on carbohydrate foods.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which heat transfer method involves the movement of heated particles within a fluid?",
                  type: "multiple-choice",
                  options: [
                    "Conduction",
                    "Radiation",
                    "Convection",
                    "Absorption"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What is gelatinization?",
                  type: "multiple-choice",
                  options: [
                    "The browning of food surfaces due to dry heat",
                    "The process where starch granules absorb water and swell when heated",
                    "The breakdown of proteins in food",
                    "The evaporation of water from food"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q3",
                  text: "Explain two ways to conserve nutrients when cooking starchy foods.",
                  type: "short-answer",
                  points: 2
                }
              ],
              totalPoints: 4,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-carbs-1", "lo-carbs-3", "lo-carbs-4"]
            }
          ],
          estimatedDuration: 360 // 6 hours
        },
        {
          id: "meal-presentation",
          title: "Meal Presentation",
          description: "This topic covers factors to consider during table setting, requirements for table setting, and various styles of meal service.",
          keyTerms: [
            {
              term: "Meal presentation",
              definition: "The art of modifying, processing, arranging, or decorating food to enhance its aesthetic appeal."
            },
            {
              term: "Table setting",
              definition: "The arrangement of tableware, including eating utensils and for serving and eating."
            },
            {
              term: "Table linen",
              definition: "Textile products used on a dining table, including tablecloths, napkins, and place mats."
            },
            {
              term: "Family service",
              definition: "A meal service style where food is served from serving dishes at the table."
            },
            {
              term: "Blue plate service",
              definition: "A meal service style where food is plated in the kitchen before being served."
            },
            {
              term: "Buffet service",
              definition: "A meal service style where food is served from a buffet table and guests serve themselves."
            }
          ],
          learningObjectives: [
            {
              id: "lo-meal-1",
              description: "Explain factors to consider during table setting in meal presentation",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Correctly explains factors to consider during table setting in meal presentation"
              ]
            },
            {
              id: "lo-meal-2",
              description: "Describe requirements for table setting when serving meals",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Accurately describes requirements for table setting when serving meals"
              ]
            },
            {
              id: "lo-meal-3",
              description: "Set a table for a meal presentation",
              bloomsLevel: "apply",
              assessmentCriteria: [
                "Correctly sets a table for an informal meal presentation"
              ]
            },
            {
              id: "lo-meal-4",
              description: "Prepare and present a simple lunch using various styles of meal service",
              bloomsLevel: "create",
              assessmentCriteria: [
                "Successfully prepares and presents a simple lunch using various styles of meal service"
              ]
            }
          ],
          resources: [
            {
              id: "meal-video-1",
              title: "Table Setting Basics",
              type: "video",
              url: "https://example.com/table-setting-video",
              duration: 10,
              difficulty: "beginner",
              learningStyles: ["visual"],
              description: "A video demonstration of basic table setting techniques for different occasions.",
              thumbnailUrl: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "meal-article-1",
              title: "Styles of Meal Service",
              type: "article",
              url: "https://example.com/meal-service-styles",
              duration: 12,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "An article explaining different styles of meal service including family, blue plate, and buffet service."
            },
            {
              id: "meal-interactive-1",
              title: "Interactive Table Setting Guide",
              type: "interactive",
              url: "https://example.com/interactive-table-setting",
              duration: 15,
              difficulty: "beginner",
              learningStyles: ["visual", "kinesthetic"],
              description: "An interactive guide that allows you to practice setting a table for different types of meals."
            }
          ],
          activities: [
            {
              id: "meal-activity-1",
              title: "Table Setting Practice",
              description: "Practice setting a table for a three-course meal.",
              type: "individual",
              duration: 30,
              materials: ["Table", "Tablecloth", "Napkins", "Plates", "Cutlery", "Glasses"],
              steps: [
                "Review the requirements for table setting",
                "Arrange the tablecloth on the table",
                "Place the dinner plates in position",
                "Arrange the cutlery according to the meal to be served",
                "Place the glasses in the correct position",
                "Fold and place the napkins",
                "Add a centerpiece if available"
              ],
              learningObjectiveIds: ["lo-meal-2", "lo-meal-3"],
              difficulty: "beginner"
            },
            {
              id: "meal-activity-2",
              title: "Meal Service Simulation",
              description: "Simulate different styles of meal service in groups.",
              type: "group",
              duration: 60,
              materials: ["Prepared food items", "Serving dishes", "Plates", "Cutlery", "Glasses", "Table setting materials"],
              steps: [
                "Divide into groups of 4-6 students",
                "Each group selects a meal service style (family, blue plate, or buffet)",
                "Set up the table according to the chosen style",
                "Prepare simple food items or use mock food",
                "Demonstrate the service style to the class",
                "Discuss the advantages and disadvantages of each style"
              ],
              learningObjectiveIds: ["lo-meal-4"],
              difficulty: "intermediate"
            }
          ],
          assessments: [
            {
              id: "meal-quiz-1",
              title: "Table Setting and Meal Presentation Quiz",
              description: "Test your knowledge about table setting and meal presentation.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which of these is NOT a factor to consider during table setting?",
                  type: "multiple-choice",
                  options: [
                    "Occasion",
                    "Number of guests",
                    "Weather forecast",
                    "Type of meal"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "In which meal service style is food plated in the kitchen before serving?",
                  type: "multiple-choice",
                  options: [
                    "Family service",
                    "Blue plate service",
                    "Buffet service",
                    "Self-service"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q3",
                  text: "Describe the correct placement of cutlery in a basic table setting.",
                  type: "short-answer",
                  points: 2
                }
              ],
              totalPoints: 4,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-meal-1", "lo-meal-2"]
            },
            {
              id: "meal-practical-1",
              title: "Table Setting Practical Assessment",
              description: "Demonstrate your ability to set a table correctly for a specific occasion.",
              type: "presentation",
              rubric: [
                {
                  criteria: "Correctness of placement",
                  levels: [
                    {
                      level: "Excellent",
                      description: "All items placed correctly with proper spacing",
                      points: 3
                    },
                    {
                      level: "Satisfactory",
                      description: "Most items placed correctly with minor errors",
                      points: 2
                    },
                    {
                      level: "Needs Improvement",
                      description: "Several items incorrectly placed",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Neatness and presentation",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Table setting is neat, clean, and visually appealing",
                      points: 3
                    },
                    {
                      level: "Satisfactory",
                      description: "Table setting is mostly neat with minor issues",
                      points: 2
                    },
                    {
                      level: "Needs Improvement",
                      description: "Table setting is untidy or disorganized",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 6,
              passingScore: 4,
              duration: 20,
              learningObjectiveIds: ["lo-meal-3"]
            }
          ],
          estimatedDuration: 360 // 6 hours
        }
      ],
      estimatedDuration: 1080 // 18 hours
    },
    {
      id: "consumer-education",
      title: "Consumer Education",
      description: "This unit covers consumer awareness and market competition.",
      topics: [
        {
          id: "consumer-awareness",
          title: "Consumer Awareness",
          description: "Consumer awareness refers to the understanding by an individual of their rights as a consumer concerning available products and services being marketed and sold.",
          keyTerms: [
            {
              term: "Consumer",
              definition: "A person who purchases goods and services for personal use."
            },
            {
              term: "Consumer awareness",
              definition: "The understanding by an individual of their rights as a consumer."
            },
            {
              term: "Consumer behavior",
              definition: "The study of individuals, groups, or organizations and the processes they use to select, secure, use, and dispose of products, services, experiences, or ideas to satisfy needs."
            },
            {
              term: "Needs",
              definition: "Essential items required for survival, such as food, clothing, and shelter."
            },
            {
              term: "Wants",
              definition: "Desires for goods and services that are not essential for survival but enhance quality of life."
            }
          ],
          learningObjectives: [
            {
              id: "lo-consumer-1",
              description: "Explain the role of consumer awareness in consumer education",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Logically explains the role of consumer awareness in consumer education with supportive details"
              ]
            },
            {
              id: "lo-consumer-2",
              description: "Examine consumer behavior in satisfaction of household needs and wants",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Gives a smooth flow of ideas with coherence when examining consumer behavior"
              ]
            },
            {
              id: "lo-consumer-3",
              description: "Evaluate types of consumer buyers in the market",
              bloomsLevel: "evaluate",
              assessmentCriteria: [
                "Distinctively and clearly evaluates all types of buyers in the market with details"
              ]
            },
            {
              id: "lo-consumer-4",
              description: "Examine roles of a consumer in acquisition of goods and services",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Examines at least 4 roles of a consumer in acquisition of household goods and services with supportive details"
              ]
            }
          ],
          resources: [
            {
              id: "consumer-video-1",
              title: "Understanding Consumer Rights",
              type: "video",
              url: "https://example.com/consumer-rights-video",
              duration: 15,
              difficulty: "beginner",
              learningStyles: ["visual", "auditory"],
              description: "A video explaining the basic rights of consumers and how to exercise them.",
              thumbnailUrl: "https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "consumer-article-1",
              title: "Types of Consumers in the Market",
              type: "article",
              url: "https://example.com/consumer-types",
              duration: 12,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "An article describing different types of consumers and their buying behaviors."
            },
            {
              id: "consumer-interactive-1",
              title: "Consumer Decision-Making Simulator",
              type: "interactive",
              url: "https://example.com/consumer-decisions",
              duration: 20,
              difficulty: "intermediate",
              learningStyles: ["kinesthetic"],
              description: "An interactive simulation that allows you to practice making consumer decisions in various scenarios."
            }
          ],
          activities: [
            {
              id: "consumer-activity-1",
              title: "Consumer Behavior Role Play",
              description: "Role play different types of consumers and their buying behaviors.",
              type: "group",
              duration: 45,
              materials: ["Role cards", "Props for shopping scenarios", "Observation sheets"],
              steps: [
                "Divide into groups of 4-5 students",
                "Assign each group a type of consumer (loyal customers, impulse shoppers, etc.)",
                "Prepare a short role play demonstrating the assigned consumer type",
                "Present the role play to the class",
                "Discuss the characteristics observed in each type of consumer"
              ],
              learningObjectiveIds: ["lo-consumer-2", "lo-consumer-3"],
              difficulty: "intermediate"
            },
            {
              id: "consumer-activity-2",
              title: "Consumer Rights Investigation",
              description: "Research and present on consumer rights and responsibilities.",
              type: "individual",
              duration: 60,
              materials: ["Research materials", "Presentation materials"],
              steps: [
                "Research consumer rights and responsibilities",
                "Identify examples of consumer rights violations",
                "Create a presentation on your findings",
                "Include recommendations for consumers to protect their rights",
                "Present to the class"
              ],
              learningObjectiveIds: ["lo-consumer-1", "lo-consumer-4"],
              difficulty: "intermediate"
            }
          ],
          assessments: [
            {
              id: "consumer-quiz-1",
              title: "Consumer Awareness Quiz",
              description: "Test your knowledge about consumer awareness and consumer behavior.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which of the following is NOT a role of a consumer?",
                  type: "multiple-choice",
                  options: [
                    "Decision maker",
                    "Influencer",
                    "Manufacturer",
                    "User"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What type of consumer makes purchases without prior planning?",
                  type: "multiple-choice",
                  options: [
                    "Loyal customer",
                    "Impulse shopper",
                    "Need-based customer",
                    "Discount customer"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q3",
                  text: "Explain the difference between needs and wants in consumer behavior.",
                  type: "short-answer",
                  points: 2
                }
              ],
              totalPoints: 4,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-consumer-1", "lo-consumer-2", "lo-consumer-3"]
            }
          ],
          estimatedDuration: 180 // 3 hours
        },
        {
          id: "market-competition",
          title: "Market Competition",
          description: "Market competition refers to the rivalry among sellers trying to achieve such goals as increasing profits, market share, and sales volume by varying the elements of the marketing mix: price, product, distribution, and promotion.",
          keyTerms: [
            {
              term: "Market",
              definition: "A place where buyers and sellers can meet to facilitate the exchange of goods and services."
            },
            {
              term: "Competition",
              definition: "The rivalry among sellers trying to achieve goals like increasing profits and market share."
            },
            {
              term: "Fair competition",
              definition: "Competition that follows ethical business practices and legal regulations."
            },
            {
              term: "Unfair competition",
              definition: "Business practices that are deceptive, fraudulent, or harmful to consumers or other businesses."
            }
          ],
          learningObjectives: [
            {
              id: "lo-market-1",
              description: "Examine the concept of market competition in relation to the consumer",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Gives a smooth flow of ideas with coherence when examining the concept of market competition"
              ]
            },
            {
              id: "lo-market-2",
              description: "Explain the role of competition in the marketplace",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Explanation on need for competition in the marketplace is rich and detailed"
              ]
            },
            {
              id: "lo-market-3",
              description: "Assess factors that influence competition in the market",
              bloomsLevel: "evaluate",
              assessmentCriteria: [
                "Gives logical assessment of factors that influence competition in the market with examples"
              ]
            },
            {
              id: "lo-market-4",
              description: "Highlight fair and unfair market competition in acquisition of necessities",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Gives in-depth details when illustrating fair and unfair market competition"
              ]
            }
          ],
          resources: [
            {
              id: "market-video-1",
              title: "Understanding Market Competition",
              type: "video",
              url: "https://example.com/market-competition-video",
              duration: 18,
              difficulty: "intermediate",
              learningStyles: ["visual", "auditory"],
              description: "A video explaining the concept of market competition and its impact on consumers.",
              thumbnailUrl: "https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "market-article-1",
              title: "Fair vs. Unfair Competition Practices",
              type: "article",
              url: "https://example.com/fair-unfair-competition",
              duration: 15,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "An article discussing the differences between fair and unfair competition practices in the market."
            },
            {
              id: "market-interactive-1",
              title: "Market Competition Simulator",
              type: "interactive",
              url: "https://example.com/market-simulator",
              duration: 25,
              difficulty: "advanced",
              learningStyles: ["kinesthetic"],
              description: "An interactive simulation that allows you to experience how market competition affects prices, quality, and innovation."
            }
          ],
          activities: [
            {
              id: "market-activity-1",
              title: "Market Competition Poster Design",
              description: "Create posters illustrating fair and unfair competition practices.",
              type: "group",
              duration: 60,
              materials: ["Poster paper", "Markers", "Magazines for cutting out images", "Glue", "Scissors"],
              steps: [
                "Research examples of fair and unfair competition",
                "Divide into groups of 3-4 students",
                "Each group creates two posters - one for fair competition and one for unfair competition",
                "Include visual examples and explanations on each poster",
                "Present and explain your posters to the class"
              ],
              learningObjectiveIds: ["lo-market-1", "lo-market-4"],
              difficulty: "intermediate"
            },
            {
              id: "market-activity-2",
              title: "Local Market Competition Analysis",
              description: "Analyze competition among local businesses in your community.",
              type: "individual",
              duration: 90,
              materials: ["Notebook", "Pen", "Camera (optional)"],
              steps: [
                "Select a category of businesses in your local area (e.g., food stores, clothing shops)",
                "Visit or research at least three competing businesses",
                "Observe and note how they compete (price, quality, variety, promotion)",
                "Analyze how this competition benefits or affects consumers",
                "Write a report on your findings",
                "Share your analysis with the class"
              ],
              learningObjectiveIds: ["lo-market-2", "lo-market-3"],
              difficulty: "advanced"
            }
          ],
          assessments: [
            {
              id: "market-quiz-1",
              title: "Market Competition Quiz",
              description: "Test your knowledge about market competition and its effects on consumers.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which of the following is NOT a factor that influences market competition?",
                  type: "multiple-choice",
                  options: [
                    "Price",
                    "Quality",
                    "Weather conditions",
                    "Promotion"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What is the main benefit of market competition for consumers?",
                  type: "multiple-choice",
                  options: [
                    "Higher prices",
                    "Fewer choices",
                    "Better quality products and services",
                    "Less innovation"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q3",
                  text: "Explain one example of unfair market competition and its potential impact on consumers.",
                  type: "short-answer",
                  points: 2
                }
              ],
              totalPoints: 4,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-market-1", "lo-market-2", "lo-market-4"]
            },
            {
              id: "market-project-1",
              title: "Market Competition Case Study",
              description: "Develop a case study analyzing competition in a specific market sector.",
              type: "project",
              rubric: [
                {
                  criteria: "Research Quality",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Comprehensive research with multiple reliable sources",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Adequate research with some reliable sources",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Limited research with few reliable sources",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Analysis Depth",
                  levels: [
                    {
                      level: "Excellent",
                      description: "In-depth analysis of competition factors and their effects",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Basic analysis of competition factors and their effects",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Superficial analysis with limited understanding",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Consumer Impact Assessment",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Thorough assessment of how competition affects consumers",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Basic assessment of how competition affects consumers",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Limited assessment of consumer impacts",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 15,
              passingScore: 9,
              duration: 120,
              learningObjectiveIds: ["lo-market-1", "lo-market-2", "lo-market-3", "lo-market-4"]
            }
          ],
          estimatedDuration: 180 // 3 hours
        }
      ],
      estimatedDuration: 360 // 6 hours
    },
    {
      id: "textile-and-clothing",
      title: "Textile and Clothing",
      description: "This unit covers artificial textile fibers, seams, and methods of controlling fullness in garment construction.",
      topics: [
        {
          id: "artificial-textile-fibers",
          title: "Artificial Textile Fibers",
          description: "Artificial textile fibers are man-made fibers produced by chemical processes. They include synthetic fibers like nylon, polyester, and acrylic, as well as regenerated fibers like viscose rayon and acetate rayon.",
          keyTerms: [
            {
              term: "Artificial fibers",
              definition: "Man-made fibers produced by chemical processes rather than occurring naturally."
            },
            {
              term: "Synthetic fibers",
              definition: "Fibers made entirely from chemicals, such as nylon, polyester, and acrylic."
            },
            {
              term: "Regenerated fibers",
              definition: "Fibers made from natural materials that are chemically processed, such as viscose rayon and acetate rayon."
            },
            {
              term: "Burning test",
              definition: "A method to identify fiber content by observing how the fiber burns, smells, and the residue it leaves."
            }
          ],
          learningObjectives: [
            {
              id: "lo-fibers-1",
              description: "Classify textile fibers based on their artificial sources",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Distinctively and clearly classifies textile fibers based on their artificial sources"
              ]
            },
            {
              id: "lo-fibers-2",
              description: "Describe the properties of artificial fibers",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Makes no errors when describing properties of artificial fibers"
              ]
            },
            {
              id: "lo-fibers-3",
              description: "Describe uses of different artificial textile fibers",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Gives a smooth flow of ideas with coherence when describing uses of artificial textile fibers"
              ]
            },
            {
              id: "lo-fibers-4",
              description: "Carry out identification tests on artificial textile fibers",
              bloomsLevel: "apply",
              assessmentCriteria: [
                "Carries out intuitive identification tests on artificial textile fibers and gives supportive details"
              ]
            }
          ],
          resources: [
            {
              id: "fibers-video-1",
              title: "Introduction to Artificial Fibers",
              type: "video",
              url: "https://example.com/artificial-fibers-intro",
              duration: 15,
              difficulty: "beginner",
              learningStyles: ["visual", "auditory"],
              description: "A video introducing the different types of artificial fibers and their basic properties.",
              thumbnailUrl: "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "fibers-article-1",
              title: "Properties and Uses of Synthetic Fibers",
              type: "article",
              url: "https://example.com/synthetic-fibers-properties",
              duration: 20,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "A detailed article explaining the properties and common uses of nylon, polyester, and acrylic fibers."
            },
            {
              id: "fibers-video-2",
              title: "Fiber Identification Tests",
              type: "video",
              url: "https://example.com/fiber-identification",
              duration: 18,
              difficulty: "intermediate",
              learningStyles: ["visual", "kinesthetic"],
              description: "A demonstration of various tests used to identify artificial fibers, including burning tests and chemical tests.",
              thumbnailUrl: "https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
          ],
          activities: [
            {
              id: "fibers-activity-1",
              title: "Textile Fiber Sampler",
              description: "Create a sampler of different artificial textile fibers with their properties and uses.",
              type: "individual",
              duration: 60,
              materials: ["Fabric samples", "Cardboard or scrapbook", "Glue", "Labels", "Information cards"],
              steps: [
                "Collect samples of fabrics made from different artificial fibers",
                "Mount each sample on cardboard or in a scrapbook",
                "Label each sample with the fiber name",
                "Create information cards listing properties and uses for each fiber",
                "Attach the information cards next to the corresponding samples",
                "Present your sampler to the class"
              ],
              learningObjectiveIds: ["lo-fibers-1", "lo-fibers-2", "lo-fibers-3"],
              difficulty: "intermediate"
            },
            {
              id: "fibers-activity-2",
              title: "Fiber Identification Lab",
              description: "Conduct tests to identify unknown artificial fiber samples.",
              type: "group",
              duration: 90,
              materials: ["Unknown fabric samples", "Magnifying glass", "Matches or lighter", "Tweezers", "Metal tray", "Safety equipment", "Identification chart", "Lab worksheet"],
              steps: [
                "Review safety procedures for conducting burning tests",
                "Examine each unknown sample visually and with a magnifying glass",
                "Record observations about appearance and texture",
                "Conduct burning tests on small snippets of each sample",
                "Record observations about burning behavior, odor, and ash",
                "Compare results with identification chart",
                "Determine the fiber content of each sample",
                "Complete lab worksheet with findings"
              ],
              learningObjectiveIds: ["lo-fibers-4"],
              difficulty: "advanced"
            }
          ],
          assessments: [
            {
              id: "fibers-quiz-1",
              title: "Artificial Textile Fibers Quiz",
              description: "Test your knowledge about artificial textile fibers, their properties, and uses.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which of the following is NOT a synthetic fiber?",
                  type: "multiple-choice",
                  options: [
                    "Nylon",
                    "Polyester",
                    "Viscose rayon",
                    "Acrylic"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What happens when nylon burns?",
                  type: "multiple-choice",
                  options: [
                    "Burns quickly with a yellow flame",
                    "Melts and forms hard beads",
                    "Burns slowly with a green flame",
                    "Turns to ash immediately"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q3",
                  text: "List three common uses for polyester fiber.",
                  type: "short-answer",
                  points: 3
                }
              ],
              totalPoints: 5,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-fibers-1", "lo-fibers-2", "lo-fibers-3", "lo-fibers-4"]
            },
            {
              id: "fibers-practical-1",
              title: "Fiber Identification Practical Test",
              description: "Demonstrate your ability to identify artificial fibers using various tests.",
              type: "presentation",
              rubric: [
                {
                  criteria: "Test Procedure",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Correctly performs all identification tests with proper technique",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Performs most identification tests with minor technique errors",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Performs tests incorrectly or with major technique errors",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Observation Skills",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Accurately observes and records all relevant characteristics",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Observes and records most relevant characteristics",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Misses many relevant characteristics in observations",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Identification Accuracy",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Correctly identifies all fiber samples",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Correctly identifies most fiber samples",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Incorrectly identifies most fiber samples",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 15,
              passingScore: 9,
              duration: 30,
              learningObjectiveIds: ["lo-fibers-4"]
            }
          ],
          estimatedDuration: 360 // 6 hours
        },
        {
          id: "seams",
          title: "Seams",
          description: "Seams are the foundation of garment construction, joining two or more pieces of fabric together. This topic covers different types of seams, their uses, and construction techniques.",
          keyTerms: [
            {
              term: "Seam",
              definition: "The line where two pieces of fabric are joined together by stitching."
            },
            {
              term: "Plain seam",
              definition: "The most basic type of seam where two pieces of fabric are stitched together with the right sides facing."
            },
            {
              term: "French seam",
              definition: "A seam that encloses the raw edges within itself, creating a clean finish on both sides."
            },
            {
              term: "Overlaid seam",
              definition: "Also called a lapped seam, where one piece of fabric overlaps another before stitching."
            },
            {
              term: "Machine-fell seam",
              definition: "A strong, flat seam with two rows of stitching, commonly used in jeans and shirts."
            }
          ],
          learningObjectives: [
            {
              id: "lo-seams-1",
              description: "Classify different types of seams used in clothing construction",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Gives a smooth flow of ideas when classifying different seams used in clothing construction and gives supportive details"
              ]
            },
            {
              id: "lo-seams-2",
              description: "Analyze factors to consider when choosing seams in clothing construction",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Analyzes all 6 factors to consider when choosing seams in clothing construction and cites examples"
              ]
            },
            {
              id: "lo-seams-3",
              description: "Examine the qualities of well-made seams in clothing construction",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Conclusively examines the qualities of well-made seams in clothing construction and gives supportive details"
              ]
            },
            {
              id: "lo-seams-4",
              description: "Make different seams used in clothing construction",
              bloomsLevel: "apply",
              assessmentCriteria: [
                "Systematically and comprehensively makes and mounts different seams and gives supportive details and steps"
              ]
            },
            {
              id: "lo-seams-5",
              description: "Construct a simple garment using suitable seams",
              bloomsLevel: "create",
              assessmentCriteria: [
                "Makes no errors when constructing a simple garment and completes it using suitable seams"
              ]
            }
          ],
          resources: [
            {
              id: "seams-video-1",
              title: "Types of Seams in Garment Construction",
              type: "video",
              url: "https://example.com/seam-types-video",
              duration: 20,
              difficulty: "beginner",
              learningStyles: ["visual", "auditory"],
              description: "A comprehensive video explaining different types of seams and their uses in garment construction.",
              thumbnailUrl: "https://images.pexels.com/photos/4620624/pexels-photo-4620624.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "seams-article-1",
              title: "Choosing the Right Seam for Your Project",
              type: "article",
              url: "https://example.com/choosing-seams",
              duration: 15,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "An article discussing factors to consider when selecting seams for different garments and fabrics."
            },
            {
              id: "seams-video-2",
              title: "Step-by-Step French Seam Tutorial",
              type: "video",
              url: "https://example.com/french-seam-tutorial",
              duration: 12,
              difficulty: "intermediate",
              learningStyles: ["visual", "kinesthetic"],
              description: "A detailed tutorial on how to make a perfect French seam.",
              thumbnailUrl: "https://images.pexels.com/photos/3905796/pexels-photo-3905796.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
          ],
          activities: [
            {
              id: "seams-activity-1",
              title: "Seam Sampler Creation",
              description: "Create a sampler of different types of seams for reference.",
              type: "individual",
              duration: 120,
              materials: ["Fabric pieces", "Sewing machine or needle and thread", "Scissors", "Pins", "Iron", "Mounting paper or cardboard", "Labels"],
              steps: [
                "Cut fabric pieces for each type of seam",
                "Practice and create samples of plain, French, overlaid, and machine-fell seams",
                "Press each seam neatly",
                "Mount the samples on paper or cardboard",
                "Label each sample with the seam name and its uses",
                "Add notes about the qualities of well-made versions of each seam"
              ],
              learningObjectiveIds: ["lo-seams-1", "lo-seams-3", "lo-seams-4"],
              difficulty: "intermediate"
            },
            {
              id: "seams-activity-2",
              title: "Simple Garment Construction",
              description: "Construct a simple child's garment using appropriate seams.",
              type: "individual",
              duration: 240,
              materials: ["Fabric", "Pattern", "Sewing machine", "Thread", "Scissors", "Pins", "Measuring tape", "Iron"],
              steps: [
                "Select an appropriate pattern for a simple child's garment",
                "Choose suitable fabric",
                "Cut out pattern pieces",
                "Decide which seams to use for different parts of the garment",
                "Construct the garment using the chosen seams",
                "Press the finished garment",
                "Evaluate the quality of the seams and overall construction"
              ],
              learningObjectiveIds: ["lo-seams-2", "lo-seams-4", "lo-seams-5"],
              difficulty: "advanced"
            }
          ],
          assessments: [
            {
              id: "seams-quiz-1",
              title: "Seams in Clothing Construction Quiz",
              description: "Test your knowledge about different types of seams and their applications.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which seam is most appropriate for sheer fabrics?",
                  type: "multiple-choice",
                  options: [
                    "Plain seam",
                    "French seam",
                    "Overlaid seam",
                    "Machine-fell seam"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What is the main advantage of a machine-fell seam?",
                  type: "multiple-choice",
                  options: [
                    "It's the easiest to make",
                    "It uses the least thread",
                    "It's very strong and durable",
                    "It's invisible from both sides"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q3",
                  text: "List three factors to consider when choosing a seam for a garment.",
                  type: "short-answer",
                  points: 3
                }
              ],
              totalPoints: 5,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-seams-1", "lo-seams-2"]
            },
            {
              id: "seams-practical-1",
              title: "Seam Construction Practical Assessment",
              description: "Demonstrate your ability to construct different types of seams.",
              type: "presentation",
              rubric: [
                {
                  criteria: "Technique",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Seams constructed using correct techniques with no errors",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Seams constructed using mostly correct techniques with minor errors",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Seams constructed with incorrect techniques or major errors",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Neatness",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Seams are very neat with even stitching and proper pressing",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Seams are mostly neat with minor issues in stitching or pressing",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Seams are untidy with uneven stitching or improper pressing",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Functionality",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Seams are strong, appropriate for the fabric, and serve their purpose well",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Seams are adequately strong and mostly appropriate for the fabric",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Seams are weak or inappropriate for the fabric",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 15,
              passingScore: 9,
              duration: 60,
              learningObjectiveIds: ["lo-seams-3", "lo-seams-4"]
            }
          ],
          estimatedDuration: 600 // 10 hours
        }
      ],
      estimatedDuration: 960 // 16 hours
    },
    {
      id: "caring-for-the-family",
      title: "Caring for the Family",
      description: "This unit covers childcare, providing family shelter, room interrelationship, the kitchen, cleaning the kitchen, color in the home, and soft furnishings in the house.",
      topics: [
        {
          id: "childcare",
          title: "Childcare",
          description: "This topic covers human development from conception to birth, needs of an expectant mother, preparations for baby's arrival, and traditional beliefs associated with pregnancy and childbirth.",
          keyTerms: [
            {
              term: "Conception",
              definition: "The process of becoming pregnant involving the fertilization of an egg by a sperm."
            },
            {
              term: "Fetal development",
              definition: "The process of growth and development of the fetus in the womb."
            },
            {
              term: "Layette",
              definition: "A set of clothing, linens, and sometimes toiletries for a newborn baby."
            },
            {
              term: "Confinement",
              definition: "The period after childbirth during which a mother rests and recovers."
            },
            {
              term: "Traditional Birth Attendant (TBA)",
              definition: "A person who assists women during childbirth and acquired skills by delivering babies or through apprenticeship to other TBAs."
            }
          ],
          learningObjectives: [
            {
              id: "lo-childcare-1",
              description: "Describe human development from conception to birth",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Critically describes human development from conception to birth"
              ]
            },
            {
              id: "lo-childcare-2",
              description: "Explain needs of an expectant mother",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Accurately explains all 9 needs of the expectant mother and provides supporting details and examples"
              ]
            },
            {
              id: "lo-childcare-3",
              description: "Analyze preparations made for the baby's arrival",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Precisely analyzes all 9 preparations made for the baby's arrival and gives in-depth supportive details and examples"
              ]
            },
            {
              id: "lo-childcare-4",
              description: "Investigate traditional beliefs and taboos associated with pregnancy and child birth",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Systematically and comprehensively carries out a survey on traditional beliefs and taboos associated with pregnancy and child birth with in-depth details and examples"
              ]
            },
            {
              id: "lo-childcare-5",
              description: "Describe the choice and care for baby's layette",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Distinctively and with clarity chooses and cares for baby's layette and provides supportive details"
              ]
            }
          ],
          resources: [
            {
              id: "childcare-video-1",
              title: "Fetal Development: From Conception to Birth",
              type: "video",
              url: "https://example.com/fetal-development-video",
              duration: 18,
              difficulty: "intermediate",
              learningStyles: ["visual", "auditory"],
              description: "A comprehensive video explaining the stages of fetal development from conception to birth.",
              thumbnailUrl: "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "childcare-article-1",
              title: "Essential Needs of Expectant Mothers",
              type: "article",
              url: "https://example.com/expectant-mother-needs",
              duration: 15,
              difficulty: "beginner",
              learningStyles: ["reading"],
              description: "An article discussing the physical, emotional, and social needs of expectant mothers."
            },
            {
              id: "childcare-interactive-1",
              title: "Baby Layette Planner",
              type: "interactive",
              url: "https://example.com/baby-layette-planner",
              duration: 20,
              difficulty: "beginner",
              learningStyles: ["visual", "kinesthetic"],
              description: "An interactive tool to help plan and organize a baby's layette based on different factors."
            }
          ],
          activities: [
            {
              id: "childcare-activity-1",
              title: "Pregnancy and Childbirth Beliefs Survey",
              description: "Conduct a survey on traditional beliefs and taboos associated with pregnancy and childbirth in your community.",
              type: "group",
              duration: 120,
              materials: ["Survey questionnaires", "Notebooks", "Pens", "Recording device (optional)"],
              steps: [
                "Develop survey questions about pregnancy and childbirth beliefs",
                "Identify appropriate community members to interview",
                "Conduct interviews or distribute questionnaires",
                "Compile and analyze the collected data",
                "Prepare a report on your findings",
                "Present your findings to the class"
              ],
              learningObjectiveIds: ["lo-childcare-4"],
              difficulty: "advanced"
            },
            {
              id: "childcare-activity-2",
              title: "Baby Layette Care Demonstration",
              description: "Demonstrate proper cleaning, laundering, and storage of baby layette items.",
              type: "individual",
              duration: 60,
              materials: ["Baby clothes", "Mild detergent", "Basin", "Water", "Drying rack", "Iron", "Storage containers"],
              steps: [
                "Research proper care techniques for baby clothes",
                "Demonstrate hand washing of delicate baby items",
                "Show proper rinsing and drying techniques",
                "Demonstrate safe ironing methods (if applicable)",
                "Show proper folding and storage techniques",
                "Explain the importance of proper care for baby items"
              ],
              learningObjectiveIds: ["lo-childcare-5"],
              difficulty: "intermediate"
            }
          ],
          assessments: [
            {
              id: "childcare-quiz-1",
              title: "Pregnancy and Childcare Quiz",
              description: "Test your knowledge about pregnancy, fetal development, and baby care.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which of the following is NOT a sign of pregnancy?",
                  type: "multiple-choice",
                  options: [
                    "Missed period",
                    "Morning sickness",
                    "Decreased appetite",
                    "Fatigue"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What is a baby layette?",
                  type: "multiple-choice",
                  options: [
                    "A type of baby crib",
                    "A set of clothing and linens for a newborn",
                    "A baby feeding schedule",
                    "A type of baby carrier"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q3",
                  text: "List three essential needs of an expectant mother.",
                  type: "short-answer",
                  points: 3
                }
              ],
              totalPoints: 5,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-childcare-1", "lo-childcare-2", "lo-childcare-5"]
            },
            {
              id: "childcare-project-1",
              title: "Baby Arrival Preparation Plan",
              description: "Create a comprehensive plan for preparing for a baby's arrival.",
              type: "project",
              rubric: [
                {
                  criteria: "Comprehensiveness",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Plan covers all necessary preparations in detail",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Plan covers most necessary preparations",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Plan is incomplete or missing major preparations",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Practicality",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Plan is highly practical and realistic",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Plan is mostly practical with minor issues",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Plan lacks practicality or is unrealistic",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Organization",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Plan is well-organized with clear categories and timelines",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Plan has basic organization with some structure",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Plan is disorganized or lacks structure",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 15,
              passingScore: 9,
              duration: 90,
              learningObjectiveIds: ["lo-childcare-2", "lo-childcare-3", "lo-childcare-5"]
            }
          ],
          estimatedDuration: 360 // 6 hours
        },
        {
          id: "family-shelter",
          title: "Providing Family Shelter",
          description: "This topic covers factors to consider when choosing different methods of providing family shelter, advantages and disadvantages of different methods, and types of houses used to provide family shelter.",
          keyTerms: [
            {
              term: "Family shelter",
              definition: "A place of residence or refuge for a family unit, providing protection from the environment."
            },
            {
              term: "Renting",
              definition: "Paying to use a property owned by someone else for a specific period."
            },
            {
              term: "Buying",
              definition: "Purchasing a property to own it permanently."
            },
            {
              term: "Building",
              definition: "Constructing a new house or structure for family shelter."
            },
            {
              term: "Bungalow",
              definition: "A one-story house with no stairs."
            },
            {
              term: "Maisonette",
              definition: "A small house or apartment that occupies two floors and is part of a larger building."
            }
          ],
          learningObjectives: [
            {
              id: "lo-shelter-1",
              description: "Outline factors to consider when choosing different methods of providing family shelter",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Information clearly relates to outline of factors to consider when choosing different methods of family shelter"
              ]
            },
            {
              id: "lo-shelter-2",
              description: "Explain the advantages and disadvantages of different methods of providing family shelter",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Explains advantages and disadvantages of types of houses used in providing family shelter and gives a smooth flow of ideas and coherence"
              ]
            },
            {
              id: "lo-shelter-3",
              description: "Model different types of houses used to provide family shelter",
              bloomsLevel: "create",
              assessmentCriteria: [
                "Creates accurate and detailed models of different types of houses used to provide family shelter"
              ]
            },
            {
              id: "lo-shelter-4",
              description: "Explain advantages and disadvantages of types of houses used in providing family shelter",
              bloomsLevel: "understand",
              assessmentCriteria: [
                "Distinctively and clearly explains advantages and disadvantages of types of houses used in providing family shelter and provides supportive details and examples"
              ]
            },
            {
              id: "lo-shelter-5",
              description: "Relate the human rights to providing family shelter",
              bloomsLevel: "analyze",
              assessmentCriteria: [
                "Critically and elaborately relates the human rights to providing family shelter"
              ]
            }
          ],
          resources: [
            {
              id: "shelter-video-1",
              title: "Housing Options for Families",
              type: "video",
              url: "https://example.com/family-housing-options",
              duration: 15,
              difficulty: "beginner",
              learningStyles: ["visual", "auditory"],
              description: "A video explaining different methods of providing family shelter including renting, buying, and building.",
              thumbnailUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            {
              id: "shelter-article-1",
              title: "Housing Types and Designs",
              type: "article",
              url: "https://example.com/housing-types-designs",
              duration: 20,
              difficulty: "intermediate",
              learningStyles: ["reading"],
              description: "An article discussing various types of houses including traditional, modern, bungalows, maisonettes, and flats."
            },
            {
              id: "shelter-interactive-1",
              title: "House Design Simulator",
              type: "interactive",
              url: "https://example.com/house-design-simulator",
              duration: 30,
              difficulty: "intermediate",
              learningStyles: ["visual", "kinesthetic"],
              description: "An interactive tool that allows you to design and visualize different house layouts and types."
            }
          ],
          activities: [
            {
              id: "shelter-activity-1",
              title: "Housing Methods Comparison Chart",
              description: "Create a comparison chart of different methods of providing family shelter.",
              type: "group",
              duration: 60,
              materials: ["Chart paper", "Markers", "Research materials", "Sticky notes"],
              steps: [
                "Research the three main methods of providing family shelter: renting, buying, and building",
                "Create a chart with columns for each method",
                "List the advantages and disadvantages of each method",
                "Include factors such as cost, flexibility, ownership, maintenance, and long-term value",
                "Present your chart to the class and explain your findings"
              ],
              learningObjectiveIds: ["lo-shelter-1", "lo-shelter-2"],
              difficulty: "intermediate"
            },
            {
              id: "shelter-activity-2",
              title: "House Model Construction",
              description: "Build models of different types of houses using simple materials.",
              type: "group",
              duration: 120,
              materials: ["Cardboard", "Paper", "Glue", "Scissors", "Ruler", "Colored markers", "Other craft materials"],
              steps: [
                "Divide into groups and assign each group a house type (traditional, modern, bungalow, maisonette, flat)",
                "Research the assigned house type",
                "Design a simple floor plan for the house",
                "Construct a 3D model of the house using available materials",
                "Label the different rooms and features",
                "Present your model to the class, explaining its features and characteristics"
              ],
              learningObjectiveIds: ["lo-shelter-3"],
              difficulty: "advanced"
            }
          ],
          assessments: [
            {
              id: "shelter-quiz-1",
              title: "Family Shelter Quiz",
              description: "Test your knowledge about different methods and types of family shelter.",
              type: "quiz",
              questions: [
                {
                  id: "q1",
                  text: "Which of the following is NOT a factor to consider when choosing a method of providing family shelter?",
                  type: "multiple-choice",
                  options: [
                    "Financial capability",
                    "Family size",
                    "Weather patterns",
                    "Personal preference"
                  ],
                  correctAnswer: 2,
                  points: 1
                },
                {
                  id: "q2",
                  text: "What is the main advantage of building a house compared to renting?",
                  type: "multiple-choice",
                  options: [
                    "It's always cheaper",
                    "It provides ownership and customization options",
                    "It requires less maintenance",
                    "It's faster to move in"
                  ],
                  correctAnswer: 1,
                  points: 1
                },
                {
                  id: "q3",
                  text: "Explain how the right to adequate housing is related to human rights.",
                  type: "short-answer",
                  points: 3
                }
              ],
              totalPoints: 5,
              passingScore: 3,
              duration: 15,
              learningObjectiveIds: ["lo-shelter-1", "lo-shelter-2", "lo-shelter-5"]
            },
            {
              id: "shelter-project-1",
              title: "Housing Analysis Project",
              description: "Analyze housing options in your community and create a report.",
              type: "project",
              rubric: [
                {
                  criteria: "Research Quality",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Comprehensive research on local housing options with multiple sources",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Adequate research on local housing options with some sources",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Limited research with few sources",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Analysis Depth",
                  levels: [
                    {
                      level: "Excellent",
                      description: "In-depth analysis of advantages and disadvantages of different housing options",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Basic analysis of advantages and disadvantages",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Superficial analysis with limited understanding",
                      points: 1
                    }
                  ]
                },
                {
                  criteria: "Human Rights Connection",
                  levels: [
                    {
                      level: "Excellent",
                      description: "Clear and insightful connection between housing and human rights",
                      points: 5
                    },
                    {
                      level: "Satisfactory",
                      description: "Basic connection between housing and human rights",
                      points: 3
                    },
                    {
                      level: "Needs Improvement",
                      description: "Weak or missing connection to human rights",
                      points: 1
                    }
                  ]
                }
              ],
              totalPoints: 15,
              passingScore: 9,
              duration: 120,
              learningObjectiveIds: ["lo-shelter-2", "lo-shelter-4", "lo-shelter-5"]
            }
          ],
          estimatedDuration: 180 // 3 hours
        }
      ],
      estimatedDuration: 540 // 9 hours
    }
  ],
  standards: [
    {
      code: "HS.FN.8.1",
      description: "Demonstrate understanding of food and nutrition security through kitchen gardening"
    },
    {
      code: "HS.FN.8.2",
      description: "Apply knowledge of heat transfer and its effects on carbohydrate foods"
    },
    {
      code: "HS.FN.8.3",
      description: "Demonstrate proper meal presentation techniques and table setting"
    },
    {
      code: "HS.CE.8.1",
      description: "Understand consumer awareness and market competition"
    },
    {
      code: "HS.TC.8.1",
      description: "Identify and work with artificial textile fibers"
    },
    {
      code: "HS.TC.8.2",
      description: "Construct and use different types of seams in garment making"
    },
    {
      code: "HS.CF.8.1",
      description: "Understand childcare and family shelter needs"
    }
  ],
  version: "1.0",
  lastUpdated: "2023-01-15"
};

export default homeScience;