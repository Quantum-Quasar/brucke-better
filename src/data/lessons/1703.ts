import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1703,
  "slug": "clock-and-calendar-gym",
  "title": "Clock & Calendar Gym",
  "subtitle": "Wie viel Uhr ist es? — telling time, halb past and all",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "uhr",
    "halb",
    "morgen",
    "heute",
    "gestern",
    "zwölf",
    "drei",
    "sein",
    "wochenende",
    "sommer",
    "winter",
    "hundert",
    "minute",
    "zählen"
  ],
  "table_word_ids": [
    "uhr",
    "halb",
    "zwölf",
    "drei",
    "morgen",
    "heute",
    "gestern",
    "sein",
    "wochenende",
    "sommer",
    "winter",
    "hundert",
    "minute",
    "zählen",
    "grillen",
    "stau"
  ],
  "hook": {
    "title": "Half Past Seven Is Half TO Eight",
    "content": "One clock, two mentalities. Formal German reads it straight: Es ist drei Uhr — it is three o'clock, exactly like English. But the half hour betrays the older mind: halb acht is NOT half past seven — it is 'half of the way TO eight', seven-thirty. English 'half past seven' counts from the hour that just passed; German halb acht counts toward the hour that is coming. Once you catch the logic, the whole colloquial clock opens: Viertel nach sieben (quarter after seven), Viertel vor acht (quarter to eight).",
    "footnotes": [
      {
        "marker": "1",
        "title": "halb's Hidden Twin",
        "content": "halb ↔ half — the f/v→b shift in action, one of the quiet family words. Es ist halb acht: the same 'half', counting in the opposite direction."
      }
    ]
  },
  "pattern": {
    "title": "Two Clocks, One Answer",
    "content": "Formal (always safe): Es ist sieben Uhr dreißig — seven thirty, digits read aloud. Colloquial, moving forward: Viertel nach sieben (7:15), halb acht (7:30!), fünf nach halb acht (7:35). Colloquial, approaching: Viertel vor acht (7:45), zehn vor acht (7:50). Questions: Wie viel Uhr ist es? (literally 'how much clock is it?') or the idiom Wie spät ist es? ('how late is it?'). Calendar glue: gestern, heute, morgen slot before the time: Morgen um acht Uhr — tomorrow at eight. At? = um. Um acht Uhr trinken wir Kaffee.",
    "footnotes": [],
    "linguist_note": "halb acht's 'half toward' logic once existed in English too — archaic texts say 'half seven' the same way. English standardized on 'half past'; German kept the older directional count."
  },
  "exercises": [
    {
      "id": "l1703_e1",
      "type": "shift_select",
      "prompt": "Trap drill: 'Es ist halb acht.' What time is it?",
      "options": [
        "7:30 — halfway to eight",
        "8:15",
        "8:30 — half past eight",
        "7:00"
      ],
      "target_answer": "7:30 — halfway to eight",
      "meaning": "halb acht = half (of the way) TO eight = 7:30",
      "explanation": "German counts the half toward the coming hour; English 'half past' counts from the finished one. One habit flip."
    },
    {
      "id": "l1703_e2",
      "type": "matching_pairs",
      "prompt": "Match each time phrase with its English meaning — the clock and the calendar:",
      "matching_pairs": [
        {
          "id": "ck1",
          "english": "It is three o'clock",
          "german": "Es ist drei Uhr"
        },
        {
          "id": "ck2",
          "english": "quarter past twelve",
          "german": "Viertel nach zwölf"
        },
        {
          "id": "ck3",
          "english": "quarter to eight",
          "german": "Viertel vor acht"
        },
        {
          "id": "ck4",
          "english": "tomorrow at eight",
          "german": "Morgen um acht"
        },
        {
          "id": "ck5",
          "english": "on the weekend",
          "german": "am Wochenende"
        },
        {
          "id": "ck6",
          "english": "in the summer",
          "german": "im Sommer"
        },
        {
          "id": "ck7",
          "english": "in the winter",
          "german": "im Winter"
        }
      ],
      "target_answer": "Es ist drei Uhr, Viertel nach zwölf, Viertel vor acht, Morgen um acht, am Wochenende, im Sommer, im Winter",
      "meaning": "it is three o'clock, quarter past twelve, quarter to eight, tomorrow at eight, on the weekend, in the summer, in the winter",
      "explanation": "The clock phrases carry the shift twins; the calendar phrases borrow the clock's own little words: am = an dem, im = in dem — contractions, not new words. nach = after (moving forward), vor = before (approaching), um = at. The colloquial clock is prepositions."
    },
    {
      "id": "l1703_e3",
      "type": "derive",
      "prompt": "Ask the question: '_____ viel Uhr ist es?' (How much clock is it?):",
      "english_hint": "the how-word",
      "target_answer": "Wie",
      "meaning": "Wie viel Uhr ist es? = What time is it?",
      "explanation": "wie — the how-word whose root is why's — drives the clock question: 'How much clock is it?' Count along: zählen is tale's twin, and die Minute is the clock's smallest tale — hundert of them to the hour."
    },
    {
      "id": "l1703_e4",
      "type": "shift_select",
      "prompt": "'Gestern ___ ich früh aufgestanden.' (Yesterday I got up early — auxiliary needed)",
      "options": [
        "wurde",
        "bin",
        "habe",
        "hatte"
      ],
      "target_answer": "bin",
      "meaning": "Gestern bin ich früh aufgestanden",
      "explanation": "aufstehen is motion (up!) — sein opens the bracket, and with a fronted gestern the verb still holds position 2."
    },
    {
      "id": "l1703_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Tomorrow at eight we drink coffee'",
      "target_answer": "Morgen um acht trinken wir Kaffee",
      "meaning": "Tomorrow at eight we drink coffee",
      "word_bank": [
        "aber",
        "für",
        "trinken",
        "wir",
        "um",
        "Morgen",
        "acht",
        "Kaffee",
        "hundert"
      ],
      "explanation": "Time stack (Morgen um acht) in position 1, verb glued to 2, subject to 3 — V2 with a full calendar."
    }
  ],
  "summary": {
    "outcome": "Tell time formally and colloquially — and never mistrust halb again.",
    "use_example": {
      "german": "Morgen um acht trinken wir Kaffee.",
      "english": "Tomorrow at eight we drink coffee."
    },
    "takeaway": "halb acht is half-toward-eight; nach pushes forward, vor pulls up to, um pins the hour.",
    "curiosity_teaser": "Next: Gestern habe ich… Story Drills — narrate a whole weekend in Perfekt sentences from taught words."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"The clock / o'clock is here today\"",
    "target_answer": "Die Uhr ist heute hier",
    "word_bank": [
      "hier",
      "sehr",
      "Die",
      "nicht",
      "heute",
      "Uhr",
      "ist"
    ],
    "explanation": "Building \"Die Uhr ist heute hier\" from the lesson's core pattern locks in Clock & Calendar Gym."
  }
};

export default lesson;
