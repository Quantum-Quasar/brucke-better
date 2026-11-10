import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1201,
  "slug": "kein-vs-nicht-choice-gym",
  "title": "kein vs nicht Choice Gym",
  "subtitle": "Twenty prompts: noun phrases take kein, verbs take nicht",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "kein",
    "nicht",
    "haben",
    "können",
    "wissen",
    "zeit",
    "haus",
    "kaffee",
    "gut"
  ],
  "table_word_ids": [
    "kein",
    "nicht",
    "haben",
    "können",
    "wissen",
    "zeit",
    "haus",
    "kaffee",
    "gut",
    "ente",
    "nervös",
    "menge",
    "sonnenuntergang",
    "bestimmt",
    "kreditkarte",
    "sparen"
  ],
  "hook": {
    "title": "The Choice Machine",
    "content": "Every German negation is a fork: is the sentence killing a THING or an ACTION? Kill the thing — kein: Ich habe kein Haus, keine Zeit, keinen Kaffee. Kill the action — nicht: Ich kann nicht kommen, das ist nicht gut. English uses one not for both; German forces you to name the victim. Twenty prompts today, each a fork. Choose wrong and the explanation shows you what kind of thing you were trying to kill.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Arithmetic of kein",
        "content": "kein is 'not one': ni + ein, exactly like English none. So it never appears with actions — you cannot 'not-one' a verb. If there is an ein (or a bare plural noun) in the sentence you are negating, the answer is some form of kein."
      }
    ]
  },
  "pattern": {
    "title": "The Fork, Then the Form",
    "content": "Step one — the fork: negating a noun phrase? kein. Negating a verb, adjective, or adverb? nicht. Step two — the form: kein declines exactly like ein (kein Haus, keine Zeit, keinen Kaffee — Him-Case included). Step three — the place: nicht usually lands right where the action dies, at the end of a simple clause (Ich weiß es nicht), or directly before the word it targets (Das ist nicht gut, nicht heute — 'not today').",
    "footnotes": [],
    "linguist_note": "Full-sentence denials take nicht: 'Nein' negates the whole world of a yes/no answer, nicht negates the verb inside the sentence, and kein negates a noun. Three tools, three targets — English merged them all into one not."
  },
  "exercises": [
    {
      "id": "l1201_e1",
      "type": "shift_select",
      "prompt": "'Ich trinke _____ Kaffee.' (I am not drinking coffee — kill the coffee)",
      "options": [
        "keinen",
        "keine",
        "kein",
        "nicht"
      ],
      "target_answer": "keinen",
      "meaning": "Ich trinke keinen Kaffee = I am not drinking coffee",
      "explanation": "Noun phrase → kein, and der Kaffee is a masculine object: the Him-Case makes it keinen."
    },
    {
      "id": "l1201_e2",
      "type": "shift_select",
      "prompt": "'Ich kann _____ kommen.' (I cannot come — kill the coming)",
      "options": [
        "keinen",
        "nicht",
        "kein",
        "keine"
      ],
      "target_answer": "nicht",
      "meaning": "Ich kann nicht kommen = I cannot come",
      "explanation": "Verbs take nicht — you cannot 'not-one' an action."
    },
    {
      "id": "l1201_e3",
      "type": "shift_select",
      "prompt": "'Wir haben _____ Zeit.' (We have no time)",
      "options": [
        "nicht",
        "keinen",
        "keine",
        "kein"
      ],
      "target_answer": "keine",
      "meaning": "Wir haben keine Zeit = We have no time",
      "explanation": "die Zeit is feminine: kein takes -e, exactly like ein → eine."
    },
    {
      "id": "l1201_e4",
      "type": "family_matrix",
      "prompt": "Complete the ein → kein Negation matrix for the masculine accusative ('no / not a'):",
      "row_law": "Row: Positive (ein) vs. Negated (kein)",
      "column_law": "Column: Neuter (ein/kein) vs. Masculine Accusative (einen/keinen)",
      "rows": [
        "Positive (a)",
        "Negated (no)"
      ],
      "columns": [
        "Neuter",
        "Masc. Accusative"
      ],
      "cells": [
        [
          {
            "german": "ein",
            "english": "a (neuter)"
          },
          {
            "german": "einen",
            "english": "a (masc. acc.)"
          }
        ],
        [
          {
            "german": "kein",
            "english": "no (neuter)"
          },
          {
            "german": "keinen",
            "english": "no (masc. acc.)"
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
      "target_answer": "keinen",
      "meaning": "no / not a (masculine accusative)",
      "explanation": "kein is simply k- + ein: wherever ein becomes einen, kein becomes keinen (Ich bekomme keinen Kaffee, ich weiß es). [Ref: Ich habe kein Haus, Ich weiß es nicht, Das ist nicht gut, Ich bekomme keinen Kaffee]"
    },
    {
      "id": "l1201_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"I have no time / I do not have time\"",
      "target_answer": "Ich habe keine Zeit",
      "accepted_answers": ["Zeit habe ich keine"],
      "meaning": "I have no time / I do not have time",
      "word_bank": [
        "für",
        "habe",
        "Ich",
        "Zeit",
        "morgen",
        "keine"
      ],
      "explanation": "English negates the verb ('do not have'); German negates the noun ('no time') — keine Zeit, the honest fork.",
      "idea": "I have no time / I do not have time",
      "idea_parts": [
        "I have no time /",
        "I do not have time (verb in position 2)"
      ],
      "cues": [
        "Start with \"Ich\" and anchor \"habe\" in position 2.",
        "Close the frame with \"Zeit\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Choose kein vs nicht instantly and decline kein through all three genders.",
    "use_example": {
      "german": "Ich habe keine Zeit.",
      "english": "I have no time."
    },
    "takeaway": "Noun phrases take kein ('not one'), verbs and adjectives take nicht ('no-thing') — name the victim, then pick the weapon.",
    "curiosity_teaser": "Next: the nicht position map — where exactly the no-thing lands in the sentence."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from kein vs nicht Choice Gym (I have no time / I do not have time):",
    "target_answer": "Ich habe keine Zeit",
    "word_bank": [
      "Ich",
      "nicht",
      "Zeit",
      "keine",
      "habe",
      "heute"
    ],
    "explanation": "Re-assembling \"Ich habe keine Zeit\" from scratch locks in the structural pattern of kein vs nicht Choice Gym without relying on short-term echo."
  }
};

export default lesson;
