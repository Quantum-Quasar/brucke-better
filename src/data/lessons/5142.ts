import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5142,
  "slug": "kalender-ii-juni-bis-oktober",
  "title": "Kalender II: Juni bis Oktober",
  "subtitle": "the second half of the Latin year — and the Roman numbers hiding inside it",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "monat",
    "jahr",
    "warm",
    "regnen",
    "vier",
    "zehn",
    "oft"
  ],
  "table_word_ids": [
    "juni",
    "juli",
    "august",
    "september",
    "oktober",
    "monat",
    "jahr",
    "warm",
    "regnen",
    "vier",
    "zehn",
    "oft",
    "käfer",
    "rentner",
    "vorfreude"
  ],
  "hook": {
    "title": "A Calendar Forgetting Its Own Numbers",
    "content": "Last lesson: five Latin names that never left. These five tell a second story — a calendar slowly forgetting how to count. September is Latin septem, 'seven', and Oktober is octo, 'eight': in the old Roman year that began in March, they really were months seven and eight. Juli and August once counted too — Quintilis, 'fifth', and Sextilis, 'sixth' — until the big names moved in: Julius Caesar took the fifth month (Juli), Augustus took the sixth (August, 'the venerable one'), and Juni belongs to Juno, queen of the gods. English kept every one of these names whole — June, July, August — so this is not vocabulary, it is pronunciation: German hammers the stress onto the FIRST syllable (JU-ni, AU-gust, SEP-tem-ber) where English lets it drift (ju-LY, au-GUST, sep-TEM-ber). And the law from Kalender I still holds: months are masculine and stand bare after im — im Juni, im Oktober.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The J That Isn't a J",
        "content": "Latin's I was a Y-sound, and German still says it that way: Juni sounds like 'YOO-nee' and Juli like 'YOO-lee'. English hardened the sound into J (June, July). Same Latin name, two consonants — but the vowel never moved, which is why the months feel so familiar when you say them the German way."
      }
    ]
  },
  "pattern": {
    "title": "Dates in the Second Half",
    "content": "Same three frames as Kalender I, new names. 1. With a preposition: im Juni, im Juli, im August, im September, im Oktober — 'im' is in + dem, and dem is the masculine, so the bare name follows. 2. As a subject: Der August ist heiß. 3. Weather small talk: Im Oktober regnet es oft. The arithmetic scales up: von Januar bis Oktober sind es zehn Monate. And the date frame from last lesson still works: am 5. Mai, am 1. September — ordinal, dot, bare name.",
    "footnotes": [],
    "linguist_note": "English pulled the stress rightward over the centuries (ju-LY, au-GUST, sep-TEM-ber, oc-TO-ber); German's first-syllable law never moved (JU-li, AU-gust, SEP-tem-ber, OK-to-ber). Two thousand years of Latin company, and German still gives every borrowed name the same German beat."
  },
  "exercises": [
    {
      "id": "l5142_e1",
      "type": "matching_pairs",
      "prompt": "The second half of the year — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "jo1",
          "english": "June is warm",
          "german": "Der Juni ist warm"
        },
        {
          "id": "jo2",
          "english": "In July we often swim",
          "german": "Im Juli schwimmen wir oft"
        },
        {
          "id": "jo3",
          "english": "August is hot",
          "german": "Der August ist heiß"
        },
        {
          "id": "jo4",
          "english": "In September it rains on four days",
          "german": "Im September regnet es an vier Tagen"
        },
        {
          "id": "jo5",
          "english": "In October the leaves fall",
          "german": "Im Oktober fallen die Blätter"
        },
        {
          "id": "jo6",
          "english": "From January to October there are ten months",
          "german": "Von Januar bis Oktober sind es zehn Monate"
        }
      ],
      "target_answer": "Der Juni ist warm, Im Juli schwimmen wir oft, Der August ist heiß, Im September regnet es an vier Tagen, Im Oktober fallen die Blätter, Von Januar bis Oktober sind es zehn Monate",
      "meaning": "the five months in sentences, plus the count",
      "explanation": "im + the bare masculine name, exactly as in Kalender I. And the count still runs underneath: from Januar to Oktober there are zehn Monate — the Roman count you will close out next lesson."
    },
    {
      "id": "l5142_e2",
      "type": "shift_select",
      "prompt": "Which month is Latin septem — 'seven' — even though it is the ninth month of our year?",
      "options": [
        "September",
        "Juli",
        "August",
        "Juni"
      ],
      "target_answer": "September",
      "meaning": "September hides the Roman number seven",
      "explanation": "The old Roman year began in March, so September really was the seventh month (septem) and Oktober the eighth (octo). When January moved to the front, the names kept their old numbers — a fossil count you now own in two languages."
    },
    {
      "id": "l5142_e3",
      "type": "reverse_cognate",
      "prompt": "The eighth month of the German calendar ('der achte Monat', after Julius Caesar's July) carries Emperor Octavian's title 'the venerable one'. Which English month is it?",
      "options": [
        "October",
        "August",
        "July",
        "June"
      ],
      "target_answer": "August",
      "meaning": "August ↔ August: one emperor, one name, two languages",
      "explanation": "Augustus renamed the sixth month (Sextilis) after himself, and both German and English kept it letter for letter — only the stress moved: German AU-gust, English au-GUST. Juni keeps a goddess (Juno) and Juli an emperor (Julius Caesar) the same way."
    },
    {
      "id": "l5142_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the October sentence: 'In October the leaves fall'",
      "tile_options": [
        "Blätter",
        "warm",
        "September",
        "Oktober",
        "Im",
        "fallen",
        "die"
      ],
      "target_answer": "Im Oktober fallen die Blätter",
      "meaning": "In October the leaves fall",
      "explanation": "Time phrase first, verb second, subject last — the German order you have been assembling all along. Fallen is the same strong verb as English fall; die Blätter is the umlauted plural of das Blatt."
    },
    {
      "id": "l5142_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'In June I have vacation'",
      "target_answer": "Im Juni habe ich Urlaub",
      "meaning": "In June I have vacation",
      "word_bank": [
        "heiß",
        "Juli",
        "ich",
        "Juni",
        "habe",
        "Urlaub",
        "Im"
      ],
      "explanation": "habe in slot 2, the time phrase up front. Swap the month and the sentence still works: Im Juli habe ich Urlaub. The frame is yours; the calendar just fills the gap."
    }
  ],
  "summary": {
    "outcome": "Name Juni through Oktober, keep the first-syllable stress, and read the Roman count hiding in September and Oktober.",
    "use_example": {
      "german": "Im August ist es heiß — im Oktober fallen die Blätter.",
      "english": "In August it is hot — in October the leaves fall."
    },
    "takeaway": "Der Juni, der Juli, der August, der September, der Oktober — masculine, bare after im, stressed on the first syllable, with septem and octo still counting inside.",
    "curiosity_teaser": "Next: November and Dezember — the count finally closes, and the holiday words walk in with it."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Kalender II: Juni bis Oktober (In June I have vacation):",
    "target_answer": "Im Juni habe ich Urlaub",
    "word_bank": [
      "Juni",
      "ich",
      "Urlaub",
      "Im",
      "heute",
      "habe",
      "nicht"
    ],
    "explanation": "Re-assembling \"Im Juni habe ich Urlaub\" from scratch locks in the structural pattern of Kalender II: Juni bis Oktober without relying on short-term echo."
  }
};

export default lesson;
