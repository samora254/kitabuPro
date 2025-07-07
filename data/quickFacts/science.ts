import { QuickFactsBank } from './types';

export const scienceQuickFacts: QuickFactsBank = {
  subject: "Science",
  grades: ["Grade 8"],
  topics: [
    { name: "Scientific Processes", subtopics: ["Scientific Method", "Laboratory Safety"] },
    { name: "Matter", subtopics: ["States of Matter", "Properties of Matter", "Atoms and Elements"] },
    { name: "Energy", subtopics: ["Forms of Energy", "Energy Transformations", "Conservation of Energy"] },
    { name: "Life Science", subtopics: ["Cells", "Human Body Systems", "Ecology"] }
  ],
  flashcardSets: [
    {
      id: "science-matter-basics",
      title: "Matter and Its Properties",
      description: "Test your knowledge of matter, its states, and properties.",
      subject: "Science",
      topic: "Matter",
      subtopic: "States of Matter",
      grade: "Grade 8",
      flashcards: [
        {
          id: "sci-mat-f1",
          question: "What are the three common states of matter?",
          answer: "The three common states of matter are solid, liquid, and gas. (Plasma is often considered the fourth state of matter.)",
          difficulty: "easy",
          tags: ["matter", "states of matter", "basics"],
          timeRecommended: 20
        },
        {
          id: "sci-mat-f2",
          question: "What happens to the particles of a substance when it changes from a solid to a liquid?",
          answer: "When a substance changes from a solid to a liquid (melting), the particles gain energy and begin to move more freely. They maintain the same average distance from each other but lose their fixed positions and can slide past one another.",
          difficulty: "medium",
          tags: ["matter", "states of matter", "phase changes"],
          timeRecommended: 30
        },
        {
          id: "sci-mat-f3",
          question: "What is the process called when a substance changes directly from a solid to a gas without becoming a liquid?",
          answer: "Sublimation is the process where a solid changes directly into a gas without passing through the liquid state. An example is dry ice (solid carbon dioxide) changing to carbon dioxide gas at room temperature and normal atmospheric pressure.",
          difficulty: "medium",
          tags: ["matter", "states of matter", "phase changes"],
          timeRecommended: 30
        },
        {
          id: "sci-mat-f4",
          question: "What is the difference between a physical change and a chemical change?",
          answer: "A physical change alters the form or appearance of a substance but does not change its chemical composition (e.g., melting ice, cutting paper).\n\nA chemical change creates a new substance with different properties and composition (e.g., burning wood, rusting iron). Chemical changes typically involve energy changes and cannot be easily reversed.",
          difficulty: "medium",
          tags: ["matter", "properties of matter", "changes"],
          timeRecommended: 35
        },
        {
          id: "sci-mat-f5",
          question: "What is density and how is it calculated?",
          answer: "Density is the measure of how compact a substance is, or how much mass is contained in a given volume.\n\nDensity is calculated using the formula:\nDensity = Mass ÷ Volume\n\nThe SI unit for density is kilograms per cubic meter (kg/m³), though grams per cubic centimeter (g/cm³) is also commonly used.",
          difficulty: "medium",
          tags: ["matter", "properties of matter", "density"],
          timeRecommended: 30
        },
        {
          id: "sci-mat-f6",
          question: "Why does ice float on water?",
          answer: "Ice floats on water because it is less dense than liquid water. When water freezes, the molecules form a crystalline structure with more space between them than in liquid water, making ice about 9% less dense than liquid water. This unusual property is crucial for aquatic life, as it allows bodies of water to freeze from the top down, with liquid water remaining below the ice.",
          difficulty: "medium",
          tags: ["matter", "properties of matter", "density"],
          imageUrl: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 35
        },
        {
          id: "sci-mat-f7",
          question: "What is an element?",
          answer: "An element is a pure substance that cannot be broken down into simpler substances by chemical means. It consists of only one type of atom, characterized by its atomic number (the number of protons in its nucleus). Examples include hydrogen, oxygen, carbon, and gold. There are 118 known elements, 94 of which occur naturally on Earth.",
          difficulty: "easy",
          tags: ["matter", "atoms and elements", "basics"],
          timeRecommended: 25
        },
        {
          id: "sci-mat-f8",
          question: "What is the difference between an element and a compound?",
          answer: "An element is a pure substance made up of only one type of atom and cannot be broken down into simpler substances by chemical means (e.g., hydrogen, oxygen).\n\nA compound is a substance made up of two or more different elements chemically combined in a fixed ratio (e.g., water (H₂O), carbon dioxide (CO₂)). Compounds can be broken down into their constituent elements through chemical reactions.",
          difficulty: "medium",
          tags: ["matter", "atoms and elements", "compounds"],
          timeRecommended: 30
        },
        {
          id: "sci-mat-f9",
          question: "What is the difference between a mixture and a compound?",
          answer: "A mixture consists of two or more substances that are physically combined but not chemically bonded. The components retain their individual properties and can be separated by physical means. Mixtures can have variable compositions (e.g., salt water, air).\n\nA compound consists of two or more elements that are chemically bonded in a fixed ratio. The components lose their individual properties and form a new substance with different properties. Compounds can only be separated by chemical means (e.g., water, carbon dioxide).",
          difficulty: "hard",
          tags: ["matter", "mixtures", "compounds"],
          timeRecommended: 40
        },
        {
          id: "sci-mat-f10",
          question: "What is the law of conservation of mass?",
          answer: "The law of conservation of mass states that in a closed system, the total mass of materials remains constant during any physical or chemical change. In other words, matter cannot be created or destroyed in chemical reactions, only rearranged. This means that the mass of the products in a chemical reaction equals the mass of the reactants.",
          difficulty: "hard",
          tags: ["matter", "properties of matter", "conservation"],
          timeRecommended: 35
        }
      ],
      totalCards: 10,
      estimatedTime: 310,
      difficulty: "medium"
    },
    {
      id: "science-energy-concepts",
      title: "Energy Concepts",
      description: "Explore different forms of energy and energy transformations.",
      subject: "Science",
      topic: "Energy",
      subtopic: "Forms of Energy",
      grade: "Grade 8",
      flashcards: [
        {
          id: "sci-eng-f1",
          question: "What is energy?",
          answer: "Energy is the ability to do work or cause change. It exists in various forms such as heat, light, motion, electrical, chemical, nuclear, and gravitational energy. Energy cannot be created or destroyed, only transformed from one form to another.",
          difficulty: "easy",
          tags: ["energy", "basics", "definition"],
          timeRecommended: 25
        },
        {
          id: "sci-eng-f2",
          question: "What is the difference between potential and kinetic energy?",
          answer: "Potential energy is stored energy due to an object's position or condition. Examples include a book on a high shelf (gravitational potential energy) or a stretched rubber band (elastic potential energy).\n\nKinetic energy is the energy of motion. Any object that is moving has kinetic energy, which depends on the object's mass and velocity. Examples include a rolling ball or a person running.",
          difficulty: "medium",
          tags: ["energy", "forms of energy", "potential and kinetic"],
          timeRecommended: 30
        },
        {
          id: "sci-eng-f3",
          question: "What is the law of conservation of energy?",
          answer: "The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another. The total energy in an isolated system remains constant. For example, when a ball falls, its potential energy is converted to kinetic energy, but the total energy remains the same (ignoring energy lost to friction and sound).",
          difficulty: "medium",
          tags: ["energy", "conservation of energy", "laws"],
          timeRecommended: 35
        },
        {
          id: "sci-eng-f4",
          question: "What energy transformation occurs in a solar panel?",
          answer: "In a solar panel, radiant energy (light energy from the sun) is transformed into electrical energy through the photovoltaic effect. The solar cells in the panel contain semiconducting materials that release electrons when struck by photons from sunlight, creating an electric current.",
          difficulty: "medium",
          tags: ["energy", "energy transformations", "solar energy"],
          imageUrl: "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 30
        },
        {
          id: "sci-eng-f5",
          question: "What energy transformations occur when you turn on a battery-powered flashlight?",
          answer: "When you turn on a battery-powered flashlight, the following energy transformations occur:\n\n1. Chemical energy (stored in the battery) is converted to electrical energy (flowing through the circuit).\n\n2. Electrical energy is converted to light energy (emitted by the bulb) and heat energy (as the bulb warms up).",
          difficulty: "medium",
          tags: ["energy", "energy transformations", "practical examples"],
          timeRecommended: 30
        },
        {
          id: "sci-eng-f6",
          question: "What is thermal energy?",
          answer: "Thermal energy is the internal energy of a substance due to the kinetic energy of its atoms and molecules. It is directly related to temperature—the higher the temperature, the faster the particles move and the more thermal energy they have. Thermal energy flows from objects at higher temperatures to objects at lower temperatures through the processes of conduction, convection, and radiation.",
          difficulty: "medium",
          tags: ["energy", "forms of energy", "thermal energy"],
          timeRecommended: 30
        },
        {
          id: "sci-eng-f7",
          question: "What is the difference between renewable and non-renewable energy sources?",
          answer: "Renewable energy sources can be replenished naturally within a human lifetime and are virtually inexhaustible. Examples include solar, wind, hydroelectric, geothermal, and biomass energy.\n\nNon-renewable energy sources exist in limited supplies and take millions of years to form naturally. Once depleted, they cannot be replaced within a human timeframe. Examples include fossil fuels (coal, oil, natural gas) and nuclear fuels (uranium).",
          difficulty: "medium",
          tags: ["energy", "energy sources", "sustainability"],
          timeRecommended: 35
        },
        {
          id: "sci-eng-f8",
          question: "What is the formula for calculating kinetic energy?",
          answer: "The formula for calculating kinetic energy is:\n\nKE = ½mv²\n\nWhere:\n- KE is kinetic energy (measured in joules, J)\n- m is mass (measured in kilograms, kg)\n- v is velocity (measured in meters per second, m/s)\n\nThis formula shows that kinetic energy increases linearly with mass but exponentially with velocity.",
          difficulty: "hard",
          tags: ["energy", "kinetic energy", "formulas"],
          timeRecommended: 40
        },
        {
          id: "sci-eng-f9",
          question: "What is the difference between heat and temperature?",
          answer: "Heat is the total amount of thermal energy transferred between objects or systems. It is measured in joules (J) or calories and depends on the mass of the object.\n\nTemperature is a measure of the average kinetic energy of the particles in a substance. It indicates how hot or cold an object is and is measured in degrees Celsius (°C), Fahrenheit (°F), or Kelvin (K). Temperature does not depend on the mass of the object.\n\nFor example, a cup of boiling water and a pot of boiling water have the same temperature (100°C), but the pot contains more heat energy because it has more water.",
          difficulty: "hard",
          tags: ["energy", "thermal energy", "temperature"],
          timeRecommended: 45
        },
        {
          id: "sci-eng-f10",
          question: "What energy transformations occur during photosynthesis?",
          answer: "During photosynthesis, the following energy transformations occur:\n\n1. Light energy (from the sun) is absorbed by chlorophyll in plant cells.\n\n2. This light energy is converted to chemical energy, which is used to convert carbon dioxide and water into glucose (a sugar) and oxygen.\n\n3. The chemical energy is stored in the bonds of the glucose molecule, which the plant can later break down through cellular respiration to release energy for growth and other life processes.",
          difficulty: "hard",
          tags: ["energy", "energy transformations", "photosynthesis"],
          imageUrl: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 40
        }
      ],
      totalCards: 10,
      estimatedTime: 340,
      difficulty: "medium"
    },
    {
      id: "science-human-body",
      title: "Human Body Systems",
      description: "Learn about the different systems in the human body and how they function.",
      subject: "Science",
      topic: "Life Science",
      subtopic: "Human Body Systems",
      grade: "Grade 8",
      flashcards: [
        {
          id: "sci-body-f1",
          question: "What are the main functions of the circulatory system?",
          answer: "The main functions of the circulatory system are:\n\n1. Transporting oxygen from the lungs to all body cells and carbon dioxide from the cells to the lungs\n2. Carrying nutrients from the digestive system to body cells\n3. Transporting waste products to the kidneys and liver for removal\n4. Distributing hormones from endocrine glands\n5. Regulating body temperature\n6. Helping fight disease through white blood cells and antibodies",
          difficulty: "medium",
          tags: ["life science", "human body", "circulatory system"],
          imageUrl: "https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 35
        },
        {
          id: "sci-body-f2",
          question: "What is the difference between arteries and veins?",
          answer: "Arteries:\n- Carry blood away from the heart to the body\n- Usually carry oxygenated blood (except pulmonary arteries)\n- Have thick, elastic walls to withstand high pressure\n- Have no valves\n- Blood flows in pulses\n\nVeins:\n- Carry blood from the body back to the heart\n- Usually carry deoxygenated blood (except pulmonary veins)\n- Have thinner walls with less elastic tissue\n- Have valves to prevent backflow of blood\n- Blood flows smoothly",
          difficulty: "medium",
          tags: ["life science", "human body", "circulatory system"],
          timeRecommended: 40
        },
        {
          id: "sci-body-f3",
          question: "What are the main components of the respiratory system?",
          answer: "The main components of the respiratory system include:\n\n1. Nose and nasal cavity\n2. Pharynx (throat)\n3. Larynx (voice box)\n4. Trachea (windpipe)\n5. Bronchi and bronchioles\n6. Lungs\n7. Diaphragm\n8. Alveoli (tiny air sacs where gas exchange occurs)",
          difficulty: "medium",
          tags: ["life science", "human body", "respiratory system"],
          timeRecommended: 30
        },
        {
          id: "sci-body-f4",
          question: "What is the function of the digestive system?",
          answer: "The digestive system breaks down food into nutrients that can be absorbed and used by the body. Its functions include:\n\n1. Ingestion: taking in food\n2. Mechanical digestion: physically breaking down food into smaller pieces\n3. Chemical digestion: breaking down food molecules into simpler forms using enzymes\n4. Absorption: taking nutrients from digested food into the bloodstream\n5. Elimination: removing undigested waste from the body",
          difficulty: "easy",
          tags: ["life science", "human body", "digestive system"],
          timeRecommended: 30
        },
        {
          id: "sci-body-f5",
          question: "What is the path of food through the digestive system?",
          answer: "The path of food through the digestive system is:\n\n1. Mouth (mechanical breakdown and initial chemical digestion)\n2. Esophagus (food travels via peristalsis)\n3. Stomach (further breakdown with acid and enzymes)\n4. Small intestine (most digestion and absorption occurs here)\n5. Large intestine/colon (water absorption and waste formation)\n6. Rectum (waste storage)\n7. Anus (waste elimination)",
          difficulty: "medium",
          tags: ["life science", "human body", "digestive system"],
          timeRecommended: 35
        },
        {
          id: "sci-body-f6",
          question: "What are the functions of the skeletal system?",
          answer: "The skeletal system has several important functions:\n\n1. Support: provides framework and support for the body\n2. Protection: shields vital organs (e.g., skull protects brain, ribs protect heart and lungs)\n3. Movement: works with muscles to enable body movement\n4. Blood cell production: red bone marrow produces blood cells\n5. Mineral storage: stores minerals like calcium and phosphorus\n6. Endocrine function: helps regulate blood calcium levels",
          difficulty: "medium",
          tags: ["life science", "human body", "skeletal system"],
          timeRecommended: 35
        },
        {
          id: "sci-body-f7",
          question: "What is the difference between the central nervous system (CNS) and the peripheral nervous system (PNS)?",
          answer: "Central Nervous System (CNS):\n- Consists of the brain and spinal cord\n- Acts as the main processing center for the entire nervous system\n- Interprets sensory information and sends out responses\n- Protected by the skull and vertebral column\n\nPeripheral Nervous System (PNS):\n- Consists of all nerves outside the brain and spinal cord\n- Connects the CNS to the rest of the body\n- Includes sensory neurons (carrying information to the CNS) and motor neurons (carrying information from the CNS)\n- Divided into somatic (voluntary) and autonomic (involuntary) nervous systems",
          difficulty: "hard",
          tags: ["life science", "human body", "nervous system"],
          timeRecommended: 45
        },
        {
          id: "sci-body-f8",
          question: "What are the main functions of the liver?",
          answer: "The liver performs over 500 different functions. Some of its main functions include:\n\n1. Detoxification: filters toxins from the blood\n2. Metabolism: processes nutrients from digested food\n3. Protein synthesis: produces important proteins like albumin\n4. Bile production: aids in fat digestion\n5. Storage: stores vitamins, minerals, and glycogen\n6. Blood regulation: removes old red blood cells and maintains proper blood composition\n7. Cholesterol production: produces cholesterol needed for cell membranes and hormones",
          difficulty: "hard",
          tags: ["life science", "human body", "digestive system"],
          timeRecommended: 40
        },
        {
          id: "sci-body-f9",
          question: "What are the main components of blood?",
          answer: "Blood consists of four main components:\n\n1. Plasma (55%): The liquid portion, mostly water with dissolved proteins, nutrients, hormones, and waste products\n\n2. Red blood cells (erythrocytes, 44%): Carry oxygen to tissues and remove carbon dioxide\n\n3. White blood cells (leukocytes, <1%): Defend the body against infection and disease\n\n4. Platelets (thrombocytes, <1%): Cell fragments that help in blood clotting",
          difficulty: "medium",
          tags: ["life science", "human body", "circulatory system"],
          timeRecommended: 35
        },
        {
          id: "sci-body-f10",
          question: "What is the function of the endocrine system?",
          answer: "The endocrine system produces hormones that regulate many bodily functions. Its main functions include:\n\n1. Regulating growth and development\n2. Controlling metabolism and energy balance\n3. Maintaining proper functioning of tissues and organs\n4. Regulating fluid and electrolyte balance\n5. Controlling reproductive processes and sexual development\n6. Coordinating the body's response to stress and injury\n7. Maintaining blood glucose levels\n\nThe endocrine system works closely with the nervous system to maintain homeostasis (internal balance) in the body.",
          difficulty: "hard",
          tags: ["life science", "human body", "endocrine system"],
          timeRecommended: 40
        }
      ],
      totalCards: 10,
      estimatedTime: 365,
      difficulty: "medium"
    }
  ]
};