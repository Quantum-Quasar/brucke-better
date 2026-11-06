import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 901,
  "slug": "sprig-901",
  "title": "Merci & Bonjour Gym",
  "subtitle": "Greetings, thanks, s'il vous plaît — the politeness set in dialogue drills.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "bonjour",
    "merci",
    "oui",
    "sil_vous_plait",
    "vous",
    "tu",
    "voudrais",
    "café"
  ],
  "table_word_ids": [
    "bonjour",
    "merci",
    "oui",
    "sil_vous_plait",
    "vous",
    "tu",
    "voudrais",
    "café"
  ],
  "hook": {
    "title": "Politeness as a Complete French Circuit",
    "content": "Every interaction in a shop, bakery, or café opens with Bonjour ! Add s'il vous plaît ('if it pleases you') and merci beaucoup ('thank you very much') to complete the politeness circuit.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why s'il vous plaît adapts to s'il te plaît with a friend",
        "content": "When speaking to one friend (tu), the indirect pronoun inside s'il vous plaît simply switches from vous to te: s'il te plaît!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Bonjour → Request + S'il vous plaît → Merci",
    "content": "Chain the three politeness beats in order.",
    "linguist_note": "Politeness formulas in French preserve fossilized conditional syntax (s'il vous plaît = 'if it pleases to-you').",
    "trap_note": "Never forget the circumflex î on plaît!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each part of a polite café exchange:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Good day / Hello (opening key)",
          "german": "Bonjour"
        },
        {
          "id": "p2",
          "english": "Please (formal, lit. if it pleases you)",
          "german": "s'il vous plaît"
        },
        {
          "id": "p3",
          "english": "Please (informal, to a friend)",
          "german": "s'il te plaît"
        },
        {
          "id": "p4",
          "english": "Thank you very much",
          "german": "merci beaucoup"
        }
      ],
      "target_answer": "Bonjour, s'il vous plaît, s'il te plaît, merci beaucoup",
      "meaning": "Good day / Hello (opening key), Please (formal, lit. if it pleases you), Please (informal, to a friend), Thank you very much",
      "explanation": "Every polite exchange starts with Bonjour.",
      "id": "fr901_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word meaning of 's'il vous plaît'?",
      "german": "s'il vous plaît",
      "natural": "please",
      "options": [
        "if you please it",
        "if it to-you pleases",
        "please"
      ],
      "target_answer": "if it to-you pleases",
      "meaning": "Literal structure: if it to-you pleases",
      "explanation": "si ('if') + il ('it') + vous ('to-you') + plaît ('pleases').",
      "id": "fr901_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Hello, a coffee, please'",
      "target_answer": "Bonjour, un café, s'il vous plaît",
      "meaning": "Hello, a coffee, please",
      "word_bank": [
        "tu",
        "café",
        "un",
        "Bonjour",
        "vous",
        "plaît",
        "s'il",
        "la"
      ],
      "explanation": "Open with Bonjour, name the item, close with s'il vous plaît.",
      "id": "fr901_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "yes thank you it is very good",
      "cues": [
        "Yes, thank you → Oui, merci",
        "it is very good → c'est très bon"
      ],
      "idea_parts": [
        "acknowledgment → Oui, merci",
        "evaluation → c'est très bon"
      ],
      "target_answer": "Oui, merci, c'est très bon",
      "meaning": "Yes, thank you, it is very good",
      "word_bank": [
        "Oui",
        "la",
        "très",
        "bon",
        "est",
        "merci",
        "c'est"
      ],
      "explanation": "Oui, merci, c'est très bon is a natural response at the table.",
      "diagnosis": {
        "slip": "omitted c'est",
        "cue": "Use c'est très bon for 'it is very good'."
      },
      "id": "fr901_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Bonjour, vous avez une table, s'il vous plaît",
      "replays": 2,
      "target_answer": "Bonjour, vous avez une table, s'il vous plaît",
      "meaning": "Hello, do you have a table, please?",
      "cues": [
        "Bonjour",
        "vous avez une table",
        "s'il vous plaît"
      ],
      "explanation": "Rising voice turns vous avez une table into a polite question.",
      "affirmation": "You chained Bonjour, vous avez une table, and s'il vous plaît.",
      "id": "fr901_e5"
    }
  ],
  "summary": {
    "outcome": "Conduct complete polite exchanges using Bonjour, s'il vous/te plaît, and merci.",
    "use_example": {
      "german": "Bonjour ! Un thé, s'il vous plaît. — Merci !",
      "english": "Hello! A tea, please. — Thank you!"
    },
    "takeaway": "Always open with Bonjour before asking a question in France.",
    "curiosity_teaser": "Up next on Le Pont ([902] The vous Register): see how Merci & Bonjour Gym leads directly into The vous Register."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Hello, a coffee, please\" in French:",
    "target_answer": "Bonjour, un café, s'il vous plaît",
    "word_bank": [
      "café",
      "Bonjour",
      "plaît",
      "s'il",
      "vous",
      "pas",
      "un",
      "ne"
    ],
    "explanation": "Re-constructing \"Bonjour, un café, s'il vous plaît\" from the underlying rule cements the pattern of Merci & Bonjour Gym."
  }
};

export default lesson;
