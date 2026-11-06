import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2702,
  "slug": "lesson-2702",
  "title": "The Subjunctive Door",
  "subtitle": "il faut que tu sois là, je veux que tu viennes — when necessity or desire crosses between two subjects.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "faut",
    "soit",
    "que",
    "vouloir",
    "aller",
    "faire",
    "venir",
    "avoir"
  ],
  "table_word_ids": [
    "faut",
    "soit",
    "que",
    "vouloir",
    "aller",
    "faire",
    "venir",
    "avoir"
  ],
  "hook": {
    "title": "Stepping Through the Subjunctive Door: Il faut que & Je veux que",
    "content": "When a wish (je veux que) or necessity (il faut que) crosses a que-bridge from one subject to a second subject, the verb after que steps into the Subjunctive Mood: Il faut que j'y aille ('I have to get going'), Il faut que ce soit prêt ('It has to be ready'), Je veux que tu viennes ('I want you to come')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Good news: for ALL regular -er verbs, singular subjunctive sounds 100% identical to the present tense!",
        "content": "You only notice a special subjunctive form on a handful of core irregulars: être → soit, aller → aille, venir → vienne, faire → fasse!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Same Subject → Bare Infinitive; Two Different Subjects → que + Subjunctive",
    "content": "Use que + subjunctive whenever two different subjects are linked by vouloir or il faut.",
    "linguist_note": "French requires a finite que-clause in the subjunctive when the matrix and embedded subjects differ under volitional/necessity predicates.",
    "trap_note": "Never say *Je veux toi venir by copying English 'I want you to come' — always build a que-bridge: Je veux que tu viennes!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each subjunctive bridge phrase with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il faut que j'y aille (aller → aille)",
          "german": "I have to get going (lit. It's needed that I go there)"
        },
        {
          "id": "p2",
          "english": "Il faut que ce soit bon (être → soit)",
          "german": "It has to be good"
        },
        {
          "id": "p3",
          "english": "Je veux que tu viennes (venir → vienne)",
          "german": "I want you to come (lit. that you come)"
        },
        {
          "id": "p4",
          "english": "Il faut que tu fasses attention (faire → fasse)",
          "german": "You must pay attention"
        },
        {
          "id": "p5",
          "english": "Je voudrais qu'il parle (regular -er = identical!)",
          "german": "I would like him to speak"
        }
      ],
      "target_answer": "I have to get going (lit. It's needed that I go there), It has to be good, I want you to come (lit. that you come), You must pay attention, I would like him to speak",
      "meaning": "Il faut que j'y aille (aller → aille), Il faut que ce soit bon (être → soit), Je veux que tu viennes (venir → vienne), Il faut que tu fasses attention (faire → fasse), Je voudrais qu'il parle (regular -er = identical!)",
      "explanation": "Il faut que j'y aille ('I've got to go!') is one of the most common sentences in spoken French.",
      "id": "fr2702_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Je veux que tu viennes avec moi'?",
      "german": "Je veux que tu viennes avec moi",
      "natural": "I want you to come with me",
      "options": [
        "I want you coming with me",
        "I want that you come with me",
        "I want you to come with me"
      ],
      "target_answer": "I want that you come with me",
      "meaning": "Literal structure: I want that you come with me",
      "explanation": "Because 'I' and 'you' are two different people, French bridges them with que + subjunctive viennes!",
      "id": "fr2702_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How does a French speaker say 'I have to go / I've got to get going' using 'Il faut que'?",
      "options": [
        "Il faut moi aller",
        "Il faut que je vais",
        "Il faut que j'y aille"
      ],
      "target_answer": "Il faut que j'y aille",
      "meaning": "I have to go (lit. It is necessary that I go there)",
      "explanation": "After Il faut que, je vais becomes subjunctive j'aille: Il faut que j'y aille!",
      "id": "fr2702_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want you to come tonight (using Je veux que tu viennes ce soir)",
      "cues": [
        "I want that → Je veux que",
        "you come tonight (subjunctive) → tu viennes ce soir"
      ],
      "idea_parts": [
        "trigger → Je veux que",
        "subjunctive clause → tu viennes ce soir"
      ],
      "target_answer": "Je veux que tu viennes ce soir",
      "meaning": "I want you to come tonight",
      "word_bank": [
        "veux",
        "la",
        "que",
        "viennes",
        "viens",
        "tu",
        "Je",
        "soir",
        "ce"
      ],
      "explanation": "After Je veux que, tu viens steps into subjunctive tu viennes.",
      "diagnosis": {
        "slip": "used indicative viens",
        "cue": "After Je veux que, use subjunctive tu viennes."
      },
      "id": "fr2702_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il faut que j'y aille maintenant",
      "replays": 2,
      "target_answer": "Il faut que j'y aille maintenant",
      "meaning": "I have to get going now",
      "cues": [
        "Il faut que",
        "j'y aille maintenant"
      ],
      "explanation": "Il faut que j'y aille is heard at the end of almost every French visit!",
      "affirmation": "You wrote Il faut que j'y aille maintenant cleanly.",
      "id": "fr2702_e5"
    }
  ],
  "summary": {
    "outcome": "Use que + subjunctive (soit, aille, vienne, fasse, and regular -er verbs) after Il faut que and Je veux que.",
    "use_example": {
      "german": "Il est tard, il faut que j'y aille !",
      "english": "It's late, I've got to get going!"
    },
    "takeaway": "English 'I want you to [verb]' is ALWAYS French 'Je veux que tu [subjunctive]'.",
    "curiosity_teaser": "Up next on Le Pont ([2703] Savoir vs Connaître): see how The Subjunctive Door leads directly into Savoir vs Connaître."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want you to come tonight\" in French:",
    "target_answer": "Je veux que tu viennes ce soir",
    "word_bank": [
      "ce",
      "soir",
      "pas",
      "ne",
      "viennes",
      "que",
      "Je",
      "veux",
      "tu"
    ],
    "explanation": "Re-constructing \"Je veux que tu viennes ce soir\" from the underlying rule cements the pattern of The Subjunctive Door."
  }
};

export default lesson;
