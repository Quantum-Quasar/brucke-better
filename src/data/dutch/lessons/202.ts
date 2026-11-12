import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 202,
  "slug": "sch-twins-in-the-wild",
  "title": "SCH Twins in the Wild",
  "subtitle": "the sch block now runs whole sentences, not just words",
  "phase": 1,
  "categories": [
    "sch_sh"
  ],
  "words": [
    "schaap",
    "school",
    "schaduw",
    "schoen",
    "zwart",
    "wit"
  ],
  "hookTitle": "From Words to Sentences",
  "hook": "Lesson 201 read the sch block one word at a time. Now it carries whole sentences: Het schaap is wit. De school is oud. The block never changes shape — the sentence just gives it more room.",
  "patternTitle": "The block travels with the word",
  "pattern": "Wherever sch appears — at the front of schaap, school, schaduw, schoen — you read it as one English sh sound and keep the twin in view. The rest of the sentence is plain Dutch you already own.",
  "trap": "The article still switches sides: het schaap but de school. Reading the sch block is not a licence to forget de and het.",
  "sentences": [
    {
      "nl": "De school is oud.",
      "en": "The school is old.",
      "literal": "The school is old.",
      "wrong": [
        "Het school is oud.",
        "De schaap is oud."
      ],
      "note": "De school is oud — de with school, and the sch block reads as one sound."
    },
    {
      "nl": "De schoen staat bij de deur.",
      "en": "The shoe stands by the door.",
      "literal": "The shoe stands by the door."
    },
    {
      "nl": "Mijn schouder doet pijn.",
      "en": "My shoulder hurts.",
      "literal": "My shoulder does pain.",
      "note": "Word for word: my shoulder does pain — doet pijn is the Dutch way to hurt."
    },
    {
      "nl": "De schaduw van de school is groot.",
      "en": "The shadow of the school is big.",
      "literal": "The shadow of the school is big."
    }
  ],
  "twist": {
    "nl": "De schaduw is scherp.",
    "en": "The shadow is sharp.",
    "explanation": "The same sch block now sits in a shadow — and scherp is sharp, spelled the Dutch way."
  },
  "outcome": "Read the sch block inside whole sentences and keep de/het on the right nouns.",
  "takeaway": "The block travels with the word; the sentence just carries it further."
};

export default lesson;
