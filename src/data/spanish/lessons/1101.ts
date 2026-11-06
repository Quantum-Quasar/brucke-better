import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1101,
  "slug": "noun-first-word-order",
  "title": "Noun-First Word Order",
  "subtitle": "el libro rojo, la casa blanca — painting the object before coloring it",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "libro",
    "casa",
    "hotel",
    "mesa",
    "rojo",
    "blanco",
    "negro",
    "verde",
    "azul",
    "nuevo"
  ],
  "table_word_ids": [
    "libro",
    "casa",
    "hotel",
    "mesa",
    "rojo",
    "blanco",
    "negro",
    "verde",
    "azul",
    "nuevo"
  ],
  "hook": {
    "title": "Canvas First, Paint Second",
    "content": "When you say el libro rojo, your listener sees the book first and then paints it red. Practice resisting the English habit of putting colors before the noun!"
  },
  "pattern": {
    "title": "Gender Concord on Colors",
    "content": "rojo/roja, blanco/blanca, negro/negra change for gender; verde and azul stay identical in the singular."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the red book",
          "german": "el libro rojo"
        },
        {
          "id": "p2",
          "english": "the white table",
          "german": "la mesa blanca"
        },
        {
          "id": "p3",
          "english": "the black coffee",
          "german": "el café negro"
        },
        {
          "id": "p4",
          "english": "the green house",
          "german": "la casa verde"
        },
        {
          "id": "p5",
          "english": "the blue hotel",
          "german": "el hotel azul"
        },
        {
          "id": "p6",
          "english": "the new house",
          "german": "la casa nueva"
        }
      ],
      "target_answer": "el libro rojo, la mesa blanca, el café negro, la casa verde, el hotel azul, la casa nueva",
      "meaning": "the red book, the white table, the black coffee, the green house, the blue hotel, the new house",
      "explanation": "Every color sits right after its noun.",
      "id": "es1101_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Translate 'the white table':",
      "options": [
        "la mesa blanca",
        "la blanca mesa",
        "el mesa blanco"
      ],
      "target_answer": "la mesa blanca",
      "meaning": "the white table",
      "explanation": "la mesa (feminine) + blanca (after the noun).",
      "id": "es1101_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have the red book'",
      "target_answer": "Tengo el libro rojo",
      "meaning": "I have the red book",
      "word_bank": [
        "rojo",
        "la",
        "blanco",
        "Tengo",
        "libro",
        "el",
        "roja"
      ],
      "explanation": "Tengo + el libro + rojo.",
      "id": "es1101_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you want a new house",
      "cues": [
        "I want → Quiero",
        "a house (feminine) → una casa",
        "new (feminine, after noun) → nueva"
      ],
      "idea_parts": [
        "I want → Quiero",
        "a house → una casa",
        "new → nueva"
      ],
      "target_answer": "Quiero una casa nueva",
      "meaning": "I want a new house",
      "word_bank": [
        "nueva",
        "una",
        "un",
        "casa",
        "Quiero",
        "nuevo",
        "blanca"
      ],
      "explanation": "Quiero una casa nueva.",
      "id": "es1101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La casa blanca está aquí",
      "replays": 2,
      "target_answer": "La casa blanca está aquí",
      "meaning": "The white house is here",
      "cues": [
        "The white house: La casa blanca",
        "is (location): está",
        "here: aquí"
      ],
      "explanation": "La casa blanca está aquí.",
      "affirmation": "Noun-first order + estar for location!",
      "id": "es1101_e5"
    }
  ],
  "summary": {
    "outcome": "Build noun + color/descriptor phrases with automatic gender concord.",
    "use_example": {
      "german": "Quiero el libro rojo y la mesa blanca.",
      "english": "I want the red book and the white table."
    },
    "takeaway": "Always name the noun before its color in Spanish.",
    "curiosity_teaser": "Up next ([1102] Plural Concord Drills): scale up to masculine and feminine plurals (los, las, -s, -es)."
  },
  "twist": {
    "prompt": "Assemble: 'The green book is here'",
    "target_answer": "El libro verde está aquí",
    "word_bank": [
      "aquí",
      "El",
      "está",
      "La",
      "libro",
      "es",
      "roja",
      "verde"
    ],
    "explanation": "verde ends in -e and fits both masculine and feminine."
  }
};

export default lesson;
