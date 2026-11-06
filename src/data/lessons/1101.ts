import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1101,
  "slug": "article-gym-20-nouns-3-colors",
  "title": "Article Gym: 20 Nouns, 3 Colors",
  "subtitle": "Rapid der/die/das assignment with every table noun you have met",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "der",
    "die",
    "das",
    "haus",
    "glas",
    "brot",
    "gold",
    "sand",
    "butter",
    "kaffee",
    "tee",
    "tisch",
    "traum",
    "tag",
    "zeit",
    "wasser",
    "buch",
    "milch",
    "straße",
    "tochter"
  ],
  "table_word_ids": [
    "haus",
    "glas",
    "brot",
    "kaffee",
    "zeit",
    "wasser",
    "der",
    "die",
    "das",
    "gold",
    "sand",
    "butter",
    "tee",
    "tisch",
    "traum",
    "tag",
    "buch",
    "milch",
    "straße",
    "tochter"
  ],
  "hook": {
    "title": "The Color Reflex",
    "content": "Twenty nouns you already own. One job: attach the right flag — der (blue), die (rose), das (green) — without hesitating. This gym is not about logic; it is about reps. Every noun below has already met you in a lesson, carrying its flag. Today you prove the flags stuck. Speed round, three colors, twenty nouns — and every miss feeds the retry queue until the reflex is permanent.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why the App Uses Colors",
        "content": "der = blue, die = rose, das = green across every table, drawer, and card in Brücke. Gender is ancestry, not logic — so it is learned like pronunciation: by exposure and repetition, one color at a time."
      }
    ]
  },
  "pattern": {
    "title": "The Noun Lineup",
    "content": "das Haus, das Glas, das Brot, das Gold — the neuter home-and-matter set. der Kaffee, der Tee, der Tisch, der Traum, der Tag, der Sand — the masculine café-and-time set. die Butter, die Zeit, die Milch, die Straße, die Tochter — the feminine flow set. das Wasser, das Buch — two exceptions to enjoy. Spot the soft patterns when they appear (many -e nouns are die; German drinks are der) but trust the colors first — heuristics get their own lesson later.",
    "footnotes": [],
    "linguist_note": "A quiet head start: agent nouns ending in -er are always der (der Fernseher, der Staubsauger), and -chen/-lein are always das — two laws you will formalize in the Gender Heuristics lesson."
  },
  "exercises": [
    {
      "id": "l1101_e1",
      "type": "shift_select",
      "prompt": "Flag check: _____ Haus",
      "options": [
        "das",
        "der",
        "die"
      ],
      "target_answer": "das",
      "meaning": "das Haus — the house",
      "explanation": "das Haus — the neuter flag, green in the app's colors."
    },
    {
      "id": "l1101_e2",
      "type": "shift_select",
      "prompt": "Flag check: _____ Zeit",
      "options": [
        "der",
        "die",
        "das"
      ],
      "target_answer": "die",
      "meaning": "die Zeit — the time",
      "explanation": "die Zeit — and most -e nouns share the rose flag, though the proof is always the word itself."
    },
    {
      "id": "l1101_e3",
      "type": "matching_pairs",
      "prompt": "Match each noun with its article:",
      "matching_pairs": [
        {
          "id": "ag1",
          "english": "coffee",
          "german": "der Kaffee"
        },
        {
          "id": "ag2",
          "english": "butter",
          "german": "die Butter"
        },
        {
          "id": "ag3",
          "english": "glass",
          "german": "das Glas"
        },
        {
          "id": "ag4",
          "english": "street",
          "german": "die Straße"
        }
      ],
      "target_answer": "der Kaffee, die Butter, das Glas, die Straße",
      "meaning": "the coffee, the butter, the glass, the street",
      "explanation": "Café drinks lean masculine; das Glas keeps its neuter flag from the Hidden Twins lesson."
    },
    {
      "id": "l1101_e4",
      "type": "family_matrix",
      "prompt": "Complete the Determiner × Case matrix for the masculine accusative ('a'):",
      "row_law": "Row: Definite (der/den) vs. Indefinite (ein/einen)",
      "column_law": "Column: Nominative subject vs. Accusative object",
      "rows": [
        "Definite (the)",
        "Indefinite (a)"
      ],
      "columns": [
        "Nominative",
        "Accusative"
      ],
      "cells": [
        [
          {
            "german": "der",
            "english": "the (subj.)"
          },
          {
            "german": "den",
            "english": "the (obj.)"
          }
        ],
        [
          {
            "german": "ein",
            "english": "a (subj.)"
          },
          {
            "german": "einen",
            "english": "a (obj.)"
          }
        ]
      ],
      "seed": [
        [
          0,
          0
        ],
        [
          0,
          1
        ],
        [
          1,
          0
        ]
      ],
      "task": {
        "row": 1,
        "column": 1
      },
      "target_answer": "einen",
      "meaning": "a (masculine accusative)",
      "explanation": "ein marches in step with der: in the accusative Him-Case, der → den and ein → einen (kurz gesagt). [Ref: der Kaffee, die Zeit, das Wasser]"
    },
    {
      "id": "l1101_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The time is short' (with the article)",
      "target_answer": "Die Zeit ist kurz",
      "meaning": "Die Zeit ist kurz = The time is short",
      "vocab_hints": [
        {
          "word": "kurz",
          "translation": "short",
          "note": "no English twin needed — it survives in the name Kurt"
        }
      ],
      "word_bank": [
        "Die",
        "mit",
        "Zeit",
        "ist",
        "nicht",
        "kurz"
      ],
      "explanation": "die Zeit with its rose flag, capitalized mid-sentence like every German noun."
    }
  ],
  "summary": {
    "outcome": "Assign der/die/das to twenty high-frequency nouns without hesitation.",
    "use_example": {
      "german": "Die Zeit ist kurz.",
      "english": "The time is short."
    },
    "takeaway": "Gender is collected with the word, flagged in color — reps build the reflex before rules explain it.",
    "curiosity_teaser": "Next: jener ↔ yon — the far demonstrative, and the full map of this/that/yon in one grid."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Article Gym: 20 Nouns, 3 Colors (Die Zeit ist kurz = The time is short):",
    "target_answer": "Die Zeit ist kurz",
    "word_bank": [
      "Die",
      "kurz",
      "ist",
      "Zeit",
      "nicht",
      "heute"
    ],
    "explanation": "Re-assembling \"Die Zeit ist kurz\" from scratch locks in the structural pattern of Article Gym: 20 Nouns, 3 Colors without relying on short-term echo."
  }
};

export default lesson;
