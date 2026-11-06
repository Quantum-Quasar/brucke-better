import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5122,
  "slug": "pan-queso-vino-agua-fria",
  "title": "Pan, Queso, Vino & El Agua Fría",
  "subtitle": "Table staples and why feminine agua and hambre take masculine el in the singular (el agua fría)",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "pan",
    "queso",
    "vino",
    "agua",
    "sopa",
    "bocadillo",
    "frío",
    "caliente",
    "rico",
    "con"
  ],
  "table_word_ids": [
    "pan",
    "queso",
    "vino",
    "agua",
    "sopa",
    "bocadillo",
    "frío",
    "caliente",
    "rico",
    "con"
  ],
  "hook": {
    "title": "The Secret of 'El Agua Fría': Masculine Disguise, Feminine Soul!",
    "content": "In Lesson 5021 you learned that **agua** ('water') and **hambre** ('hunger') are feminine nouns that wear masculine **el / un** in the singular to avoid saying two stressed /a/ sounds in a row (*la agua*). Here is the crucial payoff: because *agua* is still 100% FEMININE underneath that disguise, any adjective that follows it MUST be feminine (-a): **el agua fría** ('the cold water', NEVER *el agua frío!), **el agua está muy buena**!"
  },
  "pattern": {
    "title": "Table Staples & 'Está Rico!'",
    "content": "Pair **el pan** ('bread'), **el queso** ('cheese'), **el vino** ('wine'), **la sopa** ('soup'), and **el bocadillo** ('sandwich') with **¡está muy rico / rica!** ('it's delicious!')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the cold water (masculine el, feminine fría!)",
          "german": "el agua fría"
        },
        {
          "id": "p2",
          "english": "bread with cheese",
          "german": "pan con queso"
        },
        {
          "id": "p3",
          "english": "a cheese sandwich",
          "german": "un bocadillo de queso"
        },
        {
          "id": "p4",
          "english": "the hot soup",
          "german": "la sopa caliente"
        },
        {
          "id": "p5",
          "english": "the cake is delicious!",
          "german": "¡el pastel está muy rico!"
        }
      ],
      "target_answer": "el agua fría, pan con queso, un bocadillo de queso, la sopa caliente, ¡el pastel está muy rico!",
      "meaning": "the cold water (masculine el, feminine fría!), bread with cheese, a cheese sandwich, the hot soup, the cake is delicious!",
      "explanation": "el agua is feminine, so its adjectives always take -a (el agua fría).",
      "id": "es5122_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'The water is cold' in Spanish?",
      "options": [
        "El agua está fría",
        "*La agua está fría",
        "*El agua está frío"
      ],
      "target_answer": "El agua está fría",
      "meaning": "The water is cold",
      "explanation": "Singular agua takes el in front, is in a thermal state (está), and triggers feminine agreement on the adjective (fría)!",
      "id": "es5122_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want a cheese sandwich and cold water'",
      "target_answer": "Quiero un bocadillo de queso y agua fría",
      "meaning": "I want a cheese sandwich and cold water",
      "word_bank": [
        "Quiero",
        "una",
        "frío",
        "fría",
        "y",
        "queso",
        "un",
        "bocadillo",
        "agua",
        "de",
        "con"
      ],
      "explanation": "Quiero un bocadillo de queso + y agua fría.",
      "id": "es5122_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the soup is hot and very delicious (rica)",
      "cues": [
        "The soup is (state) → La sopa está",
        "hot → caliente",
        "and very delicious (feminine) → y muy rica"
      ],
      "idea_parts": [
        "The soup is hot → La sopa está caliente",
        "and very delicious → y muy rica"
      ],
      "target_answer": "La sopa está caliente y muy rica",
      "meaning": "The soup is hot and very delicious",
      "word_bank": [
        "caliente",
        "rico",
        "está",
        "rica",
        "muy",
        "La",
        "es",
        "y",
        "sopa",
        "el"
      ],
      "explanation": "La sopa está caliente y muy rica.",
      "id": "es5122_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "El pan y el queso están muy ricos",
      "replays": 2,
      "target_answer": "El pan y el queso están muy ricos",
      "meaning": "The bread and the cheese are very delicious",
      "cues": [
        "The bread and the cheese: El pan y el queso",
        "are (plural state): están",
        "very delicious (m. pl.): muy ricos"
      ],
      "explanation": "El pan y el queso están muy ricos.",
      "affirmation": "El agua fría and table staples mastered!",
      "id": "es5122_e5"
    }
  ],
  "summary": {
    "outcome": "Order food and drink staples and apply feminine adjective agreement to el agua (el agua fría).",
    "use_example": {
      "german": "El agua está fría y la sopa está caliente y muy rica.",
      "english": "The water is cold and the soup is hot and very delicious."
    },
    "takeaway": "el agua wears masculine el in front, but takes feminine adjectives after it: el agua fría!",
    "curiosity_teaser": "Next branch ([5131] Viajes, Trenes & Estaciones): navigate train stations, tickets, and round-trip travel!"
  },
  "twist": {
    "prompt": "Assemble: 'The water is very cold'",
    "target_answer": "El agua está muy fría",
    "word_bank": [
      "frío",
      "muy",
      "es",
      "La",
      "agua",
      "El",
      "está",
      "fría"
    ],
    "explanation": "El agua está muy fría."
  }
};

export default lesson;
