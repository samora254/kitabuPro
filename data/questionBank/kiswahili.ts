import { QuestionBank } from './types';

export const kiswahiliQuestions: QuestionBank = {
  subject: "Kiswahili",
  grades: ["Grade 8"],
  topics: [
    { name: "Sarufi", subtopics: ["Ngeli", "Vitenzi", "Vivumishi"] },
    { name: "Fasihi", subtopics: ["Hadithi", "Mashairi", "Methali"] },
    { name: "Uandishi", subtopics: ["Insha", "Barua", "Muhtasari"] },
    { name: "Usomaji", subtopics: ["Ufahamu", "Ufupisho", "Maswali"] }
  ],
  questionSets: [
    {
      id: "kiswahili-sarufi-set-1",
      title: "Ngeli za Kiswahili",
      description: "Jaribu ujuzi wako kuhusu ngeli mbalimbali za Kiswahili.",
      subject: "Kiswahili",
      grade: "Grade 8",
      topic: "Sarufi",
      subtopic: "Ngeli",
      questions: [
        {
          id: "kisw-sar-q1",
          text: "Nomino 'mwalimu' iko katika ngeli gani?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Sarufi",
          subtopic: "Ngeli",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["A-WA", "KI-VI", "M-WA", "M-MI"],
          correctAnswer: 2,
          explanation: "Nomino 'mwalimu' iko katika ngeli ya M-WA kwani inaanza na 'M' na wingi wake ni 'walimu' unaanza na 'WA'."
        },
        {
          id: "kisw-sar-q2",
          text: "Ni sentensi ipi iliyo na vivumishi vya ngeli sahihi?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Sarufi",
          subtopic: "Ngeli",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Vitabu yangu vimepotea",
            "Kitabu changu kimepotea",
            "Vitabu changu vimepotea",
            "Kitabu vyangu kimepotea"
          ],
          correctAnswer: 1,
          explanation: "Kitabu (KI-VI) kinahitaji kivumishi 'changu' na kiambishi 'ki-' kwenye kitenzi. Sentensi sahihi ni 'Kitabu changu kimepotea'."
        },
        {
          id: "kisw-sar-q3",
          text: "Nomino 'mti' na 'mto' ziko katika ngeli gani?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Sarufi",
          subtopic: "Ngeli",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 25,
          options: ["A-WA", "KI-VI", "M-WA", "M-MI"],
          correctAnswer: 3,
          explanation: "Nomino 'mti' na 'mto' ziko katika ngeli ya M-MI kwani zinaanza na 'M' na wingi wake ni 'miti' na 'mito' unaanza na 'MI'."
        },
        {
          id: "kisw-sar-q4",
          text: "Chagua sentensi yenye upatanisho sahihi wa kisarufi.",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Sarufi",
          subtopic: "Ngeli",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Nyumba yetu ni kubwa",
            "Nyumba letu ni kubwa",
            "Nyumba zetu ni kubwa",
            "Nyumba wetu ni kubwa"
          ],
          correctAnswer: 0,
          explanation: "Nomino 'nyumba' iko katika ngeli ya N-N, hivyo kivumishi kinafaa kuwa 'yetu' na si 'letu', 'zetu' au 'wetu'."
        },
        {
          id: "kisw-sar-q5",
          text: "Ni sentensi ipi iliyo na upatanisho sahihi wa ngeli?",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "Sarufi",
          subtopic: "Ngeli",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 35,
          options: [
            "Wanafunzi wale wanasoma",
            "Wanafunzi yale wanasoma",
            "Wanafunzi zile wanasoma",
            "Wanafunzi kile wanasoma"
          ],
          correctAnswer: 0,
          explanation: "Nomino 'wanafunzi' iko katika ngeli ya M-WA (wingi), hivyo kivumishi kionyeshi kinafaa kuwa 'wale' na kiambishi kipatanishi kwenye kitenzi ni 'wa-'."
        }
      ],
      totalPoints: 45,
      estimatedTime: 140,
      difficulty: "medium"
    },
    {
      id: "kiswahili-fasihi-set-1",
      title: "Mashairi ya Kiswahili",
      description: "Jaribu ujuzi wako kuhusu mashairi ya Kiswahili.",
      subject: "Kiswahili",
      grade: "Grade 8",
      topic: "Fasihi",
      subtopic: "Mashairi",
      questions: [
        {
          id: "kisw-fas-q1",
          text: "Shairi la kimapokeo lina mishororo mingapi katika kila ubeti?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Fasihi",
          subtopic: "Mashairi",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: ["Minne", "Mitano", "Sita", "Minane"],
          correctAnswer: 2,
          explanation: "Shairi la kimapokeo lina mishororo sita katika kila ubeti."
        },
        {
          id: "kisw-fas-q2",
          text: "Nini maana ya vina katika ushairi?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Fasihi",
          subtopic: "Mashairi",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Idadi ya mishororo katika ubeti",
            "Sauti zinazofanana mwishoni mwa mishororo",
            "Idadi ya silabi katika mshororo",
            "Maana ya shairi"
          ],
          correctAnswer: 1,
          explanation: "Vina ni sauti zinazofanana mwishoni mwa mishororo ya shairi. Vina huipa shairi muziki na mpangilio maalum."
        },
        {
          id: "kisw-fas-q3",
          text: "Mizani katika ushairi ni nini?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Fasihi",
          subtopic: "Mashairi",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Idadi ya maneno katika mshororo",
            "Idadi ya silabi katika mshororo",
            "Idadi ya herufi katika mshororo",
            "Idadi ya mishororo katika ubeti"
          ],
          correctAnswer: 1,
          explanation: "Mizani ni idadi ya silabi katika mshororo wa shairi. Shairi la kimapokeo huwa na mizani 8+8 (silabi 8 katika kipande cha kwanza na silabi 8 katika kipande cha pili)."
        },
        {
          id: "kisw-fas-q4",
          text: "Ni ipi kati ya zifuatazo SI aina ya shairi?",
          type: "multiple-choice",
          difficulty: "hard",
          topic: "Fasihi",
          subtopic: "Mashairi",
          grade: "Grade 8",
          points: 15,
          timeEstimate: 35,
          options: ["Tarbia", "Tathlitha", "Takhmisa", "Tashbihi"],
          correctAnswer: 3,
          explanation: "Tashbihi si aina ya shairi bali ni tamathali ya usemi inayotumika kufananisha vitu viwili kwa kutumia viunganishi kama 'kama', 'mithili ya', n.k. Tarbia, Tathlitha, na Takhmisa ni aina za mashairi."
        },
        {
          id: "kisw-fas-q5",
          text: "Ni nini maana ya kibwagizo katika shairi?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Fasihi",
          subtopic: "Mashairi",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 25,
          options: [
            "Mshororo wa mwisho wa shairi",
            "Mshororo unaorudiwarudiwa katika kila ubeti",
            "Mshororo wa kwanza wa shairi",
            "Jina la shairi"
          ],
          correctAnswer: 1,
          explanation: "Kibwagizo ni mshororo au mishororo inayorudiwarudiwa mwishoni mwa kila ubeti wa shairi. Inasaidia kusisitiza ujumbe wa shairi."
        }
      ],
      totalPoints: 50,
      estimatedTime: 145,
      difficulty: "medium"
    },
    {
      id: "kiswahili-uandishi-set-1",
      title: "Uandishi wa Barua Rasmi",
      description: "Jaribu ujuzi wako kuhusu uandishi wa barua rasmi.",
      subject: "Kiswahili",
      grade: "Grade 8",
      topic: "Uandishi",
      subtopic: "Barua",
      questions: [
        {
          id: "kisw-uan-q1",
          text: "Ni sehemu ipi ambayo huandikwa juu kabisa katika barua rasmi?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Uandishi",
          subtopic: "Barua",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: ["Anwani ya mwandishi", "Anwani ya mpokeaji", "Tarehe", "Salamu"],
          correctAnswer: 0,
          explanation: "Katika barua rasmi, anwani ya mwandishi huandikwa juu kabisa upande wa kulia."
        },
        {
          id: "kisw-uan-q2",
          text: "Ni ipi kati ya salamu zifuatazo inayotumika katika barua rasmi?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Uandishi",
          subtopic: "Barua",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 20,
          options: [
            "Mpendwa Rafiki",
            "Ndugu Mwalimu",
            "Mheshimiwa Mkuu wa Shule",
            "Jambo Mzee"
          ],
          correctAnswer: 2,
          explanation: "Katika barua rasmi, salamu huonyesha heshima kwa mpokeaji. 'Mheshimiwa Mkuu wa Shule' ni salamu rasmi inayofaa."
        },
        {
          id: "kisw-uan-q3",
          text: "Ni sehemu ipi ambayo huandikwa baada ya mwili wa barua rasmi?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Uandishi",
          subtopic: "Barua",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 25,
          options: [
            "Kichwa cha barua",
            "Salamu",
            "Hitimisho",
            "Sahihi na jina la mwandishi"
          ],
          correctAnswer: 3,
          explanation: "Baada ya mwili wa barua rasmi, mwandishi huandika hitimisho fupi kisha sahihi yake na jina lake."
        },
        {
          id: "kisw-uan-q4",
          text: "Ni ipi kati ya vifuatavyo SI sifa ya barua rasmi?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Uandishi",
          subtopic: "Barua",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Ina anwani mbili",
            "Ina kichwa cha barua",
            "Ina lugha rasmi",
            "Ina picha za mapambo"
          ],
          correctAnswer: 3,
          explanation: "Barua rasmi haina picha za mapambo. Sifa za barua rasmi ni kuwa na anwani mbili, kichwa cha barua, lugha rasmi, na mpangilio maalum."
        },
        {
          id: "kisw-uan-q5",
          text: "Ni kwa nini kichwa cha barua huandikwa kwa herufi kubwa?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Uandishi",
          subtopic: "Barua",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 30,
          options: [
            "Ili kupunguza nafasi",
            "Ili kusisitiza mada ya barua",
            "Ili kuonyesha hasira",
            "Ili kufurahisha msomaji"
          ],
          correctAnswer: 1,
          explanation: "Kichwa cha barua huandikwa kwa herufi kubwa ili kusisitiza mada ya barua na kuvutia nadhari ya msomaji."
        }
      ],
      totalPoints: 40,
      estimatedTime: 125,
      difficulty: "medium"
    },
    {
      id: "kiswahili-usomaji-set-1",
      title: "Ufahamu wa Kifungu",
      description: "Jaribu ujuzi wako wa kusoma na kuelewa vifungu vya Kiswahili.",
      subject: "Kiswahili",
      grade: "Grade 8",
      topic: "Usomaji",
      subtopic: "Ufahamu",
      questions: [
        {
          id: "kisw-uso-q1",
          text: "Soma kifungu kifuatacho kisha ujibu maswali:\n\nMazingira ni jumla ya vitu vyote vinavyotuzunguka. Hivi ni pamoja na hali ya hewa, mimea, wanyama, maji, udongo na kadhalika. Mazingira huathiri maisha ya binadamu kwa njia nyingi. Hali ya hewa huathiri kilimo na uzalishaji wa chakula. Mimea hutoa hewa ya oksijeni ambayo binadamu huhitaji ili kupumua. Wanyama hutoa nyama, maziwa, ngozi na bidhaa nyingine muhimu. Maji ni muhimu kwa maisha ya kila kiumbe hai. Udongo ni muhimu kwa kilimo na ujenzi. Ni wajibu wa kila mtu kuhakikisha kuwa mazingira yanalindwa na kuhifadhiwa kwa manufaa ya vizazi vya sasa na vijavyo.\n\nKulingana na kifungu, mazingira ni nini?",
          type: "multiple-choice",
          difficulty: "easy",
          topic: "Usomaji",
          subtopic: "Ufahamu",
          grade: "Grade 8",
          points: 5,
          timeEstimate: 60,
          options: [
            "Mimea na wanyama pekee",
            "Hali ya hewa na maji pekee",
            "Jumla ya vitu vyote vinavyotuzunguka",
            "Udongo na kilimo pekee"
          ],
          correctAnswer: 2,
          explanation: "Kulingana na kifungu, mazingira ni jumla ya vitu vyote vinavyotuzunguka, ikiwa ni pamoja na hali ya hewa, mimea, wanyama, maji, udongo na kadhalika."
        },
        {
          id: "kisw-uso-q2",
          text: "Kulingana na kifungu, ni kwa nini mimea ni muhimu kwa binadamu?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Usomaji",
          subtopic: "Ufahamu",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 40,
          options: [
            "Hutoa chakula pekee",
            "Hutoa hewa ya oksijeni",
            "Hutoa maji",
            "Hutoa udongo"
          ],
          correctAnswer: 1,
          explanation: "Kulingana na kifungu, mimea hutoa hewa ya oksijeni ambayo binadamu huhitaji ili kupumua."
        },
        {
          id: "kisw-uso-q3",
          text: "Kulingana na kifungu, ni nani anayepaswa kulinda mazingira?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Usomaji",
          subtopic: "Ufahamu",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 40,
          options: [
            "Serikali pekee",
            "Wanasayansi pekee",
            "Wakulima pekee",
            "Kila mtu"
          ],
          correctAnswer: 3,
          explanation: "Kulingana na kifungu, ni wajibu wa kila mtu kuhakikisha kuwa mazingira yanalindwa na kuhifadhiwa."
        },
        {
          id: "kisw-uso-q4",
          text: "Kulingana na kifungu, mazingira yanalindwa kwa manufaa ya nani?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Usomaji",
          subtopic: "Ufahamu",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 40,
          options: [
            "Vizazi vya sasa pekee",
            "Vizazi vijavyo pekee",
            "Vizazi vya sasa na vijavyo",
            "Wanyama pekee"
          ],
          correctAnswer: 2,
          explanation: "Kulingana na kifungu, mazingira yanalindwa na kuhifadhiwa kwa manufaa ya vizazi vya sasa na vijavyo."
        },
        {
          id: "kisw-uso-q5",
          text: "Kulingana na kifungu, ni kwa nini hali ya hewa ni muhimu?",
          type: "multiple-choice",
          difficulty: "medium",
          topic: "Usomaji",
          subtopic: "Ufahamu",
          grade: "Grade 8",
          points: 10,
          timeEstimate: 40,
          options: [
            "Huathiri kilimo na uzalishaji wa chakula",
            "Hutoa hewa ya oksijeni",
            "Hutoa maji",
            "Hutoa udongo"
          ],
          correctAnswer: 0,
          explanation: "Kulingana na kifungu, hali ya hewa huathiri kilimo na uzalishaji wa chakula."
        }
      ],
      totalPoints: 45,
      estimatedTime: 220,
      difficulty: "medium"
    }
  ]
};