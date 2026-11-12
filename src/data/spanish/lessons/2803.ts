import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2803,
  "slug": "verb-dynasties-poner-tener-traer-mostrar",
  "title": "Verb Dynasties: poner, tener, traer & mostrar Matrices",
  "subtitle": "Language Transfer's Latin prefix × root matrix: suponer/proponer/componer, obtener/mantener, atraer/distraer, mostrar/demostrar",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "poner",
    "proponer",
    "suponer",
    "tener",
    "mantener",
    "obtener",
    "mostrar",
    "demostrar",
    "traer"
  ],
  "table_word_ids": [
    "poner",
    "proponer",
    "suponer",
    "tener",
    "mantener",
    "obtener",
    "mostrar",
    "demostrar",
    "traer"
  ],
  "hook": {
    "title": "One Root × Five Prefixes = Twenty Verbs for Free!",
    "content": "One of the crowning revelations of *Complete Spanish* and *thinking-method.md* is the **Latin Verb Dynasty Matrix**. Instead of memorizing isolated verbs, look at how Latin prefixes (pro-, su-, com-, ex-, ob-, man-, de-, a-, dis-) snap onto four core Spanish roots — and every compound verb conjugates 100% identically to its root verb!\n1) **-poner** ('to put/place', yo pongo; English -pose): **proponer** (propose, yo propongo), **suponer** (suppose, yo supongo), **componer** (compose)!\n2) **-tener** ('to hold/have', yo tengo; English -tain): **mantener** (maintain = mano + tener 'hold in the hand'!, yo mantengo), **obtener** (obtain, yo obtengo), **contener** (contain)!\n3) **-traer** ('to pull/bring', yo traigo; English -tract): **atraer** (attract), **distraer** (distract)!\n4) **-mostrar** ('to show', o→ue boot verb: yo muestro): **demostrar** ('to demonstrate/prove', yo demuestro)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why English Says '-pose' While Spanish Says '-poner'",
        "content": "In Latin, the verb was pōnere ('to put' → Spanish poner), and its past participle was positus (→ Spanish puesto). English borrowed the participle stem -pose, while Spanish kept the infinitive -poner!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Why 'Propose' Is 'Proponer' and 'Maintain' Is 'Mantener'",
    "content": "Whenever an English verb ends in **-pose** (propose, suppose, compose, expose, impose), swap **-pose** for **-poner**! Whenever an English verb ends in **-tain** (maintain, obtain, contain, retain), swap **-tain** for **-tener**! Whenever an English verb ends in **-tract** (attract, distract, extract, contract), swap **-tract** for **-traer**!",
    "trap_note": "Notice how mostrar ('to show') and demostrar ('to demonstrate/prove') are both o→ue boot verbs: muestro ('I show'), demuestro ('I demonstrate')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to put / place (pongo)",
          "german": "poner"
        },
        {
          "id": "p2",
          "english": "to propose (propongo)",
          "german": "proponer"
        },
        {
          "id": "p3",
          "english": "to suppose (supongo)",
          "german": "suponer"
        },
        {
          "id": "p4",
          "english": "to maintain ('hold in hand': mantengo)",
          "german": "mantener"
        },
        {
          "id": "p5",
          "english": "to obtain (obtengo)",
          "german": "obtener"
        },
        {
          "id": "p6",
          "english": "to show / to demonstrate (muestro / demuestro)",
          "german": "mostrar / demostrar"
        }
      ],
      "target_answer": "poner, proponer, suponer, mantener, obtener, mostrar / demostrar",
      "meaning": "to put / place (pongo), to propose (propongo), to suppose (supongo), to maintain ('hold in hand': mantengo), to obtain (obtengo), to show / to demonstrate (muestro / demuestro)",
      "explanation": "Every prefixed compound keeps the exact conjugation of its base verb (pongo → propongo/supongo; tengo → mantengo/obtengo; muestro → demuestro)!",
      "id": "es2803_e1"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Verb Dynasty Matrix by building 'to propose' (pro- + poner):",
      "rows": [
        "pro- (forward)",
        "su- / man- (under / in hand)",
        "ob- / com- (toward / together)"
      ],
      "columns": [
        "-poner (English -pose)",
        "-tener (English -tain)"
      ],
      "cells": [
        [
          {
            "german": "proponer",
            "english": "to propose"
          },
          {
            "german": "retener",
            "english": "to retain"
          }
        ],
        [
          {
            "german": "suponer",
            "english": "to suppose"
          },
          {
            "german": "mantener",
            "english": "to maintain"
          }
        ],
        [
          {
            "german": "componer",
            "english": "to compose"
          },
          {
            "german": "obtener",
            "english": "to obtain"
          }
        ]
      ],
      "seed": [
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
        ],
        [
          2,
          1
        ]
      ],
      "task": {
        "row": 0,
        "column": 0
      },
      "target_answer": "proponer",
      "meaning": "to propose (yo propongo)",
      "row_law": "Each row attaches a Latin prefix (pro-, su-/man-, ob-/com-).",
      "column_law": "Column 1 uses the root poner (English -pose); Column 2 uses the root tener (English -tain).",
      "explanation": "English -pose always maps to Spanish -poner: pro- + poner = proponer!",
      "id": "es2803_e2"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'to maintain' ('to hold in the hand') from its hand-prefix and the root 'tener':",
      "tile_options": [
        "man",
        "poner",
        "tain",
        "tener"
      ],
      "target_answer": "mantener",
      "meaning": "mantener (to maintain)",
      "explanation": "man (from mano 'hand') + tener ('to hold') = mantener!",
      "id": "es2803_e3"
    },
    {
      "type": "shift_select",
      "prompt": "Since 'yo pongo' means 'I put', how do you say 'I suppose' (from suponer)?",
      "options": [
        "*yo supuso",
        "*yo supono",
        "yo supongo"
      ],
      "target_answer": "yo supongo",
      "meaning": "I suppose",
      "explanation": "suponer conjugates identically to poner: pongo → supongo!",
      "id": "es2803_e4"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to maintain the tradition'",
      "target_answer": "Quiero mantener la tradición",
      "meaning": "I want to maintain the tradition",
      "word_bank": [
        "poner",
        "obtener",
        "tradición",
        "la",
        "Quiero",
        "el",
        "mantener"
      ],
      "explanation": "Quiero + mantener + la tradición.",
      "id": "es2803_e5"
    }
  ],
  "summary": {
    "outcome": "Decode and conjugate the -poner (-pose), -tener (-tain), -traer (-tract), and -mostrar verb dynasties.",
    "use_example": {
      "german": "Supongo que quieres mantener la tradición y obtener la confirmación.",
      "english": "I suppose that you want to maintain the tradition and obtain the confirmation."
    },
    "takeaway": "English -pose = Spanish -poner (pongo); English -tain = Spanish -tener (tengo); English -tract = Spanish -traer (traigo)!",
    "curiosity_teaser": "Up next ([5091] Relative Clauses in Depth): con quien, lo que and donde — the relatives grow up!"
  },
  "twist": {
    "prompt": "Assemble: 'I want to obtain the confirmation'",
    "target_answer": "Quiero obtener la confirmación",
    "word_bank": [
      "confirmación",
      "el",
      "mantener",
      "Quiero",
      "obtener",
      "poner",
      "la"
    ],
    "explanation": "Quiero obtener la confirmación."
  }
};

export default lesson;
