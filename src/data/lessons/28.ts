import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 28,
  "slug": "verb-families-root-radiations",
  "title": "Verb Families & Root Radiations",
  "subtitle": "One root, many words: fahren/Fahrt, ziehen/Zug — like stand/understand/withstand",
  "phase": 3,
  "shift_categories": [
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "fahren",
    "fahrt",
    "zug",
    "ziehen",
    "nehmen",
    "verstehen",
    "aufstehen",
    "gewinnen",
    "schauen",
    "platz",
    "fluss",
    "markt",
    "wand"
  ],
  "table_word_ids": [
    "fahren",
    "fahrt",
    "zug",
    "ziehen",
    "nehmen",
    "verstehen",
    "aufstehen",
    "gewinnen",
    "schauen",
    "platz",
    "fluss",
    "markt",
    "wand",
    "schmelzen",
    "scham",
    "laufen",
    "bitten"
  ],
  "hook": {
    "title": "The Root Is the Vocabulary",
    "content": "English never gave you a list of 'stand-words': you own stand, understand, withstand, standstill, standout, 'I can't stand it' — one root, radiating. German does the same, visibly. fahren (to drive) radiates into die Fahrt (the journey), der Fahrer (the driver), das Fahrzeug (drive-stuff, a vehicle), abfahren (depart), ausfahren (drive out). ziehen (to pull) radiates into der Zug (the pull → the train!), der Aufzug (up-pull → elevator), der Umzug (move — the around-pull!), umziehen (to move house). Learn the root and the vocabulary grows itself.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Zug, the Word That Pulls Everything",
        "content": "der Zug means pull, draught, train, feature, and move — all from ziehen. A train is 'the puller'; a chess move is ein Zug; der Zeitgeist is the 'time-spirit'. One three-letter root pulls a whole semantic freight train — the way English 'draw' gives you drawer, withdraw, drawback, drawn-out."
      }
    ]
  },
  "pattern": {
    "title": "Two Dynasties and a Method",
    "content": "The fahren dynasty: fahren, fuhr, gefahren ↔ fare, fared. Die Fahrt (the ride), der Fahrer (driver — the -er agent law!), das Fahrzeug (vehicle — the -zeug law), abfahren (depart — separable, prefix flies!), die Abfahrt (departure). The ziehen dynasty: ziehen, zog, gezogen ↔ tug, tugged? no — its English cousins are tow and tug. Der Zug (the train), der Aufzug (elevator), der Umzug (the move), umziehen (to move house), aufziehen (to raise). The method: when you meet a new German word, strip it to the root, check your Atlas family, then let the prefix and suffix laws name it for you.",
    "footnotes": [],
    "linguist_note": "ziehen's z is the T→Z shift of the ancient *teuhaną — the same root as English tow and tug. So der Zug, tow, and tug are one word: the train is named for pulling, exactly as a tugboat is."
  },
  "exercises": [
    {
      "id": "l28_e1",
      "type": "matching_pairs",
      "prompt": "Verb families — match each word with its meaning:",
      "matching_pairs": [
        {
          "id": "vf1",
          "english": "the journey / ride",
          "german": "die Fahrt"
        },
        {
          "id": "vf2",
          "english": "the vehicle (drive-stuff)",
          "german": "das Fahrzeug"
        },
        {
          "id": "vf3",
          "english": "to depart",
          "german": "abfahren"
        },
        {
          "id": "vf4",
          "english": "the driver",
          "german": "der Fahrer"
        },
        {
          "id": "vf5",
          "english": "to win",
          "german": "gewinnen"
        }
      ],
      "target_answer": "die Fahrt, das Fahrzeug, abfahren, der Fahrer, gewinnen",
      "meaning": "the journey, the vehicle, to depart, the driver, to win",
      "explanation": "One root, four derivatives — every suffix law you own (-t, -zeug, separable, -er agent) is on display. gewinnen is ge- + winnen: the win-verb wearing its ancient prefix."
    },
    {
      "id": "l28_e2",
      "type": "shift_select",
      "prompt": "'Der Zug fährt um acht.' — what is der Zug, literally?",
      "options": [
        "The fare",
        "The car",
        "The track",
        "The pull — the train is named for pulling"
      ],
      "target_answer": "The pull — the train is named for pulling",
      "meaning": "der Zug = the pull(er) = the train",
      "explanation": "ziehen → der Zug: the thing that pulls. An elevator is the up-pull (Aufzug), moving house the around-pull (Umzug). The city map radiates too: der Platz (the square), der Fluss (the river, flow's cousin), der Markt, die Wand (the wall — English's own wand, magic included) — nouns named by what they are."
    },
    {
      "id": "l28_e3",
      "type": "derive",
      "prompt": "The ziehen dynasty: 'Ich ___ nach Berlin um.' (I am moving — to Berlin; separable, verb-first):",
      "english_hint": "ziehen's root + the prefix at the end",
      "target_answer": "ziehe",
      "meaning": "Ich ziehe nach Berlin um = I am moving to Berlin",
      "explanation": "umziehen splits: ziehe in position 2, um at the end — and ziehen's z is the shifted t of tow/tug."
    },
    {
      "id": "l28_e4",
      "type": "shift_select",
      "prompt": "English runs the same radiation — which set matches the stehen family (verstehen, aufstehen)?",
      "options": [
        "stand, understand, stand up",
        "give, forgive, gift",
        "see, saw, seen",
        "go, went, gone"
      ],
      "target_answer": "stand, understand, stand up",
      "meaning": "stehen ↔ stand: the radiation is identical",
      "explanation": "verstehen = understand (for-stand!), aufstehen = stand up. English and German built the same family from the same root. schauen (to look) runs its own show — die Schau, English show and scout — root radiations on both shores."
    },
    {
      "id": "l28_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're planning a day trip: the journey takes an hour",
      "cues": [
        "fahren's noun leads the sentence: die Fahrt — then dauert (the er/sie -t), and eine Stunde closes it"
      ],
      "target_answer": "Die Fahrt dauert eine Stunde",
      "meaning": "The journey takes an hour",
      "vocab_hints": [
        {
          "word": "dauert",
          "translation": "lasts / takes (time)",
          "note": "dauern — related to 'endure'; the -t stays in the er-form"
        },
        {
          "word": "eine Stunde",
          "translation": "an hour",
          "note": "die Stunde — a distant cousin of 'stand' (the standing-time!)"
        }
      ],
      "word_bank": [
        "Fahrt",
        "Die",
        "Stunde",
        "eine",
        "dauert",
        "der"
      ],
      "explanation": "die Fahrt — fahren's noun — as the subject, with a time expression in the accusative."
    }
  ],
  "summary": {
    "outcome": "Radiate fahren and ziehen into their noun families and read new words via roots.",
    "use_example": {
      "german": "Die Fahrt dauert eine Stunde.",
      "english": "The journey takes an hour."
    },
    "takeaway": "Roots radiate: fahren → Fahrt/Fahrzeug/Fahrer; ziehen → Zug/Aufzug/Umzug — learn roots, not lists.",
    "curiosity_teaser": "Next: the fahren dynasty — one root radiating into Fahrt, Zug, and a whole transit system."
  },
  "twist": {
    "prompt": "Longer trip: the journey takes an hour becomes the journey takes A DAY. (Tag is masculine — mind the case.)",
    "target_answer": "Die Fahrt dauert einen Tag",
    "word_bank": [
      "dauert",
      "Fahrt",
      "einen",
      "Tag",
      "eine",
      "Stunde",
      "Die"
    ],
    "explanation": "eine Stunde → einen Tag: the time expression is accusative, and Tag is masculine — the Him-Case stamps the article. dauert and die Fahrt don't move."
  }
};

export default lesson;
