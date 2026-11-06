import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 701,
  "slug": "final-devoicing-gym",
  "title": "Final Devoicing Gym",
  "subtitle": "hond/honden, huis/huizen, stad/steden — hear the change, keep the letter",
  "phase": 1,
  "categories": [
    "final_devoicing"
  ],
  "words": [
    "geel",
    "jaar",
    "goed",
    "hond",
    "stad",
    "huis"
  ],
  "hookTitle": "The Letter That Comes Back",
  "hook": "Dutch final devoicing is not a spelling mistake; it is a sound rule with a spelling repair. The singular may sound voiceless, but the plural tells you which letter belongs there.",
  "patternTitle": "Singular sound, plural spelling",
  "pattern": "Compare hond and honden, huis and huizen, stad and steden. The plural restores the voiced consonant, so the singular spelling keeps it too.",
  "trap": "The rule applies to the sound, not the letter: final d and b devoice, but Dutch still writes d and b.",
  "sentences": [
    {
      "nl": "De hond is klein.",
      "en": "The dog is small.",
      "literal": "The dog is small."
    },
    {
      "nl": "De honden zijn groot.",
      "en": "The dogs are big.",
      "literal": "The dogs are big."
    },
    {
      "nl": "Het huis is geel.",
      "en": "The house is yellow.",
      "literal": "The house is yellow."
    },
    {
      "nl": "Het jaar is lang.",
      "en": "The year is long."
    }
  ],
  "twist": {
    "nl": "De stad is oud.",
    "en": "The city is old.",
    "explanation": "The singular sounds like 'stat', but the plural steden proves the d."
  },
  "outcome": "Apply final devoicing without corrupting the spelling of Dutch nouns.",
  "takeaway": "Dutch spelling is a record of the word's family, not a phonetic transcript."
};

export default lesson;
