import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 2201,
  "slug": "pronoun-gym",
  "title": "Pronoun Gym",
  "subtitle": "mijn, jouw, zijn, haar, ons — possessives agree with the thing owned",
  "phase": 4,
  "categories": [
    "pronouns"
  ],
  "words": [
    "mijn",
    "jouw",
    "zijn_poss",
    "haar_poss",
    "ons_poss",
    "jullie"
  ],
  "hookTitle": "The Owner Does Not Decide",
  "hook": "Dutch possessives agree with the thing owned, not with the owner: mijn boek, jouw fiets, zijn huis, haar auto. The owner's gender is irrelevant.",
  "patternTitle": "Possessive + noun",
  "pattern": "Mijn, jouw, zijn, haar, ons and jullie sit before the noun. Onze replaces ons before de-words and plurals: ons huis but onze auto. The form follows the noun.",
  "trap": "Do not choose haar because the owner is female; haar agrees with the owned noun's grammatical class, not the owner's sex.",
  "sentences": [
    {
      "nl": "Mijn boek is hier.",
      "en": "My book is here.",
      "literal": "My book is here."
    },
    {
      "nl": "Jouw boek is daar.",
      "en": "Your book is there.",
      "literal": "Your book is there."
    },
    {
      "nl": "Zijn fiets is nieuw.",
      "en": "His bike is new.",
      "literal": "His bike is new."
    },
    {
      "nl": "Haar huis is groot.",
      "en": "Her house is big."
    }
  ],
  "twist": {
    "nl": "Ons huis is klein.",
    "en": "Our house is small.",
    "explanation": "Ons is used before a het-word; onze would be used before a de-word."
  },
  "outcome": "Use the possessive set and choose ons/onze by the noun.",
  "takeaway": "Possessives track the owned noun, not the owner."
};

export default lesson;
