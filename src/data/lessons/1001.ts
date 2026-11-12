import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1001,
  "slug": "den-einen-ihn-case-gym",
  "title": "den / einen / ihn Case Gym",
  "subtitle": "Eighteen accusative-object drills with the table words you own",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "der",
    "die",
    "das",
    "kaffee",
    "tee",
    "tisch",
    "traum",
    "tag",
    "haus",
    "glas",
    "stuhl",
    "fenster",
    "löffel",
    "stehen",
    "zeigen",
    "küssen",
    "setzen",
    "sitzen",
    "halten"
  ],
  "table_word_ids": [
    "kaffee",
    "tee",
    "tisch",
    "traum",
    "tag",
    "haus",
    "der",
    "die",
    "das",
    "glas",
    "stuhl",
    "fenster",
    "löffel",
    "stehen",
    "zeigen",
    "küssen",
    "setzen",
    "sitzen",
    "halten"
  ],
  "hook": {
    "title": "The Gym Is Open",
    "content": "You know the secret: only the masculine raises its hand for direct objects — der → den, ein → einen, er → ihn — while feminine and neuter stand still. What you need now is repetition until the reflex is instant. The gym equipment is your own vocabulary: Kaffee, Tee, Tisch, Traum, Tag, Haus, Glas — plus three new props: der Stuhl, das Fenster, der Löffel. Reps, five machines, and every sentence is one you could furnish a room with.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why Drill This Case First",
        "content": "The accusative is the case of DOING things to things — drinking, finding, bringing, seeking. It is the case you meet in every café sentence you will ever say. Master the masculine flag and 80% of everyday object sentences write themselves."
      }
    ]
  },
  "pattern": {
    "title": "The Drill Circuit",
    "content": "Circuit one — articles: der Kaffee becomes den Kaffee when you drink it; der Traum becomes einen Traum when you have it. Circuit two — pronouns: ich sehe ihn (I see him), ich finde ihn (I find it). Circuit three — the untouched twins: die Zeit stays die Zeit, das Wasser stays das Wasser, no matter what you do to them. Circuit four — the full sentence: Ich trinke den Kaffee und esse den Apfel... every masculine object pays the -n toll; every feminine and neuter object rides free.",
    "footnotes": [],
    "linguist_note": "Notice der Tra(um) → einen Traum: the article carries the case flag, not the noun. German marks the object on the determiner — the same job English 'him' and 'whom' still do for pronouns."
  },
  "exercises": [
    {
      "id": "l1001_e1",
      "type": "matching_pairs",
      "prompt": "Match each phrase with its partner — masculine articles pay the -n toll as objects, and the last two are wir-forms for free. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "cg1",
          "english": "der Kaffee (subject)",
          "german": "den Kaffee (object)"
        },
        {
          "id": "cg2",
          "english": "ein Traum (subject)",
          "german": "einen Traum (object)"
        },
        {
          "id": "cg3",
          "english": "der Tag (subject)",
          "german": "den Tag (object)"
        },
        {
          "id": "cg4",
          "english": "ein Tisch (subject)",
          "german": "einen Tisch (object)"
        },
        {
          "id": "cg5",
          "english": "der Stuhl (subject)",
          "german": "den Stuhl (object)"
        },
        {
          "id": "cg6",
          "english": "der Löffel (subject)",
          "german": "den Löffel (object)"
        },
        {
          "id": "cg7",
          "english": "we kiss",
          "german": "wir küssen"
        },
        {
          "id": "cg8",
          "english": "we stand",
          "german": "wir stehen"
        },
        {
          "id": "recall1",
          "german": "Wir können laufen",
          "english": "We can run"
        }
      ],
      "target_answer": "den Kaffee (object), einen Traum (object), den Tag (object), einen Tisch (object), den Stuhl (object), den Löffel (object), wir küssen, wir stehen, Wir können laufen",
      "meaning": "der Kaffee (subject); ein Traum (subject); der Tag (subject); ein Tisch (subject); der Stuhl (subject); der Löffel (subject); we kiss; we stand; We can run",
      "explanation": "Masculine objects pay the -n toll: der → den, ein → einen. The two wir-forms ride free — no object, no toll."
    },
    {
      "id": "l1001_e2",
      "type": "shift_select",
      "prompt": "Complete: 'Wir halten _____ Löffel' (we hold the spoon):",
      "options": [
        "der",
        "den",
        "des",
        "dem"
      ],
      "target_answer": "den",
      "meaning": "Wir halten den Löffel",
      "explanation": "Löffel is masculine and here it is the direct object: der → den."
    },
    {
      "id": "l1001_e3",
      "type": "shift_select",
      "prompt": "Which sentence has NO accusative change — and why?",
      "options": [
        "Ich habe dem Fenster — dative for windows",
        "Ich habe den Fenster — the -n toll applies to all",
        "Ich habe das Fenster — neuter objects stay unchanged",
        "Ich habe des Fensters — genitive in rooms"
      ],
      "target_answer": "Ich habe das Fenster — neuter objects stay unchanged",
      "meaning": "Neuter and feminine ride free in the accusative",
      "explanation": "Only masculine singular marks the direct object. das Fenster, das Wasser, die Zeit — no flag change, ever."
    },
    {
      "id": "l1001_e4",
      "type": "derive",
      "prompt": "Complete: 'Ich suche _____ Kaffee' (ein + the Him-Case):",
      "english_hint": "ein + en",
      "target_answer": "einen",
      "meaning": "Ich suche einen Kaffee = I am looking for a coffee",
      "explanation": "der Kaffee is masculine, sought and found: ein → einen."
    },
    {
      "id": "l1001_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We put down the chair and show the spoon'",
      "target_answer": "Wir setzen den Stuhl und zeigen den Löffel",
      "meaning": "We put down the chair and show the spoon",
      "word_bank": [
        "zeigen",
        "ein",
        "den",
        "Löffel",
        "Wir",
        "den",
        "setzen",
        "sehr",
        "Stuhl",
        "und"
      ],
      "explanation": "Two masculine objects, two -n tolls — and one wir carries both verbs: setzen and zeigen keep their dictionary forms in the shared frame."
    }
  ],
  "summary": {
    "outcome": "Use den, einen, and ihn correctly with masculine direct objects across everyday sentences.",
    "use_example": {
      "german": "Ich habe einen Traum.",
      "english": "I have a dream."
    },
    "takeaway": "Masculine objects pay the -n toll (der → den, ein → einen); feminine and neuter stay unchanged.",
    "curiosity_teaser": "Next: Him & Whom — the proof texts where English still wears the ancient accusative on its sleeve."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from den / einen / ihn Case Gym (We put down the chair and show the spoon):",
    "target_answer": "Wir setzen den Stuhl und zeigen den Löffel",
    "word_bank": [
      "den",
      "zeigen",
      "und",
      "setzen",
      "nicht",
      "Wir",
      "heute",
      "Stuhl",
      "Löffel",
      "den"
    ],
    "explanation": "Re-assembling \"Wir setzen den Stuhl und zeigen den Löffel\" from scratch locks in the structural pattern of den / einen / ihn Case Gym without relying on short-term echo."
  }
};

export default lesson;
