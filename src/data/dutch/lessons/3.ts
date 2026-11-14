import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 3,
  "slug": "th-d-bridge",
  "title": "The TH → D Bridge",
  "subtitle": "brother → broeder, three → drie, think → denken",
  "phase": 1,
  "categories": [
    "th_d"
  ],
  "words": [
    "broer",
    "drie",
    "denken",
    "dank",
    "ding",
    "ander"
  ],
  "hookTitle": "English TH, Dutch D",
  "hook": "English kept the old th sound; Dutch hardened it to d. Brother is broeder, three is drie, think is denken, thank is danken. German did the same thing, but Dutch often kept a vowel closer to English.",
  "patternTitle": "The tongue stops hissing",
  "pattern": "Say brother and feel the tongue between the teeth. Now say broeder: the tongue has moved back and the sound has become a clean d. The same move turns three into drie and thing into ding.",
  "trap": "This is a recognition rule, not a conversion machine. Many Dutch d words have no English th twin at all; use the rule to spot twins, not to invent words.",
  "linguist": "The Germanic dental fricative /θ/ hardened to /d/ in Dutch and German but survived in English — one of the clearest family fingerprints.",
  "sentences": [
    {
      "nl": "Mijn broer is hier.",
      "en": "My brother is here.",
      "literal": "My brother is here.",
      "wrong": [
        "Mijn broer hier is.",
        "Mijn broer is daar."
      ]
    },
    {
      "nl": "Wij denken aan het huis.",
      "en": "We think of the house.",
      "literal": "We think of the house."
    },
    {
      "nl": "Ik dank je.",
      "en": "I thank you.",
      "literal": "I thank you."
    },
    {
      "nl": "Het ding is groot.",
      "en": "The thing is big."
    }
  ],
  "twist": {
    "nl": "De andere man is hier.",
    "en": "The other man is here.",
    "explanation": "Ander is the th→d twin of other; the adjective takes -e before a de-word."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "derive", "english": "three", "target": "drie", "meaning": "drie — three", "english_hint": "three → d-rie", "rule": "th → d", "explanation": "three and drie are one Germanic word: English kept the th, Dutch hardened it to d. denken (think) and dank (thank) crossed the same bridge." },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Recognise th↔d twins and use broer, denken, dank and ding in simple sentences.",
  "takeaway": "The rule is a hint for recognition, not a licence to predict every d word."
};

export default lesson;
