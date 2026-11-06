import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 26,
  "slug": "relative-clauses",
  "title": "Relative Clauses & Connectors",
  "subtitle": "die, dat, wie, wat — choosing the relative pronoun by the noun",
  "phase": 4,
  "categories": [
    "subordination"
  ],
  "words": [
    "die",
    "dat",
    "wie",
    "wat",
    "boek",
    "man"
  ],
  "hookTitle": "Die for De, Dat for Het",
  "hook": "Dutch relative pronouns follow the noun: de man die komt, het boek dat ik lees. For people you can also use wie; for an unnamed thing, wat. The relative clause is subordinate, so the verb goes last.",
  "patternTitle": "Noun class chooses die or dat",
  "pattern": "De-words and plurals take die; het-words take dat. De man die hier woont, het boek dat ik lees. The relative clause keeps verb-final order.",
  "trap": "Do not use dat for a de-word: de man dat is wrong. Check the noun's article first.",
  "linguist": "Die and dat are demonstrative forms reused as relatives; English that/which/who divides the work differently.",
  "sentences": [
    {
      "nl": "De man die hier woont, is mijn broer.",
      "en": "The man who lives here is my brother.",
      "literal": "The man who here lives, is my brother.",
      "wrong": [
        "De man dat hier woont, is mijn broer.",
        "De man die hier woont is mijn broer die."
      ]
    },
    {
      "nl": "Het boek dat ik lees, is goed.",
      "en": "The book that I read is good.",
      "literal": "The book that I read, is good."
    },
    {
      "nl": "Wie dat zegt, heeft recht.",
      "en": "Whoever says that is right.",
      "literal": "Who that says, has right."
    },
    {
      "nl": "Wat je zegt, is goed.",
      "en": "What you say is good."
    }
  ],
  "twist": {
    "nl": "De vrouw die daar werkt, is mijn zus.",
    "en": "The woman who works there is my sister.",
    "explanation": "Vrouw is a de-word, so the relative pronoun is die; werkt closes the relative clause."
  },
  "outcome": "Choose die or dat by the noun and keep the relative clause verb-final.",
  "takeaway": "The noun's article decides the relative pronoun; the clause keeps subordinate order."
};

export default lesson;
