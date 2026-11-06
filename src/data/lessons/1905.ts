import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1905,
  "slug": "konnte-musste-frozen-pasts",
  "title": "konnte, musste & the Frozen Pasts",
  "subtitle": "The preterite-present modals: konnte↔could, musste↔must — English froze their pasts into presents",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "können",
    "müssen",
    "dürfen",
    "sollen",
    "wollen",
    "wissen",
    "wünschen",
    "schlagen",
    "stehlen",
    "jung",
    "stark",
    "schwach",
    "gesund"
  ],
  "table_word_ids": [
    "können",
    "müssen",
    "dürfen",
    "sollen",
    "wollen",
    "wissen",
    "wünschen",
    "schlagen",
    "stehlen",
    "jung",
    "stark",
    "schwach",
    "gesund",
    "obwohl",
    "japanisch"
  ],
  "hook": {
    "title": "Pasts Wearing Present Clothes",
    "content": "The six modal verbs are linguistic fossils with a scientific name: preterite-presents. Thousands of years ago their -te forms WERE past tenses — 'I could' meant 'I have been able'. Speakers re-read those pasts as presents, and the modals have lived in the present ever since. English did the exact same freeze and never thawed it: can and could are the same ancient word in two tenses, so are shall/should and will/would. And must? Must IS the old past tense of 'to matter' — grammatically a past that never left. German kept the whole system running: the modals' past tense is rebuilt with the ordinary dental -te — konnte, musste, durfte, sollte, wollte, wusste — one stem for every person, no vowel games at all.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "wist: the KJV Fossil",
        "content": "English kept one frozen past as late as 1611: the King James Bible's 'they knew not nor wist' — wist is the old past of wit 'to know', the exact twin of German wusste. German wisst (you all know) and wissen still wear the same s that English buried."
      }
    ]
  },
  "pattern": {
    "title": "One Weak Past, Six Ways",
    "content": "können → konnte ↔ could; müssen → musste ↔ must/had to; dürfen → durfte ↔ was allowed (archaic English durst!); sollen → sollte ↔ should; wollen → wollte ↔ wanted to; wissen → wusste ↔ knew (wist). Conjugation is boring on purpose: ich/er konnte, du konntest, wir konnten — one past stem for everybody, the dental -te doing all the work. And the bracket rule rides along: the bare infinitive stays at the end — Ich konnte nicht kommen, Ich musste gestern arbeiten, Wir wollten nach Berlin. Watch the trap: the double L of wollen survives into the past — wollte, du wolltest, wir wollten. Spell it with ll every time.",
    "footnotes": [],
    "linguist_note": "Preterite-presents go back to Proto-Indo-European perfect forms — old stative 'has-been-able' constructions re-anchored to the present. That is why the modals have no -en infinitive stress and no ge- participle in older speech: they were never ordinary verbs."
  },
  "exercises": [
    {
      "id": "l1905_e1",
      "type": "matching_pairs",
      "prompt": "The frozen pasts — match each German modal past with its English twin:",
      "matching_pairs": [
        {
          "id": "fp1",
          "english": "I could / was able",
          "german": "ich konnte"
        },
        {
          "id": "fp2",
          "english": "I had to",
          "german": "ich musste"
        },
        {
          "id": "fp3",
          "english": "I wanted to",
          "german": "ich wollte"
        },
        {
          "id": "fp4",
          "english": "I knew",
          "german": "ich wusste"
        },
        {
          "id": "fp5",
          "english": "I was allowed",
          "german": "ich durfte"
        }
      ],
      "target_answer": "ich konnte, ich musste, ich wollte, ich wusste, ich durfte",
      "meaning": "I could, I had to, I wanted to, I knew, I was allowed",
      "explanation": "can/could, shall/should, will/would — English froze the same preterite-presents; musste is must's own frozen past, and durfte wears the weak dental -te like wollte."
    },
    {
      "id": "l1905_e2",
      "type": "shift_select",
      "prompt": "Bracket check: 'Ich _____ nicht kommen.' (I couldn't come):",
      "options": [
        "kann",
        "können",
        "konnte",
        "konnten"
      ],
      "target_answer": "konnte",
      "meaning": "Ich konnte nicht kommen = I couldn't come",
      "explanation": "ich/er konnte — one past stem for every person, with the bare infinitive kommen at the bracket's end."
    },
    {
      "id": "l1905_e3",
      "type": "shift_select",
      "prompt": "'Ich _____ gestern arbeiten.' (I had to work yesterday):",
      "options": [
        "musst",
        "müssen",
        "muss",
        "musste"
      ],
      "target_answer": "musste",
      "meaning": "Ich musste gestern arbeiten = I had to work yesterday",
      "explanation": "must has no living past of its own — but German musste is that past, still working."
    },
    {
      "id": "l1905_e4",
      "type": "reverse_cognate",
      "prompt": "wusste is the frozen past of which verb — the German 'to know'?",
      "target_answer": "wissen",
      "meaning": "wissen → wusste (the frozen know-past)",
      "explanation": "wissen freezes to wusste exactly as können freezes to konnte and müssen to musste — one weak -te past, one stem. schlagen and stehlen freeze differently — schlug, stahl — the ablaut melodies again."
    },
    {
      "id": "l1905_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the bracket: 'I couldn't come yesterday'",
      "target_answer": "Ich konnte gestern nicht kommen",
      "meaning": "Ich konnte gestern nicht kommen = I couldn't come yesterday",
      "vocab_hints": [
        {
          "word": "konnte",
          "translation": "could / was able",
          "note": "können's simple past — one stem, all persons"
        }
      ],
      "word_bank": [
        "auf",
        "nicht",
        "kommen",
        "gestern",
        "oder",
        "Ich",
        "konnte"
      ],
      "explanation": "Modal past in position 2, bare infinitive at the end — the bracket survives the trip into the past intact."
    }
  ],
  "summary": {
    "outcome": "Use konnte, musste, durfte, sollte, wollte and wusste, and explain the preterite-present freeze behind English could/should/would.",
    "use_example": {
      "german": "Ich wollte kommen, aber ich musste arbeiten.",
      "english": "I wanted to come, but I had to work."
    },
    "takeaway": "The modals are frozen pasts: konnte↔could, musste↔must, sollte↔should, wollte↔would, wusste↔wist — one weak -te past, one stem.",
    "curiosity_teaser": "Next: the dative case — methinks, mir and the giving case."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from konnte, musste & the Frozen Pasts (Ich konnte gestern nicht kommen = I couldn't come yesterday):",
    "target_answer": "Ich konnte gestern nicht kommen",
    "word_bank": [
      "nicht",
      "kommen",
      "gestern",
      "heute",
      "Ich",
      "konnte"
    ],
    "explanation": "Re-assembling \"Ich konnte gestern nicht kommen\" from scratch locks in the structural pattern of konnte, musste & the Frozen Pasts without relying on short-term echo."
  }
};

export default lesson;
