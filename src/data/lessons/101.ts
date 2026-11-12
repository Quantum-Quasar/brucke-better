import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 101,
  "slug": "hidden-twins-body-and-world",
  "title": "Hidden Twins: Body & World",
  "subtitle": "Arm, Hand, Finger, Haus, Glas, Brot — words that crossed the sea untouched",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "arm",
    "hand",
    "finger",
    "ring",
    "haus",
    "glas",
    "brot",
    "gold",
    "sand",
    "butter"
  ],
  "table_word_ids": [
    "hand",
    "finger",
    "haus",
    "glas",
    "brot",
    "ring",
    "arm",
    "gold",
    "sand",
    "butter",
    "nudel",
    "doppelt",
    "waschmaschine",
    "wurzel",
    "stimmung",
    "schwimmbad"
  ],
  "hook": {
    "title": "The Zero-Shift Zone",
    "content": "Point at your hand. The word you just thought of is German. Hand is Hand, Arm is Arm, Finger is Finger — spelled identically, letter for letter, after 1,500 years on opposite shores of the North Sea. Around every such zero-shift twin, a small world of identical words gathers: Haus, Glas, Brot, Gold, Sand, Butter, Ring. You did not learn German words today. You noticed the ones you always owned.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why Untouched?",
        "content": "These words are identical precisely because they contain none of the consonants the High German Shift touched in the positions it touched them — no initial p, t, k, or th. Arm, Hand, Finger, Ring, Haus, Glas, Brot, Gold, Sand, Butter: every consonant sat in a safe seat when the sound wave rolled through."
      }
    ]
  },
  "pattern": {
    "title": "Recognize the Twin, Then Flag the Gender",
    "content": "There is no transformation to learn here — only recognition plus one new habit: German flags every noun with a gender. Arm (der), Finger (der), Ring (der), and Sand (der) are masculine; Hand (die) and Butter (die) are feminine; Haus, Glas, Brot, and Gold (das) are neuter. The flag is not logic, it is ancestry — so collect it together with the word, the way you collect pronunciation with a word in any language.",
    "footnotes": [
      {
        "marker": "2",
        "title": "Brot Is 'the Brewed Thing'",
        "interest": true,
        "content": "Brot traces to Proto-Germanic *braudą — originally 'the fermented, risen thing', kin to the verb brew (German brauen). Bread and brew are branches of the same ancient root; bread was named after its foam."
      },
      {
        "marker": "3",
        "title": "You Eat the Cognate Weekly",
        "content": "A Hamburger is simply 'of Hamburg' — the city's name plus the German adjectival -er, exactly as in Berliner or Wiener. English kept the German grammar inside the sandwich."
      }
    ]
  },
  "exercises": [
    {
      "id": "l101_e1",
      "type": "matching_pairs",
      "prompt": "Match each English word with its identical German twin. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "ht1",
          "english": "house",
          "german": "Haus"
        },
        {
          "id": "ht2",
          "english": "bread",
          "german": "Brot"
        },
        {
          "id": "ht3",
          "english": "glass",
          "german": "Glas"
        },
        {
          "id": "ht4",
          "english": "butter",
          "german": "Butter"
        },
        {
          "id": "recall1",
          "german": "der Arm",
          "english": "the arm"
        },
        {
          "id": "recall2",
          "german": "der Finger",
          "english": "the finger"
        },
        {
          "id": "recall3",
          "german": "ein Ring",
          "english": "a ring"
        }
      ],
      "target_answer": "Haus, Brot, Glas, Butter, der Arm, der Finger, ein Ring",
      "meaning": "house; bread; glass; butter; the arm; the finger; a ring",
      "explanation": "Zero-shift twins: no consonant of these words sat in a shifted position, so the spellings survived side by side."
    },
    {
      "id": "l101_e2",
      "type": "reverse_cognate",
      "prompt": "What everyday English word is the exact twin of German 'Brot'?",
      "target_answer": "bread",
      "meaning": "bread (twin of German Brot)",
      "explanation": "Brot and bread are the same Proto-Germanic word — and Brot is kin to the verb brew: bread is 'the brewed thing'."
    },
    {
      "id": "l101_e3",
      "type": "shift_select",
      "prompt": "Which gender flag does 'Ring' carry?",
      "options": [
        "der",
        "die",
        "das"
      ],
      "target_answer": "der",
      "meaning": "der Ring — the ring (masculine)",
      "explanation": "Ring is masculine: der Ring — the exact English word, kept for the circle on a finger. Gender is ancestry, not logic — collect it with the word."
    },
    {
      "id": "l101_e4",
      "type": "derive",
      "prompt": "Give the capitalized German noun for the five-fingered body part at the end of your arm:",
      "english_hint": "no shift at all — just the German capital",
      "target_answer": "Hand",
      "meaning": "die Hand — the hand",
      "explanation": "Hand is spelled identically in both languages; German simply capitalizes all nouns."
    },
    {
      "id": "l101_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I find the gold in the sand'",
      "target_answer": "Ich finde das Gold im Sand",
      "meaning": "I find the gold in the sand",
      "vocab_hints": [
        {
          "word": "das",
          "translation": "the (neuter)",
          "note": "Gold is neuter: das Gold (Sand is masculine — der Sand)"
        },
        {
          "word": "im",
          "translation": "in the",
          "note": "im = in + dem, the all-purpose 'in the' for masculine and neuter places"
        }
      ],
      "word_bank": [
        "im",
        "Gold",
        "sehr",
        "das",
        "in",
        "Sand",
        "finde",
        "Ich"
      ],
      "explanation": "Verb in position 2: 'Ich finde...'. 'im' is the contraction of in + dem — one tile instead of two."
    }
  ],
  "summary": {
    "outcome": "Recognize ten zero-shift cognate nouns and attach their gender flags.",
    "use_example": {
      "german": "Das Brot und das Gold im Haus.",
      "english": "The bread and the gold in the house."
    },
    "takeaway": "Words without shiftable consonants crossed unchanged — and each noun carries a gender flag you collect with the word.",
    "curiosity_teaser": "Next: You own fifteen words — that is enough for real sentences. Time to build your first six."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Hidden Twins: Body & World (I find the gold in the sand):",
    "target_answer": "Ich finde das Gold im Sand",
    "word_bank": [
      "das",
      "finde",
      "Ich",
      "nicht",
      "Gold",
      "heute",
      "Sand",
      "im"
    ],
    "explanation": "Re-assembling \"Ich finde das Gold im Sand\" from scratch locks in the structural pattern of Hidden Twins: Body & World without relying on short-term echo."
  }
};

export default lesson;
