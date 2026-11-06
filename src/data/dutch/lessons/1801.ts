import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1801,
  "slug": "strong-verb-gym",
  "title": "Strong Verb Gym",
  "subtitle": "kwam, zag, gaf, nam — the core strong pasts in context",
  "phase": 3,
  "categories": [
    "past_tense",
    "strong_verbs"
  ],
  "words": [
    "komen",
    "zien",
    "geven",
    "nemen",
    "vinden",
    "lopen"
  ],
  "hookTitle": "Six Verbs, Six Vowels",
  "hook": "Kwam, zag, gaf, nam, vond, liep: six pasts, six vowel changes, one habit. The verb's consonant frame is stable; the vowel is the time signal.",
  "patternTitle": "Read the vowel, not the ending",
  "pattern": "Komen → kwam, zien → zag, geven → gaf, nemen → nam, vinden → vond, lopen → liep. The plural strong past often has a different vowel again, which the next lessons will meet.",
  "trap": "A strong past can look like a different word. Treat the vowel change as the lesson, not as an irregularity to memorise separately.",
  "sentences": [
    {
      "nl": "Ik kwam.",
      "en": "I came.",
      "literal": "I came."
    },
    {
      "nl": "Jij zag het.",
      "en": "You saw it.",
      "literal": "You saw it."
    },
    {
      "nl": "Hij gaf het.",
      "en": "He gave it.",
      "literal": "He gave it."
    },
    {
      "nl": "Wij namen de trein.",
      "en": "We took the train."
    }
  ],
  "twist": {
    "nl": "Ik vond het boek.",
    "en": "I found the book.",
    "explanation": "Vinden changes its vowel to vond; the consonant frame stays."
  },
  "outcome": "Use six strong past forms without adding a dental suffix.",
  "takeaway": "Strong verbs are a vowel system, not a list of exceptions."
};

export default lesson;
