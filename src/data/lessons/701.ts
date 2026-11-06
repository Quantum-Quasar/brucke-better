import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 701,
  "slug": "double-shift-detectives",
  "title": "Double-Shift Detectives",
  "subtitle": "deep → tief, daughter → Tochter — words that needed two rules at once",
  "phase": 1,
  "shift_categories": [
    "d_to_t",
    "p_to_pf_f",
    "y_gh_to_g_ch"
  ],
  "word_ids": [
    "tief",
    "tochter",
    "tropfen",
    "dampf",
    "dach",
    "tot",
    "tod",
    "tausend",
    "teufel",
    "kauen"
  ],
  "table_word_ids": [
    "tief",
    "tochter",
    "tropfen",
    "dampf",
    "dach",
    "tausend",
    "tot",
    "tod",
    "teufel",
    "kauen",
    "pfosten",
    "liegen",
    "passen",
    "wirklich",
    "wut",
    "klassenzimmer"
  ],
  "hook": {
    "title": "When Two Rules Share One Word",
    "content": "Some words could not decide which shift to attend, so they went to both. Deep carried a d AND a p: High German hardened the d to t and breathed the p into f — deep → tief. Daughter carried d and a guttural gh: d → t, gh → ch — daughter → Tochter. Drop became Tropfen, damp became Dampf, and thatch became Dach. These double-shift words look the most foreign and are actually the most rule-abiding: every letter changed according to a law you already know.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Dead → tot: The Same Rule Twice",
        "content": "English 'dead' has two d's, and German shifted both: tot. The noun Tod (death) pairs d → t with th → d — death's th arrived by a different route but landed on the same street. One word, two autopsies."
      }
    ]
  },
  "pattern": {
    "title": "Stack the Rules, Read the Word",
    "content": "Read a double-shift word rule by rule. tief: t (from d) + ie (long vowel) + f (from p) = deep. Tochter: T (d) + och (gh) + ter = daughter. Tropfen: T + ropp... p → pf = drop. Dampf: D → T, p → pf = damp. Dach: th → d, t → ch = thatch (a roof's thatch and a Dach are the same word wearing two spelling systems). Tausend: th → t AND d → t — thousand. The devil is in there too: Teufel shifted its d the same way as devil's cousins.",
    "footnotes": [],
    "linguist_note": "Double shifts are your proof that the shift laws are systematic, not coincidences. Wherever two shiftable consonants co-occur, both shift — tief, Tochter, Tropfen, Dampf, Dach, tausend all obey two laws simultaneously."
  },
  "exercises": [
    {
      "id": "l701_e1",
      "type": "matching_pairs",
      "prompt": "Match the double-shift words with their English twins:",
      "matching_pairs": [
        {
          "id": "ds1",
          "english": "deep",
          "german": "tief"
        },
        {
          "id": "ds2",
          "english": "daughter",
          "german": "Tochter"
        },
        {
          "id": "ds3",
          "english": "drop",
          "german": "Tropfen"
        },
        {
          "id": "ds4",
          "english": "damp",
          "german": "Dampf"
        },
        {
          "id": "ds5",
          "english": "roof / thatch",
          "german": "Dach"
        },
        {
          "id": "ds6",
          "english": "devil",
          "german": "Teufel"
        },
        {
          "id": "ds7",
          "english": "thousand",
          "german": "tausend"
        }
      ],
      "target_answer": "tief, Tochter, Tropfen, Dampf, Dach, Teufel, tausend",
      "meaning": "deep, daughter, drop, damp, roof, devil, thousand",
      "shift_hint": "D → T + P → F / GH → CH",
      "explanation": "Each German word obeyed two shift laws at once — read it rule by rule, devil and thousand included."
    },
    {
      "id": "l701_e2",
      "type": "shift_select",
      "prompt": "Which two shifts turn English 'deep' into German 'tief'?",
      "options": [
        "D → T and P → F",
        "TH → D and K → CH",
        "P → PF and Y → G",
        "T → S and V → B"
      ],
      "target_answer": "D → T and P → F",
      "meaning": "deep ↔ tief (double shift)",
      "explanation": "Initial d hardened to t, and post-vocalic p breathed into f: d-eep → t-ie-f."
    },
    {
      "id": "l701_e3",
      "type": "derive",
      "prompt": "Derive the mirror: English 'chew' → German (German kept the k English shifted!):",
      "english_hint": "ch ↔ k — English ran the velar shift here, German never did",
      "target_answer": "kauen",
      "meaning": "to chew",
      "explanation": "chew → kauen: English hardened its k into ch (as in speech/beseech), German kept the ancient k. The mirror image of kirk ↔ Kirche — direction is the whole game."
    },
    {
      "id": "l701_e4",
      "type": "reverse_cognate",
      "prompt": "What English word is the twin of 'tot' (and of its noun Tod)?",
      "target_answer": "dead",
      "meaning": "dead (twin of German tot)",
      "explanation": "dead → tot: both d's hardened to t. Death/Tod run the same story with th → d added."
    },
    {
      "id": "l701_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'My daughter drinks cold water'",
      "target_answer": "Meine Tochter trinkt kaltes Wasser",
      "meaning": "My daughter drinks cold water",
      "vocab_hints": [
        {
          "word": "Meine",
          "translation": "my",
          "note": "mein ↔ mine (KJV: 'mine eyes'); -e appears because Tochter is feminine"
        },
        {
          "word": "kaltes",
          "translation": "cold",
          "note": "kalt gains -es before the neuter das Wasser"
        }
      ],
      "word_bank": [
        "trinkt",
        "kaltes",
        "Tochter",
        "Meine",
        "Wasser",
        "wenn",
        "aus"
      ],
      "explanation": "Tochter is a double-shift word, trinken a D→T word, kalt a final-d word — one sentence, three shift histories."
    }
  ],
  "summary": {
    "outcome": "Decode double-shift words rule by rule and use them in full sentences.",
    "use_example": {
      "german": "Meine Tochter trinkt kaltes Wasser.",
      "english": "My daughter drinks cold water."
    },
    "takeaway": "When two shiftable consonants share a word, both shift: tief, Tochter, Tropfen, Dampf, Dach, tausend.",
    "curiosity_teaser": "Next: the full discrimination gauntlet — all five shifts, both directions, mixed at speed."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Double-Shift Detectives (My daughter drinks cold water):",
    "target_answer": "Meine Tochter trinkt kaltes Wasser",
    "word_bank": [
      "Wasser",
      "Tochter",
      "trinkt",
      "Meine",
      "nicht",
      "heute",
      "kaltes"
    ],
    "explanation": "Re-assembling \"Meine Tochter trinkt kaltes Wasser\" from scratch locks in the structural pattern of Double-Shift Detectives without relying on short-term echo."
  }
};

export default lesson;
