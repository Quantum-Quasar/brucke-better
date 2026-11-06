import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 6,
  "slug": "ite-and-ance-bridges",
  "title": "The -ité & -ance Bridges",
  "subtitle": "English -ity becomes -ité, -ance/-ence stays whole — and every single one takes la",
  "phase": 1,
  "shift_categories": [
    "ite",
    "ance"
  ],
  "word_ids": [
    "université",
    "possibilité",
    "liberté",
    "réalité",
    "qualité",
    "différence",
    "importance",
    "expérience",
    "patience",
    "chance"
  ],
  "table_word_ids": [
    "université",
    "possibilité",
    "liberté",
    "réalité",
    "qualité",
    "différence",
    "importance",
    "expérience",
    "patience",
    "chance"
  ],
  "hook": {
    "title": "Two More Floors of the Feminine Warehouse",
    "content": "In Topic 2 you unlocked thousands of feminine nouns ending in -ion. Today you add two more massive floors to that same building: English words ending in -ity (university, possibility, liberty, reality, quality) swap -ity for -ité (l'université, la possibilité, la liberté, la réalité, la qualité), and English words ending in -ance or -ence (difference, importance, experience, patience, chance) cross into French with the exact same spelling and a nasal vowel!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why -ité always wears an acute accent",
        "content": "Latin abstract nouns in -itātem lost their final syllable in French, leaving a crisp stressed /e/ at the end: université, liberté. That acute accent é is the scar of Latin -tātem.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Feminine Gender Decoder: -ion, -ité, -ance, -ence",
    "content": "Never memorize gender word by word when the suffix already announces it. Whenever a noun ends in -ion, -ité, -ance, or -ence, it belongs to the feminine squad: la liberté, la différence, l'université, l'importance. And when you replace any of them with 'it', the pronoun is la, walking left before the verb.",
    "linguist_note": "Latin -itās, -antia, and -entia were all feminine abstract suffixes in Rome; French and English inherited the whole set intact.",
    "trap_note": "The shortcut your mind will offer: treating -ance/-ence words like English pronunciation (/əns/). In French, both -ance and -ence share the exact same open nasal vowel /ɑ̃s/: la différence and l'importance rhyme!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Convert each English noun to its French feminine twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the university",
          "german": "l'université"
        },
        {
          "id": "p2",
          "english": "the possibility",
          "german": "la possibilité"
        },
        {
          "id": "p3",
          "english": "the freedom / liberty",
          "german": "la liberté"
        },
        {
          "id": "p4",
          "english": "the difference",
          "german": "la différence"
        },
        {
          "id": "p5",
          "english": "the importance",
          "german": "l'importance"
        }
      ],
      "target_answer": "l'université, la possibilité, la liberté, la différence, l'importance",
      "meaning": "the university, the possibility, the freedom / liberty, the difference, the importance",
      "explanation": "-ity converts to -ité and -ance/-ence keeps its spelling; vowel-initial nouns elide la to l'.",
      "id": "fr6_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Convert 'reality' to French by swapping -ity for -ité:",
      "tile_options": [
        "réal",
        "ity",
        "ité",
        "ance"
      ],
      "target_answer": "réalité",
      "meaning": "la réalité (reality)",
      "explanation": "réal + ité = réalité, 100% feminine.",
      "id": "fr6_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert with its feminine article: 'the quality' →",
      "english_hint": "quality → -ité",
      "target_answer": "la qualité",
      "meaning": "the quality",
      "explanation": "quality → la qualité (/la kalite/).",
      "id": "fr6_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the liberty is very important",
      "cues": [
        "The liberty → La liberté (-ité is feminine)",
        "is → est",
        "very important → très importante (adds feminine -e)"
      ],
      "idea_parts": [
        "subject → La liberté",
        "verb → est",
        "description → très importante"
      ],
      "target_answer": "La liberté est très importante",
      "meaning": "Freedom is very important",
      "word_bank": [
        "importante",
        "très",
        "Le",
        "important",
        "est",
        "liberté",
        "La"
      ],
      "explanation": "La liberté triggers feminine agreement on importante.",
      "diagnosis": {
        "slip": "left important without -e",
        "cue": "Because la liberté is feminine, important adds -e: importante."
      },
      "id": "fr6_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est une bonne possibilité",
      "replays": 2,
      "target_answer": "C'est une bonne possibilité",
      "meaning": "It's a good possibility",
      "cues": [
        "pointer: C'est",
        "feminine article + adjective: une bonne",
        "-ité noun: possibilité"
      ],
      "explanation": "bonne doubles its n in the feminine before possibilité.",
      "affirmation": "You caught both the feminine une bonne and the -ité ending.",
      "id": "fr6_e5"
    }
  ],
  "summary": {
    "outcome": "Convert English -ity nouns to -ité and -ance/-ence nouns directly, assigning feminine la/une automatically.",
    "use_example": {
      "german": "L'université et la liberté sont très importantes.",
      "english": "The university and freedom are very important."
    },
    "takeaway": "Four endings (-ion, -ité, -ance, -ence) hand you thousands of feminine nouns without a single flashcard.",
    "curiosity_teaser": "Up next on Le Pont ([601] The Feminine Squad): see how The -ité & -ance Bridges leads directly into The Feminine Squad."
  },
  "twist": {
    "prompt": "Ungraded — 'It is a big difference'?",
    "target_answer": "C'est une grande différence",
    "word_bank": [
      "un",
      "grand",
      "différence",
      "C'est",
      "une",
      "grande"
    ],
    "explanation": "la différence is feminine, so both une and grande wear their feminine -e."
  },
  "foreshadow": {
    "line": "Having mastered The -ité & -ance Bridges, look ahead to Topic 7 (Questions à la Française), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 7
  },
  "payoff": {
    "ofLesson": 5,
    "text": "The foundation from Topic 5 (être & Its Secrets) now pays off directly inside The -ité & -ance Bridges: every sentence here builds on that earlier step."
  }
};

export default lesson;
