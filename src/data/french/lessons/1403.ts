import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1403,
  "slug": "sprig-1403",
  "title": "Demonstratives & Stressed Pronouns",
  "subtitle": "Pointing with ce/cet/cette/ces and standing alone after prepositions with moi, toi, lui, elle, nous, vous.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "ce",
    "moi",
    "toi",
    "lui",
    "elle",
    "nous",
    "vous",
    "avec",
    "pour",
    "chez",
    "hôtel",
    "ville",
    "livre"
  ],
  "table_word_ids": [
    "ce",
    "moi",
    "toi",
    "lui",
    "elle",
    "nous",
    "vous",
    "avec",
    "pour",
    "chez",
    "hôtel",
    "ville",
    "livre"
  ],
  "hook": {
    "title": "Pointers (ce/cet/cette/ces) and Stressed Pronouns (moi, toi, lui, elle)",
    "content": "One French pointer family covers both 'this' and 'that': ce (masculine consonant: ce livre), cet (masculine vowel/mute H: cet hôtel, cet ami), cette (feminine: cette ville), and ces (plural: ces livres)! And after any preposition (avec, pour, sans, chez) or C'est, pronouns wear their stressed coats: moi, toi, lui, elle, nous, vous!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How cet and cette sound 100% identical (/sɛt/)",
        "content": "Masculine prevocalic cet (/sɛt/) and feminine cette (/sɛt/) sound completely identical in speech!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "ce / cet / cette / ces before Nouns; moi / toi / lui / elle after Prepositions",
    "content": "Use cet before masculine vowels/mute H, and use moi/toi/lui/elle after avec, pour, chez.",
    "linguist_note": "French stressed (disjunctive) pronouns moi, toi, lui descend from Latin tonic oblique forms mē, tē, illūi.",
    "trap_note": "Never write *ce hôtel or *avec je — use cet hôtel and avec moi!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each pointer or stressed pronoun phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "ce livre (masculine consonant)",
          "german": "this / that book"
        },
        {
          "id": "p2",
          "english": "cet hôtel / cet ami (masculine vowel/H)",
          "german": "this / that hotel, friend"
        },
        {
          "id": "p3",
          "english": "cette ville (feminine)",
          "german": "this / that city"
        },
        {
          "id": "p4",
          "english": "avec moi / pour toi",
          "german": "with me / for you"
        },
        {
          "id": "p5",
          "english": "chez lui / chez elle",
          "german": "at his place / at her place"
        }
      ],
      "target_answer": "this / that book, this / that hotel, friend, this / that city, with me / for you, at his place / at her place",
      "meaning": "ce livre (masculine consonant), cet hôtel / cet ami (masculine vowel/H), cette ville (feminine), avec moi / pour toi, chez lui / chez elle",
      "explanation": "cet prevents a vowel collision in the masculine; moi/toi/lui/elle follow prepositions.",
      "id": "fr1403_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which demonstrative correctly completes '___ homme et ___ femme' ('this man and this woman')?",
      "options": [
        "ce homme et cette femme",
        "cette homme et cette femme",
        "cet homme et cette femme"
      ],
      "target_answer": "cet homme et cette femme",
      "meaning": "this man (cet before mute H) and this woman (cette, f.)",
      "explanation": "homme is masculine and starts with a mute H, so ce becomes cet: cet homme.",
      "id": "fr1403_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'This coffee is for me, and that cake is for you (informal)'?",
      "options": [
        "Ce café est pour moi et ce gâteau est pour toi",
        "Cette café est pour moi et cette gâteau est pour toi",
        "Ce café est pour me et ce gâteau est pour te"
      ],
      "target_answer": "Ce café est pour moi et ce gâteau est pour toi",
      "meaning": "This coffee is for me and that cake is for you",
      "explanation": "After a preposition like pour, me/te become stressed moi/toi!",
      "id": "fr1403_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am coming with you to this hotel",
      "cues": [
        "I am coming with you → Je viens avec toi",
        "to this hotel → à cet hôtel"
      ],
      "idea_parts": [
        "verb + companion → Je viens avec toi",
        "destination → à cet hôtel"
      ],
      "target_answer": "Je viens avec toi à cet hôtel",
      "meaning": "I am coming with you to this hotel",
      "word_bank": [
        "viens",
        "Je",
        "hôtel",
        "te",
        "avec",
        "à",
        "toi",
        "ce",
        "cet"
      ],
      "explanation": "avec takes stressed toi, and masculine mute-H hôtel takes cet.",
      "diagnosis": {
        "slip": "used te or ce hôtel",
        "cue": "Use avec toi and à cet hôtel."
      },
      "id": "fr1403_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est pour moi ou c'est pour lui",
      "replays": 2,
      "target_answer": "C'est pour moi ou c'est pour lui",
      "meaning": "Is it for me or is it for him?",
      "cues": [
        "for me: C'est pour moi",
        "or for him: ou c'est pour lui"
      ],
      "explanation": "After pour, use stressed moi and lui.",
      "affirmation": "You used both stressed pronouns moi and lui after pour.",
      "id": "fr1403_e5"
    }
  ],
  "summary": {
    "outcome": "Point at nouns with ce, cet, cette, ces and use stressed pronouns (moi, toi, lui, elle, nous, vous) after prepositions.",
    "use_example": {
      "german": "Cet hôtel est très beau — tu viens avec moi ?",
      "english": "This hotel is very beautiful — are you coming with me?"
    },
    "takeaway": "ce becomes cet before a masculine vowel, and prepositions always take moi, toi, lui, elle.",
    "curiosity_teaser": "Up next on Le Pont ([15] Numbers & the Four-Twenties): see how Demonstratives & Stressed Pronouns leads directly into Numbers & the Four-Twenties."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am coming with you to this hotel\" in French:",
    "target_answer": "Je viens avec toi à cet hôtel",
    "word_bank": [
      "à",
      "toi",
      "Je",
      "ne",
      "avec",
      "cet",
      "viens",
      "pas",
      "hôtel"
    ],
    "explanation": "Re-constructing \"Je viens avec toi à cet hôtel\" from the underlying rule cements the pattern of Demonstratives & Stressed Pronouns."
  }
};

export default lesson;
