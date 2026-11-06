import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5121,
  "slug": "eten-drinken",
  "title": "Koffie, Brood & De Rekening",
  "subtitle": "ordering at a Dutch table",
  "phase": 2,
  "categories": [
    "food"
  ],
  "words": [
    "koffie",
    "thee",
    "broodje",
    "kaas",
    "rekening",
    "bestellen"
  ],
  "hookTitle": "At the Table",
  "hook": "Koffie, thee, een broodje kaas, de rekening: café Dutch is a small script. Bestellen ('to order') and alsjeblieft carry most of the politeness.",
  "patternTitle": "Order, eat, ask for the bill",
  "pattern": "Ik wil koffie, wij drinken thee, ik eet een broodje kaas, de rekening alsjeblieft. The frames are simple; the nouns are the variables.",
  "trap": "Een broodje kaas is a cheese roll, not a cheese sandwich on sliced bread; the diminutive is doing real work.",
  "sentences": [
    {
      "nl": "Ik wil koffie.",
      "en": "I want coffee.",
      "literal": "I want coffee."
    },
    {
      "nl": "Wij drinken thee.",
      "en": "We drink tea.",
      "literal": "We drink tea."
    },
    {
      "nl": "Ik eet een broodje kaas.",
      "en": "I eat a cheese roll.",
      "literal": "I eat a little bread cheese."
    },
    {
      "nl": "De rekening, alsjeblieft.",
      "en": "The bill, please."
    }
  ],
  "twist": {
    "nl": "Ik bestel een koffie.",
    "en": "I order a coffee.",
    "explanation": "Bestellen is the ordering verb; een koffie is the everyday café order."
  },
  "outcome": "Order food and drinks and ask for the bill in Dutch.",
  "takeaway": "Café Dutch is a script with a few slots; the politeness lives in alsjeblieft and graag."
};

export default lesson;
