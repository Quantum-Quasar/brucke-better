import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 902,
  "slug": "thou-st-drill-circuit",
  "title": "Thou -st Drill Circuit",
  "subtitle": "du -st across five verbs — Shakespeare as muscle memory",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "lernen",
    "kommen",
    "trinken",
    "machen",
    "denken",
    "du",
    "sein"
  ],
  "table_word_ids": [
    "lernen",
    "kommen",
    "trinken",
    "machen",
    "denken",
    "du",
    "sein",
    "schnee",
    "mädchen",
    "nase",
    "bahnhof",
    "rechnen",
    "hageln",
    "echt",
    "schein",
    "feuerwehr"
  ],
  "hook": {
    "title": "The Circuit",
    "content": "One ending, five verbs, no mercy: du lernst, du kommst, du trinkst, du machst, du denkst. The -st you attach is not German's invention — it is the exact ending of Early Modern English: thou learn'st, thou comest, thou drinkest. Shakespeare conjugated German before Germany standardized it. Run the circuit until adding -st feels as automatic as it felt to a 1600s English speaker — because historically, it is the same gesture.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Second/Third Pairing",
        "content": "du -st and er -t ride together: lernst/lernt, kommst/kommt, denkst/denkt. In old English: thou learnest, he learneth. The consonants of the endings are identical; only the vowel spelling drifted apart."
      }
    ]
  },
  "pattern": {
    "title": "Run the Circuit",
    "content": "lernen: du lernst, er lernt. kommen: du kommst, er kommt. trinken: du trinkst, er trinkt. machen: du machst, er macht. denken: du denkst, er denkt — and sein refuses the pattern, as always: du bist (thou art!), er ist. Notice the circuit never asks the stem to change: komm-, trink-, mach-, denk- stay solid while only the tail rotates. In sentences, du-verbs sit in position 2 like anyone else — and in questions the verb even leads: Kommst du morgen?",
    "footnotes": [],
    "linguist_note": "Kommst du? is verb-first inversion — the question form English rebuilt with do-support ('Do you come?'). German kept the older Germanic way: swap subject and verb, add nothing. Archaic English agrees: 'Knowest thou?'"
  },
  "exercises": [
    {
      "id": "l902_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the thou-form of denken (mind the nk):",
      "tile_options": [
        "t",
        "e",
        "en",
        "denk",
        "du",
        "st"
      ],
      "target_answer": "du denkst",
      "meaning": "you think / thou thinkest",
      "explanation": "Stem 'denk-' + the Shakespearean '-st' = denkst. The nk is think's k, surviving intact."
    },
    {
      "id": "l902_e2",
      "type": "matching_pairs",
      "prompt": "Run the circuit — match each du-form with its er-twin:",
      "matching_pairs": [
        {
          "id": "tc1",
          "english": "du lernst",
          "german": "er lernt"
        },
        {
          "id": "tc2",
          "english": "du kommst",
          "german": "er kommt"
        },
        {
          "id": "tc3",
          "english": "du machst",
          "german": "er macht"
        },
        {
          "id": "tc4",
          "english": "du denkst",
          "german": "er denkt"
        }
      ],
      "target_answer": "er lernt, er kommt, er macht, er denkt",
      "meaning": "he learns, he comes, he makes, he thinks",
      "explanation": "du -st and er -t are the same consonant in two old costumes: thou learnest, he learneth."
    },
    {
      "id": "l902_e3",
      "type": "shift_select",
      "prompt": "Which verb refuses the circuit entirely?",
      "options": [
        "kommen (du kommst)",
        "machen (du machst)",
        "lernen (du lernst)",
        "sein (du bist — thou art)"
      ],
      "target_answer": "sein (du bist — thou art)",
      "meaning": "sein is the eternal irregular",
      "explanation": "du bist is the exact twin of 'thou art' — sein kept one of the oldest forms in either language."
    },
    {
      "id": "l902_e4",
      "type": "family_matrix",
      "prompt": "Complete the subject × conjugation matrix for 'you drink':",
      "row_law": "Row: person ending (ich → -e, du → -st)",
      "column_law": "Column: core verb stem (trink-, mach-)",
      "rows": [
        "ich (-e)",
        "du (-st)"
      ],
      "columns": [
        "trink-",
        "mach-"
      ],
      "cells": [
        [
          {
            "german": "ich trinke",
            "english": "I drink"
          },
          {
            "german": "ich mache",
            "english": "I make"
          }
        ],
        [
          {
            "german": "du trinkst",
            "english": "you drink"
          },
          {
            "german": "du machst",
            "english": "you make"
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
          1
        ]
      ],
      "task": {
        "row": 1,
        "column": 0
      },
      "target_answer": "du trinkst",
      "meaning": "you drink",
      "explanation": "The du-ending -st snaps onto the stem trink- to form du trinkst (while art stays feminine). [Ref: trinkt]"
    },
    {
      "id": "l902_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'You think of me'",
      "target_answer": "Du denkst an mich",
      "meaning": "You think of me",
      "vocab_hints": [
        {
          "word": "an",
          "translation": "of / about (preposition)",
          "note": "denken an — the same pairing you met with 'Ich denke an dich'"
        },
        {
          "word": "mich",
          "translation": "me (direct object)",
          "note": "mich ↔ me — the accusative twin"
        }
      ],
      "word_bank": [
        "Du",
        "kein",
        "denkst",
        "mich",
        "früh",
        "an"
      ],
      "explanation": "du + denkst in position 2, and the accusative mich closes the thought — 'thou thinkest of me'."
    }
  ],
  "summary": {
    "outcome": "Conjugate five verbs in du and er forms on sight, including the sein exception.",
    "use_example": {
      "german": "Du denkst an mich.",
      "english": "You think of me (thou thinkest of me)."
    },
    "takeaway": "du -st / er -t across every regular verb — the Shakespearean circuit — with du bist as the lone rebel.",
    "curiosity_teaser": "Next: pronouns as case anchors — the him-case: why der becomes den and English him proves it."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Thou -st Drill Circuit (You think of me):",
    "target_answer": "Du denkst an mich",
    "word_bank": [
      "Du",
      "an",
      "heute",
      "mich",
      "denkst",
      "nicht"
    ],
    "explanation": "Re-assembling \"Du denkst an mich\" from scratch locks in the structural pattern of Thou -st Drill Circuit without relying on short-term echo."
  }
};

export default lesson;
