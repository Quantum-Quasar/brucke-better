import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 6,
  "slug": "k-to-ch-shift",
  "title": "The Velar Shift (K → CH)",
  "subtitle": "From make to machen, cook to kochen, and book to Buch",
  "phase": 1,
  "shift_categories": [
    "k_to_ch"
  ],
  "word_ids": [
    "machen",
    "kochen",
    "brechen",
    "sprechen",
    "suchen",
    "buch",
    "milch",
    "woche",
    "küche"
  ],
  "table_word_ids": [
    "machen",
    "kochen",
    "brechen",
    "sprechen",
    "suchen",
    "buch",
    "milch",
    "woche",
    "küche",
    "hals",
    "neun",
    "lamm",
    "handtuch",
    "frosch",
    "braut",
    "lügen"
  ],
  "hook": {
    "title": "The Ghost in the Throat",
    "content": "During the High German Consonant Shift, ancient Germanic voiceless stop 'k' softened into a breathy fricative written as 'ch'. While English kept the hard stop across the North Sea, German speakers moved the sound into the throat, turning make into machen and cook into kochen.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Velar Spirantization",
        "content": "Post-vocalic voiceless velar stop [k] relaxed into voiceless velar/palatal fricatives [x] and [ç]. One letter, two sounds, decided by the vowel before it."
      }
    ]
  },
  "pattern": {
    "title": "Ach-Laut vs. Ich-Laut: The Vowel Compass",
    "content": "German 'ch' produces two distinct sounds dictated entirely by the preceding vowel. After back vowels (a, o, u), the tongue pulls back into the throat to produce the rough 'Ach-Laut' [x] (as in Scottish loch: machen, kochen, Buch). After front vowels (e, i, ä, ö, ü) or consonants (l, r), the tongue arches forward to whisper the soft 'Ich-Laut' [ç] (identical to the first sound in English 'huge' or 'human': sprechen, brechen, Milch, Küche). English even kept this soft shift in noun-verb pairs: seek vs. beseech, and speak vs. speech!",
    "footnotes": [
      {
        "marker": "2",
        "title": "Palatal vs. Velar",
        "content": "Ach-Laut [x] follows back vowels; Ich-Laut [ç] follows front vowels and liquid consonants."
      },
      {
        "marker": "3",
        "title": "Say What You Read",
        "content": "German spells the way it sounds: each vowel letter holds one sound — the i of finden is short, like the i of English 'bit' — and the letter laws own the consonants, so every word you read tells you how to say it. When a cluster like the schl- of schlafen tangles on your tongue, slow down; the sounds sit together fine at half speed. And don't let regional accents shake you: you might hear a harder /ick/ in Berlin or an /ish/-tinged ich in the south — variants to recognize, never to learn."
      }
    ],
    "trap_note": "Your mind will offer: “German ch is one sound.” It is two, and the vowel *before* it decides which: after a, o, u it is the Scots ch of loch (Buch, machen); after i, e and the consonants it is the soft h of “hue” (ich, Milch). One letter, two sounds, one rule."
  },
  "exercises": [
    {
      "id": "l6_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German verb for 'to cook' using the K → CH shift (cook + en):",
      "tile_options": [
        "cook",
        "st",
        "koch",
        "en",
        "mach"
      ],
      "target_answer": "kochen",
      "meaning": "to cook",
      "shift_hint": "K → CH",
      "affirmation": "You melted the k into ch and hung the -en — cook is kochen, audible in your throat now.",
      "explanation": "Stem 'koch-' (medial K shifted to CH after back vowel 'o') + infinitive suffix '-en' = kochen."
    },
    {
      "id": "l6_e2",
      "type": "matching_pairs",
      "prompt": "Match the English K words to their German CH cognates. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "k1",
          "english": "seek / beseech",
          "german": "suchen"
        },
        {
          "id": "k2",
          "english": "speak / speech",
          "german": "sprechen"
        },
        {
          "id": "k3",
          "english": "book",
          "german": "Buch"
        },
        {
          "id": "k4",
          "english": "milk",
          "german": "Milch"
        },
        {
          "id": "recall1",
          "german": "das Salz",
          "english": "the salt"
        }
      ],
      "target_answer": "suchen, sprechen, Buch, Milch, das Salz",
      "meaning": "seek / beseech; speak / speech; book; milk; the salt",
      "shift_hint": "K → CH",
      "explanation": "Medial and final English K regularly shifts to German CH ([x] after back vowels, [ç] after front vowels and consonants)."
    },
    {
      "id": "l6_e3",
      "type": "shift_select",
      "prompt": "One of these familiar pairs works differently. Which one?",
      "options": [
        "sleep → schlafen",
        "water → Wasser",
        "hope → hoffen",
        "help → helfen"
      ],
      "target_answer": "water → Wasser",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Hope, help and sleep use P → F/FF. Water → Wasser uses T → SS."
    },
    {
      "id": "l6_e4",
      "type": "derive",
      "prompt": "Apply the K → CH shift: English 'to make' → German verb:",
      "english_hint": "ma·k·e → ma·ch·en",
      "shift_hint": "K → CH",
      "affirmation": "You heard make soften to machen — the ghost in the throat, found again.",
      "target_answer": "machen",
      "meaning": "to make / to do",
      "explanation": "Voiceless stop K shifted to velar fricative CH + infinitive suffix -en."
    },
    {
      "id": "l6_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "you walk in on a friend cooking and ask what they're doing in the kitchen",
      "cues": [
        "Ask with was: W-word first, verb in position 2 — was machst du",
        "make → mach- (K → CH) + the thou-ending: machst",
        "The kitchen carries the same shift: in der Küche"
      ],
      "target_answer": "Was machst du in der Küche",
      "meaning": "What are you doing in the kitchen?",
      "vocab_hints": [
        {
          "word": "Was",
          "translation": "what",
          "note": "T → S shift: what ↔ was"
        },
        {
          "word": "machst",
          "translation": "do / make (2nd person)",
          "note": "K → CH shift: make ↔ mach + Shakespearean -st"
        },
        {
          "word": "Küche",
          "translation": "kitchen",
          "note": "K → CH shift: kitchen ↔ Küche"
        }
      ],
      "word_bank": [
        "du",
        "der",
        "machst",
        "in",
        "kochst",
        "Was",
        "Küche"
      ],
      "explanation": "Question order: W-word, verb in position 2, subject, then the place — the frame you just built, from a thought."
    }
  ],
  "summary": {
    "outcome": "Recognize common k and ch cognates and ask a simple question about an activity.",
    "use_example": {
      "german": "Was machst du in der Küche?",
      "english": "What are you doing in the kitchen?"
    },
    "takeaway": "English 'k' after vowels systematically softens to German 'ch' ([x] after a/o/u, [ç] after e/i/ä/ö/ü).",
    "curiosity_teaser": "Next: the kitchen & book set — Küche, Buch, Milch, suchen: and the seek/beseech proof that English ran this shift too."
  },
  "twist": {
    "prompt": "Same question, sharper nose: what are you COOKING in the kitchen? (Same shift, different root.)",
    "target_answer": "Was kochst du in der Küche",
    "word_bank": [
      "Küche",
      "kochst",
      "der",
      "in",
      "Was",
      "machst",
      "du"
    ],
    "explanation": "machen → kochen, the same K → CH receipt: machst → kochst. The question frame doesn't move — only the root changes."
  }
};

export default lesson;
