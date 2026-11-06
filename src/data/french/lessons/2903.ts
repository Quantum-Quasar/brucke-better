import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2903,
  "slug": "sprig-2903",
  "title": "Spoken French Shortcuts",
  "subtitle": "on = nous, dropped ne, t'as / y'a — decoding fast street French without losing the structure.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "on",
    "nous",
    "pas",
    "tu",
    "as",
    "il_y_a",
    "cest",
    "vouloir",
    "aller",
    "savoir"
  ],
  "table_word_ids": [
    "on",
    "nous",
    "pas",
    "tu",
    "as",
    "il_y_a",
    "cest",
    "vouloir",
    "aller",
    "savoir"
  ],
  "hook": {
    "title": "Why Street French Sounds Faster Than Textbook French",
    "content": "In everyday spoken French: (1) Speakers say on (conjugated like il/elle!) instead of nous for 'we' (On va au café). (2) Speakers drop the ne of negation because pas carries the 'not' (Je sais pas, C'est pas grave). (3) In fast speech, tu as glides into t'as and il y a glides into y'a!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why on = 'we' is the best bargain in spoken French",
        "content": "Because on uses the 3rd-person singular verb (on va, on a, on est, on veut), using on for 'we' means you rarely have to conjugate -ons in casual speech!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Understand Spoken Shortcuts, Produce Clean Standard French",
    "content": "Keep both slices of ne...pas in writing, and recognize On y va ('Let's go'), Je veux pas, and C'est pas possible in speech.",
    "linguist_note": "Jespersen's Cycle explains why French ne evolved from lone negator to paired bracket (ne...pas) to spoken post-verbal pas.",
    "trap_note": "Even when on means 'we', its verb is ALWAYS 3rd-person singular (On est ici, never *On sommes)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each casual spoken French phrase with its formal written equivalent:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "On va au cinéma (spoken 'we')",
          "german": "Nous allons au cinéma"
        },
        {
          "id": "p2",
          "english": "Je sais pas (dropped ne)",
          "german": "Je ne sais pas"
        },
        {
          "id": "p3",
          "english": "C'est pas possible (dropped ne)",
          "german": "Ce n'est pas possible"
        },
        {
          "id": "p4",
          "english": "On a très faim (spoken 'we')",
          "german": "Nous avons très faim"
        }
      ],
      "target_answer": "Nous allons au cinéma, Je ne sais pas, Ce n'est pas possible, Nous avons très faim",
      "meaning": "On va au cinéma (spoken 'we'), Je sais pas (dropped ne), C'est pas possible (dropped ne), On a très faim (spoken 'we')",
      "explanation": "on takes the il/elle verb form; spoken negation drops ne while keeping pas.",
      "id": "fr2903_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In everyday conversation, how do friends say 'We are here' using 'on'?",
      "options": [
        "On est ici",
        "On êtes ici",
        "On sommes ici"
      ],
      "target_answer": "On est ici",
      "meaning": "We are here (lit. One is here)",
      "explanation": "Even when on means 'we', it always takes the 3rd-person singular verb: On est ici!",
      "id": "fr2903_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences match the meaning of 'On va célébrer ce soir'?",
      "german": "On va célébrer ce soir",
      "meaning": "We are going to celebrate tonight",
      "renderings": [
        "We're going to celebrate tonight",
        "We are going to celebrate this evening"
      ],
      "traps": [
        "He is going to celebrate alone tonight",
        "They celebrated yesterday evening"
      ],
      "target_answer": "We're going to celebrate tonight",
      "explanation": "In everyday French, on is the standard spoken pronoun for 'we'.",
      "id": "fr2903_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we are going to the restaurant tonight (using everyday On va)",
      "cues": [
        "We go to the restaurant tonight → On va au restaurant ce soir"
      ],
      "idea_parts": [
        "subject + verb → On va",
        "destination + time → au restaurant ce soir"
      ],
      "target_answer": "On va au restaurant ce soir",
      "meaning": "We are going to the restaurant tonight",
      "word_bank": [
        "On",
        "ce",
        "au",
        "va",
        "la",
        "soir",
        "allons",
        "restaurant"
      ],
      "explanation": "On va replaces Nous allons in everyday spoken French.",
      "diagnosis": {
        "slip": "paired On with allons",
        "cue": "Pair On with singular va: On va."
      },
      "id": "fr2903_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "On est déjà à la gare",
      "replays": 2,
      "target_answer": "On est déjà à la gare",
      "meaning": "We are already at the train station",
      "cues": [
        "On est",
        "déjà à la gare"
      ],
      "explanation": "On est links with an /n/ liaison (/ɔ̃.n‿ɛ/).",
      "affirmation": "You heard On est and à la gare cleanly.",
      "id": "fr2903_e5"
    }
  ],
  "summary": {
    "outcome": "Use on + 3rd-person singular verb for everyday 'we' and decode spoken French negation and contractions.",
    "use_example": {
      "german": "On va au bistro ? — Oui, on y va !",
      "english": "Shall we go to the bistro? — Yes, let's go!"
    },
    "takeaway": "In spoken French, 'we' is on (with the il/elle verb), and ne disappears while pas does the work.",
    "curiosity_teaser": "Up next on Le Pont ([30] Capstone: Le Pont Reading): see how Spoken French Shortcuts leads directly into Capstone: Le Pont Reading."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We are going to the restaurant tonight\" in French:",
    "target_answer": "On va au restaurant ce soir",
    "word_bank": [
      "soir",
      "va",
      "ce",
      "restaurant",
      "pas",
      "On",
      "au",
      "ne"
    ],
    "explanation": "Re-constructing \"On va au restaurant ce soir\" from the underlying rule cements the pattern of Spoken French Shortcuts."
  }
};

export default lesson;
