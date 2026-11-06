import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 302,
  "slug": "quiero-plus-infinitive-gym",
  "title": "Quiero + Infinitive Gym",
  "subtitle": "quiero visitar, quiero participar — stack verbs smoothly without English 'to'",
  "phase": 1,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "preparar",
    "considerar",
    "visitar",
    "participar",
    "terminar",
    "café",
    "querer"
  ],
  "table_word_ids": [
    "preparar",
    "considerar",
    "visitar",
    "participar",
    "terminar",
    "café",
    "querer"
  ],
  "hook": {
    "title": "Flowing Two-Verb Chains",
    "content": "Once you feel that Spanish infinitives already contain the idea of 'to' inside their -ar ending (preparar = 'to prepare', visitar = 'to visit'), chaining verbs becomes effortless."
  },
  "pattern": {
    "title": "Direct Verb-to-Verb Connection",
    "content": "English says 'I want TO prepare the coffee' (six words). Spanish says Quiero preparar el café (four words). Never insert a preposition like *a or *de after quiero!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to prepare",
          "german": "preparar"
        },
        {
          "id": "p2",
          "english": "to consider",
          "german": "considerar"
        },
        {
          "id": "p3",
          "english": "to visit",
          "german": "visitar"
        },
        {
          "id": "p4",
          "english": "to participate",
          "german": "participar"
        },
        {
          "id": "p5",
          "english": "to finish",
          "german": "terminar"
        },
        {
          "id": "p6",
          "english": "the coffee",
          "german": "el café"
        }
      ],
      "target_answer": "preparar, considerar, visitar, participar, terminar, el café",
      "meaning": "to prepare, to consider, to visit, to participate, to finish, the coffee",
      "explanation": "preparación → preparar, consideración → considerar.",
      "id": "es302_e1"
    },
    {
      "type": "derive",
      "prompt": "Convert 'preparación' into its Spanish infinitive verb:",
      "english_hint": "preparación → -ar",
      "target_answer": "preparar",
      "meaning": "to prepare",
      "explanation": "preparación → preparar.",
      "id": "es302_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to prepare the coffee'",
      "target_answer": "Quiero preparar el café",
      "meaning": "I want to prepare the coffee",
      "word_bank": [
        "café",
        "preparar",
        "considerar",
        "visitar",
        "Quiero",
        "el",
        "la"
      ],
      "explanation": "Quiero + preparar + el café — direct verb-to-verb stacking.",
      "id": "es302_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say you want to consider the option",
      "cues": [
        "I want → Quiero",
        "to consider → considerar"
      ],
      "idea_parts": [
        "I want → Quiero",
        "to consider → considerar"
      ],
      "target_answer": "Quiero considerar",
      "meaning": "I want to consider",
      "word_bank": [
        "preparar",
        "considerar",
        "café",
        "Quiero",
        "el"
      ],
      "explanation": "Quiero considerar — two Spanish words for four English words.",
      "id": "es302_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero visitar Madrid",
      "replays": 2,
      "target_answer": "Quiero visitar Madrid",
      "meaning": "I want to visit Madrid",
      "cues": [
        "I want: Quiero",
        "to visit: visitar",
        "city: Madrid"
      ],
      "explanation": "Quiero visitar Madrid — city names follow visitar directly.",
      "affirmation": "Smooth verb + destination chain!",
      "id": "es302_e5"
    }
  ],
  "summary": {
    "outcome": "Stack quiero/quieres + infinitive + direct object smoothly without inserting 'to'.",
    "use_example": {
      "german": "Quiero preparar el café y visitar Madrid.",
      "english": "I want to prepare the coffee and visit Madrid."
    },
    "takeaway": "The -ar ending already means 'to [verb]' — never add an extra word between quiero and the infinitive.",
    "curiosity_teaser": "Up next ([303] The -er & -ir Verb Bridges): unlock Spanish's other two infinitive families (comer, beber, comprender, vivir, decidir)."
  },
  "twist": {
    "prompt": "Assemble: 'Do you want to prepare the coffee?'",
    "target_answer": "Quieres preparar el café",
    "word_bank": [
      "lo",
      "Quiero",
      "Quieres",
      "la",
      "café",
      "preparar",
      "el"
    ],
    "explanation": "¿Quieres preparar el café? asks the question by intonation."
  }
};

export default lesson;
