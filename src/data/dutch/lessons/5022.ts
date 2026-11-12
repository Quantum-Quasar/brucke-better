import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5022,
  "slug": "g-ch-sentences",
  "title": "G & CH Sentences",
  "subtitle": "the two throat sounds share sentences with their g- and ch-words",
  "phase": 1,
  "categories": [
    "gh_ch"
  ],
  "words": [
    "gans",
    "gras",
    "goud",
    "licht",
    "nacht",
    "goed"
  ],
  hookTitle: "Two Throat Sounds, One Sentence",
  hook: "The Sound Gym's first lesson tuned the vowels. Now put the two throat sounds to work together: de gans in het gras (g at the front), het licht in de nacht (ch after the vowel). One sentence can hold both — and Dutch speaks them in a single breath.",
  patternTitle: "G up front, ch behind the vowel",
  pattern: "g opens words (gans, gras, goud, goed, geven); ch sits behind a vowel (nacht, licht, recht). Both come from the same place in the throat — read them in order and the sentence flows.",
  trap: "Do not say the g like English 'goose' — de gans is a throat g, harsh and dry. English 'goose' would turn the goose into a different animal.",
  sentences: [
    {
      "nl": "Ik zie de gans in het gras.",
      "en": "I see the goose in the grass.",
      "literal": "I see the goose in the grass.",
      "wrong": [
        "Ik zie het gans in het gras.",
        "Ik zie de gans op de gras."
      ],
      "note": "de gans, het gras — two throat sounds, two articles."
    },
    {
      "nl": "De gans is wit en groot.",
      "en": "The goose is white and big.",
      "literal": "The goose is white and big."
    },
    {
      "nl": "Ik hoor de gans in de nacht.",
      "en": "I hear the goose at night.",
      "literal": "I hear the goose in the night.",
      "note": "Word for word: I hear the goose in the night — Dutch says where the night is, not when."
    },
    {
      "nl": "Het groene licht is voor de gans.",
      "en": "The green light is for the goose.",
      "literal": "The green light is for the goose."
    }
  ],
  twist: {
    "nl": "De gans krijgt het groene licht.",
    "en": "The goose gets the green light.",
    "explanation": "krijgt keeps its throat g even with the t-ending stacked on — krijgt is krijgen at work."
  },
  outcome: "Say g-words and ch-words in the same sentence without softening either throat sound.",
  takeaway: "G up front, ch behind the vowel — one throat, two letters, one breath."
};

export default lesson;
