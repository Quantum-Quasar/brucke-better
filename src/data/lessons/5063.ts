import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5063,
  "slug": "commands-in-the-wild",
  "title": "Commands in the Wild",
  "subtitle": "Recipes, dialogues and the register switch — where German commands go native",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "kochen",
    "essen",
    "trinken",
    "machen",
    "kommen",
    "suchen",
    "brot",
    "tee"
  ],
  "table_word_ids": [
    "kochen",
    "essen",
    "trinken",
    "machen",
    "tee",
    "kommen",
    "suchen",
    "brot",
    "ukraine",
    "günstig",
    "geschmack",
    "wenig",
    "esel",
    "musiker",
    "merken"
  ],
  "hook": {
    "title": "The Recipe's Dirty Secret",
    "content": "Open a German cookbook and the commands get lazier — and more ancient. Real recipes skip the pronoun and often the finiteness too: Wasser kochen, Tee machen, Brot essen — 'water to-boil, tea to-make, bread to-eat.' That bare infinitive parade is a command with the stem exposed, the same stripped form you drilled as Komm! — just wearing its infinitive coat. English recipes do the mirror move: 'boil water, add salt, stir.' The command is the oldest sentence shape humans own, and in the wild — recipes, signs, dialogues — German simply lets it run.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "bitte — the Softener",
        "content": "Bitte (please — literally 'ask/bid', the twin hiding in English bid) converts any command from order to request: Komm! vs Komm, bitte! English once did the same with pray: 'pray come in' → 'prithee' → modern please. Both languages ask politely by mentioning the asking."
      }
    ]
  },
  "pattern": {
    "title": "Two Registers, One Stem",
    "content": "Friend register: Komm! Trink Tee! Iss Brot! — bare-stem commands, chained with und: Komm und iss! Recipe register: Wasser kochen, Tee machen, Kaffee trinken — infinitive-style commands with no pronoun at all, the register of cookbooks and instruction manuals. Formal register: Essen Sie! Trinken Sie! — the verb-first Sie-command. The same stems serve all three: kochen, essen, trinken, machen, kommen, suchen — switch audience, keep the stem. One honest gap: negative commands need nicht, which arrives with topic 12 — komm nicht! waits one topic down the trail.",
    "footnotes": [],
    "linguist_note": "The recipe infinitive is a survival of the old Gerundium: medieval German recipes were written as noun-verb pairs ('zu machene' — to make). English once did it too — 'to make a pie: take flour' — before the imperative took over the kitchen."
  },
  "exercises": [
    {
      "id": "l5063_e1",
      "type": "matching_pairs",
      "prompt": "The recipe list — match each step with its reading:",
      "matching_pairs": [
        {
          "id": "rc1",
          "english": "boil water (recipe style)",
          "german": "Wasser kochen"
        },
        {
          "id": "rc2",
          "english": "make tea (recipe style)",
          "german": "Tee machen"
        },
        {
          "id": "rc3",
          "english": "drink coffee (recipe style)",
          "german": "Kaffee trinken"
        },
        {
          "id": "rc4",
          "english": "eat bread (recipe style)",
          "german": "Brot essen"
        }
      ],
      "target_answer": "Wasser kochen, Tee machen, Kaffee trinken, Brot essen",
      "meaning": "boil water, make tea, drink coffee, eat bread",
      "explanation": "Recipe style: noun then bare infinitive, no pronoun — a command with the stem exposed."
    },
    {
      "id": "l5063_e2",
      "type": "shift_select",
      "prompt": "Which line sounds like it came from a German cookbook?",
      "options": [
        "Kochst du Wasser?",
        "Wasser kochen und Tee machen",
        "Du kochst Wasser",
        "Ich koche Wasser"
      ],
      "target_answer": "Wasser kochen und Tee machen",
      "meaning": "Recipe register: noun + bare infinitive",
      "explanation": "Recipes drop the subject entirely: Wasser kochen, Tee machen — the stem parade."
    },
    {
      "id": "l5063_e3",
      "type": "morpheme_tiles",
      "prompt": "Assemble the informal du-command: 'Drink tea!'",
      "tile_options": [
        "st",
        "en",
        "Trink",
        "Tee",
        "t"
      ],
      "target_answer": "Trink Tee",
      "meaning": "drink! tea — drink tea! (to a friend)",
      "explanation": "Bare stem + object: Trink Tee! — the du-command with nothing attached."
    },
    {
      "id": "l5063_e4",
      "type": "derive",
      "prompt": "Formal register (to eat): _____ Sie bitte! (Invite a guest to eat):",
      "english_hint": "the 3rd-person-plural form, verb first",
      "target_answer": "Essen",
      "meaning": "Essen Sie! = eat! (formal)",
      "explanation": "The Sie-command borrows the they-form: Essen Sie! — essen keeps its e→i vowel only in du (isst) and ihr (esst)."
    },
    {
      "id": "l5063_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the dialogue line: 'Come and eat bread'",
      "target_answer": "Komm und iss Brot",
      "meaning": "Komm und iss Brot = come and eat bread",
      "vocab_hints": [
        {
          "word": "iss",
          "translation": "eat! (command form)",
          "note": "essen's du-form isst — the command keeps the i"
        }
      ],
      "word_bank": [
        "iss",
        "du",
        "Brot",
        "Komm",
        "und",
        "oder"
      ],
      "explanation": "Two commands chained with und — and iss keeps its shifted vowel, the stem-changer in action."
    }
  ],
  "summary": {
    "outcome": "Deploy commands in three registers: friend (Komm!), recipe (Wasser kochen), formal (Essen Sie!).",
    "use_example": {
      "german": "Komm, bitte, und iss Brot!",
      "english": "Come, please, and eat bread!"
    },
    "takeaway": "One stem, three registers: Komm! / Wasser kochen / Kommen Sie! — the command is German's oldest sentence shape.",
    "curiosity_teaser": "Next: the accusative Him-Case — why only der changes to den, and how English him and whom prove it."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Commands in the Wild (Komm und iss Brot = come and eat bread):",
    "target_answer": "Komm und iss Brot",
    "word_bank": [
      "nicht",
      "und",
      "Komm",
      "iss",
      "Brot",
      "heute"
    ],
    "explanation": "Re-assembling \"Komm und iss Brot\" from scratch locks in the structural pattern of Commands in the Wild without relying on short-term echo."
  }
};

export default lesson;
