import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 18,
  "slug": "strong-past",
  "title": "The Strong Past",
  "subtitle": "kom → kwam, zie → zag, geef → gaf — the old vowel dance",
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
    "blijven"
  ],
  "hookTitle": "The Vowel Changes, the Verb Does Not",
  "hook": "Strong verbs do not take -te or -de; they change their vowel. Kom → kwam, zie → zag, geef → gaf. English does the same in sing/sang/sung; Dutch keeps the pattern in everyday verbs.",
  "patternTitle": "One vowel, one tense",
  "pattern": "Komen → kwam, zien → zag, geven → gaf, nemen → nam, vinden → vond, blijven → bleef. The consonant frame stays; the vowel carries the past.",
  "trap": "Do not add -te to a strong verb: koomte and geefde are wrong. The vowel is the tense marker.",
  "linguist": "Ablaut is the Indo-European vowel gradation behind English sing/sang/sung and Dutch zingen/zong/gezongen.",
  "sentences": [
    {
      "nl": "Ik kwam gisteren.",
      "en": "I came yesterday.",
      "literal": "I came yesterday.",
      "wrong": [
        "Ik komde gisteren.",
        "Ik gisteren kwam."
      ]
    },
    {
      "nl": "Wij zagen het huis.",
      "en": "We saw the house.",
      "literal": "We saw the house."
    },
    {
      "nl": "Hij gaf ons een boek.",
      "en": "He gave us a book.",
      "literal": "He gave us a book."
    },
    {
      "nl": "Zij nam de trein.",
      "en": "She took the train."
    }
  ],
  "twist": {
    "nl": "Ik bleef thuis.",
    "en": "I stayed home.",
    "explanation": "Blijven changes its vowel to bleef; no dental ending appears."
  },
  "outcome": "Recognise and use the highest-frequency strong past forms.",
  "takeaway": "Some pasts are vowel changes, not suffixes; English and Dutch share the habit."
};

export default lesson;
