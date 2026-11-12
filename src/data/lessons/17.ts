import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 17,
  "slug": "numbers-time-and-gestern",
  "title": "Numbers, Time & gestern",
  "subtitle": "Counting is a shift spiral: drei↔three, zwanzig↔twenty, dreißig↔thirty",
  "phase": 3,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "drei",
    "zwei",
    "zwanzig",
    "elf",
    "zwölf",
    "dreißig",
    "morgen",
    "heute",
    "gestern",
    "uhr",
    "donner",
    "woche"
  ],
  "table_word_ids": [
    "drei",
    "zwei",
    "zwanzig",
    "elf",
    "zwölf",
    "dreißig",
    "morgen",
    "heute",
    "gestern",
    "uhr",
    "donner",
    "woche",
    "herz",
    "zehe",
    "schwitzen",
    "uhrzeit",
    "lassen"
  ],
  "hook": {
    "title": "The Counting Spiral",
    "content": "Numbers look like the least poetic words in any language — and German numbers are secretly the whole curriculum in miniature. drei is three (TH→D). zwanzig is twenty (TW→ZW). dreißig is thirty (TH→D and T→ß in one word — a double-shift number). elf is eleven — both from 'one left over' after ten. And the time words keep spiraling: gestern ↔ yesterday (the y- and g- are one letter in two fonts), heute is 'on this day' (the heu- is the he- of here), morgen the morrow of to-morrow. You have been counting German since childhood — today you just get the credit.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The 'Left Over' Numbers",
        "content": "Eleven and twelve are the most honest numbers in Germanic: *ainalif 'one-left' and *twalif 'two-left' — what remains when you have counted up to ten on both hands. German elf and zwölf keep the arithmetic visible; English eleven and twelve wore it smooth."
      }
    ]
  },
  "pattern": {
    "title": "Count, Tell Time, Name the Day",
    "content": "Counting: drei, vier, fünf, sechs, sieben (seven, v→b), acht (eight, the gh→ch word), neun, zehn — the middle ones (vier, fünf, sechs, neun, zehn) arrive as vocab hints today and formal cognates later. Bigger: zwanzig (twenty), dreißig (thirty — note the ß: thirty is the one number that spelled its shift), elf (eleven), zwölf (twelve). Compound numbers put the ones first, like archaic English 'five-and-twenty': dreiundzwanzig. Time: Es ist drei Uhr — Uhr is the loan-twin of hour. Days wear the shift: Donnerstag (thunder-day), Mittwoch (mid-week), and the calendar trio gestern — heute — morgen runs yesterday–today–tomorrow with every pair a cognate.",
    "footnotes": [],
    "linguist_note": "gestern and yesterday are the same y→g word: English yester- survives only in yesterday and yesteryear, while German gestern stayed in daily use. The g of gestern is exactly the g of sagen (say) — English vocalized it, German kept it."
  },
  "exercises": [
    {
      "id": "l17_e1",
      "type": "matching_pairs",
      "prompt": "Match the shifted numbers with their English twins. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "nt1",
          "english": "three",
          "german": "drei"
        },
        {
          "id": "nt2",
          "english": "twelve",
          "german": "zwölf"
        },
        {
          "id": "nt3",
          "english": "twenty",
          "german": "zwanzig"
        },
        {
          "id": "nt4",
          "english": "thirty",
          "german": "dreißig"
        },
        {
          "id": "recall1",
          "german": "Wir müssen uns anziehen und ausziehen",
          "english": "We must get dressed and undressed"
        }
      ],
      "target_answer": "drei, zwölf, zwanzig, dreißig, Wir müssen uns anziehen und ausziehen",
      "meaning": "three; twelve; twenty; thirty; We must get dressed and undressed",
      "explanation": "TH→D in drei, TW→ZW in zwölf and zwanzig, and a double shift in dreißig — counting runs the whole shift ledger. Even moving day runs on numbers: um acht Uhr wollen wir ausziehen — the separable verb from the routine lessons rides the clock."
    },
    {
      "id": "l17_e2",
      "type": "shift_select",
      "prompt": "One connection differs here. Recover it from the familiar words.",
      "options": [
        "hate → hassen",
        "out → aus",
        "make → machen",
        "water → Wasser"
      ],
      "target_answer": "make → machen",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Water, hate and out use T → S/SS. Make → machen uses K → CH."
    },
    {
      "id": "l17_e3",
      "type": "shift_select",
      "prompt": "How do Germans say 23?",
      "options": [
        "zwanzigdrei (twenty-three)",
        "drei zwanzig separate",
        "dreiundzwanzig (three-and-twenty)",
        "drei-und-zwanzig with hyphens"
      ],
      "target_answer": "dreiundzwanzig (three-and-twenty)",
      "meaning": "23 = dreiundzwanzig — ones first",
      "explanation": "German compounds ones before tens, the way archaic English said 'five-and-twenty' — one word, no hyphens."
    },
    {
      "id": "l17_e4",
      "type": "reverse_cognate",
      "prompt": "What English time word is the twin of 'gestern'?",
      "target_answer": "yesterday",
      "meaning": "yesterday (yester- ↔ gestern)",
      "explanation": "gestern ↔ yester-: the same word with y→g. English retired it into 'yesterday'; German kept it standalone."
    },
    {
      "id": "l17_e5",
      "type": "transcribe",
      "prompt": "You want to say:",
      "idea": "someone stops you on the street and asks the time: it is three o'clock",
      "cues": [
        "The clock formula is a twin sandwich: es ↔ it, ist ↔ is, drei ↔ three, Uhr ↔ hour — Es ist drei Uhr"
      ],
      "target_answer": "Es ist drei Uhr",
      "meaning": "It is three o'clock",
      "affirmation": "You built the clock sentence from four twins — es, ist, drei, Uhr: English with a German accent.",
      "vocab_hints": [
        {
          "word": "Uhr",
          "translation": "clock / o'clock",
          "note": "loan-twin of hour; o'clock is literally 'of the clock'"
        }
      ],
      "word_bank": [
        "ist",
        "zwölf",
        "heute",
        "Es",
        "drei",
        "Uhr"
      ],
      "explanation": "Es ist drei Uhr — the es ↔ it twin opening the clock formula, built from a thought."
    }
  ],
  "summary": {
    "outcome": "Count to 30+, tell clock time, and use the gestern–heute–morgen calendar trio.",
    "use_example": {
      "german": "Es ist drei Uhr.",
      "english": "It is three o'clock."
    },
    "takeaway": "Numbers carry the whole shift ledger — drei, zwölf, zwanzig, dreißig — and the time words are pure cognates.",
    "curiosity_teaser": "Next: the counting cognates gym — phone numbers, prices, ages, and the elf≠elf trap."
  },
  "twist": {
    "prompt": "Same clock, lunchtime: it is three o'clock becomes it is TWELVE o'clock. (The number carries the shift ledger.)",
    "target_answer": "Es ist zwölf Uhr",
    "word_bank": [
      "zwölf",
      "ist",
      "drei",
      "Uhr",
      "Es"
    ],
    "explanation": "Only the number changes: zwölf is your twelve in shift clothes (the tw → zw opener from the early trail). The clock formula never moves."
  }
};

export default lesson;
