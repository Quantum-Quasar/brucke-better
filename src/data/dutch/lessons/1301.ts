import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1301,
  "slug": "modal-gym",
  "title": "Modal Gym",
  "subtitle": "kan, moet, mag, wil, zal — five modals, one shape",
  "phase": 2,
  "categories": [
    "v2_order"
  ],
  "words": [
    "kunnen",
    "moeten",
    "mogen",
    "willen",
    "gaan",
    "blijven"
  ],
  "hookTitle": "Five Modals, One Shape",
  "hook": "Kan, moet, mag, wil, zal: five different meanings, one sentence shape. Modal second, infinitive last. The vocabulary changes; the bracket does not.",
  "patternTitle": "Meaning changes, position stays",
  "pattern": "Ik kan gaan, jij moet blijven, wij willen komen, zij mag gaan. The modal agrees with the subject; the infinitive never does.",
  "trap": "Zal is not English 'shall' in every context; it often marks future or intention. Learn the shape first, then the meaning.",
  "sentences": [
    {
      "nl": "Ik kan gaan.",
      "en": "I can go.",
      "literal": "I can go."
    },
    {
      "nl": "Jij moet blijven.",
      "en": "You must stay.",
      "literal": "You must stay."
    },
    {
      "nl": "Wij willen komen.",
      "en": "We want to come.",
      "literal": "We want to come."
    },
    {
      "nl": "Zij mag gaan.",
      "en": "She may go."
    }
  ],
  "twist": {
    "nl": "Ik wil niet werken.",
    "en": "I do not want to work.",
    "explanation": "Niet precedes the final infinitive; the modal remains second."
  },
  "outcome": "Swap five modals through the same bracket without changing the second verb.",
  "takeaway": "A modal is a slot, not a new sentence pattern."
};

export default lesson;
