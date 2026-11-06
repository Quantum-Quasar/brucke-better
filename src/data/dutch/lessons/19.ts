import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 19,
  "slug": "perfect-tense",
  "title": "The Perfect Tense",
  "subtitle": "ik heb gewerkt, ik ben gekomen — hebben or zijn plus the ge- participle",
  "phase": 3,
  "categories": [
    "past_tense"
  ],
  "words": [
    "hebben",
    "zijn",
    "werken",
    "komen",
    "gaan",
    "maken"
  ],
  "hookTitle": "Have or Be, Plus Ge-",
  "hook": "The Dutch perfect is two pieces: a helper (hebben or zijn) and a participle. Ik heb gewerkt, ik ben gekomen, zij is gegaan. English has the same have/be split in 'I have worked' and 'I have come'.",
  "patternTitle": "Choose the helper, build the participle",
  "pattern": "Most verbs take hebben: ik heb gewerkt, hij heeft koffie gemaakt. Verbs of motion or change take zijn: ik ben gekomen, zij is gegaan. The participle usually begins with ge- and ends in -t or -en.",
  "trap": "Do not use hebben with gaan or komen: it is ik ben gegaan, ik ben gekomen. The helper follows the verb's meaning, not the speaker's choice.",
  "linguist": "The perfect is a Germanic construction: a have/be auxiliary plus a past participle. English and Dutch divide the helpers along similar lines.",
  "sentences": [
    {
      "nl": "Ik heb gewerkt.",
      "en": "I have worked.",
      "literal": "I have worked.",
      "wrong": [
        "Ik ben gewerkt.",
        "Ik heb werkt."
      ]
    },
    {
      "nl": "Wij zijn gekomen.",
      "en": "We have come.",
      "literal": "We are come."
    },
    {
      "nl": "Zij is gegaan.",
      "en": "She has gone.",
      "literal": "She is gone."
    },
    {
      "nl": "Hij heeft koffie gemaakt.",
      "en": "He has made coffee."
    }
  ],
  "twist": {
    "nl": "Ik ben thuis gebleven.",
    "en": "I have stayed home.",
    "explanation": "Blijven takes zijn, and the participle is gebleven."
  },
  "outcome": "Form the perfect with hebben or zijn and the ge- participle.",
  "takeaway": "The perfect is a helper plus a participle; the helper is chosen by the verb's meaning.",
  "foreshadow": {
    "line": "The perfect will return when the modal perfect needs two infinitives. For now, the helper and participle are enough.",
    "resolvedIn": 20
  }
};

export default lesson;
