import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 501,
  "slug": "ch-g-clinic",
  "title": "CH & G Clinic",
  "subtitle": "nacht, licht, recht versus goed, groen, geven",
  "phase": 1,
  "categories": [
    "gh_ch",
    "g_y"
  ],
  "words": [
    "nacht",
    "licht",
    "recht",
    "acht",
    "goed",
    "groen"
  ],
  "hookTitle": "Two Throat Sounds, Not One",
  "hook": "Dutch has a voiceless ch (nacht, licht, recht) and a voiced g (goed, groen, geven). English speakers hear both as 'a throat sound' at first; the difference is whether the voice is on.",
  "patternTitle": "Voice off, voice on",
  "pattern": "Put your hand on your throat: nacht has no buzz, goed does. The spelling helps: ch is usually voiceless, g usually voiced. A few words vary by region, but the contrast is real.",
  "trap": "Do not replace Dutch g with English g as in 'good'. Dutch g is a fricative, made with friction, not a stop.",
  "sentences": [
    {
      "nl": "De nacht is lang.",
      "en": "The night is long.",
      "literal": "The night is long."
    },
    {
      "nl": "Het licht is groen.",
      "en": "The light is green.",
      "literal": "The light is green."
    },
    {
      "nl": "Je hebt recht.",
      "en": "You are right.",
      "literal": "You have right."
    },
    {
      "nl": "Het gras is groen.",
      "en": "The grass is green."
    }
  ],
  "twist": {
    "nl": "Acht boeken zijn groot.",
    "en": "Eight books are big.",
    "explanation": "Acht keeps the voiceless ch; groot starts with the voiced g."
  },
  "outcome": "Hear and produce the Dutch ch/g contrast without turning either into English g.",
  "takeaway": "Two sounds that English lumps together become a visible contrast in Dutch."
};

export default lesson;
