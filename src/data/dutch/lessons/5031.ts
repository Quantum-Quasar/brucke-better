import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5031,
  "slug": "false-friends-preview",
  "title": "Room, Brood & Bellen",
  "subtitle": "the traps that look like English",
  "phase": 1,
  "categories": [
    "false_friends"
  ],
  "words": [
    "room",
    "brood",
    "bellen",
    "vuur",
    "dier",
    "meer"
  ],
  "hookTitle": "Lookalikes Are Not Twins",
  "hook": "Room is cream, brood is bread, bellen is to phone. The words look English but mean something else. The Dutch twin of the English word is usually a different word entirely.",
  "patternTitle": "Check the meaning, not the shape",
  "pattern": "Room looks like room but means cream; the room is kamer. Brood looks like brood but means bread. Bellen looks like bell but means to phone. When a Dutch word looks too English, slow down.",
  "trap": "Dier looks like deer but means any animal; a deer is hert. Meer looks like mere but means lake (and also more).",
  "sentences": [
    {
      "nl": "De room is koud.",
      "en": "The cream is cold.",
      "literal": "The cream is cold."
    },
    {
      "nl": "Het brood is vers.",
      "en": "The bread is fresh.",
      "literal": "The bread is fresh."
    },
    {
      "nl": "Ik bel mijn moeder.",
      "en": "I call my mother.",
      "literal": "I bell my mother."
    },
    {
      "nl": "Het dier is groot.",
      "en": "The animal is big."
    }
  ],
  "twist": {
    "nl": "Het meer is koud.",
    "en": "The lake is cold.",
    "explanation": "Meer can mean 'more' or 'lake'; here the article het and the context make it a lake."
  },
  "outcome": "Recognise six high-frequency false friends and recall their real meanings.",
  "takeaway": "A false friend is a word whose shape lies; check the meaning before you translate."
};

export default lesson;
