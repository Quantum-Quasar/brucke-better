import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5042,
  "slug": "lesson-5042",
  "title": "On: The Everyday We",
  "subtitle": "on + a third-person verb: how the worn-down man became spoken French's 'we'",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "on",
    "est",
    "parler",
    "visiter",
    "ici",
    "français"
  ],
  "table_word_ids": [
    "on",
    "est",
    "parler",
    "visiter",
    "ici",
    "français"
  ],
  "hook": {
    "title": "The Pronoun That Took Over 'We'",
    "content": "Lesson 5041 met on as the worn-down man (Latin homō). Now give it its real job: in spoken French, nobody says nous sommes — they say on est. On parle français ici. Whatever group you belong to, on carries it, and the verb stays in the he/she form.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'we' wears a mask",
        "content": "on means 'one' — people in general — and French speakers slid from 'one speaks French here' to 'we speak French here'. The verb never noticed: it still agrees with the single man inside on.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "On + Third-Person Verb",
    "content": "On est à Paris. On parle français ici. On veut visiter. One pronoun, one verb form — always the il/elle form, even when on means the whole group.",
    "linguist_note": "Spanish went the same road with uno, German with man — but only French made it the everyday 'we'.",
    "trap_note": "Never conjugate on like nous: on parle, not *on parlons. The man inside on keeps his singular verb."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each everyday 'we' sentence with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "we speak French here",
          "german": "On parle français ici"
        },
        {
          "id": "p2",
          "english": "we are in Paris",
          "german": "On est à Paris"
        },
        {
          "id": "p3",
          "english": "we want to visit",
          "german": "On veut visiter"
        },
        {
          "id": "p4",
          "english": "never",
          "german": "jamais"
        }
      ],
      "target_answer": "On parle français ici, On est à Paris, On veut visiter, jamais",
      "meaning": "we speak French here, we are in Paris, we want to visit, never",
      "explanation": "on + parle/est/veut: the verb is always third person — that is the whole trick.",
      "id": "fr5042_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'we speak French here' the everyday spoken way?",
      "options": [
        "On parle français ici",
        "Nous parlons français ici",
        "On parlons français ici"
      ],
      "target_answer": "On parle français ici",
      "meaning": "We speak French here",
      "explanation": "On parle français ici — nous parlons is correct but formal; spoken French reaches for on every time.",
      "id": "fr5042_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the worn-down pronoun that means 'one' and, in speech, 'we':",
      "english_hint": "Latin homō — the man",
      "target_answer": "on",
      "meaning": "one; we (spoken)",
      "explanation": "on: the erosion of homō — and French's favourite pronoun for 'all of us'.",
      "id": "fr5042_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say we want to visit Paris",
      "cues": [
        "on = the everyday we",
        "the verb takes the third-person form: veut"
      ],
      "idea_parts": [
        "we want → On veut",
        "to visit Paris → visiter Paris"
      ],
      "target_answer": "On veut visiter Paris",
      "meaning": "We want to visit Paris",
      "word_bank": [
        "On",
        "veut",
        "visiter",
        "Paris",
        "est",
        "parle"
      ],
      "explanation": "On veut visiter Paris — one pronoun, one third-person verb, the whole group included.",
      "diagnosis": {
        "slip": "conjugated on like nous",
        "cue": "on keeps a singular verb: on veut, never *on voulons."
      },
      "id": "fr5042_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "On parle français ici",
      "replays": 2,
      "target_answer": "On parle français ici",
      "meaning": "We speak French here",
      "cues": [
        "It means: We speak French here",
        "The verb is third person: parle"
      ],
      "explanation": "On parle français ici — the worn-down man speaking for everyone in the room.",
      "affirmation": "You heard on doing the work of 'we' with a singular verb.",
      "id": "fr5042_e5"
    }
  ],
  "summary": {
    "outcome": "Use on + a third-person verb as spoken French's everyday 'we'.",
    "use_example": {
      "german": "On parle français ici",
      "english": "We speak French here"
    },
    "takeaway": "on is the man who became 'we' — and his verb stays singular.",
    "curiosity_teaser": "Up next on Le Pont ([10] avoir & the H It Lost): see how On: The Everyday We leads directly into avoir & the H It Lost."
  },
  "twist": {
    "prompt": "Think it through again without looking back — say we are in Paris:",
    "target_answer": "On est à Paris",
    "word_bank": [
      "On",
      "est",
      "à",
      "Paris",
      "parle",
      "sommes"
    ],
    "explanation": "Rebuilding \"On est à Paris\" — the third-person est proves on is not nous."
  }
};

export default lesson;
