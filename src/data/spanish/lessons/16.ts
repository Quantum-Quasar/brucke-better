import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 16,
  "slug": "days-months-dates",
  "title": "Days, Months & Dates",
  "subtitle": "lunes, martes, en enero — calendar vocabulary and scheduling meetings",
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
    "semana",
    "enero",
    "el"
  ],
  "table_word_ids": [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
    "semana",
    "enero",
    "el"
  ],
  "hook": {
    "title": "The Seven Planets Inside Your Week",
    "content": "Look at Monday through Friday in Spanish: every single day is named after a celestial body from Roman astronomy! lunes = Moon-day (lunar), martes = Mars-day (martial), miércoles = Mercury-day, jueves = Jove/Jupiter-day, viernes = Venus-day! Then the weekend arrives from Judeo-Christian history: sábado (Sabbath) and domingo (Latin dies Dominicus, 'Day of the Lord')!"
  },
  "pattern": {
    "title": "Why Spanish Says 'El Lunes' (Never *En Lunes) for 'On Monday'!",
    "content": "In English, you say 'ON Monday' and 'ON Mondays'. In Spanish, you NEVER use a preposition like *en before a day of the week! Instead, the masculine article el / los does all the work: el lunes = 'on Monday'; los lunes = 'on Mondays / every Monday'! Months, on the other hand, DO take en: en enero ('in January'). Notice also that neither days nor months are capitalized in Spanish!",
    "linguist_note": "Latin diēs Lūnae, Mārtis, Mercuriī, Iovis, Veneris dropped the word diēs while keeping its masculine gender.",
    "trap_note": "Because lunes, martes, miércoles, jueves, and viernes already end in unstressed -es, their plural form doesn't change at all: el lunes ('on Monday') → los lunes ('on Mondays')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Monday (Moon-day)",
          "german": "el lunes"
        },
        {
          "id": "p2",
          "english": "Tuesday (Mars-day)",
          "german": "el martes"
        },
        {
          "id": "p3",
          "english": "Wednesday (Mercury-day)",
          "german": "el miércoles"
        },
        {
          "id": "p4",
          "english": "Thursday (Jupiter-day)",
          "german": "el jueves"
        },
        {
          "id": "p5",
          "english": "Friday (Venus-day)",
          "german": "el viernes"
        },
        {
          "id": "p6",
          "english": "Saturday / Sunday",
          "german": "el sábado / el domingo"
        }
      ],
      "target_answer": "el lunes, el martes, el miércoles, el jueves, el viernes, el sábado / el domingo",
      "meaning": "Monday (Moon-day), Tuesday (Mars-day), Wednesday (Mercury-day), Thursday (Jupiter-day), Friday (Venus-day), Saturday / Sunday",
      "explanation": "All seven days of the week are masculine and written in lowercase.",
      "id": "es16_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am going to Madrid on Monday' in Spanish?",
      "options": [
        "*Voy a Madrid a lunes",
        "Voy a Madrid el lunes",
        "*Voy a Madrid en lunes"
      ],
      "target_answer": "Voy a Madrid el lunes",
      "meaning": "I am going to Madrid on Monday",
      "explanation": "The masculine article el means 'on [weekday]': el lunes.",
      "id": "es16_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'On Fridays we celebrate'",
      "target_answer": "El viernes vamos a celebrar",
      "meaning": "On Friday we are going to celebrate",
      "word_bank": [
        "El",
        "sábado",
        "La",
        "viernes",
        "En",
        "vamos",
        "a",
        "celebrar"
      ],
      "explanation": "El viernes ('On Friday') + vamos a celebrar ('we are going to celebrate').",
      "id": "es16_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you have time this week",
      "cues": [
        "I have time → Tengo tiempo",
        "this (feminine to match la semana) → esta",
        "week → semana"
      ],
      "idea_parts": [
        "I have time → Tengo tiempo",
        "this week → esta semana"
      ],
      "target_answer": "Tengo tiempo esta semana",
      "meaning": "I have time this week",
      "word_bank": [
        "semana",
        "lunes",
        "Tengo",
        "tiempo",
        "este",
        "en",
        "esta"
      ],
      "explanation": "Tengo tiempo esta semana — la semana is feminine, so 'this week' is esta semana.",
      "id": "es16_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'El lunes voy a Madrid'?",
      "german": "El lunes voy a Madrid",
      "natural": "On Monday I am going to Madrid",
      "options": [
        "On Monday I am going to Madrid",
        "The Monday I-go to Madrid",
        "In Monday I go Madrid",
        "At the Monday going to Madrid"
      ],
      "target_answer": "The Monday I-go to Madrid",
      "meaning": "On Monday I am going to Madrid (literal Spanish blueprint: The Monday I-go to Madrid)",
      "explanation": "Spanish uses the definite article ('The Monday') where English uses 'On Monday'.",
      "id": "es16_e5"
    }
  ],
  "summary": {
    "outcome": "Name the days of the week, express 'on Monday / on Mondays' with el / los, and use en with months.",
    "use_example": {
      "german": "El lunes voy a Madrid y el viernes vamos a celebrar.",
      "english": "On Monday I am going to Madrid and on Friday we are going to celebrate."
    },
    "takeaway": "Days of the week take el ('on Monday') and los ('on Mondays') — never *en lunes!",
    "curiosity_teaser": "Up next ([1601] The Days of the Planets): see why lunes through viernes stay identical in the plural."
  },
  "twist": {
    "prompt": "Assemble: 'In January it is cold (hay frío -> tengo frío)'",
    "target_answer": "En enero tengo frío",
    "word_bank": [
      "enero",
      "El",
      "En",
      "lunes",
      "hambre",
      "tengo",
      "frío"
    ],
    "explanation": "Months take en: En enero tengo frío."
  },
  "foreshadow": {
    "line": "Now that you can anchor events on the calendar, Topic 17 unlocks your first past tense: the -ado / -ido past with haber!",
    "resolvedIn": 17
  },
  "payoff": {
    "ofLesson": 15,
    "text": "Notice how miércoles, jueves, and viernes show the exact same e→ie and o→ue vowel shifts you saw in Topic 15's numbers (siete, nueve, diez)!"
  }
};

export default lesson;
