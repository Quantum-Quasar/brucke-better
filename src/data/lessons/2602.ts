import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2602,
  "slug": "tochter-double-shift-showdown",
  "title": "Tochter: Double Shift Showdown",
  "subtitle": "Words carrying both D→T and GH→CH — discrimination drills",
  "phase": 3,
  "shift_categories": [
    "d_to_t",
    "y_gh_to_g_ch"
  ],
  "word_ids": [
    "tochter",
    "nacht",
    "licht",
    "recht",
    "acht",
    "knecht",
    "denken",
    "mitternacht",
    "nichte",
    "selbst",
    "hell",
    "mond",
    "stern"
  ],
  "table_word_ids": [
    "tochter",
    "nacht",
    "recht",
    "acht",
    "knecht",
    "denken",
    "licht",
    "mitternacht",
    "nichte",
    "selbst",
    "hell",
    "mond",
    "stern",
    "treu",
    "taub",
    "topf",
    "haustier",
    "u-bahn",
    "regenmantel"
  ],
  "hook": {
    "title": "The Showdown",
    "content": "The double-shift words meet the ghost-map words in one arena. Tochter carries D→T AND gh→ch. dachte (thought) carries TH→D AND gh→ch. Nacht, Licht, acht, Recht, Knecht carry gh→ch alone. The showdown skill: when you see a German t-ch word (Tochter, dachte, Nacht), check BOTH laws — is the t a hardened d (daughter, thought) or was there never a d? Tochter/daughter has both shifts;acht/eight has only the gh. One letter difference in the English twin tells you which laws fired.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Three-Way Test",
        "content": "English night/Nacht: gh→ch only (no d). English daughter/Tochter: d→t AND gh→ch. English thought/dachte: th→d AND gh→ch. Same ch ending, three different English consonant stories. The German ch is constant; the English front tells the tale."
      }
    ]
  },
  "pattern": {
    "title": "The Showdown Bracket",
    "content": "Match one: Tochter ↔ daughter (D→T + gh→ch) versus Nacht ↔ night (gh→ch only). Match two: dachte ↔ thought (TH→D + gh→ch) versus Licht ↔ light (gh→ch only). Match three: Knecht ↔ knight (gh→ch only — and the social drift!). Match four: acht ↔ eight (gh→ch only). Match five: Recht ↔ right (gh→ch only). The pattern: when the English twin begins with d or th, the German t is doing double duty; when the English twin begins with n, l, e, r, k — the ch is flying solo. Bracket complete.",
    "footnotes": [],
    "linguist_note": "The ch of Tochter, Nacht, Licht,acht, Recht, Knecht is phonologically identical — the Ach-Laut after back vowels. The GRAPHIC history differs (t+ch from d+gh, ch from gh), but the sound never changed in German. English silenced one sound; German kept one sound. Simplicity on one shore, complexity on the other."
  },
  "exercises": [
    {
      "id": "l2602_e1",
      "type": "matching_pairs",
      "prompt": "The showdown — match each word with its shift story:",
      "matching_pairs": [
        {
          "id": "ss1",
          "english": "daughter (D→T + gh→ch)",
          "german": "Tochter"
        },
        {
          "id": "ss2",
          "english": "thought (TH→D + gh→ch)",
          "german": "dachte"
        },
        {
          "id": "ss3",
          "english": "night (gh→ch only)",
          "german": "Nacht"
        },
        {
          "id": "ss4",
          "english": "eight (gh→ch only)",
          "german": "acht"
        }
      ],
      "target_answer": "Tochter, dachte, Nacht, acht",
      "meaning": "the four showdown entries",
      "explanation": "Same ch ending — the English front (d, th, or nothing) tells you which laws fired."
    },
    {
      "id": "l2602_e2",
      "type": "shift_select",
      "prompt": "'Knecht' — how many shifts from 'knight'?",
      "options": [
        "Three",
        "Two: D→T and gh→ch",
        "None",
        "One: gh → ch (the d never existed here)"
      ],
      "target_answer": "One: gh → ch (the d never existed here)",
      "meaning": "knight ↔ Knecht: single shift",
      "explanation": "Both start with k — no dental involved. Only the guttural changed (or rather, only English silenced it). The night sky again: der Mond, der Stern — and hell (bright) is what the moon makes of the dark."
    },
    {
      "id": "l2602_e3",
      "type": "shift_select",
      "prompt": "Which pair runs THREE laws including th→d and gh→ch?",
      "options": [
        "thought ↔ dachte",
        "night ↔ Nacht",
        "eight ↔ acht",
        "right ↔ Recht"
      ],
      "target_answer": "thought ↔ dachte",
      "meaning": "The triple-law champion",
      "explanation": "th→d, the vowel drift, gh→ch — thought/dachte is the most heavily shifted common pair in the language. (selbst stays bare — ich selbst — the v→b law from the hunt.)"
    },
    {
      "id": "l2602_e4",
      "type": "reverse_cognate",
      "prompt": "What English word is the twin of 'Tochter'?",
      "target_answer": "daughter",
      "meaning": "daughter ↔ Tochter (D→T + gh→ch)",
      "explanation": "The double-shift flagship — d hardened AND the guttural survived, in one family word."
    },
    {
      "id": "l2602_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The daughter thought at night' (mixed past!)",
      "target_answer": "Die Tochter dachte in der Nacht",
      "meaning": "Die Tochter dachte in der Nacht = The daughter thought at night",
      "vocab_hints": [
        {
          "word": "in der Nacht",
          "translation": "at/in the night",
          "note": "in + dative (location in time) — der Nacht is the feminine dative"
        }
      ],
      "word_bank": [
        "in",
        "dachte",
        "Die",
        "nicht",
        "der",
        "Nacht",
        "Tochter",
        "mit"
      ],
      "explanation": "Three gh→ch/t-ch words in one sentence — Tochter (double), dachte (triple), Nacht (single). The showdown, staged. Die Nichte (the niece) belongs to the Tochter family set — kin words for the double-shift daughter."
    }
  ],
  "summary": {
    "outcome": "Discriminate single-shift ghost words from double-shift twins at speed.",
    "use_example": {
      "german": "Die Tochter dachte in der Nacht.",
      "english": "The daughter thought at night."
    },
    "takeaway": "The ch ending is constant — the English front (d, th, or nothing) reports how many laws fired.",
    "curiosity_teaser": "Next: sagen & gestern — the Y→G twins close the Atlas families for good."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Tochter: Double Shift Showdown (Die Tochter dachte in der Nacht = The daughter thought at night):",
    "target_answer": "Die Tochter dachte in der Nacht",
    "word_bank": [
      "Die",
      "nicht",
      "heute",
      "Tochter",
      "in",
      "dachte",
      "der",
      "Nacht"
    ],
    "explanation": "Re-assembling \"Die Tochter dachte in der Nacht\" from scratch locks in the structural pattern of Tochter: Double Shift Showdown without relying on short-term echo."
  }
};

export default lesson;
