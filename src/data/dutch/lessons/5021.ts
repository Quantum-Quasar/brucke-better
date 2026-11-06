import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 5021,
  "slug": "vowels-diphthongs",
  "title": "Vowels & Diphthongs",
  "subtitle": "aa/ee/oo/uu, ij/ui/oe/eu — hear the length and the glide",
  "phase": 1,
  "categories": [
    "vowel_ij",
    "vowel_ui",
    "vowel_oe"
  ],
  "words": [
    "ijs",
    "huis",
    "boek",
    "deur",
    "vuur",
    "muis"
  ],
  "hookTitle": "The Mouth Map",
  "hook": "Dutch spelling is a mouth map: double vowels are long, single vowels are short, and the digraphs ij/ui/oe/eu are single gliding sounds. The map is more regular than English.",
  "patternTitle": "Length and glide",
  "pattern": "IJs /ɛis/, huis /ɦœys/, boek /buk/, deur /døːr/, vuur /vyr/, muis /mœys/. Each word is one or two syllables, and the digraph is one sound, not two letters pronounced separately.",
  "trap": "Do not pronounce ui as 'oo-ee' or ij as English 'eye'. They are Dutch vowels with no exact English equivalent.",
  "sentences": [
    {
      "nl": "Het ijs is koud.",
      "en": "The ice is cold.",
      "literal": "The ice is cold."
    },
    {
      "nl": "Het huis is groot.",
      "en": "The house is big.",
      "literal": "The house is big."
    },
    {
      "nl": "Het boek is goed.",
      "en": "The book is good.",
      "literal": "The book is good."
    },
    {
      "nl": "De deur is open.",
      "en": "The door is open."
    }
  ],
  "twist": {
    "nl": "Het vuur is warm.",
    "en": "The fire is warm.",
    "explanation": "Vuur uses the long uu sound; it is not the ui digraph."
  },
  "outcome": "Hear and produce the core Dutch long vowels and diphthongs.",
  "takeaway": "Dutch orthography is a pronunciation map; read the vowel length first."
};

export default lesson;
