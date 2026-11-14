import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 11,
  "slug": "niet-geen",
  "title": "Niet & Geen",
  "subtitle": "niet for the sentence, geen for an indefinite noun",
  "phase": 2,
  "categories": [
    "negation"
  ],
  "words": [
    "niet",
    "geen",
    "tijd",
    "geld",
    "werken",
    "hebben"
  ],
  "hookTitle": "Two Negators, One Decision",
  "hook": "Dutch splits negation in two. Niet negates a verb, an adjective, a definite noun or a whole predicate; geen negates an indefinite noun. The choice is grammatical, not stylistic.",
  "patternTitle": "Ask what you are negating",
  "pattern": "Ik werk niet: niet negates the verb. Ik heb geen tijd: tijd is indefinite, so geen. Ik heb de tijd niet: the definite article pulls the sentence back to niet. The noun's definiteness decides.",
  "trap": "Do not say ik heb niet tijd. Tijd has no article here, so it is indefinite and takes geen.",
  "linguist": "Geen is a negative indefinite article; niet is the general negator. English uses 'not' and 'no' in a similar division, but Dutch makes the choice more systematically.",
  "sentences": [
    {
      "nl": "Ik werk niet.",
      "en": "I do not work.",
      "literal": "I work not.",
      "wrong": [
        "Ik werk geen.",
        "Ik niet werk."
      ]
    },
    {
      "nl": "Ik heb geen tijd.",
      "en": "I have no time.",
      "literal": "I have no time."
    },
    {
      "nl": "Wij hebben geen geld.",
      "en": "We have no money.",
      "literal": "We have no money."
    },
    {
      "nl": "Hij is niet hier.",
      "en": "He is not here."
    }
  ],
  "twist": {
    "nl": "Ik heb geen honger.",
    "en": "I am not hungry.",
    "explanation": "Honger is an indefinite noun, so the negator is geen, not niet."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "select", "at": 0 },
    { "kind": "build", "at": 1, "bank": ["Ik", "heb", "geen", "niet", "tijd"] },
    { "kind": "gloss", "at": 2 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Choose niet or geen by what follows and place it in the Dutch sentence.",
  "takeaway": "Negation is a decision about the noun phrase, not a single word you sprinkle on a sentence."
};

export default lesson;
