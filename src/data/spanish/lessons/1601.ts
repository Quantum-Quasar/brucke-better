import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1601,
  "slug": "days-of-the-planets",
  "title": "The Days of the Planets",
  "subtitle": "lunes (Moon), martes (Mars), miércoles (Mercury), jueves (Jove), viernes (Venus), sábado, domingo",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
    "semana"
  ],
  "table_word_ids": [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
    "semana"
  ],
  "hook": {
    "title": "Why Lunes–Viernes End in '-es'",
    "content": "Where did the final -es on lunes, martes, miércoles, jueves, and viernes come from? From the Latin genitive ending -is ('of the Moon, of Mars, of Mercury, of Jove, of Venus')! And because they already end in an unstressed syllable with -s, only sábado (los sábados) and domingo (los domingos) add an -s in the plural!"
  },
  "pattern": {
    "title": "Esdrújula Accents on Miércoles and Sábado",
    "content": "Remember our Topic 8 rule that third-from-last syllable stress always wears a written accent mark? Look at MIÉR-co-les and SÁ-ba-do!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Monday (Moon)",
          "german": "lunes"
        },
        {
          "id": "p2",
          "english": "Tuesday (Mars)",
          "german": "martes"
        },
        {
          "id": "p3",
          "english": "Wednesday (Mercury, accented!)",
          "german": "miércoles"
        },
        {
          "id": "p4",
          "english": "Thursday (Jupiter)",
          "german": "jueves"
        },
        {
          "id": "p5",
          "english": "Friday (Venus)",
          "german": "viernes"
        },
        {
          "id": "p6",
          "english": "Saturday (accented!) / Sunday",
          "german": "sábado / domingo"
        }
      ],
      "target_answer": "lunes, martes, miércoles, jueves, viernes, sábado / domingo",
      "meaning": "Monday (Moon), Tuesday (Mars), Wednesday (Mercury, accented!), Thursday (Jupiter), Friday (Venus), Saturday (accented!) / Sunday",
      "explanation": "miércoles and sábado carry esdrújula accents.",
      "id": "es1601_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'on Mondays' (every Monday) vs 'on Sundays' (every Sunday)?",
      "options": [
        "los lunes / los domingos",
        "en lunes / en domingos",
        "los luneses / los domingos"
      ],
      "target_answer": "los lunes / los domingos",
      "meaning": "on Mondays / on Sundays",
      "explanation": "lunes stays unchanged after los (los lunes); domingo adds -s (los domingos).",
      "id": "es1601_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Today is Friday'",
      "target_answer": "Hoy es viernes",
      "meaning": "Today is Friday",
      "word_bank": [
        "está",
        "el",
        "es",
        "Hoy",
        "viernes",
        "jueves"
      ],
      "explanation": "Hoy es viernes — naming what day today is uses es without an article.",
      "id": "es1601_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that on Saturday we are going to the movies (al cine)",
      "cues": [
        "On Saturday → El sábado",
        "we are going → vamos",
        "to the cinema (a + el) → al cine"
      ],
      "idea_parts": [
        "On Saturday → El sábado",
        "we are going to the cinema → vamos al cine"
      ],
      "target_answer": "El sábado vamos al cine",
      "meaning": "On Saturday we are going to the movies",
      "word_bank": [
        "domingo",
        "al",
        "En",
        "vamos",
        "la",
        "sábado",
        "El",
        "cine"
      ],
      "explanation": "El sábado vamos al cine.",
      "id": "es1601_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Mañana es miércoles",
      "replays": 2,
      "target_answer": "Mañana es miércoles",
      "meaning": "Tomorrow is Wednesday",
      "cues": [
        "Tomorrow: Mañana",
        "is: es",
        "Wednesday (accent on é): miércoles"
      ],
      "explanation": "Mañana es miércoles.",
      "affirmation": "Clean esdrújula accent on miércoles!",
      "id": "es1601_e5"
    }
  ],
  "summary": {
    "outcome": "Use all seven weekdays in singular and habitual plural (el lunes / los lunes) and state what day it is with es.",
    "use_example": {
      "german": "Hoy es jueves y mañana es viernes.",
      "english": "Today is Thursday and tomorrow is Friday."
    },
    "takeaway": "Hoy es lunes ('Today is Monday', no article) vs El lunes voy ('On Monday I go', with el).",
    "curiosity_teaser": "Up next ([1602] Dates & Appointments): combine numbers, el, and de to express calendar dates."
  },
  "twist": {
    "prompt": "Assemble: 'On Tuesday I am going to visit Madrid'",
    "target_answer": "El martes voy a visitar Madrid",
    "word_bank": [
      "El",
      "Madrid",
      "voy",
      "miércoles",
      "En",
      "visitar",
      "vas",
      "a",
      "martes"
    ],
    "explanation": "El martes = 'On Tuesday'."
  }
};

export default lesson;
