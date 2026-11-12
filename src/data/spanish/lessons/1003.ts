import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1003,
  "slug": "boot-verbs-under-stress",
  "title": "Boot Verbs: e→ie, o→ue & e→i Under Stress",
  "subtitle": "Why querer (quiero/queremos), poder (puedo/podemos), tener (tienes/tenemos), and pedir (pido/pedimos) split their stem vowel only when stressed",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "querer",
    "poder",
    "puedo",
    "puedes",
    "dormir",
    "empezar",
    "pedir",
    "preferir",
    "tener",
    "tenemos"
  ],
  "table_word_ids": [
    "querer",
    "poder",
    "puedo",
    "puedes",
    "dormir",
    "empezar",
    "pedir",
    "preferir",
    "tener",
    "tenemos"
  ],
  "hook": {
    "title": "Not 'Irregular' — Just Stress-Driven!",
    "content": "Textbooks terrify learners with long lists of 'stem-changing boot verbs'. Language Transfer reveals the simple acoustic truth: in Vulgar Latin, stressed short E and short O stretched out into two-vowel diphthongs (e → ie, o → ue). Whenever your voice stresses the stem (yo, tú, él/ella/usted, ellos), the vowel splits: quiero, puedes, duermo ('I sleep'), empiezo ('I start'), prefiero ('I prefer'). Whenever the stress steps onto the nosotros ending (-emos / -imos / -amos), the stem vowel stays single: queremos, podemos, dormimos, empezamos, preferimos!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why Teachers Call Them 'Boot Verbs'",
        "content": "If you draw a box around the 1st, 2nd, and 3rd person singular on the left and 3rd person plural at the bottom right — leaving out nosotros in the top right — the outline looks just like a boot!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Three Vowel Shifts: e→ie, o→ue, and e→i",
    "content": "1) e → ie: querer (quiero / queremos), empezar (empiezo / empezamos), preferir (prefiero / preferimos).\n2) o → ue: poder ('to be able to / can' → puedo, puedes, puede / podemos), dormir ('to sleep' → duermo / dormimos).\n3) e → i (in -ir verbs like pedir 'to ask for / order'): pido, pides, pide / pedimos!",
    "trap_note": "Never put *por after pedir when asking for an item (*pedir por un café). Pedir already contains 'for': Quiero pedir un café!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I can / am able to (poder: o→ue)",
          "german": "puedo"
        },
        {
          "id": "p2",
          "english": "you can (poder: o→ue)",
          "german": "puedes"
        },
        {
          "id": "p3",
          "english": "we can (unstressed stem!)",
          "german": "podemos"
        },
        {
          "id": "p4",
          "english": "I prefer (preferir: e→ie)",
          "german": "prefiero"
        },
        {
          "id": "p5",
          "english": "I order / ask for (pedir: e→i)",
          "german": "pido"
        },
        {
          "id": "p6",
          "english": "to sleep (duermo / dormimos)",
          "german": "dormir"
        }
      ],
      "target_answer": "puedo, puedes, podemos, prefiero, pido, dormir",
      "meaning": "I can / am able to (poder: o→ue), you can (poder: o→ue), we can (unstressed stem!), I prefer (preferir: e→ie), I order / ask for (pedir: e→i), to sleep (duermo / dormimos)",
      "explanation": "When the stem is stressed, the vowel splits (puedo, prefiero, pido); when -emos/-imos takes the stress, the stem stays unchanged (podemos, preferimos, pedimos).",
      "id": "es1003_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish dormir ('to sleep', duermo 'I sleep') shares its Latin root with which English word for a university sleeping hall?",
      "target_answer": "dormitory",
      "meaning": "a dormitory is literally 'a place for sleeping'",
      "explanation": "Latin dormīre gave Spanish dormir and English dormitory and dormant.",
      "id": "es1003_e2"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Boot-Verb Stress Matrix by writing the 'yo' (stressed stem) form of 'poder' ('I can'):",
      "rows": [
        "querer (e → ie)",
        "poder (o → ue)",
        "pedir (e → i)"
      ],
      "columns": [
        "yo (stressed stem splits!)",
        "nosotros (unstressed stem stays single!)"
      ],
      "cells": [
        [
          {
            "german": "quiero",
            "english": "I want"
          },
          {
            "german": "queremos",
            "english": "we want"
          }
        ],
        [
          {
            "german": "puedo",
            "english": "I can"
          },
          {
            "german": "podemos",
            "english": "we can"
          }
        ],
        [
          {
            "german": "pido",
            "english": "I order"
          },
          {
            "german": "pedimos",
            "english": "we order"
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
        "row": 1,
        "column": 0
      },
      "target_answer": "puedo",
      "meaning": "I can (o → ue under stress)",
      "row_law": "Each row shows one of the three Spanish boot-verb vowel shifts (e→ie, o→ue, e→i).",
      "column_law": "Column 1 stresses the stem vowel (splitting it); Column 2 stresses -emos/-imos (keeping the stem vowel single).",
      "explanation": "In yo puedo, the stress lands on the stem, splitting o into ue; in nosotros podemos, the stress moves onto -emos!",
      "id": "es1003_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Can you confirm the reservation?'",
      "target_answer": "Puedes confirmar la reservación",
      "meaning": "Can you confirm the reservation?",
      "word_bank": [
        "confirmar",
        "la",
        "reservación",
        "Puedo",
        "el",
        "Podemos",
        "Puedes"
      ],
      "explanation": "¿Puedes ('Can you') + confirmar ('confirm', bare infinitive) + la reservación?",
      "id": "es1003_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you want to order a coffee (using pedir)",
      "cues": [
        "I want → Quiero",
        "to order / ask for (needs no 'for'!) → pedir",
        "a coffee → un café"
      ],
      "idea_parts": [
        "I want → Quiero",
        "to order → pedir",
        "a coffee → un café"
      ],
      "target_answer": "Quiero pedir un café",
      "meaning": "I want to order a coffee",
      "word_bank": [
        "pedir",
        "dormir",
        "la",
        "café",
        "un",
        "Quiero",
        "puedo"
      ],
      "explanation": "Quiero pedir un café — pedir already means 'to ask FOR / to order', so never add *por after pedir!",
      "diagnosis": {
        "slip": "added por after pedir",
        "cue": "pedir means 'to ask for / order' all by itself: pedir un café."
      },
      "id": "es1003_e5"
    }
  ],
  "summary": {
    "outcome": "Conjugate e→ie (querer, empezar, preferir), o→ue (poder, dormir), and e→i (pedir) boot verbs by following vocal stress.",
    "use_example": {
      "german": "Puedo ir hoy, pero prefiero ir mañana.",
      "english": "I can go today, but I prefer to go tomorrow."
    },
    "takeaway": "Stressed stem = split vowel (quiero, puedo, pido); stressed nosotros ending = single vowel (queremos, podemos, pedimos).",
    "curiosity_teaser": "Up next ([5111] o→ue & e→ie: puedo, duermo, empiezo): enter the Boot-Verb Gym!"
  },
  "twist": {
    "prompt": "Assemble: 'I cannot go today'",
    "target_answer": "No puedo ir hoy",
    "word_bank": [
      "mañana",
      "ir",
      "No",
      "puedo",
      "hoy",
      "quiero",
      "puedes"
    ],
    "explanation": "No puedo ir hoy chains no puedo + bare infinitive ir."
  }
};

export default lesson;
