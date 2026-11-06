import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 30,
  "slug": "capstone-reading",
  "title": "Capstone: De Brug Reading",
  "subtitle": "one connected Dutch story with every bridge, tense and connector in plain sight",
  "phase": 5,
  "categories": [
    "direct_twin",
    "v2_order",
    "past_tense"
  ],
  "words": [
    "water",
    "huis",
    "brood",
    "koffie",
    "werken",
    "gezellig"
  ],
  "hookTitle": "The Whole Trail in One Page",
  "hook": "This is the reading capstone. Every sentence uses material you have already built: the twins, the articles, the V2 order, the past, the perfect, the connectors. Read it slowly and let the pieces line up.",
  "patternTitle": "Read for structure, not for vocabulary",
  "pattern": "Ik woon in een klein huis bij het water. Elke ochtend maak ik koffie en eet ik brood. Ik werk in de stad en kom 's avonds thuis. Het leven is gezellig. The words are simple; the structure is the whole course.",
  "trap": "Do not stop at every unknown word. The sentence frame tells you what the word must be doing; that is the reading skill the trail has built.",
  "linguist": "This passage deliberately combines direct twins, de/het, V2, present tense, a time phrase and a compound; it is a diagnostic of the whole course.",
  "sentences": [
    {
      "nl": "Ik woon in een klein huis bij het water.",
      "en": "I live in a small house by the water.",
      "literal": "I live in a small house by the water.",
      "wrong": [
        "Ik woon in een kleine huis bij het water.",
        "Ik woon bij het water in een klein huis."
      ]
    },
    {
      "nl": "Elke ochtend maak ik koffie en eet ik brood.",
      "en": "Every morning I make coffee and eat bread.",
      "literal": "Every morning make I coffee and eat I bread."
    },
    {
      "nl": "Ik werk in de stad en kom 's avonds thuis.",
      "en": "I work in the city and come home in the evening.",
      "literal": "I work in the city and come in the evening home."
    },
    {
      "nl": "Het leven is gezellig.",
      "en": "Life is cosy.",
      "literal": "The life is cosy."
    }
  ],
  "twist": {
    "nl": "Morgen ga ik weer werken.",
    "en": "Tomorrow I will work again.",
    "explanation": "Morgen is fronted, so the verb comes second: ga ik. Weer ('again') sits before the infinitive."
  },
  "outcome": "Read a connected Dutch passage and recognise every structure from the trail.",
  "takeaway": "The course ends where it began: ordinary Dutch sentences, read through patterns you already own."
};

export default lesson;
