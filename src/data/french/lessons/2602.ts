import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2602,
  "slug": "lesson-2602",
  "title": "The -ai Future",
  "subtitle": "Infinitive + avoir's present endings: je parlerai, tu visiteras, on ira.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "aller",
    "avoir",
    "être",
    "faire",
    "voir",
    "venir",
    "parler",
    "visiter",
    "demain"
  ],
  "table_word_ids": [
    "aller",
    "avoir",
    "être",
    "faire",
    "voir",
    "venir",
    "parler",
    "visiter",
    "demain"
  ],
  "hook": {
    "title": "The -ai Future: Why Every Future Stem Ends in /ʁ/",
    "content": "To form the one-word future tense (le futur simple), take the whole infinitive (parler, visiter, finir) or a core /ʁ/ stem (être → ser-, avoir → aur-, aller → ir-, faire → fer-, venir → viendr-, voir → verr-) and attach the present endings of avoir (-ai, -as, -a, -ons, -ez, -ont)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "One Stem Serves BOTH the Future (-ai) and the Conditional (-ais)!",
        "content": "Every irregular future stem (ser-, aur-, ir-, fer-, viendr-, verr-) is ALSO the exact stem of the Conditional Would-World! Put -ai/-a on it for 'will' (ce sera 'it will be'); put -ais/-ait on it for 'would' (ce serait 'it would be')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Future Stem (Ending in -r-) + avoir Endings (-ai, -as, -a, -ons, -ez, -ont)",
    "content": "Spot the /ʁ/ stem and read -ai/-as/-a as 'will' and -ais/-ait as 'would'!",
    "linguist_note": "Synthetic Romance future (< infinitive + habēre) and conditional (< infinitive + habēbam) share 100% of their stems.",
    "trap_note": "Don't confuse je parlerai (-ai = 'I will speak') with je parlerais (-ais = 'I would speak') on the page!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each future form with its English meaning and stem:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "je parlerai / je visiterai (infinitive + ai)",
          "german": "I will speak / I will visit"
        },
        {
          "id": "p2",
          "english": "ce sera (ser- from être)",
          "german": "it will be (que sera, sera!)"
        },
        {
          "id": "p3",
          "english": "j'irai (ir- from aller)",
          "german": "I will go"
        },
        {
          "id": "p4",
          "english": "tu verras (verr- from voir)",
          "german": "you will see"
        },
        {
          "id": "p5",
          "english": "je viendrai (viendr- from venir)",
          "german": "I will come"
        }
      ],
      "target_answer": "I will speak / I will visit, it will be (que sera, sera!), I will go, you will see, I will come",
      "meaning": "je parlerai / je visiterai (infinitive + ai), ce sera (ser- from être), j'irai (ir- from aller), tu verras (verr- from voir), je viendrai (viendr- from venir)",
      "explanation": "Every future stem in the entire French language ends in the letter R!",
      "id": "fr2602_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "The French future of être ('ce _____' = 'it will be') appears in the famous song refrain 'Whatever will be, will be'. Type that four-letter verb form:",
      "target_answer": "sera",
      "meaning": "Que sera, sera ↔ ce sera ('it will be')",
      "explanation": "ser- is the future/conditional stem of être: ce sera ('it will be'), ce serait ('it would be').",
      "id": "fr2602_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Compare 'I will do it' (future) vs. 'I would do it' (conditional) using the stem 'fer-' of faire:",
      "options": [
        "Je le ferais / Je le ferai",
        "Je le faireai / Je le faireais",
        "Je le ferai / Je le ferais"
      ],
      "target_answer": "Je le ferai / Je le ferais",
      "meaning": "-ai (from j'ai) = Future 'will'; -ais (from j'avais) = Conditional 'would'!",
      "explanation": "The stem fer- is identical for both; -ai is future and -ais is conditional.",
      "id": "fr2602_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you will see tomorrow it will be very good",
      "cues": [
        "You will see tomorrow → Tu verras demain",
        "it will be very good → ce sera très bon"
      ],
      "idea_parts": [
        "first future → Tu verras demain",
        "second future → ce sera très bon"
      ],
      "target_answer": "Tu verras demain, ce sera très bon",
      "meaning": "You will see tomorrow, it will be very good",
      "word_bank": [
        "Tu",
        "ce",
        "très",
        "demain",
        "verras",
        "bon",
        "la",
        "sera",
        "est"
      ],
      "explanation": "Tu verras (from voir) and ce sera (from être) are top-frequency future phrases.",
      "diagnosis": {
        "slip": "used est instead of sera",
        "cue": "Use ce sera ('it will be') for the future of c'est."
      },
      "id": "fr2602_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je vous appellerai quand j'arriverai à Paris",
      "replays": 2,
      "target_answer": "Je vous appellerai quand j'arriverai à Paris",
      "meaning": "I will call you when I arrive in Paris",
      "cues": [
        "Je vous appellerai",
        "quand j'arriverai à Paris"
      ],
      "explanation": "After quand ('when') referring to the future, French uses the future tense (quand j'arriverai)!",
      "affirmation": "You wrote both -ai future forms cleanly!",
      "id": "fr2602_e5"
    }
  ],
  "summary": {
    "outcome": "Recognize and form the -ai future tense on regular verbs and core stems (sera, aura, ira, fera, viendra, verra).",
    "use_example": {
      "german": "Tu verras, ce sera une belle aventure !",
      "english": "You'll see, it will be a great adventure!"
    },
    "takeaway": "Every future stem ends in -r-; add -ai/-as/-a for 'will' and -ais/-ait for 'would'.",
    "curiosity_teaser": "Up next on Le Pont ([27] il faut): see how The -ai Future leads directly into il faut."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"You will see tomorrow, it will be very good\" in French:",
    "target_answer": "Tu verras demain, ce sera très bon",
    "word_bank": [
      "ce",
      "Tu",
      "ne",
      "pas",
      "demain",
      "très",
      "bon",
      "sera",
      "verras"
    ],
    "explanation": "Re-constructing \"Tu verras demain, ce sera très bon\" from the underlying rule cements the pattern of The -ai Future."
  }
};

export default lesson;
