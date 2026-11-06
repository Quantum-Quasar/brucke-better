import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3002,
  "slug": "trap-watch-false-friends-in-the-wild",
  "title": "Trap Watch: False Friends in the Wild",
  "subtitle": "Mastering all 18 false friends (actualmente, embarazada, librería, éxito, asistir, recordar, sensible, sopa, realizar, lectura, delito, compromiso)",
  "phase": 5,
  "shift_categories": [
    "mente"
  ],
  "word_ids": [
    "actualmente",
    "embarazada",
    "librería",
    "éxito",
    "asistir",
    "recordar",
    "sensible",
    "sopa",
    "libro",
    "hermano"
  ],
  "table_word_ids": [
    "actualmente",
    "embarazada",
    "librería",
    "éxito",
    "asistir",
    "recordar",
    "sensible",
    "sopa",
    "libro",
    "hermano"
  ],
  "hook": {
    "title": "Disarming Every False Friend on the Trail",
    "content": "Because your English-to-Spanish conversion engine is so powerful (unlocking 95%+ of Latinate cognates accurately), knowing the small handful of **False Friends** makes you bulletproof:\n• **actualmente** = currently (actually = *en realidad / de hecho*)\n• **embarazada** = pregnant (embarrassed = *avergonzado*)\n• **la librería** = bookstore (library = *la biblioteca*)\n• **el éxito** = success (exit = *la salida*)\n• **asistir a** = to attend (to assist/help = *ayudar*)\n• **recordar** = to remember (to record = *grabar*)\n• **sensible** = sensitive (sensible = *sensato*)\n• **la sopa** = soup (soap = *el jabón*)\n• **realizar** = to carry out/fulfill (to realize = *darse cuenta de*)\n• **la lectura** = reading (lecture = *la conferencia*)\n• **el delito** = crime/offense (delight = *la delicia*)\n• **el compromiso** = commitment/obligation/engagement!"
  },
  "pattern": {
    "title": "Why False Friends Happened",
    "content": "Every false friend started as a true Latin cognate whose meaning narrowed differently in Madrid and London: Latin *exitus* meant 'outcome' (Spanish kept 'good outcome = success' as *éxito*; English kept 'way out = exit')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "currently (not actually)",
          "german": "actualmente"
        },
        {
          "id": "p2",
          "english": "pregnant (not embarrassed)",
          "german": "embarazada"
        },
        {
          "id": "p3",
          "english": "bookstore (not lending library)",
          "german": "la librería"
        },
        {
          "id": "p4",
          "english": "success (not exit doorway)",
          "german": "el éxito"
        },
        {
          "id": "p5",
          "english": "to attend (not assist/help)",
          "german": "asistir"
        },
        {
          "id": "p6",
          "english": "to remember (not record audio)",
          "german": "recordar"
        }
      ],
      "target_answer": "actualmente, embarazada, la librería, el éxito, asistir, recordar",
      "meaning": "currently (not actually), pregnant (not embarrassed), bookstore (not lending library), success (not exit doorway), to attend (not assist/help), to remember (not record audio)",
      "explanation": "Know both what the Spanish word really means AND how to express the English look-alike!",
      "id": "es3002_e1"
    },
    {
      "type": "shift_select",
      "prompt": "A colleague says 'Hoy tengo un compromiso familiar y no puedo asistir'. What are they telling you?",
      "options": [
        "Today I have a family commitment/obligation and I cannot attend",
        "Today I had a family compromise and I cannot help",
        "Today I am embarrassed and cannot record"
      ],
      "target_answer": "Today I have a family commitment/obligation and I cannot attend",
      "meaning": "Today I have a family commitment and cannot attend",
      "explanation": "un compromiso is a commitment/obligation (or engagement), and asistir is 'to attend'!",
      "id": "es3002_e2"
    },
    {
      "type": "shift_select",
      "prompt": "What is the difference between 'sensible' and 'la sopa' in Spanish?",
      "options": [
        "sensible = 'level-headed'; la sopa = 'soap'",
        "sensible = 'sensitive (tender-hearted)'; la sopa = 'soup' (never soap!)",
        "Both are adjectives"
      ],
      "target_answer": "sensible = 'sensitive (tender-hearted)'; la sopa = 'soup' (never soap!)",
      "meaning": "sensitive and soup",
      "explanation": "Es una persona muy sensible = 'He/she is a very sensitive person'; la sopa está caliente = 'the soup is hot'.",
      "id": "es3002_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to buy the book at the bookstore'",
      "target_answer": "Quiero comprar el libro en la librería",
      "meaning": "I want to buy the book at the bookstore",
      "word_bank": [
        "el",
        "la",
        "libro",
        "comprar",
        "librería",
        "asistir",
        "en",
        "Quiero",
        "biblioteca"
      ],
      "explanation": "You buy books at la librería (bookstore) and borrow them at la biblioteca (library)!",
      "id": "es3002_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you want to remember this magical night",
      "cues": [
        "I want to remember → Quiero recordar",
        "this (feminine) magical night → esta noche mágica"
      ],
      "idea_parts": [
        "I want to remember → Quiero recordar",
        "this magical night → esta noche mágica"
      ],
      "target_answer": "Quiero recordar esta noche mágica",
      "meaning": "I want to remember this magical night",
      "word_bank": [
        "mágico",
        "esta",
        "recordar",
        "mágica",
        "Quiero",
        "este",
        "noche",
        "asistir"
      ],
      "explanation": "Quiero recordar esta noche mágica.",
      "id": "es3002_e5"
    }
  ],
  "summary": {
    "outcome": "Spot and accurately deploy Spanish's key false friends across conversation and reading.",
    "use_example": {
      "german": "Actualmente vivo en Madrid, quiero asistir a la reunión y comprar un libro en la librería.",
      "english": "Currently I live in Madrid, I want to attend the meeting, and buy a book at the bookstore."
    },
    "takeaway": "Always pause on actualmente (currently), librería (bookstore), éxito (success), asistir (attend), recordar (remember), and embarazada (pregnant).",
    "curiosity_teaser": "Up next ([3003] The Whole-Trail Review Game): celebrate completing El Puente with a grand multi-mode synthesis challenge!"
  },
  "twist": {
    "prompt": "Assemble: 'He is a very sensitive person'",
    "target_answer": "Es una persona muy sensible",
    "word_bank": [
      "Está",
      "sopa",
      "una",
      "muy",
      "Es",
      "sensible",
      "persona",
      "un"
    ],
    "explanation": "la persona is always feminine (una persona muy sensible), even when referring to a man!"
  }
};

export default lesson;
