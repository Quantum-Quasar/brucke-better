import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 701,
  "slug": "donde-que-quien-gym",
  "title": "dónde, qué & quién",
  "subtitle": "The accented question words: ¿dónde está?, ¿qué quieres?, ¿quién es?, ¿cuándo?, ¿cuánto?",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "dónde",
    "qué",
    "quién",
    "cuándo",
    "cuánto",
    "cuál",
    "cómo",
    "estar",
    "ser"
  ],
  "table_word_ids": [
    "dónde",
    "qué",
    "quién",
    "cuándo",
    "cuánto",
    "cuál",
    "cómo",
    "estar",
    "ser"
  ],
  "hook": {
    "title": "The Full Interrogative Crew",
    "content": "Meet the complete Spanish question toolkit: ¿dónde? (where), ¿qué? (what), ¿quién? (who — plural ¿quiénes?), ¿cuándo? (when), ¿cuánto? (how much), ¿cómo? (how), and ¿cuál? (which / what)."
  },
  "pattern": {
    "title": "¿Qué es? vs ¿Cuál es?",
    "content": "When asking for a definition ('What is a mesa?'), use ¿Qué es...? When asking someone to identify one item among possibilities ('What is your problem / option / reservation?'), Spanish uses ¿Cuál es...?: ¿Cuál es el problema? ('What is the problem?')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "where?",
          "german": "¿dónde?"
        },
        {
          "id": "p2",
          "english": "what?",
          "german": "¿qué?"
        },
        {
          "id": "p3",
          "english": "who?",
          "german": "¿quién?"
        },
        {
          "id": "p4",
          "english": "when?",
          "german": "¿cuándo?"
        },
        {
          "id": "p5",
          "english": "how much?",
          "german": "¿cuánto?"
        },
        {
          "id": "p6",
          "english": "which / what (before es)?",
          "german": "¿cuál?"
        }
      ],
      "target_answer": "¿dónde?, ¿qué?, ¿quién?, ¿cuándo?, ¿cuánto?, ¿cuál?",
      "meaning": "where?, what?, who?, when?, how much?, which / what (before es)?",
      "explanation": "All six carry a written tilde on the stressed vowel.",
      "id": "es701_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you ask 'What is the problem?' in natural Spanish?",
      "options": [
        "¿Cuál es el problema?",
        "¿Quién es el problema?",
        "¿Qué está el problema?"
      ],
      "target_answer": "¿Cuál es el problema?",
      "meaning": "What is the problem?",
      "explanation": "Before es + noun ('What is the problem/idea/option?'), Spanish prefers ¿Cuál es...?",
      "id": "es701_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Who is he?'",
      "target_answer": "Quién es",
      "meaning": "Who is he / she?",
      "word_bank": [
        "está",
        "Qué",
        "Quién",
        "Dónde",
        "es"
      ],
      "explanation": "¿Quién es? asks for identity, so it pairs with es (ser).",
      "id": "es701_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask where the restaurant is",
      "cues": [
        "Where → ¿Dónde",
        "is (location) → está",
        "the restaurant → el restaurante?"
      ],
      "idea_parts": [
        "Where → Dónde",
        "is (location) → está",
        "the restaurant → el restaurante"
      ],
      "target_answer": "Dónde está el restaurante",
      "meaning": "Where is the restaurant?",
      "word_bank": [
        "está",
        "restaurante",
        "casa",
        "el",
        "Dónde",
        "es",
        "la",
        "Qué"
      ],
      "explanation": "¿Dónde está el restaurante? — dónde + está + subject.",
      "id": "es701_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Dónde está la estación",
      "replays": 2,
      "target_answer": "Dónde está la estación",
      "meaning": "Where is the station?",
      "cues": [
        "Where: Dónde",
        "is (location): está",
        "the station: la estación"
      ],
      "explanation": "¿Dónde está la estación? — the traveler's essential question.",
      "affirmation": "You nailed ¿Dónde está la estación?!",
      "id": "es701_e5"
    }
  ],
  "summary": {
    "outcome": "Ask questions with dónde, qué, quién, cuándo, cuánto, and cuál.",
    "use_example": {
      "german": "¿Dónde está la estación y cuál es el problema?",
      "english": "Where is the station and what is the problem?"
    },
    "takeaway": "Pair ¿dónde? with está (location) and ¿quién? / ¿cuál? with es (identity).",
    "curiosity_teaser": "Up next ([702] por qué vs porque): master the contrast between asking why and answering because."
  },
  "twist": {
    "prompt": "Assemble: 'Where is the house?'",
    "target_answer": "Dónde está la casa",
    "word_bank": [
      "está",
      "casa",
      "es",
      "Qué",
      "la",
      "Dónde",
      "el"
    ],
    "explanation": "¿Dónde está la casa? uses está for location."
  }
};

export default lesson;
