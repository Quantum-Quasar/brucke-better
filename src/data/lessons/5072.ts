import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5072,
  "slug": "the-alphabet-and-buchstabieren",
  "title": "The Alphabet & buchstabieren",
  "subtitle": "W = 'veh', V = 'fow', J = 'yot', Z = 'tsett', ß = 'Eszett' — spell it like a native",
  "phase": 1,
  "shift_categories": [
    "latin_ieren"
  ],
  "word_ids": [
    "buchstabieren",
    "buch",
    "sprechen",
    "schreiben",
    "wort",
    "buchstabe",
    "öl",
    "tüte",
    "ausziehen"
  ],
  "table_word_ids": [
    "buchstabieren",
    "buch",
    "wort",
    "sprechen",
    "schreiben",
    "buchstabe",
    "öl",
    "tüte",
    "ausziehen",
    "boden",
    "mehl",
    "wunderbar",
    "augenbraue",
    "notfall",
    "landkarte"
  ],
  "hook": {
    "title": "The Letter Names the Shifts Explain",
    "content": "German letter names are tiny history lessons. W is 'veh' and V is 'fow' — because German V is pronounced [f], the very fact the V→B family is built on. J is 'yot' — the y-sound English split away in the y→g family. Z is 'tsett' — the /ts/ affricate of the T→Z shift, said aloud as a letter name. And ß is 'Eszett' — literally 's-z', the sharp s of Straße. Now the verb for using them: buchstabieren, 'to spell', built on Buchstabe 'letter' — literally a book-staff, the beech-wood stick once used to mark reading passages — plus the -ieren suffix you already own from the Latin Bridge. A native root wearing a Latin suit.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Buchstabe's Wooden Secret",
        "content": "Buchstabe comes from Old High German buohstabe: buoh (book) + stab (staff, stick — the same word as English stave). Before printing, runes and reading pointers were carved beechwood sticks — Buche is beech — so a 'letter' was literally a book-stave. English kept the wooden cousin in 'stave' and 'staff'."
      }
    ]
  },
  "pattern": {
    "title": "Spelling Aloud, the German Way",
    "content": "The trap letters: W = veh (English V's sound), V = fow (English F's sound), J = yot (English Y's sound), Z = tsett (English TS), ß = Eszett (sharp S). In speech, German sp- and st- at the start of a word sound like 'shp-' and 'sht-', and Sch- is always 'sh': sprechen, Stein, schreiben. On the phone, Germans spell with the formula: 'Wie schreibt man das? — Buchstabieren Sie bitte: B wie Berta, E wie Emil...' The verb is regular except for the stress: buchstabieren, ich buchstabiere, past participle buchstabiert — and remember the Latin Bridge rule: no ge- on -ieren verbs.",
    "footnotes": [],
    "linguist_note": "Letter names fossilize pronunciation history: German kept the continental Romance values (V = [f] before it shifted, J = [j]) while English drifted to its own. When you say 'fow' for V, you are pronouncing the medieval consonant system out loud — the same one that makes Vater a [f]-word."
  },
  "exercises": [
    {
      "id": "l5072_e1",
      "type": "matching_pairs",
      "prompt": "Match each German letter with its name:",
      "matching_pairs": [
        {
          "id": "ab1",
          "english": "veh",
          "german": "W"
        },
        {
          "id": "ab2",
          "english": "fow",
          "german": "V"
        },
        {
          "id": "ab3",
          "english": "yot",
          "german": "J"
        },
        {
          "id": "ab4",
          "english": "tsett",
          "german": "Z"
        },
        {
          "id": "ab5",
          "english": "Eszett",
          "german": "ß"
        }
      ],
      "target_answer": "W, V, J, Z, ß",
      "meaning": "veh, fow, yot, tsett, Eszett",
      "explanation": "V = fow because German V sounds like [f] — the letter name is the V→B family's origin story said out loud."
    },
    {
      "id": "l5072_e2",
      "type": "shift_select",
      "prompt": "How is the letter V pronounced in German words like 'Vater'?",
      "options": [
        "like English F",
        "like English V",
        "like English W",
        "like English P"
      ],
      "target_answer": "like English F",
      "meaning": "German V = [f] — hence Vater's [f] and the letter name 'fow'",
      "explanation": "German V is the [f] of Vater/Vogel/Vier — which is exactly why Vater is a Verner's-law twin of father, not a V→B word."
    },
    {
      "id": "l5072_e3",
      "type": "shift_select",
      "prompt": "buchstabieren is built from:",
      "options": [
        "Buch (book) + stabieren",
        "Buchstabe (letter) + -ieren",
        "Buch + Stab + rennen",
        "Buchstab + einen"
      ],
      "target_answer": "Buchstabe (letter) + -ieren",
      "meaning": "to spell = letter + the Latin-style -ieren suffix",
      "explanation": "A Germanic root in a Latin suit: Buchstabe is native (book-staff), -ieren is the productive loan-suffix from the Latin Bridge."
    },
    {
      "id": "l5072_e4",
      "type": "reverse_cognate",
      "prompt": "Which English verb translates 'buchstabieren'?",
      "target_answer": "spell",
      "meaning": "buchstabieren = to spell (name the letters)",
      "explanation": "No English cognate here — 'spell' is a different word. Buchstabieren must be memorized, but its Buchstabe core makes it transparent."
    },
    {
      "id": "l5072_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Kannst du das bitte buchstabieren",
      "meaning": "Kannst du das bitte buchstabieren = can you spell that please",
      "vocab_hints": [
        {
          "word": "buchstabieren",
          "translation": "to spell",
          "note": "Buchstabe (letter) + -ieren"
        },
        {
          "word": "Öl",
          "translation": "oil",
          "note": "spelled on the phone as Ö wie Öl — Germans use a familiar word when a letter is hard to name"
        },
        {
          "word": "Tüte",
          "translation": "bag",
          "note": "T wie Theodor, Ü wie Übermut, T wie Theodor, E wie Emil — the chain that spells the bag you are holding"
        },
        {
          "word": "ausziehen",
          "translation": "to take off (clothes)",
          "note": "sich ausziehen — reflexive, with the aus- 'out' prefix from topic 15 — and it hides a Z, the tsett-letter from exercise one"
        }
      ],
      "word_bank": [
        "du",
        "Kannst",
        "buchstabieren",
        "bitte",
        "der",
        "kein",
        "das"
      ],
      "explanation": "Modal kannst in position 2, the -ieren infinitive at the bracket's end — and no ge- ever touches its participle.",
      "spoken": "Kannst du das bitte buchstabieren",
      "replays": 3,
      "cues": [
        "Meaning: \"Kannst du das bitte buchstabieren = can you spell that please\"",
        "Opens with \"Kannst du\" and ends with \"buchstabieren\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Recite the trap letter names (veh, fow, yot, tsett, Eszett) and spell your name with buchstabieren.",
    "use_example": {
      "german": "Wie schreibt man das? Kannst du das bitte buchstabieren?",
      "english": "How do you write that? Can you spell it please?"
    },
    "takeaway": "The letter names are the shifts made audible: W=veh, V=fow, J=yot, Z=tsett, ß=Eszett — and buchstabieren is Buchstabe + -ieren.",
    "curiosity_teaser": "Next: your family tree speaks German — Blood & Kin, where Vater, Mutter and Sohn line up as cognates."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Alphabet & buchstabieren (Kannst du das bitte buchstabieren = can you spell that please):",
    "target_answer": "Kannst du das bitte buchstabieren",
    "word_bank": [
      "Kannst",
      "buchstabieren",
      "nicht",
      "das",
      "du",
      "bitte",
      "heute"
    ],
    "explanation": "Re-assembling \"Kannst du das bitte buchstabieren\" from scratch locks in the structural pattern of The Alphabet & buchstabieren without relying on short-term echo."
  }
};

export default lesson;
