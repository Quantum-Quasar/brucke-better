import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 102,
  "slug": "first-sentences-gym",
  "title": "First Sentences Gym",
  "subtitle": "Fourteen words you already own are enough for six real German sentences",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "lernen",
    "kommen",
    "gehen",
    "singen",
    "schwimmen",
    "finden",
    "bringen",
    "haus",
    "glas",
    "brot",
    "deutsch",
    "bier",
    "kuchen",
    "wurst"
  ],
  "table_word_ids": [
    "lernen",
    "kommen",
    "singen",
    "schwimmen",
    "finden",
    "bringen",
    "gehen",
    "haus",
    "glas",
    "brot",
    "deutsch",
    "bier",
    "kuchen",
    "wurst",
    "segeln",
    "großstadt"
  ],
  "hook": {
    "title": "You Already Have Enough Words",
    "content": "Vocabulary lists lie to beginners. They imply you need five hundred words before a sentence is legal. You already know lernen, kommen, gehen, singen, schwimmen, finden, bringen — plus Haus, Glas, Brot, and friends. German sentences need only three parts: a doer, an action in position 2, and everything else. Six sentences from today, and every one is built from words English handed you.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Old English Did It Too",
        "content": "Old English main clauses also tended to set the verb second ('Hwæt! We Gar-Dena...' — the verb 'we have' comes right after the first phrase). Verb-second is not a German quirk; it is the ancestral English habit that modern English lost."
      }
    ]
  },
  "pattern": {
    "title": "Subject — Verb — Everything Else",
    "content": "The rule: the conjugated verb is glued to position 2, no matter what. Ich lerne Deutsch. Wir lernen Deutsch. Notice the verb barely changes: ich lernt? No — ich lernt is wrong; ich lernt sounds like a parrot, ich lernt... ich lerne ends in -e for 'I', and wir lernt? wir lernen — the full -en returns for 'we'. So: ich lerne, wir lernen; ich schwimme, wir schwimmen; ich finde, wir finden. Two people, two endings, one stem. German has not even asked you to memorize anything yet.",
    "footnotes": [
      {
        "marker": "2",
        "title": "ich ↔ I",
        "content": "Even the word 'ich' is your old possession: English 'I' and German 'ich' descend from the same Proto-Germanic *ek. The vowel wandered for a thousand years — the word never changed owner."
      }
    ]
  },
  "exercises": [
    {
      "id": "l102_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble 'I learn' (stem + the ich-ending):",
      "tile_options": [
        "st",
        "ich",
        "lern",
        "e",
        "en"
      ],
      "target_answer": "ich lerne",
      "meaning": "I learn",
      "explanation": "Stem 'lern-' takes -e for ich: ich lerne. The -st is the du-ending — not this person."
    },
    {
      "id": "l102_e2",
      "type": "matching_pairs",
      "prompt": "Match each German sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "fs1",
          "english": "We swim",
          "german": "Wir schwimmen"
        },
        {
          "id": "fs2",
          "english": "I find the glass",
          "german": "Ich finde das Glas"
        },
        {
          "id": "fs3",
          "english": "We sing",
          "german": "Wir singen"
        },
        {
          "id": "fs4",
          "english": "I come",
          "german": "Ich komme"
        },
        {
          "id": "fs5",
          "english": "I learn German",
          "german": "Ich lerne Deutsch"
        },
        {
          "id": "fs6",
          "english": "I find the sausage",
          "german": "Ich finde die Wurst"
        }
      ],
      "target_answer": "Wir schwimmen, Ich finde das Glas, Wir singen, Ich komme, Ich lerne Deutsch, Ich finde die Wurst",
      "meaning": "we swim, I find the glass, we sing, I come, I learn German, I find the sausage",
      "explanation": "Subject + verb in position 2: with wir the verb keeps its full dictionary -en. Deutsch, Wurst — zero-shift words slot straight in."
    },
    {
      "id": "l102_e3",
      "type": "derive",
      "prompt": "Conjugate for 'we': 'Wir _____ den Kuchen' (to find):",
      "english_hint": "find + en",
      "target_answer": "finden",
      "meaning": "Wir finden den Kuchen = We find the cake",
      "explanation": "Stem 'find-' + the full -en for wir = finden. Der Kuchen is the cake — collect the masculine flag with the word."
    },
    {
      "id": "l102_e4",
      "type": "shift_select",
      "prompt": "Which of these is a correctly built German statement?",
      "options": [
        "Deutsch ich lerne",
        "Ich Deutsch lerne",
        "Lerne Deutsch ich",
        "Ich lerne Deutsch"
      ],
      "target_answer": "Ich lerne Deutsch",
      "meaning": "I learn German — verb glued to position 2",
      "explanation": "The conjugated verb stays in position 2: subject first, then verb, then everything else."
    },
    {
      "id": "l102_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We bring bread and beer'",
      "target_answer": "Wir bringen Brot und Bier",
      "meaning": "We bring bread and beer",
      "vocab_hints": [
        {
          "word": "und",
          "translation": "and",
          "note": "ancient twin of English 'and' — both from the same Proto-Germanic word"
        }
      ],
      "word_bank": [
        "Bier",
        "Wir",
        "und",
        "Brot",
        "nicht",
        "bringen",
        "mit"
      ],
      "explanation": "Two nouns joined by 'und'; bringen holds position 2 of its half — das Bier needs no translation, only a capital letter."
    }
  ],
  "summary": {
    "outcome": "Build simple subject-verb sentences with ich and wir forms of seven cognate verbs.",
    "use_example": {
      "german": "Wir lernen Deutsch und wir singen.",
      "english": "We learn German and we sing."
    },
    "takeaway": "Verb in position 2, ich takes -e, wir takes -en — the sentence writes itself from words you already own.",
    "curiosity_teaser": "Next: brighten, shorten, deepen — English has its own living -en verbs, and they unlock a whole shelf of German ones."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from First Sentences Gym (We bring bread and beer):",
    "target_answer": "Wir bringen Brot und Bier",
    "word_bank": [
      "und",
      "Brot",
      "Bier",
      "nicht",
      "Wir",
      "heute",
      "bringen"
    ],
    "explanation": "Re-assembling \"Wir bringen Brot und Bier\" from scratch locks in the structural pattern of First Sentences Gym without relying on short-term echo."
  }
};

export default lesson;
