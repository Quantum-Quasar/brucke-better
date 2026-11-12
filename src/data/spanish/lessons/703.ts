import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 703,
  "slug": "lesson-703",
  "title": "The Full Question Gym",
  "subtitle": "dónde, qué, quién, cuándo, cuánto — five questions, statement order, one accent",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "dónde",
    "qué",
    "quién",
    "cuándo",
    "cuánto",
    "cómo",
    "está",
    "es",
    "aquí"
  ],
  "table_word_ids": [
    "dónde",
    "qué",
    "quién",
    "cuándo",
    "cuánto",
    "cómo",
    "está",
    "es",
    "aquí"
  ],
  "hook": {
    "title": "Five Questions, One Trick",
    "content": "Spanish questions never shuffle words. ¿Dónde está la universidad ? keeps statement order, wraps itself in ¿?, and loads the accent onto the question word. Where English says 'Where IS the university?' and moves the verb, Spanish lets the marks and the accent do all the work.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The accent is the question",
        "content": "donde without an accent is a plain relative ('the town where…'); ¿dónde? with the accent is the question. The same pair runs through qué/que, quién/quien, cuándo/cuando, cuánto/cuanto — five words, one accent system.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "¿? + Accent = Question",
    "content": "¿Dónde está la universidad ? ¿Qué quieres ? ¿Quién es ? — the order never moves, the ¿? pair wraps the sentence, and the accented word announces that a question is coming before you hear a single verb.",
    "linguist_note": "The ¿? pair is Spanish's own invention — no other major language opens AND closes the question in punctuation.",
    "trap_note": "Drop the accent and the question dies: donde (no accent) can't ask. If the sentence asks, the question word wears its accent."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each Spanish question with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Where is the university?",
          "german": "¿Dónde está la universidad ?"
        },
        {
          "id": "p2",
          "english": "What do you want?",
          "german": "¿Qué quieres ?"
        },
        {
          "id": "p3",
          "english": "Who is it?",
          "german": "¿Quién es ?"
        },
        {
          "id": "p4",
          "english": "How much is it?",
          "german": "¿Cuánto es ?"
        },
        {
          "id": "p5",
          "english": "here",
          "german": "aquí"
        }
      ],
      "target_answer": "¿Dónde está la universidad ?, ¿Qué quieres ?, ¿Quién es ?, ¿Cuánto es ?, aquí",
      "meaning": "Where is the university?, What do you want?, Who is it?, How much is it?, here",
      "explanation": "Five question words, one shape: accented word + statement order + ¿? marks.",
      "id": "es703_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Ask where the university is:",
      "options": [
        "¿Dónde está la universidad ?",
        "¿Dónde es la universidad ?",
        "¿Donde está la universidad ?"
      ],
      "target_answer": "¿Dónde está la universidad ?",
      "meaning": "Where is the university?",
      "explanation": "Location takes está (estar), and the question word takes its accent: ¿Dónde está… ?",
      "id": "es703_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the accented question word for 'where':",
      "english_hint": "Latin ubi — the cousin of French où",
      "target_answer": "dónde",
      "meaning": "where (question)",
      "explanation": "dónde: the accent is what turns the plain relative into a question.",
      "id": "es703_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Ask me:",
      "idea": "what do you want?",
      "cues": [
        "¿Qué wraps the question",
        "the order stays statement-shaped: quieres after qué"
      ],
      "idea_parts": [
        "question word → ¿Qué",
        "you want → quieres ?"
      ],
      "target_answer": "¿Qué quieres ?",
      "meaning": "What do you want?",
      "word_bank": [
        "Qué",
        "quieres",
        "es",
        "dónde",
        "tú"
      ],
      "explanation": "¿Qué quieres ? — the question word first, the verb second, nothing inverted.",
      "diagnosis": {
        "slip": "dropped the opening ¿",
        "cue": "Spanish questions wear BOTH marks — ¿ opens, ? closes."
      },
      "id": "es703_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "¿Cuánto es ?",
      "replays": 2,
      "target_answer": "¿Cuánto es ?",
      "meaning": "How much is it?",
      "cues": [
        "It means: How much is it?",
        "Both marks: ¿… ?"
      ],
      "explanation": "¿Cuánto es ? — the question you will ask most at any Spanish market.",
      "affirmation": "You wrote the double-marked question exactly as spoken.",
      "id": "es703_e5"
    }
  ],
  "summary": {
    "outcome": "Ask with dónde, qué, quién, cuándo and cuánto using ¿?, the accent, and statement order.",
    "use_example": {
      "german": "¿Dónde está la universidad ?",
      "english": "Where is the university?"
    },
    "takeaway": "No word moves — ¿?, the accent, and the verb do all the work.",
    "curiosity_teaser": "Up next ([8] The -ico & -al Bridges): cross the Decode Gate into Topic 8 and unlock hundreds of adjectives in -ico and -al!"
  },
  "twist": {
    "prompt": "One more, no safety net — ask where the university is:",
    "target_answer": "¿Dónde está la universidad ?",
    "word_bank": [
      "Dónde",
      "está",
      "la",
      "universidad",
      "es",
      "aquí"
    ],
    "explanation": "Rebuilding \"¿Dónde está la universidad ?\" — accent, estar, statement order."
  }
};

export default lesson;
