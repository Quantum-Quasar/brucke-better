import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5021,
  "slug": "nasal-clinic",
  "title": "Think the N",
  "subtitle": "The four nasal vowels: on, en, an, in — the sound of not arriving",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "pain",
    "vingt",
    "bon",
    "on",
    "ne"
  ],
  "table_word_ids": [
    "pain",
    "vingt",
    "bon",
    "on",
    "ne"
  ],
  "hook": {
    "title": "The Sound of Not Saying",
    "content": "French's most foreign sound is an absence. In pain (bread), vingt (twenty), bon (good), on (we), the N is written and never pronounced — but you must still think it. The vowel leans toward the N and stops: that lean IS the nasal vowel. We don't 'drop' the N; we don't arrive at it.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French did this",
        "content": "Latin vowels before N/M swallowed the consonant into the vowel itself: panem → pain, bonum → bon. The consonant became breath. English did it too — once: think of the 'nasal' in 'sing', where the G is written and not said.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Four Colors of Not-Arriving",
    "content": "on /ɔ̃/ as in bon, mon — the mouth rounds and hums. an/en /ɑ̃/ as in pain's cousin enfant, très bien's bien — the mouth opens low. in/ain /ɛ̃/ as in pain, vin, main — the mouth spreads. (The fourth, un /œ̃/, is merging with in for most speakers.) Same technique for all: shape the vowel, start toward the N, stop.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The test word",
        "content": "Say 'singing' in English — the final -ing where the G never lands. That unfinished feeling is the nasal vowel. French just does it in four colors.",
        "interest": true
      }
    ],
    "trap_note": "Don't actually say the N: pain said with a hard N becomes 'pen' and nobody hears bread. The N is a direction, not a destination."
  },
  "exercises": [
    {
      "id": "fr5021_e1",
      "type": "matching_pairs",
      "prompt": "Match each nasal word with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "bread",
          "german": "le pain"
        },
        {
          "id": "p2",
          "english": "twenty",
          "german": "vingt"
        },
        {
          "id": "p3",
          "english": "good",
          "german": "bon"
        },
        {
          "id": "p4",
          "english": "we (informal)",
          "german": "on"
        }
      ],
      "target_answer": "le pain, vingt, bon, on",
      "meaning": "the nasal shelf",
      "explanation": "All four wear a silent N — and all four lean into it."
    },
    {
      "id": "fr5021_e2",
      "type": "shift_select",
      "prompt": "Which word does NOT have a nasal vowel?",
      "options": [
        "pain",
        "vin",
        "rouge",
        "bonjour"
      ],
      "target_answer": "rouge",
      "meaning": "rouge — no N, no nasal",
      "explanation": "rouge's /ʒ/ is a full consonant. pain, bonjour (bon+jour), vin all lean toward a silent N."
    },
    {
      "id": "fr5021_e3",
      "type": "derive",
      "prompt": "Pronunciation map: which syllable contains the nasal vowel in 'bonjour'?",
      "english_hint": "the first syllable",
      "target_answer": "bon",
      "meaning": "the nasal vowel is inside bon- — and the N never lands",
      "explanation": "bon /bɔ̃/ + jour /ʒuʁ/. The first syllable hums; the second is clean."
    },
    {
      "id": "fr5021_e3b",
      "type": "syntax_builder",
      "prompt": "Assemble the two-nasal sentence: 'The bread is good'",
      "target_answer": "Le pain est bon",
      "meaning": "The bread is good",
      "word_bank": [
        "bonne",
        "la",
        "est",
        "Le",
        "bon",
        "pain"
      ],
      "explanation": "pain (/pɛ̃/) and bon (/bɔ̃/) both lean toward a silent N without landing on it."
    },
    {
      "id": "fr5021_e4",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le pain est bon",
      "replays": 2,
      "target_answer": "Le pain est bon",
      "meaning": "The bread is good",
      "cues": [
        "pain — the ɛ̃ nasal: spread the mouth, don't land on the N",
        "est — clean, no nasal",
        "bon — the ɔ̃ nasal: round and hum"
      ],
      "explanation": "Two nasals guarding one clean est between them.",
      "affirmation": "Both Ns were directions, not destinations — that's the whole clinic."
    }
  ],
  "summary": {
    "outcome": "Produce the four nasal vowels by leaning toward the N without arriving — in pain, vingt, bon, on.",
    "use_example": {
      "german": "Le pain est bon, on y va.",
      "english": "The bread is good — shall we?"
    },
    "takeaway": "The N is a direction, not a destination. Unfinished is correct.",
    "curiosity_teaser": "Up next on Le Pont ([5031] Actuellement, Librairie & Co.): see how Think the N leads directly into Actuellement, Librairie & Co.."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The bread is good\" in French:",
    "target_answer": "Le pain est bon",
    "word_bank": [
      "est",
      "pas",
      "bon",
      "pain",
      "ne",
      "Le"
    ],
    "explanation": "Re-constructing \"Le pain est bon\" from the underlying rule cements the pattern of Think the N."
  }
};

export default lesson;
