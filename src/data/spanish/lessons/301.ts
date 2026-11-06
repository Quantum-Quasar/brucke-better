import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 301,
  "slug": "strip-dont-trim-celebrar-trap",
  "title": "The Celebrar Trap",
  "subtitle": "Strip the whole -ación before -ar arrives: celebración → celebrar, not *celebratar",
  "phase": 1,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "celebrar",
    "invitar",
    "organizar",
    "reservar",
    "imaginar",
    "explicar",
    "querer"
  ],
  "table_word_ids": [
    "celebrar",
    "invitar",
    "organizar",
    "reservar",
    "imaginar",
    "explicar",
    "querer"
  ],
  "hook": {
    "title": "The English '-ate' Ghost Syllable Trap",
    "content": "When English speakers convert words like 'celebrate', 'participate', or 'explicate', their brain often tries to keep the English '-at-' syllable, inventing non-words like *celebratar or *participatar. That '-at-' is just a fossil from Latin past participles that English turned into verbs!"
  },
  "pattern": {
    "title": "Always Derive from the -CIÓN Noun",
    "content": "To avoid the ghost syllable 100% of the time, derive from the -ción noun by stripping the ENTIRE -ación chunk before adding -ar: celebr-ación → celebrar, invit-ación → invitar, imagin-ación → imaginar, explic-ación → explicar.",
    "trap_note": "Never add -ar onto the end of an English '-ate' verb (*celebratar, *participatar, *terminatar). Strip the whole -ación first!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to celebrate",
          "german": "celebrar"
        },
        {
          "id": "p2",
          "english": "to invite",
          "german": "invitar"
        },
        {
          "id": "p3",
          "english": "to organize",
          "german": "organizar"
        },
        {
          "id": "p4",
          "english": "to reserve",
          "german": "reservar"
        },
        {
          "id": "p5",
          "english": "to imagine",
          "german": "imaginar"
        },
        {
          "id": "p6",
          "english": "to explain",
          "german": "explicar"
        }
      ],
      "target_answer": "celebrar, invitar, organizar, reservar, imaginar, explicar",
      "meaning": "to celebrate, to invite, to organize, to reserve, to imagine, to explain",
      "explanation": "Notice there is zero '-at-' syllable in celebrar, imaginar, or explicar.",
      "id": "es301_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which form is the real Spanish infinitive for 'to celebrate'?",
      "options": [
        "celebrate",
        "celebrar",
        "celebratar"
      ],
      "target_answer": "celebrar",
      "meaning": "to celebrate",
      "explanation": "Strip -ación completely and add -ar: celebrar.",
      "id": "es301_e2"
    },
    {
      "type": "derive",
      "prompt": "Strip -ación from 'imaginación' to form 'to imagine':",
      "english_hint": "imaginación → -ar",
      "target_answer": "imaginar",
      "meaning": "to imagine",
      "explanation": "imaginación → imaginar (never *imaginatar).",
      "id": "es301_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to explain'",
      "target_answer": "Quiero explicar",
      "meaning": "I want to explain",
      "word_bank": [
        "reservar",
        "la",
        "celebrar",
        "Quiero",
        "explicar"
      ],
      "explanation": "Quiero + explicar (from explicación).",
      "id": "es301_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero celebrar",
      "replays": 2,
      "target_answer": "Quiero celebrar",
      "meaning": "I want to celebrate",
      "cues": [
        "I want: Quiero",
        "to celebrate (three syllables, no -at-): celebrar"
      ],
      "explanation": "Quiero celebrar — sleek three-syllable infinitive.",
      "affirmation": "Zero ghost syllables — you nailed celebrar!",
      "id": "es301_e5"
    }
  ],
  "summary": {
    "outcome": "Avoid English '-ate' ghost syllables by stripping the entire -ación suffix before adding -ar.",
    "use_example": {
      "german": "Quiero celebrar y quiero explicar.",
      "english": "I want to celebrate and I want to explain."
    },
    "takeaway": "Strip, don't trim: remove the whole -ación before adding -ar.",
    "curiosity_teaser": "Up next ([302] Quiero + Infinitive Gym): chain your converted verbs with nouns and places."
  },
  "twist": {
    "prompt": "Assemble: 'Do you want to reserve, a little?'",
    "target_answer": "Quieres reservar, un poco",
    "word_bank": [
      "celebrar",
      "poco",
      "el",
      "Quiero",
      "un",
      "reservar",
      "Quieres"
    ],
    "explanation": "¿Quieres reservar, un poco? combines question verb, infinitive, and tag."
  }
};

export default lesson;
