import { QuickFactsBank } from './types';

export const englishQuickFacts: QuickFactsBank = {
  subject: "English",
  grades: ["Grade 8"],
  topics: [
    { name: "Grammar", subtopics: ["Parts of Speech", "Tenses", "Punctuation"] },
    { name: "Reading", subtopics: ["Comprehension", "Literary Devices", "Text Analysis"] },
    { name: "Writing", subtopics: ["Essays", "Creative Writing", "Letters"] },
    { name: "Speaking", subtopics: ["Presentations", "Debates", "Conversations"] }
  ],
  flashcardSets: [
    {
      id: "eng-grammar-parts-of-speech",
      title: "Parts of Speech",
      description: "Test your knowledge of the different parts of speech in English.",
      subject: "English",
      topic: "Grammar",
      subtopic: "Parts of Speech",
      grade: "Grade 8",
      flashcards: [
        {
          id: "eng-gram-f1",
          question: "What is a noun?",
          answer: "A noun is a word that names a person, place, thing, or idea. Examples include: teacher, Kenya, book, happiness.",
          difficulty: "easy",
          tags: ["grammar", "parts of speech", "nouns"],
          timeRecommended: 20
        },
        {
          id: "eng-gram-f2",
          question: "What is a verb?",
          answer: "A verb is a word that expresses an action, occurrence, or state of being. Examples include: run, think, exist, become.",
          difficulty: "easy",
          tags: ["grammar", "parts of speech", "verbs"],
          timeRecommended: 20
        },
        {
          id: "eng-gram-f3",
          question: "What is an adjective?",
          answer: "An adjective is a word that describes or modifies a noun or pronoun. Examples include: beautiful, tall, intelligent, red.",
          difficulty: "easy",
          tags: ["grammar", "parts of speech", "adjectives"],
          timeRecommended: 20
        },
        {
          id: "eng-gram-f4",
          question: "What is an adverb?",
          answer: "An adverb is a word that modifies a verb, adjective, or another adverb. Adverbs often end in -ly and answer questions like how, when, where, or to what extent. Examples include: quickly, very, often, well.",
          difficulty: "medium",
          tags: ["grammar", "parts of speech", "adverbs"],
          timeRecommended: 25
        },
        {
          id: "eng-gram-f5",
          question: "What is a pronoun?",
          answer: "A pronoun is a word that replaces a noun in a sentence. Examples include: I, you, he, she, it, we, they, this, that, who, which.",
          difficulty: "easy",
          tags: ["grammar", "parts of speech", "pronouns"],
          timeRecommended: 20
        },
        {
          id: "eng-gram-f6",
          question: "What is a preposition?",
          answer: "A preposition is a word that shows the relationship between a noun or pronoun and other words in a sentence. Examples include: in, on, at, by, with, under, over, through.",
          difficulty: "medium",
          tags: ["grammar", "parts of speech", "prepositions"],
          timeRecommended: 25
        },
        {
          id: "eng-gram-f7",
          question: "What is a conjunction?",
          answer: "A conjunction is a word that connects words, phrases, or clauses. Examples include: and, but, or, nor, for, yet, so.",
          difficulty: "medium",
          tags: ["grammar", "parts of speech", "conjunctions"],
          timeRecommended: 25
        },
        {
          id: "eng-gram-f8",
          question: "What is an interjection?",
          answer: "An interjection is a word or phrase that expresses strong emotion or surprise. It is often followed by an exclamation mark. Examples include: Wow!, Oh!, Ouch!, Hooray!",
          difficulty: "medium",
          tags: ["grammar", "parts of speech", "interjections"],
          timeRecommended: 25
        },
        {
          id: "eng-gram-f9",
          question: "Identify the part of speech of the underlined word: The beautiful flower bloomed.",
          answer: "Adjective\n\n'Beautiful' describes the noun 'flower', making it an adjective.",
          difficulty: "medium",
          tags: ["grammar", "parts of speech", "practice"],
          timeRecommended: 30
        },
        {
          id: "eng-gram-f10",
          question: "Identify the part of speech of the underlined word: She ran quickly to catch the bus.",
          answer: "Adverb\n\n'Quickly' describes how she ran (modifies the verb 'ran'), making it an adverb.",
          difficulty: "medium",
          tags: ["grammar", "parts of speech", "practice"],
          timeRecommended: 30
        }
      ],
      totalCards: 10,
      estimatedTime: 240,
      difficulty: "medium"
    },
    {
      id: "eng-literary-devices",
      title: "Literary Devices",
      description: "Learn about common literary devices used in literature.",
      subject: "English",
      topic: "Reading",
      subtopic: "Literary Devices",
      grade: "Grade 8",
      flashcards: [
        {
          id: "eng-lit-f1",
          question: "What is a simile?",
          answer: "A simile is a figure of speech that compares two unlike things using the words 'like' or 'as'. For example: 'She is as busy as a bee' or 'He runs like the wind.'",
          difficulty: "easy",
          tags: ["reading", "literary devices", "simile"],
          timeRecommended: 25
        },
        {
          id: "eng-lit-f2",
          question: "What is a metaphor?",
          answer: "A metaphor is a figure of speech that makes a direct comparison between two unlike things without using 'like' or 'as'. For example: 'Time is money' or 'Her eyes were diamonds.'",
          difficulty: "easy",
          tags: ["reading", "literary devices", "metaphor"],
          timeRecommended: 25
        },
        {
          id: "eng-lit-f3",
          question: "What is personification?",
          answer: "Personification is a figure of speech in which human qualities or actions are attributed to non-human entities, objects, or abstract ideas. For example: 'The wind whispered through the trees' or 'The stars danced in the sky.'",
          difficulty: "medium",
          tags: ["reading", "literary devices", "personification"],
          timeRecommended: 30
        },
        {
          id: "eng-lit-f4",
          question: "What is alliteration?",
          answer: "Alliteration is the repetition of the same consonant sound at the beginning of several words in close succession. For example: 'Peter Piper picked a peck of pickled peppers' or 'She sells seashells by the seashore.'",
          difficulty: "medium",
          tags: ["reading", "literary devices", "alliteration"],
          timeRecommended: 25
        },
        {
          id: "eng-lit-f5",
          question: "What is onomatopoeia?",
          answer: "Onomatopoeia is the use of words that imitate the sounds associated with the objects or actions they refer to. Examples include: buzz, hiss, splash, bang, boom, crash.",
          difficulty: "medium",
          tags: ["reading", "literary devices", "onomatopoeia"],
          timeRecommended: 25
        },
        {
          id: "eng-lit-f6",
          question: "What is hyperbole?",
          answer: "Hyperbole is an extreme exaggeration used for emphasis or effect. It is not meant to be taken literally. For example: 'I'm so hungry I could eat a horse' or 'I've told you a million times.'",
          difficulty: "medium",
          tags: ["reading", "literary devices", "hyperbole"],
          timeRecommended: 25
        },
        {
          id: "eng-lit-f7",
          question: "What is irony?",
          answer: "Irony is a figure of speech in which words are used in such a way that their intended meaning is different from the actual meaning of the words. There are three types: verbal irony (saying one thing but meaning another), situational irony (when the opposite of what is expected happens), and dramatic irony (when the audience knows something the characters don't).",
          difficulty: "hard",
          tags: ["reading", "literary devices", "irony"],
          timeRecommended: 35
        },
        {
          id: "eng-lit-f8",
          question: "What is symbolism?",
          answer: "Symbolism is the use of symbols to represent ideas or qualities. A symbol is something that stands for or suggests something else by reason of relationship, association, convention, or resemblance. For example, a dove might symbolize peace, or a red rose might symbolize love.",
          difficulty: "medium",
          tags: ["reading", "literary devices", "symbolism"],
          imageUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
          timeRecommended: 30
        },
        {
          id: "eng-lit-f9",
          question: "What is foreshadowing?",
          answer: "Foreshadowing is a literary device in which a writer gives an advance hint of what is to come later in the story. It often appears at the beginning of a story or a chapter and helps the reader develop expectations about the coming events.",
          difficulty: "hard",
          tags: ["reading", "literary devices", "foreshadowing"],
          timeRecommended: 30
        },
        {
          id: "eng-lit-f10",
          question: "What is the difference between a simile and a metaphor?",
          answer: "Both similes and metaphors compare two unlike things, but:\n\nA simile uses the words 'like' or 'as' to make the comparison (e.g., 'She is as graceful as a swan').\n\nA metaphor makes a direct comparison without using 'like' or 'as' (e.g., 'She is a swan on the dance floor').",
          difficulty: "medium",
          tags: ["reading", "literary devices", "comparison"],
          timeRecommended: 30
        }
      ],
      totalCards: 10,
      estimatedTime: 280,
      difficulty: "medium"
    },
    {
      id: "eng-idioms-expressions",
      title: "Idioms and Expressions",
      description: "Test your knowledge of common English idioms and expressions.",
      subject: "English",
      topic: "Vocabulary",
      subtopic: "Idioms",
      grade: "Grade 8",
      flashcards: [
        {
          id: "eng-idiom-f1",
          question: "What does the idiom 'break the ice' mean?",
          answer: "To 'break the ice' means to do or say something to relieve initial tension or awkwardness in a social situation, especially when meeting new people.",
          difficulty: "easy",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 20
        },
        {
          id: "eng-idiom-f2",
          question: "What does the idiom 'a piece of cake' mean?",
          answer: "When something is 'a piece of cake', it means it's very easy to do or accomplish.",
          difficulty: "easy",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 20
        },
        {
          id: "eng-idiom-f3",
          question: "What does the idiom 'cost an arm and a leg' mean?",
          answer: "When something 'costs an arm and a leg', it means it is very expensive or excessively costly.",
          difficulty: "easy",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 20
        },
        {
          id: "eng-idiom-f4",
          question: "What does the idiom 'hit the books' mean?",
          answer: "To 'hit the books' means to study hard or to begin studying.",
          difficulty: "medium",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 25
        },
        {
          id: "eng-idiom-f5",
          question: "What does the idiom 'under the weather' mean?",
          answer: "When someone is 'under the weather', they are feeling ill or slightly sick.",
          difficulty: "medium",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 25
        },
        {
          id: "eng-idiom-f6",
          question: "What does the idiom 'barking up the wrong tree' mean?",
          answer: "When someone is 'barking up the wrong tree', they are pursuing a mistaken or misguided line of thought or course of action.",
          difficulty: "medium",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 25
        },
        {
          id: "eng-idiom-f7",
          question: "What does the idiom 'beat around the bush' mean?",
          answer: "To 'beat around the bush' means to avoid getting to the point or addressing the main issue directly, often by talking about unrelated topics.",
          difficulty: "medium",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 25
        },
        {
          id: "eng-idiom-f8",
          question: "What does the idiom 'let the cat out of the bag' mean?",
          answer: "To 'let the cat out of the bag' means to reveal a secret or disclose something that was meant to be kept hidden.",
          difficulty: "medium",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 25
        },
        {
          id: "eng-idiom-f9",
          question: "What does the idiom 'once in a blue moon' mean?",
          answer: "The phrase 'once in a blue moon' means very rarely or almost never.",
          difficulty: "easy",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 20
        },
        {
          id: "eng-idiom-f10",
          question: "What does the idiom 'bite off more than you can chew' mean?",
          answer: "To 'bite off more than you can chew' means to take on more responsibility or commit to more tasks than you can handle or complete.",
          difficulty: "medium",
          tags: ["vocabulary", "idioms", "expressions"],
          timeRecommended: 25
        }
      ],
      totalCards: 10,
      estimatedTime: 230,
      difficulty: "medium"
    }
  ]
};