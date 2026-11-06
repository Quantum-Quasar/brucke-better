import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1902,
  "slug": "lesson-1902",
  "title": "Imparfait vs Composé",
  "subtitle": "Background canvas (imparfait) interrupted by the event dot (passé composé).",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "était",
    "avais",
    "habitais",
    "voulais",
    "arrivé",
    "vu",
    "pris",
    "fait",
    "hier"
  ],
  "table_word_ids": [
    "était",
    "avais",
    "habitais",
    "voulais",
    "arrivé",
    "vu",
    "pris",
    "fait",
    "hier"
  ],
  "hook": {
    "title": "Weaving Background Canvas (Imparfait) and Event Dot (Passé Composé)",
    "content": "The imparfait (-ais/-ait) paints the ongoing background ('I was waiting for the train, I lived in Lyon'), and the passé composé (j'ai vu, il est arrivé) drops the specific event that happened against that background!",
    "footnotes": [
      {
        "marker": "1",
        "title": "The 'Was -ing When -ed' Formula",
        "content": "Whenever English says 'I was doing X when Y happened', X is ALWAYS the imparfait (-ais/-ait) and Y is ALWAYS the passé composé!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Ongoing Frame (-ais/-ait) + Sudden Event (avoir/être + Participle)",
    "content": "Combine an ongoing imparfait clause with a completed passé composé clause.",
    "linguist_note": "Aspectual contrast between imperfective background and perfective foreground structures Romance narrative.",
    "trap_note": "Don't put both verbs in the same tense when one action was already in progress and the other interrupted it!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each half of a past story with its French tense and role:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Quand j'habitais à Paris... (imparfait)",
          "german": "Background frame: When I was living in Paris..."
        },
        {
          "id": "p2",
          "english": "...j'ai trouvé ce café (passé composé)",
          "german": "Completed event: ...I found this café"
        },
        {
          "id": "p3",
          "english": "Je voulais sortir... (imparfait)",
          "german": "Ongoing state: I wanted to go out..."
        },
        {
          "id": "p4",
          "english": "...mais il est arrivé (passé composé)",
          "german": "Sudden event: ...but he arrived"
        }
      ],
      "target_answer": "Background frame: When I was living in Paris..., Completed event: ...I found this café, Ongoing state: I wanted to go out..., Sudden event: ...but he arrived",
      "meaning": "Quand j'habitais à Paris... (imparfait), ...j'ai trouvé ce café (passé composé), Je voulais sortir... (imparfait), ...mais il est arrivé (passé composé)",
      "explanation": "Imparfait sets the ongoing stage; Passé composé delivers the event.",
      "id": "fr1902_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In 'I was waiting for the bus when he arrived', which tense pair is right?",
      "options": [
        "J'attendais le bus quand il arrivait",
        "J'attendais le bus quand il est arrivé",
        "J'ai attendu le bus quand il arrivait"
      ],
      "target_answer": "J'attendais le bus quand il est arrivé",
      "meaning": "'was waiting' = ongoing imparfait (J'attendais); 'arrived' = completed event (il est arrivé)",
      "explanation": "Ongoing background takes imparfait; interrupting event takes passé composé.",
      "id": "fr1902_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences match 'Je voulais t'appeler, mais j'ai oublié'?",
      "german": "Je voulais t'appeler, mais j'ai oublié",
      "meaning": "I wanted to call you, but I forgot",
      "renderings": [
        "I wanted to call you, but I forgot",
        "I was meaning to call you, but I forgot"
      ],
      "traps": [
        "I called you because I wanted to forget",
        "I will call you if I don't forget"
      ],
      "target_answer": "I wanted to call you, but I forgot",
      "explanation": "je voulais expresses the ongoing past intention, and j'ai oublié expresses the completed slip.",
      "id": "fr1902_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "when I lived in Lyon I saw this film",
      "cues": [
        "When I lived in Lyon → Quand j'habitais à Lyon",
        "I saw this film → j'ai vu ce film"
      ],
      "idea_parts": [
        "background frame → Quand j'habitais à Lyon",
        "completed event → j'ai vu ce film"
      ],
      "target_answer": "Quand j'habitais à Lyon, j'ai vu ce film",
      "meaning": "When I lived in Lyon, I saw this film",
      "word_bank": [
        "j'ai",
        "Lyon",
        "film",
        "ce",
        "à",
        "Quand",
        "vu",
        "la",
        "j'habitais",
        "habité"
      ],
      "explanation": "Quand j'habitais (imparfait) + j'ai vu (passé composé).",
      "diagnosis": {
        "slip": "used j'ai habité",
        "cue": "Use Quand j'habitais à Lyon."
      },
      "id": "fr1902_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'avais très faim, donc j'ai pris un gâteau",
      "replays": 2,
      "target_answer": "J'avais très faim, donc j'ai pris un gâteau",
      "meaning": "I was very hungry, so I had a cake",
      "cues": [
        "J'avais très faim",
        "donc j'ai pris un gâteau"
      ],
      "explanation": "Being hungry was the ongoing state (J'avais faim); taking the cake was the action (j'ai pris).",
      "affirmation": "You contrasted J'avais faim and j'ai pris un gâteau cleanly!",
      "id": "fr1902_e5"
    }
  ],
  "summary": {
    "outcome": "Combine the imparfait (background state) and passé composé (completed event) in two-clause narratives.",
    "use_example": {
      "german": "Il faisait beau quand nous sommes sortis.",
      "english": "The weather was nice when we went out."
    },
    "takeaway": "Background state = Imparfait (-ais/-ait); Foreground action = Passé composé.",
    "curiosity_teaser": "Up next on Le Pont ([20] depuis & the Perfect Split): see how Imparfait vs Composé leads directly into depuis & the Perfect Split."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"When I lived in Lyon, I saw this film\" in French:",
    "target_answer": "Quand j'habitais à Lyon, j'ai vu ce film",
    "word_bank": [
      "pas",
      "ce",
      "vu",
      "j'habitais",
      "j'ai",
      "Lyon",
      "film",
      "à",
      "Quand",
      "ne"
    ],
    "explanation": "Re-constructing \"Quand j'habitais à Lyon, j'ai vu ce film\" from the underlying rule cements the pattern of Imparfait vs Composé."
  }
};

export default lesson;
