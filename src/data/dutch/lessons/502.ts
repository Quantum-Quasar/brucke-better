import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 502,
  "slug": "nacht-licht-sentences",
  "title": "Nacht & Licht Sentences",
  "subtitle": "the two throat sounds now run through whole sentences",
  "phase": 1,
  "categories": [
    "gh_ch"
  ],
  "words": [
    "nacht",
    "licht",
    "koud",
    "zwart",
    "geven",
    "oog"
  ],
  "hookTitle": "The Clinic Moves into Sentences",
  "hook": "Lesson 501 trained the two throat sounds on single words: nacht, licht, recht. Now they share sentences with ordinary Dutch: De nacht is koud. Het licht is aan. The sounds stay where English gh put them — and the sentence carries them along.",
  "patternTitle": "Same throat, longer sentence",
  "pattern": "ch and g both live in the throat: ch after a vowel (nacht, licht, recht), g at the front (geven, goed, groen). Nothing changes inside a sentence — the sounds just arrive in order.",
  "trap": "Do not soften the g at the front of geven into an English g — the throat sound stays, even between friendly vowels.",
  "sentences": [
    {
      "nl": "De nacht is koud.",
      "en": "The night is cold.",
      "literal": "The night is cold.",
      "wrong": [
        "Het nacht is koud.",
        "De nacht is warm."
      ],
      "note": "De nacht is koud — the ch lives in the throat, the de stays with nacht."
    },
    {
      "nl": "Het licht is aan.",
      "en": "The light is on.",
      "literal": "The light is on.",
      "note": "aan = on; het licht is aan — the ch survives the whole sentence."
    },
    {
      "nl": "Ik sta in het licht van de maan.",
      "en": "I stand in the moonlight.",
      "literal": "I stand in the light of the moon.",
      "note": "Word for word: the light of the moon — Dutch spreads the compound back out."
    },
    {
      "nl": "De nacht is lang en koud.",
      "en": "The night is long and cold.",
      "literal": "The night is long and cold."
    }
  ],
  "twist": {
    "nl": "Geef me het licht.",
    "en": "Give me the light.",
    "explanation": "The g at the front of geven stays in the throat — even in a two-word favour."
  },
  "outcome": "Say ch and g inside whole sentences — nacht, licht, geven — without softening either throat sound.",
  "takeaway": "Same throat, longer sentence: the sounds arrive in order and stay put."
};

export default lesson;
