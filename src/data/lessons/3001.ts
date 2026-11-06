import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3001,
  "slug": "a-day-in-berlin-reading",
  "title": "A Day in Berlin: Reading",
  "subtitle": "The full capstone passage — every word tap-to-inspectable, every shift annotated",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mann",
    "frau",
    "kind",
    "zug",
    "fahrt",
    "brot",
    "wasser",
    "buch",
    "haus",
    "nacht",
    "morgen",
    "gestern",
    "heute",
    "kaufen",
    "gut",
    "kalt"
  ],
  "table_word_ids": [
    "zug",
    "fahrt",
    "brot",
    "nacht",
    "morgen",
    "gut",
    "mann",
    "frau",
    "kind",
    "wasser",
    "buch",
    "haus",
    "gestern",
    "heute",
    "kaufen",
    "kalt"
  ],
  "hook": {
    "title": "The Whole Passage",
    "content": "Ein Tag in Berlin. Gestern waren der Mann und die Frau in der Stadt. Sie sind mit dem Zug gefahren — die Fahrt war kurz. In der Stadt haben sie Brot und Wasser gekauft, und das Brot war gut. Der Mann hat ein Buch gefunden — ein Buch über Berlin! Am Abend haben sie das Buch gelesen. Das Licht war warm, die Nacht war still. Heute trinken sie Kaffee im Haus. Mir ist kalt, sagt die Frau, aber es geht mir gut. Es gibt keinen besseren Morgen.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Annotated Word Count",
        "content": "Roughly seventy words — and every single one has appeared in a lesson table or hint. The construction inventory: Perfekt brackets (haben gekauft/gelesen/gefunden), sein-perfects (sind gefahren), the simple past of sein (waren), dative receivers (mir), two-way prepositions (im Haus), a compound (impossible here — but Morgen/Brot carry their shifts), and a subordinate-free V2 spine throughout."
      }
    ]
  },
  "pattern": {
    "title": "Read It Three Ways",
    "content": "Pass one — story: who did what, in order. Pass two — machinery: mark every verb position (V2 walls, bracket closures), every case flag (dem, der, mir), every umlaut. Pass three — production: cover the German, rebuild each sentence aloud from the English, then check. The passage is deliberately small: density is the test, not length. If you can rebuild 'Sie sind mit dem Zug gefahren' — sein for motion, mit + dative, nach-less city, participle last — you can build thousands of sentences no lesson ever taught you.",
    "footnotes": [],
    "linguist_note": "Notice the passage never uses the simple past except with war — because that is how spoken German actually works. The Perfekt brackets are the tense of real life; war is the fossil that survived."
  },
  "exercises": [
    {
      "id": "l3001_e1",
      "type": "matching_pairs",
      "prompt": "Story order — match each beat with its line:",
      "matching_pairs": [
        {
          "id": "br1",
          "english": "They traveled by train",
          "german": "Sie sind mit dem Zug gefahren"
        },
        {
          "id": "br2",
          "english": "They bought bread and water",
          "german": "Sie haben Brot und Wasser gekauft"
        },
        {
          "id": "br3",
          "english": "The man found a book about Berlin",
          "german": "Der Mann hat ein Buch über Berlin gefunden"
        },
        {
          "id": "br4",
          "english": "They read the book in the evening",
          "german": "Am Abend haben sie das Buch gelesen"
        }
      ],
      "target_answer": "Sie sind mit dem Zug gefahren, Sie haben Brot und Wasser gekauft, Der Mann hat ein Buch über Berlin gefunden, Am Abend haben sie das Buch gelesen",
      "meaning": "the four story beats",
      "explanation": "Motion in sein-perfect, purchases in haben-perfect — the auxiliary logic running a real narrative."
    },
    {
      "id": "l3001_e2",
      "type": "shift_select",
      "prompt": "Decode pass: which shift explains 'Nacht' in 'die Nacht war still'?",
      "options": [
        "TH → D",
        "gh → ch — night's ghost letters still sounding",
        "V → B",
        "T → Z"
      ],
      "target_answer": "gh → ch — night's ghost letters still sounding",
      "meaning": "Nacht ↔ night — the Atlas ghost map",
      "explanation": "The silent gh of night has been sounding in German for 1,300 years — and you can now hear it."
    },
    {
      "id": "l3001_e3",
      "type": "shift_select",
      "prompt": "Grammar pass: 'Mir ist kalt, aber es geht mir gut' — how many dative experiencers?",
      "options": [
        "Three",
        "One",
        "Two: mir ist kalt and es geht mir gut",
        "None — mir is accusative"
      ],
      "target_answer": "Two: mir ist kalt and es geht mir gut",
      "meaning": "The dative experiencer twice in one breath",
      "explanation": "Cold happens TO her and the day goes TO her — the methinks grammar framing the story's feeling."
    },
    {
      "id": "l3001_e4",
      "type": "reverse_cognate",
      "prompt": "Production pass: which English word is 'kauf...' (in gekauft) hiding as a cousin?",
      "target_answer": "cheap",
      "meaning": "kaufen ↔ cheap (the Latin tradesman loan)",
      "explanation": "Both from the Latin innkeeper/tradesman: English priced things cheap, German kept the verb kaufen."
    },
    {
      "id": "l3001_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Yesterday the man and the woman were in the city\"",
      "target_answer": "Gestern waren der Mann und die Frau in der Stadt",
      "meaning": "Yesterday the man and the woman were in the city",
      "vocab_hints": [
        {
          "word": "waren",
          "translation": "were (war, plural)",
          "note": "war ↔ was — the *wes- root, pluralized"
        },
        {
          "word": "der Stadt",
          "translation": "in the city (dative)",
          "note": "in + dative for location: die Stadt → in der Stadt"
        }
      ],
      "word_bank": [
        "und",
        "Stadt",
        "Gestern",
        "waren",
        "dem",
        "Frau",
        "in",
        "hier",
        "der",
        "Mann",
        "die",
        "der"
      ],
      "explanation": "Fronted time, plural waren, location dative (in der Stadt) — the opening sentence, rebuilt from parts you own.",
      "idea": "Yesterday the man and the woman were in the city",
      "idea_parts": [
        "Yesterday the man and the",
        "woman were in the city (verb in position 2)"
      ],
      "cues": [
        "Start with \"Gestern\" and anchor \"waren\" in position 2.",
        "Close the frame with \"Stadt\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Read, decode, and rebuild the full capstone passage.",
    "use_example": {
      "german": "Es gibt keinen besseren Morgen.",
      "english": "There is no better morning."
    },
    "takeaway": "Seventy words, every construction from the trail — the reading is the diploma.",
    "curiosity_teaser": "Next: Trap Watch — the sixteen false friends, embedded in context sentences where they bite."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from A Day in Berlin: Reading (Yesterday the man and the woman were in the city):",
    "target_answer": "Gestern waren der Mann und die Frau in der Stadt",
    "word_bank": [
      "Gestern",
      "nicht",
      "in",
      "Mann",
      "waren",
      "die",
      "und",
      "der",
      "der",
      "Stadt",
      "heute",
      "Frau"
    ],
    "explanation": "Re-assembling \"Gestern waren der Mann und die Frau in der Stadt\" from scratch locks in the structural pattern of A Day in Berlin: Reading without relying on short-term echo."
  }
};

export default lesson;
