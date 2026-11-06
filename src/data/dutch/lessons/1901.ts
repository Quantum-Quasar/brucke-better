import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1901,
  "slug": "perfect-tense-gym",
  "title": "Perfect Tense Gym",
  "subtitle": "gewerkt, gemaakt, gekomen, gegaan — build the participle and choose the helper",
  "phase": 3,
  "categories": [
    "past_tense"
  ],
  "words": [
    "hebben",
    "zijn",
    "blijven",
    "gaan",
    "komen",
    "maken"
  ],
  "hookTitle": "Two Halves, One Past",
  "hook": "Every perfect sentence has the same two halves: helper first, participle last. Ik heb het gemaakt, wij zijn gegaan, hij is gebleven. The order is a bracket.",
  "patternTitle": "Helper second, participle last",
  "pattern": "In a main clause the helper is the finite verb in second place; the participle closes the sentence. Ik heb gewerkt, wij zijn gegaan, zij is gekomen.",
  "trap": "Do not put the participle before the helper in a main clause: ik gewerkt heb is subordinate-clause order, not main-clause order.",
  "sentences": [
    {
      "nl": "Ik ben gebleven.",
      "en": "I have stayed.",
      "literal": "I am stayed."
    },
    {
      "nl": "Wij zijn gegaan.",
      "en": "We have gone.",
      "literal": "We are gone."
    },
    {
      "nl": "Hij heeft gewerkt.",
      "en": "He has worked.",
      "literal": "He has worked."
    },
    {
      "nl": "Zij is gekomen.",
      "en": "She has come."
    }
  ],
  "twist": {
    "nl": "Ik heb het gemaakt.",
    "en": "I have made it.",
    "explanation": "Maken takes hebben; the participle gemaakt closes the sentence."
  },
  "outcome": "Keep the perfect bracket in the right order in main clauses.",
  "takeaway": "The perfect is a bracket: helper second, participle last."
};

export default lesson;
