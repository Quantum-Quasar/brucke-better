import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2101,
  "slug": "superiority-and-inferiority",
  "title": "Superiority and Inferiority",
  "subtitle": "más grande que, menos caro que, and superlatives el/la más grande",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "más",
    "menos",
    "grande",
    "pequeño",
    "importante",
    "económico",
    "hermoso",
    "ciudad",
    "hotel"
  ],
  "table_word_ids": [
    "más",
    "menos",
    "grande",
    "pequeño",
    "importante",
    "económico",
    "hermoso",
    "ciudad",
    "hotel"
  ],
  "hook": {
    "title": "How 'Bigger' Becomes 'The Biggest' Just by Adding 'El / La'!",
    "content": "Here is a wonderful two-for-one bargain: once you know how to say 'bigger' (más grande) or 'more beautiful' (más hermosa), how do you say 'THE biggest' or 'THE most beautiful'? You don't change the word at all — just put the definite article el/la/los/las in front of the noun (or pronoun): el hotel más grande ('the biggest hotel'), la ciudad más hermosa ('the most beautiful city')!"
  },
  "pattern": {
    "title": "Why Superlatives Use 'De' for 'In'",
    "content": "When English says 'the biggest city IN the world / IN Spain', Spanish uses de ('of'): la ciudad más grande de España ('the biggest city of Spain')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "bigger than",
          "german": "más grande que"
        },
        {
          "id": "p2",
          "english": "the biggest hotel",
          "german": "el hotel más grande"
        },
        {
          "id": "p3",
          "english": "less economical than",
          "german": "menos económico que"
        },
        {
          "id": "p4",
          "english": "the most beautiful city",
          "german": "la ciudad más hermosa"
        },
        {
          "id": "p5",
          "english": "more important than",
          "german": "más importante que"
        }
      ],
      "target_answer": "más grande que, el hotel más grande, menos económico que, la ciudad más hermosa, más importante que",
      "meaning": "bigger than, the biggest hotel, less economical than, the most beautiful city, more important than",
      "explanation": "Adding el/la before the noun turns más [adj] from 'more/-er' into 'the most/-est'!",
      "id": "es2101_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'It is the most important city'?",
      "options": [
        "*Es la más importante ciudad",
        "Es la ciudad más importante",
        "*Es la ciudad muy importante"
      ],
      "target_answer": "Es la ciudad más importante",
      "meaning": "It is the most important city",
      "explanation": "Keep noun-first order: la ciudad + más importante.",
      "id": "es2101_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'This hotel is more economical than that one'",
      "target_answer": "Este hotel es más económico que ese",
      "meaning": "This hotel is more economical than that one",
      "word_bank": [
        "ese",
        "es",
        "menos",
        "que",
        "hotel",
        "como",
        "más",
        "Este",
        "esto",
        "económico"
      ],
      "explanation": "Este hotel es + más económico + que + ese.",
      "id": "es2101_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that it is the biggest house",
      "cues": [
        "It is → Es",
        "the house (noun first!) → la casa",
        "most big → más grande"
      ],
      "idea_parts": [
        "It is → Es",
        "the biggest house → la casa más grande"
      ],
      "target_answer": "Es la casa más grande",
      "meaning": "It is the biggest house",
      "word_bank": [
        "el",
        "que",
        "mejor",
        "grande",
        "la",
        "casa",
        "Es",
        "más"
      ],
      "explanation": "Es la casa más grande.",
      "id": "es2101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es la ciudad más hermosa",
      "replays": 2,
      "target_answer": "Es la ciudad más hermosa",
      "meaning": "It is the most beautiful city",
      "cues": [
        "It is: Es",
        "the city: la ciudad",
        "most beautiful: más hermosa"
      ],
      "explanation": "Es la ciudad más hermosa.",
      "affirmation": "Superlative structure mastered!",
      "id": "es2101_e5"
    }
  ],
  "summary": {
    "outcome": "Form comparatives with más/menos... que and superlatives with el/la + noun + más/menos + adjective.",
    "use_example": {
      "german": "Este hotel es más económico que ese y esta es la ciudad más hermosa.",
      "english": "This hotel is more economical than that one and this is the most beautiful city."
    },
    "takeaway": "el/la + noun + más [adj] = 'the most [adj] / the [adj]-est'.",
    "curiosity_teaser": "Up next ([2102] Equality and Irregulars): master tan... como, mejor ('better/best'), and peor ('worse/worst')."
  },
  "twist": {
    "prompt": "Assemble: 'It is less important'",
    "target_answer": "Es menos importante",
    "word_bank": [
      "que",
      "más",
      "Es",
      "tan",
      "menos",
      "importante"
    ],
    "explanation": "Es menos importante."
  }
};

export default lesson;
