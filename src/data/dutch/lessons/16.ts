import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 16,
  "slug": "days-months-dates",
  "title": "Days, Months & Dates",
  "subtitle": "maandag, januari, vandaag — the calendar words English and Dutch share",
  "phase": 3,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "maandag",
    "dinsdag",
    "januari",
    "vandaag",
    "morgen",
    "gisteren"
  ],
  "hookTitle": "The Calendar Is Almost Free",
  "hook": "Maandag, dinsdag, januari: the calendar is a museum of shared loans and shared Germanic gods. The only new work is the little prepositions that tell you when.",
  "patternTitle": "Day, month, preposition",
  "pattern": "Op maandag ('on Monday'), in januari ('in January'), vandaag, morgen, gisteren. Dutch uses op for days, in for months, and the time words stand alone.",
  "trap": "Do not use op before a month or in before a day. The preposition follows the unit of time.",
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
      "nl": "In januari is het koud.",
      "en": "In January it is cold.",
      "literal": "In January is it cold."
    },
    {
      "nl": "Op maandag werk ik.",
      "en": "On Monday I work."
    }
  ],
  "twist": {
    "nl": "Vandaag is het woensdag.",
    "en": "Today is Wednesday.",
    "explanation": "The same frame as the other days; only the day name changes."
  },
  "outcome": "Name days and months, and choose op or in for dates.",
  "takeaway": "Calendar vocabulary is a loan; calendar grammar is a preposition choice."
};

export default lesson;
