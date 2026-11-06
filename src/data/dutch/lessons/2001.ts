import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2001,
  "slug": "future-would-gym",
  "title": "Future & Would Gym",
  "subtitle": "ik ga werken, wij zullen komen, ik zou kunnen gaan",
  "phase": 3,
  "categories": [
    "future"
  ],
  "words": [
    "gaan",
    "zullen",
    "zou",
    "kunnen",
    "willen",
    "graag"
  ],
  "hookTitle": "Three Futures, One Bracket",
  "hook": "Gaan, zullen and zou all push the infinitive to the end. The difference is stance: plan, promise, or polite possibility. The bracket stays.",
  "patternTitle": "Finite first, infinitive last",
  "pattern": "Ik ga werken, wij zullen komen, ik zou kunnen gaan. The finite word takes second place; the infinitive (or infinitives) close the sentence.",
  "trap": "In a modal + future combination, keep the order: ik zou kunnen gaan, not ik zou gaan kunnen in a main clause.",
  "sentences": [
    {
      "nl": "Ik ga werken.",
      "en": "I am going to work.",
      "literal": "I go work."
    },
    {
      "nl": "Wij zullen komen.",
      "en": "We will come.",
      "literal": "We shall come."
    },
    {
      "nl": "Ik zou kunnen gaan.",
      "en": "I could go.",
      "literal": "I would can go."
    },
    {
      "nl": "Zij wil graag blijven.",
      "en": "She would like to stay."
    }
  ],
  "twist": {
    "nl": "Ik zou graag willen komen.",
    "en": "I would like to come.",
    "explanation": "Zou, graag and willen soften the wish; komen closes the bracket."
  },
  "outcome": "Combine future, modal and polite forms without losing the final infinitive.",
  "takeaway": "Every future is still a bracket; the stance changes, the order does not."
};

export default lesson;
