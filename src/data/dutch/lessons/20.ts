import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 20,
  "slug": "future-would",
  "title": "The Future & the Would-World",
  "subtitle": "gaan + infinitive for plans; zou for the polite conditional",
  "phase": 3,
  "categories": [
    "future"
  ],
  "words": [
    "gaan",
    "zullen",
    "zou",
    "willen",
    "morgen",
    "graag"
  ],
  "hookTitle": "Going To and Would",
  "hook": "Dutch has two futures: gaan + infinitive for plans (ik ga morgen werken) and zullen for promises or predictions (wij zullen komen). The polite conditional is zou, the past of zullen.",
  "patternTitle": "Plan with gaan, promise with zullen, soften with zou",
  "pattern": "Gaan is the everyday 'going to': ik ga werken. Zullen is more formal or predictive: het zal regenen. Zou softens a request: ik zou graag willen.",
  "trap": "Do not use zou as a past tense of going. Zou is the conditional/polite form; the past of gaan is ging.",
  "linguist": "Zullen is cognate with English shall; its past zou supplies the polite conditional, much as English would does.",
  "sentences": [
    {
      "nl": "Ik ga morgen werken.",
      "en": "I am going to work tomorrow.",
      "literal": "I go tomorrow work.",
      "wrong": [
        "Ik zal morgen werken.",
        "Ik ga morgen werkt."
      ]
    },
    {
      "nl": "Wij zullen komen.",
      "en": "We will come.",
      "literal": "We shall come."
    },
    {
      "nl": "Ik zou graag willen.",
      "en": "I would like to.",
      "literal": "I would gladly want."
    },
    {
      "nl": "Hij gaat het maken.",
      "en": "He is going to make it."
    }
  ],
  "twist": {
    "nl": "Ik zou graag gaan.",
    "en": "I would like to go.",
    "explanation": "Zou + graag softens the wish; the infinitive gaan stays at the end."
  },
  "outcome": "Talk about plans with gaan, predictions with zullen, and polite wishes with zou.",
  "takeaway": "Dutch future is a choice of stance: going to, will, or would."
};

export default lesson;
