import { QuestionBank } from './types';

export const scienceQuestions: QuestionBank = {
  subject: "Integrated Science",
  grades: ["Grade 8"],
  topics: [
    { name: "Scientific Processes", subtopics: ["Scientific Method", "Laboratory Safety"] },
    { name: "Matter", subtopics: ["States of Matter", "Properties of Matter", "Atoms and Elements"] },
    { name: "Energy", subtopics: ["Forms of Energy", "Energy Transformations", "Conservation of Energy"] },
    { name: "Life Science", subtopics: ["Cells", "Human Body Systems", "Ecology"] }
  ],
  questionSets: [
    {
      id: "science-method-set-1",
      title: "Scientific Method Basics",
      description: "Test your understanding of the scientific method and its application.",
      subject: "Integrated Science",
      grade: "Grade 8",
      topic: "Scientific Processes",
      subtopic: "Scientific Method",
      questions: [
        {
          id: "sci-sm-q1",
          text: "What is the first step in the scientific method?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Scientific Processes",
          subtopic: "Scientific Method",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Form a hypothesis", "Ask a question", "Conduct an experiment", "Analyze results"],
          correctAnswer: 1,
          explanation: "The scientific method begins with asking a question about an observation or problem that you want to investigate."
        },
        {
          id: "sci-sm-q2",
          text: "What is a hypothesis?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Scientific Processes",
          subtopic: "Scientific Method",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "A proven scientific fact",
            "A testable prediction or explanation",
            "The final conclusion of an experiment",
            "The process of collecting data"
          ],
          correctAnswer: 1,
          explanation: "A hypothesis is a testable prediction or explanation that can be supported or refuted through experimentation."
        },
        {
          id: "sci-sm-q3",
          text: "In an experiment, what is a control group?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Scientific Processes",
          subtopic: "Scientific Method",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "The group that receives the experimental treatment",
            "The group that controls the experiment",
            "The group that remains unchanged for comparison",
            "The group that analyzes the results"
          ],
          correctAnswer: 2,
          explanation: "A control group serves as a baseline and does not receive the experimental treatment, allowing scientists to compare results with the experimental group."
        },
        {
          id: "sci-sm-q4",
          text: "What is a variable in a scientific experiment?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Scientific Processes",
          subtopic: "Scientific Method",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "The final conclusion",
            "A factor that can be changed, measured, or controlled",
            "The control group",
            "The scientific equipment used"
          ],
          correctAnswer: 1,
          explanation: "A variable is any factor that can be changed, measured, or controlled in an experiment."
        },
        {
          id: "sci-sm-q5",
          text: "Which of the following is NOT part of the scientific method?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Scientific Processes",
          subtopic: "Scientific Method",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "Forming a hypothesis",
            "Conducting an experiment",
            "Accepting results without verification",
            "Analyzing data"
          ],
          correctAnswer: 2,
          explanation: "The scientific method requires verification and reproducibility of results. Accepting results without verification goes against the principles of scientific inquiry."
        }
      ],
      totalPoints: 40,
      estimatedTime: 120,
      difficulty: "medium"
    },
    {
      id: "science-matter-set-1",
      title: "States of Matter",
      description: "Test your knowledge of the different states of matter and their properties.",
      subject: "Integrated Science",
      grade: "Grade 8",
      topic: "Matter",
      subtopic: "States of Matter",
      questions: [
        {
          id: "sci-sm-q1",
          text: "What are the three common states of matter?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Matter",
          subtopic: "States of Matter",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "Solid, liquid, gas",
            "Hot, cold, warm",
            "Hard, soft, medium",
            "Rock, water, air"
          ],
          correctAnswer: 0,
          explanation: "The three common states of matter are solid, liquid, and gas. Plasma is often considered the fourth state of matter."
        },
        {
          id: "sci-sm-q2",
          text: "Which state of matter has a definite shape and volume?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Matter",
          subtopic: "States of Matter",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Solid", "Liquid", "Gas", "Plasma"],
          correctAnswer: 0,
          explanation: "Solids have a definite shape and volume because their particles are tightly packed in a regular pattern with strong forces of attraction."
        },
        {
          id: "sci-sm-q3",
          text: "What happens to the particles of a substance when it changes from a liquid to a gas?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Matter",
          subtopic: "States of Matter",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "They get closer together",
            "They move more slowly",
            "They gain energy and move farther apart",
            "They lose energy"
          ],
          correctAnswer: 2,
          explanation: "When a substance changes from liquid to gas (vaporization), the particles gain energy, move faster, and spread farther apart from each other."
        },
        {
          id: "sci-sm-q4",
          text: "What is the process called when a substance changes directly from a solid to a gas without becoming a liquid?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Matter",
          subtopic: "States of Matter",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Melting", "Freezing", "Condensation", "Sublimation"],
          correctAnswer: 3,
          explanation: "Sublimation is the process where a solid changes directly into a gas without passing through the liquid state. An example is dry ice (solid carbon dioxide) changing to carbon dioxide gas."
        },
        {
          id: "sci-sm-q5",
          text: "Which state of matter has particles that are far apart and move freely in all directions?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Matter",
          subtopic: "States of Matter",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Solid", "Liquid", "Gas", "All of the above"],
          correctAnswer: 2,
          explanation: "Gas particles are far apart and move freely in all directions with high energy, allowing gases to expand to fill their containers."
        }
      ],
      totalPoints: 35,
      estimatedTime: 110,
      difficulty: "easy"
    },
    {
      id: "science-energy-set-1",
      title: "Forms of Energy",
      description: "Test your knowledge of different forms of energy and their characteristics.",
      subject: "Integrated Science",
      grade: "Grade 8",
      topic: "Energy",
      subtopic: "Forms of Energy",
      questions: [
        {
          id: "sci-e-q1",
          text: "Which of the following is an example of potential energy?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Energy",
          subtopic: "Forms of Energy",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "A car moving on a highway",
            "A book sitting on a high shelf",
            "A fan blowing air",
            "Sound from a speaker"
          ],
          correctAnswer: 1,
          explanation: "Potential energy is stored energy due to position or condition. A book on a high shelf has gravitational potential energy due to its height above the ground."
        },
        {
          id: "sci-e-q2",
          text: "Which form of energy is associated with moving objects?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Energy",
          subtopic: "Forms of Energy",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Thermal energy", "Chemical energy", "Kinetic energy", "Nuclear energy"],
          correctAnswer: 2,
          explanation: "Kinetic energy is the energy of motion. Any object that is moving has kinetic energy."
        },
        {
          id: "sci-e-q3",
          text: "Which form of energy is stored in the chemical bonds of food?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Energy",
          subtopic: "Forms of Energy",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Mechanical energy", "Chemical energy", "Radiant energy", "Electrical energy"],
          correctAnswer: 1,
          explanation: "Chemical energy is stored in the bonds between atoms and molecules. Food contains chemical energy that our bodies convert to other forms of energy."
        },
        {
          id: "sci-e-q4",
          text: "What form of energy is transferred through electromagnetic waves?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Energy",
          subtopic: "Forms of Energy",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Sound energy", "Thermal energy", "Radiant energy", "Nuclear energy"],
          correctAnswer: 2,
          explanation: "Radiant energy (also called electromagnetic energy) travels in waves and includes visible light, radio waves, X-rays, and other forms of radiation."
        },
        {
          id: "sci-e-q5",
          text: "Which energy transformation occurs in a solar panel?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Energy",
          subtopic: "Energy Transformations",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Chemical to electrical",
            "Radiant to electrical",
            "Mechanical to electrical",
            "Thermal to electrical"
          ],
          correctAnswer: 1,
          explanation: "Solar panels convert radiant energy from the sun (light) into electrical energy through the photovoltaic effect."
        }
      ],
      totalPoints: 40,
      estimatedTime: 120,
      difficulty: "medium"
    },
    {
      id: "science-life-set-1",
      title: "Cells: The Building Blocks of Life",
      description: "Test your knowledge of cell structure and function.",
      subject: "Integrated Science",
      grade: "Grade 8",
      topic: "Life Science",
      subtopic: "Cells",
      questions: [
        {
          id: "sci-ls-q1",
          text: "What is the basic structural and functional unit of all living organisms?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Life Science",
          subtopic: "Cells",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Atom", "Cell", "Tissue", "Organ"],
          correctAnswer: 1,
          explanation: "The cell is the basic unit of structure and function in all living organisms. All living things are composed of one or more cells."
        },
        {
          id: "sci-ls-q2",
          text: "Which organelle is known as the 'powerhouse' of the cell because it produces energy?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Life Science",
          subtopic: "Cells",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Nucleus", "Mitochondrion", "Ribosome", "Golgi apparatus"],
          correctAnswer: 1,
          explanation: "Mitochondria are often called the 'powerhouse' of the cell because they produce ATP (adenosine triphosphate), the main energy currency of cells."
        },
        {
          id: "sci-ls-q3",
          text: "Which of the following is NOT a difference between plant and animal cells?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Life Science",
          subtopic: "Cells",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Plant cells have cell walls, while animal cells do not",
            "Plant cells have chloroplasts, while animal cells do not",
            "Plant cells have mitochondria, while animal cells do not",
            "Plant cells have large vacuoles, while animal cells have smaller ones"
          ],
          correctAnswer: 2,
          explanation: "Both plant and animal cells have mitochondria for energy production. The other options correctly identify differences between plant and animal cells."
        },
        {
          id: "sci-ls-q4",
          text: "What is the function of the cell membrane?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Life Science",
          subtopic: "Cells",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "To produce energy for the cell",
            "To control which substances enter and leave the cell",
            "To store genetic information",
            "To break down waste materials"
          ],
          correctAnswer: 1,
          explanation: "The cell membrane is a selectively permeable barrier that controls what enters and leaves the cell, maintaining homeostasis."
        },
        {
          id: "sci-ls-q5",
          text: "Which organelle contains the cell's genetic material in the form of DNA?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Life Science",
          subtopic: "Cells",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Nucleus", "Ribosome", "Lysosome", "Endoplasmic reticulum"],
          correctAnswer: 0,
          explanation: "The nucleus is the control center of the cell and contains the genetic material (DNA) that directs all cellular activities."
        }
      ],
      totalPoints: 35,
      estimatedTime: 115,
      difficulty: "medium"
    }
  ]
};