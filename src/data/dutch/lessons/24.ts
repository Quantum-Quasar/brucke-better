import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 24,
  "slug": "er",
  "title": "Er: The Little Word That Does Everything",
  "subtitle": "er is, er zijn, ik heb er twee — existence, place and 'of it'",
  "phase": 4,
  "categories": [
    "er"
  ],
  "words": [
    "er",
    "zijn",
    "hebben",
    "hier",
    "daar",
    "twee"
  ],
  "hookTitle": "One Word, Four Jobs",
  "hook": "Er is the unstressed 'there'. It introduces existence (er is een boek), location (ik ben er), and quantity (ik heb er twee). It can also fuse with a preposition: erop, ermee, ervan.",
  "patternTitle": "Existential, locative, partitive",
  "pattern": "Er is/er zijn introduces something: er is een boek, er zijn twee boeken. Ik ben er means 'I am there'. Ik heb er twee means 'I have two of them'. The same little word covers all three.",
  "trap": "Use er zijn with a plural: er zijn twee boeken, not er is twee boeken.",
  "linguist": "Er descends from the same 'there' word as English there, but Dutch keeps an unstressed form for grammar while daar carries the stress.",
  "sentences": [
    {
      "nl": "Er is een boek.",
      "en": "There is a book.",
      "literal": "There is a book.",
      "wrong": [
        "Het is een boek.",
        "Er zijn een boek."
      ]
    },
    {
      "nl": "Er zijn twee boeken.",
      "en": "There are two books.",
      "literal": "There are two books."
    },
    {
      "nl": "Ik heb er twee.",
      "en": "I have two of them.",
      "literal": "I have there two."
    },
    {
      "nl": "Ik ben er.",
      "en": "I am there."
    }
  ],
  "twist": {
    "nl": "Er is hier geen water.",
    "en": "There is no water here.",
    "explanation": "Er introduces existence; geen negates the indefinite noun water."
  },
  "outcome": "Use er for existence, location and 'of them'.",
  "takeaway": "Er is the grammatical 'there' — a small word with several structural jobs."
};

export default lesson;
