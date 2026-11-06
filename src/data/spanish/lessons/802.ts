import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 802,
  "slug": "al-invariable-passport",
  "title": "The -al Invariable Passport",
  "subtitle": "natural, central, formal, personal, internacional — adjectives that never change for gender in the singular",
  "phase": 2,
  "shift_categories": [
    "al"
  ],
  "word_ids": [
    "natural",
    "central",
    "formal",
    "personal",
    "internacional",
    "cultural",
    "tren",
    "opinión"
  ],
  "table_word_ids": [
    "natural",
    "central",
    "formal",
    "personal",
    "internacional",
    "cultural",
    "tren",
    "opinión"
  ],
  "hook": {
    "title": "Identical Spelling, Invariable Gender",
    "content": "Look at natural, central, formal, personal, cultural: their singular spelling in Spanish is 100% identical to English! Even better, when -tion- sits inside an -al word ('international', 'traditional'), it simply becomes -cion-: internacional, tradicional!"
  },
  "pattern": {
    "title": "One Form for Both el and la",
    "content": "Because -al adjectives end in the consonant -l rather than -o, they do not change for gender: el tren internacional and la organización internacional use the exact same adjective form."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "natural",
          "german": "natural"
        },
        {
          "id": "p2",
          "english": "central",
          "german": "central"
        },
        {
          "id": "p3",
          "english": "formal",
          "german": "formal"
        },
        {
          "id": "p4",
          "english": "personal",
          "german": "personal"
        },
        {
          "id": "p5",
          "english": "international",
          "german": "internacional"
        },
        {
          "id": "p6",
          "english": "cultural",
          "german": "cultural"
        }
      ],
      "target_answer": "natural, central, formal, personal, internacional, cultural",
      "meaning": "natural, central, formal, personal, international, cultural",
      "explanation": "All six end in -al and stay unchanged for masculine vs feminine singular.",
      "id": "es802_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'international' in Spanish (remembering -tion- → -cion-):",
      "tile_options": [
        "al",
        "inter",
        "nacion",
        "tion"
      ],
      "target_answer": "internacional",
      "meaning": "internacional (international)",
      "explanation": "inter + nacion + al = internacional.",
      "id": "es802_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Choose the correct phrase for 'the international organization':",
      "options": [
        "la organización internacional",
        "la internacional organización",
        "la organización internacionala"
      ],
      "target_answer": "la organización internacional",
      "meaning": "the international organization",
      "explanation": "Adjective follows the noun and never adds *-a.",
      "id": "es802_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is an international train'",
      "target_answer": "Es un tren internacional",
      "meaning": "It is an international train",
      "word_bank": [
        "internacional",
        "la",
        "tren",
        "Es",
        "personal",
        "una",
        "un"
      ],
      "explanation": "Es un tren internacional.",
      "id": "es802_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es mi opinión personal",
      "replays": 2,
      "target_answer": "Es mi opinión personal",
      "meaning": "It is my personal opinion",
      "cues": [
        "It is: Es",
        "my opinion: mi opinión",
        "personal: personal"
      ],
      "explanation": "Es mi opinión personal — invariable -al adjective after feminine opinión.",
      "affirmation": "Perfect noun + invariable -al placement!",
      "id": "es802_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy -al cognates after masculine and feminine nouns without changing their singular ending.",
    "use_example": {
      "german": "Es un tren internacional y una tradición cultural.",
      "english": "It is an international train and a cultural tradition."
    },
    "takeaway": "Spanish -al adjectives match English spelling and fit both masculine and feminine nouns.",
    "curiosity_teaser": "Up next ([9] tú & usted: The T-V Line): see how Spanish turns 'Your Mercy' into polite everyday address."
  },
  "twist": {
    "prompt": "Assemble: 'The station is central'",
    "target_answer": "La estación es central",
    "word_bank": [
      "personal",
      "estación",
      "es",
      "La",
      "El",
      "está",
      "central"
    ],
    "explanation": "La estación es central describes a permanent characteristic of the station."
  }
};

export default lesson;
