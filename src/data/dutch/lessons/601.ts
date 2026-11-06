import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 601,
  "slug": "ij-ui-oe-gym",
  "title": "IJ / UI / OE Gym",
  "subtitle": "ice, out, thousand, brown, mouse, book — three vowel families in one drill",
  "phase": 1,
  "categories": [
    "vowel_ij",
    "vowel_ui",
    "vowel_oe"
  ],
  "words": [
    "ijs",
    "uit",
    "duizend",
    "bruin",
    "muis",
    "boek"
  ],
  "hookTitle": "Three Bridges, Six Words",
  "hook": "IJs, uit, duizend, bruin, muis, boek. Ice, out, thousand, brown, mouse, book. Three vowel bridges, six everyday words, one recognition habit.",
  "patternTitle": "Read the digraph, not the English letter",
  "pattern": "IJ is one sound, /ɛi/. UI is one sound, /œy/. OE is one sound, /u/. The English spelling on the other side is a memory hook; the Dutch sound is the target.",
  "trap": "Do not pronounce ui as 'oo-ee' in two beats. It is one gliding vowel, closer to a rounded 'ow' with the tongue forward.",
  "sentences": [
    {
      "nl": "Het ijs is koud.",
      "en": "The ice is cold.",
      "literal": "The ice is cold."
    },
    {
      "nl": "Ik ga uit.",
      "en": "I go out.",
      "literal": "I go out."
    },
    {
      "nl": "Duizend boeken zijn veel.",
      "en": "A thousand books are many.",
      "literal": "A thousand books are many."
    },
    {
      "nl": "De muis is bruin.",
      "en": "The mouse is brown."
    }
  ],
  "twist": {
    "nl": "Het boek is bruin.",
    "en": "The book is brown.",
    "explanation": "Boek brings the oe bridge back after the ui words; the frame is unchanged."
  },
  "outcome": "Produce six words across the ij, ui and oe families without mixing the sounds.",
  "takeaway": "One gliding vowel per digraph; do not split it into two English beats."
};

export default lesson;
