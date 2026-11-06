import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5141,
  "slug": "familie-beroepen",
  "title": "Moeder, Vader & Leraar",
  "subtitle": "family words and what people do",
  "phase": 4,
  "categories": [
    "family",
    "work"
  ],
  "words": [
    "moeder",
    "vader",
    "broer",
    "zus",
    "leraar",
    "arts"
  ],
  "hookTitle": "Family and Work",
  "hook": "Moeder, vader, broer, zus: the family is a set of old twins. Leraar and arts show a Dutch quirk: professions after zijn drop the article. Mijn moeder is leraar, not een leraar.",
  "patternTitle": "Profession without an article",
  "pattern": "Mijn moeder is leraar, mijn vader is arts, mijn broer is bakker. After zijn, an unmodified profession takes no een. The family words keep their articles.",
  "trap": "Do not say mijn moeder is een leraar in this frame. Dutch drops the indefinite article before an unmodified profession.",
  "sentences": [
    {
      "nl": "Mijn moeder is leraar.",
      "en": "My mother is a teacher.",
      "literal": "My mother is teacher."
    },
    {
      "nl": "Mijn vader is arts.",
      "en": "My father is a doctor.",
      "literal": "My father is doctor."
    },
    {
      "nl": "Mijn broer is bakker.",
      "en": "My brother is a baker.",
      "literal": "My brother is baker."
    },
    {
      "nl": "Mijn zus is hier.",
      "en": "My sister is here."
    }
  ],
  "twist": {
    "nl": "Wij zijn familie.",
    "en": "We are family.",
    "explanation": "Familie is a de-word; the predicate noun takes no article here."
  },
  "outcome": "Name family members and professions, dropping the article after zijn.",
  "takeaway": "Dutch profession phrases are a small article rule, not a vocabulary list."
};

export default lesson;
