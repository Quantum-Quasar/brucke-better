import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 14,
  "slug": "separable-verbs",
  "title": "Separable Verbs",
  "subtitle": "opbellen, meebrengen, aankomen — the prefix walks to the end",
  "phase": 2,
  "categories": [
    "v2_order"
  ],
  "words": [
    "opbellen",
    "meebrengen",
    "aankomen",
    "bellen",
    "brengen",
    "komen"
  ],
  "hookTitle": "The Prefix Walks to the End",
  "hook": "Dutch separable verbs are two halves of one idea. Opbellen becomes ik bel je op; meebrengen becomes ik breng het mee; aankomen becomes hij komt aan. The prefix is not a preposition — it is the verb's other half.",
  "patternTitle": "Split the verb, park the prefix",
  "pattern": "In a main clause the finite part takes second place and the prefix goes to the end. Ik bel je op, ik breng het mee, hij komt morgen aan. The two halves frame the sentence like a bracket.",
  "trap": "Do not leave the prefix attached in a main clause: ik opbel je is wrong. The prefix belongs at the end.",
  "linguist": "Separable prefixes are stressed particles that behave like the second half of a compound verb; Dutch main-clause order separates them.",
  "sentences": [
    {
      "nl": "Ik bel je op.",
      "en": "I call you.",
      "literal": "I call you up.",
      "wrong": [
        "Ik opbel je.",
        "Ik bel op je."
      ]
    },
    {
      "nl": "Ik breng het mee.",
      "en": "I bring it along.",
      "literal": "I bring it with."
    },
    {
      "nl": "Hij komt morgen aan.",
      "en": "He arrives tomorrow.",
      "literal": "He comes tomorrow at."
    },
    {
      "nl": "Wij bellen haar op.",
      "en": "We call her."
    }
  ],
  "twist": {
    "nl": "Ik breng het boek mee.",
    "en": "I bring the book along.",
    "explanation": "The finite breng is second; mee closes the sentence."
  },
  "outcome": "Split separable verbs in main clauses and park the prefix at the end.",
  "takeaway": "A separable verb is a bracket: one meaning, two halves, the rest of the sentence inside."
};

export default lesson;
