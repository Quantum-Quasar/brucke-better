import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 7,
  "slug": "questions-inverted-intonation",
  "title": "Questions: Inverted & Intonation",
  "subtitle": "Inverted question marks ¿?, question words with accents, and por qué vs porque",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "dónde",
    "qué",
    "quién",
    "cuándo",
    "cuánto",
    "cómo",
    "por_qué",
    "porque",
    "aquí",
    "estar"
  ],
  "table_word_ids": [
    "dónde",
    "qué",
    "quién",
    "cuándo",
    "cuánto",
    "cómo",
    "por_qué",
    "porque",
    "aquí",
    "estar"
  ],
  "hook": {
    "title": "Why Spanish Puts ¿ at the Front Door",
    "content": "In English, you can read ten words into a sentence before discovering a '?' at the end and realizing your voice should have gone up. Because Spanish turns statements into yes/no questions purely by vocal melody (¿Quieres café?), Spanish typography invented the opening ¿ in 1754 so readers know to lift their pitch before speaking the very first syllable!"
  },
  "pattern": {
    "title": "Question Words Always Wear a Written Accent — and Flip the Verb",
    "content": "Every Spanish question word carries an acute accent mark (qué 'what', dónde 'where', quién 'who', cuándo 'when', cuánto 'how much', cómo 'how', por qué 'why') to distinguish it from its unstressed connector twin (que 'that', donde 'where', cuando 'when', como 'as/like', porque 'because'). And after a question word, the verb comes immediately before any subject noun: ¿Dónde está el hotel? ('Where is the hotel?').",
    "linguist_note": "The Real Academia Española introduced inverted ¿ and ¡ in its 1754 Ortografía because Spanish syntax does not require auxiliary 'do' to mark interrogatives.",
    "trap_note": "Never use *qué before es when asking for a definition is not intended — for 'What is your problem/option?', Spanish uses ¿Cuál es...? (covered in Sprig 701)."
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
          "english": "why? (two words, accented)",
          "german": "¿por qué?"
        },
        {
          "id": "p6",
          "english": "because (one word, no accent)",
          "german": "porque"
        }
      ],
      "target_answer": "¿dónde?, ¿qué?, ¿quién?, ¿cuándo?, ¿por qué?, porque",
      "meaning": "where?, what?, who?, when?, why? (two words, accented), because (one word, no accent)",
      "explanation": "All interrogatives carry a written accent mark; their relative/connector twins do not.",
      "id": "es7_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Choose the pair that properly separates 'Why?' from 'Because':",
      "options": [
        "¿Porque? — Por qué...",
        "¿Por qué? — Porque...",
        "¿Por que? — Porqué..."
      ],
      "target_answer": "¿Por qué? — Porque...",
      "meaning": "Why? — Because...",
      "explanation": "¿Por qué? ('for what?', two words with accent) asks why; porque (one word, unstressed) answers because.",
      "id": "es7_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Where is the hotel?'",
      "target_answer": "Dónde está el hotel",
      "meaning": "Where is the hotel?",
      "word_bank": [
        "la",
        "hotel",
        "Dónde",
        "está",
        "el",
        "es",
        "aquí"
      ],
      "explanation": "¿Dónde está el hotel? — location always takes está.",
      "id": "es7_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend what they want",
      "cues": [
        "What? → ¿Qué",
        "you want → quieres?"
      ],
      "idea_parts": [
        "What → Qué",
        "do you want → quieres"
      ],
      "target_answer": "Qué quieres",
      "meaning": "What do you want?",
      "word_bank": [
        "quiero",
        "Qué",
        "Dónde",
        "porque",
        "quieres",
        "el"
      ],
      "explanation": "¿Qué quieres? — two words where English needs four ('What do you want?').",
      "id": "es7_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish '¿Por qué no quieres?'?",
      "german": "¿Por qué no quieres?",
      "natural": "Why don't you want to?",
      "options": [
        "For what not want-you?",
        "What for do you want?",
        "Why don't you want to?",
        "Because not you want?"
      ],
      "target_answer": "For what not want-you?",
      "meaning": "Why don't you want to? (literal Spanish blueprint: For what not want-you?)",
      "explanation": "Por qué is literally 'for what?' followed directly by no quieres ('not want-you').",
      "id": "es7_e5"
    }
  ],
  "summary": {
    "outcome": "Ask questions with dónde, qué, quién, cuándo, cómo, and distinguish ¿por qué? from porque.",
    "use_example": {
      "german": "¿Por qué estás aquí? — Porque quiero hablar.",
      "english": "Why are you here? — Because I want to talk."
    },
    "takeaway": "Every question word wears an accent mark — and ¿por qué? (two words) answers with porque (one word).",
    "curiosity_teaser": "Up next ([701] dónde, qué & quién): drill the accented interrogatives across real situations."
  },
  "twist": {
    "prompt": "Assemble: 'Because it is very important'",
    "target_answer": "Porque es muy importante",
    "word_bank": [
      "es",
      "Porque",
      "qué",
      "Por",
      "importante",
      "muy",
      "está"
    ],
    "explanation": "Porque (one word, no accent) means 'because'."
  },
  "foreshadow": {
    "line": "You just passed the Decode Gate! In Topic 8, we enter Phase 2 with two adjective bridges (-ico and -al) that expand your descriptive power.",
    "resolvedIn": 8
  },
  "payoff": {
    "ofLesson": 6,
    "text": "With the nouns and adverbs from Topic 6 in hand, you can now ask and answer 'why' and 'where' about any city, university, or truth."
  }
};

export default lesson;
