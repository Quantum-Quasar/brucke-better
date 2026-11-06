import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 401,
  "slug": "voicing-gym",
  "title": "Voicing Gym",
  "subtitle": "fish, fire, full, free, salt, seven — mixed f/v and s/z drills",
  "phase": 1,
  "categories": [
    "f_v",
    "s_z"
  ],
  "words": [
    "vis",
    "vuur",
    "vol",
    "vrij",
    "zout",
    "zeven"
  ],
  "hookTitle": "Voice On, Voice Off",
  "hook": "Vis, vuur, vol, vrij: four v words, four English f twins. Zout and zeven: two z words, two English s twins. The pattern is the same; only the word changes.",
  "patternTitle": "Say the English twin, then the Dutch spelling",
  "pattern": "Say fish, then vis; fire, then vuur; full, then vol; free, then vrij. The English f becomes Dutch v in writing, and the vowel tells you which word you are in.",
  "trap": "Vol is full, not 'vol' as in volume. The English twin is semantic, not a spelling lookalike.",
  "sentences": [
    {
      "nl": "Het vuur is warm.",
      "en": "The fire is warm.",
      "literal": "The fire is warm."
    },
    {
      "nl": "De vis is vers.",
      "en": "The fish is fresh.",
      "literal": "The fish is fresh."
    },
    {
      "nl": "Het glas is vol.",
      "en": "The glass is full.",
      "literal": "The glass is full."
    },
    {
      "nl": "Ik ben vrij.",
      "en": "I am free."
    }
  ],
  "twist": {
    "nl": "Ik heb zeven boeken.",
    "en": "I have seven books.",
    "explanation": "Zeven is the s→z twin of seven; hebben is the verb for possession."
  },
  "outcome": "Convert six f/s words into their Dutch v/z twins on sight.",
  "takeaway": "Voicing is a family habit, not a list of exceptions."
};

export default lesson;
