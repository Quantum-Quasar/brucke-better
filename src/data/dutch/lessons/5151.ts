import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5151,
  "slug": "lichaam-kleding",
  "title": "Hand, Voet & Het Blauwe Shirt",
  "subtitle": "body parts, clothing and adjective -e",
  "phase": 5,
  "categories": [
    "body",
    "clothing"
  ],
  "words": [
    "hand",
    "voet",
    "hoofd",
    "shirt",
    "broek",
    "blauw"
  ],
  "hookTitle": "Body and Clothes",
  "hook": "Hand, voet, hoofd are old twins. Shirt and broek show the two article patterns, and blauw shows the adjective -e: het blauwe shirt, de blauwe broek.",
  "patternTitle": "Adjective -e after a definite phrase",
  "pattern": "Het shirt is blauw (predicate, no -e). Het blauwe shirt (definite, -e). De broek is blauw; de blauwe broek. The -e appears when the adjective sits before a definite noun.",
  "trap": "Do not add -e to a predicate adjective: het shirt is blauwe is wrong. The -e belongs to the attributive position.",
  "sentences": [
    {
      "nl": "Mijn hand is warm.",
      "en": "My hand is warm.",
      "literal": "My hand is warm."
    },
    {
      "nl": "Mijn voet is koud.",
      "en": "My foot is cold.",
      "literal": "My foot is cold."
    },
    {
      "nl": "Het shirt is blauw.",
      "en": "The shirt is blue.",
      "literal": "The shirt is blue."
    },
    {
      "nl": "De broek is groot.",
      "en": "The trousers are big."
    }
  ],
  "twist": {
    "nl": "De broek is blauw.",
    "en": "The trousers are blue.",
    "explanation": "Predicate adjective: no -e. Before the noun it would be de blauwe broek."
  },
  "outcome": "Describe body parts and clothing, and place adjective -e correctly.",
  "takeaway": "Adjective -e is a position rule, not a gender rule."
};

export default lesson;
