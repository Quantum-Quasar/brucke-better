import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2901,
  "slug": "everyday-idioms-in-action",
  "title": "Everyday Idioms in Action",
  "subtitle": "tener ganas de ('to feel like'), darse cuenta de ('to realize'), de repente ('suddenly')",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "tener",
    "tengo",
    "tienes",
    "cuenta",
    "hecho",
    "razón",
    "hambre",
    "sed",
    "comer",
    "visitar"
  ],
  "table_word_ids": [
    "tener",
    "tengo",
    "tienes",
    "cuenta",
    "hecho",
    "razón",
    "hambre",
    "sed",
    "comer",
    "visitar"
  ],
  "hook": {
    "title": "Expressing 'I Feel Like...' and 'In Fact'",
    "content": "Whether you are choosing a restaurant or planning a trip, tener hambre, tener sed, tener razón, and de hecho ('in fact') make your Spanish sound immediately warm and idiomatic."
  },
  "pattern": {
    "title": "La Cuenta: Both 'The Restaurant Bill' and 'Account'",
    "content": "Notice how la cuenta (from contar 'to count', o→ue) means 'the bill/check' in a restaurant (La cuenta, por favor) AND 'account/realization' inside darse cuenta de!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the bill / the account",
          "german": "la cuenta"
        },
        {
          "id": "p2",
          "english": "the bill, please",
          "german": "la cuenta, por favor"
        },
        {
          "id": "p3",
          "english": "in fact / actually",
          "german": "de hecho"
        },
        {
          "id": "p4",
          "english": "you are completely right",
          "german": "tienes toda la razón"
        },
        {
          "id": "p5",
          "english": "I am very thirsty",
          "german": "tengo mucha sed"
        }
      ],
      "target_answer": "la cuenta, la cuenta, por favor, de hecho, tienes toda la razón, tengo mucha sed",
      "meaning": "the bill / the account, the bill, please, in fact / actually, you are completely right, I am very thirsty",
      "explanation": "Concrete nouns power everyday Spanish idioms.",
      "id": "es2901_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What are you asking the waiter for when you say '¿Me trae la cuenta, por favor?'?",
      "options": [
        "The salt",
        "The menu",
        "The bill / check ('the count')"
      ],
      "target_answer": "The bill / check ('the count')",
      "meaning": "Will you bring me the bill, please?",
      "explanation": "la cuenta is literally 'the count' of what you ordered.",
      "id": "es2901_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Will you bring me the bill, please?'",
      "target_answer": "Me traes la cuenta por favor",
      "meaning": "Will you bring me the bill, please?",
      "word_bank": [
        "cuenta",
        "Me",
        "traes",
        "por",
        "el",
        "la",
        "gracias",
        "favor",
        "traer"
      ],
      "explanation": "¿Me traes la cuenta, por favor? (from traer 'to bring').",
      "id": "es2901_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'You are right, I want to eat'",
      "cues": [
        "You are right (you have reason) → Tienes razón",
        "I want to eat → quiero comer"
      ],
      "idea_parts": [
        "You are right → Tienes razón",
        "I want to eat → quiero comer"
      ],
      "target_answer": "Tienes razón, quiero comer",
      "meaning": "You are right, I want to eat",
      "word_bank": [
        "hambre",
        "Eres",
        "como",
        "quiero",
        "comer",
        "razón",
        "Tienes"
      ],
      "explanation": "Tienes razón, quiero comer.",
      "id": "es2901_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La cuenta por favor y muchas gracias",
      "replays": 2,
      "target_answer": "La cuenta por favor y muchas gracias",
      "meaning": "The bill, please, and thank you very much",
      "cues": [
        "The bill: La cuenta",
        "please: por favor",
        "and thank you very much: y muchas gracias"
      ],
      "explanation": "La cuenta, por favor, y muchas gracias.",
      "affirmation": "Essential restaurant Spanish mastered!",
      "id": "es2901_e5"
    }
  ],
  "summary": {
    "outcome": "Use la cuenta, de hecho, tener razón, and traer in everyday social settings.",
    "use_example": {
      "german": "Tienes razón — ¿me traes la cuenta, por favor?",
      "english": "You are right — will you bring me the bill, please?"
    },
    "takeaway": "la cuenta = 'the bill/check'; traer = 'to bring'.",
    "curiosity_teaser": "Up next ([2902] Arabic Heritage & Cultural Turns): celebrate the Arabic layer of Spanish (ojalá, azul, hasta) and table culture."
  },
  "twist": {
    "prompt": "Assemble: 'The bill, please'",
    "target_answer": "La cuenta por favor",
    "word_bank": [
      "cuento",
      "favor",
      "gracias",
      "por",
      "El",
      "cuenta",
      "La"
    ],
    "explanation": "La cuenta, por favor."
  }
};

export default lesson;
