import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 103,
  "slug": "living-en-suffix",
  "title": "The Living -en Suffix",
  "subtitle": "brighten, shorten, deepen — English's own -en verbs are the bridge into German",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "folgen",
    "wandern",
    "warnen",
    "hungern",
    "lernen",
    "singen",
    "schwimmen"
  ],
  "table_word_ids": [
    "folgen",
    "wandern",
    "warnen",
    "hungern",
    "lernen",
    "singen",
    "schwimmen",
    "japan",
    "land",
    "magen",
    "dame",
    "violett",
    "schauer",
    "vorher",
    "laden",
    "handschrift"
  ],
  "hook": {
    "title": "You Use German -en Every Week",
    "content": "When English wants to turn an adjective into a verb, it reaches for the Germanic suffix -en: bright → brighten, short → shorten, deep → deepen, wide → widen, hard → harden, dark → darken. You say these without a second thought — and they are, morphologically, German verbs wearing English clothes. German simply never stopped doing what English still does occasionally: every dictionary verb ends in -en. That means the -en shelf of German is not new vocabulary. It is your own suffix, used at full power.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Worn-Down Twins",
        "content": "Three verbs wore their endings down in English but kept them in German: follow lost its g entirely (folgen kept it), wander dropped the -n (wandern kept it), and warn let the -en shrink to nothing (warnen kept it). The German forms are the older shapes of your own words."
      }
    ]
  },
  "pattern": {
    "title": "One Suffix, Three Strategies",
    "content": "Strategy one — the adjective verb: English brighten works exactly like German's adjective verbs; the suffix means 'make into'. Strategy two — the noun verb: German takes a noun and bolts -en on: Hunger → hungern (to hunger, to be starving). English used to do this too — old texts still say 'they hungered'. Strategy three — the hidden suffix: follow ↔ folgen, wander ↔ wandern, warn ↔ warnen. English chewed the ending off; German serves it whole. Whenever you meet a German verb ending in -ern or -en that begins like an English verb, you already know it.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The g Inside follow",
        "content": "folgen and follow descend from the same Proto-Germanic *fulgāną. Old English was folgian — with the g. Middle English wore it into 'folwen', and the modern w is all that remains of the ancient g. German wrote the g down and never let go."
      }
    ],
    "linguist_note": "German also runs a variant -ern (wandern, ändern), from the same West Germanic derivational family. English 'wander' descends from the same root as wandern — the -n tail dropped in the crossing."
  },
  "exercises": [
    {
      "id": "l103_e1",
      "type": "morpheme_tiles",
      "prompt": "English 'wander' + the tail German kept = the German verb:",
      "tile_options": [
        "en",
        "st",
        "t",
        "n",
        "wander"
      ],
      "target_answer": "wandern",
      "meaning": "to wander / to hike",
      "explanation": "wander + -n = wandern. English dropped the final -n; German never did."
    },
    {
      "id": "l103_e2",
      "type": "matching_pairs",
      "prompt": "Match the worn-down English verbs with their full German forms:",
      "matching_pairs": [
        {
          "id": "le1",
          "english": "follow",
          "german": "folgen"
        },
        {
          "id": "le2",
          "english": "wander",
          "german": "wandern"
        },
        {
          "id": "le3",
          "english": "warn",
          "german": "warnen"
        },
        {
          "id": "le4",
          "english": "hunger (starve)",
          "german": "hungern"
        }
      ],
      "target_answer": "folgen, wandern, warnen, hungern",
      "meaning": "to follow, to wander, to warn, to hunger",
      "explanation": "English chewed the suffix down; German serves each verb with its full Germanic ending."
    },
    {
      "id": "l103_e3",
      "type": "reverse_cognate",
      "prompt": "What English verb shares the exact root of 'folgen'?",
      "target_answer": "follow",
      "meaning": "to follow (twin of German folgen)",
      "explanation": "Both descend from Proto-Germanic *fulgāną — the g in folgen survives as the w of follow."
    },
    {
      "id": "l103_e4",
      "type": "family_matrix",
      "prompt": "Complete the pronoun × -en verb matrix for 'we sing':",
      "row_law": "Row: subject pronoun (ich takes -e, wir takes -en)",
      "column_law": "Column: Germanic verb stem (sing-, find-)",
      "rows": [
        "ich (-e)",
        "wir (-en)"
      ],
      "columns": [
        "sing-",
        "find-"
      ],
      "cells": [
        [
          {
            "german": "ich singe",
            "english": "I sing"
          },
          {
            "german": "ich finde",
            "english": "I find"
          }
        ],
        [
          {
            "german": "wir singen",
            "english": "we sing"
          },
          {
            "german": "wir finden",
            "english": "we find"
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
      "target_answer": "wir singen",
      "meaning": "we sing",
      "explanation": "With 'wir', the verb keeps the full -en infinitive ending: wir singen, wir finden, wir wandern. [Ref: warnen]"
    },
    {
      "id": "l103_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"We sing and we wander\"",
      "target_answer": "Wir singen und wir wandern",
      "meaning": "We sing and we wander",
      "vocab_hints": [
        {
          "word": "und",
          "translation": "and",
          "note": "ancient twin of English 'and'"
        }
      ],
      "word_bank": [
        "singen",
        "die",
        "wir",
        "wandern",
        "Wir",
        "und",
        "nicht"
      ],
      "explanation": "Same pattern as the First Sentences Gym — the new verb slots straight into the old frame.",
      "idea": "We sing and we wander",
      "idea_parts": [
        "We sing",
        "and we wander (verb in position 2)"
      ],
      "cues": [
        "Start with \"Wir\" and anchor \"singen\" in position 2.",
        "Close the frame with \"wandern\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Derive German -en/-ern verbs from their English twins and use them in wir-sentences.",
    "use_example": {
      "german": "Wir singen und wir wandern.",
      "english": "We sing and we wander."
    },
    "takeaway": "English still coins verbs with Germanic -en (brighten, shorten); German uses that same suffix on every verb — including follow, wander, warn and hunger.",
    "curiosity_teaser": "Next: the modal auxiliaries & the bracket — ich will means I want, not the future, and the frame they build."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Living -en Suffix (We sing and we wander):",
    "target_answer": "Wir singen und wir wandern",
    "word_bank": [
      "wir",
      "singen",
      "und",
      "heute",
      "Wir",
      "nicht",
      "wandern"
    ],
    "explanation": "Re-assembling \"Wir singen und wir wandern\" from scratch locks in the structural pattern of The Living -en Suffix without relying on short-term echo."
  }
};

export default lesson;
