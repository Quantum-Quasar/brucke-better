import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5082,
  "slug": "de-hele-dag-door",
  "title": "De Hele Dag Door",
  "subtitle": "opstaan, wassen, lezen — the reflexive day with separable verbs in the wild",
  "phase": 4,
  "categories": [
    "pronouns"
  ],
  "words": [
    "opstaan",
    "wassen",
    "bed",
    "moe",
    "lezen",
    "boek"
  ],
  hookTitle: "The Day, Door to Door",
  hook: "Lesson 5081 walked the reflexive chain. Now add the day's edges: ik sta op om zeven uur (separable opstaan splits), na het werk lees ik een boek (the verb flips to second place), and at night ik ben moe en ik ga slapen. One day, three sentence shapes you already own.",
  "patternTitle": "Split the verb, flip the verb",
  "pattern": "opstaan splits around the sentence: ik sta OP om zeven uur. After a time phrase like na het werk, the verb takes second place: na het werk LEES ik een boek. The reflexive wash keeps its me: ik was me.",
  trap: "Do not park the prefix at the front: ik sta OP, never *ik opsta om zeven uur — the prefix always travels to the end of its clause.",
  sentences: [
    {
      "nl": "Ik sta op om zeven uur.",
      "en": "I get up at seven o'clock.",
      "literal": "I stand on at seven hour.",
      "wrong": [
        "Ik opsta om zeven uur.",
        "Ik sta op bij zeven uur."
      ],
      "note": "opstaan splits: ik sta OP — the prefix rides to the end, om reads the clock."
    },
    {
      "nl": "Ik was me voor het werk.",
      "en": "I wash myself before work.",
      "literal": "I wash me before the work.",
      "note": "ik was me — Dutch keeps the me where English drops it."
    },
    {
      "nl": "Na het werk lees ik een boek.",
      "en": "After work I read a book.",
      "literal": "After the work read I a book.",
      "note": "Word for word: after the work read I a book — front the time phrase and the verb flips forward."
    },
    {
      "nl": "Ik ben moe en ik ga slapen.",
      "en": "I am tired and I am going to sleep.",
      "literal": "I am tired and I go to sleep."
    }
  ],
  twist: {
    "nl": "Na het werk lees ik nog een boek.",
    "en": "After work I read another book.",
    "explanation": "nog een boek — one more book; the flipped verb stays in second place."
  },
  outcome: "Tell the whole day with a split verb (sta op), a flipped verb (lees ik), and the reflexive wash.",
  takeaway: "Split the verb, flip the verb — the day changes shape but the machine never breaks."
};

export default lesson;
