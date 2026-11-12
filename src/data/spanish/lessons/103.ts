import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 103,
  "slug": "the-register-ladder",
  "title": "The Register Ladder",
  "subtitle": "want→desire (desear), go in→enter (entrar), finish→terminate (terminar): formal English revealing everyday Spanish",
  "phase": 1,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "desear",
    "entrar",
    "terminar",
    "preferir",
    "continuar",
    "importante",
    "diferente",
    "posible",
    "imposible"
  ],
  "table_word_ids": [
    "desear",
    "entrar",
    "terminar",
    "preferir",
    "continuar",
    "importante",
    "diferente",
    "posible",
    "imposible"
  ],
  "hook": {
    "title": "Your Fancy English Is Everyday Spanish",
    "content": "Language Transfer's signature insight is the Register Ladder. In English, you have two ways to say almost everything: a casual Germanic phrase ('go in', 'keep on', 'finish', 'want') and a formal Latinate word ('enter', 'continue', 'terminate', 'desire'). What sounds stiff or formal in English is completely natural, everyday street Spanish: entrar ('to go in'), continuar ('to keep going'), terminar ('to finish'), desear ('to wish/want')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'Terminate' Is Cozy in Spanish",
        "content": "In English, Latin words arrived through royal courts, law, and science, so 'terminate' feels cold and technical. In Spain, Latin was the language of the kitchen and the playground — so terminar is simply 'to finish'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Stepping Up in English to Step Across into Spanish",
    "content": "Whenever you get stuck looking for a Spanish word, don't reach for a dictionary — step one rung up the English register ladder! Trade 'finish' for 'terminate' and you have terminar. Trade 'go in' for 'enter' and you have entrar. And adjectives ending in -ante, -ente, or -ble (importante, diferente, posible, imposible) cross over with one s and no gender change!",
    "trap_note": "In Spanish, subject 'it' is invisible! For 'It is important' or 'It is possible', say Es importante / Es posible — never *Lo es importante."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to go in (enter)",
          "german": "entrar"
        },
        {
          "id": "p2",
          "english": "to finish (terminate)",
          "german": "terminar"
        },
        {
          "id": "p3",
          "english": "to wish / desire",
          "german": "desear"
        },
        {
          "id": "p4",
          "english": "to keep going (continue)",
          "german": "continuar"
        },
        {
          "id": "p5",
          "english": "important",
          "german": "importante"
        },
        {
          "id": "p6",
          "english": "possible",
          "german": "posible"
        }
      ],
      "target_answer": "entrar, terminar, desear, continuar, importante, posible",
      "meaning": "to go in (enter), to finish (terminate), to wish / desire, to keep going (continue), important, possible",
      "explanation": "Climbing from phrasal English to Latinate English hands you the everyday Spanish word.",
      "id": "es103_e1"
    },
    {
      "type": "variant_english",
      "prompt": "Select every English sentence that expresses the same thought as 'Quiero terminar y entrar aquí':",
      "german": "Quiero terminar y entrar aquí",
      "meaning": "I want to finish and go in here",
      "renderings": [
        "I want to finish and go in here",
        "I want to complete it and enter here"
      ],
      "traps": [
        "I finished and went out from here",
        "You want to start and wait there"
      ],
      "target_answer": "I want to finish and go in here",
      "explanation": "terminar covers both casual 'finish' and formal 'complete/terminate'; entrar covers both 'go in' and 'enter'!",
      "id": "es103_e2"
    },
    {
      "type": "derive",
      "prompt": "Climb the register ladder from 'finish' to 'terminate' to write the Spanish infinitive:",
      "english_hint": "terminate → -ar verb",
      "target_answer": "terminar",
      "meaning": "to finish",
      "explanation": "terminate → terminar.",
      "id": "es103_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to finish'",
      "target_answer": "Quiero terminar",
      "meaning": "I want to finish",
      "word_bank": [
        "imposible",
        "Quiero",
        "la",
        "el",
        "terminar",
        "entrar"
      ],
      "explanation": "Quiero + terminar — no 'to' needed between quiero and the infinitive.",
      "id": "es103_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that it is very important",
      "cues": [
        "it is (characteristic) → es",
        "very → muy",
        "important → importante"
      ],
      "idea_parts": [
        "is → Es",
        "very → muy",
        "important → importante"
      ],
      "target_answer": "Es muy importante",
      "meaning": "It is very important",
      "word_bank": [
        "Está",
        "imposible",
        "Es",
        "muy",
        "diferente",
        "importante"
      ],
      "explanation": "Es muy importante — Spanish drops subject 'it' because es already carries it.",
      "diagnosis": {
        "slip": "added lo before es",
        "cue": "Never use lo as a subject 'it' before es! Es alone means 'It is'."
      },
      "id": "es103_e5"
    }
  ],
  "summary": {
    "outcome": "Use the English register ladder to unlock entrar, terminar, desear, continuar, importante, and posible.",
    "use_example": {
      "german": "Quiero terminar porque es muy importante.",
      "english": "I want to finish because it is very important."
    },
    "takeaway": "When a casual English word hides the Spanish root, trade it for its formal Latinate synonym.",
    "curiosity_teaser": "Up next ([5011] ¡Hola! y Gracias): the first branch opens — greetings, gracias and politeness in dialogue!"
  },
  "twist": {
    "prompt": "Assemble: 'I want to continue'",
    "target_answer": "Quiero continuar",
    "word_bank": [
      "el",
      "Quiero",
      "terminar",
      "continuar",
      "la"
    ],
    "explanation": "Quiero continuar stacks want + infinitive directly."
  }
};

export default lesson;
