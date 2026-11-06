import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1902,
  "slug": "ablauf-families-e-to-i-a-to-o",
  "title": "Ablaut Families I: e→i, a→o",
  "subtitle": "geben/gab, sprechen/sprach, fahren/fuhr — the class drills with participles",
  "phase": 3,
  "shift_categories": [
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "geben",
    "sprechen",
    "fahren",
    "nehmen",
    "schlafen",
    "kommen",
    "fallen",
    "springen",
    "treten",
    "blasen",
    "frieren",
    "fliegen"
  ],
  "table_word_ids": [
    "geben",
    "sprechen",
    "fahren",
    "nehmen",
    "schlafen",
    "kommen",
    "fallen",
    "springen",
    "treten",
    "blasen",
    "frieren",
    "fliegen",
    "faust",
    "leider",
    "ski",
    "stinken"
  ],
  "hook": {
    "title": "The Family Albums",
    "content": "Strong verbs come in families, and the families are recognizable by their melody. Family one: short e in the infinitive becomes a in the past — geben, gab, gegeben. sprechen, sprach, gesprochen. nehmen, nahm, genommen. Family two: long a becomes long u — fahren, fuhr, gefahren. Family three: ä in the du/er present then a in the past, ie in the past of the sleep class — schlafen, schlief, geschlafen. Each family has its English twins standing right beside it: give/gave, speak/spoke, fare/fared, sleep/slept. You are not learning ten verbs. You are learning three melodies that cover them.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The du/er Vowel Warning",
        "content": "Some strong verbs change their vowel in the SECOND and THIRD person of the PRESENT too: du gibst, er gibt (from geben); du nimmst, er nimmt (from nehmen). English whispers this once — 'he gives' — German does it visibly. The past-tense melody is unaffected."
      }
    ]
  },
  "pattern": {
    "title": "Three Melodies, Full Paradigms",
    "content": "Family e→i/a: geben, gibst, gibt, gab, gegeben ↔ give, gave, given. sprechen, sprichst, spricht, sprach, gesprochen ↔ speak, spoke, spoken. nehmen, nimmst, nimmt, nahm, genommen. Family a→u: fahren, fährst, fährt, fuhr, gefahren ↔ fare, fared. The sleep class: schlafen, schläfst, schläft, schlief, geschlafen ↔ sleep, slept. And kommen sits in its own honest corner: kommen, kam, gekommen ↔ come, came, come — the melody you already drilled.",
    "footnotes": [],
    "linguist_note": "The du/er present-tense vowel change (gibt, nimmt, fährt, schläft) is i-mutation — the same umlaut that will build plurals and comparatives later. The strong verbs are where it has been hiding all along."
  },
  "exercises": [
    {
      "id": "l1902_e1",
      "type": "matching_pairs",
      "prompt": "Family album one — match the paradigms:",
      "matching_pairs": [
        {
          "id": "af1",
          "english": "give / gave / given",
          "german": "geben / gab / gegeben"
        },
        {
          "id": "af2",
          "english": "speak / spoke / spoken",
          "german": "sprechen / sprach / gesprochen"
        },
        {
          "id": "af3",
          "english": "take / took / taken",
          "german": "nehmen / nahm / genommen"
        },
        {
          "id": "af4",
          "english": "fare / fared",
          "german": "fahren / fuhr / gefahren"
        },
        {
          "id": "af5",
          "english": "fall / fell / fallen",
          "german": "fallen / fiel / gefallen"
        },
        {
          "id": "af6",
          "english": "spring / sprang / sprung",
          "german": "springen / sprang / gesprungen"
        }
      ],
      "target_answer": "geben / gab / gegeben, sprechen / sprach / gesprochen, nehmen / nahm / genommen, fahren / fuhr / gefahren, fallen / fiel / gefallen, springen / sprang / gesprungen",
      "meaning": "the give, speak, take, fare, fall, and spring melodies",
      "explanation": "e→a in the first family, a→u in the second — the melodies cross the North Sea intact, and fall/spring join the album note for note."
    },
    {
      "id": "l1902_e2",
      "type": "shift_select",
      "prompt": "'er _____ ein Bier.' (geben, 3rd person present — mind the vowel!)",
      "options": [
        "gab",
        "gibt",
        "geben",
        "gibst"
      ],
      "target_answer": "gibt",
      "meaning": "er gibt ein Bier = he gives a beer",
      "explanation": "geben's du/er present mutates to i: du gibst, er gibt. The past gab is a different note. The melodies keep singing across the album: blasen blies, frieren fror, fliegen flog — the vowel IS the tense."
    },
    {
      "id": "l1902_e3",
      "type": "derive",
      "prompt": "Family e→a: 'treten' in the er-past →",
      "english_hint": "the e opens to a",
      "target_answer": "trat",
      "meaning": "er trat = he stepped",
      "explanation": "treten, trat, getreten — tread/trod/trodden, note for note. The e→a melody again."
    },
    {
      "id": "l1902_e4",
      "type": "morpheme_tiles",
      "prompt": "Build the participle of 'sprechen':",
      "tile_options": [
        "ge",
        "en",
        "sproch",
        "t",
        "sprich"
      ],
      "target_answer": "gesprochen",
      "meaning": "spoken",
      "explanation": "ge- + the past vowel o + -en: gesprochen — speak/spoke/spoken, note for note."
    },
    {
      "id": "l1902_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'He gave me the book'",
      "target_answer": "Er hat mir das Buch gegeben",
      "meaning": "He gave me the book",
      "vocab_hints": [
        {
          "word": "mir",
          "translation": "to me (dative)",
          "note": "the receiver takes the dative — mir, the 'give it me' fossil"
        }
      ],
      "word_bank": [
        "Er",
        "ohne",
        "gegeben",
        "Buch",
        "heute",
        "hat",
        "mir",
        "das"
      ],
      "explanation": "geben, gab, gegeben in a full Perfekt bracket — with the dative mir riding inside: give gave given, to-me."
    }
  ],
  "summary": {
    "outcome": "Conjugate the e→a and a→u strong families through past and participle.",
    "use_example": {
      "german": "Er hat mir das Buch gegeben.",
      "english": "He gave me the book."
    },
    "takeaway": "Three melodies cover a dozen verbs: e→a (geben), a→u (fahren), and the sleep class (schlafen/schlief).",
    "curiosity_teaser": "Next: dachte & the Suppletive Irregulars — think/thought ↔ denken/dachte, where both languages swap in a new past."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Ablaut Families I: e→i, a→o (He gave me the book):",
    "target_answer": "Er hat mir das Buch gegeben",
    "word_bank": [
      "mir",
      "nicht",
      "Er",
      "hat",
      "gegeben",
      "heute",
      "das",
      "Buch"
    ],
    "explanation": "Re-assembling \"Er hat mir das Buch gegeben\" from scratch locks in the structural pattern of Ablaut Families I: e→i, a→o without relying on short-term echo."
  }
};

export default lesson;
