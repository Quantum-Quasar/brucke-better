import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 201,
  "slug": "sch-spelling-gym",
  "title": "SCH Spelling Gym",
  "subtitle": "shoe, sheep, shoulder, shadow — the sch block in the wild",
  "phase": 1,
  "categories": [
    "sch_sh"
  ],
  "words": [
    "schoen",
    "schaap",
    "schouder",
    "scherp",
    "schaduw",
    "school"
  ],
  "hookTitle": "The Block That Keeps Appearing",
  "hook": "The more sch words you meet, the less the three letters look strange. Schoen, schaap, schouder, schaduw: English shoe, sheep, shoulder, shadow are waiting underneath.",
  "patternTitle": "Same block, different vowel",
  "pattern": "The sch block stays constant; the vowel after it decides the word. Sch-oen, sch-aap, sch-ouder, sch-aduw. Read the block first, then the vowel, and the English twin usually surfaces.",
  "trap": "English 'sharp' has no sch, but Dutch scherp does. Not every member of the family keeps the same spelling on both sides.",
  "sentences": [
    {
      "nl": "De schoen is zwart.",
      "en": "The shoe is black.",
      "literal": "The shoe is black."
    },
    {
      "nl": "Het schaap is wit.",
      "en": "The sheep is white.",
      "literal": "The sheep is white."
    },
    {
      "nl": "De school is groot.",
      "en": "The school is big.",
      "literal": "The school is big."
    },
    {
      "nl": "De schaduw is lang.",
      "en": "The shadow is long."
    }
  ],
  "twist": {
    "nl": "De schouder is warm.",
    "en": "The shoulder is warm.",
    "explanation": "The same sch block now sits in a body word; the frame is unchanged."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "derive", "english": "shoe", "target": "schoen", "meaning": "de schoen — the shoe", "english_hint": "shoe → sch-oen", "rule": "sh → sch", "explanation": "shoe and schoen are one word in different clothes: sh becomes sch and the vowel decides the rest. schaap (sheep) wears the same block." },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Recognise six sch words through their English twins and use them with the right article.",
  "takeaway": "Repetition is hidden by changing the word, not the pattern."
};

export default lesson;
