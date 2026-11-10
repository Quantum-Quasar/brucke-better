import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 30,
  "slug": "capstone-the-bridge-reading",
  "title": "Capstone: The Bridge Reading",
  "subtitle": "Ein Tag in Berlin — one connected story built from everything you own",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mann",
    "frau",
    "kind",
    "zug",
    "fahrt",
    "kaufen",
    "brot",
    "wasser",
    "buch",
    "haus",
    "morgen",
    "gestern",
    "nacht",
    "licht",
    "gabe",
    "schlecht",
    "fertig",
    "lustig",
    "übel",
    "fluss",
    "markt",
    "wand",
    "gewinnen",
    "schauen",
    "ausziehen"
  ],
  "table_word_ids": [
    "zug",
    "fahrt",
    "brot",
    "nacht",
    "licht",
    "gabe",
    "mann",
    "frau",
    "kind",
    "kaufen",
    "wasser",
    "buch",
    "haus",
    "morgen",
    "gestern",
    "schlecht",
    "fertig",
    "lustig",
    "übel",
    "fluss",
    "markt",
    "wand",
    "gewinnen",
    "schauen",
    "ausziehen"
  ],
  "hook": {
    "title": "The Bridge",
    "content": "Ninety lessons ago you learned that Brücke means bridge. Today you cross it. Below is a connected story — 'Ein Tag in Berlin' — built almost entirely from words you have met, annotated with the shifts that explain them, and seeded with the false friends lying in wait. Every sentence is a sentence you can now decode, and most of them you can build. Read it twice: once for the story, once for the machinery. Then the exercises hand you the pen.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Reading Passage",
        "content": "Der Mann und die Frau wohnen in Berlin. Gestern haben sie eine Fahrt mit dem Zug gemacht. Der Zug war schnell. In der Stadt haben sie Brot und Wasser gekauft. Am Abend hat der Mann ein Buch gelesen, und die Frau hat gelacht. Um elf war die Nacht still, und das Haus war dunkel. Heute trinken sie Kaffee. Es gibt keinen besseren Morgen."
      }
    ]
  },
  "pattern": {
    "title": "Decode, Then Predict",
    "content": "Decode pass: every capital word carries a shift receipt (Zug pulls, Fahrt fares, Nacht keeps its ch). Grammar pass: the Perfekt brackets (haben...gekauft), the dative receivers, the V2 walls, the subclause basements. Prediction pass: cover the German and rebuild it from the English — then reverse. The false friends are hiding: Rat is advice, fast is almost, bald is soon. When you can read this passage and rebuild its sentences, the trail is behind you and German is ahead.",
    "footnotes": [],
    "linguist_note": "The passage is deliberately short — about sixty words — because density, not length, is the test: nearly every word in it has appeared in a lesson table, and every construction has been drilled."
  },
  "exercises": [
    {
      "id": "l30_e1",
      "type": "matching_pairs",
      "prompt": "Reading check — match each story sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "cp1",
          "english": "Yesterday they took a trip by train",
          "german": "Gestern haben sie eine Fahrt mit dem Zug gemacht"
        },
        {
          "id": "cp2",
          "english": "The train was fast",
          "german": "Der Zug war schnell"
        },
        {
          "id": "cp3",
          "english": "In the city they bought bread and water",
          "german": "In der Stadt haben sie Brot und Wasser gekauft"
        },
        {
          "id": "cp4",
          "english": "At eleven the night was still",
          "german": "Um elf war die Nacht still"
        },
        {
          "id": "cp5",
          "english": "To him it went badly",
          "german": "Es ging ihm übel"
        },
        {
          "id": "cp6",
          "english": "The children get undressed",
          "german": "Die Kinder ziehen sich aus"
        },
        {
          "id": "cp7",
          "english": "The market is at the river",
          "german": "Der Markt ist am Fluss"
        },
        {
          "id": "cp8",
          "english": "The picture hangs on the wall",
          "german": "Das Bild hängt an der Wand"
        },
        {
          "id": "cp9",
          "english": "She wanted to win",
          "german": "Sie wollte gewinnen"
        },
        {
          "id": "cp10",
          "english": "They look out of the window",
          "german": "Sie schauen aus dem Fenster"
        }
      ],
      "target_answer": "Gestern haben sie eine Fahrt mit dem Zug gemacht, Der Zug war schnell, In der Stadt haben sie Brot und Wasser gekauft, Um elf war die Nacht still, Es ging ihm übel, Die Kinder ziehen sich aus, Der Markt ist am Fluss, Das Bild hängt an der Wand, Sie wollte gewinnen, Sie schauen aus dem Fenster",
      "meaning": "the story beats of the passage",
      "explanation": "Perfekt brackets, sein-pasts, and dative time — every construction from the trail, in one story."
    },
    {
      "id": "l30_e2",
      "type": "shift_select",
      "prompt": "Trap watch: in the story's world, someone asks for 'Rat'. What do they get?",
      "options": [
        "Advice — der Rat means counsel",
        "A wheel",
        "A gift",
        "A rodent"
      ],
      "target_answer": "Advice — der Rat means counsel",
      "meaning": "der Rat = advice (not rat)",
      "explanation": "The false-friend deck strikes: der Rat is advice. The rodent is die Ratte. The bait 'a gift' is die Gabe — the giving that es gibt names."
    },
    {
      "id": "l30_e3",
      "type": "shift_select",
      "prompt": "'Das Haus war dunkel' — which decode runs through 'dunkel'?",
      "options": [
        "V → B",
        "D → D cousin — dark/dusk ↔ dunkel",
        "No shift — pure guesswork",
        "P → F"
      ],
      "target_answer": "D → D cousin — dark/dusk ↔ dunkel",
      "meaning": "dunkel ↔ dark/dusk — the dental hardening",
      "explanation": "One of the trail's first shifts closes the capstone: the d-words answer to English th."
    },
    {
      "id": "l30_e4",
      "type": "reverse_cognate",
      "prompt": "The story's morning line hides a shift family: 'Morgen' is the twin of which English word?",
      "target_answer": "morrow",
      "meaning": "morrow (to-morrow) ↔ morgen",
      "explanation": "The very first sprig taught you this pair — the bridge begins and ends with twins."
    },
    {
      "id": "l30_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're closing your Berlin story at dawn: there is no better morning",
      "cues": [
        "es gibt (existence by giving) + keinen (no, Him-Case) + besseren (better with its ending) — four lessons in five words"
      ],
      "target_answer": "Es gibt keinen besseren Morgen",
      "meaning": "There is no better morning",
      "word_bank": [
        "kein",
        "gute",
        "Morgen",
        "gibt",
        "besseren",
        "keinen",
        "Es"
      ],
      "explanation": "es gibt (existence by giving) + keinen (negated accusative) + besseren (the comparative with its ending) — four lessons in five words. The story's own adjectives close the loop: das Essen war fertig, die Leute waren lustig, und das Wetter war schlecht."
    }
  ],
  "summary": {
    "outcome": "Read and rebuild a connected German story using the entire trail.",
    "use_example": {
      "german": "Es gibt keinen besseren Morgen.",
      "english": "There is no better morning."
    },
    "takeaway": "You crossed the bridge: sixty words, every one decoded by a law you own — the trail ends, the language begins.",
    "curiosity_teaser": "Next: A Day in Berlin, the full reading — with tap-to-inspect words and shift annotations."
  },
  "twist": {
    "prompt": "Doubt the ending: there is no better morning → IS there no better morning? (The verb flips, es follows.)",
    "target_answer": "Gibt es keinen besseren Morgen",
    "word_bank": [
      "es",
      "Gibt",
      "keinen",
      "Morgen",
      "besseren"
    ],
    "explanation": "In the question, gibt takes position 1 and es falls in behind — the ancient flip, one last time. The capstone closes where the trail began: the verb knows its seat."
  }
};

export default lesson;
