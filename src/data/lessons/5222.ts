import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5222,
  "slug": "essen-ii-obst-kartoffel-tomate-gurke-zwiebel",
  "title": "Essen II: das Obst, die Kartoffel, die Tomate, die Gurke, die Zwiebel",
  "subtitle": "fruit and vegetables — four names that traveled, and one Latin shelf-label",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "obst",
    "kartoffel",
    "tomate",
    "gurke",
    "zwiebel",
    "million",
    "april",
    "mai",
    "september",
    "oktober",
    "essen",
    "suppe",
    "gesund",
    "mensch"
  ],
  "table_word_ids": [
    "obst",
    "kartoffel",
    "tomate",
    "gurke",
    "zwiebel",
    "million",
    "april",
    "mai",
    "september",
    "oktober",
    "essen",
    "suppe",
    "gesund",
    "mensch",
    "hängen"
  ],
  "hook": {
    "title": "Every Name Here Carries a Passport",
    "content": "das Obst is the shelf, and everything on it came by a different road. die Kartoffel — the potato — wears an Italian mushroom's name: German borrowed Italian tartufolo, 'truffle', in the 17th century — first as Tartuffel — because the new tuber looked like a truffle growing underground. (English potato is a Caribbean word, Taíno batata through Spanish — the two languages named the same vegetable from two different continents.) die Tomate walked one road in both languages: Nahuatl tomatl, through Spanish tomate, into German and English almost unchanged. die Gurke came overland — German took it from Polish ogórek. die Zwiebel is the old Latin onion, cepa, in its diminutive dress — cepula, 'little onion' — and English kept the same root in the smallest onion of all: the chive. And das Obst itself is Latin obsonium, a word for bought provisions; English took Latin fructus instead and got 'fruit'. Five foods, five roads, one shared table.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Earth-Apple",
        "content": "Before Kartoffel won, German also called the potato das Erdapfel — the earth-apple — the same instinct French had with pomme de terre. The south never gave it up: in Austria and Bavaria the potatoes are still die Erdäpfel, and the compound reads itself — Erd- + Apfel, both words you own."
      }
    ]
  },
  "pattern": {
    "title": "The Produce Shelf in Sentences",
    "content": "Three frames and a count. 1. The harvest calendar: Im April und im Mai essen wir Tomaten, im September essen wir Gurken, im Oktober essen wir Kartoffeln — the month rides behind im and the plural food noun stands bare. 2. The count frame: Eine Million Menschen essen Tomaten — die Million stays singular with bare Menschen after it, exactly as lesson 5122 built it. 3. The category: Obst ist sehr gesund — das Obst is the category (singular, no plural in the shop sense), while die Tomate and die Gurke are the countable pieces. 4. Essen in slot 2, food bare: Ich esse Kartoffeln mit Gemüse.",
    "footnotes": [],
    "linguist_note": "Neither language borrowed its potato word from the potato's Andean homeland: English carried a Taíno word through Spanish, German an Italian mushroom name. But the tomato both languages took straight from Nahuatl through Spanish — the rare food that crossed the ocean once and kept its name the whole way."
  },
  "exercises": [
    {
      "id": "l5222_e1",
      "type": "matching_pairs",
      "prompt": "Fruit and vegetables, five roads — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "gv1",
          "english": "In April and in May we eat tomatoes",
          "german": "Im April und im Mai essen wir Tomaten"
        },
        {
          "id": "gv2",
          "english": "In September we eat cucumbers",
          "german": "Im September essen wir Gurken"
        },
        {
          "id": "gv3",
          "english": "In October we eat potatoes",
          "german": "Im Oktober essen wir Kartoffeln"
        },
        {
          "id": "gv4",
          "english": "A million people eat tomatoes",
          "german": "Eine Million Menschen essen Tomaten"
        },
        {
          "id": "gv5",
          "english": "Fruit is very healthy",
          "german": "Obst ist sehr gesund"
        },
        {
          "id": "gv6",
          "english": "I eat no onions",
          "german": "Ich esse keine Zwiebel"
        },
        {
          "id": "gv7",
          "english": "The soup is hot",
          "german": "Die Suppe ist heiß"
        }
      ],
      "target_answer": "Im April und im Mai essen wir Tomaten, Im September essen wir Gurken, Im Oktober essen wir Kartoffeln, Eine Million Menschen essen Tomaten, Obst ist sehr gesund, Ich esse keine Zwiebel, Die Suppe ist heiß",
      "meaning": "tomatoes in spring, cucumbers in September, potatoes in October, a million eaters, healthy fruit, no onions",
      "explanation": "Months ride behind im; die Million stays singular with bare Menschen after it; and das Obst is the category while die Tomate and die Gurke are the countable pieces. Ich esse keine Zwiebel is the picky-eater frame — kein before the bare singular."
    },
    {
      "id": "l5222_e2",
      "type": "shift_select",
      "prompt": "Which of these four wears a Polish name?",
      "options": [
        "die Kartoffel",
        "die Gurke",
        "das Obst",
        "die Tomate"
      ],
      "target_answer": "die Gurke",
      "meaning": "die Gurke ← Polish ogórek",
      "explanation": "Gurke is German's borrowing of Polish ogórek. Kartoffel took the Italian road (tartufolo, 'truffle', in the 1600s), Tomate the Spanish road from Nahuatl, Obst the Latin door — and English gourd is a separate word entirely, from Latin cucurbita, with no family tie to any of them."
    },
    {
      "id": "l5222_e3",
      "type": "reverse_cognate",
      "prompt": "German 'die Tomate' comes from Nahuatl 'tomatl', which crossed the Atlantic in the 16th century. What is its English twin?",
      "options": [
        "potato",
        "tomcat",
        "tomato",
        "tornado"
      ],
      "target_answer": "tomato",
      "meaning": "die Tomate ↔ tomato: the same Nahuatl word, tomatl",
      "explanation": "Spanish carried Nahuatl tomatl into both languages nearly unchanged — Tomate and tomato are the same word with the last vowel traded. English potato, by contrast, is Taíno batata: a different continent in the same vegetable patch."
    },
    {
      "id": "l5222_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble: 'I eat potatoes with vegetables'",
      "tile_options": [
        "Tomaten",
        "Kartoffeln",
        "esse",
        "Obst",
        "Ich",
        "Gemüse",
        "mit"
      ],
      "target_answer": "Ich esse Kartoffeln mit Gemüse",
      "meaning": "I eat potatoes with vegetables",
      "explanation": "Plural Kartoffeln after no article — food stays bare in German. mit introduces what rides along, and the verb keeps slot 2 while the food nouns fill the back of the sentence."
    },
    {
      "id": "l5222_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the harvest sentence: 'In October we eat potatoes and onions'",
      "target_answer": "Im Oktober essen wir Kartoffeln und Zwiebeln",
      "word_bank": [
        "Im",
        "Kartoffeln",
        "und",
        "wir",
        "Obst",
        "Oktober",
        "Tomaten",
        "Zwiebeln",
        "essen"
      ],
      "meaning": "In October we eat potatoes and onions",
      "explanation": "Time phrase first, verb second, subject third — the order you drilled with the months. Swap Oktober for September and the harvest moves with it: Im September essen wir Gurken."
    }
  ],
  "summary": {
    "outcome": "Name fruit and vegetables with their genders, put a bare plural on the table, and hang a month behind im.",
    "use_example": {
      "german": "Im Oktober essen wir Kartoffeln — im April und im Mai essen wir Tomaten.",
      "english": "In October we eat potatoes — in April and in May we eat tomatoes."
    },
    "takeaway": "Kartoffel is the truffle's name, Tomate is Nahuatl tomatl, Gurke is Polish ogórek, Zwiebel is Latin cepula (English chive), Obst is Latin obsonium — and Million stays singular before bare Menschen.",
    "curiosity_teaser": "Next: the sweet shelf — der Zucker, der Honig, die Schokolade, der Keks, die Torte, and the plural 'cakes' German borrowed whole."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Essen II: das Obst, die Kartoffel, die Tomate, die Gurke, die Zwiebel (In October we eat potatoes and onions):",
    "target_answer": "Im Oktober essen wir Kartoffeln und Zwiebeln",
    "word_bank": [
      "essen",
      "Im",
      "Zwiebeln",
      "Kartoffeln",
      "Oktober",
      "heute",
      "nicht",
      "wir",
      "und"
    ],
    "explanation": "Re-assembling \"Im Oktober essen wir Kartoffeln und Zwiebeln\" from scratch locks in the structural pattern of Essen II: das Obst, die Kartoffel, die Tomate, die Gurke, die Zwiebel without relying on short-term echo."
  }
};

export default lesson;
