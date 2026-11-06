import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 103,
  "slug": "the-register-ladder",
  "title": "The Register Ladder",
  "subtitle": "Climb from everyday Germanic English to formal Latinate English and find French waiting",
  "phase": 1,
  "shift_categories": [
    "doublet"
  ],
  "word_ids": [
    "désirer",
    "demander",
    "entrer",
    "arriver",
    "préférer",
    "continuer",
    "vouloir"
  ],
  "table_word_ids": [
    "désirer",
    "demander",
    "entrer",
    "arriver",
    "préférer",
    "continuer",
    "vouloir"
  ],
  "hook": {
    "title": "Two Shelves in Your Own Head",
    "content": "English has two words for almost every action because Norman French sat on top of Anglo-Saxon for three centuries. At home you say 'want', 'go in', 'keep on', 'like better'. On a form you write 'desire', 'enter', 'continue', 'prefer'. Step onto that upper English shelf and the French verb is already in your mouth: désirer, entrer, continuer, préférer.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why English sounds fancy when it speaks French",
        "content": "After 1066, law courts, palaces, and universities operated in French while farms and workshops spoke Old English. What feels high-register in English is simply everyday street vocabulary in Paris.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Step Up the Register Ladder Before You Translate",
    "content": "Whenever you feel stuck trying to say a phrasal verb like 'go in' or 'keep going', pause and trade it for its one-word Latinate synonym in English: go in → enter → entrer; keep on → continue → continuer; get there → arrive → arriver. Then chain it directly after je veux with no extra word for 'to'.",
    "linguist_note": "English phrasal verbs (go in, come back, keep on) are Germanic; Romance languages pack the direction into the Latin verb stem itself (entrer, revenir, continuer).",
    "trap_note": "Your mind will try to translate English particles word-for-word ('go in' → aller dans). Instead, trade the two-word English phrase for one formal Latinate verb: enter → entrer."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Climb the register ladder from plain English to its French verb twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "go in → enter",
          "german": "entrer"
        },
        {
          "id": "p2",
          "english": "keep on → continue",
          "german": "continuer"
        },
        {
          "id": "p3",
          "english": "get there → arrive",
          "german": "arriver"
        },
        {
          "id": "p4",
          "english": "like better → prefer",
          "german": "préférer"
        },
        {
          "id": "p5",
          "english": "wish for → desire",
          "german": "désirer"
        }
      ],
      "target_answer": "entrer, continuer, arriver, préférer, désirer",
      "meaning": "go in → enter, keep on → continue, get there → arrive, like better → prefer, wish for → desire",
      "explanation": "Trading an English phrasal verb for its formal Latinate synonym reveals the everyday French infinitive.",
      "id": "fr103_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Which formal English verb meaning 'to wish for' reveals the French verb désirer?",
      "target_answer": "desire",
      "meaning": "desire ↔ désirer",
      "explanation": "Latin dēsīderāre ('to long for, await from the stars') gave French désirer and English desire.",
      "id": "fr103_e2"
    },
    {
      "type": "derive",
      "prompt": "Climb the ladder: 'keep going' → formal English 'continue' → French infinitive:",
      "english_hint": "replace -e with -er",
      "target_answer": "continuer",
      "meaning": "to continue / keep going",
      "explanation": "continue → continuer (/kɔ̃tinɥe/), an everyday -er verb.",
      "id": "fr103_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you want to enter here",
      "cues": [
        "I want → je veux",
        "go in → enter → entrer",
        "here → ici"
      ],
      "idea_parts": [
        "who wants? → je veux",
        "action → entrer",
        "place → ici"
      ],
      "target_answer": "Je veux entrer ici",
      "meaning": "I want to go in here",
      "word_bank": [
        "veux",
        "la",
        "aller",
        "entrer",
        "ici",
        "Je"
      ],
      "explanation": "Je veux entrer ici replaces the two-word English 'go in' with one clean French verb.",
      "diagnosis": {
        "slip": "translated 'go in' separately",
        "cue": "Trade 'go in' for 'enter' → entrer."
      },
      "id": "fr103_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je veux continuer un peu",
      "replays": 2,
      "target_answer": "Je veux continuer un peu",
      "meaning": "I want to keep going a little",
      "cues": [
        "je veux + continuer",
        "tag at the end: un peu"
      ],
      "explanation": "continuer is everyday French for 'keep on / keep going'.",
      "affirmation": "You heard continuer and un peu — the register ladder worked cleanly.",
      "id": "fr103_e5"
    }
  ],
  "summary": {
    "outcome": "Use the English register ladder (go in → enter → entrer, keep on → continue → continuer) to unlock everyday French verbs.",
    "use_example": {
      "german": "Je veux entrer et continuer.",
      "english": "I want to go in and keep going."
    },
    "takeaway": "When a two-word English verb blocks you, step up to its one-word formal synonym — that word is already French.",
    "curiosity_teaser": "Up next on Le Pont ([2] The -ION Bridge): see how The Register Ladder leads directly into The -ION Bridge."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want to go in here\" in French:",
    "target_answer": "Je veux entrer ici",
    "word_bank": [
      "ici",
      "Je",
      "entrer",
      "ne",
      "veux",
      "pas"
    ],
    "explanation": "Re-constructing \"Je veux entrer ici\" from the underlying rule cements the pattern of The Register Ladder."
  }
};

export default lesson;
