import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2402,
  "slug": "non-literal-and-reciprocal-reflexives",
  "title": "Non-Literal & Reciprocal Reflexives",
  "subtitle": "irse ('to leave'), quedarse ('to stay'), and nos vemos ('we see each other')",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "ir",
    "voy",
    "me",
    "te",
    "se",
    "nos",
    "ver",
    "hablar",
    "mañana",
    "hoy"
  ],
  "table_word_ids": [
    "ir",
    "voy",
    "me",
    "te",
    "se",
    "nos",
    "ver",
    "hablar",
    "mañana",
    "hoy"
  ],
  "hook": {
    "title": "How 'Ir' ('To Go') Becomes 'Irse' ('To Leave / Head Out')!",
    "content": "Look at the difference between ir ('to go [to a destination]': Voy a Madrid) and **irse** ('to leave / to head out from here'): **Me voy** ('I'm leaving / I'm off!'), **¿Ya te vas?** ('Are you leaving already?'), **¡Nos vamos!** ('We're leaving / Let's get out of here!')!"
  },
  "pattern": {
    "title": "Reciprocal Plural: Nos Vemos, Nos Hablamos",
    "content": "With plural subjects (nosotros, ellos), nos and se can mean 'each other': Nos vemos el lunes ('We'll see each other on Monday'), Nos hablamos mañana ('We'll talk to each other tomorrow')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I go (requires a destination: Voy a casa)",
          "german": "voy"
        },
        {
          "id": "p2",
          "english": "I'm leaving / I'm off! (no destination needed)",
          "german": "me voy"
        },
        {
          "id": "p3",
          "english": "are you leaving? (tú)",
          "german": "¿te vas?"
        },
        {
          "id": "p4",
          "english": "we see each other tomorrow",
          "german": "nos vemos mañana"
        },
        {
          "id": "p5",
          "english": "we talk to each other",
          "german": "nos hablamos"
        }
      ],
      "target_answer": "voy, me voy, ¿te vas?, nos vemos mañana, nos hablamos",
      "meaning": "I go (requires a destination: Voy a casa), I'm leaving / I'm off! (no destination needed), are you leaving? (tú), we see each other tomorrow, we talk to each other",
      "explanation": "Adding me/te/se/nos to ir shifts the focus from the destination ('go to') to the departure ('leave').",
      "id": "es2402_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You are standing up from a café table to head home. What do you say for 'I'm leaving now'?",
      "options": [
        "*Voy ahora",
        "*Se voy ahora",
        "Me voy ahora"
      ],
      "target_answer": "Me voy ahora",
      "meaning": "I'm leaving now",
      "explanation": "Me voy means 'I am leaving'; bare Voy requires a destination (Voy a casa).",
      "id": "es2402_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'We will see each other on Monday'",
      "target_answer": "Nos vemos el lunes",
      "meaning": "We'll see each other on Monday",
      "word_bank": [
        "en",
        "Me",
        "Se",
        "Nos",
        "vemos",
        "el",
        "lunes"
      ],
      "explanation": "Nos vemos + el lunes ('on Monday').",
      "id": "es2402_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you are leaving today ('Me voy hoy')",
      "cues": [
        "Myself + I go (= I'm leaving) → Me voy",
        "today → hoy"
      ],
      "idea_parts": [
        "I'm leaving → Me voy",
        "today → hoy"
      ],
      "target_answer": "Me voy hoy",
      "meaning": "I am leaving today",
      "word_bank": [
        "Me",
        "hoy",
        "vas",
        "voy",
        "Te",
        "mañana"
      ],
      "explanation": "Me voy hoy.",
      "id": "es2402_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nos vemos el viernes",
      "replays": 2,
      "target_answer": "Nos vemos el viernes",
      "meaning": "We'll see each other on Friday",
      "cues": [
        "Each other + we see: Nos vemos",
        "on Friday: el viernes"
      ],
      "explanation": "Nos vemos el viernes.",
      "affirmation": "Reciprocal nos vemos mastered!",
      "id": "es2402_e5"
    }
  ],
  "summary": {
    "outcome": "Use me voy / te vas / nos vamos for 'to leave' and nos vemos / nos hablamos for 'each other'.",
    "use_example": {
      "german": "Me voy ahora — ¡nos vemos el viernes!",
      "english": "I'm leaving now — see you on Friday!"
    },
    "takeaway": "voy = 'I go [somewhere]'; me voy = 'I'm leaving!'",
    "curiosity_teaser": "Up next ([5081] De la mañana a la noche): chain the reflexives from wake-up to lights-out!"
  },
  "twist": {
    "prompt": "Assemble: 'Are you leaving today?'",
    "target_answer": "Te vas hoy",
    "word_bank": [
      "Te",
      "vas",
      "Me",
      "ayer",
      "hoy",
      "voy"
    ],
    "explanation": "¿Te vas hoy?"
  }
};

export default lesson;
