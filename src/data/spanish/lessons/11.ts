import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 11,
  "slug": "adjective-agreement",
  "title": "Adjective Agreement",
  "subtitle": "Descriptive adjectives following the noun: -o/-a/-os/-as patterns",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "libro",
    "casa",
    "hotel",
    "blanco",
    "negro",
    "verde",
    "rojo",
    "azul",
    "nuevo",
    "hermoso"
  ],
  "table_word_ids": [
    "libro",
    "casa",
    "hotel",
    "blanco",
    "negro",
    "verde",
    "rojo",
    "azul",
    "nuevo",
    "hermoso"
  ],
  "hook": {
    "title": "Painting the Noun First, Coloring It Second",
    "content": "In English, you hold the color in your head before naming the object: 'a white house'. In Spanish, you put the object on the canvas first and then brush the description onto it: una casa blanca ('a house white'), un libro nuevo ('a book new'), un café negro ('a coffee black')!"
  },
  "pattern": {
    "title": "The Four-Corner Agreement Grid: -o, -a, -os, -as",
    "content": "Adjectives ending in -o have four forms: blanco (m.sg.), blanca (f.sg.), blancos (m.pl.), blancas (f.pl.). Adjectives ending in -e (verde, grande) or a consonant (azul, natural) have just TWO forms — singular and plural! Wait: how do you make a plural in Spanish? If a word ends in a vowel, add -s (casas, verdes); if it ends in a consonant, add -es (hoteles, azules)!",
    "linguist_note": "Post-nominal adjective placement is the unmarked Romance order for distinguishing/restrictive attributes.",
    "trap_note": "Notice that plural of el is LOS (not *eles!) and plural of la is LAS: el libro → los libros, la casa → las casas."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the white house",
          "german": "la casa blanca"
        },
        {
          "id": "p2",
          "english": "the black coffee",
          "german": "el café negro"
        },
        {
          "id": "p3",
          "english": "the new book",
          "german": "el libro nuevo"
        },
        {
          "id": "p4",
          "english": "the beautiful city",
          "german": "la ciudad hermosa"
        },
        {
          "id": "p5",
          "english": "green (invariable gender)",
          "german": "verde"
        },
        {
          "id": "p6",
          "english": "blue (plural: azules)",
          "german": "azul"
        }
      ],
      "target_answer": "la casa blanca, el café negro, el libro nuevo, la ciudad hermosa, verde, azul",
      "meaning": "the white house, the black coffee, the new book, the beautiful city, green (invariable gender), blue (plural: azules)",
      "explanation": "Noun comes first; adjective agrees in gender and number.",
      "id": "es11_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish 'hermoso' ('beautiful') evolved from Latin 'formōsus' ('finely shaped', with initial f- turning into silent h-!). What historical Portuguese name ('Beautiful Island') was given to Taiwan by 16th-century navigators?",
      "target_answer": "Formosa",
      "meaning": "Formosa (historical name of Taiwan) is the exact same word as Spanish hermosa!",
      "explanation": "Latin formōsus kept its f- in Portuguese Formosa and English 'form', and turned f- into silent h- in Spanish hermoso.",
      "id": "es11_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you form the plural of 'el hotel azul' ('the blue hotel' → 'the blue hotels')?",
      "options": [
        "las hoteles azules",
        "los hoteles azules",
        "el hoteles azuls"
      ],
      "target_answer": "los hoteles azules",
      "meaning": "the blue hotels",
      "explanation": "Masculine el becomes plural los; consonant-ending hotel and azul add -es: los hoteles azules.",
      "id": "es11_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want a black coffee'",
      "target_answer": "Quiero un café negro",
      "meaning": "I want a black coffee",
      "word_bank": [
        "un",
        "Quiero",
        "negra",
        "una",
        "café",
        "blanco",
        "negro"
      ],
      "explanation": "Quiero + un café (masculine) + negro (after the noun).",
      "id": "es11_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Una casa blanca y nueva'?",
      "german": "Una casa blanca y nueva",
      "natural": "A new white house",
      "options": [
        "A house white and new",
        "A new white house",
        "White a new house",
        "A white and house new"
      ],
      "target_answer": "A house white and new",
      "meaning": "A new white house (literal Spanish blueprint: A house white and new)",
      "explanation": "Spanish names the object first (una casa) and then layers its descriptions (blanca y nueva).",
      "id": "es11_e5"
    }
  ],
  "summary": {
    "outcome": "Place descriptive adjectives after the noun and match them across singular/plural and masculine/feminine.",
    "use_example": {
      "german": "Tengo un libro nuevo y vivo en una casa blanca.",
      "english": "I have a new book and I live in a white house."
    },
    "takeaway": "Vowel-ending words add -s in the plural (libros, casas); consonant-ending words add -es (hoteles, azules).",
    "curiosity_teaser": "Up next ([1101] Noun-First Word Order): build noun-first descriptions across colors and qualities."
  },
  "twist": {
    "prompt": "Assemble: 'The house is white and beautiful'",
    "target_answer": "La casa es blanca y hermosa",
    "word_bank": [
      "es",
      "casa",
      "blanco",
      "hermosa",
      "hermoso",
      "La",
      "El",
      "blanca",
      "y"
    ],
    "explanation": "blanca and hermosa agree with feminine la casa."
  },
  "foreshadow": {
    "line": "Next in Topic 12: how to step into the future using ir a ('going to') + any infinitive.",
    "resolvedIn": 12
  },
  "payoff": {
    "ofLesson": 10,
    "text": "Combine tener and hay from Topic 10 with post-nominal adjectives to describe everything you own or see."
  }
};

export default lesson;
