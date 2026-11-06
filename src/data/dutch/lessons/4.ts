import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 4,
  "slug": "v-z-voicing",
  "title": "The F → V & S → Z Bridges",
  "subtitle": "father → vader, fish → vis, sun → zon, sea → zee",
  "phase": 1,
  "categories": [
    "f_v",
    "s_z"
  ],
  "words": [
    "vader",
    "voet",
    "vis",
    "zon",
    "zee",
    "zout"
  ],
  "hookTitle": "English F and S Voice Into Dutch",
  "hook": "Where English writes f, Dutch often writes v: father is vader, foot is voet, fish is vis. Where English writes s, Dutch often writes z: sun is zon, sea is zee, salt is zout. The mouth keeps the same shape; the voice turns on.",
  "patternTitle": "The spelling keeps the history",
  "pattern": "Many Dutch speakers in the Netherlands pronounce v and z close to f and s at the start of a word, but the spelling keeps v and z. Read the letter as a family clue: v points to an English f twin, z to an English s twin.",
  "trap": "This is a spelling correspondence, not a promise about every Dutch accent. The letter v may sound like f; the English twin is still hidden in vader.",
  "linguist": "West Germanic f and s voiced to v and z in Dutch and German in many positions; English kept the voiceless consonants in these everyday words.",
  "sentences": [
    {
      "nl": "Mijn vader is hier.",
      "en": "My father is here.",
      "literal": "My father is here.",
      "wrong": [
        "Mijn vader hier is.",
        "Mijn vader is daar."
      ]
    },
    {
      "nl": "Mijn voet is koud.",
      "en": "My foot is cold.",
      "literal": "My foot is cold."
    },
    {
      "nl": "De vis is vers.",
      "en": "The fish is fresh.",
      "literal": "The fish is fresh."
    },
    {
      "nl": "De zon is warm.",
      "en": "The sun is warm."
    }
  ],
  "twist": {
    "nl": "De zee is koud.",
    "en": "The sea is cold.",
    "explanation": "Zee is the s→z twin of sea; the sentence reuses the subject–is–adjective frame."
  },
  "outcome": "Recognise f↔v and s↔z twins and read Dutch v/z as family clues.",
  "takeaway": "Dutch spelling preserves a consonant history that the modern accent may hide."
};

export default lesson;
