import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 801,
  "slug": "zijn-have-gym",
  "title": "Zijn & Have Gym",
  "subtitle": "ben/bent/is, heb/hebt/heeft — identity, possession and hunger",
  "phase": 2,
  "categories": [
    "direct_twin"
  ],
  "words": [
    "zijn",
    "hebben",
    "honger",
    "dorst",
    "koud",
    "warm"
  ],
  "hookTitle": "Four Frames, One Verb Pair",
  "hook": "Identity, location, possession and bodily states all run through zijn and hebben. Ik ben hier, ik heb honger, het is koud: the frame changes, the verbs do not.",
  "patternTitle": "Choose the frame, then the verb",
  "pattern": "Being: ik ben, het is. Possession and bodily states: ik heb honger, ik heb dorst. Weather: het is koud. The noun after hebben is the thing you 'have'.",
  "trap": "English 'I am cold' is usually ik heb het koud, not ik ben koud. The body feels cold through hebben.",
  "sentences": [
    {
      "nl": "Het is koud.",
      "en": "It is cold.",
      "literal": "It is cold."
    },
    {
      "nl": "Wij hebben dorst.",
      "en": "We are thirsty.",
      "literal": "We have thirst."
    },
    {
      "nl": "Hij heeft honger.",
      "en": "He is hungry.",
      "literal": "He has hunger."
    },
    {
      "nl": "Het is warm.",
      "en": "It is warm.",
      "literal": "It is warm."
    }
  ],
  "twist": {
    "nl": "Jij hebt geen dorst.",
    "en": "You are not thirsty.",
    "explanation": "Geen negates the indefinite noun dorst; hebben stays the frame."
  },
  "outcome": "Swap between zijn and hebben for identity, weather and bodily states.",
  "takeaway": "Dutch often says you 'have' a state English says you 'are'."
};

export default lesson;
