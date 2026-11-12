import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1002,
  "slug": "present-in-the-wild",
  "title": "The Present in the Wild",
  "subtitle": "the stem-and-ending machine now runs real everyday sentences",
  "phase": 2,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "wonen",
    "spelen",
    "komen",
    "zien",
    "geven",
    "blijven"
  ],
  "hookTitle": "One Stem, Real Sentences",
  "hook": "Lesson 1001 built the machine: take the stem, add -t for jij, -en for wij. Now run it on verbs you have never conjugated on purpose: wonen, spelen, komen, zien. The machine does not care which verb you feed it.",
  "patternTitle": "Feed the stem, get the sentence",
  "pattern": "wonen → wij wonen, jij woont. spelen → wij spelen, jij speelt. The stem comes from the infinitive; the ending comes from the person. Nothing else changes in the sentence.",
  "trap": "Jij gets the t even when the sentence starts with something else: vandaag werk jij — but wait for Topic 12 before you flip the order yourself.",
  "sentences": [
    {
      "nl": "Ik werk in de stad.",
      "en": "I work in the city.",
      "literal": "I work in the city.",
      "wrong": [
        "Ik werk in het stad.",
        "Ik werken in de stad."
      ],
      "note": "Ik werk — the I-form keeps the bare stem, and de stays with stad."
    },
    {
      "nl": "Jij woont hier.",
      "en": "You live here.",
      "literal": "You live here.",
      "note": "Jij woont — the t is the you-ending, straight from the stem."
    },
    {
      "nl": "Wij spelen buiten in de tuin.",
      "en": "We are playing in the garden.",
      "literal": "We play outside in the garden.",
      "note": "Word for word: we play outside in the garden — Dutch needs no extra -ing."
    },
    {
      "nl": "De kinderen komen morgen.",
      "en": "The children are coming tomorrow.",
      "literal": "The children come tomorrow."
    }
  ],
  "twist": {
    "nl": "Wij komen morgen naar de stad.",
    "en": "We are coming to the city tomorrow.",
    "explanation": "komen keeps its bare stem for wij — one more verb fed through the same machine."
  },
  "outcome": "Conjugate fresh verbs (wonen, spelen, komen, zien) into real sentences with the right ending.",
  "takeaway": "Feed the stem, get the sentence — the machine works on every Dutch verb."
};

export default lesson;
