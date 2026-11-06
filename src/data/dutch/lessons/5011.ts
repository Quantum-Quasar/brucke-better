import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5011,
  "slug": "first-words-spoken",
  "title": "Hallo, Dag & Alsjeblieft",
  "subtitle": "greetings, thanks and the politeness set",
  "phase": 1,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "hallo",
    "dag",
    "dank",
    "alsjeblieft",
    "goedemorgen",
    "graag"
  ],
  "hookTitle": "The First Words You Actually Say",
  "hook": "Hallo, dag, dank je, alsjeblieft: the first Dutch words are mostly twins or loans. The set is small, and each word has a clear social job.",
  "patternTitle": "Greet, thank, ask",
  "pattern": "Hallo and goedemorgen greet; dag can greet or say goodbye; dank je thanks; alsjeblieft and graag handle please. The forms are fixed, so learn them as whole social moves.",
  "trap": "Dag is not only 'day'; as a greeting it means 'bye'. Context and tone decide.",
  "sentences": [
    {
      "nl": "Hallo, hoe gaat het?",
      "en": "Hello, how are you?",
      "literal": "Hello, how goes it?"
    },
    {
      "nl": "Goedemorgen.",
      "en": "Good morning.",
      "literal": "Good morning."
    },
    {
      "nl": "Dank je wel.",
      "en": "Thank you very much.",
      "literal": "Thank you well."
    },
    {
      "nl": "Alsjeblieft.",
      "en": "Please.",
      "literal": "If it pleases you."
    }
  ],
  "twist": {
    "nl": "Tot morgen!",
    "en": "See you tomorrow!",
    "explanation": "Tot ('until') + morgen ('tomorrow') is the standard goodbye."
  },
  "outcome": "Greet, thank, ask politely and say goodbye with the core Dutch set.",
  "takeaway": "Politeness is a small closed set; learn the moves, not just the words."
};

export default lesson;
