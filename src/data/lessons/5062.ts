import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5062,
  "slug": "kommen-sie-kommt",
  "title": "Kommen Sie! Kommt!",
  "subtitle": "The formal Sie-command (verb first, Sie after) and the plural ihr-command",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "kommen",
    "machen",
    "trinken",
    "sprechen",
    "sein",
    "essen"
  ],
  "table_word_ids": [
    "kommen",
    "machen",
    "trinken",
    "sein",
    "essen",
    "sprechen",
    "gegenstand",
    "cousin",
    "bein",
    "erdbeere",
    "appetit",
    "kissen",
    "brust",
    "krankenwagen",
    "operation"
  ],
  "hook": {
    "title": "Three Ways to Order Somebody",
    "content": "English commands everybody with one word: come! German refuses. One friend gets Komm!; two friends get Kommt!; a stranger gets Kommen Sie! — and that last one is the strangest, because it is really a statement about 'they': the polite Sie is the old third-person plural, so the command says, in effect, 'let the honored they come.' Verb first, Sie second — it looks like a question with the question mark politely removed, and that is almost exactly its history. English once ran the same split: 'go thou' to one, 'go ye' to many — the King James Bible is full of the plural form. German still lives in that world.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Question With the Mark Removed",
        "content": "Wollen Sie kommen? ('do you want to come?') drops wollen and its question mark: Kommen Sie! The polite command is built on the scaffolding of the polite question — which is why it sounds so courtly."
      }
    ]
  },
  "pattern": {
    "title": "The Full Command Table",
    "content": "ihr-commands: take the ihr ending -t and nothing else — Kommt! Macht! Trinkt! Esst! (essen keeps its vowel: du isst, ihr esst, command Esst!). The Sie-command: the 3rd-person-plural form, verb FIRST, Sie after — Kommen Sie! Machen Sie! Trinken Sie! Sprechen Sie! The irregular one: sein. Its commands are pure history: Sei! (du), Seid! (ihr), Seien Sie! (formal) — the old *bʰu- root wearing command clothes. And the stem-changers hold their line in all three columns: Iss! Esst! Essen Sie! — Hilf! Helft! Helfen Sie!",
    "footnotes": [],
    "linguist_note": "Sei ↔ be: the German command of sein comes from the same Proto-Germanic *bʰu- root as English be (OE bēo!). 'Be good!' and 'Sei gut!' are one command, split by two thousand years of drift."
  },
  "exercises": [
    {
      "id": "l5062_e1",
      "type": "matching_pairs",
      "prompt": "Match each command to the audience it addresses:",
      "matching_pairs": [
        {
          "id": "fc1",
          "english": "come! (one friend)",
          "german": "Komm!"
        },
        {
          "id": "fc2",
          "english": "come! (two friends)",
          "german": "Kommt!"
        },
        {
          "id": "fc3",
          "english": "come! (formal)",
          "german": "Kommen Sie!"
        },
        {
          "id": "fc4",
          "english": "be! (one friend)",
          "german": "Sei!"
        }
      ],
      "target_answer": "Komm, Kommt, Kommen Sie, Sei",
      "meaning": "du, ihr, Sie, and the irregular sein command",
      "explanation": "Bare stem for du, -t for ihr, verb-first + Sie for formal — and sein refuses all three patterns: Sei! Seid! Seien Sie!"
    },
    {
      "id": "l5062_e2",
      "type": "shift_select",
      "prompt": "A waiter invites a customer to drink: '_____ Sie ein Glas Wein!'",
      "options": [
        "Getrunken",
        "Trink",
        "Trinkt",
        "Trinken"
      ],
      "target_answer": "Trinken",
      "meaning": "Trinken Sie! = drink! (formal)",
      "explanation": "The Sie-command uses the 3rd-person-plural form, verb first: Trinken Sie! — never Trink Sie."
    },
    {
      "id": "l5062_e3",
      "type": "shift_select",
      "prompt": "Command two friends to eat:",
      "options": [
        "Esst!",
        "Iss!",
        "Essen Sie!",
        "Ess!"
      ],
      "target_answer": "Esst!",
      "meaning": "Esst! = eat! (ihr)",
      "explanation": "essen's vowel keeps its e→i shift through the table: du isst, ihr esst — command Esst! The -t ending rides on the shifted stem."
    },
    {
      "id": "l5062_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble the plural ihr-command with its object: 'Do that!'",
      "tile_options": [
        "en",
        "t",
        "Macht",
        "st",
        "das"
      ],
      "target_answer": "Macht das",
      "meaning": "do! (ihr) — do that!",
      "explanation": "machen → ihr-command Macht! — the same -t you drilled as the ihr ending, now giving orders."
    },
    {
      "id": "l5062_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"Sprechen Sie Deutsch = speak German (formal)\"",
      "target_answer": "Sprechen Sie Deutsch",
      "meaning": "Sprechen Sie Deutsch = speak German (formal)",
      "vocab_hints": [
        {
          "word": "Sie",
          "translation": "you (formal)",
          "note": "the polite 'they' — verb first, Sie second"
        }
      ],
      "word_bank": [
        "Sprechen",
        "den",
        "Deutsch",
        "haben",
        "Sie"
      ],
      "explanation": "Verb first, Sie second: Kommen Sie, Machen Sie, Sprechen Sie — the courtly scaffolding of the polite question, minus the question.",
      "idea": "Sprechen Sie Deutsch = speak German (formal)",
      "idea_parts": [
        "Sprechen Sie Deutsch",
        "= speak German (formal) (verb in position 2)"
      ],
      "cues": [
        "Start with \"Sprechen\" and anchor \"Sie\" in position 2.",
        "Close the frame with \"Deutsch\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Command all three audiences: bare stem (du), -t (ihr), verb-first + Sie (formal) — plus Sei!.",
    "use_example": {
      "german": "Kommen Sie herein und trinken Sie Tee!",
      "english": "Come in and drink tea! (formal)"
    },
    "takeaway": "Komm! / Kommt! / Kommen Sie! — three audiences, three forms; sein answers only Sei! Seid! Seien Sie!.",
    "curiosity_teaser": "Next: commands in the wild — recipes, dialogues and the register switch, where German drops even the verb's subject."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Kommen Sie! Kommt! (Sprechen Sie Deutsch = speak German (formal)):",
    "target_answer": "Sprechen Sie Deutsch",
    "word_bank": [
      "nicht",
      "heute",
      "Deutsch",
      "Sprechen",
      "Sie"
    ],
    "explanation": "Re-assembling \"Sprechen Sie Deutsch\" from scratch locks in the structural pattern of Kommen Sie! Kommt! without relying on short-term echo."
  }
};

export default lesson;
