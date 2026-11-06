import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1401,
  "slug": "separable-verb-gym",
  "title": "Separable Verb Gym",
  "subtitle": "opbellen, meebrengen, aankomen, uitwaaien, overstappen, pinnen",
  "phase": 2,
  "categories": [
    "v2_order"
  ],
  "words": [
    "opbellen",
    "meebrengen",
    "aankomen",
    "uitwaaien",
    "overstappen",
    "pinnen"
  ],
  "hookTitle": "Split the Verb, Park the Prefix",
  "hook": "Six verbs, one habit: find the prefix, keep the finite part second, send the prefix to the end. Some verbs look separable and are not — pinnen stays whole.",
  "patternTitle": "Prefix at the end, finite part second",
  "pattern": "Ik bel mijn moeder op, ik breng een boek mee, de trein komt aan, wij stappen over. The prefix can be a direction, a completion or a separation.",
  "trap": "Not every prefix-like syllable separates. Pinnen has no separable prefix; it stays a single verb.",
  "sentences": [
    {
      "nl": "Ik bel mijn moeder op.",
      "en": "I call my mother.",
      "literal": "I call my mother up."
    },
    {
      "nl": "Ik breng een boek mee.",
      "en": "I bring a book along.",
      "literal": "I bring a book with."
    },
    {
      "nl": "De trein komt aan.",
      "en": "The train arrives.",
      "literal": "The train comes at."
    },
    {
      "nl": "Ik pin hier.",
      "en": "I pay by card here."
    }
  ],
  "twist": {
    "nl": "Wij stappen over.",
    "en": "We change trains.",
    "explanation": "Overstappen splits: stappen is finite, over closes the sentence."
  },
  "outcome": "Split five separable verbs correctly and leave a non-separable verb whole.",
  "takeaway": "The prefix is a position, not a decoration; the sentence tells you where it goes."
};

export default lesson;
