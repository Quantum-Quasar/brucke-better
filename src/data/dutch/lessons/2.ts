import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2,
  "slug": "sch-bridge",
  "title": "The SCH Bridge",
  "subtitle": "English sh is Dutch sch — one sound, three letters",
  "phase": 1,
  "categories": [
    "sch_sh"
  ],
  "words": [
    "schip",
    "schoen",
    "schaap",
    "schouder",
    "scherp",
    "school"
  ],
  "hookTitle": "One Sound, Three Letters",
  "hook": "English writes the sound /ʃ/ with two letters, sh. Dutch writes it with three, sch. Ship becomes schip, shoe becomes schoen, and sheep becomes schaap. The extra letter is spelling, not a new sound.",
  "patternTitle": "Read sch as one block",
  "pattern": "When you see sch at the start of a Dutch word, hear a single breathy block: sch-ip, sch-oen, sch-aap. Do not split it into s + ch. The same block appears in school, which English borrowed with a sk spelling.",
  "trap": "Sch is not 'sk'. Dutch school starts with the same /sx/ sound as schip; English school kept an older sk pronunciation.",
  "linguist": "West Germanic *sk developed differently in the daughter languages: English often turned it into sh, Dutch kept the sk-like cluster but spells it sch.",
  "sentences": [
    {
      "nl": "Het schip is groot.",
      "en": "The ship is big.",
      "literal": "The ship is big.",
      "wrong": [
        "Het ship is groot.",
        "Het schip groot is."
      ]
    },
    {
      "nl": "De schoen is nieuw.",
      "en": "The shoe is new.",
      "literal": "The shoe is new."
    },
    {
      "nl": "Het schaap is wit.",
      "en": "The sheep is white.",
      "literal": "The sheep is white."
    },
    {
      "nl": "De school is dicht.",
      "en": "The school is closed."
    }
  ],
  "twist": {
    "nl": "De schouder is warm.",
    "en": "The shoulder is warm.",
    "explanation": "Schouder and shoulder are the same word; the sch block carries the sh sound."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "derive", "english": "ship", "target": "schip", "meaning": "het schip — the ship", "english_hint": "ship → sch-ip", "rule": "sh → sch", "explanation": "English sh answers to Dutch sch — one extra letter, same family. schoen (shoe) and schaap (sheep) read the same way." },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Read Dutch sch as one sound and recognise its English sh twins.",
  "takeaway": "A spelling bridge is a free word: once you see sch, you can hear the English twin underneath."
};

export default lesson;
