import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 25,
  "slug": "subordinate-clauses",
  "title": "Subordinate Clauses",
  "subtitle": "omdat, dat, als — the verb leaves second place and waits at the end",
  "phase": 4,
  "categories": [
    "subordination"
  ],
  "words": [
    "omdat",
    "dat",
    "als",
    "komen",
    "werken",
    "denken"
  ],
  "hookTitle": "The Verb Goes Home",
  "hook": "A main clause puts the finite verb second. A subordinate clause puts it last. Ik denk dat hij komt, ik werk omdat ik geld nodig heb. The conjunction sends the verb to the end.",
  "patternTitle": "Subordinating conjunction → verb final",
  "pattern": "After omdat, dat, als, wanneer and hoewel, the finite verb moves to the end of its clause. The main clause still has V2 order; only the subordinate clause changes.",
  "trap": "Want ('because') is different: it keeps main-clause V2 order. Omdat sends the verb to the end; want does not.",
  "linguist": "Dutch is a V2 language in main clauses and verb-final in subordinate clauses, the same split German has.",
  "sentences": [
    {
      "nl": "Ik denk dat hij komt.",
      "en": "I think that he comes.",
      "literal": "I think that he comes.",
      "wrong": [
        "Ik denk dat hij komt niet.",
        "Ik denk dat komt hij."
      ]
    },
    {
      "nl": "Ik werk omdat ik geld nodig heb.",
      "en": "I work because I need money.",
      "literal": "I work because I money needed have."
    },
    {
      "nl": "Als het koud is, blijf ik thuis.",
      "en": "If it is cold, I stay home.",
      "literal": "If it cold is, stay I home."
    },
    {
      "nl": "Zij zegt dat wij komen.",
      "en": "She says that we come."
    }
  ],
  "twist": {
    "nl": "Ik blijf omdat het regent.",
    "en": "I stay because it is raining.",
    "explanation": "Omdat sends the finite verb regent to the end of the subordinate clause."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "build", "at": 2 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Put the finite verb last after a subordinating conjunction.",
  "takeaway": "The conjunction is the signal: subordinate clause, verb final."
};

export default lesson;
