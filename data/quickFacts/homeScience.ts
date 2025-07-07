import { QuickFactsBank } from './types';

export const homeScienceQuickFacts: QuickFactsBank = {
  subject: "Home Science",
  grades: ["Grade 8"],
  topics: [
    { name: "Foods and Nutrition", subtopics: ["Food Groups", "Meal Planning", "Food Preparation"] },
    { name: "Consumer Education", subtopics: ["Consumer Rights", "Budgeting", "Shopping Practices"] },
    { name: "Textile and Clothing", subtopics: ["Fibers and Fabrics", "Clothing Construction", "Care of Clothing"] },
    { name: "Caring for the Family", subtopics: ["Family Relationships", "Child Care", "Home Management"] }
  ],
  flashcardSets: [
    {
      id: "home-science-foods-nutrition",
      title: "Foods and Nutrition",
      description: "Test your knowledge of food groups, nutrients, and healthy eating.",
      subject: "Home Science",
      topic: "Foods and Nutrition",
      subtopic: "Food Groups",
      grade: "Grade 8",
      flashcards: [
        {
          id: "hs-food-f1",
          question: "What are the main food groups in a balanced diet?",
          answer: "The main food groups in a balanced diet are:\n\n1. Carbohydrates (cereals, grains, starchy roots and tubers)\n2. Proteins (meat, fish, eggs, legumes)\n3. Fats and oils\n4. Fruits and vegetables\n5. Dairy products\n\nA balanced diet should include appropriate portions from each group to provide all necessary nutrients.",
          difficulty: "easy",
          tags: ["foods and nutrition", "food groups", "balanced diet"],
          timeRecommended: 30
        },
        {
          id: "hs-food-f2",
          question: "What are the functions of proteins in the body?",
          answer: "Proteins serve several important functions in the body:\n\n1. Growth and repair of body tissues\n2. Formation of enzymes, hormones, and antibodies\n3. Transportation of substances in the blood (e.g., hemoglobin)\n4. Providing energy (4 calories per gram)\n5. Maintaining fluid balance\n6. Supporting immune function",
          difficulty: "medium",
          tags: ["foods and nutrition", "nutrients", "proteins"],
          timeRecommended: 35
        },
        {
          id: "hs-food-f3",
          question: "What is the difference between water-soluble and fat-soluble vitamins?",
          answer: "Water-soluble vitamins:\n- Dissolve in water\n- Include vitamin C and B-complex vitamins\n- Not stored in large amounts in the body\n- Excess is excreted in urine\n- Need regular replenishment\n\nFat-soluble vitamins:\n- Dissolve in fat\n- Include vitamins A, D, E, and K\n- Stored in the liver and fatty tissues\n- Can accumulate to toxic levels if consumed in excess\n- Don't need to be consumed daily",
          difficulty: "hard",
          tags: ["foods and nutrition", "nutrients", "vitamins"],
          timeRecommended: 40
        },
        {
          id: "hs-food-f4",
          question: "What is food fortification and why is it important?",
          answer: "Food fortification is the process of adding essential micronutrients (vitamins and minerals) to commonly consumed foods to improve their nutritional value.\n\nIt is important because it:\n1. Helps prevent nutritional deficiencies in populations\n2. Addresses specific health issues (e.g., adding iodine to salt to prevent goiter)\n3. Improves public health without requiring changes in food habits\n4. Is cost-effective compared to treating deficiency diseases\n5. Reaches vulnerable populations who might not have access to diverse diets",
          difficulty: "medium",
          tags: ["foods and nutrition", "food processing", "nutrition"],
          timeRecommended: 35
        },
        {
          id: "hs-food-f5",
          question: "What are the signs and symptoms of protein-energy malnutrition?",
          answer: "Protein-energy malnutrition can manifest as:\n\nKwashiorkor (protein deficiency):\n- Edema (swelling)\n- Distended abdomen\n- Fatty liver\n- Changes in hair color and texture\n- Skin rashes\n- Irritability\n\nMarasmus (energy deficiency):\n- Severe wasting\n- Very thin appearance\n- Little to no body fat\n- Wrinkled skin\n- Growth retardation\n- Weakness",
          difficulty: "hard",
          tags: ["foods and nutrition", "malnutrition", "health"],
          timeRecommended: 40
        },
        {
          id: "hs-food-f6",
          question: "What are the principles of meal planning?",
          answer: "The principles of meal planning include:\n\n1. Nutritional adequacy: Meals should provide all required nutrients\n2. Balance: Include foods from all food groups in appropriate proportions\n3. Variety: Include different foods to ensure a range of nutrients\n4. Calorie control: Adjust portions to meet energy needs\n5. Consideration of individual needs: Age, activity level, health status\n6. Budget considerations: Plan meals within financial constraints\n7. Time and skill availability: Consider preparation time and cooking skills\n8. Food preferences and cultural factors: Include acceptable and familiar foods\n9. Availability of foods: Use foods that are in season and locally available",
          difficulty: "medium",
          tags: ["foods and nutrition", "meal planning", "principles"],
          timeRecommended: 40
        },
        {
          id: "hs-food-f7",
          question: "What are the methods of food preservation and how do they work?",
          answer: "Methods of food preservation include:\n\n1. Drying/Dehydration: Removes water, preventing microbial growth\n2. Freezing: Slows microbial growth and enzymatic activity\n3. Canning: Heat treatment kills microorganisms and sealing prevents recontamination\n4. Salting: Creates an environment where microorganisms cannot survive\n5. Smoking: Combines drying with antimicrobial compounds from smoke\n6. Fermentation: Beneficial microorganisms produce acids that inhibit spoilage\n7. Pasteurization: Mild heat treatment kills pathogens\n8. Chemical preservation: Additives prevent microbial growth\n9. Refrigeration: Slows microbial growth and enzymatic activity",
          difficulty: "medium",
          tags: ["foods and nutrition", "food preservation", "food safety"],
          timeRecommended: 40
        },
        {
          id: "hs-food-f8",
          question: "What is the importance of dietary fiber in the diet?",
          answer: "Dietary fiber (roughage) is important because it:\n\n1. Promotes regular bowel movements and prevents constipation\n2. Helps maintain bowel health and may reduce the risk of colorectal cancer\n3. Lowers cholesterol levels, reducing the risk of heart disease\n4. Helps control blood sugar levels, beneficial for diabetes management\n5. Aids in weight management by creating a feeling of fullness\n6. Supports a healthy gut microbiome\n7. May reduce the risk of developing hemorrhoids and diverticular disease",
          difficulty: "medium",
          tags: ["foods and nutrition", "nutrients", "dietary fiber"],
          timeRecommended: 35
        },
        {
          id: "hs-food-f9",
          question: "What are the factors that affect food choices?",
          answer: "Factors affecting food choices include:\n\n1. Cultural and religious beliefs\n2. Personal preferences and taste\n3. Nutritional knowledge and health concerns\n4. Economic factors (income, food prices)\n5. Availability and accessibility of foods\n6. Social influences (family, peers, media)\n7. Psychological factors (mood, stress, emotions)\n8. Time constraints and convenience\n9. Food allergies and intolerances\n10. Ethical considerations (animal welfare, environmental concerns)",
          difficulty: "medium",
          tags: ["foods and nutrition", "food choices", "factors"],
          timeRecommended: 35
        },
        {
          id: "hs-food-f10",
          question: "What are the causes and prevention of food spoilage?",
          answer: "Causes of food spoilage:\n1. Microorganisms (bacteria, molds, yeasts)\n2. Enzymes naturally present in foods\n3. Insects and rodents\n4. Physical damage\n5. Chemical reactions (oxidation)\n6. Environmental factors (temperature, moisture, air)\n\nPrevention of food spoilage:\n1. Proper storage (temperature, containers)\n2. Food preservation methods (freezing, drying, canning)\n3. Good hygiene practices\n4. Proper packaging\n5. Use of preservatives\n6. Timely consumption of perishable foods\n7. Pest control measures",
          difficulty: "medium",
          tags: ["foods and nutrition", "food safety", "food spoilage"],
          timeRecommended: 40
        }
      ],
      totalCards: 10,
      estimatedTime: 370,
      difficulty: "medium"
    },
    {
      id: "home-science-textiles-clothing",
      title: "Textiles and Clothing",
      description: "Learn about fibers, fabrics, and clothing care.",
      subject: "Home Science",
      topic: "Textile and Clothing",
      subtopic: "Fibers and Fabrics",
      grade: "Grade 8",
      flashcards: [
        {
          id: "hs-text-f1",
          question: "What is the difference between natural and synthetic fibers?",
          answer: "Natural fibers:\n- Obtained from plants, animals, or minerals\n- Examples: cotton, wool, silk, linen\n- Generally more breathable and comfortable\n- Often more absorbent\n- Usually biodegradable\n\nSynthetic fibers:\n- Man-made from chemical compounds\n- Examples: polyester, nylon, acrylic, spandex\n- Often more durable and wrinkle-resistant\n- Usually less expensive\n- Better color retention\n- Often less breathable",
          difficulty: "medium",
          tags: ["textiles", "fibers", "classification"],
          timeRecommended: 40
        },
        {
          id: "hs-text-f2",
          question: "What are the properties of cotton fabric?",
          answer: "Properties of cotton fabric:\n\n1. Highly absorbent (can absorb up to 27 times its weight in water)\n2. Breathable and comfortable to wear\n3. Good conductor of heat, making it cool in hot weather\n4. Strong and durable, especially when wet\n5. Can withstand high temperatures, making it easy to sterilize\n6. Biodegradable and environmentally friendly\n7. Prone to wrinkling and shrinking\n8. Susceptible to mildew and moths\n9. Takes dye easily",
          difficulty: "medium",
          tags: ["textiles", "fibers", "cotton"],
          imageUrl: "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 35
        },
        {
          id: "hs-text-f3",
          question: "What are the advantages and disadvantages of synthetic fibers?",
          answer: "Advantages of synthetic fibers:\n1. Durable and strong\n2. Wrinkle-resistant\n3. Quick-drying\n4. Resistant to moths and mildew\n5. Less expensive than many natural fibers\n6. Can be engineered for specific properties\n7. Colorfast (retain color well)\n\nDisadvantages of synthetic fibers:\n1. Less breathable, can cause discomfort in hot weather\n2. Often less absorbent\n3. Can generate static electricity\n4. May pill (form small balls on the surface)\n5. Some are flammable\n6. Not biodegradable, causing environmental concerns\n7. Can be uncomfortable against sensitive skin",
          difficulty: "medium",
          tags: ["textiles", "fibers", "synthetic"],
          timeRecommended: 40
        },
        {
          id: "hs-text-f4",
          question: "What are the basic steps in the care of clothing?",
          answer: "Basic steps in clothing care:\n\n1. Sorting: Separate clothes by color, fabric type, and level of soiling\n2. Pre-treating: Treat stains before washing\n3. Washing: Use appropriate water temperature, detergent, and cycle\n4. Drying: Follow fabric recommendations for drying method\n5. Ironing/Pressing: Use appropriate temperature settings for different fabrics\n6. Folding/Hanging: Store properly to prevent wrinkles and damage\n7. Mending: Repair minor damages promptly\n8. Seasonal storage: Clean thoroughly before storing seasonal clothes",
          difficulty: "easy",
          tags: ["textiles", "clothing care", "maintenance"],
          timeRecommended: 30
        },
        {
          id: "hs-text-f5",
          question: "What do the common laundry care symbols mean?",
          answer: "Common laundry care symbols:\n\n🪣 Washing tub: How to wash the garment\n- With a hand: Hand wash only\n- With a number: Maximum washing temperature\n- With an X: Do not wash\n\n⚪ Circle: Dry cleaning instructions\n- With an X: Do not dry clean\n\n◻ Square: Drying instructions\n- With a circle inside: Tumble drying allowed\n- With an X: Do not tumble dry\n\n▽ Triangle: Bleaching instructions\n- With an X: Do not bleach\n\n⏢ Iron: Ironing instructions\n- With dots (1-3): Temperature settings\n- With an X: Do not iron",
          difficulty: "medium",
          tags: ["textiles", "clothing care", "symbols"],
          timeRecommended: 40
        },
        {
          id: "hs-text-f6",
          question: "What are the different types of fabric weaves and their characteristics?",
          answer: "Common fabric weaves and their characteristics:\n\n1. Plain weave:\n- Simplest, most common weave\n- Each weft thread goes over and under each warp thread\n- Durable and firm\n- Examples: muslin, gingham, canvas\n\n2. Twill weave:\n- Diagonal pattern\n- More durable than plain weave\n- Drapes well and hides stains\n- Examples: denim, gabardine, tweed\n\n3. Satin weave:\n- Glossy surface with floating yarns\n- Luxurious appearance\n- Less durable, can snag easily\n- Examples: satin, sateen\n\n4. Basket weave:\n- Variation of plain weave with two or more threads\n- More textured than plain weave\n- Examples: oxford cloth, monk's cloth",
          difficulty: "hard",
          tags: ["textiles", "fabrics", "weaves"],
          timeRecommended: 45
        },
        {
          id: "hs-text-f7",
          question: "What are the common methods for removing different types of stains?",
          answer: "Stain removal methods:\n\n1. Grease/Oil stains (food, makeup):\n- Pre-treat with dish soap or laundry detergent\n- For stubborn stains, use enzyme pre-treatment\n\n2. Protein stains (blood, egg):\n- Soak in cold water (never hot)\n- Use enzyme detergent\n\n3. Tannin stains (tea, coffee, wine):\n- Rinse with cold water immediately\n- Use vinegar or lemon juice solution\n\n4. Ink stains:\n- Blot with rubbing alcohol\n- For ballpoint ink, try hairspray\n\n5. Rust stains:\n- Apply lemon juice and salt\n- Commercial rust removers for stubborn stains\n\n6. Grass stains:\n- Pre-treat with enzyme detergent\n- Rubbing alcohol can also be effective",
          difficulty: "medium",
          tags: ["textiles", "clothing care", "stain removal"],
          timeRecommended: 40
        },
        {
          id: "hs-text-f8",
          question: "What factors should be considered when selecting fabrics for clothing?",
          answer: "Factors to consider when selecting fabrics:\n\n1. Purpose/Function: What the garment will be used for\n2. Comfort: Breathability, texture against skin\n3. Climate/Weather: Season and local conditions\n4. Durability: How long the garment needs to last\n5. Care requirements: Washing, ironing, dry cleaning needs\n6. Cost: Budget constraints\n7. Appearance: Drape, texture, color, pattern\n8. Special needs: Allergies, sensitivities\n9. Environmental impact: Sustainability of production\n10. Cultural or religious requirements",
          difficulty: "medium",
          tags: ["textiles", "fabrics", "selection"],
          timeRecommended: 35
        },
        {
          id: "hs-text-f9",
          question: "What are the basic tools needed for sewing and their functions?",
          answer: "Basic sewing tools and their functions:\n\n1. Needles: For hand sewing different types of fabrics\n2. Pins: To temporarily hold fabric pieces together\n3. Scissors/Shears: For cutting fabric (fabric scissors should not be used for paper)\n4. Measuring tape: For taking body measurements and measuring fabric\n5. Thimble: Protects finger when pushing needle through fabric\n6. Seam ripper: For removing stitches when mistakes are made\n7. Tailor's chalk/Fabric marker: For marking patterns on fabric\n8. Pincushion: For storing pins safely\n9. Thread: For stitching fabric pieces together\n10. Iron: For pressing seams and finished garments",
          difficulty: "easy",
          tags: ["textiles", "clothing construction", "tools"],
          timeRecommended: 30
        },
        {
          id: "hs-text-f10",
          question: "What are the different types of seams and their uses?",
          answer: "Types of seams and their uses:\n\n1. Plain seam:\n- Most common and simplest seam\n- Used for most general sewing\n\n2. French seam:\n- Encloses raw edges within the seam\n- Used for sheer or lightweight fabrics\n- Provides a clean finish\n\n3. Flat-felled seam:\n- Strong, durable seam with two rows of stitching\n- Used for heavy-duty garments like jeans\n- Prevents raveling\n\n4. Lapped seam:\n- One edge laps over the other\n- Used in tailored garments\n\n5. Bound seam:\n- Raw edges enclosed with binding\n- Used for unlined jackets or visible seams\n\n6. Overlock/Serged seam:\n- Created with an overlock machine\n- Finishes edges while joining fabric\n- Common in ready-to-wear garments",
          difficulty: "hard",
          tags: ["textiles", "clothing construction", "seams"],
          timeRecommended: 45
        }
      ],
      totalCards: 10,
      estimatedTime: 380,
      difficulty: "medium"
    },
    {
      id: "home-science-family-care",
      title: "Family Care and Relationships",
      description: "Explore concepts related to family dynamics, child care, and home management.",
      subject: "Home Science",
      topic: "Caring for the Family",
      subtopic: "Family Relationships",
      grade: "Grade 8",
      flashcards: [
        {
          id: "hs-fam-f1",
          question: "What are the different types of family structures?",
          answer: "Different types of family structures include:\n\n1. Nuclear family: Parents and their children only\n2. Extended family: Nuclear family plus other relatives (grandparents, aunts, uncles, etc.)\n3. Single-parent family: One parent raising children\n4. Blended family: Combination of two families through remarriage\n5. Childless family: Couple with no children\n6. Grandparent-headed family: Grandparents raising grandchildren\n7. Foster family: Family caring for children who are not biologically theirs\n8. Adoptive family: Family with legally adopted children",
          difficulty: "medium",
          tags: ["family care", "family structures", "relationships"],
          timeRecommended: 35
        },
        {
          id: "hs-fam-f2",
          question: "What are the functions of a family?",
          answer: "Functions of a family include:\n\n1. Reproduction and continuation of society\n2. Physical care and protection of members\n3. Emotional support and psychological well-being\n4. Socialization of children (teaching values, norms, and skills)\n5. Economic support and resource sharing\n6. Identity formation and sense of belonging\n7. Education and transmission of culture\n8. Recreation and leisure activities\n9. Regulation of social and sexual behavior",
          difficulty: "medium",
          tags: ["family care", "family functions", "relationships"],
          timeRecommended: 35
        },
        {
          id: "hs-fam-f3",
          question: "What are the stages of the family life cycle?",
          answer: "The family life cycle typically includes these stages:\n\n1. Formation (marriage/partnership)\n2. Expansion (birth/adoption of children)\n3. School-age children (education and socialization)\n4. Adolescent children (increasing independence)\n5. Launching (children leaving home)\n6. Post-parental/Empty nest (couple alone again)\n7. Aging family members (retirement, grandparenthood)\n\nEach stage presents unique challenges, tasks, and adjustments for family members.",
          difficulty: "medium",
          tags: ["family care", "family life cycle", "development"],
          timeRecommended: 40
        },
        {
          id: "hs-fam-f4",
          question: "What are effective communication skills within a family?",
          answer: "Effective family communication skills include:\n\n1. Active listening: Giving full attention without interrupting\n2. Clear expression: Stating thoughts and feelings directly\n3. \"I\" statements: Expressing feelings without blaming (\"I feel...\" instead of \"You always...\")\n4. Empathy: Understanding others' perspectives\n5. Respect: Valuing each person's opinions and feelings\n6. Appropriate timing: Choosing suitable moments for important discussions\n7. Non-verbal communication: Being aware of body language and tone\n8. Conflict resolution: Addressing disagreements constructively\n9. Regular family meetings: Creating space for open communication",
          difficulty: "medium",
          tags: ["family care", "communication", "relationships"],
          timeRecommended: 35
        },
        {
          id: "hs-fam-f5",
          question: "What are the principles of effective home management?",
          answer: "Principles of effective home management include:\n\n1. Planning: Setting goals and making decisions about resources\n2. Organizing: Arranging resources and tasks efficiently\n3. Implementing: Carrying out plans and delegating responsibilities\n4. Controlling: Monitoring progress and making adjustments\n5. Evaluating: Assessing outcomes and making improvements\n6. Time management: Prioritizing tasks and using time efficiently\n7. Resource management: Using money, energy, and materials wisely\n8. Work simplification: Finding easier ways to complete tasks\n9. Cooperation: Involving all family members in household tasks\n10. Flexibility: Adapting to changing circumstances",
          difficulty: "medium",
          tags: ["family care", "home management", "principles"],
          timeRecommended: 40
        },
        {
          id: "hs-fam-f6",
          question: "What are the basic principles of child development?",
          answer: "Basic principles of child development include:\n\n1. Development follows a predictable pattern but at individual rates\n2. Development proceeds from head to toe (cephalocaudal) and from center outward (proximodistal)\n3. Development moves from simple to complex skills\n4. Development is influenced by both nature (genetics) and nurture (environment)\n5. Critical periods exist when specific types of learning and development occur most easily\n6. Development occurs across multiple domains simultaneously (physical, cognitive, social, emotional)\n7. Early experiences have profound effects on development\n8. Play is essential for healthy development\n9. Relationships are fundamental to development",
          difficulty: "hard",
          tags: ["family care", "child development", "principles"],
          timeRecommended: 45
        },
        {
          id: "hs-fam-f7",
          question: "What are the signs of a healthy family relationship?",
          answer: "Signs of a healthy family relationship include:\n\n1. Open and honest communication\n2. Mutual respect for individual differences\n3. Trust and support for one another\n4. Clear roles and boundaries\n5. Shared responsibility and cooperation\n6. Quality time spent together\n7. Ability to adapt to change and crisis\n8. Problem-solving skills and conflict resolution\n9. Balance between togetherness and individual autonomy\n10. Expressions of appreciation and affection\n11. Shared values and beliefs\n12. Sense of humor and playfulness",
          difficulty: "medium",
          tags: ["family care", "relationships", "healthy family"],
          timeRecommended: 35
        },
        {
          id: "hs-fam-f8",
          question: "What are the different parenting styles and their effects on children?",
          answer: "Parenting styles and their effects:\n\n1. Authoritarian (high demands, low responsiveness):\n- Strict rules with little explanation\n- Effects: Children may be obedient but have lower self-esteem, poorer social skills\n\n2. Authoritative (high demands, high responsiveness):\n- Clear rules with explanations and flexibility\n- Effects: Children tend to be self-reliant, socially competent, academically successful\n\n3. Permissive (low demands, high responsiveness):\n- Few rules or expectations, very nurturing\n- Effects: Children may lack self-discipline, be demanding, have poor academic performance\n\n4. Uninvolved (low demands, low responsiveness):\n- Minimal guidance, attention, or support\n- Effects: Children may have low self-esteem, poor self-control, difficulty with relationships",
          difficulty: "hard",
          tags: ["family care", "parenting", "child development"],
          timeRecommended: 45
        },
        {
          id: "hs-fam-f9",
          question: "What are the key aspects of financial management in a family?",
          answer: "Key aspects of family financial management include:\n\n1. Budgeting: Planning income and expenses\n2. Saving: Setting aside money for future needs and emergencies\n3. Spending wisely: Making informed consumer decisions\n4. Debt management: Using credit responsibly and avoiding excessive debt\n5. Financial goal setting: Planning for short and long-term needs\n6. Record keeping: Tracking income, expenses, and financial documents\n7. Insurance: Protecting against financial risks\n8. Investment: Growing wealth for future needs\n9. Financial education: Teaching children about money management\n10. Communication: Discussing financial matters openly as a family",
          difficulty: "medium",
          tags: ["family care", "financial management", "budgeting"],
          timeRecommended: 35
        },
        {
          id: "hs-fam-f10",
          question: "What are the principles of time management in the home?",
          answer: "Principles of time management in the home include:\n\n1. Setting priorities: Determining what tasks are most important\n2. Planning: Creating daily, weekly, and monthly schedules\n3. Delegation: Sharing responsibilities among family members\n4. Eliminating time wasters: Identifying and reducing unproductive activities\n5. Combining tasks: Doing multiple tasks simultaneously when possible\n6. Using labor-saving devices: Employing technology and tools to save time\n7. Establishing routines: Creating regular patterns for recurring tasks\n8. Flexibility: Allowing for unexpected events and changes\n9. Rest and recreation: Scheduling downtime to prevent burnout\n10. Evaluation: Regularly reviewing and adjusting time management strategies",
          difficulty: "medium",
          tags: ["family care", "home management", "time management"],
          timeRecommended: 35
        }
      ],
      totalCards: 10,
      estimatedTime: 380,
      difficulty: "medium"
    }
  ]
};