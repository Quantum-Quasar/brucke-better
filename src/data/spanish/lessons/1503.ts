import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1503,
  "slug": "tener-expressions-hambre-sed-razon",
  "title": "Tener Expressions: hambre, sed & razón",
  "subtitle": "Possessing physical states with tener: tener hambre (f-→h- famine), tener sed, tener frío/calor, and tener razón ('to be right')",
  "phase": 3,
  "shift_categories": [
    "f_to_h"
  ],
  "word_ids": [
    "hambre",
    "sed",
    "razón",
    "frío",
    "tiempo",
    "mucho",
    "tener",
    "tengo",
    "tienes",
    "tiene"
  ],
  "table_word_ids": [
    "hambre",
    "sed",
    "razón",
    "frío",
    "tiempo",
    "mucho",
    "tener",
    "tengo",
    "tienes",
    "tiene"
  ],
  "hook": {
    "title": "Why You Are Not 'Hungry' or 'Right' — You Have Hunger and Reason!",
    "content": "In English, you say 'I am hungry, I am thirsty, I am cold, I am right' using adjectives after 'to be'. In Spanish (just like French avoir faim), these are NOUNS that you possess with tener:\n• tener hambre = 'to be hungry' (lit. 'to have hunger' — notice Latin faminem shifted initial f- to silent h- in hambre, cousin of English famine!)\n• tener sed = 'to be thirsty' (lit. 'to have thirst')\n• tener frío = 'to be/feel cold' (for a person!)\n• tener razón = 'to be right' (lit. 'to have reason')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'El Hambre' Takes 'Mucha' (Just Like 'El Agua Fría')",
        "content": "Just like el agua, hambre starts with a stressed /a/ sound (even though a silent h is written in front!), so singular 'the hunger' is el hambre — yet the word is 100% feminine, which is why we say mucha hambre!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Why We Say 'Tengo Mucha Hambre' (Not *Muy Hambre)!",
    "content": "Because hambre ('hunger'), sed ('thirst'), frío ('cold'), and razón ('reason') are NOUNS rather than adjectives, how do you say 'I am VERY hungry'? You cannot use muy ('very'); you must say 'I have MUCH hunger' using mucho/mucha: Tengo mucha hambre, Tengo mucha sed, Tengo mucho frío, Tienes toda la razón!",
    "trap_note": "Wait: if a PERSON feels cold, say Tengo frío ('I have cold'). If the WATER is cold, say El agua está fría (state of an object)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am hungry (I have hunger)",
          "german": "tengo hambre"
        },
        {
          "id": "p2",
          "english": "I am very hungry (much hunger, fem.)",
          "german": "tengo mucha hambre"
        },
        {
          "id": "p3",
          "english": "are you thirsty? (do you have thirst?)",
          "german": "¿tienes sed?"
        },
        {
          "id": "p4",
          "english": "you are right (you have reason)",
          "german": "tienes razón"
        },
        {
          "id": "p5",
          "english": "I feel cold (I have cold)",
          "german": "tengo frío"
        }
      ],
      "target_answer": "tengo hambre, tengo mucha hambre, ¿tienes sed?, tienes razón, tengo frío",
      "meaning": "I am hungry (I have hunger), I am very hungry (much hunger, fem.), are you thirsty? (do you have thirst?), you are right (you have reason), I feel cold (I have cold)",
      "explanation": "Physical sensations and 'being right' are nouns possessed with tener.",
      "id": "es1503_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish el/la hambre ('hunger', from Latin faminem with f- → silent h-) shares its root with which English word for extreme food scarcity?",
      "target_answer": "famine",
      "meaning": "hambre and famine are the exact same Latin root (f- → silent h-)!",
      "explanation": "Latin famēs / faminem kept initial f- in English famine and turned f- into silent h- in Spanish hambre.",
      "id": "es1503_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Because 'hambre' and 'sed' are feminine nouns ('hunger', 'thirst'), how do you say 'I am very hungry'?",
      "options": [
        "Tengo mucha hambre",
        "*Tengo muy hambre",
        "*Estoy muy hambre"
      ],
      "target_answer": "Tengo mucha hambre",
      "meaning": "I am very hungry",
      "explanation": "Before a feminine noun, Spanish uses mucha ('much/a lot of'): Tengo mucha hambre.",
      "id": "es1503_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'You are right'",
      "target_answer": "Tienes razón",
      "meaning": "You are right (lit. You have reason)",
      "word_bank": [
        "Estás",
        "Tienes",
        "hambre",
        "Eres",
        "razón"
      ],
      "explanation": "Tienes razón — 'to be right' is tener razón.",
      "id": "es1503_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend if they are hungry and thirsty",
      "cues": [
        "Do you have → ¿Tienes",
        "hunger and thirst → hambre y sed?"
      ],
      "idea_parts": [
        "Do you have → Tienes",
        "hunger and thirst → hambre y sed"
      ],
      "target_answer": "Tienes hambre y sed",
      "meaning": "Are you hungry and thirsty?",
      "word_bank": [
        "Eres",
        "sed",
        "hambre",
        "Tienes",
        "y",
        "razón",
        "Estás"
      ],
      "explanation": "¿Tienes hambre y sed? — one tienes governs both nouns.",
      "diagnosis": {
        "slip": "used Estás for hunger/thirst",
        "cue": "Hunger and thirst are nouns held with tener: ¿Tienes hambre y sed?"
      },
      "id": "es1503_e5"
    }
  ],
  "summary": {
    "outcome": "Express hunger (tener hambre), thirst (tener sed), feeling cold (tener frío), and being right (tener razón) with tener + mucho/mucha.",
    "use_example": {
      "german": "Tienes razón — tengo mucha hambre y mucha sed.",
      "english": "You are right — I am very hungry and very thirsty."
    },
    "takeaway": "Because hambre, sed, frío, and razón are nouns, pair them with tener and intensify them with mucho/mucha (never muy)!",
    "curiosity_teaser": "Up next ([16] Days, Months & Dates): see how the seven Roman planets name the Spanish days of the week."
  },
  "twist": {
    "prompt": "Assemble: 'I am very thirsty'",
    "target_answer": "Tengo mucha sed",
    "word_bank": [
      "mucho",
      "sed",
      "Estoy",
      "muy",
      "Tengo",
      "mucha"
    ],
    "explanation": "la sed is feminine, so 'very thirsty' is Tengo mucha sed ('I have much thirst')."
  }
};

export default lesson;
