import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1502,
  "slug": "clock-conversation",
  "title": "The Clock in Conversation",
  "subtitle": "half vier is half past three — ask the time and tell it back",
  "phase": 3,
  "categories": [
    "time"
  ],
  "words": [
    "half",
    "uur",
    "tijd",
    "nu",
    "straks",
    "vier"
  ],
  "hookTitle": "Dutch Counts Toward the Next Hour",
  "hook": "Lesson 1501 counted the numbers. Now put them on the clock: half vier is NOT half past four — it is half PAST THREE, halfway toward four. Dutch looks ahead to the hour that is coming.",
  "patternTitle": "Half points forward",
  "pattern": "half + next hour: half vier = 3:30, half vijf = 4:30. Ask with hoe laat is het? and answer with het is… — then straks puts it in the near future.",
  "trap": "half vier means 3:30, never 4:30. The Dutch clock counts toward the next hour — the opposite of English's 'half past four'.",
  "sentences": [
    {
      "nl": "Het is half vier.",
      "en": "It is half past three.",
      "literal": "It is half four.",
      "wrong": [
        "Het is vier half.",
        "Het is half vijf."
      ],
      "note": "half vier = halfway TO four. The literal reading 'half four' is the warning sign."
    },
    {
      "nl": "Hoe laat is het?",
      "en": "What time is it?",
      "literal": "How late is it?"
    },
    {
      "nl": "Ik ga om half vier naar huis.",
      "en": "I am going home at half past three.",
      "literal": "I go at half four to house.",
      "note": "Word for word: I go at half four to house — om marks the clock, naar huis walks home."
    },
    {
      "nl": "Ik heb geen tijd.",
      "en": "I have no time.",
      "literal": "I have no time."
    }
  ],
  "twist": {
    "nl": "Het is nu half vijf.",
    "en": "It is now half past four.",
    "explanation": "half vijf looks ahead to five — the Dutch clock never looks back."
  },
  "outcome": "Ask hoe laat is het?, answer with het is half + hour, and keep the forward-looking clock straight.",
  "takeaway": "Half points forward: half vier is on the way to four, not back to three."
};

export default lesson;
