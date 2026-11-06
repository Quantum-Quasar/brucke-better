import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 15,
  "slug": "separable-verbs-spatial-prefixes",
  "title": "Separable Verbs & Spatial Prefixes",
  "subtitle": "German prefixes ARE English phrasal verbs: aufwachen = wake up, zurückkommen = come back",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "aufmachen",
    "zumachen",
    "anmachen",
    "abmachen",
    "mitnehmen",
    "einschlafen",
    "aussuchen",
    "aussehen",
    "aufstehen",
    "aufwachen",
    "zurückkommen",
    "machen",
    "kommen"
  ],
  "table_word_ids": [
    "aufmachen",
    "zumachen",
    "mitnehmen",
    "einschlafen",
    "aufstehen",
    "zurückkommen",
    "anmachen",
    "abmachen",
    "aussuchen",
    "aussehen",
    "aufwachen",
    "machen",
    "kommen",
    "schwan",
    "vertrauen",
    "füttern"
  ],
  "hook": {
    "title": "Phrasal Verbs Spelled Straight",
    "content": "English phrasal verbs puzzle the world: give up, wake up, come back, take along. Why? Because English put the little direction-word AFTER the verb. German kept the older arrangement: glue the direction-word ON as a prefix — and when the sentence runs, let it fly off the back end. aufwachen is wake up, zurückkommen is come back, mitnehmen is take along, einschlafen is fall asleep. Every German separable verb is a phrasal verb you already own, written as one word and then split apart by the sentence like a bracket.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Stress Tells You It Will Fly",
        "content": "Separable verbs stress the PREFIX (AUFwachen, MITnehmen) — that's how German speakers hear the split coming. Inseparable verbs (ver-, be-, er-) stress the root instead, and never split. Stress is the whole secret."
      }
    ]
  },
  "pattern": {
    "title": "The Prefix Flight Path",
    "content": "Dictionary form: aufwachen, zurückkommen, mitnehmen, aufstehen. In a sentence the conjugated root takes position 2 and the prefix flies to the very end: Ich wache früh auf (I wake up early). Wir kommen um acht zurück (We come back at eight). Ich nehme das Essen mit (I take the food along). In a modal bracket the verb stays whole: Ich will früh aufstehen — the trapped infinitive keeps its prefix, and the bracket swallows both parts. Du siehst gut aus — you look good (literally 'out': you look well-out!).\n\nOne Denglisch ladder, read it the German way first: Ich mache das Fenster auf → I open the window on → I'm opening the window. The middle line is word-for-word German — the particle lands last, exactly where English phrasal verbs say it out loud.",
    "footnotes": [],
    "linguist_note": "English used to allow this too: 'up' could follow or lead (he rose up / up he rose). The German pattern is the same spatial logic — direction first in the dictionary, direction last in the sentence."
  },
  "exercises": [
    {
      "id": "l15_e1",
      "type": "matching_pairs",
      "prompt": "Match each separable verb with its phrasal twin:",
      "matching_pairs": [
        {
          "id": "sv1",
          "english": "wake up",
          "german": "aufwachen"
        },
        {
          "id": "sv2",
          "english": "come back",
          "german": "zurückkommen"
        },
        {
          "id": "sv3",
          "english": "take along",
          "german": "mitnehmen"
        },
        {
          "id": "sv4",
          "english": "fall asleep",
          "german": "einschlafen"
        }
      ],
      "target_answer": "aufwachen, zurückkommen, mitnehmen, einschlafen",
      "meaning": "wake up, come back, take along, fall asleep",
      "explanation": "German prefixes are English phrasal particles: auf = up, zurück = back, mit = along, ein = in(to)."
    },
    {
      "id": "l15_e2",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Ich mache das Fenster auf.",
      "natural": "I'm opening the window.",
      "options": [
        "I'm opening the window.",
        "On I open the window.",
        "I open the window on."
      ],
      "target_answer": "I open the window on.",
      "meaning": "I'm opening the window.",
      "explanation": "Read it the German way: 'I open the window on.' The prefix auf flies to the sentence end — the exact seat where English phrasal verbs park their particles ('wake up', 'give up'), except German does it in writing, every time."
    },
    {
      "id": "l15_e3",
      "type": "derive",
      "prompt": "Send the prefix home: 'Wir kommen morgen _____' (come back):",
      "english_hint": "the prefix rides at the end",
      "target_answer": "zurück",
      "meaning": "Wir kommen morgen zurück = We are coming back tomorrow",
      "explanation": "zurückkommen splits: kommen in position 2, zurück at the caboose — 'come back' with the back-word last."
    },
    {
      "id": "l15_e4",
      "type": "family_matrix",
      "prompt": "One prefix, three bases: what does auf- do to machen, nehmen and kommen — and what does an- do instead?",
      "rows": [
        "machen",
        "nehmen",
        "kommen"
      ],
      "columns": [
        "auf-",
        "an-",
        "mit-"
      ],
      "cells": [
        [
          {
            "german": "aufmachen",
            "english": "open (on-make)"
          },
          {
            "german": "anmachen",
            "english": "switch on / turn on"
          },
          {
            "german": "mitmachen",
            "english": "join in (with-make)"
          }
        ],
        [
          {
            "german": "aufnehmen",
            "english": "pick up / record (up-take)"
          },
          {
            "german": "annehmen",
            "english": "accept (on-take)"
          },
          {
            "german": "mitnehmen",
            "english": "take along"
          }
        ],
        [
          {
            "german": "aufkommen",
            "english": "come up / arise (up-come)"
          },
          {
            "german": "ankommen",
            "english": "arrive (on-come)"
          },
          {
            "german": "mitkommen",
            "english": "come along (with-come)"
          }
        ]
      ],
      "seed": [
        [
          1,
          2
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
      "row_law": "the base keeps its meaning — machen makes, nehmen takes, kommen comes, in every cell",
      "column_law": "the prefix decides the direction — auf- opens up, an- reaches on, mit- comes along",
      "target_answer": "aufmachen",
      "meaning": "to open — auf (up/on) + machen (make)",
      "vocab_hints": [
        {
          "word": "aufnehmen",
          "translation": "to pick up / record",
          "note": "auf- + nehmen (take) — English 'take up'"
        },
        {
          "word": "annehmen",
          "translation": "to accept",
          "note": "an- + nehmen — take on/toward yourself"
        },
        {
          "word": "aufkommen",
          "translation": "to come up / arise",
          "note": "auf- + kommen (come) — English 'come up'"
        },
        {
          "word": "mitkommen",
          "translation": "to come along",
          "note": "mit- + kommen — English 'come with'"
        },
        {
          "word": "mitmachen",
          "translation": "to join in",
          "note": "mit- + machen (make/do) — 'make with' the group"
        },
        {
          "word": "ankommen",
          "translation": "to arrive",
          "note": "an- + kommen (come) — 'come on/toward' a place"
        }
      ],
      "shift_hint": "Separable Prefixes",
      "explanation": "Across the auf- row the direction is the same (upward, opening, visible); along the machen row the base is the same (making). aufmachen is the cell where both laws meet — and English says the identical thing with 'open up'.",
      "affirmation": "You read the row and the column and the cell answered itself — that is the German prefix system working, not memory."
    },
    {
      "id": "l15_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're telling your household your plan for tomorrow: you want to get up early",
      "cues": [
        "Modal opens position 2: ich will",
        "Inside the bracket the separable verb stays whole: früh aufstehen — prefix included"
      ],
      "target_answer": "Ich will früh aufstehen",
      "meaning": "I want to get up early",
      "vocab_hints": [
        {
          "word": "früh",
          "translation": "early",
          "note": "no English twin — just learn it with the phrase 'früh aufstehen'"
        }
      ],
      "idea_parts": [
        "who? → ich",
        "the wish → will, opening position 2",
        "when? → früh",
        "what? → aufstehen, whole and unbroken inside the bracket"
      ],
      "word_bank": [
        "früh",
        "will",
        "auf",
        "aufstehen",
        "stehe",
        "Ich"
      ],
      "explanation": "Inside the modal bracket the separable verb stays whole: will opens, aufstehen closes — prefix included.",
      "diagnosis": {
        "slip": "the prefix got left behind",
        "cue": "Inside the modal bracket the separable verb stays whole: aufstehen closes it, prefix included. The prefix only flies when the verb runs the sentence alone."
      }
    }
  ],
  "summary": {
    "outcome": "Use separable verbs with the prefix flying to the sentence end — and whole inside modal brackets.",
    "use_example": {
      "german": "Ich will früh aufstehen.",
      "english": "I want to get up early."
    },
    "takeaway": "Separable prefixes are your phrasal particles: auf = up, zurück = back, mit = along — stressed up front, flown to the end.",
    "curiosity_teaser": "Next: the phrasal verb mirrors — fifteen separable verbs matched to the phrasal verbs you already own."
  },
  "twist": {
    "prompt": "Same plan, but it's happening now: I want to get up early → I get up early. (Watch the prefix fly.)",
    "target_answer": "Ich stehe früh auf",
    "word_bank": [
      "aufstehen",
      "stehe",
      "auf",
      "steht",
      "früh",
      "Ich"
    ],
    "explanation": "Without the modal the bracket splits: stehe holds position 2 and the prefix auf flies to the caboose — the flight path this topic named. Inside a modal bracket it would have stayed whole."
  }
};

export default lesson;
