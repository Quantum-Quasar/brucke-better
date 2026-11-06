import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 101,
  "slug": "zero-shift-places-cognates",
  "title": "Hidden Twins: Places & Colors",
  "subtitle": "Direct cognates gym: la casa, el hotel, azul, rojo, grande, pequeño",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "casa",
    "hotel",
    "mesa",
    "restaurante",
    "azul",
    "rojo",
    "grande",
    "pequeño",
    "es"
  ],
  "table_word_ids": [
    "casa",
    "hotel",
    "mesa",
    "restaurante",
    "azul",
    "rojo",
    "grande",
    "pequeño",
    "es"
  ],
  "hook": {
    "title": "Direct Cognates in Everyday Space",
    "content": "Many foundational Spanish words require no sound shift at all. The house: la casa (cousin of Italian casino, literally 'little house'). The hotel: el hotel, identical spelling with a silent initial H. The table is la mesa — which English borrowed in the American Southwest for a flat-topped 'table' mountain! Blue is azul (English azure), and red is rojo (ruby/russet).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why a Flat-Topped Mountain Is Called a 'Mesa'",
        "content": "Spanish explorers in the American Southwest saw flat-topped plateaus and named them mesas ('tables', from Latin mēnsa). Every time you say 'mesa' in English geography, you are speaking Spanish!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Noun First, Color Second — and Invariable grande",
    "content": "In Spanish, you paint the object first and color it second: la casa azul ('the house blue'), el hotel grande ('the hotel big'). And notice how grande ends in -e, making it gender-invariable in the singular: el hotel grande and la casa grande use the exact same form!",
    "trap_note": "Never pronounce the H in hotel or hola. In Spanish, H is a silent historical ornament."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the house",
          "german": "la casa"
        },
        {
          "id": "p2",
          "english": "the hotel",
          "german": "el hotel"
        },
        {
          "id": "p3",
          "english": "the table",
          "german": "la mesa"
        },
        {
          "id": "p4",
          "english": "blue",
          "german": "azul"
        },
        {
          "id": "p5",
          "english": "red",
          "german": "rojo"
        },
        {
          "id": "p6",
          "english": "big / grand",
          "german": "grande"
        }
      ],
      "target_answer": "la casa, el hotel, la mesa, azul, rojo, grande",
      "meaning": "the house, the hotel, the table, blue, red, big / grand",
      "explanation": "All are living cognates: casa in casino, hotel in hospital, mesa in Southwest geography, azul in azure, grande in grand.",
      "id": "es101_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish azul ('blue', from Arabic lāzaward 'lapis lazuli') entered English as which sky-blue color word?",
      "target_answer": "azure",
      "meaning": "azure and azul are the exact same Arabic-Persian stone name",
      "explanation": "Medieval merchants traded lapis lazuli across the Mediterranean, giving Spanish azul and English azure.",
      "id": "es101_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which phrase properly places the adjective after the noun for 'the big restaurant'?",
      "options": [
        "la restaurante grande",
        "el restaurante grande",
        "el grande restaurante"
      ],
      "target_answer": "el restaurante grande",
      "meaning": "the big restaurant",
      "explanation": "el restaurante is masculine, and descriptive adjectives follow the noun: el restaurante grande.",
      "id": "es101_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The house is big'",
      "target_answer": "La casa es grande",
      "meaning": "The house is big",
      "word_bank": [
        "es",
        "hotel",
        "La",
        "azul",
        "El",
        "pequeño",
        "grande",
        "casa"
      ],
      "explanation": "La casa (the house) + es (is) + grande (big). grande stays identical for masculine and feminine nouns.",
      "id": "es101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "El hotel es grande",
      "replays": 2,
      "target_answer": "El hotel es grande",
      "meaning": "The hotel is big",
      "cues": [
        "The hotel: el hotel (silent H)",
        "is: es",
        "big: grande"
      ],
      "explanation": "El hotel es grande — direct cognate noun with invariable adjective.",
      "affirmation": "You heard the silent-H cognate and the invariable adjective in one clean sweep.",
      "id": "es101_e5"
    }
  ],
  "summary": {
    "outcome": "Recognize direct place cognates, silence Spanish H, and place descriptive adjectives after the noun.",
    "use_example": {
      "german": "La casa es grande y el hotel es azul.",
      "english": "The house is big and the hotel is blue."
    },
    "takeaway": "Spanish paints the noun first and colors it second — and adjectives in -e like grande never change for gender.",
    "curiosity_teaser": "Up next ([102] First Sentences Gym): assemble questions and answers using quiero and quieres."
  },
  "twist": {
    "prompt": "Assemble: 'The house is blue'",
    "target_answer": "La casa es azul",
    "word_bank": [
      "rojo",
      "casa",
      "hotel",
      "azul",
      "es",
      "El",
      "La"
    ],
    "explanation": "La casa es azul — es links the subject and color."
  }
};

export default lesson;
