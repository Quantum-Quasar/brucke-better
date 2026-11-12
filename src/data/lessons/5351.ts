import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5351,
  "slug": "story-das-geheimnis-der-bibliothek",
  "title": "Das Geheimnis der Bibliothek",
  "subtitle": "A book falls in a library-bar, and a letter hides a treasure",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "brief",
    "buch",
    "alt",
    "finden",
    "suchen",
    "nacht",
    "licht"
  ],
  "table_word_ids": [
    "brief",
    "buch",
    "alt",
    "boden",
    "finden",
    "suchen",
    "nacht",
    "licht",
    "geschenk",
    "mann",
    "frau",
    "freund",
    "gruppe",
    "geburtstag",
    "tisch",
    "stuhl",
    "haus",
    "zimmer",
    "geld",
    "wort",
    "zeit"
  ],
  "hook": {
    "title": "Before You Read",
    "content": "This is a capstone reading: a mystery scene with a hook and an open ending. Read for four things — the place, the noise, the object, and what the letter says. The grammar is familiar: Perfekt, dative, and a subclause or two. The new words are glossed so the mystery stays in front of you.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Geräusch & Boden",
        "content": "das Geräusch = noise; der Boden = floor. Ein Buch ist auf den Boden gefallen = a book has fallen to the floor."
      },
      {
        "marker": "2",
        "title": "Schatz & Geheimnis",
        "content": "der Schatz = treasure; das Geheimnis = secret. The story is built on the second, and the letter promises the first."
      },
      {
        "marker": "3",
        "title": "aufheben",
        "content": "aufheben = to pick up. Sie hebt es auf = she picks it up. The separable prefix auf flies to the end."
      },
      {
        "marker": "4",
        "title": "Trotzdem",
        "content": "trotzdem = nevertheless / all the same. It signals the story's feeling: they do not find the treasure, but they are happy."
      },
      {
        "marker": "5",
        "title": "Bar, Geschichte, Abenteuer",
        "content": "die Bar = bar; die Geschichte = story; das Abenteuer = adventure. The house is a library with a bar, and the letter tells a story."
      }
    ]
  },
  "pattern": {
    "title": "Die Geschichte",
    "content": "Paul arbeitet in einem besonderen Haus. In diesem Haus gibt es viele Bücher, aber auch eine Bar. Die Leute kommen, lesen und trinken.\n\nHeute hilft ihm seine Freundin Paula. Eine Gruppe feiert Geburtstag. Es wird ein langer Abend.\n\nPlötzlich hören Paul und Paula ein lautes Geräusch: BUMM! Ein Buch ist auf den Boden gefallen. Paula geht nach hinten. Dort steht ein altes Buch. Sie hebt es auf und findet einen kleinen Brief.\n\nPaul und Paula lesen den Brief zusammen. Der Brief erzählt eine alte Geschichte: In dem Haus gibt es einen Schatz!\n\nSie suchen den ganzen Abend, aber sie finden den Schatz nicht. Sie müssen ein anderes Mal weitersuchen. Trotzdem sind sie glücklich. Ein Haus voller Bücher ist immer ein Abenteuer.",
    "footnotes": []
  },
  "exercises": [
    {
      "id": "l5351_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "Paul works in a special house.",
          "german": "Paul arbeitet in einem besonderen Haus."
        },
        {
          "id": "m2",
          "english": "In this house there are many books and a bar.",
          "german": "In diesem Haus gibt es viele Bücher und eine Bar."
        },
        {
          "id": "m3",
          "english": "Suddenly they hear a loud noise.",
          "german": "Plötzlich hören sie ein lautes Geräusch."
        },
        {
          "id": "m4",
          "english": "A book has fallen to the floor.",
          "german": "Ein Buch ist auf den Boden gefallen."
        },
        {
          "id": "m5",
          "english": "Paula finds a small letter.",
          "german": "Paula findet einen kleinen Brief."
        },
        {
          "id": "m6",
          "english": "They search all evening but do not find the treasure.",
          "german": "Sie suchen den ganzen Abend, aber sie finden den Schatz nicht."
        },
        {
          "id": "recall1",
          "german": "die Tür ist offen",
          "english": "the door is open"
        },
        {
          "id": "recall2",
          "german": "ein Junge",
          "english": "a boy"
        },
        {
          "id": "spaced1",
          "german": "Der Schal ist rot und gelb",
          "english": "The scarf is red and yellow"
        }
      ],
      "target_answer": "Paul arbeitet in einem besonderen Haus., In diesem Haus gibt es viele Bücher und eine Bar., Plötzlich hören sie ein lautes Geräusch., Ein Buch ist auf den Boden gefallen., Paula findet einen kleinen Brief., Sie suchen den ganzen Abend, aber sie finden den Schatz nicht., die Tür ist offen, ein Junge, Der Schal ist rot und gelb",
      "meaning": "Paul works in a special house.; In this house there are many books and a bar.; Suddenly they hear a loud noise.; A book has fallen to the floor.; Paula finds a small letter.; They search all evening but do not find the treasure.; the door is open; a boy; The scarf is red and yellow",
      "explanation": "Every beat adds one piece of the mystery. The ending deliberately leaves the search unfinished."
    },
    {
      "id": "l5351_e2",
      "type": "shift_select",
      "prompt": "What kind of place is Paul's workplace?",
      "options": [
        "A library with a bar",
        "A normal bar",
        "A school",
        "A hotel"
      ],
      "target_answer": "A library with a bar",
      "meaning": "Paul works in a book-filled house that also has a bar.",
      "explanation": "The text never says Bibliothek, but it describes one: viele Bücher, eine Bar, die Leute kommen, lesen und trinken."
    },
    {
      "id": "l5351_e3",
      "type": "shift_select",
      "prompt": "What causes the loud noise?",
      "options": [
        "A book falls to the floor.",
        "A guest shouts.",
        "The music stops.",
        "A glass breaks."
      ],
      "target_answer": "A book falls to the floor.",
      "meaning": "The noise is a book falling to the floor.",
      "explanation": "The colon after Geräusch explains it: Ein Buch ist auf den Boden gefallen. The mystery starts with a small accident."
    },
    {
      "id": "l5351_e4",
      "type": "shift_select",
      "prompt": "What does the letter talk about?",
      "options": [
        "A hidden treasure",
        "A birthday party",
        "A lost dog",
        "A train journey"
      ],
      "target_answer": "A hidden treasure",
      "meaning": "The letter tells an old story about a treasure in the house.",
      "explanation": "Der Brief erzählt eine alte Geschichte: In dem Haus gibt es einen Schatz! The treasure is the letter's promise, not something they find that night."
    },
    {
      "id": "l5351_e5",
      "type": "transcribe",
      "prompt": "Render the thought in German: 'They find an old book with a letter.'",
      "idea": "They find an old book with a letter.",
      "cues": [
        "Start with Sie finden — present tense is enough.",
        "ein altes Buch: the adjective takes -es after ein (neuter).",
        "mit einem Brief is the dative accompaniment."
      ],
      "target_answer": "Sie finden ein altes Buch mit einem Brief",
      "meaning": "They find an old book with a letter.",
      "word_bank": [
        "Sie",
        "finden",
        "ein",
        "altes",
        "Buch",
        "mit",
        "einem",
        "Brief",
        "Tisch"
      ],
      "explanation": "ein altes Buch (neuter nominative/accusative after ein) and mit einem Brief (dative) show two case jobs in one short sentence."
    }
  ],
  "twist": {
    "prompt": "Without looking back — say in German: 'They do not find the book.'",
    "target_answer": "Sie finden das Buch nicht",
    "word_bank": [
      "Sie",
      "finden",
      "das",
      "Buch",
      "nicht",
      "Brief"
    ],
    "explanation": "nicht comes after the accusative object: Sie finden das Buch nicht. The letter (Brief) is in the story, but this sentence is about the book."
  },
  "summary": {
    "outcome": "Read a mystery passage, identify its turning points, and distinguish what happens from what is promised.",
    "use_example": {
      "german": "Sie finden den Schatz nicht, aber sie sind trotzdem glücklich.",
      "english": "They do not find the treasure, but they are happy all the same."
    },
    "takeaway": "A mystery can end without a solution. The story's job is to make the search interesting, not to hand you the treasure.",
    "curiosity_teaser": "Next: a Monday morning, a thermometer, and a plan that fails."
  }
};

export default lesson;
