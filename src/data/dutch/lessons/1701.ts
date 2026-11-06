import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1701,
  "slug": "weak-past-gym",
  "title": "Weak Past Gym",
  "subtitle": "werken, maken, spelen, leren, wonen, betalen — one ending at a time",
  "phase": 3,
  "categories": [
    "past_tense"
  ],
  "words": [
    "werken",
    "maken",
    "spelen",
    "leren",
    "wonen",
    "betalen"
  ],
  "hookTitle": "Listen to the Stem",
  "hook": "The weak past is a listening test: does the stem end voiced or voiceless? Werkte and maakte are voiceless; speelde and woonde are voiced. The ending tells you what your mouth already knows.",
  "patternTitle": "Voiceless -te, voiced -de",
  "pattern": "Werk → werkte, maak → maakte; speel → speelde, woon → woonde, betaal → betaalde. The plural adds -n: werkten, maakten, speelden.",
  "trap": "Do not choose -de just because the spelling looks voiced; the final sound of the stem decides.",
  "sentences": [
    {
      "nl": "Ik werkte.",
      "en": "I worked.",
      "literal": "I worked."
    },
    {
      "nl": "Wij maakten koffie.",
      "en": "We made coffee.",
      "literal": "We made coffee."
    },
    {
      "nl": "Zij speelde buiten.",
      "en": "She played outside.",
      "literal": "She played outside."
    },
    {
      "nl": "Hij woonde hier.",
      "en": "He lived here."
    }
  ],
  "twist": {
    "nl": "Ik betaalde de rekening.",
    "en": "I paid the bill.",
    "explanation": "Betalen has a voiced stem ending, so the past is betaalde."
  },
  "outcome": "Choose -te or -de from the stem's final sound.",
  "takeaway": "Weak pasts are mechanical once you hear the stem."
};

export default lesson;
