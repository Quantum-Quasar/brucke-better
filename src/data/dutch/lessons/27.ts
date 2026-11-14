import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 27,
  "slug": "continuous-position-verbs",
  "title": "The Continuous & Position Verbs",
  "subtitle": "aan het werken, zitten te lezen — Dutch builds 'is doing' with a posture verb",
  "phase": 5,
  "categories": [
    "continuous"
  ],
  "words": [
    "aan",
    "het",
    "werken",
    "zitten",
    "lezen",
    "staan"
  ],
  "hookTitle": "Dutch Has No -ing",
  "hook": "Dutch does not add -ing to a verb. It says aan het werken ('on the working') or uses a posture verb: zij zit te lezen, hij staat te wachten. The continuous is a small construction, not a tense.",
  "patternTitle": "Aan het + infinitive; posture + te + infinitive",
  "pattern": "Ik ben aan het werken, wij zijn aan het eten. With zitten/staan/liggen/lopen, Dutch adds te + infinitive: zij zit te lezen, hij staat te wachten. The posture verb adds a physical image.",
  "trap": "Do not say ik ben werkend for 'I am working'. The everyday continuous is aan het + infinitive or a posture verb.",
  "linguist": "The aan het construction is literally 'on the + infinitive'; the posture-verb construction is a Dutch speciality with no exact English equivalent.",
  "sentences": [
    {
      "nl": "Ik ben aan het werken.",
      "en": "I am working.",
      "literal": "I am on the working.",
      "wrong": [
        "Ik ben werkend.",
        "Ik ben aan werken."
      ]
    },
    {
      "nl": "Zij zit te lezen.",
      "en": "She is reading.",
      "literal": "She sits to read."
    },
    {
      "nl": "Hij staat te wachten.",
      "en": "He is waiting.",
      "literal": "He stands to wait."
    },
    {
      "nl": "Wij zijn aan het eten.",
      "en": "We are eating."
    }
  ],
  "twist": {
    "nl": "Zij ligt te slapen.",
    "en": "She is sleeping.",
    "explanation": "Liggen ('lie') plus te + slapen pictures someone asleep; the continuous is built from the posture."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "select", "at": 0 },
    { "kind": "build", "at": 1 },
    { "kind": "transcribe", "at": 2 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Build the Dutch continuous with aan het or a posture verb + te.",
  "takeaway": "Dutch 'is doing' is a picture: on the doing, or sitting/standing/lying to do."
};

export default lesson;
