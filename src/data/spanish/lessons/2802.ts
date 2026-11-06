import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2802,
  "slug": "lo-que-the-thing-that",
  "title": "lo que: The Thing That / What",
  "subtitle": "Using neuter lo que for 'what / the thing that': Comprendo lo que dices, Lo que quiero es descansar",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "lo",
    "qué",
    "comprender",
    "querer",
    "decir",
    "hacer",
    "importante",
    "verdad",
    "saber"
  ],
  "table_word_ids": [
    "lo",
    "qué",
    "comprender",
    "querer",
    "decir",
    "hacer",
    "importante",
    "verdad",
    "saber"
  ],
  "hook": {
    "title": "Why 'Lo' + 'Que' Means 'What' ('The Thing That')",
    "content": "Remember from Topic 1 that **lo** is the masculine and neuter pronoun for an idea ('it / that thing')? When you put **lo** in front of **que** ('that'), you get **lo que** — literally **'that thing which'** = English **'what'**! Look at how powerful it is:\n• In the middle of a sentence: **Comprendo lo que quieres** ('I understand what you want'), **Sé lo que haces** ('I know what you are doing').\n• At the start of a sentence: **Lo que quiero es un café** ('What I want is a coffee'), **Lo que es importante es la verdad** ('What is important is the truth')!"
  },
  "pattern": {
    "title": "Question '¿Qué?' vs Connector 'Lo Que'",
    "content": "Asking a question? Use accented ¿Qué? (¿Qué quieres? 'What do you want?'). Connecting a statement? Use lo que (Sé lo que quieres 'I know what you want')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "what I want (the thing that I want)",
          "german": "lo que quiero"
        },
        {
          "id": "p2",
          "english": "what you say (the thing that you say)",
          "german": "lo que dices"
        },
        {
          "id": "p3",
          "english": "I understand what you want",
          "german": "comprendo lo que quieres"
        },
        {
          "id": "p4",
          "english": "what I want is a coffee",
          "german": "lo que quiero es un café"
        },
        {
          "id": "p5",
          "english": "I know what I am doing",
          "german": "sé lo que hago"
        }
      ],
      "target_answer": "lo que quiero, lo que dices, comprendo lo que quieres, lo que quiero es un café, sé lo que hago",
      "meaning": "what I want (the thing that I want), what you say (the thing that you say), I understand what you want, what I want is a coffee, I know what I am doing",
      "explanation": "lo que translates non-interrogative 'what' ('the thing that').",
      "id": "es2802_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'what I want' ('the thing that I want') from its three Spanish words:",
      "tile_options": [
        "quiero",
        "la",
        "que",
        "lo"
      ],
      "target_answer": "loquequiero",
      "meaning": "lo que quiero (what I want)",
      "explanation": "lo ('the thing') + que ('that') + quiero ('I want').",
      "id": "es2802_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'What I want is the truth'?",
      "options": [
        "*El que quiero es la verdad",
        "Lo que quiero es la verdad",
        "*Qué quiero es la verdad"
      ],
      "target_answer": "Lo que quiero es la verdad",
      "meaning": "What I want is the truth",
      "explanation": "At the start of a sentence, 'What [I want]...' is always Lo que...",
      "id": "es2802_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I know what you want'",
      "target_answer": "Sé lo que quieres",
      "meaning": "I know what you want",
      "word_bank": [
        "Conozco",
        "lo",
        "quieres",
        "Sé",
        "que",
        "quiero",
        "la"
      ],
      "explanation": "Sé + lo que + quieres.",
      "id": "es2802_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Lo que quiero es un café",
      "replays": 2,
      "target_answer": "Lo que quiero es un café",
      "meaning": "What I want is a coffee",
      "cues": [
        "What (The thing that): Lo que",
        "I want: quiero",
        "is a coffee: es un café"
      ],
      "explanation": "Lo que quiero es un café.",
      "affirmation": "Neuter lo que mastered!",
      "id": "es2802_e5"
    }
  ],
  "summary": {
    "outcome": "Use lo que for 'what / the thing that' both after verbs and at the head of a sentence.",
    "use_example": {
      "german": "Comprendo lo que dices y sé lo que quiero.",
      "english": "I understand what you say and I know what I want."
    },
    "takeaway": "Whenever English 'what' can be rephrased as 'the thing that', Spanish says lo que.",
    "curiosity_teaser": "Up next ([2803] Verb Dynasties: poner, tener, traer & mostrar Matrices): unlock 20+ Spanish verbs at once using Language Transfer's Latin prefix × root matrix!"
  },
  "twist": {
    "prompt": "Assemble: 'I don't understand what you want'",
    "target_answer": "No comprendo lo que quieres",
    "word_bank": [
      "quiero",
      "quieres",
      "No",
      "lo",
      "la",
      "comprendo",
      "quien",
      "que"
    ],
    "explanation": "No comprendo lo que quieres."
  }
};

export default lesson;
