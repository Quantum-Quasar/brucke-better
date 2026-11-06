import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1402,
  "slug": "sprig-1402",
  "title": "Famille Gym",
  "subtitle": "Drills across père, mère, frère, sœur, famille with mon/ma/mes, ton/ta/tes, son/sa/ses.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mon",
    "ma",
    "mes",
    "ton",
    "son",
    "sa",
    "notre",
    "votre",
    "leur",
    "père",
    "mère",
    "frère",
    "sœur",
    "famille"
  ],
  "table_word_ids": [
    "mon",
    "ma",
    "mes",
    "ton",
    "son",
    "sa",
    "notre",
    "votre",
    "leur",
    "père",
    "mère",
    "frère",
    "sœur",
    "famille"
  ],
  "hook": {
    "title": "The Complete Possessive Matrix Across the Family Tree",
    "content": "Singular owners (mon/ma/mes, ton/ta/tes, son/sa/ses) have three forms (masculine, feminine, plural), while plural owners (notre/nos 'our', votre/vos 'your', leur/leurs 'their') only have TWO forms — one for any singular noun (notre père, notre mère, leur frère, leur sœur) and one with -s for any plural noun (nos amis, vos billets, leurs parents)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why leur means both 'to them' (before a verb) and 'their' (before a noun)",
        "content": "Before a noun, leur/leurs means 'their' (leur maison, leurs amis). Before a verb (Topic 23), leur means 'to them' (je leur parle)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Singular Owners Have 3 Cards (m/f/pl); Plural Owners Have 2 Cards (sg/pl)",
    "content": "Walk the matrix across the family nouns: mon père, ma mère, mes parents; notre père, notre mère, nos parents; leur frère, leur sœur, leurs amis.",
    "linguist_note": "French possessive determiners distinguish gender only when the possessor is singular.",
    "trap_note": "Don't invent a feminine form for notre, votre, or leur — they already end in -e in both genders!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each plural-owner possessive phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "notre famille (singular)",
          "german": "our family"
        },
        {
          "id": "p2",
          "english": "nos amis (plural)",
          "german": "our friends"
        },
        {
          "id": "p3",
          "english": "votre réservation (singular)",
          "german": "your reservation"
        },
        {
          "id": "p4",
          "english": "leur maison (singular)",
          "german": "their house"
        },
        {
          "id": "p5",
          "english": "leurs frères (plural)",
          "german": "their brothers"
        }
      ],
      "target_answer": "our family, our friends, your reservation, their house, their brothers",
      "meaning": "notre famille (singular), nos amis (plural), votre réservation (singular), leur maison (singular), leurs frères (plural)",
      "explanation": "notre/nos, votre/vos, leur/leurs only change between singular and plural.",
      "id": "fr1402_e1"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Possessive × Noun Matrix for 'their sister' (leur + sœur):",
      "rows": [
        "my (1st sg.)",
        "his / her (3rd sg.)",
        "their (3rd pl.)"
      ],
      "columns": [
        "Masculine (frère)",
        "Feminine (sœur)",
        "Plural (amis)"
      ],
      "cells": [
        [
          {
            "german": "mon frère",
            "english": "my brother"
          },
          {
            "german": "ma sœur",
            "english": "my sister"
          },
          {
            "german": "mes amis",
            "english": "my friends"
          }
        ],
        [
          {
            "german": "son frère",
            "english": "his/her brother"
          },
          {
            "german": "sa sœur",
            "english": "his/her sister"
          },
          {
            "german": "ses amis",
            "english": "his/her friends"
          }
        ],
        [
          {
            "german": "leur frère",
            "english": "their brother"
          },
          {
            "german": "leur sœur",
            "english": "their sister"
          },
          {
            "german": "leurs amis",
            "english": "their friends"
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
          0,
          2
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
          1,
          2
        ],
        [
          2,
          0
        ],
        [
          2,
          2
        ]
      ],
      "task": {
        "row": 2,
        "column": 1
      },
      "target_answer": "leur sœur",
      "meaning": "their sister",
      "row_law": "Rows 1–2 split masculine/feminine; Row 3 (their) uses 'leur' for both singular genders and 'leurs' for plural.",
      "column_law": "Columns 1–2 are singular possessions; Column 3 is plural possessions.",
      "explanation": "Plural owners (notre, votre, leur) use the exact same form for masculine and feminine singular: leur frère, leur sœur.",
      "id": "fr1402_e2"
    },
    {
      "type": "derive",
      "prompt": "Translate 'our mother and our father' using 'notre':",
      "english_hint": "notre is invariable in singular",
      "target_answer": "notre mère et notre père",
      "meaning": "our mother and our father",
      "explanation": "notre serves both feminine mère and masculine père.",
      "id": "fr1402_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "my parents are with their friends (use Mes parents sont avec leurs amis)",
      "cues": [
        "My parents are → Mes parents sont",
        "with their friends → avec leurs amis"
      ],
      "idea_parts": [
        "subject + verb → Mes parents sont",
        "preposition + plural possessive → avec leurs amis"
      ],
      "target_answer": "Mes parents sont avec leurs amis",
      "meaning": "My parents are with their friends",
      "word_bank": [
        "avec",
        "leur",
        "parents",
        "sont",
        "amis",
        "Mes",
        "Mon",
        "leurs"
      ],
      "explanation": "Plural parents takes Mes, and plural amis takes leurs.",
      "diagnosis": {
        "slip": "used singular leur before plural amis",
        "cue": "Before plural amis, leur adds -s: leurs amis."
      },
      "id": "fr1402_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Voici votre table et vos cafés",
      "replays": 2,
      "target_answer": "Voici votre table et vos cafés",
      "meaning": "Here is your table and your coffees",
      "cues": [
        "Voici votre table",
        "et vos cafés"
      ],
      "explanation": "votre (singular) vs. vos (plural).",
      "affirmation": "You contrasted singular votre and plural vos cleanly.",
      "id": "fr1402_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy the complete possessive system across family and everyday nouns.",
    "use_example": {
      "german": "Notre famille aime beaucoup vos amis.",
      "english": "Our family likes your friends a lot."
    },
    "takeaway": "mon/ton/son split m/f/pl; notre/votre/leur only split singular vs. plural.",
    "curiosity_teaser": "Up next on Le Pont ([1403] Demonstratives & Stressed Pronouns): see how Famille Gym leads directly into Demonstratives & Stressed Pronouns."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"My parents are with their friends\" in French:",
    "target_answer": "Mes parents sont avec leurs amis",
    "word_bank": [
      "Mes",
      "amis",
      "pas",
      "sont",
      "ne",
      "leurs",
      "avec",
      "parents"
    ],
    "explanation": "Re-constructing \"Mes parents sont avec leurs amis\" from the underlying rule cements the pattern of Famille Gym."
  }
};

export default lesson;
