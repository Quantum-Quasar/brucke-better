import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5051,
  "slug": "in-de-stad",
  "title": "Links, Rechts & Rechtdoor",
  "subtitle": "directions, trams and the words on every Dutch corner",
  "phase": 2,
  "categories": [
    "place"
  ],
  "words": [
    "links",
    "rechts",
    "rechtdoor",
    "tram",
    "station",
    "straat"
  ],
  "hookTitle": "Find Your Way",
  "hook": "Links, rechts, rechtdoor: left, right, straight ahead. Add tram, station and straat and you can navigate a Dutch city with six words.",
  "patternTitle": "Imperative + direction",
  "pattern": "Ga links, ga rechts, ga rechtdoor. The verb ga is the bare stem imperative; the direction follows. De tram is daar, het station is hier.",
  "trap": "Rechts is both 'right' and the adjective 'right' in other contexts; the direction is clear from ga.",
  "sentences": [
    {
      "nl": "Ga links.",
      "en": "Go left.",
      "literal": "Go left."
    },
    {
      "nl": "Ga rechts.",
      "en": "Go right.",
      "literal": "Go right."
    },
    {
      "nl": "Ga rechtdoor.",
      "en": "Go straight ahead.",
      "literal": "Go right-through."
    },
    {
      "nl": "De tram is daar.",
      "en": "The tram is there."
    }
  ],
  "twist": {
    "nl": "Het station is hier.",
    "en": "The station is here.",
    "explanation": "Station is a het-word; the place frame is unchanged."
  },
  "outcome": "Ask for and give simple directions in a Dutch city.",
  "takeaway": "Directions are a small imperative set with a place word attached."
};

export default lesson;
