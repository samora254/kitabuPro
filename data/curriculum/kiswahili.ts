import { Curriculum } from '@/constants/curriculum';

export const kiswahili: Curriculum = {
  id: 'kiswahili-grade8',
  subject: 'Kiswahili',
  grade: 'Grade 8',
  title: 'Kiswahili Grade 8',
  description: 'Somo la Kiswahili litampa mwanafunzi wa Daraja la Awali la Shule za Upili umilisi katika shughuli za kila siku. Umilisi huu utajengea haiba na uwezo wake wa kuwasiliana na kuhusiana katika jamii, kitaifa na kimataifa.',
  units: [
    {
      id: 'usafi-wa-sehemu-za-umma',
      title: 'Usafi wa Sehemu za Umma',
      description: 'Mada hii inashughulikia usafi wa sehemu za umma kupitia stadi mbalimbali za lugha.',
      topics: [
        {
          id: 'kusikiliza-na-kujibu-mahojiano',
          title: 'Kusikiliza na Kujibu Mahojiano',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kusikiliza na kujibu mahojiano kwa kutumia lugha ya adabu.',
          keyTerms: [
            { term: 'Mahojiano', definition: 'Mazungumzo kati ya watu wawili au zaidi ambapo mmoja huuliza maswali na mwingine hujibu.' },
            { term: 'Lugha ya adabu', definition: 'Matumizi ya maneno na misemo inayoonyesha heshima kwa msikilizaji.' }
          ],
          learningObjectives: [
            {
              id: 'usafi-mahojiano-obj1',
              description: 'Kutambua vipengele vya kuzingatia katika kusikiliza mahojiano',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua vipengele vya kusikiliza mahojiano', 'Anaweza kueleza umuhimu wa vipengele hivyo']
            },
            {
              id: 'usafi-mahojiano-obj2',
              description: 'Kutambua vipengele vya kuzingatia katika kujibu mahojiano',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua vipengele vya kujibu mahojiano', 'Anaweza kueleza umuhimu wa vipengele hivyo']
            },
            {
              id: 'usafi-mahojiano-obj3',
              description: 'Kutumia vipengele vifaavyo katika kusikiliza na kujibu mahojiano ipasavyo',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutumia vipengele vya kusikiliza mahojiano', 'Anaweza kutumia vipengele vya kujibu mahojiano']
            }
          ],
          resources: [
            {
              id: 'usafi-mahojiano-res1',
              title: 'Mfano wa Mahojiano Kuhusu Usafi',
              type: 'audio',
              url: 'https://example.com/mahojiano-usafi',
              duration: 15,
              difficulty: 'beginner',
              learningStyles: ['auditory'],
              description: 'Rekodi ya sauti ya mahojiano kuhusu usafi wa mazingira ya umma.'
            },
            {
              id: 'usafi-mahojiano-res2',
              title: 'Vipengele vya Kusikiliza na Kujibu Mahojiano',
              type: 'document',
              url: 'https://example.com/vipengele-mahojiano',
              duration: 10,
              difficulty: 'beginner',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza vipengele muhimu vya kuzingatia katika kusikiliza na kujibu mahojiano.'
            }
          ],
          activities: [
            {
              id: 'usafi-mahojiano-act1',
              title: 'Igizo la Mahojiano',
              description: 'Igiza mahojiano kuhusu usafi wa mazingira ya umma kwa kuzingatia vipengele vya kusikiliza na kujibu mahojiano.',
              type: 'group',
              duration: 30,
              materials: ['Karatasi za maswali', 'Kalamu', 'Simu ya kurekodi (kwa hiari)'],
              steps: [
                'Tengeneza vikundi vya wanafunzi wawili',
                'Chagua mada ndogo kuhusu usafi wa mazingira ya umma',
                'Andaa maswali na majibu ya mahojiano',
                'Igiza mahojiano ukizingatia vipengele vya kusikiliza na kujibu',
                'Rekodi mahojiano kwa kutumia simu (kwa hiari)',
                'Shiriki mahojiano yako na darasa'
              ],
              learningObjectiveIds: ['usafi-mahojiano-obj1', 'usafi-mahojiano-obj2', 'usafi-mahojiano-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'usafi-mahojiano-assess1',
              title: 'Tathmini ya Mahojiano',
              description: 'Tathmini ya uwezo wako wa kutambua na kutumia vipengele vya kusikiliza na kujibu mahojiano.',
              type: 'quiz',
              questions: [
                {
                  id: 'usafi-mahojiano-q1',
                  text: 'Ni kipi kati ya vifuatavyo SIYE kipengele cha kuzingatia katika kusikiliza mahojiano?',
                  type: 'multiple-choice',
                  options: [
                    'Kusikiliza kwa makini',
                    'Kumtazama mzungumzaji ana kwa ana',
                    'Kumkata kauli mzungumzaji',
                    'Kutumia viziada lugha'
                  ],
                  correctAnswer: 2,
                  points: 2
                },
                {
                  id: 'usafi-mahojiano-q2',
                  text: 'Ni kipi kati ya vifuatavyo kipengele cha kuzingatia katika kujibu mahojiano?',
                  type: 'multiple-choice',
                  options: [
                    'Kutomhukumu mzungumzaji',
                    'Kutumia lugha ya adabu',
                    'Kuzungumza kwa ukakamavu',
                    'Zote zilizotajwa hapo juu'
                  ],
                  correctAnswer: 3,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 15,
              learningObjectiveIds: ['usafi-mahojiano-obj1', 'usafi-mahojiano-obj2', 'usafi-mahojiano-obj3']
            }
          ],
          estimatedDuration: 120
        },
        {
          id: 'ufahamu-wa-kifungu-cha-simulizi',
          title: 'Ufahamu wa Kifungu cha Simulizi',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kusoma kwa ufahamu kupitia vifungu vya simulizi kuhusu usafi wa sehemu za umma.',
          keyTerms: [
            { term: 'Ufahamu', definition: 'Kuelewa maana ya kifungu kilichosomwa.' },
            { term: 'Habari mahususi', definition: 'Taarifa maalum zinazojitokeza katika kifungu.' },
            { term: 'Utabiri', definition: 'Kutoa maoni kuhusu kinachotarajiwa kutokea kulingana na vidokezo vilivyopo.' }
          ],
          learningObjectives: [
            {
              id: 'ufahamu-simulizi-obj1',
              description: 'Kudondoa habari mahususi katika kifungu cha ufahamu',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua habari mahususi katika kifungu', 'Anaweza kueleza habari hizo kwa ufasaha']
            },
            {
              id: 'ufahamu-simulizi-obj2',
              description: 'Kupanga matukio yanavyofuatana katika kifungu cha ufahamu',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Anaweza kupanga matukio kwa mpangilio sahihi', 'Anaweza kueleza uhusiano kati ya matukio hayo']
            },
            {
              id: 'ufahamu-simulizi-obj3',
              description: 'Kufanya utabiri na ufasiri kutokana na kifungu cha ufahamu',
              bloomsLevel: 'evaluate',
              assessmentCriteria: ['Anaweza kutabiri matukio yanayoweza kufuata', 'Anaweza kufasiri maana ya matukio katika kifungu']
            }
          ],
          resources: [
            {
              id: 'ufahamu-simulizi-res1',
              title: 'Kifungu cha Simulizi: Usafi wa Mazingira',
              type: 'document',
              url: 'https://example.com/kifungu-usafi',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Kifungu cha simulizi kinachohusu usafi wa mazingira ya umma na umuhimu wake.'
            },
            {
              id: 'ufahamu-simulizi-res2',
              title: 'Mbinu za Kusoma kwa Ufahamu',
              type: 'video',
              url: 'https://example.com/mbinu-ufahamu',
              duration: 12,
              difficulty: 'beginner',
              learningStyles: ['visual', 'auditory'],
              description: 'Video inayoeleza mbinu mbalimbali za kusoma kwa ufahamu.',
              thumbnailUrl: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
          ],
          activities: [
            {
              id: 'ufahamu-simulizi-act1',
              title: 'Kusoma na Kuchambua Kifungu',
              description: 'Soma kifungu cha simulizi kuhusu usafi wa mazingira na ujibu maswali ya ufahamu.',
              type: 'individual',
              duration: 45,
              materials: ['Kifungu cha simulizi', 'Karatasi ya maswali', 'Kalamu', 'Kamusi'],
              steps: [
                'Soma kifungu cha simulizi kwa makini',
                'Tambua habari mahususi katika kifungu (nani, nini, wapi, lini)',
                'Panga matukio yanavyofuatana katika kifungu',
                'Fanya utabiri na ufasiri kutokana na kifungu',
                'Tambua msamiati mpya na utafute maana yake kwenye kamusi',
                'Jibu maswali ya ufahamu'
              ],
              learningObjectiveIds: ['ufahamu-simulizi-obj1', 'ufahamu-simulizi-obj2', 'ufahamu-simulizi-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'ufahamu-simulizi-assess1',
              title: 'Tathmini ya Ufahamu',
              description: 'Tathmini ya uwezo wako wa kuelewa na kuchambua kifungu cha simulizi.',
              type: 'quiz',
              questions: [
                {
                  id: 'ufahamu-simulizi-q1',
                  text: 'Ni habari gani mahususi zinazojitokeza katika kifungu?',
                  type: 'short-answer',
                  correctAnswer: 'Habari kuhusu usafi wa mazingira, wahusika, mahali na wakati wa matukio',
                  points: 3
                },
                {
                  id: 'ufahamu-simulizi-q2',
                  text: 'Panga matukio yafuatayo kulingana na yanavyotokea katika kifungu:',
                  type: 'short-answer',
                  correctAnswer: 'Mpangilio sahihi wa matukio',
                  points: 3
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 30,
              learningObjectiveIds: ['ufahamu-simulizi-obj1', 'ufahamu-simulizi-obj2', 'ufahamu-simulizi-obj3']
            }
          ],
          estimatedDuration: 120
        },
        {
          id: 'viakifishi-alama-ya-hisi-na-ritifaa',
          title: 'Viakifishi: Alama ya Hisi na Ritifaa',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kuandika kwa kuzingatia matumizi sahihi ya alama ya hisi na ritifaa.',
          keyTerms: [
            { term: 'Alama ya hisi', definition: 'Alama inayotumika kuonyesha hisia kama vile mshangao, furaha, hasira, n.k. (!)' },
            { term: 'Ritifaa', definition: 'Alama inayotumika kuonyesha sauti ya ng\'ombe au ng\'oa (`)' },
            { term: 'Viakifishi', definition: 'Alama zinazotumika katika maandishi kuonyesha mapumziko, mwisho wa sentensi, n.k.' }
          ],
          learningObjectives: [
            {
              id: 'viakifishi-obj1',
              description: 'Kutambua matumizi ya alama ya hisi na ritifaa katika matini',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua alama ya hisi katika matini', 'Anaweza kutambua alama ya ritifaa katika matini']
            },
            {
              id: 'viakifishi-obj2',
              description: 'Kutumia alama ya hisi na ritifaa ipasavyo katika matini',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutumia alama ya hisi ipasavyo', 'Anaweza kutumia alama ya ritifaa ipasavyo']
            }
          ],
          resources: [
            {
              id: 'viakifishi-res1',
              title: 'Matumizi ya Alama ya Hisi',
              type: 'article',
              url: 'https://example.com/alama-ya-hisi',
              duration: 10,
              difficulty: 'beginner',
              learningStyles: ['reading'],
              description: 'Makala inayoeleza matumizi sahihi ya alama ya hisi katika maandishi.'
            },
            {
              id: 'viakifishi-res2',
              title: 'Matumizi ya Alama ya Ritifaa',
              type: 'video',
              url: 'https://example.com/alama-ya-ritifaa',
              duration: 8,
              difficulty: 'beginner',
              learningStyles: ['visual', 'auditory'],
              description: 'Video inayoonyesha matumizi sahihi ya alama ya ritifaa katika maandishi.',
              thumbnailUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
          ],
          activities: [
            {
              id: 'viakifishi-act1',
              title: 'Kutambua na Kutumia Alama ya Hisi na Ritifaa',
              description: 'Tambua na tumia alama ya hisi na ritifaa katika sentensi na vifungu vya maneno.',
              type: 'individual',
              duration: 30,
              materials: ['Karatasi', 'Kalamu', 'Kifungu chenye alama ya hisi na ritifaa'],
              steps: [
                'Soma kifungu kilichopeanwa',
                'Tambua alama ya hisi na ritifaa katika kifungu',
                'Andika sentensi zako mwenyewe ukitumia alama ya hisi na ritifaa',
                'Badilishana kazi na mwenzako na mkosoane',
                'Sahihisha kazi yako kulingana na maoni ya mwenzako'
              ],
              learningObjectiveIds: ['viakifishi-obj1', 'viakifishi-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'viakifishi-assess1',
              title: 'Tathmini ya Matumizi ya Alama ya Hisi na Ritifaa',
              description: 'Tathmini ya uwezo wako wa kutambua na kutumia alama ya hisi na ritifaa.',
              type: 'quiz',
              questions: [
                {
                  id: 'viakifishi-q1',
                  text: 'Ni sentensi ipi iliyotumia alama ya hisi ipasavyo?',
                  type: 'multiple-choice',
                  options: [
                    'Jamani, msaada!',
                    'Jamani msaada.',
                    'Jamani msaada!',
                    'Jamani! msaada.'
                  ],
                  correctAnswer: 2,
                  points: 2
                },
                {
                  id: 'viakifishi-q2',
                  text: 'Ni neno lipi limetumia alama ya ritifaa ipasavyo?',
                  type: 'multiple-choice',
                  options: [
                    'ngombe',
                    'ng\'ombe',
                    'ngom\'be',
                    'n\'gombe'
                  ],
                  correctAnswer: 1,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['viakifishi-obj1', 'viakifishi-obj2']
            }
          ],
          estimatedDuration: 120
        },
        {
          id: 'viwakilishi-nafsi-vionyeshi-idadi',
          title: 'Viwakilishi: vya nafsi, vionyeshi na vya idadi',
          description: 'Mada hii ndogo inalenga kukuza stadi ya sarufi kupitia matumizi sahihi ya viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi.',
          keyTerms: [
            { term: 'Viwakilishi vya nafsi', definition: 'Maneno yanayosimama badala ya majina ya watu, k.m. mimi, wewe, yeye, sisi, nyinyi, wao.' },
            { term: 'Viwakilishi vionyeshi/viashiria', definition: 'Maneno yanayotumika kuonyesha kitu, k.m. huyu, huyo, yule, hiki, hicho, kile.' },
            { term: 'Viwakilishi vya idadi', definition: 'Maneno yanayoonyesha idadi, k.m. mmoja, wawili, watatu, wengi, wachache.' }
          ],
          learningObjectives: [
            {
              id: 'viwakilishi-obj1',
              description: 'Kutambua viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika matini',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua viwakilishi vya nafsi', 'Anaweza kutambua viwakilishi vionyeshi/viashiria', 'Anaweza kutambua viwakilishi vya idadi']
            },
            {
              id: 'viwakilishi-obj2',
              description: 'Kutumia ipasavyo viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika matini',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutumia viwakilishi vya nafsi ipasavyo', 'Anaweza kutumia viwakilishi vionyeshi/viashiria ipasavyo', 'Anaweza kutumia viwakilishi vya idadi ipasavyo']
            }
          ],
          resources: [
            {
              id: 'viwakilishi-res1',
              title: 'Aina za Viwakilishi',
              type: 'document',
              url: 'https://example.com/aina-za-viwakilishi',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza aina mbalimbali za viwakilishi na matumizi yake.'
            },
            {
              id: 'viwakilishi-res2',
              title: 'Matumizi ya Viwakilishi',
              type: 'interactive',
              url: 'https://example.com/matumizi-viwakilishi',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['visual', 'kinesthetic'],
              description: 'Zoezi la kiinteraktivi la kutambua na kutumia viwakilishi mbalimbali.'
            }
          ],
          activities: [
            {
              id: 'viwakilishi-act1',
              title: 'Kutambua na Kutumia Viwakilishi',
              description: 'Tambua na tumia viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika sentensi na vifungu.',
              type: 'group',
              duration: 45,
              materials: ['Karatasi', 'Kalamu', 'Chati ya viwakilishi'],
              steps: [
                'Chagua viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi kutoka kwenye kapu maneno',
                'Tambua viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi katika kifungu kilichopeanwa',
                'Tunga sentensi ukitumia viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi',
                'Jaza mapengo katika sentensi kwa kutumia viwakilishi vifaavyo',
                'Badilishana kazi na mwenzako na mkosoane'
              ],
              learningObjectiveIds: ['viwakilishi-obj1', 'viwakilishi-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'viwakilishi-assess1',
              title: 'Tathmini ya Viwakilishi',
              description: 'Tathmini ya uwezo wako wa kutambua na kutumia viwakilishi vya nafsi, vionyeshi/viashiria na vya idadi.',
              type: 'quiz',
              questions: [
                {
                  id: 'viwakilishi-q1',
                  text: 'Ni kipi kati ya vifuatavyo kiwakilishi cha nafsi?',
                  type: 'multiple-choice',
                  options: [
                    'Huyu',
                    'Wawili',
                    'Sisi',
                    'Hiki'
                  ],
                  correctAnswer: 2,
                  points: 2
                },
                {
                  id: 'viwakilishi-q2',
                  text: 'Ni kipi kati ya vifuatavyo kiwakilishi kionyeshi?',
                  type: 'multiple-choice',
                  options: [
                    'Wewe',
                    'Hiki',
                    'Watatu',
                    'Wao'
                  ],
                  correctAnswer: 1,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['viwakilishi-obj1', 'viwakilishi-obj2']
            }
          ],
          estimatedDuration: 120
        }
      ],
      estimatedDuration: 480
    },
    {
      id: 'matumizi-yafaayo-ya-dawa',
      title: 'Matumizi Yafaayo ya Dawa',
      description: 'Mada hii inashughulikia matumizi yafaayo ya dawa kupitia stadi mbalimbali za lugha.',
      topics: [
        {
          id: 'kusikiliza-kwa-kina-sauti',
          title: 'Kusikiliza kwa Kina Sauti: /g/ na /gh/',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kusikiliza na kutamka sauti /g/ na /gh/ ipasavyo.',
          keyTerms: [
            { term: 'Sauti /g/', definition: 'Sauti ya kizuiwa cha kaakaa laini, kama katika neno "gari".' },
            { term: 'Sauti /gh/', definition: 'Sauti ya kikwamizo cha kaakaa laini, kama katika neno "ghala".' },
            { term: 'Matamshi', definition: 'Jinsi ya kutoa sauti za maneno kwa kutumia viungo vya sauti.' }
          ],
          learningObjectives: [
            {
              id: 'sauti-g-gh-obj1',
              description: 'Kutambua sauti /g/ na /gh/ katika silabi na maneno',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua sauti /g/ katika maneno', 'Anaweza kutambua sauti /gh/ katika maneno']
            },
            {
              id: 'sauti-g-gh-obj2',
              description: 'Kutamka sauti /g/ na /gh/ ipasavyo katika silabi na maneno',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutamka sauti /g/ ipasavyo', 'Anaweza kutamka sauti /gh/ ipasavyo']
            },
            {
              id: 'sauti-g-gh-obj3',
              description: 'Kutumia maneno yenye sauti /g/ na /gh/ ipasavyo katika matini ili kuyatofautisha kimatamshi',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutofautisha maneno yenye sauti /g/ na /gh/ kimatamshi', 'Anaweza kutumia maneno hayo katika sentensi']
            }
          ],
          resources: [
            {
              id: 'sauti-g-gh-res1',
              title: 'Matamshi ya Sauti /g/ na /gh/',
              type: 'audio',
              url: 'https://example.com/matamshi-g-gh',
              duration: 10,
              difficulty: 'beginner',
              learningStyles: ['auditory'],
              description: 'Rekodi ya sauti inayoonyesha matamshi sahihi ya sauti /g/ na /gh/ katika maneno mbalimbali.'
            },
            {
              id: 'sauti-g-gh-res2',
              title: 'Vitanzandimi vya Sauti /g/ na /gh/',
              type: 'document',
              url: 'https://example.com/vitanzandimi-g-gh',
              duration: 8,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Orodha ya vitanzandimi vinavyotumia sauti /g/ na /gh/ kwa wingi.'
            }
          ],
          activities: [
            {
              id: 'sauti-g-gh-act1',
              title: 'Kutambua na Kutamka Sauti /g/ na /gh/',
              description: 'Tambua na tamka sauti /g/ na /gh/ katika maneno mbalimbali.',
              type: 'group',
              duration: 30,
              materials: ['Orodha ya maneno yenye sauti /g/ na /gh/', 'Kifaa cha kurekodi sauti'],
              steps: [
                'Sikiliza maneno yenye sauti /g/ na /gh/ yakitamkwa na mwalimu au kutoka kwenye kifaa cha kidijitali',
                'Tambua sauti /g/ na /gh/ katika maneno uliyosikia',
                'Tamka maneno hayo ukizingatia matamshi sahihi ya sauti /g/ na /gh/',
                'Rekodi matamshi yako kwa kutumia kifaa cha kurekodi sauti',
                'Sikiliza rekodi yako na ulinganishe na matamshi sahihi'
              ],
              learningObjectiveIds: ['sauti-g-gh-obj1', 'sauti-g-gh-obj2', 'sauti-g-gh-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'sauti-g-gh-assess1',
              title: 'Tathmini ya Matamshi ya Sauti /g/ na /gh/',
              description: 'Tathmini ya uwezo wako wa kutambua na kutamka sauti /g/ na /gh/ ipasavyo.',
              type: 'quiz',
              questions: [
                {
                  id: 'sauti-g-gh-q1',
                  text: 'Ni neno lipi lenye sauti /g/?',
                  type: 'multiple-choice',
                  options: [
                    'Ghala',
                    'Gari',
                    'Gharama',
                    'Ghafla'
                  ],
                  correctAnswer: 1,
                  points: 2
                },
                {
                  id: 'sauti-g-gh-q2',
                  text: 'Ni neno lipi lenye sauti /gh/?',
                  type: 'multiple-choice',
                  options: [
                    'Giza',
                    'Goti',
                    'Ghuba',
                    'Ganda'
                  ],
                  correctAnswer: 2,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 15,
              learningObjectiveIds: ['sauti-g-gh-obj1', 'sauti-g-gh-obj2', 'sauti-g-gh-obj3']
            }
          ],
          estimatedDuration: 120
        },
        {
          id: 'kusoma-kwa-mapana',
          title: 'Kusoma kwa Mapana: Matini ya Kujichagulia',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kusoma kwa mapana kupitia matini za kujichagulia.',
          keyTerms: [
            { term: 'Kusoma kwa mapana', definition: 'Kusoma matini nyingi na za aina mbalimbali ili kupanua maarifa na msamiati.' },
            { term: 'Matini ya kujichagulia', definition: 'Matini ambayo msomaji huchagua mwenyewe kulingana na mapendeleo yake.' },
            { term: 'Msamiati', definition: 'Maneno yanayotumika katika lugha.' }
          ],
          learningObjectives: [
            {
              id: 'kusoma-mapana-obj1',
              description: 'Kutambua msamiati uliotumiwa katika matini ya kujichagulia',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua msamiati mpya katika matini', 'Anaweza kueleza maana ya msamiati huo']
            },
            {
              id: 'kusoma-mapana-obj2',
              description: 'Kutumia ipasavyo msamiati unaotokana na matini aliyosoma',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutumia msamiati mpya katika sentensi zake mwenyewe', 'Anaweza kutumia msamiati huo katika muktadha sahihi']
            },
            {
              id: 'kusoma-mapana-obj3',
              description: 'Kueleza ujumbe wa matini aliyosoma',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kueleza ujumbe mkuu wa matini', 'Anaweza kueleza ujumbe mdogo wa matini']
            }
          ],
          resources: [
            {
              id: 'kusoma-mapana-res1',
              title: 'Orodha ya Vitabu vya Kusoma',
              type: 'document',
              url: 'https://example.com/orodha-vitabu',
              duration: 10,
              difficulty: 'beginner',
              learningStyles: ['reading'],
              description: 'Orodha ya vitabu vinavyofaa kusomwa na wanafunzi wa Gredi ya 8.'
            },
            {
              id: 'kusoma-mapana-res2',
              title: 'Mbinu za Kusoma kwa Ufanisi',
              type: 'video',
              url: 'https://example.com/mbinu-kusoma',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['visual', 'auditory'],
              description: 'Video inayoeleza mbinu mbalimbali za kusoma kwa ufanisi.',
              thumbnailUrl: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
          ],
          activities: [
            {
              id: 'kusoma-mapana-act1',
              title: 'Kusoma na Kuchambua Matini',
              description: 'Soma matini ya kujichagulia na uchambue msamiati na ujumbe wake.',
              type: 'individual',
              duration: 60,
              materials: ['Vitabu mbalimbali', 'Kamusi', 'Daftari', 'Kalamu'],
              steps: [
                'Chagua matini inayokuvutia',
                'Soma matini hiyo kwa makini',
                'Tambua msamiati mpya katika matini',
                'Tafuta maana za maneno hayo kwenye kamusi',
                'Tunga sentensi zako mwenyewe ukitumia msamiati huo',
                'Andika muhtasari wa matini uliyosoma',
                'Eleza ujumbe wa matini hiyo'
              ],
              learningObjectiveIds: ['kusoma-mapana-obj1', 'kusoma-mapana-obj2', 'kusoma-mapana-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'kusoma-mapana-assess1',
              title: 'Tathmini ya Kusoma kwa Mapana',
              description: 'Tathmini ya uwezo wako wa kusoma, kuelewa na kutumia msamiati kutoka kwenye matini ya kujichagulia.',
              type: 'project',
              rubric: [
                {
                  criteria: 'Utambuzi wa msamiati',
                  levels: [
                    { level: 'Excellent', description: 'Anatambua msamiati mpya wote katika matini kwa usahihi', points: 5 },
                    { level: 'Good', description: 'Anatambua msamiati mpya mwingi katika matini', points: 4 },
                    { level: 'Satisfactory', description: 'Anatambua baadhi ya msamiati mpya katika matini', points: 3 },
                    { level: 'Needs improvement', description: 'Anatambua msamiati mpya mchache sana katika matini', points: 1 }
                  ]
                },
                {
                  criteria: 'Matumizi ya msamiati',
                  levels: [
                    { level: 'Excellent', description: 'Anatumia msamiati mpya kwa usahihi katika sentensi zake', points: 5 },
                    { level: 'Good', description: 'Anatumia msamiati mpya kwa usahihi katika sentensi nyingi', points: 4 },
                    { level: 'Satisfactory', description: 'Anatumia baadhi ya msamiati mpya kwa usahihi', points: 3 },
                    { level: 'Needs improvement', description: 'Ana ugumu kutumia msamiati mpya kwa usahihi', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 0, // Ongoing assessment
              learningObjectiveIds: ['kusoma-mapana-obj1', 'kusoma-mapana-obj2', 'kusoma-mapana-obj3']
            }
          ],
          estimatedDuration: 180
        },
        {
          id: 'barua-ya-kirafiki',
          title: 'Barua ya Kirafiki ya Kutoa Shukrani',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kuandika barua ya kirafiki ya kutoa shukrani.',
          keyTerms: [
            { term: 'Barua ya kirafiki', definition: 'Barua inayoandikwa kwa mtu unayemfahamu vizuri kama rafiki au jamaa.' },
            { term: 'Anwani', definition: 'Sehemu ya barua inayoonyesha mahali mwandishi anapopatikana.' },
            { term: 'Mwili wa barua', definition: 'Sehemu kuu ya barua inayobeba ujumbe.' }
          ],
          learningObjectives: [
            {
              id: 'barua-kirafiki-obj1',
              description: 'Kueleza umuhimu wa barua ya kirafiki ya kutoa shukrani',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kueleza umuhimu wa barua ya kirafiki ya kutoa shukrani', 'Anaweza kutoa mifano ya hali zinazostahili kutoa shukrani']
            },
            {
              id: 'barua-kirafiki-obj2',
              description: 'Kutambua vipengele vya kimuundo vya barua ya kirafiki ya kutoa shukrani',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua anwani ya mwandishi', 'Anaweza kutambua tarehe', 'Anaweza kutambua mwanzo, mwili na mwisho wa barua']
            },
            {
              id: 'barua-kirafiki-obj3',
              description: 'Kuandika barua ya kirafiki ya kutoa shukrani kwa kuzingatia ujumbe, lugha na muundo ipasavyo',
              bloomsLevel: 'create',
              assessmentCriteria: ['Anaweza kuandika barua yenye ujumbe wa kutoa shukrani', 'Anaweza kutumia lugha ifaayo', 'Anaweza kuzingatia muundo sahihi wa barua']
            }
          ],
          resources: [
            {
              id: 'barua-kirafiki-res1',
              title: 'Mfano wa Barua ya Kirafiki ya Kutoa Shukrani',
              type: 'document',
              url: 'https://example.com/mfano-barua-shukrani',
              duration: 10,
              difficulty: 'beginner',
              learningStyles: ['reading'],
              description: 'Mfano wa barua ya kirafiki ya kutoa shukrani ukionyesha vipengele vyake muhimu.'
            },
            {
              id: 'barua-kirafiki-res2',
              title: 'Jinsi ya Kuandika Barua ya Kirafiki',
              type: 'video',
              url: 'https://example.com/jinsi-barua-kirafiki',
              duration: 15,
              difficulty: 'beginner',
              learningStyles: ['visual', 'auditory'],
              description: 'Video inayoonyesha jinsi ya kuandika barua ya kirafiki ya kutoa shukrani.',
              thumbnailUrl: 'https://images.pexels.com/photos/6238118/pexels-photo-6238118.jpeg?auto=compress&cs=tinysrgb&w=400'
            }
          ],
          activities: [
            {
              id: 'barua-kirafiki-act1',
              title: 'Kuandika Barua ya Kirafiki ya Kutoa Shukrani',
              description: 'Andika barua ya kirafiki ya kutoa shukrani kwa rafiki au jamaa.',
              type: 'individual',
              duration: 45,
              materials: ['Karatasi', 'Kalamu', 'Mfano wa barua ya kirafiki'],
              steps: [
                'Soma mfano wa barua ya kirafiki ya kutoa shukrani',
                'Tambua vipengele vya kimuundo vya barua hiyo',
                'Chagua mtu unayetaka kumshukuru',
                'Andika barua ya kirafiki ya kumshukuru mtu huyo',
                'Hakikisha umezingatia muundo sahihi wa barua',
                'Hakikisha umetumia lugha ifaayo',
                'Badilishana barua na mwenzako na mkosoane'
              ],
              learningObjectiveIds: ['barua-kirafiki-obj1', 'barua-kirafiki-obj2', 'barua-kirafiki-obj3'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'barua-kirafiki-assess1',
              title: 'Tathmini ya Barua ya Kirafiki ya Kutoa Shukrani',
              description: 'Tathmini ya uwezo wako wa kuandika barua ya kirafiki ya kutoa shukrani.',
              type: 'essay',
              rubric: [
                {
                  criteria: 'Muundo wa barua',
                  levels: [
                    { level: 'Excellent', description: 'Barua ina vipengele vyote vya kimuundo vilivyopangwa ipasavyo', points: 5 },
                    { level: 'Good', description: 'Barua ina vipengele vingi vya kimuundo vilivyopangwa ipasavyo', points: 4 },
                    { level: 'Satisfactory', description: 'Barua ina baadhi ya vipengele vya kimuundo', points: 3 },
                    { level: 'Needs improvement', description: 'Barua haina vipengele vingi vya kimuundo', points: 1 }
                  ]
                },
                {
                  criteria: 'Ujumbe wa barua',
                  levels: [
                    { level: 'Excellent', description: 'Ujumbe wa kutoa shukrani umeelezwa kwa ufasaha na kina', points: 5 },
                    { level: 'Good', description: 'Ujumbe wa kutoa shukrani umeelezwa kwa ufasaha', points: 4 },
                    { level: 'Satisfactory', description: 'Ujumbe wa kutoa shukrani umeelezwa kwa kiasi', points: 3 },
                    { level: 'Needs improvement', description: 'Ujumbe wa kutoa shukrani haujaelezwa vizuri', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 45,
              learningObjectiveIds: ['barua-kirafiki-obj1', 'barua-kirafiki-obj2', 'barua-kirafiki-obj3']
            }
          ],
          estimatedDuration: 120
        },
        {
          id: 'viwakilishi-sifa-pekee-viulizi',
          title: 'Viwakilishi vya Sifa, Pekee na Viulizi',
          description: 'Mada hii ndogo inalenga kukuza stadi ya sarufi kupitia matumizi sahihi ya viwakilishi vya sifa, pekee na viulizi.',
          keyTerms: [
            { term: 'Viwakilishi vya sifa', definition: 'Maneno yanayosimama badala ya nomino na kuonyesha sifa, k.m. kizuri, kidogo, chembamba.' },
            { term: 'Viwakilishi vya pekee', definition: 'Maneno yanayosimama badala ya nomino na kuonyesha upekee, k.m. mwenyewe, chenyewe, yenyewe.' },
            { term: 'Viwakilishi viulizi', definition: 'Maneno yanayosimama badala ya nomino na kuuliza maswali, k.m. nani, nini, gani, kipi, yupi.' }
          ],
          learningObjectives: [
            {
              id: 'viwakilishi-sifa-obj1',
              description: 'Kutambua viwakilishi vya sifa, vya pekee na viulizi katika matini',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua viwakilishi vya sifa', 'Anaweza kutambua viwakilishi vya pekee', 'Anaweza kutambua viwakilishi viulizi']
            },
            {
              id: 'viwakilishi-sifa-obj2',
              description: 'Kutumia viwakilishi vya sifa, vya pekee na viulizi ifaavyo katika matini',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutumia viwakilishi vya sifa ipasavyo', 'Anaweza kutumia viwakilishi vya pekee ipasavyo', 'Anaweza kutumia viwakilishi viulizi ipasavyo']
            }
          ],
          resources: [
            {
              id: 'viwakilishi-sifa-res1',
              title: 'Viwakilishi vya Sifa, Pekee na Viulizi',
              type: 'document',
              url: 'https://example.com/viwakilishi-sifa-pekee-viulizi',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza viwakilishi vya sifa, pekee na viulizi na matumizi yake.'
            },
            {
              id: 'viwakilishi-sifa-res2',
              title: 'Matumizi ya Viwakilishi vya Sifa, Pekee na Viulizi',
              type: 'interactive',
              url: 'https://example.com/matumizi-viwakilishi-sifa',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['visual', 'kinesthetic'],
              description: 'Zoezi la kiinteraktivi la kutambua na kutumia viwakilishi vya sifa, pekee na viulizi.'
            }
          ],
          activities: [
            {
              id: 'viwakilishi-sifa-act1',
              title: 'Kutambua na Kutumia Viwakilishi vya Sifa, Pekee na Viulizi',
              description: 'Tambua na tumia viwakilishi vya sifa, pekee na viulizi katika sentensi na vifungu.',
              type: 'group',
              duration: 45,
              materials: ['Karatasi', 'Kalamu', 'Chati ya viwakilishi'],
              steps: [
                'Chagua viwakilishi vya sifa, pekee na viulizi kutoka kwenye kapu maneno',
                'Tambua viwakilishi vya sifa, pekee na viulizi katika kifungu kilichopeanwa',
                'Tunga sentensi ukitumia viwakilishi vya sifa, pekee na viulizi',
                'Jaza mapengo katika sentensi kwa kutumia viwakilishi vifaavyo',
                'Badilishana kazi na mwenzako na mkosoane'
              ],
              learningObjectiveIds: ['viwakilishi-sifa-obj1', 'viwakilishi-sifa-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'viwakilishi-sifa-assess1',
              title: 'Tathmini ya Viwakilishi vya Sifa, Pekee na Viulizi',
              description: 'Tathmini ya uwezo wako wa kutambua na kutumia viwakilishi vya sifa, pekee na viulizi.',
              type: 'quiz',
              questions: [
                {
                  id: 'viwakilishi-sifa-q1',
                  text: 'Ni kipi kati ya vifuatavyo kiwakilishi cha sifa?',
                  type: 'multiple-choice',
                  options: [
                    'Mwenyewe',
                    'Kizuri',
                    'Gani',
                    'Wewe'
                  ],
                  correctAnswer: 1,
                  points: 2
                },
                {
                  id: 'viwakilishi-sifa-q2',
                  text: 'Ni kipi kati ya vifuatavyo kiwakilishi cha pekee?',
                  type: 'multiple-choice',
                  options: [
                    'Chenyewe',
                    'Kidogo',
                    'Yupi',
                    'Sisi'
                  ],
                  correctAnswer: 0,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['viwakilishi-sifa-obj1', 'viwakilishi-sifa-obj2']
            }
          ],
          estimatedDuration: 120
        }
      ],
      estimatedDuration: 480
    },
    {
      id: 'dhiki-zinazokumba-wanyama',
      title: 'Dhiki Zinazokumba Wanyama',
      description: 'Mada hii inashughulikia dhiki zinazokumba wanyama kupitia stadi mbalimbali za lugha.',
      topics: [
        {
          id: 'hadithi-mighani',
          title: 'Hadithi: Mighani',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kusikiliza na kuzungumza kupitia mighani.',
          keyTerms: [
            { term: 'Mighani', definition: 'Hadithi za kisimulizi zinazohusisha matukio ya kihistoria na mashujaa.' },
            { term: 'Uwasilishaji', definition: 'Jinsi ya kuwasilisha hadithi kwa hadhira.' },
            { term: 'Ujumbe', definition: 'Mafunzo yanayopatikana katika hadithi.' }
          ],
          learningObjectives: [
            {
              id: 'mighani-obj1',
              description: 'Kueleza maana ya mighani ili kuibainisha',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kueleza maana ya mighani', 'Anaweza kutofautisha mighani na aina nyingine za hadithi']
            },
            {
              id: 'mighani-obj2',
              description: 'Kueleza sifa za mighani ili kuipambanua',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kueleza sifa za mighani', 'Anaweza kutoa mifano ya sifa hizo']
            },
            {
              id: 'mighani-obj3',
              description: 'Kujadili vipengele vya kuzingatia katika uwasilishaji wa mighani',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Anaweza kueleza vipengele vya uwasilishaji', 'Anaweza kueleza umuhimu wa vipengele hivyo']
            },
            {
              id: 'mighani-obj4',
              description: 'Kusimulia mighani kwa kuzingatia vipengele vifaayo vya uwasilishaji wa mighani',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kusimulia mighani kwa ufasaha', 'Anaweza kuzingatia vipengele vya uwasilishaji']
            }
          ],
          resources: [
            {
              id: 'mighani-res1',
              title: 'Mfano wa Mighani',
              type: 'audio',
              url: 'https://example.com/mfano-mighani',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['auditory'],
              description: 'Rekodi ya sauti ya mighani ikisimuliwa na msimulizi mzuri.'
            },
            {
              id: 'mighani-res2',
              title: 'Vipengele vya Uwasilishaji wa Mighani',
              type: 'document',
              url: 'https://example.com/vipengele-mighani',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza vipengele muhimu vya kuzingatia katika uwasilishaji wa mighani.'
            }
          ],
          activities: [
            {
              id: 'mighani-act1',
              title: 'Kusimulia Mighani',
              description: 'Simulia mighani ukizingatia vipengele vya uwasilishaji.',
              type: 'group',
              duration: 60,
              materials: ['Mifano ya mighani', 'Kifaa cha kurekodi sauti'],
              steps: [
                'Soma mifano ya mighani',
                'Tambua sifa za mighani katika mifano hiyo',
                'Chagua mighani moja unayopenda',
                'Jifunze kusimulia mighani hiyo ukizingatia vipengele vya uwasilishaji',
                'Simulia mighani hiyo mbele ya kikundi chako',
                'Rekodi usimuliaji wako kwa kutumia kifaa cha kurekodi sauti',
                'Sikiliza rekodi yako na utathmini usimuliaji wako'
              ],
              learningObjectiveIds: ['mighani-obj1', 'mighani-obj2', 'mighani-obj3', 'mighani-obj4'],
              difficulty: 'advanced'
            }
          ],
          assessments: [
            {
              id: 'mighani-assess1',
              title: 'Tathmini ya Mighani',
              description: 'Tathmini ya uwezo wako wa kueleza maana na sifa za mighani, kujadili vipengele vya uwasilishaji, na kusimulia mighani.',
              type: 'presentation',
              rubric: [
                {
                  criteria: 'Maana na sifa za mighani',
                  levels: [
                    { level: 'Excellent', description: 'Anaeleza maana na sifa za mighani kwa ufasaha na kina', points: 5 },
                    { level: 'Good', description: 'Anaeleza maana na sifa za mighani kwa ufasaha', points: 4 },
                    { level: 'Satisfactory', description: 'Anaeleza maana na baadhi ya sifa za mighani', points: 3 },
                    { level: 'Needs improvement', description: 'Ana ugumu kueleza maana na sifa za mighani', points: 1 }
                  ]
                },
                {
                  criteria: 'Usimuliaji wa mighani',
                  levels: [
                    { level: 'Excellent', description: 'Anasimulia mighani kwa ufasaha na kuzingatia vipengele vyote vya uwasilishaji', points: 5 },
                    { level: 'Good', description: 'Anasimulia mighani kwa ufasaha na kuzingatia vipengele vingi vya uwasilishaji', points: 4 },
                    { level: 'Satisfactory', description: 'Anasimulia mighani na kuzingatia baadhi ya vipengele vya uwasilishaji', points: 3 },
                    { level: 'Needs improvement', description: 'Ana ugumu kusimulia mighani na hazingatii vipengele vya uwasilishaji', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 30,
              learningObjectiveIds: ['mighani-obj1', 'mighani-obj2', 'mighani-obj3', 'mighani-obj4']
            }
          ],
          estimatedDuration: 180
        },
        {
          id: 'kusoma-kwa-kina-tamthilia',
          title: 'Kusoma kwa Kina: Tamthilia',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kusoma kwa kina kupitia tamthilia.',
          keyTerms: [
            { term: 'Tamthilia', definition: 'Utungo wa fasihi andishi unaowasilishwa kwa njia ya mazungumzo kati ya wahusika.' },
            { term: 'Utanzu', definition: 'Aina ya kazi ya fasihi, kama vile tamthilia, riwaya, hadithi fupi, n.k.' },
            { term: 'Fasihi andishi', definition: 'Kazi za fasihi zilizoandikwa, kinyume na fasihi simulizi.' }
          ],
          learningObjectives: [
            {
              id: 'tamthilia-obj1',
              description: 'Kueleza maana ya tamthilia ili kuipambanua',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kueleza maana ya tamthilia', 'Anaweza kutofautisha tamthilia na tanzu nyingine za fasihi']
            },
            {
              id: 'tamthilia-obj2',
              description: 'Kujadili sifa za tamthilia kama utanzu wa fasihi andishi',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Anaweza kueleza sifa za tamthilia', 'Anaweza kutoa mifano ya sifa hizo kutoka kwenye tamthilia aliyosoma']
            }
          ],
          resources: [
            {
              id: 'tamthilia-res1',
              title: 'Maana na Sifa za Tamthilia',
              type: 'document',
              url: 'https://example.com/maana-sifa-tamthilia',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza maana na sifa za tamthilia kama utanzu wa fasihi andishi.'
            },
            {
              id: 'tamthilia-res2',
              title: 'Mfano wa Tamthilia',
              type: 'document',
              url: 'https://example.com/mfano-tamthilia',
              duration: 60,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Tamthilia fupi inayoweza kusomwa na wanafunzi wa Gredi ya 8.'
            }
          ],
          activities: [
            {
              id: 'tamthilia-act1',
              title: 'Kusoma na Kuchambua Tamthilia',
              description: 'Soma tamthilia iliyoteuliwa na mwalimu na uchambue sifa zake.',
              type: 'group',
              duration: 90,
              materials: ['Tamthilia iliyoteuliwa', 'Daftari', 'Kalamu'],
              steps: [
                'Soma tamthilia iliyoteuliwa na mwalimu',
                'Tambua sifa za tamthilia katika kazi hiyo',
                'Jadili sifa hizo katika kikundi',
                'Andika muhtasari wa sifa za tamthilia',
                'Wasilisha muhtasari wako darasani'
              ],
              learningObjectiveIds: ['tamthilia-obj1', 'tamthilia-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'tamthilia-assess1',
              title: 'Tathmini ya Tamthilia',
              description: 'Tathmini ya uwezo wako wa kueleza maana na sifa za tamthilia.',
              type: 'quiz',
              questions: [
                {
                  id: 'tamthilia-q1',
                  text: 'Tamthilia ni nini?',
                  type: 'short-answer',
                  correctAnswer: 'Tamthilia ni utungo wa fasihi andishi unaowasilishwa kwa njia ya mazungumzo kati ya wahusika.',
                  points: 3
                },
                {
                  id: 'tamthilia-q2',
                  text: 'Taja sifa tatu za tamthilia.',
                  type: 'short-answer',
                  correctAnswer: 'Sifa za tamthilia ni pamoja na: kuwa na wahusika, kuwa na mazungumzo kati ya wahusika, kuwa na maelekezo ya jukwaa, kuwa na vitendo, kuwa na migogoro, n.k.',
                  points: 3
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 30,
              learningObjectiveIds: ['tamthilia-obj1', 'tamthilia-obj2']
            }
          ],
          estimatedDuration: 180
        },
        {
          id: 'insha-za-kubuni-masimulizi',
          title: 'Insha za Kubuni: Masimulizi',
          description: 'Mada hii ndogo inalenga kukuza stadi ya kuandika insha za kubuni za masimulizi.',
          keyTerms: [
            { term: 'Insha ya masimulizi', definition: 'Insha inayosimulia hadithi au matukio fulani.' },
            { term: 'Wazo kuu', definition: 'Wazo la msingi linaloendelezwa katika kila aya ya insha.' },
            { term: 'Wahusika', definition: 'Watu, wanyama au vitu vinavyotenda au kutendewa katika hadithi.' }
          ],
          learningObjectives: [
            {
              id: 'insha-masimulizi-obj1',
              description: 'Kubaini wazo moja kuu la insha ya masimulizi atakayoandika',
              bloomsLevel: 'analyze',
              assessmentCriteria: ['Anaweza kutambua wazo kuu la insha', 'Anaweza kueleza umuhimu wa wazo kuu katika insha']
            },
            {
              id: 'insha-masimulizi-obj2',
              description: 'Kuandika insha ya masimulizi inayoendeleza wazo moja kuu katika kila aya',
              bloomsLevel: 'create',
              assessmentCriteria: ['Anaweza kuandika insha yenye wazo kuu', 'Anaweza kuendeleza wazo hilo katika kila aya']
            }
          ],
          resources: [
            {
              id: 'insha-masimulizi-res1',
              title: 'Jinsi ya Kuandika Insha ya Masimulizi',
              type: 'document',
              url: 'https://example.com/jinsi-insha-masimulizi',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza jinsi ya kuandika insha ya masimulizi yenye wazo kuu.'
            },
            {
              id: 'insha-masimulizi-res2',
              title: 'Mfano wa Insha ya Masimulizi',
              type: 'document',
              url: 'https://example.com/mfano-insha-masimulizi',
              duration: 10,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Mfano wa insha ya masimulizi yenye wazo kuu linaloendelezwa katika kila aya.'
            }
          ],
          activities: [
            {
              id: 'insha-masimulizi-act1',
              title: 'Kuandika Insha ya Masimulizi',
              description: 'Andika insha ya masimulizi kuhusu dhiki zinazokumba wanyama ukizingatia wazo moja kuu.',
              type: 'individual',
              duration: 60,
              materials: ['Karatasi', 'Kalamu', 'Mfano wa insha ya masimulizi'],
              steps: [
                'Soma mfano wa insha ya masimulizi',
                'Tambua wazo kuu katika insha hiyo',
                'Chagua wazo kuu la insha yako kuhusu dhiki zinazokumba wanyama',
                'Andika insha ya masimulizi ukiendeleza wazo hilo katika kila aya',
                'Hakikisha insha yako ina utangulizi, kiini na hitimisho',
                'Hakikisha kila aya inaendeleza wazo kuu',
                'Hakikisha umetumia lugha ifaayo na mtiririko mzuri wa matukio'
              ],
              learningObjectiveIds: ['insha-masimulizi-obj1', 'insha-masimulizi-obj2'],
              difficulty: 'advanced'
            }
          ],
          assessments: [
            {
              id: 'insha-masimulizi-assess1',
              title: 'Tathmini ya Insha ya Masimulizi',
              description: 'Tathmini ya uwezo wako wa kuandika insha ya masimulizi yenye wazo moja kuu.',
              type: 'essay',
              rubric: [
                {
                  criteria: 'Wazo kuu',
                  levels: [
                    { level: 'Excellent', description: 'Insha ina wazo kuu lililo wazi na linaloendelezwa vizuri katika kila aya', points: 5 },
                    { level: 'Good', description: 'Insha ina wazo kuu lililo wazi na linaloendelezwa katika aya nyingi', points: 4 },
                    { level: 'Satisfactory', description: 'Insha ina wazo kuu lakini halijiendelezwi vizuri katika aya zote', points: 3 },
                    { level: 'Needs improvement', description: 'Insha haina wazo kuu lililo wazi', points: 1 }
                  ]
                },
                {
                  criteria: 'Mtiririko wa matukio',
                  levels: [
                    { level: 'Excellent', description: 'Matukio yamepangwa kwa mpangilio mzuri na wa mantiki', points: 5 },
                    { level: 'Good', description: 'Matukio yamepangwa kwa mpangilio mzuri', points: 4 },
                    { level: 'Satisfactory', description: 'Matukio yamepangwa kwa mpangilio wa wastani', points: 3 },
                    { level: 'Needs improvement', description: 'Matukio hayajapangwa kwa mpangilio mzuri', points: 1 }
                  ]
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 60,
              learningObjectiveIds: ['insha-masimulizi-obj1', 'insha-masimulizi-obj2']
            }
          ],
          estimatedDuration: 180
        },
        {
          id: 'viwakilishi-vimilikishi-visisitizi',
          title: 'Viwakilishi Vimilikishi na Visisitizi',
          description: 'Mada hii ndogo inalenga kukuza stadi ya sarufi kupitia matumizi sahihi ya viwakilishi vimilikishi na visisitizi.',
          keyTerms: [
            { term: 'Viwakilishi vimilikishi', definition: 'Maneno yanayosimama badala ya nomino na kuonyesha umiliki, k.m. changu, chako, chake, chetu, chenu, chao.' },
            { term: 'Viwakilishi visisitizi', definition: 'Maneno yanayosimama badala ya nomino na kusisitiza, k.m. kiki hiki, yuyu huyu, yaya haya.' }
          ],
          learningObjectives: [
            {
              id: 'viwakilishi-vimilikishi-obj1',
              description: 'Kutambua viwakilishi vimilikishi na visisitizi katika matini',
              bloomsLevel: 'understand',
              assessmentCriteria: ['Anaweza kutambua viwakilishi vimilikishi', 'Anaweza kutambua viwakilishi visisitizi']
            },
            {
              id: 'viwakilishi-vimilikishi-obj2',
              description: 'Kutumia viwakilishi vimilikishi na visisitizi ipasavyo katika matini',
              bloomsLevel: 'apply',
              assessmentCriteria: ['Anaweza kutumia viwakilishi vimilikishi ipasavyo', 'Anaweza kutumia viwakilishi visisitizi ipasavyo']
            }
          ],
          resources: [
            {
              id: 'viwakilishi-vimilikishi-res1',
              title: 'Viwakilishi Vimilikishi na Visisitizi',
              type: 'document',
              url: 'https://example.com/viwakilishi-vimilikishi-visisitizi',
              duration: 15,
              difficulty: 'intermediate',
              learningStyles: ['reading'],
              description: 'Waraka unaoeleza viwakilishi vimilikishi na visisitizi na matumizi yake.'
            },
            {
              id: 'viwakilishi-vimilikishi-res2',
              title: 'Matumizi ya Viwakilishi Vimilikishi na Visisitizi',
              type: 'interactive',
              url: 'https://example.com/matumizi-viwakilishi-vimilikishi',
              duration: 20,
              difficulty: 'intermediate',
              learningStyles: ['visual', 'kinesthetic'],
              description: 'Zoezi la kiinteraktivi la kutambua na kutumia viwakilishi vimilikishi na visisitizi.'
            }
          ],
          activities: [
            {
              id: 'viwakilishi-vimilikishi-act1',
              title: 'Kutambua na Kutumia Viwakilishi Vimilikishi na Visisitizi',
              description: 'Tambua na tumia viwakilishi vimilikishi na visisitizi katika sentensi na vifungu.',
              type: 'group',
              duration: 45,
              materials: ['Karatasi', 'Kalamu', 'Chati ya viwakilishi'],
              steps: [
                'Chagua viwakilishi vimilikishi na visisitizi kutoka kwenye kapu maneno',
                'Tambua viwakilishi vimilikishi na visisitizi katika kifungu kilichopeanwa',
                'Tunga sentensi ukitumia viwakilishi vimilikishi na visisitizi',
                'Jaza mapengo katika sentensi kwa kutumia viwakilishi vifaavyo',
                'Badilishana kazi na mwenzako na mkosoane'
              ],
              learningObjectiveIds: ['viwakilishi-vimilikishi-obj1', 'viwakilishi-vimilikishi-obj2'],
              difficulty: 'intermediate'
            }
          ],
          assessments: [
            {
              id: 'viwakilishi-vimilikishi-assess1',
              title: 'Tathmini ya Viwakilishi Vimilikishi na Visisitizi',
              description: 'Tathmini ya uwezo wako wa kutambua na kutumia viwakilishi vimilikishi na visisitizi.',
              type: 'quiz',
              questions: [
                {
                  id: 'viwakilishi-vimilikishi-q1',
                  text: 'Ni kipi kati ya vifuatavyo kiwakilishi kimilikishi?',
                  type: 'multiple-choice',
                  options: [
                    'Huyu',
                    'Changu',
                    'Yuyu huyu',
                    'Wewe'
                  ],
                  correctAnswer: 1,
                  points: 2
                },
                {
                  id: 'viwakilishi-vimilikishi-q2',
                  text: 'Ni kipi kati ya vifuatavyo kiwakilishi kisisitizi?',
                  type: 'multiple-choice',
                  options: [
                    'Chako',
                    'Hiki',
                    'Kiki hiki',
                    'Wao'
                  ],
                  correctAnswer: 2,
                  points: 2
                }
              ],
              totalPoints: 10,
              passingScore: 6,
              duration: 20,
              learningObjectiveIds: ['viwakilishi-vimilikishi-obj1', 'viwakilishi-vimilikishi-obj2']
            }
          ],
          estimatedDuration: 120
        }
      ],
      estimatedDuration: 480
    }
  ],
  standards: [
    {
      code: 'KSW8.1',
      description: 'Kujieleza ipasavyo kwa kutumia lugha ya Kiswahili kwa njia ya maandishi na mazungumzo'
    },
    {
      code: 'KSW8.2',
      description: 'Kuwasiliana ipasavyo katika miktadha mbalimbali ya kijamii'
    },
    {
      code: 'KSW8.3',
      description: 'Kujenga desturi ya kusoma na kufasiri maandishi kwa ufasaha'
    },
    {
      code: 'KSW8.4',
      description: 'Kutumia lugha kiubunifu kusimulia na kuandika tungo mbalimbali'
    },
    {
      code: 'KSW8.5',
      description: 'Kushiriki katika shughuli za kijamii zinazochangia ujifunzaji'
    },
    {
      code: 'KSW8.6',
      description: 'Kutumia teknolojia ipasavyo katika ujifunzaji na mawasiliano ili kukuza ujuzi wa kidijitali'
    },
    {
      code: 'KSW8.7',
      description: 'Kutumia maadili yanayohitajika maishani kupitia stadi za lugha ya Kiswahili'
    },
    {
      code: 'KSW8.8',
      description: 'Kufurahia na kuthamini lugha ya Kiswahili kama lugha rasmi, ya taifa na kimataifa'
    }
  ],
  version: '1.0.0',
  lastUpdated: '2023-06-15'
};