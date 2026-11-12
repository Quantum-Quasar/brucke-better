import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 403,
  "slug": "lesson-403",
  "title": "The Extended Sandwich",
  "subtitle": "jamais, rien and plus join ne...pas — three more fillings for the same sandwich",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "jamais",
    "rien",
    "plus_neg",
    "ne",
    "pas",
    "vouloir",
    "participer",
    "célébrer"
  ],
  "table_word_ids": [
    "jamais",
    "rien",
    "plus_neg",
    "ne",
    "pas",
    "vouloir",
    "participer",
    "célébrer"
  ],
  "hook": {
    "title": "One Sandwich, Three New Fillings",
    "content": "Topic 4 built the ne...pas sandwich: ne before the verb, pas after it. The bread never changes — only the filling does. Swap pas for jamais and the sentence says never; swap it for rien and it says nothing; swap it for plus and it says no longer.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Where the fillings come from",
        "content": "jamais is ja ('already') + mais ('more') — 'ever more' worn down into 'never'. rien is Latin res ('a thing') shrunk to 'no thing': I want not a thing.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Ne + Verb + Filling",
    "content": "jamais, rien and plus slot exactly where pas goes: Je ne veux pas → Je ne veux jamais / Je ne veux rien / Je ne veux plus. The frame holds; the meaning follows the filling.",
    "linguist_note": "Three little words, three different histories — but French grammars them as one: the second slice of a sandwich.",
    "trap_note": "Keep both slices in the sentence: rien or jamais alone cannot negate — ne always goes before the verb, even in short answers like Rien !"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English meaning with its French filling (or full sandwich):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "never",
          "german": "ne...jamais"
        },
        {
          "id": "p2",
          "english": "nothing",
          "german": "ne...rien"
        },
        {
          "id": "p3",
          "english": "no longer",
          "german": "ne...plus"
        },
        {
          "id": "p4",
          "english": "I never want to participate",
          "german": "Je ne veux jamais participer"
        },
        {
          "id": "p5",
          "english": "I want nothing",
          "german": "Je ne veux rien"
        }
      ],
      "target_answer": "ne...jamais, ne...rien, ne...plus, Je ne veux jamais participer, Je ne veux rien",
      "meaning": "never, nothing, no longer, I never want to participate, I want nothing",
      "explanation": "Same bread, three fillings: jamais, rien, plus — each one takes pas's old seat.",
      "id": "fr403_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I never want to celebrate'?",
      "options": [
        "Je veux jamais célébrer",
        "Je ne veux jamais célébrer",
        "Je ne veux célébrer jamais"
      ],
      "target_answer": "Je ne veux jamais célébrer",
      "meaning": "I never want to celebrate",
      "explanation": "ne before veux, jamais after it — the sandwich order does not move.",
      "id": "fr403_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the filling that turns 'I don't want' into 'I want nothing':",
      "english_hint": "Latin res — a thing — shrunk to nothing",
      "target_answer": "rien",
      "meaning": "nothing",
      "explanation": "rien: literally 'no thing' — je ne veux rien is 'I want not a thing'.",
      "id": "fr403_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you no longer want to participate",
      "cues": [
        "plus is the filling for 'no longer'",
        "ne goes before veux, the filling after"
      ],
      "idea_parts": [
        "you no longer want → Tu ne veux plus",
        "to participate → participer"
      ],
      "target_answer": "Tu ne veux plus participer",
      "meaning": "You no longer want to participate",
      "word_bank": [
        "Tu",
        "ne",
        "veux",
        "plus",
        "participer",
        "jamais",
        "rien"
      ],
      "explanation": "Tu ne veux plus participer — plus carries 'no longer' in pas's old seat.",
      "diagnosis": {
        "slip": "put the filling before the verb",
        "cue": "The verb stays inside the sandwich: ne... plus, with veux in the middle."
      },
      "id": "fr403_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je ne veux jamais participer",
      "replays": 2,
      "target_answer": "Je ne veux jamais participer",
      "meaning": "I never want to participate",
      "cues": [
        "It means: I never want to participate",
        "The filling is jamais"
      ],
      "explanation": "Je ne veux jamais participer — the Topic 4 sandwich, filled with jamais.",
      "affirmation": "You wrote the whole sandwich: ne before veux, jamais after it.",
      "id": "fr403_e5"
    }
  ],
  "summary": {
    "outcome": "Negate with jamais, rien and plus while keeping the ne...X sandwich intact.",
    "use_example": {
      "german": "Je ne veux jamais participer",
      "english": "I never want to participate"
    },
    "takeaway": "The bread never changes — ne before the verb, the filling after it.",
    "curiosity_teaser": "Up next on Le Pont ([5] être & Its Secrets): see how The Extended Sandwich leads directly into être & Its Secrets."
  },
  "twist": {
    "prompt": "Think it through again without looking back — say you want nothing:",
    "target_answer": "Je ne veux rien",
    "word_bank": [
      "Je",
      "ne",
      "veux",
      "rien",
      "jamais",
      "pas"
    ],
    "explanation": "Rebuilding \"Je ne veux rien\" from the sandwich rule cements the filling pattern."
  }
};

export default lesson;
