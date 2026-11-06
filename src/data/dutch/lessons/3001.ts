import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 3001,
  "slug": "de-brug-review",
  "title": "De Brug Review",
  "subtitle": "the whole trail in one mixed drill: read, build and say the story",
  "phase": 5,
  "categories": [
    "direct_twin",
    "v2_order",
    "past_tense"
  ],
  "words": [
    "schip",
    "huis",
    "nacht",
    "boek",
    "komen",
    "gaan"
  ],
  "hookTitle": "The Final Mixed Set",
  "hook": "No new rule. Six old ones: a sch twin, a het word, a ch word, a book, a verb of arrival and a verb of going. The final drill is a test of recognition, not memory.",
  "patternTitle": "Every sentence is a return",
  "pattern": "Het schip komt aan, het huis is groot, de nacht is koud, ik ga morgen werken. Each sentence reuses a different part of the trail: a separable verb, an article, an adjective, a future.",
  "trap": "If a word looks new, check the pattern before reaching for a dictionary. The capstone is designed to be solvable from the trail alone.",
  "sentences": [
    {
      "nl": "Het schip komt aan.",
      "en": "The ship arrives.",
      "literal": "The ship comes at."
    },
    {
      "nl": "Het huis is groot.",
      "en": "The house is big.",
      "literal": "The house is big."
    },
    {
      "nl": "De nacht is koud.",
      "en": "The night is cold.",
      "literal": "The night is cold."
    },
    {
      "nl": "Ik ga morgen werken.",
      "en": "I am going to work tomorrow."
    }
  ],
  "twist": {
    "nl": "Het boek is goed.",
    "en": "The book is good.",
    "explanation": "The oldest twin in the course, read with the article it taught."
  },
  "outcome": "Complete a mixed set drawn from all thirty topics.",
  "takeaway": "Fluency is recognition made quick: the same handful of patterns, reused."
};

export default lesson;
