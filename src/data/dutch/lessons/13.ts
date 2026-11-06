import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 13,
  "slug": "modals-final-infinitive",
  "title": "Modals & the Final Infinitive",
  "subtitle": "kan, moet, mag, wil, zal — the second verb waits at the end",
  "phase": 2,
  "categories": [
    "v2_order"
  ],
  "words": [
    "kunnen",
    "moeten",
    "mogen",
    "willen",
    "komen",
    "blijven"
  ],
  "hookTitle": "One Modal, One Infinitive",
  "hook": "A modal carries the person and the tense; the other verb stays an infinitive at the end. Ik kan komen, jij moet werken, wij mogen gaan. The modal is second; the infinitive is last.",
  "patternTitle": "Two verbs, two positions",
  "pattern": "The finite modal takes second place and the infinitive closes the sentence. This is the Dutch version of the English 'I can ... come' bracket, but the second verb does not change.",
  "trap": "Do not conjugate the second verb. Ik kan komt is wrong; the infinitive komen stays whole at the end.",
  "linguist": "Dutch modals are preterite-present verbs; they behave as finite verbs in second position while the lexical verb remains an infinitive.",
  "sentences": [
    {
      "nl": "Ik kan komen.",
      "en": "I can come.",
      "literal": "I can come.",
      "wrong": [
        "Ik kan komt.",
        "Ik komen kan."
      ]
    },
    {
      "nl": "Jij moet werken.",
      "en": "You must work.",
      "literal": "You must work."
    },
    {
      "nl": "Wij mogen gaan.",
      "en": "We may go.",
      "literal": "We may go."
    },
    {
      "nl": "Hij wil blijven.",
      "en": "He wants to stay."
    }
  ],
  "twist": {
    "nl": "Ik kan niet komen.",
    "en": "I cannot come.",
    "explanation": "Niet sits before the final infinitive; the modal keeps second place."
  },
  "outcome": "Use a modal in second position and leave the infinitive at the end.",
  "takeaway": "The modal bracket is the same two-position idea as V2, stretched across two verbs."
};

export default lesson;
