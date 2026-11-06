import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 901,
  "slug": "stem-hunters",
  "title": "Stem Hunters",
  "subtitle": "Strip -en at speed — the stem is the verb's DNA",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "lernen",
    "kommen",
    "trinken",
    "machen",
    "denken",
    "finden",
    "singen",
    "bringen",
    "wandern",
    "setzen",
    "sitzen",
    "halten",
    "stehen",
    "zeigen",
    "küssen",
    "anprobieren",
    "spazieren"
  ],
  "table_word_ids": [
    "lernen",
    "kommen",
    "trinken",
    "machen",
    "denken",
    "finden",
    "singen",
    "bringen",
    "wandern",
    "setzen",
    "sitzen",
    "halten",
    "stehen",
    "zeigen",
    "küssen",
    "anprobieren",
    "spazieren"
  ],
  "hook": {
    "title": "One Stem, Six People",
    "content": "Stop reading German verbs as whole words. Read them as stem + ending. Strip the dictionary -en and what remains — lern-, komm-, trink-, mach-, denk- — is the verb's DNA: it never changes, and every single person is built from it. You learned the endings in the Conjugation Roots lesson; today you drill the dissection until stripping -en becomes instant. Hunters who own the stem never memorize conjugation tables — they assemble them on sight.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Old English Did the Same",
        "content": "Old English verbs worked identically: lǣran 'to teach' had the stem lǣr- and wore ic lǣre, þū lǣrest, hē lǣrþ. German never stopped building verbs this way — English just stopped showing the seams."
      }
    ]
  },
  "pattern": {
    "title": "Dissect, Then Rebuild",
    "content": "Step one — dissect: lernen → lern-, kommen → komm-, trinken → trink-, machen → mach-, denken → denk- (note the nk: the k of think survives intact!). Step two — rebuild the whole row from the stem: ich lerne, du lernst, er lernt, wir lernen, ihr lernt, sie lernen. One stem, six tiles: -e, -st, -t, -en, -t, -en. The wir and sie forms wear the full dictionary -en; du wears the Shakespearean -st; er keeps the archaic -th as -t. Nothing else ever happens to a regular verb.",
    "footnotes": [],
    "linguist_note": "denken hides a historical wrinkle: du denkst preserves the stem, but the past tense will later surprise you (dachte, not denkte). Regular verbs keep the stem untouched forever; denken is already practicing its escape."
  },
  "exercises": [
    {
      "id": "l901_e1",
      "type": "morpheme_tiles",
      "prompt": "Rebuild 'we come' from the stem (stem + the full ending):",
      "tile_options": [
        "en",
        "st",
        "komm",
        "wir",
        "t",
        "e"
      ],
      "target_answer": "wir kommen",
      "meaning": "we come",
      "explanation": "Stem 'komm-' + wir's full '-en' = kommen — the dictionary form does double duty as the wir-form."
    },
    {
      "id": "l901_e2",
      "type": "derive",
      "prompt": "Strip the infinitive: lernen → stem:",
      "english_hint": "remove the -en tail",
      "target_answer": "lern",
      "meaning": "stem of lernen",
      "explanation": "lern- + the six personal tiles builds every form: lerne, lernst, lernt, lernen..."
    },
    {
      "id": "l901_e3",
      "type": "matching_pairs",
      "prompt": "The hunter's ledger — match each infinitive with its stripped stem:",
      "matching_pairs": [
        {
          "id": "sh1",
          "english": "setzen (to set)",
          "german": "setz-"
        },
        {
          "id": "sh2",
          "english": "sitzen (to sit)",
          "german": "sitz-"
        },
        {
          "id": "sh3",
          "english": "halten (to hold)",
          "german": "halt-"
        },
        {
          "id": "sh4",
          "english": "küssen (to kiss)",
          "german": "küss-"
        },
        {
          "id": "sh5",
          "english": "zeigen (to show)",
          "german": "zeig-"
        },
        {
          "id": "sh6",
          "english": "stehen (to stand)",
          "german": "steh-"
        }
      ],
      "target_answer": "setz-, sitz-, halt-, küss-, zeig-, steh-",
      "meaning": "stems of setzen, sitzen, halten, küssen, zeigen, stehen",
      "explanation": "Six new verbs, one old move: strip the -en and the stem stands naked — setz-, sitz-, halt-, küss-, zeig-, steh- — ready for any of the six endings."
    },
    {
      "id": "l901_e4",
      "type": "shift_select",
      "prompt": "Which form is WRONG?",
      "options": [
        "ich lernt",
        "er lernt",
        "ich lerne",
        "du lernst"
      ],
      "target_answer": "ich lernt",
      "meaning": "ich always takes -e on regular verbs",
      "explanation": "ich wears -e (lerne); lernt belongs to er and ihr. English never says 'I learns' either."
    },
    {
      "id": "l901_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We want to try things on and go for a stroll'",
      "target_answer": "Wir wollen anprobieren und spazieren",
      "meaning": "We want to try things on and go for a stroll",
      "vocab_hints": [
        {
          "word": "und",
          "translation": "and",
          "note": "ancient twin of English 'and'"
        }
      ],
      "word_bank": [
        "nach",
        "spazieren",
        "mit",
        "anprobieren",
        "Wir",
        "und",
        "wollen",
        "küssen"
      ],
      "explanation": "Two bare infinitives share one modal: wollen opens, anprobieren and spazieren ride inside — each keeps its full dictionary form in the bracket."
    }
  ],
  "summary": {
    "outcome": "Dissect any regular infinitive into its stem and rebuild all six persons.",
    "use_example": {
      "german": "Wir wollen anprobieren und spazieren.",
      "english": "We want to try things on and go for a stroll."
    },
    "takeaway": "Stem + six tiles (-e, -st, -t, -en, -t, -en) is the entire regular verb system — no tables needed.",
    "curiosity_teaser": "Next: the Thou -st Circuit — drill the Shakespearean ending across five verbs until it is muscle memory."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Stem Hunters (We want to try things on and go for a stroll):",
    "target_answer": "Wir wollen anprobieren und spazieren",
    "word_bank": [
      "und",
      "heute",
      "Wir",
      "anprobieren",
      "wollen",
      "spazieren",
      "nicht"
    ],
    "explanation": "Re-assembling \"Wir wollen anprobieren und spazieren\" from scratch locks in the structural pattern of Stem Hunters without relying on short-term echo."
  }
};

export default lesson;
