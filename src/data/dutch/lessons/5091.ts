import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5091,
  "slug": "connectors",
  "title": "Omdat, Maar & Hoewel",
  "subtitle": "cause, contrast and condition — the connectors that change verb order",
  "phase": 4,
  "categories": [
    "subordination"
  ],
  "words": [
    "omdat",
    "maar",
    "hoewel",
    "als",
    "wanneer",
    "dat"
  ],
  "hookTitle": "Two Kinds of Join",
  "hook": "Some connectors keep the main-clause order (maar), some send the verb to the end (omdat, hoewel, als). The connector is the instruction for where the verb goes.",
  "patternTitle": "Subordinator or coordinator",
  "pattern": "Omdat/hoewel/als/wanneer/dat → verb final. Maar/en/of → main-clause order. Ik werk, maar ik ben moe; ik werk omdat ik geld nodig heb.",
  "trap": "Want behaves like maar, not like omdat: it keeps main-clause order. This is a common trap for learners who know German.",
  "sentences": [
    {
      "nl": "Ik kom omdat ik tijd heb.",
      "en": "I come because I have time.",
      "literal": "I come because I time have."
    },
    {
      "nl": "Ik werk, maar ik ben moe.",
      "en": "I work, but I am tired.",
      "literal": "I work, but I am tired."
    },
    {
      "nl": "Hoewel het regent, ga ik.",
      "en": "Although it rains, I go.",
      "literal": "Although it rains, go I."
    },
    {
      "nl": "Als je komt, eten wij.",
      "en": "If you come, we eat."
    }
  ],
  "twist": {
    "nl": "Ik denk dat het goed is.",
    "en": "I think that it is good.",
    "explanation": "Dat is a subordinator: the finite verb is goes to the end of its clause."
  },
  "outcome": "Join clauses with the right connector and the right verb position.",
  "takeaway": "A connector is a word plus an order rule; learn them together."
};

export default lesson;
