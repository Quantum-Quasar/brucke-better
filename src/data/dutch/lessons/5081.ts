import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5081,
  "slug": "de-hele-dag",
  "title": "Opstaan, Wassen & Slapen",
  "subtitle": "a full day told through reflexive and separable verbs",
  "phase": 4,
  "categories": [
    "pronouns"
  ],
  "words": [
    "opstaan",
    "aankleden",
    "wassen",
    "eten",
    "werken",
    "slapen"
  ],
  "hookTitle": "A Day in Order",
  "hook": "Opstaan, aankleden, wassen, eten, werken, slapen: a Dutch day is a chain of verbs, many of them reflexive or separable. The order of the day is also the order of the sentence.",
  "patternTitle": "Finite verb second, prefix or infinitive last",
  "pattern": "Ik sta om zeven uur op, ik kleed me aan, ik was me, ik ga slapen. Separable prefixes and infinitives close their clauses; the reflexive follows the finite verb.",
  "trap": "With opstaan, the prefix op goes to the end: ik sta op, not ik opsta in a main clause.",
  "sentences": [
    {
      "nl": "Ik sta om zeven uur op.",
      "en": "I get up at seven.",
      "literal": "I stand at seven hour up."
    },
    {
      "nl": "Ik kleed me aan.",
      "en": "I get dressed.",
      "literal": "I clothe me on."
    },
    {
      "nl": "Ik was me.",
      "en": "I wash myself.",
      "literal": "I wash me."
    },
    {
      "nl": "Ik ga slapen.",
      "en": "I am going to sleep."
    }
  ],
  "twist": {
    "nl": "Ik eet brood.",
    "en": "I eat bread.",
    "explanation": "A plain main clause in the middle of the routine; the frame is still V2."
  },
  "outcome": "Narrate a daily routine with separable and reflexive verbs.",
  "takeaway": "A routine is a sequence of brackets: finite verb early, prefix or infinitive late."
};

export default lesson;
