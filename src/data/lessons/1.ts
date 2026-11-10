import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1,
  "slug": "germanic-core",
  "title": "The Germanic Core",
  "subtitle": "Hundreds of German words you already know without realizing it",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "lernen",
    "finden",
    "kommen",
    "gehen",
    "singen",
    "schwimmen",
    "bringen",
    "arm",
    "hand",
    "finger"
  ],
  "table_word_ids": [
    "lernen",
    "finden",
    "kommen",
    "gehen",
    "singen",
    "schwimmen",
    "bringen",
    "arm",
    "hand",
    "finger",
    "decke",
    "nächste",
    "schmal",
    "buche",
    "zeitschrift",
    "gesundheit"
  ],
  "hook": {
    "title": "You Don't Start from Zero",
    "content": "You already know a little German: Hand means \"hand,\" and Finger means \"finger.\" Say them aloud.\n\nNow try lernen — \"to learn.\" Build it from lern + en, then use it in a sentence. The familiar words are your starting point; the history can wait.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Proto-Germanic Roots",
        "content": "Spoken roughly 500 BC to 500 AD across southern Scandinavia and northern Germany before expanding westward into the British Isles."
      }
    ]
  },
  "pattern": {
    "title": "The Universal -en Infinitive",
    "content": "In English, we mark dictionary verbs with the preposition 'to' (to learn, to find, to sing). German does something cleaner: it attaches the suffix '-en' directly onto the end of the root. Strip '-en' and you find the English word staring right back at you.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The Living English -en Suffix",
        "content": "English still uses Germanic -en to turn words into verbs: bright → brighten, short → shorten, deep → deepen, wide → widen. German simply kept -en on all dictionary verbs!"
      }
    ],
    "linguist_note": "Old English also possessed the infinitive suffix -an (e.g. singan, findan), which was gradually leveled to -en in Middle English and completely dropped during the Early Modern English period."
  },
  "exercises": [
    {
      "id": "l1_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German infinitive for 'to learn' (learn + en):",
      "tile_options": [
        "st",
        "lern",
        "en",
        "komm"
      ],
      "target_answer": "lernen",
      "meaning": "to learn",
      "explanation": "Stem 'lern-' + infinitive ending '-en' = lernen."
    },
    {
      "id": "l1_e2",
      "type": "matching_pairs",
      "prompt": "Match each English verb with its German -en twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "come",
          "german": "kommen"
        },
        {
          "id": "p2",
          "english": "find",
          "german": "finden"
        },
        {
          "id": "p3",
          "english": "sing",
          "german": "singen"
        },
        {
          "id": "p4",
          "english": "swim",
          "german": "schwimmen"
        },
        {
          "id": "p5",
          "english": "arm",
          "german": "Arm"
        },
        {
          "id": "p6",
          "english": "finger",
          "german": "Finger"
        }
      ],
      "target_answer": "kommen, finden, singen, schwimmen, Arm, Finger",
      "meaning": "to come, to find, to sing, to swim, arm, finger",
      "explanation": "German attaches the universal infinitive suffix -en to Germanic verb roots."
    },
    {
      "id": "l1_e3",
      "type": "derive",
      "prompt": "Apply the -en rule: English 'to bring' → German verb:",
      "english_hint": "bring + en",
      "target_answer": "bringen",
      "meaning": "to bring",
      "explanation": "Stem 'bring-' + infinitive ending '-en' = bringen."
    },
    {
      "id": "l1_e4",
      "type": "reverse_cognate",
      "prompt": "What native English verb shares the exact root of 'singen'?",
      "target_answer": "sing",
      "meaning": "to sing (twin of German singen)",
      "explanation": "German 'singen' is the direct twin of English 'to sing'."
    },
    {
      "id": "l1_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I learn German with Brücke'",
      "target_answer": "Ich lerne Deutsch mit Brücke",
      "meaning": "I learn German with Brücke",
      "vocab_hints": [
        {
          "word": "mit",
          "translation": "with",
          "note": "cognate with archaic English 'mid' in 'midwife' (literally: with-woman)"
        },
        {
          "word": "Brücke",
          "translation": "bridge",
          "note": "English softened Germanic -ck- into -dge (Brücke ↔ bridge, Rücken ↔ ridge, Ecke ↔ edge)"
        },
        {
          "word": "Deutsch",
          "translation": "German",
          "note": "same word as 'Dutch' in 'Pennsylvania Dutch' (German settlers in America who spoke Deutsch)"
        }
      ],
      "word_bank": [
        "lerne",
        "das",
        "mit",
        "heute",
        "Deutsch",
        "Ich",
        "Brücke"
      ],
      "explanation": "Verb in Position 2: 'Ich lerne...'. 'mit' means with (as in midwife), and 'Brücke' is bridge (cognate with ridge/Rücken)."
    }
  ],
  "summary": {
    "outcome": "Recognize familiar German infinitives and use one in a simple sentence.",
    "use_example": {
      "german": "Ich lerne Deutsch mit Brücke.",
      "english": "I learn German with Brücke."
    },
    "takeaway": "Whenever you see a German verb ending in -en, strip the ending to look for the English root.",
    "curiosity_teaser": "Next up: the Hidden Twins — Arm, Hand, Finger, Haus, Brot: the zero-shift words you already own, waiting to be recognized."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The Germanic Core (I learn German with Brücke):",
    "target_answer": "Ich lerne Deutsch mit Brücke",
    "word_bank": [
      "lerne",
      "Ich",
      "heute",
      "nicht",
      "mit",
      "Brücke",
      "Deutsch"
    ],
    "explanation": "Re-assembling \"Ich lerne Deutsch mit Brücke\" from scratch locks in the structural pattern of The Germanic Core without relying on short-term echo."
  }
};

export default lesson;
