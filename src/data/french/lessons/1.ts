import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1,
  "slug": "french-inside-english",
  "title": "The French Inside Your English",
  "subtitle": "The register ladder, the word for 'it', and your first sentences",
  "phase": 1,
  "shift_categories": [
    "doublet"
  ],
  "word_ids": [
    "gâteau",
    "café",
    "vouloir",
    "tu",
    "je",
    "le",
    "la",
    "un_peu"
  ],
  "table_word_ids": [
    "gâteau",
    "café",
    "vouloir",
    "le",
    "la",
    "tu",
    "je",
    "un_peu"
  ],
  "hook": {
    "title": "You Already Speak Half of This",
    "content": "After 1066, English absorbed over 10,000 French words — nearly a third of everything you say. Notice how English gives you two words for one idea: ask/enquire, want/desire, freedom/liberty. The plain word is Germanic; the fancy one is French. This course lives in your fancy register: every formal word you own is a French word wearing English clothes.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Norman Conquest",
        "content": "In 1066, French-speaking Normans took over England. For 300 years, the ruling class spoke French — which is why English 'beef' is the French bœuf (cow on the farm, beef on the plate) and 'pork' is porc.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "le — and the Word for 'It' Is the Same Word",
    "content": "The cake is le gâteau. The coffee is le café. And here is the trick this course will never let you forget: when you want to say it, French uses the same word again. 'I want it' — where it means the cake — is je le veux. Literally: I it want. The pronoun walks one step left, in front of the verb. You will ask for a feminine it later, and it will be la — the same journey, one word at a time.",
    "footnotes": [
      {
        "marker": "2",
        "title": "je and le share a vowel",
        "content": "je /ʒə/ and le /lə/ end in the same little /ə/ sound. Say them together — je le — and your mouth barely moves. That laziness is the engine of the whole language.",
        "interest": true
      }
    ],
    "linguist_note": "le and la come from Latin ille/illa, 'that one' — the same worn-down pointer that became English 'the'. 'The' and 'it' being one word is not a quirk; it is the pointer doing both jobs.",
    "trap_note": "Your mind will want to say je veux le for 'I want it', copying the English order. In French the pronoun walks left: je le veux. I it want."
  },
  "exercises": [
    {
      "id": "fr1_e1",
      "type": "matching_pairs",
      "prompt": "Match each English word with its French twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "cake",
          "german": "le gâteau"
        },
        {
          "id": "p2",
          "english": "coffee",
          "german": "le café"
        },
        {
          "id": "p3",
          "english": "I",
          "german": "je"
        },
        {
          "id": "p4",
          "english": "you (informal)",
          "german": "tu"
        },
        {
          "id": "p5",
          "english": "a little",
          "german": "un peu"
        },
        {
          "id": "p6",
          "english": "the (feminine)",
          "german": "la"
        }
      ],
      "target_answer": "le gâteau, le café, je, tu, un peu, la",
      "meaning": "cake, coffee, I, you, a little, the",
      "explanation": "gâteau and café arrived in English whole; je and tu are the Latin pronouns; un peu is the paucity-word."
    },
    {
      "id": "fr1_e2",
      "type": "reverse_cognate",
      "prompt": "veux (I want) hides inside a common English word about wanting to help. Which one?",
      "target_answer": "volunteer",
      "meaning": "a volunteer is the one who wants to do",
      "explanation": "Latin volo 'I want' gives vouloir in French and voluntary, benevolent, volunteer in English. The want-root never left."
    },
    {
      "id": "fr1_e4",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're asking a friend whether they want it — and the it is the cake",
      "cues": [
        "Who? → tu, the informal you",
        "The pronoun walks left: I it want → tu le veux",
        "The question is just intonation — no word moves"
      ],
      "target_answer": "Tu le veux",
      "meaning": "Do you want it?",
      "vocab_hints": [
        {
          "word": "le",
          "translation": "it (masculine)",
          "note": "it is the same word as 'the' — the cake's article, one step left of the verb"
        }
      ],
      "idea_parts": [
        "who wants? → tu",
        "it (the cake) → le, placed before veux",
        "question? → rising voice only: Tu le veux ?"
      ],
      "word_bank": [
        "le",
        "Tu",
        "est",
        "veux",
        "la"
      ],
      "explanation": "Tu le veux ? — the it borrows the cake's article (le, not la), then walks in front of veux.",
      "diagnosis": {
        "slip": "the it stayed after the verb, English-style",
        "cue": "French says I it want: the pronoun takes one step left. Tu le veux — never tu veux le."
      }
    },
    {
      "id": "fr1_e5",
      "type": "literal_gloss",
      "prompt": "Which English sentence is built the French way?",
      "german": "Je le veux",
      "natural": "I want it",
      "options": [
        "I it want",
        "I want to it",
        "I want it"
      ],
      "target_answer": "I it want",
      "meaning": "I want it (the odd English is the lesson — never a model to produce)",
      "explanation": "Je le veux is word-for-word 'I it want'. The French order is the old English order — KJV English still says it."
    },
    {
      "id": "fr1_e6",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je veux le café",
      "replays": 2,
      "target_answer": "Je veux le café",
      "meaning": "I want the coffee",
      "cues": [
        "Start with the want: je veux",
        "The it-borrowing article: le",
        "Finish with the noun: café"
      ],
      "explanation": "Every element has been met: the want-verb, the article that doubles as 'it', the borrowed noun.",
      "affirmation": "You heard the want, the article, and the noun — three pieces you already own."
    }
  ],
  "twist": {
    "prompt": "One more, no safety net — 'I want the coffee, a little'?",
    "target_answer": "Je veux le café, un peu",
    "word_bank": [
      "la",
      "veux",
      "café",
      "peu",
      "le",
      "Je",
      "un",
      "est"
    ],
    "explanation": "un peu rides at the end, exactly where English puts it. You just said your first sentence with a tag on it."
  },
  "foreshadow": {
    "line": "One thing sits unfinished: la, the feminine 'the', has no job yet. Its moment is coming — and it will carry thousands of words on its back.",
    "resolvedIn": 2
  },
  "summary": {
    "outcome": "Convert gâteau and café from English, use je veux / tu veux, and place le or la as the word for 'it' — before the verb.",
    "use_example": {
      "german": "Je le veux, un peu.",
      "english": "I want it, a little."
    },
    "takeaway": "The formal register of English is a French warehouse — and the word for 'it' is the word for 'the', walking one step left.",
    "curiosity_teaser": "Up next on Le Pont ([101] Hidden Twins: Places & Colors): see how The French Inside Your English leads directly into Hidden Twins: Places & Colors."
  }
};

export default lesson;
