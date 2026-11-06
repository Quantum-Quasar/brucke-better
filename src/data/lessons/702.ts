import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 702,
  "slug": "d-to-t-discrimination-drills",
  "title": "D→T Discrimination Drills",
  "subtitle": "The five-shift gauntlet: which rule, which direction, at full speed",
  "phase": 1,
  "shift_categories": [
    "d_to_t"
  ],
  "word_ids": [
    "tag",
    "tür",
    "trinken",
    "garten",
    "kalt",
    "gut",
    "wort",
    "traum",
    "tisch",
    "tief",
    "tochter",
    "knochen",
    "riechen",
    "koch",
    "weich",
    "kauen"
  ],
  "table_word_ids": [
    "tag",
    "tür",
    "wort",
    "traum",
    "tisch",
    "garten",
    "trinken",
    "kalt",
    "gut",
    "tief",
    "tochter",
    "knochen",
    "riechen",
    "koch",
    "weich",
    "kauen",
    "kälte",
    "mittag"
  ],
  "hook": {
    "title": "The Gauntlet",
    "content": "You now own all five great shifts — P→F, TH→D, T→S, K→CH, D→T — plus the double-shift rule. Today is the gauntlet: mixed words, both directions, no labels. German Tag meets English day through TWO shifts at once (d → t and y → g). German Tisch meets English dish through a Latin detour. The words are all old friends; the game is naming the machinery instantly, the way a musician names a chord without counting the notes.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Tag's Double Life",
        "content": "Tag hides two shifts: the d of day hardened to t, and the ancient g that English wore down to y (day, way, say) still growls at the end of Tag. English vocalized the g; German kept it audible."
      }
    ]
  },
  "pattern": {
    "title": "Name That Shift",
    "content": "Mixed deck, rapid fire: day → Tag (D→T + Y→G), door → Tür (D→T), drink → trinken (D→T), garden/yard → Garten (medial D→T), cold → kalt (final D→T), good → gut (final D→T), word → Wort (final D→T), dream → Traum (D→T), dish/board → Tisch (the Latin discus detour: English dish kept d, German hardened to t). Now reverse it: every German t-word you meet, test d first — Tod/dead, tief/deep, Tochter/daughter, Traum/dream, trinken/drink.",
    "footnotes": [],
    "linguist_note": "Direction matters: German d usually answers to English th (TH→D), while English d answers to German t (D→T). When both languages show the same consonant (Hand, Arm, Wasser-era words aside), the word simply sat in a safe seat."
  },
  "exercises": [
    {
      "id": "l702_e1",
      "type": "matching_pairs",
      "prompt": "The gauntlet, round one — match at speed (the last one runs a different shift — spot it):",
      "matching_pairs": [
        {
          "id": "gd1",
          "english": "word",
          "german": "Wort"
        },
        {
          "id": "gd2",
          "english": "dream",
          "german": "Traum"
        },
        {
          "id": "gd3",
          "english": "yard / garden",
          "german": "Garten"
        },
        {
          "id": "gd4",
          "english": "dish / table",
          "german": "Tisch"
        },
        {
          "id": "gd5",
          "english": "bone",
          "german": "Knochen"
        }
      ],
      "target_answer": "Wort, Traum, Garten, Tisch, Knochen",
      "meaning": "word, dream, garden, table/dish",
      "shift_hint": "D → T (mixed)",
      "explanation": "Final, initial, and medial d all hardened to t — and Tisch took the Latin discus detour."
    },
    {
      "id": "l702_e2",
      "type": "shift_select",
      "prompt": "English 'day' and German 'Tag' — how many shifts separate them?",
      "options": [
        "Three: D → T, T → S, K → CH",
        "None — they are identical",
        "Two: D → T and Y → G",
        "One: D → T"
      ],
      "target_answer": "Two: D → T and Y → G",
      "meaning": "day ↔ Tag (double shift)",
      "explanation": "The d hardened to t, and the ancient g that English vocalized to y still sounds at the end of Tag."
    },
    {
      "id": "l702_e3",
      "type": "variant_english",
      "prompt": "Select EVERY honest English rendering of this German sentence (watch out for tense traps):",
      "german": "Ich trinke heute kaltes Wasser",
      "renderings": [
        "I drink cold water today",
        "I am drinking cold water today"
      ],
      "traps": [
        "I drank cold water today",
        "I will drink cold water today"
      ],
      "target_answer": "I drink cold water today",
      "meaning": "I drink / am drinking cold water today",
      "explanation": "German present tense (ich trinke) covers both English simple present ('I drink') and progressive ('I am drinking'). [Ref: Swap ch back to k: the k → CH shelf — riechen is 'reek' (to smell)]"
    },
    {
      "id": "l702_e4",
      "type": "reverse_cognate",
      "prompt": "What four-letter English noun meaning 'a unit of language' is the D→T twin of 'Wort'?",
      "target_answer": "word",
      "meaning": "word (final d → t)",
      "explanation": "word → Wort: the final d hardened to t. English kept the soft d; German closed it."
    },
    {
      "id": "l702_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The dream is deep'",
      "target_answer": "Der Traum ist tief",
      "meaning": "The dream is deep",
      "vocab_hints": [
        {
          "word": "der",
          "translation": "the (masculine)",
          "note": "der Traum — masculine, like English 'the dream'"
        }
      ],
      "word_bank": [
        "Traum",
        "aber",
        "tief",
        "für",
        "ist",
        "Der"
      ],
      "explanation": "Two t-words, two stories: Traum is a D→T word, tief a D→T + P→F double — both answering to English d and p."
    }
  ],
  "summary": {
    "outcome": "Run all five shifts in both directions at speed, including double shifts.",
    "use_example": {
      "german": "Der Traum ist tief.",
      "english": "The dream is deep."
    },
    "takeaway": "German t? Test English d. German d? Test English th. Every letter is a receipt of one specific law.",
    "curiosity_teaser": "Next: the Latin Bridge — how French courtly culture handed you 500 German verbs ending in -ieren."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from D→T Discrimination Drills (The dream is deep):",
    "target_answer": "Der Traum ist tief",
    "word_bank": [
      "nicht",
      "tief",
      "ist",
      "Traum",
      "Der",
      "heute"
    ],
    "explanation": "Re-assembling \"Der Traum ist tief\" from scratch locks in the structural pattern of D→T Discrimination Drills without relying on short-term echo."
  }
};

export default lesson;
