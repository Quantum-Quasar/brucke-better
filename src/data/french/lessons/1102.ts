import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1102,
  "slug": "sprig-1102",
  "title": "Color & Size Gym",
  "subtitle": "Le jardin vert, la maison blanche — adjective placement after the noun.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "vert",
    "blanc",
    "bleu",
    "rouge",
    "noir",
    "jaune",
    "grand",
    "petit",
    "jardin",
    "maison",
    "table"
  ],
  "table_word_ids": [
    "vert",
    "blanc",
    "bleu",
    "rouge",
    "noir",
    "jaune",
    "grand",
    "petit",
    "jardin",
    "maison",
    "table"
  ],
  "hook": {
    "title": "Painting Nouns From Behind: Colors After the Noun",
    "content": "Color adjectives sit AFTER the noun they paint (un jardin vert, un café noir), while size adjectives (grand, petit) step IN FRONT of the noun — flanking it like bookends: un petit café noir ('a small black coffee'), un grand jardin vert ('a big green garden')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why rouge and jaune are gender-free in the singular",
        "content": "Because rouge and jaune already end in -e, they never change spelling between masculine and feminine singular!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Size in Front (BAGS) + Color in Back",
    "content": "Flank the noun when combining size and color.",
    "linguist_note": "French splits modifiers into pre-nominal evaluative/size adjectives and post-nominal color adjectives.",
    "trap_note": "Never stack both size and color before the noun (*un petit noir café) — split them around the noun: un petit café noir!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English noun phrase with its French bookend order:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "a small black coffee",
          "german": "un petit café noir"
        },
        {
          "id": "p2",
          "english": "a big green garden",
          "german": "un grand jardin vert"
        },
        {
          "id": "p3",
          "english": "a small red table",
          "german": "une petite table rouge"
        },
        {
          "id": "p4",
          "english": "a big white house",
          "german": "une grande maison blanche"
        },
        {
          "id": "p5",
          "english": "the yellow flower",
          "german": "la fleur jaune"
        }
      ],
      "target_answer": "un petit café noir, un grand jardin vert, une petite table rouge, une grande maison blanche, la fleur jaune",
      "meaning": "a small black coffee, a big green garden, a small red table, a big white house, the yellow flower",
      "explanation": "Size precedes the noun; color follows the noun.",
      "id": "fr1102_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word French order of 'Un petit café noir'?",
      "german": "Un petit café noir",
      "natural": "A small black coffee",
      "options": [
        "A coffee small black",
        "A small coffee black",
        "A small black coffee"
      ],
      "target_answer": "A small coffee black",
      "meaning": "Literal structure: A small coffee black",
      "explanation": "petit (Size) goes before café; noir (Color) goes after café.",
      "id": "fr1102_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which color adjective below does NOT change spelling between masculine and feminine?",
      "options": [
        "blanc",
        "vert",
        "rouge (and jaune)"
      ],
      "target_answer": "rouge (and jaune)",
      "meaning": "Already ends in -e in the masculine!",
      "explanation": "un manteau rouge / une robe rouge — identical!",
      "id": "fr1102_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want a small black coffee",
      "cues": [
        "I want → Je veux",
        "a small coffee black → un petit café noir"
      ],
      "idea_parts": [
        "verb → Je veux",
        "size + noun + color → un petit café noir"
      ],
      "target_answer": "Je veux un petit café noir",
      "meaning": "I want a small black coffee",
      "word_bank": [
        "Je",
        "un",
        "petit",
        "noir",
        "noire",
        "veux",
        "café",
        "la"
      ],
      "explanation": "petit stands before café and noir stands after it.",
      "diagnosis": {
        "slip": "put noir before café",
        "cue": "Flank café with petit in front and noir in back: un petit café noir."
      },
      "id": "fr1102_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est un grand jardin vert",
      "replays": 2,
      "target_answer": "C'est un grand jardin vert",
      "meaning": "It is a big green garden",
      "cues": [
        "C'est",
        "un grand jardin vert"
      ],
      "explanation": "grand precedes jardin; vert follows jardin.",
      "affirmation": "You flanked jardin with grand and vert cleanly.",
      "id": "fr1102_e5"
    }
  ],
  "summary": {
    "outcome": "Position color adjectives after the noun and flank nouns with BAGS size adjectives in front and colors in back.",
    "use_example": {
      "german": "Elle habite dans une petite maison jaune.",
      "english": "She lives in a small yellow house."
    },
    "takeaway": "Size in front, color in back: un petit café noir.",
    "curiosity_teaser": "Up next on Le Pont ([1103] BAGS: Adjectives Before the Noun): see how Color & Size Gym leads directly into BAGS: Adjectives Before the Noun."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want a small black coffee\" in French:",
    "target_answer": "Je veux un petit café noir",
    "word_bank": [
      "noir",
      "ne",
      "café",
      "pas",
      "veux",
      "un",
      "petit",
      "Je"
    ],
    "explanation": "Re-constructing \"Je veux un petit café noir\" from the underlying rule cements the pattern of Color & Size Gym."
  }
};

export default lesson;
