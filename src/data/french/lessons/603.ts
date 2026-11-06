import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 603,
  "slug": "sprig-603",
  "title": "The -ment & -able Twin Bridges",
  "subtitle": "Adverbs in -ment (exactement, naturellement) and adjectives in -able/-ible (possible, capable).",
  "phase": 1,
  "shift_categories": [
    "ment",
    "able"
  ],
  "word_ids": [
    "exactement",
    "naturellement",
    "rapidement",
    "vraiment",
    "heureusement",
    "finalement",
    "possible",
    "impossible",
    "capable",
    "adorable",
    "visible",
    "terrible"
  ],
  "table_word_ids": [
    "exactement",
    "naturellement",
    "rapidement",
    "vraiment",
    "heureusement",
    "finalement",
    "possible",
    "impossible",
    "capable",
    "adorable",
    "visible",
    "terrible"
  ],
  "hook": {
    "title": "Why Adverbs Are Built From a Feminine 'Mind'",
    "content": "How do you say 'rapidly, naturally, exactly, fortunately, finally' in French? Where English glues '-ly' onto an adjective, French glues -ment (/mɑ̃/) onto the FEMININE form of the adjective (exacte → exactement, naturelle → naturellement, heureuse → heureusement) because in Latin, mente meant 'with a [...] mind'!",
    "footnotes": [
      {
        "marker": "1",
        "title": "The -able and -ible free pass",
        "content": "Adjectives ending in -able or -ible (possible, impossible, capable, adorable, visible, terrible) keep the exact same spelling as English and already end in -e for both genders!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Feminine Adjective + -ment = Adverb",
    "content": "Take the feminine adjective (exacte, naturelle, finale, heureuse, rapide) and attach -ment: exactement, naturellement, finalement, heureusement, rapidement.",
    "linguist_note": "Latin ablative singular mente grammaticalized into the pan-Romance adverbial suffix -ment.",
    "trap_note": "Remember: 'actually/really' is vraiment (never actuellement), and 'eventually/finally' is finalement (never éventuellement)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each -able/-ible or -ment word with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "vraiment (vrai + ment)",
          "german": "really / truly"
        },
        {
          "id": "p2",
          "english": "finalement (true word for 'eventually')",
          "german": "finally / eventually"
        },
        {
          "id": "p3",
          "english": "capable (invariable for gender)",
          "german": "capable / able"
        },
        {
          "id": "p4",
          "english": "visible (invariable for gender)",
          "german": "visible"
        }
      ],
      "target_answer": "really / truly, finally / eventually, capable / able, visible",
      "meaning": "vraiment (vrai + ment), finalement (true word for 'eventually'), capable (invariable for gender), visible (invariable for gender)",
      "explanation": "-able/-ible adjectives never change spelling between masculine and feminine singular.",
      "id": "fr603_e1"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Adjective → Feminine → -ment Adverb matrix for 'fortunately / happily' (from heureux → heureuse):",
      "rows": [
        "exact (exact)",
        "naturel (natural)",
        "heureux (happy/fortunate)"
      ],
      "columns": [
        "Feminine Adjective",
        "-ment Adverb"
      ],
      "cells": [
        [
          {
            "german": "exacte",
            "english": "exact (f.)"
          },
          {
            "german": "exactement",
            "english": "exactly"
          }
        ],
        [
          {
            "german": "naturelle",
            "english": "natural (f.)"
          },
          {
            "german": "naturellement",
            "english": "naturally"
          }
        ],
        [
          {
            "german": "heureuse",
            "english": "happy/fortunate (f.)"
          },
          {
            "german": "heureusement",
            "english": "fortunately / happily"
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
        ],
        [
          1,
          1
        ],
        [
          2,
          0
        ]
      ],
      "task": {
        "row": 2,
        "column": 1
      },
      "target_answer": "heureusement",
      "meaning": "fortunately / happily",
      "row_law": "Each row takes an adjective through its feminine stem into its -ment adverb.",
      "column_law": "Column 1 is the feminine adjective (with -e); Column 2 attaches -ment ('with a ... mind').",
      "explanation": "heureux → feminine heureuse → heureusement ('fortunately / happily').",
      "id": "fr603_e2"
    },
    {
      "type": "derive",
      "prompt": "Build the French adverb from feminine 'naturelle' ('natural'):",
      "english_hint": "naturelle + ment",
      "target_answer": "naturellement",
      "meaning": "naturally",
      "explanation": "naturelle + ment = naturellement.",
      "id": "fr603_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "it is really possible today",
      "cues": [
        "It is → C'est",
        "really → vraiment",
        "possible today → possible aujourd'hui"
      ],
      "idea_parts": [
        "pointer → C'est",
        "adverb + adjective → vraiment possible",
        "time → aujourd'hui"
      ],
      "target_answer": "C'est vraiment possible aujourd'hui",
      "meaning": "It is really possible today",
      "word_bank": [
        "C'est",
        "la",
        "vrai",
        "vraiment",
        "aujourd'hui",
        "possible"
      ],
      "explanation": "vraiment modifies possible right after C'est.",
      "diagnosis": {
        "slip": "used vrai instead of vraiment",
        "cue": "Use the adverb vraiment ('really') before possible."
      },
      "id": "fr603_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Heureusement, la tour est visible",
      "replays": 2,
      "target_answer": "Heureusement, la tour est visible",
      "meaning": "Fortunately, the tower is visible",
      "cues": [
        "Adverb: Heureusement",
        "clause: la tour est visible"
      ],
      "explanation": "visible already ends in -e for both genders.",
      "affirmation": "You spelled Heureusement and visible accurately.",
      "id": "fr603_e5"
    }
  ],
  "summary": {
    "outcome": "Build French adverbs by adding -ment to the feminine adjective, and use invariable -able/-ible cognates.",
    "use_example": {
      "german": "Finalement, c'est vraiment possible.",
      "english": "In the end, it's really possible."
    },
    "takeaway": "English -ly is French feminine + -ment, and -able/-ible words cross unchanged.",
    "curiosity_teaser": "Up next on Le Pont ([7] Questions à la Française): see how The -ment & -able Twin Bridges leads directly into Questions à la Française."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"It is really possible today\" in French:",
    "target_answer": "C'est vraiment possible aujourd'hui",
    "word_bank": [
      "aujourd'hui",
      "vraiment",
      "pas",
      "C'est",
      "ne",
      "possible"
    ],
    "explanation": "Re-constructing \"C'est vraiment possible aujourd'hui\" from the underlying rule cements the pattern of The -ment & -able Twin Bridges."
  }
};

export default lesson;
