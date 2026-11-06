import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5151,
  "slug": "lesson-5151",
  "title": "La Tête, La Main & Le Cœur",
  "subtitle": "Expressing aches with avoir mal à la tête and definite articles with body parts.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "tête",
    "main",
    "cœur",
    "avoir",
    "jai",
    "à",
    "au",
    "la",
    "le"
  ],
  "table_word_ids": [
    "tête",
    "main",
    "cœur",
    "avoir",
    "jai",
    "à",
    "au",
    "la",
    "le"
  ],
  "hook": {
    "title": "The Body & Aches: La Tête, La Main, Le Cœur & Avoir mal à",
    "content": "Meet three core body nouns with English cognates: la tête ('head', ê = lost s of Old French teste, preserved in 'testy'), la main ('hand' ↔ manual/manuscript), and le cœur ('heart' ↔ core/courage). To say something hurts, French uses avoir mal à + definite article: J'ai mal à la tête ('I have a headache')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'tête' wears a circumflex hat (ê)",
        "content": "Old French spelled it teste (from Latin testa); when the s before t fell silent, French crowned the e with a circumflex: la tête!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "avoir mal + à la (f.) / au (m.) / aux (pl.) + Body Part",
    "content": "Use J'ai mal à + definite article + body part.",
    "linguist_note": "Inalienable body-part location in French pain idioms uses avoir mal + à + definite article.",
    "trap_note": "Never say *J'ai mal à ma tête — always use the definite article: J'ai mal à la tête!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each body word or expression with its English meaning and cognate:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "la tête (circumflex ê = lost s)",
          "german": "the head (testy / tête-à-tête)"
        },
        {
          "id": "p2",
          "english": "la main (Latin manus)",
          "german": "the hand (manual / manuscript)"
        },
        {
          "id": "p3",
          "english": "le cœur (Latin cor)",
          "german": "the heart (core / courage)"
        },
        {
          "id": "p4",
          "english": "J'ai mal à la tête",
          "german": "I have a headache (lit. I have pain at the head)"
        },
        {
          "id": "p5",
          "english": "J'ai mal à la main",
          "german": "My hand hurts"
        }
      ],
      "target_answer": "the head (testy / tête-à-tête), the hand (manual / manuscript), the heart (core / courage), I have a headache (lit. I have pain at the head), My hand hurts",
      "meaning": "la tête (circumflex ê = lost s), la main (Latin manus), le cœur (Latin cor), J'ai mal à la tête, J'ai mal à la main",
      "explanation": "avoir mal à always uses the definite article (à la, au, aux) before the body part.",
      "id": "fr5151_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French la main ('the hand', from Latin manus) shares its root with which English adjective meaning 'done by hand (rather than automatically)'?",
      "target_answer": "manual",
      "meaning": "manual / manuscript / manufacture ↔ la main ('the hand')",
      "explanation": "Manual is 'by hand', manuscript is 'written by hand', and manufacture is 'made by hand'!",
      "id": "fr5151_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'J'ai mal à la tête'?",
      "german": "J'ai mal à la tête",
      "natural": "I have a headache",
      "options": [
        "I am bad in my head",
        "I have pain at the head",
        "I have a headache"
      ],
      "target_answer": "I have pain at the head",
      "meaning": "Literal structure: I have pain at the head",
      "explanation": "J'ai ('I have') + mal ('pain/ache') + à la tête ('at the head').",
      "id": "fr5151_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I have a headache today (using J'ai mal à la tête aujourd'hui)",
      "cues": [
        "I have pain at the head → J'ai mal à la tête",
        "today → aujourd'hui"
      ],
      "idea_parts": [
        "ache idiom → J'ai mal à la tête",
        "time → aujourd'hui"
      ],
      "target_answer": "J'ai mal à la tête aujourd'hui",
      "meaning": "I have a headache today",
      "word_bank": [
        "tête",
        "J'ai",
        "ma",
        "la",
        "à",
        "le",
        "aujourd'hui",
        "mal"
      ],
      "explanation": "Use à la tête (never *à ma tête).",
      "diagnosis": {
        "slip": "used ma instead of la",
        "cue": "Body parts with avoir mal à take the definite article: à la tête."
      },
      "id": "fr5151_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Elle a bon cœur et elle me donne la main",
      "replays": 2,
      "target_answer": "Elle a bon cœur et elle me donne la main",
      "meaning": "She has a good heart and she gives me her hand",
      "cues": [
        "Elle a bon cœur",
        "et elle me donne la main"
      ],
      "explanation": "elle me donne la main uses the definite article la.",
      "affirmation": "You wrote bon cœur and la main cleanly.",
      "id": "fr5151_e5"
    }
  ],
  "summary": {
    "outcome": "Name key body parts (la tête, la main, le cœur) and express aches using avoir mal à + definite article.",
    "use_example": {
      "german": "Je ne peux pas venir parce que j'ai mal à la tête.",
      "english": "I can't come because I have a headache."
    },
    "takeaway": "Headache = J'ai mal à la tête (never *ma tête).",
    "curiosity_teaser": "Up next on Le Pont ([5152] Le Manteau & La Robe): see how La Tête, La Main & Le Cœur leads directly into Le Manteau & La Robe."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I have a headache today\" in French:",
    "target_answer": "J'ai mal à la tête aujourd'hui",
    "word_bank": [
      "à",
      "aujourd'hui",
      "J'ai",
      "pas",
      "mal",
      "ne",
      "tête",
      "la"
    ],
    "explanation": "Re-constructing \"J'ai mal à la tête aujourd'hui\" from the underlying rule cements the pattern of La Tête, La Main & Le Cœur."
  }
};

export default lesson;
