import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 102,
  "slug": "first-sentences-gym",
  "title": "First Sentences Gym",
  "subtitle": "Je veux… pattern drills with everything from lesson 1",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "vouloir",
    "gâteau",
    "café",
    "un_peu",
    "le",
    "la"
  ],
  "table_word_ids": [
    "vouloir",
    "gâteau",
    "café",
    "un_peu",
    "le",
    "la"
  ],
  "hook": {
    "title": "One Verb, Many Sentences",
    "content": "You know je veux and tu veux. You know le, la, and a shelf of nouns. That is already a sentence machine — this gym runs it until the walking pronoun (I it want) stops feeling strange."
  },
  "pattern": {
    "title": "Build, Don't Recall",
    "content": "Every exercise here is built from parts you've met. Don't memorize the sentence — walk the parts: who wants? what do they want? does the pronoun need to step left? The order of questions is the order of French.",
    "trap_note": "Watch for it = la: 'you want it, and the it is the collection' is tu la veux — the feminine it, walking left like le did."
  },
  "exercises": [
    {
      "id": "fr102_e1",
      "type": "shift_select",
      "prompt": "When 'it' refers to 'le café', where does the pronoun 'le' stand in 'I want it'?",
      "options": [
        "Je veux le",
        "Le je veux",
        "Je le veux"
      ],
      "target_answer": "Je le veux",
      "meaning": "I want it (literally: I it want)",
      "explanation": "In French, object pronouns walk one step left in front of the verb: Je le veux."
    },
    {
      "id": "fr102_e2",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you want it, and the it is the coffee",
      "cues": [
        "The it borrows the coffee's article: le",
        "The pronoun walks left: I it want",
        "je wants: je le veux"
      ],
      "target_answer": "Je le veux",
      "meaning": "I want it",
      "word_bank": [
        "le",
        "est",
        "Je",
        "veux",
        "la"
      ],
      "idea_parts": [
        "who wants? → je",
        "it (the coffee) → le",
        "position → before veux"
      ],
      "explanation": "Same move as the cake, new noun: je le veux."
    },
    {
      "id": "fr102_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're asking a friend if they want it — the it is feminine: the collection",
      "cues": [
        "Feminine it → la",
        "Walk it left: you it want",
        "Rising voice for the question"
      ],
      "target_answer": "Tu la veux",
      "meaning": "Do you want it? (the collection)",
      "word_bank": [
        "est",
        "Tu",
        "la",
        "veux",
        "le"
      ],
      "idea_parts": [
        "who? → tu",
        "it (la collection) → la",
        "question → intonation only"
      ],
      "explanation": "tu la veux ? — the pronoun checks the noun's article first, then walks. That check is a lifelong habit starting now.",
      "diagnosis": {
        "slip": "the it stayed masculine",
        "cue": "The it wears the noun's article: la collection → tu la veux. Check the word for 'the' first."
      }
    },
    {
      "id": "fr102_e4",
      "type": "literal_gloss",
      "prompt": "Which English phrase shows the word-for-word French structure of 'Tu la veux'?",
      "german": "Tu la veux",
      "natural": "Do you want it?",
      "options": [
        "You it want",
        "Want you it",
        "You want it"
      ],
      "target_answer": "You it want",
      "meaning": "Do you want it? (feminine object pronoun before the verb)",
      "explanation": "Tu (you) + la (it, feminine) + veux (want) is word-for-word 'You it want'."
    },
    {
      "id": "fr102_e5",
      "type": "derive",
      "prompt": "Convert the sentence to the negative (the sandwich comes in lesson 4 — here, just slot ne…pas around veux): 'I don't want it'",
      "english_hint": "Je … veux pas, with le placed before veux",
      "target_answer": "Je ne le veux pas",
      "meaning": "I don't want it",
      "explanation": "ne and pas wrap the verb — and le walks left inside the sandwich: je ne le veux pas. Preview of lesson 4."
    }
  ],
  "summary": {
    "outcome": "Build want-sentences with masculine and feminine pronouns, questions by intonation, and un peu as a rider.",
    "use_example": {
      "german": "Tu la veux ? — Oui, un peu.",
      "english": "Do you want it? — Yes, a little."
    },
    "takeaway": "Check the noun's article, then let the pronoun walk: the check-then-move habit is the whole pronoun system in embryo.",
    "curiosity_teaser": "Up next on Le Pont ([103] The Register Ladder): see how First Sentences Gym leads directly into The Register Ladder."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want it\" in French:",
    "target_answer": "Je le veux",
    "word_bank": [
      "Je",
      "ne",
      "pas",
      "le",
      "veux"
    ],
    "explanation": "Re-constructing \"Je le veux\" from the underlying rule cements the pattern of First Sentences Gym."
  }
};

export default lesson;
