import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5152,
  "slug": "lesson-5152",
  "title": "Le Manteau & La Robe",
  "subtitle": "Clothing doublets (manteau/mantle, robe/wardrobe) and adjective placement with colors.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "manteau",
    "robe",
    "bleu",
    "rouge",
    "noir",
    "blanc",
    "vert",
    "beau",
    "nouveau",
    "cher"
  ],
  "table_word_ids": [
    "manteau",
    "robe",
    "bleu",
    "rouge",
    "noir",
    "blanc",
    "vert",
    "beau",
    "nouveau",
    "cher"
  ],
  "hook": {
    "title": "Wardrobe Doublets & Wearing Clothes: Le Manteau & La Robe",
    "content": "Old French mantel ('cloak/coat') gave English 'mantle' and softened into modern French le manteau (just like castel → château and gastel → gâteau!). Frankish *rauba gave French la robe ('dress') and English 'wardrobe'. And to say 'I am wearing', French uses porter ('to carry/wear'): Je porte un manteau noir!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Look at the -el → -eau sound law: castle/château, gateau, mantle/manteau!",
        "content": "Old French -el vocalized into modern French -eau (/o/): castel → château, mantel → manteau, bel → beau, nouvel → nouveau!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "porter ('to wear / carry') + Noun + Color in Back (and BAGS in Front)",
    "content": "Combine clothing nouns with BAGS adjectives in front and color adjectives in back.",
    "linguist_note": "Old French dark /ɫ/ vocalization to -eau (/o/) explains English -el/-le vs. French -eau doublets.",
    "trap_note": "Remember: color adjectives agree with the clothing noun and stand AFTER it: un manteau blanc (m.) vs. une robe blanche (f.)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French -eau word with its English -el/-le doublet and meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "le manteau (Old French mantel)",
          "german": "the coat / overcoat (mantle)"
        },
        {
          "id": "p2",
          "english": "le château (Old French castel)",
          "german": "the castle"
        },
        {
          "id": "p3",
          "english": "le gâteau (Old French gastel)",
          "german": "the cake"
        },
        {
          "id": "p4",
          "english": "beau / bel (Old French bel)",
          "german": "beautiful / handsome"
        },
        {
          "id": "p5",
          "english": "nouveau / nouvel (Old French nouvel)",
          "german": "new (novel)"
        }
      ],
      "target_answer": "the coat / overcoat (mantle), the castle, the cake, beautiful / handsome, new (novel)",
      "meaning": "le manteau (Old French mantel), le château (Old French castel), le gâteau (Old French gastel), beau / bel (Old French bel), nouveau / nouvel (Old French nouvel)",
      "explanation": "Old French -el turned into modern French -eau (/o/) across nouns and adjectives alike!",
      "id": "fr5152_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French le manteau ('the coat') is the -el → -eau twin of which English word for a cloak (or the shelf above a fireplace)?",
      "target_answer": "mantle",
      "meaning": "mantle ↔ le manteau ('coat')",
      "explanation": "Old French mantel became English mantle and modern French manteau.",
      "id": "fr5152_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'a beautiful white dress' (la robe is feminine)?",
      "options": [
        "un beau robe blanc",
        "une robe belle blanche",
        "une belle robe blanche"
      ],
      "target_answer": "une belle robe blanche",
      "meaning": "a beautiful white dress",
      "explanation": "belle (BAGS) steps in front of robe, and blanche (Color, feminine of blanc) stands after robe!",
      "id": "fr5152_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am wearing a black coat today (use Je porte un manteau noir)",
      "cues": [
        "I wear/carry → Je porte",
        "a black coat today → un manteau noir aujourd'hui"
      ],
      "idea_parts": [
        "verb → Je porte",
        "object + color + time → un manteau noir aujourd'hui"
      ],
      "target_answer": "Je porte un manteau noir aujourd'hui",
      "meaning": "I am wearing a black coat today",
      "word_bank": [
        "aujourd'hui",
        "manteau",
        "Je",
        "un",
        "noire",
        "noir",
        "la",
        "porte"
      ],
      "explanation": "manteau is masculine, so noir stays masculine after it.",
      "diagnosis": {
        "slip": "put noir before manteau",
        "cue": "Place masculine noir after manteau: un manteau noir."
      },
      "id": "fr5152_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Elle a acheté une jolie robe rouge",
      "replays": 2,
      "target_answer": "Elle a acheté une jolie robe rouge",
      "meaning": "She bought a pretty red dress",
      "cues": [
        "Elle a acheté",
        "une jolie robe rouge"
      ],
      "explanation": "jolie (BAGS) in front of robe, rouge (color) in back.",
      "affirmation": "You flanked robe with jolie and rouge cleanly!",
      "id": "fr5152_e5"
    }
  ],
  "summary": {
    "outcome": "Decode the -el → -eau doublet law (manteau/mantle, château/castle, beau/bel) and describe clothing with porter, BAGS, and colors.",
    "use_example": {
      "german": "Il fait froid, donc je porte mon grand manteau bleu.",
      "english": "It's cold, so I'm wearing my big blue coat."
    },
    "takeaway": "Old French -el became modern French -eau (mantle → manteau, castle → château).",
    "curiosity_teaser": "You have completed every core, sprig, and support branch on Le Pont — félicitations !"
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am wearing a black coat today\" in French:",
    "target_answer": "Je porte un manteau noir aujourd'hui",
    "word_bank": [
      "aujourd'hui",
      "un",
      "noir",
      "ne",
      "manteau",
      "porte",
      "Je",
      "pas"
    ],
    "explanation": "Re-constructing \"Je porte un manteau noir aujourd'hui\" from the underlying rule cements the pattern of Le Manteau & La Robe."
  }
};

export default lesson;
