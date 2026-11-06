import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 17,
  "slug": "weak-past",
  "title": "The Weak Past",
  "subtitle": "werk → werkte, maak → maakte — a small ending, not a new word",
  "phase": 3,
  "categories": [
    "past_tense"
  ],
  "words": [
    "werken",
    "maken",
    "kopen",
    "spelen",
    "leren",
    "wonen"
  ],
  "hookTitle": "The Past Is an Ending",
  "hook": "Most Dutch verbs make the past with a small ending, like English -ed. Werken → werkte, maken → maakte, spelen → speelde. The stem stays; the tense arrives as a suffix.",
  "patternTitle": "-te or -de by the stem's last sound",
  "pattern": "Stems ending in a voiceless sound take -te: werken → werkte, maken → maakte. Stems ending in a voiced sound take -de: spelen → speelde, wonen → woonde. The plural adds -n.",
  "trap": "Kopen is irregular: the past is kocht, not koopte. Learn the weak rule first, then mark the strong verbs as exceptions.",
  "linguist": "The weak dental suffix is one of the defining innovations of Germanic; English -ed and Dutch -te/-de are the same historical ending.",
  "sentences": [
    {
      "nl": "Ik werkte gisteren.",
      "en": "I worked yesterday.",
      "literal": "I worked yesterday.",
      "wrong": [
        "Ik werkde gisteren.",
        "Ik gisteren werkte."
      ]
    },
    {
      "nl": "Wij maakten koffie.",
      "en": "We made coffee.",
      "literal": "We made coffee."
    },
    {
      "nl": "Zij speelde buiten.",
      "en": "She played outside.",
      "literal": "She played outside."
    },
    {
      "nl": "Ik woonde daar.",
      "en": "I lived there."
    }
  ],
  "twist": {
    "nl": "Ik leerde Nederlands.",
    "en": "I learned Dutch.",
    "explanation": "Leren takes -de because the stem ends in a voiced sound: leerde."
  },
  "outcome": "Form the weak past with -te/-de and recognise the irregular verbs that escape it.",
  "takeaway": "The past tense is a suffix on the stem, not a new vocabulary item."
};

export default lesson;
