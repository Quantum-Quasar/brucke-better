import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2301,
  "slug": "reflexive-gym",
  "title": "Reflexive Gym",
  "subtitle": "opstaan, aankleden, wassen, voelen — a day told through reflexives",
  "phase": 4,
  "categories": [
    "pronouns"
  ],
  "words": [
    "opstaan",
    "aankleden",
    "wassen",
    "voelen",
    "slapen",
    "gaan"
  ],
  "hookTitle": "A Day in Reflexives",
  "hook": "A Dutch morning is a chain of reflexive and separable verbs: ik sta op, ik kleed me aan, ik was me, ik voel me goed. The day is grammar.",
  "patternTitle": "Reflexive pronoun before the verb",
  "pattern": "Ik kleed me aan, ik was me, ik voel me goed. In a main clause the reflexive follows the finite verb; with a separable verb the prefix goes to the end.",
  "trap": "With aankleden, both the reflexive and the prefix are needed: ik kleed me aan, not ik kleed aan me.",
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
      "nl": "Ik voel me goed.",
      "en": "I feel good."
    }
  ],
  "twist": {
    "nl": "Ik ga slapen.",
    "en": "I am going to sleep.",
    "explanation": "Gaan + infinitive; no reflexive is needed for sleeping."
  },
  "outcome": "Tell a daily routine with reflexives and separable verbs in the right order.",
  "takeaway": "Reflexive and separable patterns stack: first the pronoun, then the finite verb, then the prefix."
};

export default lesson;
