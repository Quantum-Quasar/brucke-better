import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5,
  "slug": "gh-ch-bridge",
  "title": "The GH → CH Bridge",
  "subtitle": "night → nacht, light → licht, right → recht, eight → acht",
  "phase": 1,
  "categories": [
    "gh_ch"
  ],
  "words": [
    "nacht",
    "licht",
    "recht",
    "acht",
    "dochter",
    "gedachte"
  ],
  "hookTitle": "English GH, Dutch CH",
  "hook": "English used to pronounce gh as a throat sound; Dutch still does. Night is nacht, light is licht, right is recht, eight is acht. The ghost letters in English are alive in Dutch.",
  "patternTitle": "The same throat, a cleaner spelling",
  "pattern": "Nacht, licht, recht, acht: the ch is a breathy sound from the back of the mouth. English night, light, right, eight no longer say it, but the spelling remembers it.",
  "trap": "Dutch g and ch are neighbours, not twins. Ch is voiceless; g is voiced. The course will treat them together only when the contrast matters.",
  "linguist": "English gh and Dutch ch descend from a shared velar fricative; English vocalised or lost it, Dutch kept it.",
  "sentences": [
    {
      "nl": "De nacht is koud.",
      "en": "The night is cold.",
      "literal": "The night is cold.",
      "wrong": [
        "De nacht koud is.",
        "De nacht is warm."
      ]
    },
    {
      "nl": "Het licht is aan.",
      "en": "The light is on.",
      "literal": "The light is on."
    },
    {
      "nl": "Je hebt recht.",
      "en": "You are right.",
      "literal": "You have right."
    },
    {
      "nl": "Ik heb acht boeken.",
      "en": "I have eight books."
    }
  ],
  "twist": {
    "nl": "De dochter is hier.",
    "en": "The daughter is here.",
    "explanation": "Dochter and daughter are the same word; the ch is the old gh."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "derive", "english": "night", "target": "nacht", "meaning": "de nacht — the night", "english_hint": "night → n-acht", "rule": "gh → ch", "explanation": "The gh English stopped pronouncing still breathes in Dutch: night → nacht, light → licht, eight → acht. The ch is the sound English let go." },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Recognise gh↔ch twins and produce the Dutch throat sound in nacht, licht and recht.",
  "takeaway": "English spelling often preserves a sound English forgot; Dutch still says it."
};

export default lesson;
