import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 102,
  "slug": "first-sentences-gym",
  "title": "First Sentences Gym",
  "subtitle": "Quiero el… pattern drills: assemble simple sentences and intonation questions",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "pastel",
    "café",
    "mesa",
    "restaurante",
    "minuto",
    "momento",
    "querer",
    "tú",
    "lo",
    "un_poco"
  ],
  "table_word_ids": [
    "pastel",
    "café",
    "mesa",
    "restaurante",
    "minuto",
    "momento",
    "querer",
    "tú",
    "lo",
    "un_poco"
  ],
  "hook": {
    "title": "Turning Words into Living Speech",
    "content": "Individual words are inert; syntax brings them to life. With quiero ('I want') and quieres ('you want'), you can already build statements, questions, and pronoun replies at a Spanish café table."
  },
  "pattern": {
    "title": "Questions by Vocal Melody Alone",
    "content": "In English, asking a question requires dragging in the helper verb 'do': 'Do you want the coffee?'. Spanish needs no helper verb at all! Keep the exact same words — ¿Quieres el café? — and simply raise your voice at the end. In writing, Spanish kindly warns you at the start of the sentence with an inverted question mark ¿ so you know to lift your pitch from syllable one!",
    "trap_note": "Never try to translate English 'do' at the start of a question. Start directly with the verb or pronoun: ¿Quieres...?"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I want",
          "german": "quiero"
        },
        {
          "id": "p2",
          "english": "you want (informal)",
          "german": "quieres"
        },
        {
          "id": "p3",
          "english": "one minute",
          "german": "un minuto"
        },
        {
          "id": "p4",
          "english": "one moment",
          "german": "un momento"
        },
        {
          "id": "p5",
          "english": "the table",
          "german": "la mesa"
        },
        {
          "id": "p6",
          "english": "it (masculine)",
          "german": "lo"
        }
      ],
      "target_answer": "quiero, quieres, un minuto, un momento, la mesa, lo",
      "meaning": "I want, you want (informal), one minute, one moment, the table, it (masculine)",
      "explanation": "quiero (-o = I) and quieres (-es = you) let you ask and answer immediately.",
      "id": "es102_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build the informal 'you want' form of querer by pairing stem and ending:",
      "tile_options": [
        "es",
        "quier",
        "o",
        "an"
      ],
      "target_answer": "quieres",
      "meaning": "quieres (you want)",
      "explanation": "quier- + -es gives tú quieres ('you want').",
      "id": "es102_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Do you want the coffee?'",
      "target_answer": "Quieres el café",
      "meaning": "Do you want the coffee?",
      "word_bank": [
        "Quieres",
        "café",
        "Quiero",
        "el",
        "pastel",
        "mesa",
        "la"
      ],
      "explanation": "¿Quieres el café? — no 'do' helper exists in Spanish; vocal melody asks the question.",
      "id": "es102_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend whether they want it (referring to the masculine cake)",
      "cues": [
        "it (masculine) walks left: lo",
        "you want: quieres",
        "rising voice makes it a question"
      ],
      "idea_parts": [
        "it → lo",
        "you want → quieres",
        "question → ¿Lo quieres?"
      ],
      "target_answer": "Lo quieres",
      "meaning": "Do you want it?",
      "word_bank": [
        "café",
        "quieres",
        "el",
        "Lo",
        "quiero",
        "La"
      ],
      "explanation": "¿Lo quieres? — the pronoun walks before the verb, and intonation turns it into a question.",
      "diagnosis": {
        "slip": "put lo after quieres",
        "cue": "Even in a question, the object pronoun stays right in front of the verb: ¿Lo quieres?"
      },
      "id": "es102_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish '¿Quieres el pastel?'?",
      "german": "¿Quieres el pastel?",
      "natural": "Do you want the cake?",
      "options": [
        "Do want the cake?",
        "You wants the cake?",
        "Want-you the cake?",
        "Do you want the cake?"
      ],
      "target_answer": "Want-you the cake?",
      "meaning": "Do you want the cake? (literal Spanish blueprint: Want-you the cake?)",
      "explanation": "Spanish packs 'do you want' into a single inflected word: quieres ('want-you').",
      "id": "es102_e5"
    }
  ],
  "summary": {
    "outcome": "Ask questions by intonation alone and pair quiero/quieres with everyday café nouns.",
    "use_example": {
      "german": "¿Quieres el café? — Sí, lo quiero.",
      "english": "Do you want the coffee? — Yes, I want it."
    },
    "takeaway": "Spanish has no auxiliary 'do' — your voice melody turns any statement into a question.",
    "curiosity_teaser": "Up next ([103] The Register Ladder): climb from everyday English into Latinate English to unlock Spanish verbs."
  },
  "twist": {
    "prompt": "Assemble: 'I want the cake, a little'",
    "target_answer": "Quiero el pastel, un poco",
    "word_bank": [
      "el",
      "poco",
      "mesa",
      "un",
      "la",
      "pastel",
      "Quiero",
      "Quieres"
    ],
    "explanation": "Quiero el pastel, un poco combines verb, object, and qualifier."
  }
};

export default lesson;
