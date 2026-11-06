import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5192,
  "slug": "kleidung-ii-socke-tasche-muetze-schal-hut",
  "title": "Kleidung II: die Socke, die Tasche, die Mütze, der Schal, der Hut",
  "subtitle": "the small gear — two Latin loans, one word Germany borrowed back from English, and two honest losses",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "socke",
    "tasche",
    "mütze",
    "schal",
    "hut",
    "nummer",
    "schuh",
    "hose",
    "hemd",
    "mantel",
    "jacke",
    "tragen"
  ],
  "table_word_ids": [
    "socke",
    "tasche",
    "mütze",
    "schal",
    "hut",
    "nummer",
    "schuh",
    "hose",
    "hemd",
    "mantel",
    "jacke",
    "tragen",
    "hase",
    "ferien",
    "heben"
  ],
  "hook": {
    "title": "Words That Travel in Both Directions",
    "content": "Kleidung I gave you four English twins; the small gear tells a messier, more human story. die Socke and English sock are the same Latin word, soccus — the light slipper Roman comic actors wore — which walked into both Germanic languages separately. der Schal travelled the wrong way: Germany borrowed it FROM English shawl (which itself started life in Persian). der Hut is the honest ancient twin of hat, straight from Proto-Germanic *hattuz. And then two honest losses: die Tasche and die Mütze have no safe English twin — English lost those words somewhere in the last thousand years, and pretending otherwise would be fabrication. Borrowing is a two-way street: German lent and borrowed, and the wardrobe keeps the receipts.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Slipper of Roman Comedy",
        "content": "Latin soccus was the low, slipper-like shoe worn by the actors of Roman comedy — the sock of 'sock and buskin', the old phrase for comedy and tragedy. English sock and German Socke both take their word from that stage floor."
      }
    ]
  },
  "pattern": {
    "title": "Tragen Takes an Object",
    "content": "Three frames. 1. tragen + accusative: Ich trage einen Schal (masc.), eine Mütze (fem.), einen Hut — the clothing is the object, so einen/eine ride along: Ich trage den Regenmantel. 2. Position with dative: Der Schal ist über dem Hemd (the scarf is over the shirt) — über + dem for where something hangs. 3. Inside-compounds: Die Tasche ist im Mantel (the bag is in the coat), Meine Nummer ist in der Tasche. And the compound engine from Kleidung I keeps running: der Regenmantel is literally der Regen + der Mantel, a rain-coat for the rain.",
    "footnotes": [],
    "linguist_note": "English 'shawl' entered from Persian shāl via India in the 18th century and was so fashionable that German borrowed it right back as der Schal — a reverse loan, the linguistic equivalent of re-exporting a fashion."
  },
  "exercises": [
    {
      "id": "l5192_e1",
      "type": "matching_pairs",
      "prompt": "The small gear, in position — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "k21",
          "english": "The sock and the shoe belong together",
          "german": "Die Socke und der Schuh"
        },
        {
          "id": "k22",
          "english": "The scarf is over the shirt",
          "german": "Der Schal ist über dem Hemd"
        },
        {
          "id": "k23",
          "english": "The bag is in the coat",
          "german": "Die Tasche ist im Mantel"
        },
        {
          "id": "k24",
          "english": "My number is in the bag",
          "german": "Meine Nummer ist in der Tasche"
        },
        {
          "id": "k25",
          "english": "The jacket is new, the trousers are old",
          "german": "Die Jacke ist neu, die Hose ist alt"
        },
        {
          "id": "k26",
          "english": "The rain-coat is for the rain",
          "german": "Der Regenmantel ist für den Regen"
        }
      ],
      "target_answer": "Die Socke und der Schuh, Der Schal ist über dem Hemd, Die Tasche ist im Mantel, Meine Nummer ist in der Tasche, Die Jacke ist neu, die Hose ist alt, Der Regenmantel ist für den Regen",
      "meaning": "socks and shoes, scarves over shirts, bags inside coats, a rain-coat for the rain",
      "explanation": "Six positions, one wardrobe. über dem Hemd is dative because the scarf merely hangs there; für den Regen is accusative because the coat is destined for it. And die Socke pairs with der Schuh — two genders the English words never had to learn."
    },
    {
      "id": "l5192_e2",
      "type": "reverse_cognate",
      "prompt": "One of these words travelled the wrong way: Germany took IT from English. Which?",
      "options": [
        "der Schal",
        "die Socke",
        "der Hut",
        "die Mütze"
      ],
      "target_answer": "der Schal",
      "meaning": "der Schal is a reverse loan: German took it FROM English",
      "explanation": "der Schal came from English shawl in the 19th century, when shawls were the height of fashion. die Socke and English sock both borrowed separately from Latin soccus, and der Hut ↔ hat is an ancient Germanic twin — but only the Schal crossed from English into German."
    },
    {
      "id": "l5192_e3",
      "type": "morpheme_tiles",
      "prompt": "Assemble the pair that belongs together: 'The sock and the shoe'",
      "tile_options": [
        "und",
        "Schuh",
        "Hemd",
        "der",
        "Die",
        "Socke",
        "das"
      ],
      "target_answer": "Die Socke und der Schuh",
      "meaning": "The sock and the shoe",
      "explanation": "die Socke, der Schuh — the article rides with the noun, and und simply stacks them. das Hemd sits in the bank to prove the article changes with the noun: das Hemd, die Socke, der Schuh."
    },
    {
      "id": "l5192_e4",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The jacket is new and the trousers are old'",
      "target_answer": "Die Jacke ist neu und die Hose ist alt",
      "meaning": "The jacket is new and the trousers are old",
      "word_bank": [
        "der",
        "Hut",
        "die",
        "Hose",
        "Jacke",
        "ist",
        "und",
        "ist",
        "alt",
        "neu",
        "Die"
      ],
      "explanation": "One und, two clauses. die Jacke and die Hose are both feminine, so the same article fronts each noun — the contrast between neu and alt carries the whole sentence."
    },
    {
      "id": "l5192_e5",
      "type": "transcribe",
      "prompt": "Say it in German:",
      "idea": "you are getting dressed and announce what goes on top: you are wearing the hat and the cap",
      "cues": [
        "der Hut becomes den Hut (masculine accusative); die Mütze stays die Mütze"
      ],
      "target_answer": "Ich trage den Hut und die Mütze",
      "meaning": "I am wearing the hat and the cap",
      "word_bank": [
        "meine",
        "Hut",
        "trage",
        "und",
        "Schal",
        "den",
        "Ich",
        "die",
        "Mütze"
      ],
      "explanation": "tragen is the wardrobe's verb: Ich trage den Hut (masc. → den), die Mütze (fem. → die). The masculine is the only one that changes its article in the accusative — the feminine and neuter stay put.",
      "diagnosis": {
        "slip": "the masculine article stayed der in the accusative",
        "cue": "Only the masculine changes: der Hut → den Hut. die Mütze and das Hemd keep their articles in every case you will meet this week."
      }
    }
  ],
  "summary": {
    "outcome": "Talk about the small gear, put a scarf over a shirt and a bag in a coat — and know which words Germany borrowed, lent, and lost.",
    "use_example": {
      "german": "Der Schal ist über dem Hemd — ich trage den Hut und die Mütze.",
      "english": "The scarf is over the shirt — I am wearing the hat and the cap."
    },
    "takeaway": "Socke and sock share Latin soccus, der Schal is a loan FROM English shawl, der Hut is hat's ancient twin — and die Tasche, die Mütze stand alone, honestly.",
    "curiosity_teaser": "Next: the rooms you live in — das Zimmer, die Wohnung, der Flur, der Keller, die Etage — and the word hiding inside English timber."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Kleidung II: die Socke, die Tasche, die Mütze, der Schal, der Hut (The jacket is new and the trousers are old):",
    "target_answer": "Die Jacke ist neu und die Hose ist alt",
    "word_bank": [
      "neu",
      "und",
      "alt",
      "nicht",
      "ist",
      "ist",
      "Hose",
      "die",
      "Jacke",
      "Die",
      "heute"
    ],
    "explanation": "Re-assembling \"Die Jacke ist neu und die Hose ist alt\" from scratch locks in the structural pattern of Kleidung II: die Socke, die Tasche, die Mütze, der Schal, der Hut without relying on short-term echo."
  }
};

export default lesson;
