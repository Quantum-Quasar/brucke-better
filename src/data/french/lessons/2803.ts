import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2803,
  "slug": "sprig-2803",
  "title": "Verb Dynasties: venir, tenir & prendre Matrices",
  "subtitle": "Prefix × root matrices: re-/de-/ob-/main-/com-/ap- across venir, tenir, and prendre.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "venir",
    "revenir",
    "devenir",
    "tenir",
    "obtenir",
    "maintenir",
    "prendre",
    "comprendre",
    "apprendre",
    "compris",
    "pris"
  ],
  "table_word_ids": [
    "venir",
    "revenir",
    "devenir",
    "tenir",
    "obtenir",
    "maintenir",
    "prendre",
    "comprendre",
    "apprendre",
    "compris",
    "pris"
  ],
  "hook": {
    "title": "Three Roots, Two Dozen Verbs — The Prefix × Root Matrix",
    "content": "Once you know venir ('to come'), tenir ('to hold', which conjugates identically to venir!), and prendre ('to take'), directional prefixes unlock revenir ('come back'), devenir ('become'), obtenir ('obtain/get'), maintenir ('maintain = hold in the hand!'), comprendre ('understand = grasp together'), and apprendre ('learn')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why maintenir is literally 'hand-hold'",
        "content": "main ('hand') + tenir ('hold') = maintenir ('to maintain')! And every prefixed compound conjugates 100% identically to its root!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Every Compound Conjugates Exactly Like Its Root (-venir, -tenir, -prendre)",
    "content": "venir → je viens / venu; tenir → je tiens / tenu; prendre → je prends / pris.",
    "linguist_note": "Derivational prefixation on Latin venīre, tenēre, and prehendere is shared across French and English.",
    "trap_note": "See the root (-venir, -tenir, -prendre) inside the compound and conjugate it like the base verb!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each prefixed verb with its literal building blocks and meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "revenir (re- + venir)",
          "german": "to come back / return"
        },
        {
          "id": "p2",
          "english": "devenir (de- + venir)",
          "german": "to become (come into a state)"
        },
        {
          "id": "p3",
          "english": "obtenir (ob- + tenir)",
          "german": "to obtain / get"
        },
        {
          "id": "p4",
          "english": "maintenir (main + tenir)",
          "german": "to maintain (hold in the hand)"
        },
        {
          "id": "p5",
          "english": "apprendre (ap- + prendre)",
          "german": "to learn (grasp toward oneself)"
        }
      ],
      "target_answer": "to come back / return, to become (come into a state), to obtain / get, to maintain (hold in the hand), to learn (grasp toward oneself)",
      "meaning": "revenir (re- + venir), devenir (de- + venir), obtenir (ob- + tenir), maintenir (main + tenir), apprendre (ap- + prendre)",
      "explanation": "Three roots (venir, tenir, prendre) generate all of these verbs.",
      "id": "fr2803_e1"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Verb Root × Form Matrix for 'comprendre' ('to understand') in the passé composé participle:",
      "rows": [
        "venir / revenir (come / come back)",
        "tenir / obtenir (hold / obtain)",
        "prendre / comprendre (take / understand)"
      ],
      "columns": [
        "Present (je)",
        "Past Participle"
      ],
      "cells": [
        [
          {
            "german": "je reviens",
            "english": "I come back"
          },
          {
            "german": "revenu",
            "english": "come back (participle)"
          }
        ],
        [
          {
            "german": "j'obtiens",
            "english": "I obtain / get"
          },
          {
            "german": "obtenu",
            "english": "obtained (participle)"
          }
        ],
        [
          {
            "german": "je comprends",
            "english": "I understand"
          },
          {
            "german": "compris",
            "english": "understood (participle)"
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
      "target_answer": "compris",
      "meaning": "understood (participle)",
      "row_law": "Each row follows its root family (-venir, -tenir, -prendre).",
      "column_law": "Column 1 is the 1st-person present; Column 2 is the past participle (-u for venir/tenir, -is for prendre).",
      "explanation": "prendre → pris, so comprendre → compris and apprendre → appris!",
      "id": "fr2803_e2"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French apprendre ('to learn') gave English which noun for a beginner learning a trade under a master?",
      "target_answer": "apprentice",
      "meaning": "apprentice ↔ apprendre ('to learn')",
      "explanation": "An apprentice is literally 'someone who is learning' (from Old French aprentiz, built on apprendre).",
      "id": "fr2803_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am learning French and I understand now",
      "cues": [
        "I learn the French → J'apprends le français + and I understand now → et je comprends maintenant"
      ],
      "idea_parts": [
        "first verb + object → J'apprends le français",
        "second verb + adverb → et je comprends maintenant"
      ],
      "target_answer": "J'apprends le français et je comprends maintenant",
      "meaning": "I am learning French and I understand now",
      "word_bank": [
        "apprendre",
        "je",
        "le",
        "français",
        "J'apprends",
        "et",
        "maintenant",
        "la",
        "comprends"
      ],
      "explanation": "Both j'apprends and je comprends follow je prends.",
      "diagnosis": {
        "slip": "used infinitive apprendre",
        "cue": "Conjugate j'apprends and je comprends like je prends."
      },
      "id": "fr2803_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je vais revenir demain matin",
      "replays": 2,
      "target_answer": "Je vais revenir demain matin",
      "meaning": "I am going to come back tomorrow morning",
      "cues": [
        "Je vais revenir",
        "demain matin"
      ],
      "explanation": "revenir = re- ('back') + venir ('come').",
      "affirmation": "You heard revenir and demain matin cleanly.",
      "id": "fr2803_e5"
    }
  ],
  "summary": {
    "outcome": "Decode and conjugate the -venir (revenir, devenir), -tenir (obtenir, maintenir), and -prendre (comprendre, apprendre) verb dynasties.",
    "use_example": {
      "german": "J'apprends vite et je vais revenir demain.",
      "english": "I learn quickly and I'm going to come back tomorrow."
    },
    "takeaway": "Learn three roots (venir, tenir, prendre) and six prefixes, and two dozen verbs conjugate themselves.",
    "curiosity_teaser": "Up next on Le Pont ([29] The French Mind): see how Verb Dynasties: venir, tenir & prendre Matrices leads directly into The French Mind."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am learning French and I understand now\" in French:",
    "target_answer": "J'apprends le français et je comprends maintenant",
    "word_bank": [
      "comprends",
      "ne",
      "le",
      "français",
      "maintenant",
      "je",
      "pas",
      "et",
      "J'apprends"
    ],
    "explanation": "Re-constructing \"J'apprends le français et je comprends maintenant\" from the underlying rule cements the pattern of Verb Dynasties: venir, tenir & prendre Matrices."
  }
};

export default lesson;
