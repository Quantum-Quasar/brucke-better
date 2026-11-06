import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2601,
  "slug": "relative-clause-gym",
  "title": "Relative Clause Gym",
  "subtitle": "de man die komt, het boek dat ik lees — choose die or dat",
  "phase": 4,
  "categories": [
    "subordination"
  ],
  "words": [
    "die",
    "dat",
    "wie",
    "wat",
    "waar",
    "wanneer"
  ],
  "hookTitle": "Point Back, Then Close",
  "hook": "A relative clause points back to a noun and then closes with its verb. De man die komt, het boek dat ik lees. The relative pronoun is the hinge.",
  "patternTitle": "Die/dat by article, verb final",
  "pattern": "De-words → die; het-words → dat. Wie for people, wat for an unnamed thing. The relative clause is subordinate, so the finite verb goes last.",
  "trap": "Wat is not a universal relative pronoun. Use dat for a het-word and wat only for an unnamed or sentential antecedent.",
  "sentences": [
    {
      "nl": "De man die komt, is hier.",
      "en": "The man who comes is here.",
      "literal": "The man who comes, is here."
    },
    {
      "nl": "Het boek dat ik lees, is goed.",
      "en": "The book that I read is good.",
      "literal": "The book that I read, is good."
    },
    {
      "nl": "Wie is dat?",
      "en": "Who is that?",
      "literal": "Who is that?"
    },
    {
      "nl": "Waar is het boek?",
      "en": "Where is the book?"
    }
  ],
  "twist": {
    "nl": "Wanneer kom je?",
    "en": "When do you come?",
    "explanation": "Question-word order: wanneer first, finite verb second, subject after it."
  },
  "outcome": "Use die/dat/wie/wat in relative clauses and question-word order in questions.",
  "takeaway": "Relative pronouns point back; question words point forward. Both keep the verb in its clause's slot."
};

export default lesson;
