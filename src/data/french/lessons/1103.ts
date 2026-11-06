import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1103,
  "slug": "sprig-1103",
  "title": "BAGS: Adjectives Before the Noun",
  "subtitle": "Beauty, Age, Goodness, Size (beau, jeune, bon, petit, grand, nouveau) — the high-frequency rebels that step in front.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "beau",
    "joli",
    "jeune",
    "vieux",
    "bon",
    "petit",
    "grand",
    "nouveau",
    "ville",
    "hôtel",
    "restaurant"
  ],
  "table_word_ids": [
    "beau",
    "joli",
    "jeune",
    "vieux",
    "bon",
    "petit",
    "grand",
    "nouveau",
    "ville",
    "hôtel",
    "restaurant"
  ],
  "hook": {
    "title": "Why Short Everyday Adjectives Step in Front: BAGS",
    "content": "Colors and specific descriptions follow the noun (un café noir). Only one small club of short, everyday adjectives steps IN FRONT of the noun — remembered by BAGS: Beauty (beau, joli), Age (jeune, vieux, nouveau), Goodness (bon, mauvais), and Size (grand, petit)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why beau, nouveau, and vieux wear an -l coat before masculine vowels",
        "content": "Before a masculine noun starting with a vowel or mute H (ami, homme, hôtel), beau, nouveau, and vieux use bel, nouvel, vieil so the final /l/ links smoothly: un bel hôtel, un nouvel ami, un vieil homme!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "BAGS in Front, Colors in Back",
    "content": "Put BAGS between the article and the noun (une belle ville, un bon restaurant), and flank the noun when combining BAGS + color (une petite maison blanche).",
    "linguist_note": "Pre-nominal placement is restricted to a closed class of short evaluative adjectives.",
    "trap_note": "Never write *un beau hôtel — before a masculine vowel or mute H, use bel, nouvel, vieil (un bel hôtel)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each BAGS adjective with its feminine form and prevocalic masculine form:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "beau → belle (bel before m. vowel)",
          "german": "Beauty: beautiful / handsome"
        },
        {
          "id": "p2",
          "english": "nouveau → nouvelle (nouvel before m. vowel)",
          "german": "Age: new"
        },
        {
          "id": "p3",
          "english": "vieux → vieille (vieil before m. vowel)",
          "german": "Age: old"
        },
        {
          "id": "p4",
          "english": "joli → jolie",
          "german": "Beauty: pretty"
        },
        {
          "id": "p5",
          "english": "jeune → jeune (invariable)",
          "german": "Age: young"
        }
      ],
      "target_answer": "Beauty: beautiful / handsome, Age: new, Age: old, Beauty: pretty, Age: young",
      "meaning": "beau → belle (bel before m. vowel), nouveau → nouvelle (nouvel before m. vowel), vieux → vieille (vieil before m. vowel), joli → jolie, jeune → jeune (invariable)",
      "explanation": "bel/belle, nouvel/nouvelle, and vieil/vieille sound identical in the mouth!",
      "id": "fr1103_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word French order of 'Une petite maison blanche'?",
      "german": "Une petite maison blanche",
      "natural": "A small white house",
      "options": [
        "A small house white",
        "A small white house",
        "A house small white"
      ],
      "target_answer": "A small house white",
      "meaning": "Literal structure: A small house white",
      "explanation": "Size (petite, BAGS) steps in front of maison, while color (blanche) stays behind it!",
      "id": "fr1103_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'a beautiful hotel' (l'hôtel is masculine and starts with a mute H)?",
      "options": [
        "un beau hôtel",
        "un bel hôtel",
        "un hôtel beau"
      ],
      "target_answer": "un bel hôtel",
      "meaning": "a beautiful hotel",
      "explanation": "Before a masculine vowel/mute-H noun, beau becomes bel: un bel hôtel!",
      "id": "fr1103_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "it is a beautiful city and a good restaurant",
      "cues": [
        "It is a beautiful city → C'est une belle ville",
        "and a good restaurant → et un bon restaurant"
      ],
      "idea_parts": [
        "first noun phrase → C'est une belle ville",
        "second noun phrase → et un bon restaurant"
      ],
      "target_answer": "C'est une belle ville et un bon restaurant",
      "meaning": "It is a beautiful city and a good restaurant",
      "word_bank": [
        "restaurant",
        "bon",
        "la",
        "ville",
        "une",
        "et",
        "C'est",
        "un",
        "beau",
        "belle"
      ],
      "explanation": "Both belle and bon belong to BAGS and precede their nouns.",
      "diagnosis": {
        "slip": "placed belle or bon after the noun",
        "cue": "BAGS adjectives precede the noun: une belle ville, un bon restaurant."
      },
      "id": "fr1103_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est un nouveau restaurant dans une jolie ville",
      "replays": 2,
      "target_answer": "C'est un nouveau restaurant dans une jolie ville",
      "meaning": "It's a new restaurant in a pretty town",
      "cues": [
        "un nouveau restaurant",
        "dans une jolie ville"
      ],
      "explanation": "Both nouveau (Age) and jolie (Beauty) step in front of their nouns.",
      "affirmation": "You placed both nouveau and jolie before their nouns.",
      "id": "fr1103_e5"
    }
  ],
  "summary": {
    "outcome": "Place BAGS adjectives before the noun and use bel/nouvel/vieil before masculine vowels.",
    "use_example": {
      "german": "Un petit café noir dans un bel hôtel.",
      "english": "A small black coffee in a beautiful hotel."
    },
    "takeaway": "BAGS steps in front, colors stay in back — and beau/nouveau/vieux wear -l before a masculine vowel.",
    "curiosity_teaser": "Up next on Le Pont ([12] The Near Future): see how BAGS: Adjectives Before the Noun leads directly into The Near Future."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"It is a beautiful city and a good restaurant\" in French:",
    "target_answer": "C'est une belle ville et un bon restaurant",
    "word_bank": [
      "C'est",
      "ne",
      "une",
      "ville",
      "pas",
      "un",
      "bon",
      "belle",
      "et",
      "restaurant"
    ],
    "explanation": "Re-constructing \"C'est une belle ville et un bon restaurant\" from the underlying rule cements the pattern of BAGS: Adjectives Before the Noun."
  }
};

export default lesson;
