import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5191,
  "slug": "kleidung-i-schuh-hose-hemd-mantel-jacke",
  "title": "Kleidung I: der Schuh, die Hose, das Hemd, der Mantel, die Jacke",
  "subtitle": "what you wear — and the accusative that tragen demands",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "schuh",
    "hose",
    "hemd",
    "mantel",
    "jacke",
    "tragen",
    "kaufen",
    "klein",
    "warm",
    "weiß",
    "neu",
    "schön",
    "später",
    "selten",
    "moment",
    "sekunde"
  ],
  "table_word_ids": [
    "schuh",
    "hose",
    "hemd",
    "mantel",
    "jacke",
    "tragen",
    "kaufen",
    "klein",
    "warm",
    "weiß",
    "neu",
    "schön",
    "später",
    "selten",
    "moment",
    "sekunde"
  ],
  "hook": {
    "title": "The Wardrobe Reunion",
    "content": "The wardrobe is where English kept its Germanic closet. der Schuh ↔ shoe is a pure twin — same word, same sound, same ancient *skōhaz. die Hose ↔ hose is the same word too: English wore hose for centuries before trousers took over, and hosiery still keeps the old name. der Mantel ↔ mantle is Latin mantellum twice over — it walked into German directly (Old High German mantal) and into English through French (mantel): one Latin word, two roads. die Jacke came from French jaque, a short jacket named for the name Jacques — a jacket is, etymologically, a Jack. das Hemd is the honest loss: its Old English cousin hama — a garment, a covering skin — died out a thousand years ago, and English dressed itself in a different Germanic word, shirt (the shirt/skirt doublet). Four twins and one loss — the wardrobe keeps the family tree better than the family does.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "From Jacques to Jacket",
        "content": "French jaque was the name of the short work-jacket, from the popular name Jacques — French for James, from Late Latin Iacobus. English took the diminutive jaquet and made jacket; German took jaque whole and made Jacke. Two languages, one name tag."
      }
    ]
  },
  "pattern": {
    "title": "Tragen Wears the Accusative",
    "content": "Tragen takes clothes the way sein takes states: Ich trage einen Mantel. The article does the case work: einen Mantel (masculine accusative), eine Hose (feminine), ein Hemd (neuter). Front a time or frequency word and the verb holds slot 2: Selten trage ich einen Mantel. Später kaufe ich eine Jacke. The two -e nouns are die (die Hose, die Jacke); Schuh and Mantel are der; Hemd is das. And the everyday facts hold for all five: Der Schuh ist zu klein, der Mantel ist warm, das Hemd ist weiß.",
    "footnotes": [],
    "linguist_note": "hose is the survivor word. English wore hose when Chaucer wrote; then the word retreated — to hosiery, then to the tube in the garden. German never retreated: die Hose is still the everyday word for trousers."
  },
  "exercises": [
    {
      "id": "l5191_e1",
      "type": "matching_pairs",
      "prompt": "The wardrobe and its frames — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "wd1",
          "english": "The shoe is too small",
          "german": "Der Schuh ist zu klein"
        },
        {
          "id": "wd2",
          "english": "The trousers are new",
          "german": "Die Hose ist neu"
        },
        {
          "id": "wd3",
          "english": "The shirt is white",
          "german": "Das Hemd ist weiß"
        },
        {
          "id": "wd4",
          "english": "The coat is warm",
          "german": "Der Mantel ist warm"
        },
        {
          "id": "wd5",
          "english": "The jacket is beautiful",
          "german": "Die Jacke ist schön"
        },
        {
          "id": "wd6",
          "english": "Later I buy a coat",
          "german": "Später kaufe ich einen Mantel"
        },
        {
          "id": "wd7",
          "english": "One moment, please — the coat is beautiful",
          "german": "Einen Moment, bitte, der Mantel ist schön"
        },
        {
          "id": "wd8",
          "english": "One second, please",
          "german": "Eine Sekunde, bitte"
        }
      ],
      "target_answer": "Der Schuh ist zu klein, Die Hose ist neu, Das Hemd ist weiß, Der Mantel ist warm, Die Jacke ist schön, Später kaufe ich einen Mantel, Einen Moment, bitte, der Mantel ist schön, Eine Sekunde, bitte",
      "meaning": "shoe, trousers, shirt, coat, jacket — and later I buy",
      "explanation": "Five garments, three genders: der Schuh and der Mantel, die Hose and die Jacke, das Hemd. Note die Hose takes a SINGULAR verb — Die Hose ist neu, never sind."
    },
    {
      "id": "l5191_e2",
      "type": "shift_select",
      "prompt": "'_____ trage ich einen Mantel.' — I seldom wear a coat. Which word takes position 1 and pushes trage to slot 2?",
      "options": [
        "Später",
        "Selten",
        "Immer",
        "Heute"
      ],
      "target_answer": "Selten",
      "meaning": "Selten trage ich einen Mantel — fronted frequency, verb in slot 2",
      "explanation": "Fronting an adverb swaps positions 1 and 2 — the same move as Heute kaufe ich ein. Selten is English seldom's twin (German hardened the D to T, English kept the D); Immer would say the opposite, Später only shifts the hour."
    },
    {
      "id": "l5191_e3",
      "type": "reverse_cognate",
      "prompt": "Which English word was once the everyday name for legwear — the TRUE twin German still uses?",
      "options": [
        "stockings",
        "trousers",
        "hose",
        "leggings"
      ],
      "target_answer": "hose",
      "meaning": "Hose ↔ hose: same word, one retreated, one stayed",
      "explanation": "English wore hose for centuries; the word survives in hosiery before it went to the garden tube. German kept die Hose in daily use — the twin that never left home."
    },
    {
      "id": "l5191_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble: 'I wear a coat' — watch the accusative",
      "tile_options": [
        "das",
        "Mantel",
        "Ich",
        "einen",
        "eine",
        "trage",
        "ein"
      ],
      "target_answer": "Ich trage einen Mantel",
      "meaning": "I wear a coat",
      "explanation": "tragen takes the garment as its object, so der Mantel turns accusative: einen Mantel. eine and ein in the bank are the feminine and neuter forms — right for die Hose and das Hemd, wrong for the coat."
    },
    {
      "id": "l5191_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Later I buy trousers and a jacket'",
      "target_answer": "Später kaufe ich eine Hose und eine Jacke",
      "meaning": "Later I buy trousers and a jacket",
      "word_bank": [
        "und",
        "Mantel",
        "eine",
        "einen",
        "eine",
        "Schuh",
        "kaufe",
        "Später",
        "Jacke",
        "Hose",
        "ich"
      ],
      "explanation": "Two -e feminines in a row: eine Hose und eine Jacke — no ending to change. The bank's einen Mantel is the masculine trap: it would be right for the coat, wrong here."
    }
  ],
  "summary": {
    "outcome": "Talk about what you wear with tragen + accusative — einen Mantel, eine Hose, ein Hemd — and front Selten or Später like a native.",
    "use_example": {
      "german": "Selten trage ich einen Mantel — später kaufe ich eine Jacke.",
      "english": "I seldom wear a coat — later I'll buy a jacket."
    },
    "takeaway": "Schuh ↔ shoe, Hose ↔ hose, Mantel ↔ mantle, Jacke ↔ jacket — and Hemd, the word English lost; tragen wears einen, eine or ein.",
    "curiosity_teaser": "Next: the small gear — die Socke, die Tasche, die Mütze, der Schal, der Hut."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Kleidung I: der Schuh, die Hose, das Hemd, der Mantel, die Jacke (Later I buy trousers and a jacket):",
    "target_answer": "Später kaufe ich eine Hose und eine Jacke",
    "word_bank": [
      "Hose",
      "Jacke",
      "ich",
      "nicht",
      "heute",
      "und",
      "eine",
      "Später",
      "kaufe",
      "eine"
    ],
    "explanation": "Re-assembling \"Später kaufe ich eine Hose und eine Jacke\" from scratch locks in the structural pattern of Kleidung I: der Schuh, die Hose, das Hemd, der Mantel, die Jacke without relying on short-term echo."
  }
};

export default lesson;
