import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 13,
  "slug": "a-de-chez",
  "title": "à, de, chez",
  "subtitle": "The two master prepositions (à and de), their mandatory fusions (au, du, des), and chez ('at the home/place of')",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "à",
    "de",
    "au",
    "du",
    "des",
    "chez",
    "avec",
    "dans",
    "pour",
    "sans",
    "vin",
    "fromage",
    "soupe"
  ],
  "table_word_ids": [
    "à",
    "de",
    "au",
    "du",
    "des",
    "chez",
    "avec",
    "dans",
    "pour",
    "sans",
    "vin",
    "fromage",
    "soupe"
  ],
  "hook": {
    "title": "Two Little Words That Run Half of French Grammar",
    "content": "Almost every connection between nouns in French is handled by two tiny prepositions: à ('to, at, in') and de ('of, from, about'). Whenever either of them bumps into masculine le or plural les, French refuses to say them separately — they fuse on impact! à + le becomes au (/o/, 'to the / at the'). de + le becomes du (/dy/, 'of the / from the / some'). And de + les becomes des (/de/, 'of the / some').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why chez has no single-word English translation",
        "content": "Latin casa ('cottage, house') wore down into the French preposition chez when unstressed before a person's name: chez Marie ('at/to Marie's place'), chez moi ('at my home'), chez le docteur ('at the doctor's office').",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Mandatory Fusions: au, du, des — Never *à le or *de le",
    "content": "With feminine la or vowel-initial l', nothing fuses: je vais à la gare, je viens de l'hôtel. But with masculine le, fusion is mandatory law: je vais au café (never *à le café) and je viens du restaurant (never *de le restaurant). And when you visit a person rather than a building, French uses chez: je vais chez mon ami ('I'm going to my friend's place').",
    "linguist_note": "Old French vocalized preconsonantal L into U: a + le → al → au; de + le → del → du; de + les → dels → des.",
    "trap_note": "The shortcut your mind will offer: saying *à le café or *de le train word-for-word. Masculine le ALWAYS fuses with à and de into au and du!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each preposition fusion or phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "à + le (to the / at the, m.)",
          "german": "au"
        },
        {
          "id": "p2",
          "english": "de + le (of the / from the / some, m.)",
          "german": "du"
        },
        {
          "id": "p3",
          "english": "de + les (of the / some, pl.)",
          "german": "des"
        },
        {
          "id": "p4",
          "english": "at / to the home or office of",
          "german": "chez"
        },
        {
          "id": "p5",
          "english": "without (as in sans-serif)",
          "german": "sans"
        }
      ],
      "target_answer": "au, du, des, chez, sans",
      "meaning": "à + le (to the / at the, m.), de + le (of the / from the / some, m.), de + les (of the / some, pl.), at / to the home or office of, without (as in sans-serif)",
      "explanation": "au, du, and des are mandatory contractions; chez is used before people and pronouns.",
      "id": "fr13_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am going to the restaurant' (le restaurant is masculine)?",
      "options": [
        "Je vais au restaurant",
        "Je vais à le restaurant",
        "Je vais chez le restaurant"
      ],
      "target_answer": "Je vais au restaurant",
      "meaning": "I am going to the restaurant",
      "explanation": "à + le restaurant fuses mandatorily into au restaurant.",
      "id": "fr13_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'Je suis chez le docteur'?",
      "german": "Je suis chez le docteur",
      "natural": "I am at the doctor's office",
      "options": [
        "I am at the doctor's office",
        "I am at-the-house-of the doctor",
        "I am to the doctor"
      ],
      "target_answer": "I am at-the-house-of the doctor",
      "meaning": "Literal structure: I am at-the-house-of the doctor",
      "explanation": "chez (from Latin casa) means 'at the home/practice of' a person.",
      "id": "fr13_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am going to my friend's place tonight",
      "cues": [
        "I am going → Je vais",
        "to my friend's place → chez mon ami (person takes chez) + tonight → ce soir"
      ],
      "idea_parts": [
        "motion → Je vais",
        "person-destination → chez mon ami",
        "time → ce soir"
      ],
      "target_answer": "Je vais chez mon ami ce soir",
      "meaning": "I'm going to my friend's place tonight",
      "word_bank": [
        "ami",
        "chez",
        "au",
        "ce",
        "vais",
        "la",
        "soir",
        "Je",
        "mon"
      ],
      "explanation": "With a person (mon ami), French uses chez rather than à/au.",
      "diagnosis": {
        "slip": "used au instead of chez before a person",
        "cue": "Use chez before a person or pronoun: chez mon ami."
      },
      "id": "fr13_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Un café sans sucre, s'il vous plaît",
      "replays": 2,
      "target_answer": "Un café sans sucre, s'il vous plaît",
      "meaning": "A coffee without sugar, please",
      "cues": [
        "Un café",
        "without sugar: sans sucre",
        "polite tag: s'il vous plaît"
      ],
      "explanation": "sans ('without') is the exact word English borrowed in 'sans-serif'.",
      "affirmation": "You caught sans and s'il vous plaît cleanly.",
      "id": "fr13_e5"
    }
  ],
  "summary": {
    "outcome": "Fuse à/de + le/les into au/du/des, use chez with people, and build prepositional phrases with avec, dans, pour, sans.",
    "use_example": {
      "german": "On va chez Marie ou au restaurant ?",
      "english": "Are we going to Marie's place or to the restaurant?"
    },
    "takeaway": "Buildings take au / à la; people take chez — and *à le / *de le never exist.",
    "curiosity_teaser": "Up next on Le Pont ([1301] au & du Fusions): see how à, de, chez leads directly into au & du Fusions."
  },
  "twist": {
    "prompt": "Ungraded — 'I am coming with you to the cinema' (use Je viens):",
    "target_answer": "Je viens avec toi au cinéma",
    "word_bank": [
      "au",
      "le",
      "à",
      "avec",
      "cinéma",
      "viens",
      "Je",
      "toi"
    ],
    "explanation": "avec toi ('with you', stressed pronoun) + au cinéma (à + le cinéma)."
  },
  "foreshadow": {
    "line": "Having mastered à, de, chez, look ahead to Topic 14 (Possessives Agree with the Thing), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 14
  },
  "payoff": {
    "ofLesson": 12,
    "text": "The foundation from Topic 12 (The Near Future) now pays off directly inside à, de, chez: every sentence here builds on that earlier step."
  }
};

export default lesson;
