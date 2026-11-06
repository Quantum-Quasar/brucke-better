import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 901,
  "slug": "addressing-with-respect",
  "title": "Addressing with Respect",
  "subtitle": "Using 3rd-person verbs with usted: ¿cómo está usted? vs ¿cómo estás?",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "tú",
    "usted",
    "estás",
    "está",
    "eres",
    "es",
    "querer",
    "desear",
    "señor",
    "señora"
  ],
  "table_word_ids": [
    "tú",
    "usted",
    "estás",
    "está",
    "eres",
    "es",
    "querer",
    "desear",
    "señor",
    "señora"
  ],
  "hook": {
    "title": "The '-s' Switch",
    "content": "Because he, she, and usted all share the exact same 3rd-person verb form (está, es, quiere, desea), speakers often include the word usted in questions (¿Cómo está usted?, ¿Qué desea usted?) so the listener knows you are addressing them rather than talking about someone else!"
  },
  "pattern": {
    "title": "Comparing Informal and Formal Side by Side",
    "content": "Informal tú: ¿Cómo estás? / ¿Qué quieres? / ¿Hablas español?\nFormal usted: ¿Cómo está usted? / ¿Qué quiere usted? / ¿Habla usted español?"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "you are (tú, state)",
          "german": "estás"
        },
        {
          "id": "p2",
          "english": "you are (usted, state)",
          "german": "está usted"
        },
        {
          "id": "p3",
          "english": "you are (tú, identity)",
          "german": "eres"
        },
        {
          "id": "p4",
          "english": "you are (usted, identity)",
          "german": "es usted"
        },
        {
          "id": "p5",
          "english": "you want (tú)",
          "german": "quieres"
        },
        {
          "id": "p6",
          "english": "you want (usted)",
          "german": "quiere usted"
        }
      ],
      "target_answer": "estás, está usted, eres, es usted, quieres, quiere usted",
      "meaning": "you are (tú, state), you are (usted, state), you are (tú, identity), you are (usted, identity), you want (tú), you want (usted)",
      "explanation": "Removing the -s from estás/quieres gives the formal usted verb.",
      "id": "es901_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You are speaking to an older stranger on a train. Which question is polite?",
      "options": [
        "¿Habla usted inglés?",
        "¿Hablas tú inglés?",
        "¿Hablar usted inglés?"
      ],
      "target_answer": "¿Habla usted inglés?",
      "meaning": "Do you (formal) speak English?",
      "explanation": "Habla (without -s) pairs with usted.",
      "id": "es901_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Do you (formal) want the coffee?'",
      "target_answer": "Quiere usted el café",
      "meaning": "Do you (formal) want the coffee?",
      "word_bank": [
        "café",
        "el",
        "Quieres",
        "tú",
        "Quiere",
        "la",
        "usted"
      ],
      "explanation": "¿Quiere usted el café? — polite offer.",
      "id": "es901_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a lady politely how she is: 'How are you, madam?'",
      "cues": [
        "How → ¿Cómo",
        "are (usted form) → está",
        "madam → señora?"
      ],
      "idea_parts": [
        "How → Cómo",
        "are (formal) → está",
        "madam → señora"
      ],
      "target_answer": "Cómo está señora",
      "meaning": "How are you, madam?",
      "word_bank": [
        "estás",
        "Cómo",
        "señora",
        "señor",
        "es",
        "está"
      ],
      "explanation": "¿Cómo está, señora? — polite 3rd-person verb without -s.",
      "id": "es901_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Qué desea usted",
      "replays": 2,
      "target_answer": "Qué desea usted",
      "meaning": "What would you like (formal)?",
      "cues": [
        "What: Qué",
        "wishes/desires: desea",
        "you (formal): usted"
      ],
      "explanation": "¿Qué desea usted? — what you will hear in every Spanish shop and restaurant.",
      "affirmation": "Polite service Spanish unlocked!",
      "id": "es901_e5"
    }
  ],
  "summary": {
    "outcome": "Convert informal tú questions into formal usted questions by dropping the verb's final -s.",
    "use_example": {
      "german": "¿Qué desea usted, señor? — Quiero un café, por favor.",
      "english": "What would you like, sir? — I want a coffee, please."
    },
    "takeaway": "tú keeps the -s (estás, quieres); usted drops the -s (está, quiere).",
    "curiosity_teaser": "Up next ([902] The Politeness Toolkit): master muchas gracias, por favor, buenos días, and buenas tardes."
  },
  "twist": {
    "prompt": "Assemble: 'Are you (formal) from Madrid?'",
    "target_answer": "Es usted de Madrid",
    "word_bank": [
      "Madrid",
      "Eres",
      "de",
      "Está",
      "usted",
      "tú",
      "Es"
    ],
    "explanation": "¿Es usted de Madrid? uses es (ser) for origin."
  }
};

export default lesson;
