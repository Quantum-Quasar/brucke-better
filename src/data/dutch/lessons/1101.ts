import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1101,
  "slug": "niet-geen-drill",
  "title": "Niet/Geen Drill",
  "subtitle": "coffee, tea, time and water — choose the negator by what follows",
  "phase": 2,
  "categories": [
    "negation"
  ],
  "words": [
    "niet",
    "geen",
    "koffie",
    "thee",
    "drinken",
    "water"
  ],
  "hookTitle": "Choose by What Follows",
  "hook": "If the noun is indefinite, geen. If you are negating a verb, adjective or definite phrase, niet. The drink words make the choice visible.",
  "patternTitle": "The noun decides",
  "pattern": "Ik drink geen koffie: koffie is indefinite. Het water is niet koud: koud is an adjective, so niet. The negator sits before the thing it negates or at the end of the predicate.",
  "trap": "Geen is not a universal 'no'. It cannot negate an adjective or a verb on its own.",
  "sentences": [
    {
      "nl": "Ik drink geen koffie.",
      "en": "I do not drink coffee.",
      "literal": "I drink no coffee."
    },
    {
      "nl": "Ik drink thee.",
      "en": "I drink tea.",
      "literal": "I drink tea."
    },
    {
      "nl": "Wij hebben geen tijd.",
      "en": "We have no time.",
      "literal": "We have no time."
    },
    {
      "nl": "Het water is niet koud.",
      "en": "The water is not cold."
    }
  ],
  "twist": {
    "nl": "Ik drink geen wijn.",
    "en": "I do not drink wine.",
    "explanation": "Wijn is indefinite, so geen; the verb drinken stays positive."
  },
  "outcome": "Negate indefinite nouns with geen and adjectives/verbs with niet.",
  "takeaway": "The negator is chosen by the thing being negated, not by the speaker's mood."
};

export default lesson;
