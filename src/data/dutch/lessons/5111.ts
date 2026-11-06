import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5111,
  "slug": "have-hunger",
  "title": "Honger, Dorst & Leeftijd",
  "subtitle": "Dutch says you 'have' hunger and thirst — but you 'are' your age",
  "phase": 2,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "honger",
    "dorst",
    "jaar",
    "twintig",
    "hebben",
    "zijn"
  ],
  "hookTitle": "Have Hunger, Be Age",
  "hook": "Dutch says ik heb honger and ik heb dorst, not 'I am hungry/thirsty'. But age uses zijn: ik ben twintig jaar. Two body states, two different verbs.",
  "patternTitle": "Have states, be age",
  "pattern": "Ik heb honger, ik heb dorst, wij hebben geen honger. Age: ik ben twintig jaar. The noun is possessed; the age is predicated.",
  "trap": "Never say ik heb twintig jaar for age, and never say ik ben honger for hunger.",
  "sentences": [
    {
      "nl": "Ik heb honger.",
      "en": "I am hungry.",
      "literal": "I have hunger."
    },
    {
      "nl": "Ik heb dorst.",
      "en": "I am thirsty.",
      "literal": "I have thirst."
    },
    {
      "nl": "Ik ben twintig jaar.",
      "en": "I am twenty years old.",
      "literal": "I am twenty year."
    },
    {
      "nl": "Wij hebben geen honger.",
      "en": "We are not hungry.",
      "literal": "We have no hunger."
    }
  ],
  "twist": {
    "nl": "Ik heb trek.",
    "en": "I feel like eating.",
    "explanation": "Trek is the appetite word; it takes hebben like honger."
  },
  "outcome": "Say hunger, thirst and age with the correct verb.",
  "takeaway": "Dutch divides bodily states and age between hebben and zijn; the noun decides."
};

export default lesson;
