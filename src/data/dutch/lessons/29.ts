import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 29,
  "slug": "diminutives",
  "title": "Diminutives & Word Formation",
  "subtitle": "-je, -tje, -pje, -etje — the diminutive is Dutch's favourite word-building machine",
  "phase": 5,
  "categories": [
    "diminutives"
  ],
  "words": [
    "broodje",
    "kopje",
    "huisje",
    "appeltje",
    "bloemetje",
    "hondje"
  ],
  "hookTitle": "Shrink It and Change Its Article",
  "hook": "Add -je (or -tje, -pje, -etje) and a noun becomes a diminutive. Every diminutive is het, and the ending often adds affection, not just smallness: een broodje, een kopje, een huisje.",
  "patternTitle": "The ending follows the noun's shape",
  "pattern": "Brood → broodje, kop → kopje, huis → huisje, appel → appeltje, bloem → bloemetje, hond → hondje. The allomorph depends on the final sound; the article is always het.",
  "trap": "Do not keep the original article: de hond becomes het hondje. The diminutive overrides the noun's gender.",
  "linguist": "The Dutch diminutive is a productive noun class; it marks size, affection, or simply everyday register, and always selects het.",
  "sentences": [
    {
      "nl": "Ik heb een broodje.",
      "en": "I have a roll.",
      "literal": "I have a little bread.",
      "wrong": [
        "Ik heb een brood.",
        "Ik heb de broodje."
      ]
    },
    {
      "nl": "Wij drinken een kopje koffie.",
      "en": "We drink a cup of coffee.",
      "literal": "We drink a little cup coffee."
    },
    {
      "nl": "Het huisje is klein.",
      "en": "The little house is small.",
      "literal": "The little house is small."
    },
    {
      "nl": "Het hondje is lief.",
      "en": "The little dog is sweet."
    }
  ],
  "twist": {
    "nl": "Ik zie een bloemetje.",
    "en": "I see a little flower.",
    "explanation": "Bloem → bloemetje; the diminutive is het, and the ending adds affection."
  },
  "outcome": "Form common diminutives and use het with every one.",
  "takeaway": "The diminutive is a word-building machine that also resets the article to het."
};

export default lesson;
