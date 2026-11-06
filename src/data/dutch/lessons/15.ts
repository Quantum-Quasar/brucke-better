import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 15,
  "slug": "numbers-time",
  "title": "Numbers & Time",
  "subtitle": "een, twee, drie — and why half drie means half past two",
  "phase": 3,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "een",
    "twee",
    "drie",
    "tien",
    "twintig",
    "uur"
  ],
  "hookTitle": "Count, Then Read the Clock",
  "hook": "Dutch numbers are close to English: twee, drie, tien, twintig. The clock is the surprise. Half drie does not mean half past three; it means half past two, because Dutch counts toward the next hour.",
  "patternTitle": "The clock counts forward",
  "pattern": "Het is drie uur (three o'clock), tien over drie (ten past three), half drie (half past two). The named hour is the one you are moving toward, not the one you have passed.",
  "trap": "Half drie is 2:30, not 3:30. The Dutch half belongs to the coming hour.",
  "linguist": "The Dutch clock names the approaching hour; English names the hour just passed. Both are coherent systems, just different anchor points.",
  "sentences": [
    {
      "nl": "Het is drie uur.",
      "en": "It is three o'clock.",
      "literal": "It is three hour.",
      "wrong": [
        "Het is drie uren.",
        "Het is uur drie."
      ]
    },
    {
      "nl": "Ik heb twee boeken.",
      "en": "I have two books.",
      "literal": "I have two books."
    },
    {
      "nl": "Wij zijn met tien.",
      "en": "There are ten of us.",
      "literal": "We are with ten."
    },
    {
      "nl": "Het is tien over drie.",
      "en": "It is ten past three."
    }
  ],
  "twist": {
    "nl": "Het is half drie.",
    "en": "It is half past two.",
    "explanation": "Half drie points forward to three: the clock is halfway to the next hour."
  },
  "outcome": "Count to twenty and tell the time with the Dutch forward-counting clock.",
  "takeaway": "Dutch time is not a translation of English time; it is the same clock read from the other side."
};

export default lesson;
