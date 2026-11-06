import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1002,
  "slug": "him-and-whom-proof-texts",
  "title": "Him & Whom Proof Texts",
  "subtitle": "Spot the ancient nasal in English — then mirror it in mich, dich, ihn, wen",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "du",
    "der",
    "die",
    "das",
    "haben",
    "finden"
  ],
  "table_word_ids": [
    "du",
    "der",
    "die",
    "das",
    "haben",
    "finden",
    "frost",
    "wetter",
    "klima",
    "stiefel",
    "hilfe",
    "wichtig",
    "dose",
    "nur",
    "paket",
    "handwerk"
  ],
  "hook": {
    "title": "The Evidence Was In Your Mouth All Along",
    "content": "You have been declining the accusative your whole life — in English. He saw me: me, not I. I saw him: him, not he. To whom: whom, not who. That final m is the ancient Indo-European object marker, and English pronouns still wear it. German wears the same marker, softened from m to n: mich (me), dich (thee), ihn (him), wen (whom). Every time you say 'whom', you are speaking German grammar with an m. Today: the proof texts.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The m → n Softening",
        "content": "Proto-Indo-European marked masculine accusatives with *-m. English kept the m (him, whom); High German softened unstressed final -m into -n (ihn, wen). Same marker, two pronunciations — one ancient law."
      }
    ]
  },
  "pattern": {
    "title": "The Pronoun Proof Grid",
    "content": "Read the grid as evidence, not vocabulary: I ↔ ich, me ↔ mich; thou ↔ du, thee ↔ dich; he ↔ er, him ↔ ihn; who ↔ wer, whom ↔ wen. The English forms are not translations — they are the same words with the same job. And the feminine/neuter pair stays flat on both sides of the North Sea: she/her collapsed early, and German sie/sie, das/das never bothered. Witness statements: 'I see him' = Ich sehe ihn. 'Whom do you seek?' = Wen suchst du? — verb first, like Knowest thou?",
    "footnotes": [],
    "linguist_note": "wen ↔ whom is the cleanest pair: both carry the full nasal marker, one as -m, one as -n. wen suchst du? is the register of courtroom English 'whom do you seek?' — German never dropped whom."
  },
  "exercises": [
    {
      "id": "l1002_e1",
      "type": "matching_pairs",
      "prompt": "Match each English objective pronoun with its German twin:",
      "matching_pairs": [
        {
          "id": "pw1",
          "english": "me",
          "german": "mich"
        },
        {
          "id": "pw2",
          "english": "him",
          "german": "ihn"
        },
        {
          "id": "pw3",
          "english": "whom",
          "german": "wen"
        },
        {
          "id": "pw4",
          "english": "thee / you",
          "german": "dich"
        }
      ],
      "target_answer": "mich, ihn, wen, dich",
      "meaning": "me, him, whom, thee",
      "explanation": "The same ancient nasal marker: English -m, German -n. One marker, two spellings."
    },
    {
      "id": "l1002_e2",
      "type": "shift_select",
      "prompt": "Why does German 'wen' end in -n while English 'whom' ends in -m?",
      "options": [
        "High German softened the ancient final -m into -n",
        "wen and whom are unrelated words",
        "English invented the m later",
        "German pronouns have no case marker"
      ],
      "target_answer": "High German softened the ancient final -m into -n",
      "meaning": "The m → n nasal softening",
      "explanation": "Same Indo-European marker *-m: English kept it crisp (him, whom), German blurred it to -n (ihn, wen)."
    },
    {
      "id": "l1002_e3",
      "type": "reverse_cognate",
      "prompt": "What English pronoun is the direct twin of 'ihn'?",
      "target_answer": "him",
      "meaning": "him (twin of German ihn)",
      "explanation": "er → ihn is he → him: the same pronoun, with the nasal softened to n on the German side."
    },
    {
      "id": "l1002_e4",
      "type": "family_matrix",
      "prompt": "Complete the Case × Person matrix for the accusative ('me'):",
      "row_law": "Row: Case role (Nominative subject vs. Accusative direct object)",
      "column_law": "Column: Person (ich-family I/me vs. du-family thou/thee)",
      "rows": [
        "Subject",
        "Object"
      ],
      "columns": [
        "ich-family",
        "du-family"
      ],
      "cells": [
        [
          {
            "german": "ich",
            "english": "I"
          },
          {
            "german": "du",
            "english": "thou"
          }
        ],
        [
          {
            "german": "mich",
            "english": "me"
          },
          {
            "german": "dich",
            "english": "thee"
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
      "target_answer": "mich",
      "meaning": "me (accusative of ich — English 'me' wears the same nasal)",
      "explanation": "ich → mich and du → dich: the object case adds the nasal English still wears in 'me' and 'thee'. [Ref: ihn]"
    },
    {
      "id": "l1002_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I see him and he sees me'",
      "target_answer": "Ich sehe ihn und er sieht mich",
      "meaning": "I see him and he sees me",
      "vocab_hints": [
        {
          "word": "sieht",
          "translation": "sees (er form)",
          "note": "sehen → er sieht — the vowel wanders, as in see/saw"
        }
      ],
      "word_bank": [
        "sehe",
        "Ich",
        "sieht",
        "und",
        "er",
        "ohne",
        "ihn",
        "mich",
        "zu"
      ],
      "explanation": "Two clauses mirror each other: ich sehe ihn / er sieht mich — both direct objects wearing the nasal."
    }
  ],
  "summary": {
    "outcome": "Use mich, dich, ihn, wen as objects — and hear English whom as German grammar with an m.",
    "use_example": {
      "german": "Ich sehe ihn und er sieht mich.",
      "english": "I see him and he sees me."
    },
    "takeaway": "The accusative nasal survives in English him/me/thee/whom and German ihn/mich/dich/wen — one marker, two spellings.",
    "curiosity_teaser": "Next: the articles are pronouns in disguise — die is D- plus sie, der is D- plus er, das is D- plus es."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Him & Whom Proof Texts (I see him and he sees me):",
    "target_answer": "Ich sehe ihn und er sieht mich",
    "word_bank": [
      "mich",
      "und",
      "sehe",
      "ihn",
      "er",
      "nicht",
      "Ich",
      "sieht",
      "heute"
    ],
    "explanation": "Re-assembling \"Ich sehe ihn und er sieht mich\" from scratch locks in the structural pattern of Him & Whom Proof Texts without relying on short-term echo."
  }
};

export default lesson;
