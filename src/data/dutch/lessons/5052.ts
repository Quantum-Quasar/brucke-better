import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5052,
  "slug": "tram-station",
  "title": "De Tram & Het Station",
  "subtitle": "wacht op, neem de tram — the city run, door to door",
  "phase": 2,
  "categories": [
    "place"
  ],
  "words": [
    "tram",
    "station",
    "ticket",
    "fiets",
    "nemen",
    "wachten"
  ],
  hookTitle: "The City Run",
  hook: "Lesson 5051 gave you links, rechts, rechtdoor. Now ride: Ik neem de tram naar het station — I take the tram to the station. Dutch 'takes' transport with nemen, and it waits ON things with wachten op: ik wacht op de tram.",
  patternTitle: "Take with nemen, wait with wachten op",
  pattern: "nemen + transport (de tram, de fiets) = take it; wachten op + person/vehicle = wait for it. The preposition op is already inside the verb's job.",
  trap: "wachten op is one unit: ik wacht OP de tram — do not swap op for voor, even though English waits FOR.",
  sentences: [
    {
      "nl": "Waar is het station?",
      "en": "Where is the station?",
      "literal": "Where is the station?",
      "wrong": [
        "Waar is de station?",
        "Waar station is?"
      ],
      "note": "het station — and the question keeps normal order, just with waar in front."
    },
    {
      "nl": "Ik neem de tram naar het station.",
      "en": "I take the tram to the station.",
      "literal": "I take the tram to the station."
    },
    {
      "nl": "Ik wacht op de tram bij het station.",
      "en": "I am waiting for the tram by the station.",
      "literal": "I wait on the tram at the station.",
      "note": "Word for word: I wait ON the tram — wachten op carries its own preposition."
    },
    {
      "nl": "De tram gaat rechtdoor.",
      "en": "The tram goes straight ahead.",
      "literal": "The tram goes straight through."
    }
  ],
  twist: {
    "nl": "Ik neem de fiets, jij neemt de tram.",
    "en": "I take the bike, you take the tram.",
    "explanation": "neem and neemt — same verb, one stem, one t; the transport changes, the machine does not."
  },
  outcome: "Ask for the station, take the tram with nemen, and wait for it with wachten op.",
  takeaway: "Take with nemen, wait with wachten op — the preposition rides inside the verb."
};

export default lesson;
