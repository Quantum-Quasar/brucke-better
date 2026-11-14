import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 7,
  "slug": "g-ch-dutch-spelling",
  "title": "G, CH & Dutch Spelling",
  "subtitle": "yellow → geel, year → jaar, and the t that turns back into d",
  "phase": 1,
  "categories": [
    "g_y",
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
  "hookTitle": "Yellow, Good — and the Disappearing D",
  "hook": "English y often answers to Dutch g in words like yellow → geel and yield → gelden, but year → jaar takes Dutch j. The letters are close; the sound is not always the same. And Dutch has a spelling law English lost: a final consonant may sound voiceless while the spelling keeps the voiced letter. Hond sounds like hont, but the plural honden brings the d back.",
  "patternTitle": "Write the underlying consonant",
  "pattern": "Dutch writes the consonant that returns when the word grows: hond → honden, huis → huizen, stad → steden. The final sound may devoice, but the spelling remembers the family. Year/jaar is a y↔j twin, not a y↔g one; keep the two families separate.",
  "trap": "Do not write what you hear at the end of a word. If the plural has d, the singular keeps d even when it sounds like t.",
  "linguist": "Final devoicing is a regular Dutch process; the orthography keeps the voiced consonant so the plural remains transparent.",
  "sentences": [
    {
      "nl": "De hond is klein.",
      "en": "The dog is small.",
      "literal": "The dog is small.",
      "wrong": [
        "De hond klein is.",
        "De hond is groot."
      ]
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
    "explanation": "Stad ends in a d that sounds like t; the plural steden restores it."
  },
  "outcome": "Match y↔g and y↔j twins and spell Dutch final consonants by their plural, not by their sound.",
  "takeaway": "Dutch spelling is morphological: the word's family decides the letter.",
  "exercises": [
    { "kind": "matching" },
    { "kind": "derive", "english": "yellow", "target": "geel", "meaning": "geel — yellow", "english_hint": "yellow → g-eel", "rule": "y → g", "explanation": "yellow and geel share their bones: English kept the y spelling, Dutch the g sound. year → jaar is the other branch — Dutch j, not g — so keep the two families apart." },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "dictation", "at": 3 }
  ],
  "foreshadow": {
    "line": "You now have the decode engine. The next stretch turns it into a sentence machine — starting with the two verbs every Dutch sentence leans on.",
    "resolvedIn": 8
  }
};

export default lesson;
