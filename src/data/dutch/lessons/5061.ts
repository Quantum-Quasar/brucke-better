import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5061,
  "slug": "shopping-euros",
  "title": "Hoeveel Kost Het?",
  "subtitle": "prices, paying and the Dutch pin machine",
  "phase": 3,
  "categories": [
    "money"
  ],
  "words": [
    "hoeveel",
    "kosten",
    "geld",
    "euro",
    "betalen",
    "pinnen"
  ],
  "hookTitle": "How Much, and How to Pay",
  "hook": "Hoeveel kost het? Ik wil betalen. Ik pin hier. Shopping Dutch is a handful of frames: ask the price, state the payment, choose cash or card.",
  "patternTitle": "Kost, betalen, pinnen",
  "pattern": "Hoeveel kost het? Het kost tien euro. Ik wil betalen. Ik pin hier. Pinnen is the everyday verb for paying by card; betalen is the general verb.",
  "trap": "Kost is the third-person form of kosten. Do not say hoeveel kosten het for one item; use kost.",
  "sentences": [
    {
      "nl": "Hoeveel kost het?",
      "en": "How much does it cost?",
      "literal": "How much costs it?"
    },
    {
      "nl": "Ik wil betalen.",
      "en": "I want to pay.",
      "literal": "I want to pay."
    },
    {
      "nl": "Ik pin hier.",
      "en": "I pay by card here.",
      "literal": "I pin here."
    },
    {
      "nl": "Het kost tien euro.",
      "en": "It costs ten euros."
    }
  ],
  "twist": {
    "nl": "Ik heb geen geld.",
    "en": "I have no money.",
    "explanation": "Geen negates the indefinite noun geld; hebben stays positive."
  },
  "outcome": "Ask prices and complete a simple payment exchange.",
  "takeaway": "Shopping is a small set of frames; the currency is the only variable."
};

export default lesson;
