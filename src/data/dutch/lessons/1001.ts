import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1001,
  "slug": "present-tense-drill",
  "title": "Present Tense Drill",
  "subtitle": "werken, maken, leren, lezen, schrijven, spreken",
  "phase": 2,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "werken",
    "maken",
    "leren",
    "lezen",
    "schrijven",
    "spreken"
  ],
  "hookTitle": "Six Verbs, One Machine",
  "hook": "Read the infinitive, find the stem, choose the ending. Werken, maken, leren, lezen, schrijven, spreken: the same machine runs every one of them.",
  "patternTitle": "Stem first, ending second",
  "pattern": "Werk + t = werkt; lees + t = leest; schrijf + t = schrijft. The spelling of the stem stays; only the final -t or -en is added. Plural forms take the infinitive minus -n? No: they take stem + -en.",
  "trap": "Lezen and schrijven change their stem spelling before -t: lees, schrijf. Do not add -t to the infinitive.",
  "sentences": [
    {
      "nl": "Ik leer Nederlands.",
      "en": "I learn Dutch.",
      "literal": "I learn Dutch."
    },
    {
      "nl": "Jij leest een boek.",
      "en": "You read a book.",
      "literal": "You read a book."
    },
    {
      "nl": "Wij schrijven een woord.",
      "en": "We write a word.",
      "literal": "We write a word."
    },
    {
      "nl": "Hij spreekt goed.",
      "en": "He speaks well."
    }
  ],
  "twist": {
    "nl": "Ik maak koffie.",
    "en": "I make coffee.",
    "explanation": "Maken follows the same stem + ending machine as werken and leren."
  },
  "outcome": "Conjugate six high-frequency verbs in the present tense.",
  "takeaway": "Regular verbs are not memorised one by one; they are one stem plus three endings."
};

export default lesson;
