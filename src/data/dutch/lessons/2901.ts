import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2901,
  "slug": "diminutive-gym",
  "title": "Diminutive Gym",
  "subtitle": "broodje, kopje, huisje, appeltje, bloemetje, hondje",
  "phase": 5,
  "categories": [
    "diminutives"
  ],
  "words": [
    "broodje",
    "kopje",
    "huisje",
    "appeltje",
    "hondje",
    "tafeltje"
  ],
  "hookTitle": "Six Shapes of Small",
  "hook": "Broodje, kopje, huisje, appeltje, hondje, tafeltje: six nouns, six diminutive shapes, one article. The ending changes; het does not.",
  "patternTitle": "Choose the allomorph, keep het",
  "pattern": "Broodje and kopje take -je; huisje takes -je; appeltje takes -tje; hondje takes -je; tafeltje takes -tje. The final sound decides the shape.",
  "trap": "The diminutive is not only for small things. It can soften a request or make a word friendly: een kopje koffie is a normal cup, not a tiny one.",
  "sentences": [
    {
      "nl": "Het broodje is vers.",
      "en": "The roll is fresh.",
      "literal": "The little bread is fresh."
    },
    {
      "nl": "Het kopje is klein.",
      "en": "The cup is small.",
      "literal": "The little cup is small."
    },
    {
      "nl": "Het huisje is oud.",
      "en": "The little house is old.",
      "literal": "The little house is old."
    },
    {
      "nl": "Het appeltje is rood.",
      "en": "The little apple is red."
    }
  ],
  "twist": {
    "nl": "Het tafeltje is groot.",
    "en": "The little table is big.",
    "explanation": "Tafel → tafeltje; the diminutive is het even when the object is big."
  },
  "outcome": "Produce the common diminutive allomorphs and keep the article het.",
  "takeaway": "The diminutive ending is predictable from the noun's final sound; the article is always het."
};

export default lesson;
