import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1603,
  "slug": "lesson-1603",
  "title": "The Full Date",
  "subtitle": "el + number + de + month: say any date, from el 3 de enero to el 31 de diciembre",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "enero",
    "lunes",
    "semana",
    "hoy",
    "mañana",
    "ayer",
    "año",
    "tres",
    "cinco",
    "diez"
  ],
  "table_word_ids": [
    "enero",
    "lunes",
    "semana",
    "hoy",
    "mañana",
    "ayer",
    "año",
    "tres",
    "cinco",
    "diez"
  ],
  "hook": {
    "title": "One Lane for Dates",
    "content": "English says 'January 3rd' or 'the 3rd of January'. Spanish has one lane and stays in it: el tres de enero. The article el carries the day, the number does the counting, and de glues the month on. Written dates keep the numeral: el 3 de enero; speech spells it out: el tres de enero.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The one ordinal that survives",
        "content": "Every date uses the bare number — except the 1st, which keeps its ordinal: el primero de mayo. Spanish never says *el uno de enero. And the month stays lowercase: enero, julio, mayo.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "el + Number + de + Month",
    "content": "el tres de enero, el 14 de julio, el cinco de mayo — the article opens the date, de closes the gap before the month. No ordinal endings, no capital letters.",
    "linguist_note": "The calendar is Roman in both languages: enero is Janus's month, and the numbering habit came with it.",
    "trap_note": "Don't build an English ordinal: el tres de enero, never *el tercer de enero — and the 1st is el primero, the single survivor."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each Spanish date or anchor with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the 3rd of January",
          "german": "el 3 de enero"
        },
        {
          "id": "p2",
          "english": "today",
          "german": "hoy"
        },
        {
          "id": "p3",
          "english": "tomorrow",
          "german": "mañana"
        },
        {
          "id": "p4",
          "english": "yesterday",
          "german": "ayer"
        },
        {
          "id": "p5",
          "english": "the year",
          "german": "el año"
        }
      ],
      "target_answer": "el 3 de enero, hoy, mañana, ayer, el año",
      "meaning": "the 3rd of January, today, tomorrow, yesterday, the year",
      "explanation": "Dates walk el + number + de + month; the anchors hoy, mañana, ayer stand alone.",
      "id": "es1603_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you SAY 'the 3rd of January'?",
      "options": [
        "el tres de enero",
        "el tercer de enero",
        "el tres enero"
      ],
      "target_answer": "el tres de enero",
      "meaning": "the 3rd of January",
      "explanation": "el tres de enero — bare number, de before the month. The mouth has no ordinals here.",
      "id": "es1603_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the one ordinal Spanish keeps for dates — 'the first (of the month)':",
      "english_hint": "Latin primarius — first in rank",
      "target_answer": "primero",
      "meaning": "first",
      "explanation": "el primero de mayo — the only date that gets an ordinal, because 'one' refuses to be counted.",
      "id": "es1603_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: today is the 3rd of January",
      "cues": [
        "hoy = today; es carries 'is'",
        "the date: el + number + de + month"
      ],
      "idea_parts": [
        "today is → Hoy es",
        "the 3rd of January → el 3 de enero"
      ],
      "target_answer": "Hoy es el 3 de enero",
      "meaning": "Today is the 3rd of January",
      "word_bank": [
        "Hoy",
        "es",
        "el",
        "3",
        "de",
        "enero",
        "año",
        "ayer"
      ],
      "explanation": "Hoy es el 3 de enero — anchor first, date second, de in the middle.",
      "diagnosis": {
        "slip": "dropped the de before the month",
        "cue": "The month rides on de: el 3 DE enero."
      },
      "id": "es1603_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "El lunes es el 3 de enero",
      "replays": 2,
      "target_answer": "El lunes es el 3 de enero",
      "meaning": "Monday is the 3rd of January",
      "cues": [
        "It means: Monday is the 3rd of January",
        "Two el's: one for the day, one for the date"
      ],
      "explanation": "El lunes es el 3 de enero — weekday and date, each with its own el.",
      "affirmation": "You wrote a complete Spanish date with both articles in place.",
      "id": "es1603_e5"
    }
  ],
  "summary": {
    "outcome": "Say any date with el + number + de + month, and anchor days with hoy, mañana and ayer.",
    "use_example": {
      "german": "Hoy es el 3 de enero",
      "english": "Today is the 3rd of January"
    },
    "takeaway": "Spanish dates walk el + number + de + month — and the 1st walks as primero.",
    "curiosity_teaser": "Up next ([17] The -ado / -ido Past): unlock your first past tense ('I have confirmed, I have eaten') with haber + -ado/-ido!"
  },
  "twist": {
    "prompt": "Think it through again without looking back — say: today is the 3rd of January:",
    "target_answer": "Hoy es el 3 de enero",
    "word_bank": [
      "Hoy",
      "es",
      "el",
      "3",
      "de",
      "enero",
      "mañana",
      "año"
    ],
    "explanation": "Rebuilding \"Hoy es el 3 de enero\" cements the el + number + de + month frame."
  }
};

export default lesson;
