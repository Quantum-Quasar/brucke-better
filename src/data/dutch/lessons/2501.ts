import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2501,
  "slug": "subordinate-gym",
  "title": "Verb-Final Gym",
  "subtitle": "omdat, dat, als, wanneer, maar, hoewel",
  "phase": 4,
  "categories": [
    "subordination"
  ],
  "words": [
    "omdat",
    "dat",
    "als",
    "wanneer",
    "maar",
    "hoewel"
  ],
  "hookTitle": "Six Connectors, One Destination",
  "hook": "Omdat, dat, als, wanneer and hoewel all send the verb to the end. Maar is a coordinator and keeps the main-clause order. The connector tells you which machine to use.",
  "patternTitle": "Subordinators vs coordinators",
  "pattern": "Omdat/dat/als/wanneer/hoewel → verb final. Maar/en/of → main-clause order. Ik werk, maar ik ben moe; ik werk omdat ik geld nodig heb.",
  "trap": "Do not treat maar like omdat. Maar joins two main clauses; omdat creates a subordinate clause.",
  "sentences": [
    {
      "nl": "Ik kom omdat jij hier bent.",
      "en": "I come because you are here.",
      "literal": "I come because you here are."
    },
    {
      "nl": "Ik denk dat het goed is.",
      "en": "I think that it is good.",
      "literal": "I think that it good is."
    },
    {
      "nl": "Als het regent, blijf ik thuis.",
      "en": "If it rains, I stay home.",
      "literal": "If it rains, stay I home."
    },
    {
      "nl": "Ik werk, maar ik ben moe.",
      "en": "I work, but I am tired."
    }
  ],
  "twist": {
    "nl": "Hoewel het koud is, ga ik.",
    "en": "Although it is cold, I go.",
    "explanation": "Hoewel is a subordinator: is goes to the end of its clause; ga keeps main-clause order."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "build", "at": 2 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Choose a subordinator or a coordinator and order the verb accordingly.",
  "takeaway": "Connectors come in two species: those that move the verb and those that do not."
};

export default lesson;
