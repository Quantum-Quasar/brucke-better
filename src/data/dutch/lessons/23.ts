import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 23,
  "slug": "reflexives-routine",
  "title": "Reflexives & Daily Routine",
  "subtitle": "ik was me, ik voel me — Dutch uses a reflexive where English often uses nothing",
  "phase": 4,
  "categories": [
    "pronouns"
  ],
  "words": [
    "wassen",
    "voelen",
    "vergissen",
    "aankleden",
    "scheren",
    "zich"
  ],
  "hookTitle": "The Verb Comes Back to the Subject",
  "hook": "Dutch often adds a reflexive pronoun where English says nothing: ik was me, ik voel me goed, wij vergissen ons. The pronoun mirrors the subject.",
  "patternTitle": "Me, je, ons, zich",
  "pattern": "First person me, second je, first plural ons, third person zich. Ik was me, jij wast je, wij wassen ons, hij wast zich. The reflexive is part of the verb's meaning.",
  "trap": "Zich is only third person. Do not say ik was zich; first person is ik was me.",
  "linguist": "The reflexive set descends from the same pronouns as English myself/yourself; Dutch uses it more often because many verbs are lexically reflexive.",
  "sentences": [
    {
      "nl": "Ik was me.",
      "en": "I wash myself.",
      "literal": "I wash me.",
      "wrong": [
        "Ik was mij.",
        "Ik was zich."
      ]
    },
    {
      "nl": "Ik voel me goed.",
      "en": "I feel good.",
      "literal": "I feel me good."
    },
    {
      "nl": "Wij vergissen ons.",
      "en": "We are mistaken.",
      "literal": "We mistake us."
    },
    {
      "nl": "Zij kleedt zich aan.",
      "en": "She gets dressed."
    }
  ],
  "twist": {
    "nl": "Hij scheert zich.",
    "en": "He shaves.",
    "explanation": "Scheren takes zich in the third person; the reflexive is part of the action."
  },
  "outcome": "Use the reflexive set with daily verbs and separable aankleden.",
  "takeaway": "A reflexive verb points the action back at its subject."
};

export default lesson;
