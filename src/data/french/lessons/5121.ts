import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5121,
  "slug": "lesson-5121",
  "title": "Le Pain, Le Fromage, Le Vin & L'Eau",
  "subtitle": "The French table staples with definite vs partitive articles (le pain vs du pain).",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "pain",
    "fromage",
    "vin",
    "eau",
    "soupe",
    "café",
    "du",
    "de",
    "le",
    "la"
  ],
  "table_word_ids": [
    "pain",
    "fromage",
    "vin",
    "eau",
    "soupe",
    "café",
    "du",
    "de",
    "le",
    "la"
  ],
  "hook": {
    "title": "The French Table: Definite Love (le pain) vs. Partitive Plate (du pain)",
    "content": "When you say you love or prefer a food in general (aimer, adorer, préférer), use the DEFINITE article (J'aime le fromage et le vin). When you eat, drink, buy, or want some on your plate (vouloir, prendre, manger), use the PARTITIVE article (Je prends du fromage, du pain et de l'eau)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'fromage' comes from the word for 'form / mold'",
        "content": "Late Latin caseus formāticus ('cheese made in a mold') gave French le fromage!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "General Love (aimer/préférer + le/la/l') vs. On Your Plate (prendre/vouloir + du/de la/de l')",
    "content": "Contrast J'aime le vin rouge ('I like red wine' in general) with Je voudrais du vin rouge ('I would like some red wine' in my glass).",
    "linguist_note": "Verbs of affect take generic definite NPs, whereas verbs of consumption take partitive NPs.",
    "trap_note": "Never use du/de la after aimer or préférer (*J'aime du fromage) — always say J'aime le fromage!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Contrast general liking (le/la/l') with having some on your plate (du/de la/de l'):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I love cheese (in general)",
          "german": "J'aime le fromage"
        },
        {
          "id": "p2",
          "english": "I am having some cheese (on my plate)",
          "german": "Je prends du fromage"
        },
        {
          "id": "p3",
          "english": "I prefer red wine (in general)",
          "german": "Je préfère le vin rouge"
        },
        {
          "id": "p4",
          "english": "I would like some red wine (in my glass)",
          "german": "Je voudrais du vin rouge"
        },
        {
          "id": "p5",
          "english": "I want some water (in my glass)",
          "german": "Je veux de l'eau"
        }
      ],
      "target_answer": "J'aime le fromage, Je prends du fromage, Je préfère le vin rouge, Je voudrais du vin rouge, Je veux de l'eau",
      "meaning": "I love cheese (in general), I am having some cheese (on my plate), I prefer red wine (in general), I would like some red wine (in my glass), I want some water (in my glass)",
      "explanation": "aimer/préférer take definite le/la/l'; prendre/vouloir/manger take partitive du/de la/de l'.",
      "id": "fr5121_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Fill the two blanks: 'I love bread, so I am buying some bread' ('J'aime ___ pain, donc j'achète ___ pain'):",
      "options": [
        "le pain / le pain",
        "du pain / du pain",
        "le pain / du pain"
      ],
      "target_answer": "le pain / du pain",
      "meaning": "General love takes le pain; buying a portion takes partitive du pain!",
      "explanation": "J'aime le pain (general category) vs. j'achète du pain (unspecified quantity).",
      "id": "fr5121_e2"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French pain ('bread', from Latin pānis) hides inside which English word for the small room where bread and food provisions are stored?",
      "target_answer": "pantry",
      "meaning": "pantry / companion ↔ le pain ('bread')",
      "explanation": "A pantry was originally the bread-room (paneterie)!",
      "id": "fr5121_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I prefer wine, but today I am having some water (use je prends de l'eau)",
      "cues": [
        "I prefer wine → Je préfère le vin",
        "but today I take some water → mais aujourd'hui je prends de l'eau"
      ],
      "idea_parts": [
        "general preference → Je préfère le vin",
        "specific consumption → mais aujourd'hui je prends de l'eau"
      ],
      "target_answer": "Je préfère le vin, mais aujourd'hui je prends de l'eau",
      "meaning": "I prefer wine, but today I'm having some water",
      "word_bank": [
        "le",
        "du",
        "mais",
        "préfère",
        "vin",
        "l'eau",
        "Je",
        "la",
        "prends",
        "je",
        "aujourd'hui",
        "de"
      ],
      "explanation": "préférer takes definite le vin; prendre takes partitive de l'eau.",
      "diagnosis": {
        "slip": "used du vin after préfère",
        "cue": "After préférer, use the definite article: Je préfère le vin."
      },
      "id": "fr5121_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous prenons du pain, du fromage et de la soupe",
      "replays": 2,
      "target_answer": "Nous prenons du pain, du fromage et de la soupe",
      "meaning": "We are having bread, cheese, and soup",
      "cues": [
        "Nous prenons du pain",
        "du fromage et de la soupe"
      ],
      "explanation": "Masculine du pain, du fromage + feminine de la soupe.",
      "affirmation": "You matched all three partitive articles accurately!",
      "id": "fr5121_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish definite articles after verbs of liking (J'aime le pain) from partitive articles after verbs of eating/ordering (Je prends du pain).",
    "use_example": {
      "german": "J'adore le fromage français — j'en prends toujours avec du pain.",
      "english": "I love French cheese — I always have some with bread."
    },
    "takeaway": "Liking in general = le / la / l'; Eating or ordering some = du / de la / de l'.",
    "curiosity_teaser": "Up next on Le Pont ([5122] Commander au Bistro): see how Le Pain, Le Fromage, Le Vin & L'Eau leads directly into Commander au Bistro."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I prefer wine, but today I'm having some water\" in French:",
    "target_answer": "Je préfère le vin, mais aujourd'hui je prends de l'eau",
    "word_bank": [
      "Je",
      "prends",
      "pas",
      "préfère",
      "je",
      "mais",
      "aujourd'hui",
      "ne",
      "vin",
      "le",
      "de",
      "l'eau"
    ],
    "explanation": "Re-constructing \"Je préfère le vin, mais aujourd'hui je prends de l'eau\" from the underlying rule cements the pattern of Le Pain, Le Fromage, Le Vin & L'Eau."
  }
};

export default lesson;
