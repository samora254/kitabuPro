import { QuickFactsBank } from './types';

export const kiswahiliQuickFacts: QuickFactsBank = {
  subject: "Kiswahili",
  grades: ["Grade 8"],
  topics: [
    { name: "Sarufi", subtopics: ["Ngeli", "Vitenzi", "Vivumishi"] },
    { name: "Fasihi", subtopics: ["Hadithi", "Mashairi", "Methali"] },
    { name: "Uandishi", subtopics: ["Insha", "Barua", "Muhtasari"] },
    { name: "Usomaji", subtopics: ["Ufahamu", "Ufupisho", "Maswali"] }
  ],
  flashcardSets: [
    {
      id: "kisw-sarufi-ngeli",
      title: "Ngeli za Kiswahili",
      description: "Jaribu ujuzi wako kuhusu ngeli mbalimbali za Kiswahili.",
      subject: "Kiswahili",
      topic: "Sarufi",
      subtopic: "Ngeli",
      grade: "Grade 8",
      flashcards: [
        {
          id: "kisw-sar-f1",
          question: "Nomino 'mwalimu' iko katika ngeli gani?",
          answer: "Nomino 'mwalimu' iko katika ngeli ya M-WA kwani inaanza na 'M' na wingi wake ni 'walimu' unaanza na 'WA'.",
          difficulty: "easy",
          tags: ["sarufi", "ngeli", "nomino"],
          timeRecommended: 20
        },
        {
          id: "kisw-sar-f2",
          question: "Taja ngeli tano za Kiswahili pamoja na mifano yake.",
          answer: "1. M-WA: mtu - watu, mtoto - watoto\n2. M-MI: mti - miti, mlima - milima\n3. KI-VI: kiti - viti, kitabu - vitabu\n4. N-N: nyumba - nyumba, ndege - ndege\n5. JI-MA: jino - meno, jicho - macho",
          difficulty: "medium",
          tags: ["sarufi", "ngeli", "mifano"],
          timeRecommended: 40
        },
        {
          id: "kisw-sar-f3",
          question: "Ni sentensi ipi iliyo na vivumishi vya ngeli sahihi?",
          answer: "Kitabu changu kimepotea.\n\nKitabu (KI-VI) kinahitaji kivumishi 'changu' na kiambishi 'ki-' kwenye kitenzi.",
          difficulty: "medium",
          tags: ["sarufi", "ngeli", "vivumishi"],
          timeRecommended: 30
        },
        {
          id: "kisw-sar-f4",
          question: "Nomino 'mti' na 'mto' ziko katika ngeli gani?",
          answer: "Nomino 'mti' na 'mto' ziko katika ngeli ya M-MI kwani zinaanza na 'M' na wingi wake ni 'miti' na 'mito' unaanza na 'MI'.",
          difficulty: "easy",
          tags: ["sarufi", "ngeli", "nomino"],
          timeRecommended: 25
        },
        {
          id: "kisw-sar-f5",
          question: "Chagua sentensi yenye upatanisho sahihi wa kisarufi.",
          answer: "Nyumba yetu ni kubwa.\n\nNomino 'nyumba' iko katika ngeli ya N-N, hivyo kivumishi kinafaa kuwa 'yetu' na si 'letu', 'zetu' au 'wetu'.",
          difficulty: "medium",
          tags: ["sarufi", "ngeli", "upatanisho"],
          timeRecommended: 30
        },
        {
          id: "kisw-sar-f6",
          question: "Ni sentensi ipi iliyo na upatanisho sahihi wa ngeli?",
          answer: "Wanafunzi wale wanasoma.\n\nNomino 'wanafunzi' iko katika ngeli ya M-WA (wingi), hivyo kivumishi kionyeshi kinafaa kuwa 'wale' na kiambishi kipatanishi kwenye kitenzi ni 'wa-'.",
          difficulty: "hard",
          tags: ["sarufi", "ngeli", "upatanisho"],
          timeRecommended: 35
        },
        {
          id: "kisw-sar-f7",
          question: "Taja viambishi vya ngeli ya A-WA katika umoja na wingi.",
          answer: "Ngeli ya A-WA:\nUmoja: a-, yu-, wa-, m-, wake\nWingi: wa-, we-, wa-, wa-, wao",
          difficulty: "hard",
          tags: ["sarufi", "ngeli", "viambishi"],
          timeRecommended: 40
        },
        {
          id: "kisw-sar-f8",
          question: "Nomino 'kiatu' na 'kijiko' ziko katika ngeli gani?",
          answer: "Nomino 'kiatu' na 'kijiko' ziko katika ngeli ya KI-VI kwani zinaanza na 'KI' na wingi wake ni 'viatu' na 'vijiko' unaanza na 'VI'.",
          difficulty: "easy",
          tags: ["sarufi", "ngeli", "nomino"],
          timeRecommended: 20
        },
        {
          id: "kisw-sar-f9",
          question: "Taja ngeli ya LI-YA na mifano mitatu ya nomino katika ngeli hii.",
          answer: "Ngeli ya LI-YA (JI-MA) ni ngeli inayojumuisha nomino zenye umoja unaoanza na 'JI/LI' na wingi unaoanza na 'MA'.\n\nMifano:\n1. Jino - Meno\n2. Jicho - Macho\n3. Tunda - Matunda",
          difficulty: "medium",
          tags: ["sarufi", "ngeli", "mifano"],
          timeRecommended: 30
        },
        {
          id: "kisw-sar-f10",
          question: "Kamilisha sentensi ifuatayo kwa kutumia kiambishi sahihi cha ngeli: Mti ___ mrefu ___ meanguka.",
          answer: "Mti ule mrefu umeanguka.\n\nNomino 'mti' iko katika ngeli ya M-MI (umoja), hivyo kiambishi kionyeshi ni 'ule' na kiambishi kipatanishi kwenye kitenzi ni 'u-'.",
          difficulty: "hard",
          tags: ["sarufi", "ngeli", "viambishi"],
          timeRecommended: 35
        }
      ],
      totalCards: 10,
      estimatedTime: 305,
      difficulty: "medium"
    },
    {
      id: "kisw-methali-vitendawili",
      title: "Methali na Vitendawili",
      description: "Jaribu ujuzi wako kuhusu methali na vitendawili vya Kiswahili.",
      subject: "Kiswahili",
      topic: "Fasihi",
      subtopic: "Methali",
      grade: "Grade 8",
      flashcards: [
        {
          id: "kisw-meth-f1",
          question: "Kamilisha methali: Asiyesikia la mkuu, _______",
          answer: "Asiyesikia la mkuu, huvunjika guu.\n\nMaana: Mtu asiyefuata ushauri wa watu wazima hupatwa na matatizo.",
          difficulty: "easy",
          tags: ["fasihi", "methali", "mafumbo"],
          timeRecommended: 20
        },
        {
          id: "kisw-meth-f2",
          question: "Kamilisha methali: Haraka haraka, _______",
          answer: "Haraka haraka, haina baraka.\n\nMaana: Kufanya mambo kwa haraka kunaweza kusababisha makosa. Ni bora kufanya mambo kwa umakini na upole.",
          difficulty: "easy",
          tags: ["fasihi", "methali", "mafumbo"],
          timeRecommended: 20
        },
        {
          id: "kisw-meth-f3",
          question: "Kamilisha methali: Mtaka cha mvunguni, _______",
          answer: "Mtaka cha mvunguni, sharti ainame.\n\nMaana: Ili kupata kitu kizuri au cha thamani, mtu lazima ajitahidi na kuvumilia ugumu.",
          difficulty: "medium",
          tags: ["fasihi", "methali", "mafumbo"],
          timeRecommended: 25
        },
        {
          id: "kisw-meth-f4",
          question: "Kamilisha methali: Ukiona vyaelea, _______",
          answer: "Ukiona vyaelea, vimeundwa.\n\nMaana: Kila kitu kina asili yake; hakuna kinachojitokeza bila sababu.",
          difficulty: "medium",
          tags: ["fasihi", "methali", "mafumbo"],
          timeRecommended: 25
        },
        {
          id: "kisw-meth-f5",
          question: "Kitendawili: Nyumba yangu haina mlango. Ni nini?",
          answer: "Yai.\n\nYai lina ganda la nje ambalo halina mlango wa kuingilia au kutokea. Ili kuingia ndani, lazima uvunje ganda.",
          difficulty: "easy",
          tags: ["fasihi", "vitendawili", "mafumbo"],
          timeRecommended: 20
        },
        {
          id: "kisw-meth-f6",
          question: "Kitendawili: Nimekwenda safari nikakuta watu wamevaa nguo nyeupe. Ni nini?",
          answer: "Mahindi.\n\nMahindi yakiwa yamepevuka, yanakuwa na punje nyeupe zinazoonekana kama watu waliovaa nguo nyeupe.",
          difficulty: "medium",
          tags: ["fasihi", "vitendawili", "mafumbo"],
          timeRecommended: 25
        },
        {
          id: "kisw-meth-f7",
          question: "Kitendawili: Ninasafiri na nyumba yangu. Ni nini?",
          answer: "Kobe.\n\nKobe husafiri na gamba lake ambalo ni kama nyumba yake.",
          difficulty: "easy",
          tags: ["fasihi", "vitendawili", "mafumbo"],
          timeRecommended: 20
        },
        {
          id: "kisw-meth-f8",
          question: "Kamilisha methali: Mchelea mwana, _______",
          answer: "Mchelea mwana, kulia hulia yeye.\n\nMaana: Ukiogopa kumwadhibu mtoto anapokosea, hatimaye wewe mzazi ndiye utakayepata taabu.",
          difficulty: "medium",
          tags: ["fasihi", "methali", "mafumbo"],
          timeRecommended: 25
        },
        {
          id: "kisw-meth-f9",
          question: "Kitendawili: Mzee wangu ana ndevu nyeupe. Ni nini?",
          answer: "Muhindi.\n\nMuhindi una nywele nyeupe juu yake zinazofanana na ndevu za mzee.",
          difficulty: "medium",
          tags: ["fasihi", "vitendawili", "mafumbo"],
          timeRecommended: 25
        },
        {
          id: "kisw-meth-f10",
          question: "Kamilisha methali: Mstahimilivu, _______",
          answer: "Mstahimilivu, hula mbivu.\n\nMaana: Mtu anayevumilia hupata matunda ya subira yake. Uvumilivu huleta mafanikio.",
          difficulty: "medium",
          tags: ["fasihi", "methali", "mafumbo"],
          timeRecommended: 25
        }
      ],
      totalCards: 10,
      estimatedTime: 230,
      difficulty: "medium"
    },
    {
      id: "kisw-mashairi",
      title: "Mashairi ya Kiswahili",
      description: "Jifunze kuhusu mashairi ya Kiswahili na sifa zake.",
      subject: "Kiswahili",
      topic: "Fasihi",
      subtopic: "Mashairi",
      grade: "Grade 8",
      flashcards: [
        {
          id: "kisw-mash-f1",
          question: "Shairi la kimapokeo lina mishororo mingapi katika kila ubeti?",
          answer: "Shairi la kimapokeo lina mishororo sita katika kila ubeti.",
          difficulty: "medium",
          tags: ["fasihi", "mashairi", "muundo"],
          timeRecommended: 25
        },
        {
          id: "kisw-mash-f2",
          question: "Nini maana ya vina katika ushairi?",
          answer: "Vina ni sauti zinazofanana mwishoni mwa mishororo ya shairi. Vina huipa shairi muziki na mpangilio maalum.",
          difficulty: "medium",
          tags: ["fasihi", "mashairi", "vina"],
          timeRecommended: 30
        },
        {
          id: "kisw-mash-f3",
          question: "Mizani katika ushairi ni nini?",
          answer: "Mizani ni idadi ya silabi katika mshororo wa shairi. Shairi la kimapokeo huwa na mizani 8+8 (silabi 8 katika kipande cha kwanza na silabi 8 katika kipande cha pili).",
          difficulty: "medium",
          tags: ["fasihi", "mashairi", "mizani"],
          timeRecommended: 30
        },
        {
          id: "kisw-mash-f4",
          question: "Ni ipi kati ya zifuatazo SI aina ya shairi?",
          answer: "Tashbihi si aina ya shairi bali ni tamathali ya usemi inayotumika kufananisha vitu viwili kwa kutumia viunganishi kama 'kama', 'mithili ya', n.k. Tarbia, Tathlitha, na Takhmisa ni aina za mashairi.",
          difficulty: "hard",
          tags: ["fasihi", "mashairi", "aina"],
          timeRecommended: 35
        },
        {
          id: "kisw-mash-f5",
          question: "Ni nini maana ya kibwagizo katika shairi?",
          answer: "Kibwagizo ni mshororo au mishororo inayorudiwarudiwa mwishoni mwa kila ubeti wa shairi. Inasaidia kusisitiza ujumbe wa shairi.",
          difficulty: "medium",
          tags: ["fasihi", "mashairi", "kibwagizo"],
          timeRecommended: 25
        },
        {
          id: "kisw-mash-f6",
          question: "Taja aina tatu za mashairi kulingana na idadi ya mishororo katika ubeti.",
          answer: "1. Tathlitha - shairi lenye mishororo mitatu katika kila ubeti\n2. Tarbia - shairi lenye mishororo minne katika kila ubeti\n3. Takhmisa - shairi lenye mishororo mitano katika kila ubeti\n4. Tasita - shairi lenye mishororo sita katika kila ubeti",
          difficulty: "hard",
          tags: ["fasihi", "mashairi", "aina"],
          timeRecommended: 40
        },
        {
          id: "kisw-mash-f7",
          question: "Taja sifa tatu za shairi la kimapokeo.",
          answer: "Sifa za shairi la kimapokeo:\n1. Lina mishororo sita katika kila ubeti\n2. Lina vina vya kati na vya mwisho vinavyofanana\n3. Lina mizani (idadi sawa ya silabi katika kila mshororo, kawaida 8+8)\n4. Lina mpangilio maalum wa vipande (mishororo)\n5. Hutumia lugha ya mkato na mvuto",
          difficulty: "medium",
          tags: ["fasihi", "mashairi", "sifa"],
          timeRecommended: 35
        },
        {
          id: "kisw-mash-f8",
          question: "Nini tofauti kati ya shairi na wimbo?",
          answer: "Tofauti kati ya shairi na wimbo:\n\nShairi:\n- Huandikwa kwa kuzingatia kanuni za vina na mizani\n- Huandikwa kwanza kisha husomwa au kuimbwa\n- Huweza kuwa mrefu zaidi\n- Hutumia lugha ya mkato na mvuto\n\nWimbo:\n- Si lazima kuzingatia kanuni za vina na mizani\n- Huundwa kwa lengo la kuimbwa\n- Huwa na muziki na mdundo\n- Mara nyingi huwa na kiitikio",
          difficulty: "hard",
          tags: ["fasihi", "mashairi", "tofauti"],
          timeRecommended: 40
        },
        {
          id: "kisw-mash-f9",
          question: "Nini maana ya bahari ya shairi?",
          answer: "Bahari ya shairi ni aina ya shairi kulingana na mpangilio wa vina na mizani. Kuna bahari mbalimbali kama vile:\n\n1. Bahari ya Utenzi - shairi lenye vina vya mwisho tu\n2. Bahari ya Utendi - shairi lenye mizani 8 kwa kila mshororo\n3. Bahari ya Ukawafi - shairi lenye vina vya kati na vya mwisho\n4. Bahari ya Wimbo - shairi lenye mizani chache (4-6)",
          difficulty: "hard",
          tags: ["fasihi", "mashairi", "bahari"],
          timeRecommended: 45
        },
        {
          id: "kisw-mash-f10",
          question: "Taja aina mbili za mashairi ya kisasa.",
          answer: "Aina za mashairi ya kisasa:\n\n1. Mashairi huru - hayafuati kanuni za kimapokeo za vina na mizani\n2. Mashairi ya kimapokeo yaliyoboreshwa - yanafuata baadhi ya kanuni za kimapokeo lakini yana ubunifu zaidi\n3. Mashairi ya kinathari - yanaandikwa kama nathari (prose) lakini yana sifa za kishairi\n4. Mashairi pendwa - yanaandikwa kwa lugha rahisi na kueleweka",
          difficulty: "medium",
          tags: ["fasihi", "mashairi", "aina"],
          timeRecommended: 35
        }
      ],
      totalCards: 10,
      estimatedTime: 340,
      difficulty: "hard"
    }
  ]
};