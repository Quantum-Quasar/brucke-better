import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2101,
  "slug": "comparison-gym",
  "title": "Comparison Gym",
  "subtitle": "groter, kleiner, sneller, langzamer — compare without translating 'than'",
  "phase": 3,
  "categories": [
    "comparison"
  ],
  "words": [
    "groot",
    "klein",
    "snel",
    "langzaam",
    "goed",
    "slecht"
  ],
  "hookTitle": "Put Two Things Side by Side",
  "hook": "Comparison only works when two things are on the table. Het huis is groter dan de kamer, de trein is sneller dan de fiets. The adjective changes; the frame does not.",
  "patternTitle": "Adjective + -er + dan",
  "pattern": "Groot → groter, klein → kleiner, snel → sneller, langzaam → langzamer. The second item follows dan. Use als only when the two are equal: even groot als.",
  "trap": "Langzaam is already an adjective; do not add meer. Langzamer, not meer langzaam.",
  "sentences": [
    {
      "nl": "De trein is sneller dan de fiets.",
      "en": "The train is faster than the bike.",
      "literal": "The train is faster than the bike."
    },
    {
      "nl": "Het huis is groter dan de kamer.",
      "en": "The house is bigger than the room.",
      "literal": "The house is bigger than the room."
    },
    {
      "nl": "Zij werkt langzamer.",
      "en": "She works more slowly.",
      "literal": "She works slower."
    },
    {
      "nl": "Dit boek is beter.",
      "en": "This book is better."
    }
  ],
  "twist": {
    "nl": "De auto is sneller dan de fiets.",
    "en": "The car is faster than the bike.",
    "explanation": "The same comparative frame with a different pair of nouns."
  },
  "outcome": "Compare two nouns or actions with -er and dan.",
  "takeaway": "Comparison is a frame for two items; the adjective carries the degree."
};

export default lesson;
