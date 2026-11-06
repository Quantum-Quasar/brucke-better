import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1,
  "slug": "dutch-inside-english",
  "title": "The Dutch Inside Your English",
  "subtitle": "The West Germanic twin, first articles, and your first Dutch sentences",
  "phase": 1,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "water",
    "huis",
    "boek",
    "brood",
    "ik",
    "zijn"
  ],
  "hookTitle": "You Already Read Half of This Page",
  "hook": "Dutch is the West Germanic sibling English kept closest. Both languages stayed north of the High German consonant shift, so where German says Wasser, Dutch still says water. You are not starting from zero; you are turning the page on words you already own.",
  "patternTitle": "The twins are not exceptions — they are the rule",
  "pattern": "Start with three everyday words: water is water, huis is house, boek is book. Dutch spells them its own way, but the shapes are the same. Add the two most useful verbs — ik ben (I am) and het is (it is) — and you can already say that the water is cold: Het water is koud.",
  "trap": "Do not read Dutch with English vowel values. Dutch spelling is far more regular than English; learn the sound once and the same letters keep that sound.",
  "linguist": "English is Anglo-Frisian and Dutch is Low Franconian; both are West Germanic and neither underwent the High German consonant shift. That shared ancestry is why the basic vocabulary lines up so closely.",
  "footnote": {
    "marker": "1",
    "title": "Water stayed water",
    "content": "German shifted the old t to ss (water → Wasser). Dutch, like English, kept the t — so the Dutch word needs no conversion at all."
  },
  "sentences": [
    {
      "nl": "Het water is koud.",
      "en": "The water is cold.",
      "literal": "The water is cold.",
      "wrong": [
        "De water is koud.",
        "Het water koud is."
      ],
      "note": "Water is a het-word, so the article is het, not de. Word order stays subject–verb–predicate."
    },
    {
      "nl": "Het huis is groot.",
      "en": "The house is big.",
      "literal": "The house is big."
    },
    {
      "nl": "Ik ben hier.",
      "en": "I am here.",
      "literal": "I am here."
    },
    {
      "nl": "Het boek is goed.",
      "en": "The book is good."
    }
  ],
  "twist": {
    "nl": "Het brood is warm.",
    "en": "The bread is warm.",
    "explanation": "Brood is a het-word and a direct twin of bread; the sentence needs no new structure."
  },
  "outcome": "Recognise direct English↔Dutch twins, use het and de, and build your first subject–verb–predicate sentences.",
  "takeaway": "Dutch is not a code to crack from scratch: the core vocabulary is a West Germanic warehouse, and the articles are the first key.",
  "foreshadow": {
    "line": "One spelling keeps hiding in plain sight: English sh becomes Dutch sch. Its three letters are the next lesson.",
    "resolvedIn": 2
  }
};

export default lesson;
