import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 301,
  "slug": "th-d-discrimination",
  "title": "TH → D Discrimination",
  "subtitle": "brother, mother, father, thing — separate the twins from the lookalikes",
  "phase": 1,
  "categories": [
    "th_d",
    "f_v"
  ],
  "words": [
    "broer",
    "moeder",
    "vader",
    "ding",
    "ander",
    "zus"
  ],
  "hookTitle": "Two Bridges at Once",
  "hook": "Mother is moeder and father is vader: the th→d bridge and the f→v bridge meet in the same family. Brother is broer, sister is zus. The family vocabulary is a small museum of the correspondences.",
  "patternTitle": "One family, three rules",
  "pattern": "Moeder shows th→d; vader shows both th→d and f→v; broer shows th→d with a vowel change. Zus is the odd one out, which is useful: not every word is a twin, and the course will never pretend otherwise.",
  "trap": "Do not force 'sister' into a sound rule. Zus is simply the Dutch word; learn it as an anchor and move on.",
  "sentences": [
    {
      "nl": "Mijn moeder is hier.",
      "en": "My mother is here.",
      "literal": "My mother is here."
    },
    {
      "nl": "Mijn vader is daar.",
      "en": "My father is there.",
      "literal": "My father is there."
    },
    {
      "nl": "Drie boeken zijn hier.",
      "en": "Three books are here.",
      "literal": "Three books are here."
    },
    {
      "nl": "Het andere boek is goed.",
      "en": "The other book is good."
    }
  ],
  "twist": {
    "nl": "Mijn broer en mijn zus zijn hier.",
    "en": "My brother and my sister are here.",
    "explanation": "Two subjects take zijn, the plural of the same being-verb."
  },
  "outcome": "Separate real th/f twins from words that merely look similar.",
  "takeaway": "A rule is strongest when you also know its exceptions."
};

export default lesson;
