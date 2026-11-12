import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5062,
  "slug": "lesson-5062",
  "title": "L'addition, s'il vous plaît",
  "subtitle": "close the meal like a local: the bill, the thanks, and la monnaie that isn't money",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "addition",
    "table",
    "restaurant",
    "commerce",
    "merci",
    "sil_vous_plait",
    "combien"
  ],
  "table_word_ids": [
    "addition",
    "table",
    "restaurant",
    "merci",
    "sil_vous_plait",
    "combien"
  ],
  "hook": {
    "title": "The Meal-Closing Ritual",
    "content": "Lesson 5061 asked the price: C'est combien ?. Now end the meal the French way: a table for two, a polite request, and the little word that brings the bill — l'addition, s'il vous plaît. Thank with merci beaucoup, and the exchange is complete.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The trap you already own",
        "content": "Don't ask for la monnaie hoping for the bill — that's the small change (False Friends II). The bill is l'addition: the sum added up.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Request, Pay, Thank",
    "content": "Une table pour deux, s'il vous plaît opens the meal; L'addition, s'il vous plaît closes it. The same politeness frame — noun first, s'il vous plaît second — carries the whole ritual.",
    "linguist_note": "addition is the same Latin additio English keeps in 'addition' — the bill is literally the sum added up.",
    "trap_note": "merci beaucoup thanks; s'il vous plaît requests. Mixing them turns a request into a thank-you for something that hasn't happened yet."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each meal-closing phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the bill",
          "german": "l'addition"
        },
        {
          "id": "p2",
          "english": "please",
          "german": "s'il vous plaît"
        },
        {
          "id": "p3",
          "english": "thank you very much",
          "german": "merci beaucoup"
        },
        {
          "id": "p4",
          "english": "how much is it?",
          "german": "C'est combien ?"
        }
      ],
      "target_answer": "l'addition, s'il vous plaît, merci beaucoup, C'est combien ?",
      "meaning": "the bill, please, thank you very much, how much is it?",
      "explanation": "Four phrases, one ritual: ask the price, request politely, pay, thank.",
      "id": "fr5062_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You have finished your meal. How do you call the waiter?",
      "options": [
        "L'addition, s'il vous plaît",
        "La monnaie, s'il vous plaît",
        "Merci beaucoup, l'addition"
      ],
      "target_answer": "L'addition, s'il vous plaît",
      "meaning": "The bill, please",
      "explanation": "L'addition, s'il vous plaît — the bill is the sum added up; la monnaie is only the change.",
      "id": "fr5062_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the French word for the bill — the sum that gets added up:",
      "english_hint": "the same Latin root as English 'addition'",
      "target_answer": "addition",
      "meaning": "the bill",
      "explanation": "Latin additio → l'addition: the restaurant does the maths and hands you the sum.",
      "id": "fr5062_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: a table for two, please",
      "cues": [
        "une table for 'a table'",
        "pour deux = for two; politeness rides at the end"
      ],
      "idea_parts": [
        "a table for two → Une table pour deux",
        "please → s'il vous plaît"
      ],
      "target_answer": "Une table pour deux, s'il vous plaît",
      "meaning": "A table for two, please",
      "word_bank": [
        "Une",
        "table",
        "pour",
        "deux",
        "s'il",
        "vous",
        "plaît",
        "addition",
        "trois"
      ],
      "explanation": "Une table pour deux, s'il vous plaît — request first, politeness last.",
      "diagnosis": {
        "slip": "dropped s'il vous plaît",
        "cue": "The polite tail is what makes it a request and not a demand."
      },
      "id": "fr5062_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "L'addition, s'il vous plaît",
      "replays": 2,
      "target_answer": "L'addition, s'il vous plaît",
      "meaning": "The bill, please",
      "cues": [
        "It means: The bill, please",
        "The request word comes second"
      ],
      "explanation": "L'addition, s'il vous plaît — the meal-closing sentence every French learner needs.",
      "affirmation": "You wrote the politeness frame with the right noun inside it.",
      "id": "fr5062_e5"
    }
  ],
  "summary": {
    "outcome": "Open and close a French meal: une table pour deux, l'addition s'il vous plaît, merci beaucoup.",
    "use_example": {
      "german": "L'addition, s'il vous plaît",
      "english": "The bill, please"
    },
    "takeaway": "addition is the sum added up — and la monnaie is only the change.",
    "curiosity_teaser": "Up next on Le Pont ([16] Days, Months & Dates): see how L'addition, s'il vous plaît leads directly into Days, Months & Dates."
  },
  "twist": {
    "prompt": "Think it through again without looking back — ask for the bill politely:",
    "target_answer": "L'addition, s'il vous plaît",
    "word_bank": [
      "L'addition",
      "s'il",
      "vous",
      "plaît",
      "monnaie",
      "merci"
    ],
    "explanation": "Rebuilding \"L'addition, s'il vous plaît\" locks the ritual: bill first, please second."
  }
};

export default lesson;
