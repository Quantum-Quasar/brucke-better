import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2502,
  "slug": "because-and-when",
  "title": "Because & When",
  "subtitle": "omdat and als send the verb to the end — the machine inside the machine",
  "phase": 4,
  "categories": [
    "subordination"
  ],
  "words": [
    "omdat",
    "moe",
    "thuis",
    "blijven",
    "denken",
    "zeggen"
  ],
  hookTitle: "The Verb Leaves Second Place",
  hook: "Lesson 2501 moved the verb to the end after omdat and dat. Now run it on feelings and speech: Ik blijf thuis omdat ik moe ben. Hij zegt dat hij moe is. The connector is the signal; the verb is the follower.",
  patternTitle: "Connector first, verb last",
  pattern: "omdat/als/dat open the side clause and push the verb behind everything: omdat ik moe BEN. The main clause keeps normal order; only the side clause bends.",
  trap: "Two clauses, two verbs, two positions: Ik denk DAT HIJ KOMT — denk stays second in its clause, komt goes last in the other. Do not let one clause infect the other.",
  sentences: [
    {
      "nl": "Ik blijf thuis omdat ik moe ben.",
      "en": "I am staying home because I am tired.",
      "literal": "I stay home because I tired am.",
      "wrong": [
        "Ik blijf thuis omdat ik ben moe.",
        "Ik ben moe omdat ik blijf thuis."
      ],
      "note": "omdat bends its own clause: because I tired AM — the verb goes last."
    },
    {
      "nl": "Ik denk dat hij komt.",
      "en": "I think that he is coming.",
      "literal": "I think that he comes."
    },
    {
      "nl": "Hij zegt dat hij moe is.",
      "en": "He says that he is tired.",
      "literal": "He says that he tired is.",
      "note": "Word for word: he says that he tired is — dat opens, is closes."
    },
    {
      "nl": "Wij blijven thuis omdat het koud is.",
      "en": "We are staying home because it is cold.",
      "literal": "We stay home because it cold is."
    }
  ],
  twist: {
    "nl": "Ik werk omdat ik geld wil.",
    "en": "I work because I want money.",
    "explanation": "omdat ik geld WIL — the connector hires the verb and sends it to the end."
  },
  outcome: "Chain two clauses with omdat, dat and als while keeping each verb in its own clause's seat.",
  takeaway: "Connector first, verb last — the side clause bends so the main clause does not have to."
};

export default lesson;
