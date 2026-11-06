import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 101,
  "slug": "hidden-twins-body-home",
  "title": "Hidden Twins: Body & Home",
  "subtitle": "arm, hand, vinger, hoofd, oog, oor — the body is the safest place to start",
  "phase": 1,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "arm",
    "hand",
    "vinger",
    "hoofd",
    "oog",
    "oor"
  ],
  "hookTitle": "Your Body Already Speaks Dutch",
  "hook": "The body is where English and Dutch look most alike. Arm is arm, hand is hand, vinger is finger, and oor is ear. These are not lucky borrowings; they are the oldest layer of the family.",
  "patternTitle": "Six twins, two articles",
  "pattern": "De arm, de hand, de vinger are common-gender words; het hoofd, het oog and het oor are neuter. You do not have to guess yet — read the article as part of the word, the way English reads 'the' as part of a phrase.",
  "trap": "Vinger starts with v, but the English twin starts with f. Dutch voices the old f in spelling even when a northern speaker says it close to f.",
  "sentences": [
    {
      "nl": "Mijn hand is warm.",
      "en": "My hand is warm.",
      "literal": "My hand is warm.",
      "wrong": [
        "Mijn hand warm is.",
        "Mijn hand zijn warm."
      ]
    },
    {
      "nl": "Mijn hoofd is koud.",
      "en": "My head is cold.",
      "literal": "My head is cold."
    },
    {
      "nl": "Mijn oog is open.",
      "en": "My eye is open.",
      "literal": "My eye is open."
    },
    {
      "nl": "Mijn oor is klein.",
      "en": "My ear is small."
    }
  ],
  "twist": {
    "nl": "Mijn vinger is klein.",
    "en": "My finger is small.",
    "explanation": "Vinger is the f→v twin of finger, and the sentence reuses the same possessive frame."
  },
  "outcome": "Name six body parts with their articles and use mijn before a noun.",
  "takeaway": "The body vocabulary is nearly free; the only new work is the article that travels with each noun.",
  "payoff": {
    "ofLesson": 1,
    "text": "The direct-twin principle from the opening lesson now carries a whole semantic field."
  }
};

export default lesson;
