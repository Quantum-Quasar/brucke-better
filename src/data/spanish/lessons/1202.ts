import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1202,
  "slug": "near-future-in-conversation",
  "title": "Near Future in Conversation",
  "subtitle": "Talking about today and tomorrow: mañana voy a organizar, hoy vamos a celebrar",
  "phase": 2,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "mañana",
    "hoy",
    "voy",
    "vas",
    "va",
    "vamos",
    "van",
    "ver",
    "comprar",
    "comer",
    "terminar"
  ],
  "table_word_ids": [
    "mañana",
    "hoy",
    "voy",
    "vas",
    "va",
    "vamos",
    "van",
    "ver",
    "comprar",
    "comer",
    "terminar"
  ],
  "hook": {
    "title": "Why 'Mañana' Means Both 'Tomorrow' and 'Morning'",
    "content": "Look at mañana: used alone as an adverb, mañana means 'tomorrow' (Mañana voy a Madrid). Used with the feminine article, la mañana means 'the morning' (por la mañana = 'in the morning')! So how do you say 'tomorrow morning'? Mañana por la mañana!"
  },
  "pattern": {
    "title": "Planning Today (Hoy) and Tomorrow (Mañana)",
    "content": "Practice building conversational exchanges with ¿Qué vas a hacer hoy? ('What are you going to do today?') and Mañana vamos a..."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "today",
          "german": "hoy"
        },
        {
          "id": "p2",
          "english": "tomorrow",
          "german": "mañana"
        },
        {
          "id": "p3",
          "english": "the morning",
          "german": "la mañana"
        },
        {
          "id": "p4",
          "english": "to see",
          "german": "ver"
        },
        {
          "id": "p5",
          "english": "to buy",
          "german": "comprar"
        },
        {
          "id": "p6",
          "english": "they are going to finish",
          "german": "van a terminar"
        }
      ],
      "target_answer": "hoy, mañana, la mañana, ver, comprar, van a terminar",
      "meaning": "today, tomorrow, the morning, to see, to buy, they are going to finish",
      "explanation": "hoy (silent h) is 'today'; mañana is 'tomorrow' and la mañana is 'the morning'.",
      "id": "es1202_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What does 'mañana por la mañana' mean in English?",
      "options": [
        "yesterday morning",
        "every morning",
        "tomorrow morning"
      ],
      "target_answer": "tomorrow morning",
      "meaning": "tomorrow morning",
      "explanation": "mañana ('tomorrow') + por la mañana ('in the morning') = tomorrow morning.",
      "id": "es1202_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Today I am going to finish'",
      "target_answer": "Hoy voy a terminar",
      "meaning": "Today I am going to finish",
      "word_bank": [
        "a",
        "voy",
        "Hoy",
        "terminar",
        "de",
        "vas",
        "Mañana"
      ],
      "explanation": "Hoy + voy + a + terminar.",
      "id": "es1202_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that tomorrow we are going to buy the book",
      "cues": [
        "Tomorrow → Mañana",
        "we are going to buy → vamos a comprar",
        "the book → el libro"
      ],
      "idea_parts": [
        "Tomorrow → Mañana",
        "we are going to buy → vamos a comprar",
        "the book → el libro"
      ],
      "target_answer": "Mañana vamos a comprar el libro",
      "meaning": "Tomorrow we are going to buy the book",
      "word_bank": [
        "Mañana",
        "la",
        "vamos",
        "libro",
        "voy",
        "Hoy",
        "comprar",
        "a",
        "el"
      ],
      "explanation": "Mañana vamos a comprar el libro.",
      "id": "es1202_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Hoy vamos a comer aquí",
      "replays": 2,
      "target_answer": "Hoy vamos a comer aquí",
      "meaning": "Today we are going to eat here",
      "cues": [
        "Today (silent h): Hoy",
        "we are going to eat: vamos a comer",
        "here: aquí"
      ],
      "explanation": "Hoy vamos a comer aquí.",
      "affirmation": "Clean time marker + near future!",
      "id": "es1202_e5"
    }
  ],
  "summary": {
    "outcome": "Coordinate hoy and mañana with near-future plans across -ar, -er, and -ir verbs.",
    "use_example": {
      "german": "Hoy voy a terminar y mañana vamos a celebrar.",
      "english": "Today I am going to finish and tomorrow we are going to celebrate."
    },
    "takeaway": "hoy has a silent H (from Latin hodiē); mañana serves as both 'tomorrow' and 'morning'.",
    "curiosity_teaser": "Up next ([1203] Pronoun Hook vs Left-Walk: lo quiero vs quiero verlo): master the two legal parking spots for object pronouns in two-verb chains!"
  },
  "twist": {
    "prompt": "Assemble: 'Tomorrow I am going to see Madrid'",
    "target_answer": "Mañana voy a ver Madrid",
    "word_bank": [
      "Madrid",
      "de",
      "voy",
      "ver",
      "Hoy",
      "a",
      "vas",
      "Mañana"
    ],
    "explanation": "Mañana voy a ver Madrid."
  }
};

export default lesson;
