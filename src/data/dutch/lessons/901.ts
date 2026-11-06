import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 901,
  "slug": "de-het-decoder",
  "title": "De/Het Decoder",
  "subtitle": "the last element of a compound decides the article",
  "phase": 2,
  "categories": [
    "gender"
  ],
  "words": [
    "de",
    "het",
    "keuken",
    "kamer",
    "tuin",
    "hoofdstad"
  ],
  "hookTitle": "Compounds Tell You the Article",
  "hook": "A Dutch compound takes the gender of its last element. Het hoofd + de stad gives de hoofdstad. Once you can see the head noun, the article stops being a guess.",
  "patternTitle": "The head noun wins",
  "pattern": "Keuken, kamer and tuin are de-words; huis is a het-word. When they join a compound, the final noun still decides: de keuken, de kamer, de tuin, de hoofdstad.",
  "trap": "The first element can be a het-word and the compound still be de: het hoofd + de stad = de hoofdstad. Look at the end.",
  "sentences": [
    {
      "nl": "De keuken is groot.",
      "en": "The kitchen is big.",
      "literal": "The kitchen is big."
    },
    {
      "nl": "De kamer is klein.",
      "en": "The room is small.",
      "literal": "The room is small."
    },
    {
      "nl": "De tuin is groen.",
      "en": "The garden is green.",
      "literal": "The garden is green."
    },
    {
      "nl": "Het huis is oud.",
      "en": "The house is old."
    }
  ],
  "twist": {
    "nl": "De hoofdstad is groot.",
    "en": "The capital is big.",
    "explanation": "Stad is a de-word, so the whole compound hoofdstad is de."
  },
  "outcome": "Decode the article of a Dutch compound from its final noun.",
  "takeaway": "Compounds are a gender shortcut: read them from the end."
};

export default lesson;
