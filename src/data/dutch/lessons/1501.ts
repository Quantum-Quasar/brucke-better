import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1501,
  "slug": "clock-numbers-gym",
  "title": "Clock & Numbers Gym",
  "subtitle": "tien, twintig, honderd, duizend — and the half-hour trap",
  "phase": 3,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "tien",
    "twintig",
    "honderd",
    "duizend",
    "half",
    "uur"
  ],
  "hookTitle": "Numbers First, Clock Second",
  "hook": "Tien, twintig, honderd, duizend: the number spine is almost English. Once the numbers are secure, the clock becomes a small reading rule instead of a second vocabulary list.",
  "patternTitle": "Name the number, then the hour",
  "pattern": "Tien uur, half vier, honderd euro, duizend boeken. The number comes first; uur marks the clock. Half vier is 3:30 because Dutch is counting toward four.",
  "trap": "Do not translate half vier as 4:30. The half-hour is named for the hour it is approaching.",
  "sentences": [
    {
      "nl": "Het is half vier.",
      "en": "It is half past three.",
      "literal": "It is half four."
    },
    {
      "nl": "Ik heb honderd euro.",
      "en": "I have a hundred euros.",
      "literal": "I have hundred euro."
    },
    {
      "nl": "Duizend is veel.",
      "en": "A thousand is a lot.",
      "literal": "A thousand is much."
    },
    {
      "nl": "Het is tien uur.",
      "en": "It is ten o'clock."
    }
  ],
  "twist": {
    "nl": "Wij komen om drie uur.",
    "en": "We come at three o'clock.",
    "explanation": "Om marks clock time; the number and uur stay together."
  },
  "outcome": "Use Dutch numbers up to a thousand and read the clock without translating half literally.",
  "takeaway": "The clock is a rule, not a list: learn the anchor and the rest follows."
};

export default lesson;
