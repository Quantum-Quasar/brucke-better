import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2303,
  "slug": "sprig-2303",
  "title": "The Double-Pronoun Highway",
  "subtitle": "Stacking two pronouns before the verb in strict order: me le, le lui, and y/en last.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "me",
    "te",
    "le",
    "la",
    "lui",
    "leur",
    "y",
    "en_pron",
    "donné",
    "parler",
    "voir"
  ],
  "table_word_ids": [
    "me",
    "te",
    "le",
    "la",
    "lui",
    "leur",
    "y",
    "en_pron",
    "donné",
    "parler",
    "voir"
  ],
  "hook": {
    "title": "What Happens When TWO Pronouns Walk Left at the Same Time?",
    "content": "When two pronouns walk left of the verb, they line up on a strict highway: Lane 1 (me, te, se, nous, vous) → Lane 2 (le, la, les) → Lane 3 (lui, leur) → Lane 4 (y) → Lane 5 (en)! So 'He gives it to me' is Il me le donne ('He to-me it gives'), and 'I give it to him/her' is Je le lui donne ('I it to-him/her give')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why me le is 'to-me it' but le lui is 'it to-him'",
        "content": "1st/2nd-person me, te, nous, vous ALWAYS stand first (tu me le donnes), whereas 3rd-person le/la/les stands before 3rd-person lui/leur (je le lui donne)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Pronoun Highway: (1) me/te/se/nous/vous → (2) le/la/les → (3) lui/leur → (4) y → (5) en",
    "content": "Read the highway from left to right before the verb or auxiliary.",
    "linguist_note": "Modern French clitic ordering places 1st/2nd person before accusative 3rd person, which in turn precedes dative 3rd person.",
    "trap_note": "Never say *Il le me donne — me/te/nous/vous always take Lane 1 (Il me le donne), while le/la precedes lui/leur (Je le lui donne)!"
  },
  "exercises": [
    {
      "type": "shift_select",
      "prompt": "How do you say 'There is some (of it)' by combining 'il y a' with 'en'?",
      "options": [
        "Il a y en",
        "Il en y a",
        "Il y en a"
      ],
      "target_answer": "Il y en a",
      "meaning": "There is some / There are some",
      "explanation": "On the pronoun highway, y always stands right before en: Il y en a.",
      "id": "fr2303_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word order of 'Tu me le donnes'?",
      "german": "Tu me le donnes",
      "natural": "You give it to me",
      "options": [
        "You to-me it give",
        "You give it to me",
        "You it to-me give"
      ],
      "target_answer": "You to-me it give",
      "meaning": "Literal structure: You to-me it give",
      "explanation": "me (Lane 1) precedes le (Lane 2) right before the verb donnes.",
      "id": "fr2303_e2"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Double-Pronoun Matrix before 'donne' ('gives') for 'to him/her (lui)' + 'it (le)':",
      "rows": [
        "to me (me)",
        "to you (te)",
        "to him / her (lui)"
      ],
      "columns": [
        "it (masculine le)",
        "it (feminine la)"
      ],
      "cells": [
        [
          {
            "german": "me le donne",
            "english": "gives it (m.) to me"
          },
          {
            "german": "me la donne",
            "english": "gives it (f.) to me"
          }
        ],
        [
          {
            "german": "te le donne",
            "english": "gives it (m.) to you"
          },
          {
            "german": "te la donne",
            "english": "gives it (f.) to you"
          }
        ],
        [
          {
            "german": "le lui donne",
            "english": "gives it (m.) to him/her"
          },
          {
            "german": "la lui donne",
            "english": "gives it (f.) to him/her"
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
          1
        ]
      ],
      "task": {
        "row": 2,
        "column": 0
      },
      "target_answer": "le lui donne",
      "meaning": "gives it (m.) to him/her",
      "row_law": "Rows 1–2 put 1st/2nd-person me/te FIRST; Row 3 puts 3rd-person le/la BEFORE lui.",
      "column_law": "Column 1 pairs with masculine le; Column 2 pairs with feminine la.",
      "explanation": "With 3rd-person lui, le/la stands first: Je le lui donne ('I give it to him/her').",
      "id": "fr2303_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you give it (masculine) to me",
      "cues": [
        "You to-me it give → Tu me le donnes"
      ],
      "idea_parts": [
        "subject → Tu",
        "double pronoun → me le",
        "verb → donnes"
      ],
      "target_answer": "Tu me le donnes",
      "meaning": "You give it to me",
      "word_bank": [
        "Tu",
        "le",
        "donnes",
        "lui",
        "la",
        "me"
      ],
      "explanation": "me takes Lane 1 and le takes Lane 2 before donnes.",
      "diagnosis": {
        "slip": "put le before me",
        "cue": "me always precedes le: Tu me le donnes."
      },
      "id": "fr2303_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je le lui ai déjà dit",
      "replays": 2,
      "target_answer": "Je le lui ai déjà dit",
      "meaning": "I already told it to him/her",
      "cues": [
        "Je le lui ai",
        "déjà dit"
      ],
      "explanation": "le lui stands before the auxiliary ai in the passé composé.",
      "affirmation": "You ordered le lui ai déjà dit accurately!",
      "id": "fr2303_e5"
    }
  ],
  "summary": {
    "outcome": "Stack two object pronouns before the verb using the 5-lane highway (me le, te la, le lui, y en).",
    "use_example": {
      "german": "Tu veux le livre ? — Oui, tu me le donnes ?",
      "english": "Do you want the book? — Yes, will you give it to me?"
    },
    "takeaway": "me/te/nous/vous go before le/la/les; le/la/les go before lui/leur; and y/en ride at the back.",
    "curiosity_teaser": "Up next on Le Pont ([24] Reflexives & la Routine): see how The Double-Pronoun Highway leads directly into Reflexives & la Routine."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"You give it to me\" in French:",
    "target_answer": "Tu me le donnes",
    "word_bank": [
      "me",
      "ne",
      "donnes",
      "le",
      "pas",
      "Tu"
    ],
    "explanation": "Re-constructing \"Tu me le donnes\" from the underlying rule cements the pattern of The Double-Pronoun Highway."
  }
};

export default lesson;
