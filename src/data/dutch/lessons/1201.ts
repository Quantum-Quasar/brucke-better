import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 1201,
  "slug": "inversion-gym",
  "title": "Inversion Gym",
  "subtitle": "vandaag, morgen, hier, daar — front it and invert it",
  "phase": 2,
  "categories": [
    "v2_order"
  ],
  "words": [
    "vandaag",
    "morgen",
    "gaan",
    "komen",
    "werken",
    "hier"
  ],
  "hookTitle": "Front It, Invert It",
  "hook": "The more fronted words you meet, the more the same inversion appears. Vandaag ga ik, morgen komt zij, hier werk ik, daar werkt hij. One rule, four surfaces.",
  "patternTitle": "The subject follows the verb",
  "pattern": "After a fronted element, the subject follows the finite verb. The verb does not change its tense or its person; only the order changes.",
  "trap": "Inversion is not a question marker by itself. Vandaag werk ik is a statement even though the verb comes before the subject.",
  "sentences": [
    {
      "nl": "Vandaag ga ik.",
      "en": "Today I go.",
      "literal": "Today go I."
    },
    {
      "nl": "Morgen komt zij.",
      "en": "Tomorrow she comes.",
      "literal": "Tomorrow comes she."
    },
    {
      "nl": "Hier werk ik.",
      "en": "Here I work.",
      "literal": "Here work I."
    },
    {
      "nl": "Daar werkt hij.",
      "en": "There he works.",
      "literal": "There works he."
    }
  ],
  "twist": {
    "nl": "Vandaag zijn wij hier.",
    "en": "Today we are here.",
    "explanation": "Zijn is the finite verb, so it takes second place and wij follows."
  },
  "outcome": "Invert subject and finite verb after any fronted element.",
  "takeaway": "Inversion is the normal consequence of V2, not an emergency manoeuvre."
};

export default lesson;
