import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1602,
  "slug": "dates-and-appointments",
  "title": "Dates & Appointments",
  "subtitle": "el lunes ('on Monday'), los lunes ('on Mondays'), en enero, el cinco de mayo",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "enero",
    "cinco",
    "diez",
    "veinte",
    "lunes",
    "martes",
    "semana",
    "de",
    "en",
    "el"
  ],
  "table_word_ids": [
    "enero",
    "cinco",
    "diez",
    "veinte",
    "lunes",
    "martes",
    "semana",
    "de",
    "en",
    "el"
  ],
  "hook": {
    "title": "How Spanish Builds Any Date: 'El [Number] de [Month]'",
    "content": "You already know the most famous date formula in Spanish: el cinco de mayo ('the fifth of May')! Unlike English, which uses ordinal numbers ('the fifth, the tenth, the twentieth'), Spanish uses regular cardinal numbers for every day of the month from 2 to 31: el dos de enero ('January 2nd'), el diez de enero ('January 10th'), el veinte de enero ('January 20th')!"
  },
  "pattern": {
    "title": "Months Take 'En'; Specific Dates Take 'El'",
    "content": "Compare: En enero ('In January') vs El cinco de enero ('On January 5th')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "in January",
          "german": "en enero"
        },
        {
          "id": "p2",
          "english": "on January 5th",
          "german": "el cinco de enero"
        },
        {
          "id": "p3",
          "english": "on January 10th",
          "german": "el diez de enero"
        },
        {
          "id": "p4",
          "english": "this week",
          "german": "esta semana"
        },
        {
          "id": "p5",
          "english": "on Mondays",
          "german": "los lunes"
        }
      ],
      "target_answer": "en enero, el cinco de enero, el diez de enero, esta semana, los lunes",
      "meaning": "in January, on January 5th, on January 10th, this week, on Mondays",
      "explanation": "el + cardinal number + de + month builds any calendar date.",
      "id": "es1602_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'on the fifth of January' in Spanish:",
      "tile_options": [
        "enero",
        "cinco",
        "el",
        "en",
        "de"
      ],
      "target_answer": "elcincodeenero",
      "meaning": "el cinco de enero (on January 5th)",
      "explanation": "el + cinco + de + enero.",
      "id": "es1602_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'on January 10th'?",
      "options": [
        "*el décimo de enero",
        "el diez de enero",
        "*en el diez enero"
      ],
      "target_answer": "el diez de enero",
      "meaning": "on January 10th",
      "explanation": "Spanish uses el + cardinal number + de + month.",
      "id": "es1602_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am going to Madrid in January'",
      "target_answer": "Voy a Madrid en enero",
      "meaning": "I am going to Madrid in January",
      "word_bank": [
        "enero",
        "a",
        "de",
        "en",
        "lunes",
        "Voy",
        "el",
        "Madrid"
      ],
      "explanation": "Voy a Madrid + en enero.",
      "id": "es1602_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Es el cinco de enero",
      "replays": 2,
      "target_answer": "Es el cinco de enero",
      "meaning": "It is the fifth of January",
      "cues": [
        "It is: Es",
        "the fifth: el cinco",
        "of January: de enero"
      ],
      "explanation": "Es el cinco de enero.",
      "affirmation": "Calendar date formula locked in!",
      "id": "es1602_e5"
    }
  ],
  "summary": {
    "outcome": "Express calendar dates with el + number + de + month and contrast with en + month.",
    "use_example": {
      "german": "Voy a visitar Madrid en enero — el diez de enero.",
      "english": "I am going to visit Madrid in January — on January 10th."
    },
    "takeaway": "el [number] de [month] gives you every calendar date in Spanish.",
    "curiosity_teaser": "Up next ([17] The -ado / -ido Past): unlock your first past tense ('I have confirmed, I have eaten') with haber + -ado/-ido!"
  },
  "twist": {
    "prompt": "Assemble: 'On Monday I am going to confirm'",
    "target_answer": "El lunes voy a confirmar",
    "word_bank": [
      "voy",
      "En",
      "enero",
      "lunes",
      "El",
      "confirmar",
      "de",
      "a"
    ],
    "explanation": "El lunes voy a confirmar."
  }
};

export default lesson;
