import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5061,
  "slug": "lesson-5061",
  "title": "C'est combien ?",
  "subtitle": "Asking prices, ordering with numbers 1–100, and l'addition at the bistro.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "combien",
    "un",
    "deux",
    "cinq",
    "dix",
    "vingt",
    "trente",
    "soixante",
    "quatre_vingts",
    "cent",
    "addition"
  ],
  "table_word_ids": [
    "combien",
    "un",
    "deux",
    "cinq",
    "dix",
    "vingt",
    "trente",
    "soixante",
    "quatre_vingts",
    "cent",
    "addition"
  ],
  "hook": {
    "title": "Market & Bistro Prices: C'est combien ? and Ça fait… euros",
    "content": "Two phrases handle every price transaction: C'est combien ? ('How much is it?') and Ça fait dix euros ('That comes to ten euros')! And when you are ready to pay at a restaurant, ask: L'addition, s'il vous plaît ('The bill/check, please').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French says 'Ça fait...' ('That makes...') for a total price",
        "content": "faire in the 3rd person (ça fait, 'that makes') is used whenever items add up to a total: Ça fait combien ? — Ça fait vingt euros!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "C'est combien ? / Ça fait combien ? → C'est X euros / Ça fait X euros",
    "content": "Practice asking prices and stating totals with numbers 1–100 and l'addition.",
    "linguist_note": "Colloquial price inquiry favors C'est combien ? or Ça fait combien ?.",
    "trap_note": "A restaurant bill is always l'addition!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each shopping or bistro phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "C'est combien ?",
          "german": "How much is it?"
        },
        {
          "id": "p2",
          "english": "Ça fait combien ?",
          "german": "How much does that come to?"
        },
        {
          "id": "p3",
          "english": "Ça fait vingt euros",
          "german": "That comes to twenty euros"
        },
        {
          "id": "p4",
          "english": "L'addition, s'il vous plaît",
          "german": "The bill / check, please"
        },
        {
          "id": "p5",
          "english": "C'est moins cher",
          "german": "It is cheaper / less expensive"
        }
      ],
      "target_answer": "How much is it?, How much does that come to?, That comes to twenty euros, The bill / check, please, It is cheaper / less expensive",
      "meaning": "C'est combien ?, Ça fait combien ?, Ça fait vingt euros, L'addition, s'il vous plaît, C'est moins cher",
      "explanation": "C'est combien and Ça fait handle every price check.",
      "id": "fr5061_e1"
    },
    {
      "type": "shift_select",
      "prompt": "At the end of a restaurant meal, what do you ask the waiter for?",
      "options": [
        "La location, s'il vous plaît",
        "L'addition, s'il vous plaît",
        "La monnaie, s'il vous plaît"
      ],
      "target_answer": "L'addition, s'il vous plaît",
      "meaning": "The bill, please (lit. the addition of the items)",
      "explanation": "la monnaie is loose change; la location is a rental; the restaurant bill is l'addition!",
      "id": "fr5061_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'Ça fait trente euros'?",
      "german": "Ça fait trente euros",
      "natural": "That comes to thirty euros",
      "options": [
        "It does thirty euros",
        "That comes to thirty euros",
        "That makes thirty euros"
      ],
      "target_answer": "That makes thirty euros",
      "meaning": "Literal structure: That makes thirty euros",
      "explanation": "Ça ('that') + fait ('makes') + trente euros.",
      "id": "fr5061_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "how much is it for two coffees (using C'est combien pour deux cafés)",
      "cues": [
        "It is how much → C'est combien",
        "for two coffees → pour deux cafés"
      ],
      "idea_parts": [
        "price question → C'est combien",
        "items → pour deux cafés"
      ],
      "target_answer": "C'est combien pour deux cafés",
      "meaning": "How much is it for two coffees?",
      "word_bank": [
        "cafés",
        "comment",
        "deux",
        "pour",
        "C'est",
        "la",
        "combien"
      ],
      "explanation": "C'est combien + pour deux cafés.",
      "diagnosis": {
        "slip": "used comment",
        "cue": "Use combien for 'how much'."
      },
      "id": "fr5061_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "L'addition, s'il vous plaît, ça fait combien",
      "replays": 2,
      "target_answer": "L'addition, s'il vous plaît, ça fait combien",
      "meaning": "The bill, please — how much does that come to?",
      "cues": [
        "L'addition, s'il vous plaît",
        "ça fait combien"
      ],
      "explanation": "Combines the bill request with the total question.",
      "affirmation": "You wrote L'addition and ça fait combien cleanly.",
      "id": "fr5061_e5"
    }
  ],
  "summary": {
    "outcome": "Ask prices with C'est combien ? / Ça fait combien ?, state totals in euros, and ask for l'addition.",
    "use_example": {
      "german": "Bonjour, c'est combien pour ce livre ? — Ça fait dix euros.",
      "english": "Hello, how much is it for this book? — That comes to ten euros."
    },
    "takeaway": "How much = C'est combien ?; Total = Ça fait X euros; Restaurant check = L'addition.",
    "curiosity_teaser": "Up next on Le Pont ([5062] L'addition, s'il vous plaît): see how C'est combien ? leads directly into L'addition, s'il vous plaît."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"How much is it for two coffees\" in French:",
    "target_answer": "C'est combien pour deux cafés",
    "word_bank": [
      "pour",
      "deux",
      "pas",
      "ne",
      "combien",
      "cafés",
      "C'est"
    ],
    "explanation": "Re-constructing \"C'est combien pour deux cafés\" from the underlying rule cements the pattern of C'est combien ?."
  }
};

export default lesson;
