import type { DutchLessonSpec } from "../lesson-factory";

const lesson: DutchLessonSpec = {
  "id": 6,
  "slug": "vowel-bridges",
  "title": "The Vowel Bridges",
  "subtitle": "ice → ijs, house → huis, book → boek — the real Dutch work",
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
    "wijn",
    "vijf",
    "muis"
  ],
  "hookTitle": "The Consonants Are Free; the Vowels Are the Work",
  "hook": "The consonant twins give you the word; the vowels give you the Dutch pronunciation. IJ is /ɛi/, UI is /œy/, OE is /u/. English ice, house and book are the spelling keys.",
  "patternTitle": "Three spelling bridges",
  "pattern": "English i/y often answers to Dutch ij: ijs, wijn, vijf. English ou/ow often answers to Dutch ui: huis, muis. English oo often answers to Dutch oe: boek, voet, goed. These are spelling bridges, not claims that the vowels sound identical.",
  "trap": "Dutch oe is /u/, while English 'book' has /ʊ/. Do not copy the English vowel; read the Dutch spelling and use the Dutch sound.",
  "linguist": "The Dutch digraphs ij and ui are old spellings for diphthongs; oe spells a long /u/. English orthography preserves different vowels from the same Germanic stock.",
  "sentences": [
    {
      "nl": "Het ijs is koud.",
      "en": "The ice is cold.",
      "literal": "The ice is cold.",
      "wrong": [
        "Het ijs koud is.",
        "Het ijs is warm."
      ]
    },
    {
      "nl": "Mijn huis is klein.",
      "en": "My house is small.",
      "literal": "My house is small."
    },
    {
      "nl": "Het boek is goed.",
      "en": "The book is good.",
      "literal": "The book is good."
    },
    {
      "nl": "De wijn is rood.",
      "en": "The wine is red."
    }
  ],
  "twist": {
    "nl": "De muis is klein.",
    "en": "The mouse is small.",
    "explanation": "Muis is the ui twin of mouse; the sentence reuses the adjective frame."
  },
  "exercises": [
    { "kind": "matching" },
    { "kind": "derive", "english": "book", "target": "boek", "meaning": "het boek — the book", "english_hint": "book → b-oek", "rule": "oo ↔ oe", "explanation": "English oo and Dutch oe are spelling twins: book → boek, foot → voet, good → goed. Dutch oe is the /u/ sound — read the bridge, then say the Dutch vowel." },
    { "kind": "select", "at": 0 },
    { "kind": "transcribe", "at": 1 },
    { "kind": "dictation", "at": 3 }
  ],
  "outcome": "Read ij, ui and oe as Dutch vowel signals and match them to English spelling twins.",
  "takeaway": "Vowels are where the course earns its keep; consonants are the free part."
};

export default lesson;
