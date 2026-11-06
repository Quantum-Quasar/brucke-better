import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2701,
  "slug": "continuous-gym",
  "title": "Continuous Gym",
  "subtitle": "ik ben aan het werken, zij zit te lezen, hij staat te wachten",
  "phase": 5,
  "categories": [
    "continuous"
  ],
  "words": [
    "zitten",
    "staan",
    "liggen",
    "lopen",
    "lezen",
    "werken"
  ],
  "hookTitle": "Four Postures, One Continuous",
  "hook": "Zitten, staan, liggen, lopen: four posture verbs, four ways to picture an action in progress. The te + infinitive is the constant.",
  "patternTitle": "Posture + te + infinitive",
  "pattern": "Ik zit te lezen, hij staat te wachten, zij ligt te slapen, wij lopen te praten. The posture verb is finite; the action infinitive closes the sentence.",
  "trap": "The posture verb is not a tense marker; it adds a physical image. Use aan het + infinitive when no posture is implied.",
  "sentences": [
    {
      "nl": "Ik zit te lezen.",
      "en": "I am reading.",
      "literal": "I sit to read."
    },
    {
      "nl": "Hij staat te wachten.",
      "en": "He is waiting.",
      "literal": "He stands to wait."
    },
    {
      "nl": "Zij ligt te slapen.",
      "en": "She is sleeping.",
      "literal": "She lies to sleep."
    },
    {
      "nl": "Wij lopen te praten.",
      "en": "We are walking and talking."
    }
  ],
  "twist": {
    "nl": "Ik ben aan het werken.",
    "en": "I am working.",
    "explanation": "Without a posture, use aan het + infinitive: aan het werken."
  },
  "outcome": "Choose a posture verb or aan het for an action in progress.",
  "takeaway": "The continuous is a picture plus an infinitive; the posture is optional colour."
};

export default lesson;
