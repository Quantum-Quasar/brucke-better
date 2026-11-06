import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 12,
  "slug": "v2-word-order",
  "title": "Word Order: The Dutch Bracket",
  "subtitle": "the verb takes second place — front something else and it steps around the subject",
  "phase": 2,
  "categories": [
    "v2_order"
  ],
  "words": [
    "vandaag",
    "morgen",
    "komen",
    "werken",
    "ik",
    "jij"
  ],
  "hookTitle": "The Verb Takes Second Place",
  "hook": "In a Dutch main clause the finite verb is the second element. Ik werk vandaag is fine. Front vandaag and the verb still wants second place: Vandaag werk ik. The subject steps behind it.",
  "patternTitle": "Front it, invert it",
  "pattern": "Vandaag werk ik, morgen kom jij, hier werk ik. Whatever occupies first place, the finite verb is second and the subject comes after it. English does this in questions; Dutch does it whenever you front a word.",
  "trap": "Do not keep the English order after fronting. Vandaag ik werk is wrong; the verb must be second.",
  "linguist": "Dutch is a V2 language: the finite verb occupies the second position in main clauses regardless of what comes first.",
  "sentences": [
    {
      "nl": "Vandaag werk ik.",
      "en": "Today I work.",
      "literal": "Today work I.",
      "wrong": [
        "Vandaag ik werk.",
        "Ik vandaag werk."
      ]
    },
    {
      "nl": "Morgen kom jij.",
      "en": "Tomorrow you come.",
      "literal": "Tomorrow come you."
    },
    {
      "nl": "Ik werk vandaag.",
      "en": "I work today.",
      "literal": "I work today."
    },
    {
      "nl": "Jij komt morgen.",
      "en": "You come tomorrow."
    }
  ],
  "twist": {
    "nl": "Vandaag kom ik.",
    "en": "Today I come.",
    "explanation": "Fronting vandaag forces the verb second and the subject after it: kom ik."
  },
  "outcome": "Keep the finite verb second when a time or place word is fronted.",
  "takeaway": "Dutch word order is a position rule: the verb claims second place, and the subject moves around it."
};

export default lesson;
