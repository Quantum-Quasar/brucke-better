import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5062,
  "slug": "pinnen-rekening",
  "title": "Pinnen & De Rekening",
  "subtitle": "pay by card, ask for the bill — the Dutch checkout in three verbs",
  "phase": 3,
  "categories": [
    "money"
  ],
  "words": [
    "rekening",
    "pinnen",
    "kosten",
    "kopen",
    "winkel",
    "geld"
  ],
  hookTitle: "The Checkout, the Dutch Way",
  hook: "Lesson 5061 asked the price. Now run the whole checkout: kopen in the winkel, then pinnen — Dutch turned the card machine into a verb. Ask for the bill with mag ik de rekening? and you are done before the change exists.",
  patternTitle: "Pin it, don't pay it",
  pattern: "pinnen is paying by card — a verb named after the machine (de pin). betalen is the general paying; pinnen is its everyday shortcut. The rekening is the bill you ask for.",
  trap: "Do not say ik pin de rekening — you betaal de rekening and you pin MET de kaart. One verb pays, one verb names the card.",
  sentences: [
    {
      "nl": "Ik betaal bij de winkel.",
      "en": "I pay at the shop.",
      "literal": "I pay at the shop.",
      "wrong": [
        "Ik betaalt bij de winkel.",
        "Ik betaal bij het winkel."
      ],
      "note": "Ik betaal — the I-form keeps the bare stem, and de winkel keeps its de."
    },
    {
      "nl": "Mag ik de rekening?",
      "en": "May I have the bill?",
      "literal": "May I the bill?"
    },
    {
      "nl": "Ik pin bij de winkel.",
      "en": "I pay by card at the shop.",
      "literal": "I pin at the shop.",
      "note": "Word for word: I pin at the shop — pinnen names the machine, not the money."
    },
    {
      "nl": "Ik betaal de rekening met geld.",
      "en": "I pay the bill with money.",
      "literal": "I pay the bill with money."
    }
  ],
  twist: {
    "nl": "Zij pinnen graag bij de winkel.",
    "en": "They like paying by card at the shop.",
    "explanation": "zij pinnen — the plural keeps the -en, and graag makes the card habit friendly."
  },
  outcome: "Run the Dutch checkout: kopen, betaal de rekening, and pin it with pinnen.",
  "takeaway": "Pinnen names the machine — Dutch turns its card reader into a verb."
};

export default lesson;
