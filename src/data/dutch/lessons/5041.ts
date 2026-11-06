import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5041,
  "slug": "t-v-line",
  "title": "Jij, U & Doe Normaal",
  "subtitle": "informal jij versus polite u, and the culture of Dutch directness",
  "phase": 2,
  "categories": [
    "pronouns"
  ],
  "words": [
    "jij",
    "u",
    "jullie",
    "mijn",
    "uw",
    "goedemorgen"
  ],
  "hookTitle": "Two Yous and a Culture",
  "hook": "Dutch keeps the old thou/you split that English lost: jij is informal singular, u is polite, jullie is plural. Choosing the wrong one is a social statement, not just a grammar mistake.",
  "patternTitle": "Jij for peers, u for distance",
  "pattern": "Jij bent hier (informal), u bent hier (polite), jullie zijn hier (plural). U takes the same verb forms as jij in most of the present tense, but the social meaning is different.",
  "trap": "U is not a plural. Jullie is plural; u is polite singular (and can be polite plural in some contexts).",
  "sentences": [
    {
      "nl": "Jij bent hier.",
      "en": "You are here.",
      "literal": "You are here."
    },
    {
      "nl": "U bent hier.",
      "en": "You are here (polite).",
      "literal": "You are here."
    },
    {
      "nl": "Jullie zijn hier.",
      "en": "You all are here.",
      "literal": "You all are here."
    },
    {
      "nl": "Is dit uw boek?",
      "en": "Is this your book?",
      "literal": "Is this your book?"
    }
  ],
  "twist": {
    "nl": "Wat wilt u?",
    "en": "What would you like?",
    "explanation": "U takes wilt/wil in the polite register; the question is a service formula."
  },
  "outcome": "Choose jij, u or jullie by register and use the matching possessive.",
  "takeaway": "Dutch politeness is a pronoun choice; the verb often looks the same, but the social meaning does not."
};

export default lesson;
