import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 12,
  "slug": "the-near-future",
  "title": "The Near Future",
  "subtitle": "aller + infinitive: je vais visiter, tu vas voir, on va partir — and aller is English 'amble'",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "aller",
    "je_vais",
    "vas",
    "va",
    "allons",
    "allez",
    "on",
    "demain",
    "ce_soir",
    "voir",
    "faire"
  ],
  "table_word_ids": [
    "aller",
    "je_vais",
    "vas",
    "va",
    "allons",
    "allez",
    "on",
    "demain",
    "ce_soir",
    "voir",
    "faire"
  ],
  "hook": {
    "title": "How 'I Am Going to...' Gives You the Whole Future Tense",
    "content": "Think about how you talk about tonight or tomorrow in English: nine times out of ten, you don't say 'I shall visit' — you say 'I'm going to visit'. French does the exact same thing! Take the present tense of aller ('to go', cousin of English amble and ambulance) and drop ANY infinitive right behind it: je vais visiter ('I'm going to visit'), tu vas voir ('you're going to see'), on va célébrer ce soir ('we're going to celebrate tonight').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why aller changes stems from vais to allons",
        "content": "aller is a team-up of three Latin verbs: je vais / tu vas / il va come from Latin vādere ('to wade/advance'), while aller / nous allons / vous allez come from Latin ambulāre ('to walk/amble')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "vais, vas, va, allons, allez + Parked Infinitive",
    "content": "Just like je veux + infinitive in Topic 3, the near future (le futur proche) conjugates only the first verb (je vais, tu vas, il/elle/on va, nous allons, vous allez) and leaves the second verb parked in its dictionary form. And when you negate the near future, the ne...pas sandwich hugs ONLY the going-verb: Je ne vais pas partir ('I am not going to leave').",
    "linguist_note": "Romance periphrastic future with 'go' + bare infinitive parallels English 'going to' grammaticalization, without needing a preposition like 'to' between the verbs.",
    "trap_note": "The shortcut your mind will offer: inserting à ('to') between je vais and the infinitive (*je vais à visiter) by copying English 'going TO visit'. French chains them bare: je vais visiter!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each form of aller with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am going",
          "german": "je vais"
        },
        {
          "id": "p2",
          "english": "you are going (informal)",
          "german": "tu vas"
        },
        {
          "id": "p3",
          "english": "he / she / we (informal) are going",
          "german": "il / elle / on va"
        },
        {
          "id": "p4",
          "english": "we are going / let's go!",
          "german": "nous allons"
        },
        {
          "id": "p5",
          "english": "you are going (polite/plural)",
          "german": "vous allez"
        }
      ],
      "target_answer": "je vais, tu vas, il / elle / on va, nous allons, vous allez",
      "meaning": "I am going, you are going (informal), he / she / we (informal) are going, we are going / let's go!, you are going (polite/plural)",
      "explanation": "vais, vas, va come from Latin vādere; allons, allez come from ambulāre.",
      "id": "fr12_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'On va célébrer ce soir'?",
      "german": "On va célébrer ce soir",
      "natural": "We're going to celebrate tonight",
      "options": [
        "We're going to celebrate tonight",
        "We go to celebrating tonight",
        "One goes celebrate this evening"
      ],
      "target_answer": "One goes celebrate this evening",
      "meaning": "Literal structure: One goes celebrate this evening",
      "explanation": "on is literally 'one' (used as everyday 'we'), and va célébrer joins with no 'to'.",
      "id": "fr12_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am not going to leave' in French?",
      "options": [
        "Je ne vais pas partir",
        "Je vais ne pas partir",
        "Je ne vais partir pas"
      ],
      "target_answer": "Je ne vais pas partir",
      "meaning": "I am not going to leave",
      "explanation": "The ne...pas sandwich wraps the conjugated auxiliary vais; the infinitive partir waits outside.",
      "id": "fr12_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "tomorrow I am going to visit Paris",
      "cues": [
        "Tomorrow → Demain",
        "I am going to visit Paris → je vais visiter Paris (no preposition before visiter)"
      ],
      "idea_parts": [
        "time opener → Demain",
        "near-future chain → je vais visiter Paris"
      ],
      "target_answer": "Demain, je vais visiter Paris",
      "meaning": "Tomorrow, I am going to visit Paris",
      "word_bank": [
        "à",
        "Paris",
        "vas",
        "vais",
        "je",
        "Demain",
        "visiter"
      ],
      "explanation": "Demain, je vais visiter Paris chains vais directly to visiter.",
      "diagnosis": {
        "slip": "inserted à before visiter",
        "cue": "aller + infinitive needs no preposition between them."
      },
      "id": "fr12_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Qu'est-ce que tu vas faire ce soir",
      "replays": 2,
      "target_answer": "Qu'est-ce que tu vas faire ce soir",
      "meaning": "What are you going to do tonight?",
      "cues": [
        "What: Qu'est-ce que",
        "near future: tu vas faire (do/make)",
        "tonight: ce soir"
      ],
      "explanation": "Qu'est-ce que ('what is it that') + tu vas faire ce soir.",
      "affirmation": "You heard Qu'est-ce que and tu vas faire ce soir clearly.",
      "id": "fr12_e5"
    }
  ],
  "summary": {
    "outcome": "Express any future plan using aller (vais, vas, va, allons, allez) + bare infinitive, and negate it by wrapping the auxiliary.",
    "use_example": {
      "german": "On va voir un film ce soir.",
      "english": "We're going to see a film tonight."
    },
    "takeaway": "aller + bare infinitive gives you the entire future tense today — with zero new endings to memorize.",
    "curiosity_teaser": "Up next on Le Pont ([1201] Amble & Go): see how The Near Future leads directly into Amble & Go."
  },
  "twist": {
    "prompt": "Ungraded — 'You are going to see my friend tomorrow' (informal tu):",
    "target_answer": "Tu vas voir mon ami demain",
    "word_bank": [
      "Tu",
      "vas",
      "voir",
      "ami",
      "la",
      "demain",
      "mon",
      "vais"
    ],
    "explanation": "tu vas + voir ('to see') + mon ami + demain."
  },
  "foreshadow": {
    "line": "Having mastered The Near Future, look ahead to Topic 13 (à, de, chez), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 13
  },
  "payoff": {
    "ofLesson": 11,
    "text": "The foundation from Topic 11 (Adjectives & the Silent -s) now pays off directly inside The Near Future: every sentence here builds on that earlier step."
  }
};

export default lesson;
