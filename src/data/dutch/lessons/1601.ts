import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1601,
  "slug": "calendar-gym",
  "title": "Calendar Gym",
  "subtitle": "Monday to Saturday, and the days that take op",
  "phase": 3,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag"
  ],
  "hookTitle": "Seven Days, One Frame",
  "hook": "Maandag through zaterdag: each day is a name you can read, and each one takes op when you say what happens on it. The frame never changes; the day does.",
  "patternTitle": "Op + day",
  "pattern": "Op maandag werk ik, op dinsdag kom ik, op zaterdag ben ik vrij. The preposition op marks the day; the verb keeps V2 order.",
  "trap": "The day name looks like an adverb, but it still needs op when it is a time phrase: op maandag, not maandag werk ik in formal writing (though the bare form occurs in speech).",
  "sentences": [
    {
      "nl": "Vandaag is het maandag.",
      "en": "Today is Monday.",
      "literal": "Today is it Monday."
    },
    {
      "nl": "Morgen is het dinsdag.",
      "en": "Tomorrow is Tuesday.",
      "literal": "Tomorrow is it Tuesday."
    },
    {
      "nl": "Woensdag werk ik.",
      "en": "On Wednesday I work.",
      "literal": "Wednesday work I."
    },
    {
      "nl": "Zaterdag is het vrij.",
      "en": "On Saturday it is free."
    }
  ],
  "twist": {
    "nl": "Zondag is het rustig.",
    "en": "On Sunday it is quiet.",
    "explanation": "Zondag is the last day of the set; rustig describes the day."
  },
  "outcome": "Say what happens on each day with the op-frame or a fronted day.",
  "takeaway": "Day names are vocabulary; the time phrase is the grammar."
};

export default lesson;
