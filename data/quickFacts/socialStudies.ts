import { QuickFactsBank } from './types';

export const socialStudiesQuickFacts: QuickFactsBank = {
  subject: "Social Studies",
  grades: ["Grade 8"],
  topics: [
    { name: "Geography", subtopics: ["Physical Geography", "Human Geography", "Map Skills"] },
    { name: "History", subtopics: ["World History", "African History", "Kenyan History"] },
    { name: "Civics", subtopics: ["Government", "Citizenship", "Human Rights"] },
    { name: "Economics", subtopics: ["Basic Economics", "Trade", "Resources"] }
  ],
  flashcardSets: [
    {
      id: "ss-geography-kenya",
      title: "Geography of Kenya",
      description: "Test your knowledge of Kenya's physical features, climate, and regions.",
      subject: "Social Studies",
      topic: "Geography",
      subtopic: "Physical Geography",
      grade: "Grade 8",
      flashcards: [
        {
          id: "ss-geo-f1",
          question: "What are the main physical regions of Kenya?",
          answer: "Kenya has five main physical regions:\n\n1. The Coastal Plains: Low-lying area along the Indian Ocean\n2. The Nyika Plateau: Semi-arid to arid plains covering most of northern and eastern Kenya\n3. The Central Highlands: High-altitude region including the Aberdare Range and areas around Mount Kenya\n4. The Rift Valley: Part of the Great Rift Valley running north-south through Kenya\n5. The Lake Victoria Basin: Lowlands surrounding Lake Victoria in western Kenya",
          difficulty: "medium",
          tags: ["geography", "physical geography", "regions"],
          imageUrl: "https://images.pexels.com/photos/631522/pexels-photo-631522.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 40
        },
        {
          id: "ss-geo-f2",
          question: "Which is the highest mountain in Kenya?",
          answer: "Mount Kenya is the highest mountain in Kenya and the second-highest in Africa (after Mount Kilimanjaro in Tanzania). It has three main peaks: Batian (5,199 meters), Nelion (5,188 meters), and Point Lenana (4,985 meters). It is an ancient extinct volcano and is located in central Kenya, just south of the equator.",
          difficulty: "easy",
          tags: ["geography", "physical geography", "mountains"],
          timeRecommended: 25
        },
        {
          id: "ss-geo-f3",
          question: "What are the main features of Kenya's climate?",
          answer: "Kenya's climate varies by region but has these main features:\n\n1. Tropical climate modified by altitude, with temperatures generally higher at lower elevations\n2. Two rainy seasons: the long rains (March-May) and short rains (October-December)\n3. Coastal areas: Hot and humid year-round\n4. Highlands: Moderate temperatures with cool nights\n5. Northern plains: Hot and dry with little rainfall\n6. Western Kenya: Relatively high rainfall throughout the year\n7. Temperature variations more by altitude than by season\n8. Climate affected by the Inter-Tropical Convergence Zone (ITCZ)",
          difficulty: "medium",
          tags: ["geography", "physical geography", "climate"],
          timeRecommended: 35
        },
        {
          id: "ss-geo-f4",
          question: "Name and describe the major lakes in Kenya.",
          answer: "Major lakes in Kenya include:\n\n1. Lake Victoria: Africa's largest lake, shared with Uganda and Tanzania; freshwater lake important for fishing and transportation\n\n2. Lake Turkana: Largest desert lake in the world; alkaline lake in northern Kenya; UNESCO World Heritage site\n\n3. Lake Naivasha: Freshwater lake in the Rift Valley; important for floriculture, tourism, and wildlife\n\n4. Lake Nakuru: Famous for flamingos; alkaline lake in the Rift Valley; part of Lake Nakuru National Park\n\n5. Lake Baringo: Freshwater lake in the Rift Valley; home to hippos, crocodiles, and numerous bird species\n\n6. Lake Bogoria: Hot springs and geysers; alkaline lake known for flamingos\n\n7. Lake Magadi: Highly alkaline lake with soda deposits; commercially exploited for soda ash",
          difficulty: "medium",
          tags: ["geography", "physical geography", "lakes"],
          timeRecommended: 40
        },
        {
          id: "ss-geo-f5",
          question: "What is the Great Rift Valley and how was it formed?",
          answer: "The Great Rift Valley is a vast geological feature that runs north-south through Kenya, part of a larger system extending from Lebanon to Mozambique.\n\nIt was formed by the separation of the African and Arabian tectonic plates, creating a series of fault lines and depressions. This process began about 25 million years ago and continues today.\n\nIn Kenya, the Rift Valley features dramatic escarpments, volcanic mountains (like Longonot and Menengai), and a series of lakes (including Turkana, Baringo, Bogoria, Nakuru, Elementaita, Naivasha, and Magadi).\n\nThe valley floor in Kenya ranges from 400 to 900 meters above sea level, while the surrounding highlands can reach over 3,000 meters.",
          difficulty: "hard",
          tags: ["geography", "physical geography", "geological features"],
          timeRecommended: 45
        },
        {
          id: "ss-geo-f6",
          question: "What are the major rivers in Kenya and their importance?",
          answer: "Major rivers in Kenya and their importance:\n\n1. Tana River: Kenya's longest river; important for hydroelectric power generation, irrigation, and water supply\n\n2. Galana/Athi-Sabaki River: Flows through Tsavo National Park; important for wildlife and local communities\n\n3. Ewaso Ng'iro: Vital water source for northern Kenya's arid and semi-arid regions\n\n4. Mara River: Crosses the Kenya-Tanzania border through the Maasai Mara and Serengeti; crucial for the annual wildebeest migration\n\n5. Nzoia River: Drains into Lake Victoria; important for agriculture in western Kenya\n\n6. Yala River: Flows into Lake Victoria; supports agriculture and has potential for hydroelectric power\n\n7. Nyando River: Drains into Lake Victoria; important for agriculture but prone to flooding",
          difficulty: "medium",
          tags: ["geography", "physical geography", "rivers"],
          timeRecommended: 40
        },
        {
          id: "ss-geo-f7",
          question: "What are the main vegetation zones in Kenya?",
          answer: "Main vegetation zones in Kenya:\n\n1. Coastal Forests: Found along the coast; include mangrove forests and tropical rainforests\n\n2. Savanna Grasslands: Cover much of Kenya; characterized by grasses and scattered trees; home to wildlife\n\n3. Montane Forests: Found in highland areas like Mount Kenya, the Aberdares, and Mau Forest; important water catchment areas\n\n4. Bamboo Zones: Found at specific altitudes on mountains (2,400-3,000m)\n\n5. Alpine Vegetation: Found at high altitudes on mountains like Mount Kenya\n\n6. Desert and Semi-Desert Vegetation: In northern and northeastern Kenya; adapted to arid conditions\n\n7. Wetland Vegetation: Around lakes, rivers, and swamps\n\nVegetation distribution is largely determined by altitude, rainfall patterns, and soil types.",
          difficulty: "hard",
          tags: ["geography", "physical geography", "vegetation"],
          timeRecommended: 45
        },
        {
          id: "ss-geo-f8",
          question: "What are the main factors influencing population distribution in Kenya?",
          answer: "Factors influencing population distribution in Kenya:\n\n1. Climate: Higher population in areas with moderate rainfall and temperatures\n\n2. Relief (Topography): Higher population in areas with moderate altitude and gentle slopes\n\n3. Soil Fertility: Higher population in areas with fertile soils suitable for agriculture\n\n4. Water Availability: Higher population near reliable water sources\n\n5. Economic Opportunities: Higher population in areas with employment opportunities\n\n6. Historical Factors: Colonial policies influenced settlement patterns\n\n7. Infrastructure: Better roads, electricity, and services attract population\n\n8. Government Policies: Land resettlement schemes and urban development plans\n\n9. Security: People tend to avoid areas with security concerns",
          difficulty: "medium",
          tags: ["geography", "human geography", "population"],
          timeRecommended: 40
        },
        {
          id: "ss-geo-f9",
          question: "What are the main economic activities in different regions of Kenya?",
          answer: "Economic activities by region in Kenya:\n\n1. Central Highlands: Cash crop farming (tea, coffee), dairy farming, horticulture\n\n2. Rift Valley: Large-scale grain farming, horticulture, dairy farming, tourism\n\n3. Western Kenya: Subsistence farming (maize, beans), sugarcane farming, fishing in Lake Victoria\n\n4. Coastal Region: Tourism, fishing, coconut and cashew nut farming, port services\n\n5. Eastern Kenya: Semi-arid agriculture, livestock keeping, miraa (khat) farming\n\n6. Northern Kenya: Pastoralism (nomadic livestock keeping), emerging oil industry\n\n7. Nairobi and major urban centers: Manufacturing, services, information technology, finance",
          difficulty: "medium",
          tags: ["geography", "human geography", "economic activities"],
          timeRecommended: 40
        },
        {
          id: "ss-geo-f10",
          question: "What are the major conservation challenges in Kenya and how are they being addressed?",
          answer: "Conservation challenges in Kenya and solutions:\n\n1. Deforestation:\n- Challenges: Agricultural expansion, logging, charcoal production\n- Solutions: Reforestation programs, alternative energy sources, community forestry\n\n2. Wildlife poaching:\n- Challenges: Illegal ivory and rhino horn trade, bushmeat\n- Solutions: Anti-poaching units, stricter penalties, international cooperation\n\n3. Human-wildlife conflict:\n- Challenges: Crop destruction, livestock predation, human injuries/deaths\n- Solutions: Electric fences, compensation schemes, wildlife corridors\n\n4. Climate change:\n- Challenges: Droughts, floods, changing rainfall patterns\n- Solutions: Climate-smart agriculture, renewable energy, adaptation strategies\n\n5. Land degradation:\n- Challenges: Overgrazing, poor farming practices, soil erosion\n- Solutions: Sustainable land management, terracing, agroforestry\n\n6. Water pollution:\n- Challenges: Industrial waste, agricultural runoff, urban sewage\n- Solutions: Stricter regulations, water treatment, riparian conservation",
          difficulty: "hard",
          tags: ["geography", "environmental conservation", "challenges"],
          timeRecommended: 45
        }
      ],
      totalCards: 10,
      estimatedTime: 395,
      difficulty: "medium"
    },
    {
      id: "ss-kenyan-history",
      title: "Kenyan History",
      description: "Learn about key events and periods in Kenya's history.",
      subject: "Social Studies",
      topic: "History",
      subtopic: "Kenyan History",
      grade: "Grade 8",
      flashcards: [
        {
          id: "ss-hist-f1",
          question: "What were the main African communities in pre-colonial Kenya and how were they organized?",
          answer: "Main pre-colonial communities in Kenya and their organization:\n\n1. Bantu communities (e.g., Kikuyu, Luhya, Kamba):\n- Primarily agricultural\n- Organized in clans and age-sets\n- Land was communally owned\n\n2. Nilotic communities (e.g., Luo, Kalenjin, Maasai):\n- Primarily pastoral with some agriculture\n- Age-set system important for social organization\n- Emphasis on cattle wealth\n\n3. Cushitic communities (e.g., Somali, Rendille, Borana):\n- Primarily nomadic pastoralists\n- Clan-based social structure\n- Adapted to arid environments\n\nMost communities had decentralized leadership systems with councils of elders, though some had more centralized authority structures.",
          difficulty: "medium",
          tags: ["history", "pre-colonial", "communities"],
          timeRecommended: 45
        },
        {
          id: "ss-hist-f2",
          question: "What were the causes of European colonization of Kenya?",
          answer: "Causes of European colonization of Kenya:\n\n1. Economic factors:\n- Search for raw materials for European industries\n- Need for markets for European manufactured goods\n- Investment opportunities for European capital\n\n2. Strategic factors:\n- Control of the source of the Nile River\n- Securing trade routes to India and the Far East\n- Preventing other European powers from claiming territory\n\n3. Social factors:\n- Missionary desire to spread Christianity\n- European perception of a 'civilizing mission'\n\n4. Political factors:\n- Prestige and national pride in having colonies\n- The 'Scramble for Africa' following the Berlin Conference of 1884-85\n\n5. Technological factors:\n- Superior military technology\n- Medical advances that allowed Europeans to survive in tropical areas",
          difficulty: "medium",
          tags: ["history", "colonization", "causes"],
          timeRecommended: 40
        },
        {
          id: "ss-hist-f3",
          question: "What was the Mau Mau Uprising and why was it significant?",
          answer: "The Mau Mau Uprising (1952-1960):\n\nNature:\n- Armed resistance movement primarily by the Kikuyu people against British colonial rule\n- Fought for land rights and political freedom\n- Characterized by guerrilla warfare tactics, particularly in the forests of Central Kenya\n\nCauses:\n- Land alienation by European settlers\n- Economic exploitation and inequality\n- Political marginalization of Africans\n- Cultural suppression\n\nBritish response:\n- Declaration of a State of Emergency (1952-1959)\n- Mass detention, torture, and execution of suspected Mau Mau members\n- Forced resettlement of Kikuyu in 'protected villages'\n\nSignificance:\n- Accelerated the push for Kenya's independence\n- Demonstrated the depth of African resistance to colonialism\n- Led to political reforms and eventual negotiations for independence\n- Highlighted the brutality of colonial rule\n- Remains a complex and contested part of Kenya's national memory",
          difficulty: "hard",
          tags: ["history", "colonial", "resistance"],
          timeRecommended: 50
        },
        {
          id: "ss-hist-f4",
          question: "When did Kenya gain independence and who was its first president?",
          answer: "Kenya gained independence from British colonial rule on December 12, 1963.\n\nJomo Kenyatta became Kenya's first Prime Minister upon independence. When Kenya became a republic on December 12, 1964, he became the country's first President.\n\nKenyatta was a key figure in Kenya's independence movement, having been a founding member of the Kenya African Union (later Kenya African National Union or KANU). He was imprisoned by the colonial government from 1952 to 1959 for his alleged involvement in the Mau Mau Uprising.\n\nHe served as President until his death in 1978, when he was succeeded by Daniel arap Moi.",
          difficulty: "easy",
          tags: ["history", "independence", "leadership"],
          timeRecommended: 30
        },
        {
          id: "ss-hist-f5",
          question: "What were the major political developments in post-independence Kenya?",
          answer: "Major political developments in post-independence Kenya:\n\n1. Jomo Kenyatta era (1963-1978):\n- Harambee (pulling together) policy\n- Africanization of the economy\n- Shift to one-party state by 1969\n- Regional cooperation through East African Community\n\n2. Daniel arap Moi era (1978-2002):\n- Nyayo philosophy (following Kenyatta's footsteps)\n- Constitutional amendment making Kenya officially one-party state (1982)\n- Failed coup attempt (1982)\n- Political repression in the 1980s\n- Return to multi-party democracy (1991)\n- Economic challenges and structural adjustment programs\n\n3. Mwai Kibaki era (2002-2013):\n- End of KANU's 40-year rule\n- Economic recovery\n- Post-election violence (2007-2008)\n- New constitution (2010) with devolved government\n- Coalition government (2008-2013)\n\n4. Uhuru Kenyatta era (2013-2022):\n- Implementation of devolution\n- Infrastructure development\n- Challenges with corruption and public debt\n- Building Bridges Initiative (BBI)\n\n5. William Ruto era (2022-present):\n- Bottom-up economic model\n- Focus on agricultural transformation",
          difficulty: "hard",
          tags: ["history", "post-independence", "politics"],
          timeRecommended: 50
        },
        {
          id: "ss-hist-f6",
          question: "What was the significance of the 2010 Constitution in Kenya?",
          answer: "Significance of Kenya's 2010 Constitution:\n\n1. Devolution of power:\n- Created 47 county governments\n- Decentralized resources and decision-making\n- Brought services closer to citizens\n\n2. Strengthened democracy:\n- Enhanced separation of powers\n- Independent judiciary\n- More checks and balances\n\n3. Human rights protections:\n- Comprehensive Bill of Rights\n- Protection of marginalized groups\n- Gender equality provisions\n\n4. Land reforms:\n- Addressed historical land injustices\n- Created National Land Commission\n- Classified land as public, community, or private\n\n5. Citizenship reforms:\n- Allowed dual citizenship\n- Equal citizenship rights regardless of gender\n\n6. Electoral reforms:\n- Independent electoral commission\n- More transparent electoral process\n\n7. Public service reforms:\n- Merit-based appointments\n- Ethnic diversity requirements\n\nThe constitution was approved by 67% of voters in a referendum on August 4, 2010, and promulgated on August 27, 2010.",
          difficulty: "medium",
          tags: ["history", "constitution", "governance"],
          timeRecommended: 45
        },
        {
          id: "ss-hist-f7",
          question: "What was the East African Community and what led to its collapse in 1977?",
          answer: "The East African Community (1967-1977):\n\nNature:\n- Regional organization comprising Kenya, Uganda, and Tanzania\n- Aimed at economic integration and cooperation\n- Created common services (railways, harbors, airlines, postal services)\n- Common market with free movement of goods\n\nAchievements:\n- Common currency and customs union\n- East African Development Bank\n- University of East Africa with campuses in all three countries\n- Coordinated research institutions\n\nReasons for collapse in 1977:\n1. Ideological differences (Kenya: capitalism; Tanzania: socialism; Uganda: under Idi Amin's dictatorship)\n2. Unequal distribution of benefits (Kenya perceived to benefit more)\n3. Personality clashes between leaders\n4. Economic nationalism and protectionist policies\n5. Political instability, especially in Uganda\n6. Lack of private sector and civil society involvement\n\nThe EAC was revived in 1999 and has since expanded to include Rwanda, Burundi, South Sudan, and the Democratic Republic of Congo.",
          difficulty: "hard",
          tags: ["history", "regional integration", "East Africa"],
          timeRecommended: 45
        },
        {
          id: "ss-hist-f8",
          question: "What were the main economic policies adopted by Kenya after independence?",
          answer: "Main economic policies in post-independence Kenya:\n\n1. Africanization (1960s-70s):\n- Transfer of businesses and farms from Europeans to Africans\n- Kenyanization of public service\n\n2. Sessional Paper No. 10 of 1965:\n- \"African Socialism\" framework\n- Mixed economy approach\n- Government involvement in key sectors\n\n3. Import Substitution Industrialization (1960s-70s):\n- Developing local industries to produce previously imported goods\n- Protective tariffs and subsidies\n\n4. Structural Adjustment Programs (1980s-90s):\n- Privatization of state corporations\n- Reduction of government spending\n- Market liberalization\n- Imposed by World Bank and IMF\n\n5. Economic Recovery Strategy (2003-2007):\n- Focus on economic growth and poverty reduction\n- Infrastructure development\n- Improved governance\n\n6. Vision 2030 (2008-present):\n- Long-term development blueprint\n- Aim to transform Kenya into middle-income country\n- Focus on economic, social, and political pillars",
          difficulty: "hard",
          tags: ["history", "economics", "development"],
          timeRecommended: 45
        },
        {
          id: "ss-hist-f9",
          question: "What were the major ethnic groups in pre-colonial Kenya and where were they located?",
          answer: "Major ethnic groups in pre-colonial Kenya and their locations:\n\n1. Kikuyu: Central highlands around Mount Kenya\n\n2. Luhya: Western Kenya near Lake Victoria\n\n3. Kalenjin: Rift Valley highlands\n\n4. Luo: Shores of Lake Victoria in western Kenya\n\n5. Kamba: Eastern Kenya\n\n6. Kisii (Gusii): Southwestern highlands\n\n7. Meru: Eastern slopes of Mount Kenya\n\n8. Mijikenda: Coastal region\n\n9. Maasai: Rift Valley and southern Kenya\n\n10. Somali: Northeastern Kenya\n\n11. Turkana: Northwestern Kenya\n\n12. Samburu: North-central Kenya\n\n13. Taita: Southeastern Kenya\n\n14. Embu: Eastern slopes of Mount Kenya\n\nThese groups had distinct languages, cultural practices, and economic activities adapted to their environments.",
          difficulty: "medium",
          tags: ["history", "pre-colonial", "ethnic groups"],
          timeRecommended: 40
        },
        {
          id: "ss-hist-f10",
          question: "What was the impact of colonialism on traditional African societies in Kenya?",
          answer: "Impact of colonialism on traditional African societies in Kenya:\n\n1. Land alienation:\n- Europeans took the most fertile lands (White Highlands)\n- Africans confined to native reserves\n- Traditional land ownership systems disrupted\n\n2. Economic changes:\n- Introduction of cash economy and taxation\n- Forced labor and migration\n- Shift from subsistence to commercial agriculture\n\n3. Social and cultural impacts:\n- Introduction of Christianity and Western education\n- Undermining of traditional authority structures\n- Changes in family structures and gender roles\n\n4. Political reorganization:\n- Creation of artificial boundaries\n- Imposition of colonial administrative structures\n- Divide and rule tactics exacerbating ethnic tensions\n\n5. Demographic changes:\n- Population movements and resettlement\n- Introduction of new diseases\n- Urbanization\n\n6. Resistance and nationalism:\n- Development of political consciousness\n- Formation of early political organizations\n- Seeds of independence movement",
          difficulty: "hard",
          tags: ["history", "colonialism", "impact"],
          timeRecommended: 50
        }
      ],
      totalCards: 10,
      estimatedTime: 440,
      difficulty: "hard"
    },
    {
      id: "ss-government-citizenship",
      title: "Government and Citizenship",
      description: "Explore Kenya's government structure and the rights and responsibilities of citizens.",
      subject: "Social Studies",
      topic: "Civics",
      subtopic: "Government",
      grade: "Grade 8",
      flashcards: [
        {
          id: "ss-civ-f1",
          question: "What type of government system does Kenya have?",
          answer: "Kenya has a democratic republic with a presidential system of government. Key features include:\n\n1. The President is both head of state and head of government\n2. Separation of powers between executive, legislative, and judicial branches\n3. Devolved system with two levels of government: national and county (47 counties)\n4. Multi-party democracy with regular elections\n5. Constitutional supremacy\n6. Bill of Rights protecting fundamental freedoms\n7. Independent commissions and offices",
          difficulty: "medium",
          tags: ["civics", "government", "political system"],
          timeRecommended: 35
        },
        {
          id: "ss-civ-f2",
          question: "What are the three arms of government in Kenya and what are their functions?",
          answer: "The three arms of government in Kenya are:\n\n1. Executive:\n- Implements laws and policies\n- Headed by the President\n- Includes Deputy President, Cabinet Secretaries, Attorney General, and civil service\n- Functions: policy implementation, national security, foreign relations\n\n2. Legislature (Parliament):\n- Makes laws\n- Consists of National Assembly and Senate\n- Functions: law-making, budget approval, oversight of executive\n\n3. Judiciary:\n- Interprets and applies laws\n- Headed by Chief Justice and includes Supreme Court, Court of Appeal, High Court, and other courts\n- Functions: administration of justice, constitutional interpretation, dispute resolution",
          difficulty: "medium",
          tags: ["civics", "government", "separation of powers"],
          timeRecommended: 40
        },
        {
          id: "ss-civ-f3",
          question: "What is devolution in Kenya and how does it work?",
          answer: "Devolution in Kenya:\n\nDefinition: The transfer of political, administrative, and fiscal powers from the national government to 47 county governments.\n\nStructure:\n- Each county has a governor (executive) and county assembly (legislative)\n- Counties can make local laws (county legislation)\n- Counties manage their own budgets and revenue collection\n\nFunctions of county governments include:\n1. Agriculture\n2. County health services\n3. Control of air and noise pollution\n4. Cultural activities and public entertainment\n5. County transport and roads\n6. Animal control and welfare\n7. Trade development and regulation\n8. Pre-primary education and village polytechnics\n9. Water and sanitation services\n\nFunding comes from:\n- Equitable share from national revenue (at least 15%)\n- Conditional and unconditional grants\n- Local revenue collection\n- Loans (with national government guarantee)",
          difficulty: "hard",
          tags: ["civics", "government", "devolution"],
          timeRecommended: 45
        },
        {
          id: "ss-civ-f4",
          question: "What are the rights and responsibilities of Kenyan citizens?",
          answer: "Rights of Kenyan citizens (from the Bill of Rights):\n1. Right to life\n2. Equality and freedom from discrimination\n3. Human dignity\n4. Freedom and security of the person\n5. Privacy\n6. Freedom of expression, media, and access to information\n7. Freedom of association and assembly\n8. Political rights (to vote and be elected)\n9. Economic and social rights (education, health, housing, food)\n10. Access to justice\n\nResponsibilities of Kenyan citizens:\n1. Respecting the rights and freedoms of others\n2. Respecting and upholding the Constitution\n3. Paying taxes\n4. Participating in democratic processes\n5. Protecting the environment\n6. Promoting national unity\n7. Respecting public property\n8. Defending the country when necessary\n9. Obeying laws and regulations\n10. Reporting corruption and criminal activities",
          difficulty: "medium",
          tags: ["civics", "citizenship", "rights and responsibilities"],
          timeRecommended: 40
        },
        {
          id: "ss-civ-f5",
          question: "What is the electoral system in Kenya?",
          answer: "Kenya's electoral system:\n\nElectoral management:\n- Independent Electoral and Boundaries Commission (IEBC) manages all elections\n- Elections held every five years\n\nPositions elected:\n1. President and Deputy President (national)\n2. Senators (one per county)\n3. Members of National Assembly (290 constituencies)\n4. Woman Representatives (one per county)\n5. Governors (one per county)\n6. Members of County Assembly (wards)\n\nPresidential election:\n- Candidate must win more than 50% of votes cast nationally\n- Must get at least 25% of votes in at least 24 counties\n- If no candidate meets threshold, a run-off election is held\n\nVoting system:\n- Universal adult suffrage (18 years and above)\n- One person, one vote\n- Secret ballot\n- First-past-the-post system for most positions\n\nSpecial representation:\n- Reserved seats for women, youth, and persons with disabilities\n- Party lists used for proportional representation",
          difficulty: "hard",
          tags: ["civics", "government", "elections"],
          timeRecommended: 45
        },
        {
          id: "ss-civ-f6",
          question: "What are the national values and principles of governance in Kenya?",
          answer: "Kenya's national values and principles of governance (Article 10 of Constitution):\n\n1. Patriotism, national unity, sharing and devolution of power\n\n2. Rule of law, democracy and participation of the people\n\n3. Human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination and protection of the marginalized\n\n4. Good governance, integrity, transparency and accountability\n\n5. Sustainable development\n\nThese values bind all state organs, state officers, public officers, and all persons whenever they:\n- Apply or interpret the Constitution\n- Enact, apply, or interpret any law\n- Make or implement public policy decisions",
          difficulty: "medium",
          tags: ["civics", "government", "values"],
          timeRecommended: 35
        },
        {
          id: "ss-civ-f7",
          question: "What is the role of the judiciary in Kenya?",
          answer: "Role of the judiciary in Kenya:\n\n1. Interpreting and applying the Constitution and laws\n\n2. Resolving disputes between:\n   - Individuals\n   - Government entities\n   - National and county governments\n   - Different county governments\n\n3. Determining questions of constitutional validity\n\n4. Protecting human rights and fundamental freedoms\n\n5. Promoting alternative dispute resolution\n\n6. Administering justice without undue regard to procedural technicalities\n\n7. Ensuring justice is not delayed or denied\n\nThe judiciary is independent and subject only to the Constitution and the law. It is not subject to control or direction by any person or authority.",
          difficulty: "medium",
          tags: ["civics", "government", "judiciary"],
          timeRecommended: 35
        },
        {
          id: "ss-civ-f8",
          question: "What are the main political parties in Kenya and their ideologies?",
          answer: "Main political parties in Kenya (as of 2023):\n\n1. United Democratic Alliance (UDA):\n- Current ruling party led by President William Ruto\n- Center-right, populist orientation\n- Emphasizes 'bottom-up' economic model\n\n2. Orange Democratic Movement (ODM):\n- Led by Raila Odinga\n- Social democratic orientation\n- Emphasizes devolution and social welfare\n\n3. Jubilee Party:\n- Former ruling party under President Uhuru Kenyatta\n- Centrist orientation\n- Focus on infrastructure development and national unity\n\n4. Wiper Democratic Movement:\n- Led by Kalonzo Musyoka\n- Center-left orientation\n\n5. FORD Kenya:\n- Led by Moses Wetangula\n- Social democratic orientation\n\nNote: Kenyan political parties are often more personality-driven and ethnically aligned rather than strictly ideological. Coalitions and alliances frequently form and dissolve around elections.",
          difficulty: "medium",
          tags: ["civics", "government", "political parties"],
          timeRecommended: 35
        },
        {
          id: "ss-civ-f9",
          question: "What is the process of law-making in Kenya?",
          answer: "Law-making process in Kenya:\n\n1. Bill Initiation:\n- Can be introduced in either National Assembly or Senate\n- May be proposed by MPs, committees, or the public\n\n2. First Reading:\n- Formal introduction of the bill\n- No debate at this stage\n\n3. Second Reading:\n- General debate on principles of the bill\n- If approved, moves to committee stage\n\n4. Committee Stage:\n- Detailed examination by relevant committee\n- Public participation through hearings\n- Amendments may be proposed\n\n5. Report Stage:\n- Committee reports to the whole house\n- Further amendments may be considered\n\n6. Third Reading:\n- Final debate and vote\n- If passed, bill is sent to the other house\n\n7. Consideration by Other House:\n- Similar process in the other house\n- If amendments are made, bill returns to originating house\n\n8. Presidential Assent:\n- President has 14 days to assent or refer back with reservations\n- If referred back, Parliament can amend or pass again with two-thirds majority\n\n9. Publication:\n- Bill becomes law when published in the Kenya Gazette",
          difficulty: "hard",
          tags: ["civics", "government", "legislation"],
          timeRecommended: 45
        },
        {
          id: "ss-civ-f10",
          question: "What are the main functions of county governments in Kenya?",
          answer: "Main functions of county governments in Kenya:\n\n1. Agriculture:\n- Crop and animal husbandry\n- Livestock sale yards\n- County abattoirs\n- Plant and animal disease control\n\n2. Health:\n- County health facilities and pharmacies\n- Ambulance services\n- Promotion of primary healthcare\n- Licensing and control of food establishments\n\n3. Control of pollution and environmental conservation\n\n4. Cultural activities, public entertainment, and amenities\n\n5. Transport:\n- County roads\n- Street lighting\n- Traffic and parking\n- Public road transport\n\n6. Animal control and welfare\n\n7. Trade development and regulation:\n- Markets\n- Trade licenses\n- Fair trading practices\n- Local tourism\n\n8. Education:\n- Pre-primary education\n- Village polytechnics\n- Childcare facilities\n\n9. Water and sanitation services\n\n10. Implementation of national government policies\n\n11. County planning and development",
          difficulty: "medium",
          tags: ["civics", "government", "devolution"],
          timeRecommended: 40
        }
      ],
      totalCards: 10,
      estimatedTime: 400,
      difficulty: "medium"
    }
  ]
};