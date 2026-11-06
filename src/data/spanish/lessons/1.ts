import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1,
  "slug": "spanish-inside-english",
  "title": "The Spanish Inside Your English",
  "subtitle": "The Latinate inheritance, el/la, quiero, and lo as 'it' walking left",
  "phase": 1,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "pastel",
    "café",
    "querer",
    "tú",
    "yo",
    "el",
    "la",
    "lo",
    "un_poco"
  ],
  "table_word_ids": [
    "pastel",
    "café",
    "querer",
    "tú",
    "yo",
    "el",
    "la",
    "lo",
    "un_poco"
  ],
  "hook": {
    "title": "You Already Speak a Vast Latin Language",
    "content": "English absorbed thousands of Latin stems directly and through Norman French. Whenever you reach for formal English words like inquire, desire, or pastry, Spanish is standing right behind them. The pastry is el pastel. The coffee is el café. And 'I want' is quiero — born from the same Latin root as English 'inquire'. You already own thousands of Spanish roots without memorizing a single vocabulary list.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'yo' Is Optional in Spanish",
        "content": "In English, 'want' could be I, you, we, or they — so you must say 'I want'. In Spanish, the -o ending of quiero belongs exclusively to 'I', so speakers drop yo unless they mean 'I (and nobody else) want'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "el, la — and the Pronoun Walks Left",
    "content": "The coffee is el café. The pastry is el pastel. And here is the core habit this course will anchor from your very first sentence: when you want to say 'it', Spanish places the object pronoun right before the conjugated verb. 'I want it' — where 'it' refers to the coffee — is lo quiero. Word for word: 'it I want'. And because the ending of quiero (-o) already announces 'I', you only add yo when you want extra emphasis!",
    "linguist_note": "el, la, and lo all derive from Latin demonstratives ille, illa, illum ('that one'). Spanish pointers became both articles and object pronouns.",
    "trap_note": "Your mind will want to say *quiero lo for 'I want it', copying English order. In Spanish, the pronoun walks left: lo quiero."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "cake, pastry",
          "german": "el pastel"
        },
        {
          "id": "p2",
          "english": "coffee",
          "german": "el café"
        },
        {
          "id": "p3",
          "english": "I want",
          "german": "quiero"
        },
        {
          "id": "p4",
          "english": "you (informal)",
          "german": "tú"
        },
        {
          "id": "p5",
          "english": "a little",
          "german": "un poco"
        },
        {
          "id": "p6",
          "english": "it (masculine)",
          "german": "lo"
        }
      ],
      "target_answer": "el pastel, el café, quiero, tú, un poco, lo",
      "meaning": "cake, pastry, coffee, I want, you (informal), a little, it (masculine)",
      "explanation": "pastel and café are direct cognates; quiero comes from querer (inquire); lo is the masculine/neuter 'it'.",
      "id": "es1_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "quiero ('I want') shares its Latin root (quaerere 'to seek/ask') with an English word for asking questions. Which one?",
      "target_answer": "inquire",
      "meaning": "to inquire is to ask for what you seek or want",
      "explanation": "Latin quaerere ('to seek, ask') gave Spanish querer ('to want, love') and English query, inquire, require.",
      "id": "es1_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want the cake'",
      "target_answer": "Quiero el pastel",
      "meaning": "I want the cake",
      "word_bank": [
        "pastel",
        "Quiero",
        "la",
        "café",
        "el",
        "lo"
      ],
      "explanation": "Quiero (I want) + el pastel (the cake). Because -o on quiero already means 'I', yo is optional.",
      "vocab_hints": [
        {
          "word": "el",
          "translation": "the (masculine)",
          "note": "Azure article for masculine nouns"
        }
      ],
      "id": "es1_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you are telling a friend you want it — and 'it' refers to the coffee",
      "cues": [
        "it referring to masculine coffee is lo",
        "the pronoun walks left: it I want",
        "I want is quiero"
      ],
      "idea_parts": [
        "it (the coffee) → lo",
        "I want → quiero",
        "order: it I want → Lo quiero"
      ],
      "target_answer": "Lo quiero",
      "meaning": "I want it",
      "word_bank": [
        "un",
        "Lo",
        "café",
        "el",
        "quiero",
        "la"
      ],
      "explanation": "Lo quiero — the object pronoun sits directly before the conjugated verb: it I want.",
      "diagnosis": {
        "slip": "the pronoun stayed after the verb, English-style",
        "cue": "Spanish says it I want: the pronoun takes one step left. Lo quiero — never *quiero lo."
      },
      "id": "es1_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Lo quiero'?",
      "german": "Lo quiero",
      "natural": "I want it",
      "options": [
        "It I want",
        "The I want",
        "I want it",
        "I want to it"
      ],
      "target_answer": "It I want",
      "meaning": "I want it (literal Spanish blueprint: It I want)",
      "explanation": "Lo quiero is word-for-word 'It I want'. In Spanish, object pronouns walk one step left of conjugated verbs.",
      "id": "es1_e5"
    }
  ],
  "summary": {
    "outcome": "Convert pastel and café from English, use quiero without needing yo, and place lo as 'it' before the verb.",
    "use_example": {
      "german": "Lo quiero, un poco.",
      "english": "I want it, a little."
    },
    "takeaway": "English Latin roots are a Spanish treasury — and Spanish object pronouns walk one step left: it I want.",
    "curiosity_teaser": "Up next on El Puente ([101] Hidden Twins: Places & Colors): see how zero-shift cognates give you places and colors immediately."
  },
  "twist": {
    "prompt": "One more, no safety net — 'I want it, a little'?",
    "target_answer": "Lo quiero, un poco",
    "word_bank": [
      "la",
      "Lo",
      "un",
      "quiero",
      "poco",
      "café",
      "el"
    ],
    "explanation": "un poco sits at the end, just like English 'a little'."
  },
  "foreshadow": {
    "line": "One vital piece sits waiting: la, the feminine article, has no partner yet. Its moment arrives in Topic 2 — and it will carry thousands of words on its shoulders.",
    "resolvedIn": 2
  }
};

export default lesson;
