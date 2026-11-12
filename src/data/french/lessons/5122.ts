import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5122,
  "slug": "lesson-5122",
  "title": "Commander au Bistro",
  "subtitle": "Taking a table, ordering with je prends / je voudrais, and asking for l'addition.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "prendre",
    "voudrais",
    "addition",
    "table",
    "restaurant",
    "café",
    "vin",
    "eau",
    "sil_vous_plait"
  ],
  "table_word_ids": [
    "prendre",
    "voudrais",
    "addition",
    "table",
    "restaurant",
    "café",
    "vin",
    "eau",
    "sil_vous_plait"
  ],
  "hook": {
    "title": "Ordering at a Paris Bistro: Je prends…, Je voudrais…, and L'addition",
    "content": "While English says 'I'll have a coffee / We'll have the soup', French NEVER uses avoir to order food! Instead, French uses prendre ('to take': Je prends un café, Vous prenez le menu ?) alongside polite Je voudrais ('I would like')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'J'ai un café' means 'I already have a coffee sitting in front of me'",
        "content": "To say 'I'll have a coffee', always use Je prends un café or Je voudrais un café!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Order with Je prends / Je voudrais; Close with L'addition, s'il vous plaît",
    "content": "Walk through a complete bistro meal from ordering to paying the check.",
    "linguist_note": "French culinary ordering selects lexical verb prendre ('take') rather than possessive avoir.",
    "trap_note": "Never translate English 'I'll have the soup' with avoir — use Je prends de la soupe / Je voudrais!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each bistro ordering phrase with its natural English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je prends un café (never *J'ai for ordering!)",
          "german": "I'll have a coffee"
        },
        {
          "id": "p2",
          "english": "Qu'est-ce que vous prenez ?",
          "german": "What will you have? (waiter asking)"
        },
        {
          "id": "p3",
          "english": "Pour moi, de la soupe, s'il vous plaît",
          "german": "For me, some soup, please"
        },
        {
          "id": "p4",
          "english": "Une carafe d'eau, s'il vous plaît",
          "german": "A pitcher of tap water, please"
        },
        {
          "id": "p5",
          "english": "L'addition, s'il vous plaît",
          "german": "The check / bill, please"
        }
      ],
      "target_answer": "I'll have a coffee, What will you have? (waiter asking), For me, some soup, please, A pitcher of tap water, please, The check / bill, please",
      "meaning": "Je prends un café (never *J'ai for ordering!), Qu'est-ce que vous prenez ?, Pour moi, de la soupe, s'il vous plaît, Une carafe d'eau, s'il vous plaît, L'addition, s'il vous plaît",
      "explanation": "prendre is the workhorse verb for ordering food and drink.",
      "id": "fr5122_e1"
    },
    {
      "type": "shift_select",
      "prompt": "The waiter asks 'Qu'est-ce que vous prenez ?' How do you say 'I'll have a black coffee, please'?",
      "options": [
        "Je prends un café noir, s'il vous plaît",
        "J'ai un café noir, s'il vous plaît",
        "Je fais un café noir, s'il vous plaît"
      ],
      "target_answer": "Je prends un café noir, s'il vous plaît",
      "meaning": "I'll have (lit. I take) a black coffee, please",
      "explanation": "French uses Je prends ('I take') for 'I'll have' when ordering.",
      "id": "fr5122_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences match the waiter's question 'Vous avez choisi ?'?",
      "german": "Vous avez choisi ?",
      "meaning": "Have you chosen / Are you ready to order?",
      "renderings": [
        "Are you ready to order?",
        "Have you decided what you'd like?"
      ],
      "traps": [
        "Did you pay the bill already?",
        "Do you want to leave the restaurant?"
      ],
      "target_answer": "Are you ready to order?",
      "explanation": "choisi is the past participle of choisir ('to choose') — 'Have you chosen?' means 'Are you ready to order?'!",
      "id": "fr5122_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I'll have some soup and some bread, please (using Je prends)",
      "cues": [
        "I take some soup → Je prends de la soupe",
        "and some bread, please → et du pain, s'il vous plaît"
      ],
      "idea_parts": [
        "verb + fem partitive → Je prends de la soupe",
        "masc partitive + polite tag → et du pain, s'il vous plaît"
      ],
      "target_answer": "Je prends de la soupe et du pain, s'il vous plaît",
      "meaning": "I'll have some soup and some bread, please",
      "word_bank": [
        "s'il",
        "de",
        "Je",
        "et",
        "vous",
        "plaît",
        "le",
        "soupe",
        "pain",
        "ai",
        "la",
        "du",
        "prends"
      ],
      "explanation": "Je prends + de la soupe (f.) + et du pain (m.).",
      "diagnosis": {
        "slip": "used ai instead of prends",
        "cue": "Use Je prends when ordering food and drink."
      },
      "id": "fr5122_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'était délicieux, nous voudrions l'addition",
      "replays": 2,
      "target_answer": "C'était délicieux, nous voudrions l'addition",
      "meaning": "It was delicious, we would like the bill",
      "cues": [
        "C'était délicieux",
        "nous voudrions l'addition"
      ],
      "explanation": "C'était praises the meal just finished, and nous voudrions l'addition asks for the check.",
      "affirmation": "You combined C'était and nous voudrions l'addition cleanly.",
      "id": "fr5122_e5"
    }
  ],
  "summary": {
    "outcome": "Order meals and drinks naturally using prendre (Je prends / Vous prenez) and Je voudrais, and ask for l'addition.",
    "use_example": {
      "german": "Qu'est-ce que tu prends ? — Je prends un café et un croissant.",
      "english": "What are you having? — I'll have a coffee and a croissant."
    },
    "takeaway": "To order food or drink, English 'I'll have' is always French Je prends ('I take').",
    "curiosity_teaser": "Up next on Le Pont ([14] Possessives Agree with the Thing): see how Commander au Bistro leads directly into Possessives Agree with the Thing."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I'll have some soup and some bread, please\" in French:",
    "target_answer": "Je prends de la soupe et du pain, s'il vous plaît",
    "word_bank": [
      "prends",
      "Je",
      "vous",
      "la",
      "et",
      "ne",
      "pas",
      "pain",
      "s'il",
      "de",
      "soupe",
      "du",
      "plaît"
    ],
    "explanation": "Re-constructing \"Je prends de la soupe et du pain, s'il vous plaît\" from the underlying rule cements the pattern of Commander au Bistro."
  }
};

export default lesson;
