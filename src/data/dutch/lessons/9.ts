import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 9,
  "slug": "de-het-gender",
  "title": "De & Het: Gender Without Case",
  "subtitle": "two articles, no noun case, and the compounds that decode them",
  "phase": 2,
  "categories": [
    "gender"
  ],
  "words": [
    "de",
    "het",
    "tafel",
    "stoel",
    "bed",
    "huis"
  ],
  "hookTitle": "Two Articles, Not Three",
  "hook": "Dutch nouns are de (common) or het (neuter). There is no noun case system to learn: the article does not change when the noun is a subject or object. That already makes Dutch easier than German.",
  "patternTitle": "Read the word, not the meaning",
  "pattern": "De and het are lexical: tafel, stoel and bed take de; huis takes het. Roughly three quarters of nouns are de-words, but frequency is not a rule. Compounds follow their last element, and every diminutive is het. Adjectives add -e after de/het or a possessive: het grote huis, mijn grote huis — but een groot huis has no -e.",
  "trap": "Do not choose de or het from the object's meaning or sex. A table is not feminine and a house is not neuter because of what they are; the word carries the article.",
  "linguist": "Dutch merged the old masculine and feminine genders into a common gender (de) while keeping the neuter (het). The resulting system has two articles but no noun case.",
  "sentences": [
    {
      "nl": "De tafel is groot.",
      "en": "The table is big.",
      "literal": "The table is big.",
      "wrong": [
        "Het tafel is groot.",
        "De tafel groot is."
      ]
    },
    {
      "nl": "Het huis is klein.",
      "en": "The house is small.",
      "literal": "The house is small."
    },
    {
      "nl": "De stoel is oud.",
      "en": "The chair is old.",
      "literal": "The chair is old."
    },
    {
      "nl": "Het grote huis is oud.",
      "en": "The big house is old."
    }
  ],
  "twist": {
    "nl": "Het boek is op de tafel.",
    "en": "The book is on the table.",
    "explanation": "The prepositional phrase keeps de before tafel; het belongs to boek."
  },
  "outcome": "Use de and het as lexical articles, add adjective -e after a definite phrase, and stop looking for case endings.",
  "takeaway": "Dutch gender is a two-way article system with no noun case — smaller than German, not random."
};

export default lesson;
