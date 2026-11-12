import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5052,
  "slug": "lesson-5052",
  "title": "Où est la gare ?",
  "subtitle": "ask with où, answer with a route: tout droit, à gauche, à droite",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "où",
    "gare",
    "tout_droit",
    "gauche",
    "droite",
    "ici",
    "là",
    "ville"
  ],
  "table_word_ids": [
    "où",
    "gare",
    "tout_droit",
    "gauche",
    "droite",
    "ici",
    "là",
    "ville"
  ],
  "hook": {
    "title": "From Pointing to Navigating",
    "content": "Lesson 5051 stocked the street words: ici, là, tout droit, à gauche, à droite. Now drive with them. A lost tourist asks Où est la gare ? and you answer with a route: Allez tout droit, puis à gauche. One question word asks for the place; a chain of steps delivers it.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The accent is the question",
        "content": "où (with the grave accent) is 'where'; ou (no accent) is 'or'. One stroke of ink decides whether you are lost or choosing a dessert.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Ask with où, Answer with a Route",
    "content": "Où est la gare ? needs no inversion — où + est already asks. The answer walks in steps: Allez tout droit, puis à gauche. Each step is a little command with its own preposition glued on.",
    "linguist_note": "Latin ubi again — the same accented où you met with the question words in Topic 7.",
    "trap_note": "Don't drop the accent: ou est la gare reads as 'or is the station' — a different sentence entirely."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each street question or step with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Where is the station?",
          "german": "Où est la gare ?"
        },
        {
          "id": "p2",
          "english": "straight ahead",
          "german": "tout droit"
        },
        {
          "id": "p3",
          "english": "to the left",
          "german": "à gauche"
        },
        {
          "id": "p4",
          "english": "to the right",
          "german": "à droite"
        },
        {
          "id": "p5",
          "english": "here",
          "german": "ici"
        }
      ],
      "target_answer": "Où est la gare ?, tout droit, à gauche, à droite, ici",
      "meaning": "Where is the station?, straight ahead, to the left, to the right, here",
      "explanation": "où asks for the place; tout droit, à gauche, à droite deliver it in steps.",
      "id": "fr5052_e1"
    },
    {
      "type": "shift_select",
      "prompt": "A lost tourist approaches you. What do they say?",
      "options": [
        "Où est la gare ?",
        "Ou est la gare ?",
        "Où la gare est ?"
      ],
      "target_answer": "Où est la gare ?",
      "meaning": "Where is the station?",
      "explanation": "Où est la gare ? — the accented où, then est; no word-shuffling needed.",
      "id": "fr5052_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the accented question word for 'where':",
      "english_hint": "Latin ubi — the root inside 'ubiquitous'",
      "target_answer": "où",
      "meaning": "where",
      "explanation": "où: Latin ubi with its question accent — 'present everywhere' is ubiquitous, 'where' is où.",
      "id": "fr5052_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: go straight ahead, then to the left",
      "cues": [
        "the go-command is allez",
        "then = puis; the steps keep their prepositions: à gauche"
      ],
      "idea_parts": [
        "go straight ahead → Allez tout droit",
        "then to the left → puis à gauche"
      ],
      "target_answer": "Allez tout droit, puis à gauche",
      "meaning": "Go straight ahead, then to the left",
      "word_bank": [
        "Allez",
        "tout",
        "droit",
        "puis",
        "à",
        "gauche",
        "droite"
      ],
      "explanation": "Allez tout droit, puis à gauche — a route in two steps, each with its preposition.",
      "diagnosis": {
        "slip": "dropped the à before the direction",
        "cue": "The direction rides on its preposition: à gauche, à droite."
      },
      "id": "fr5052_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La gare est là",
      "replays": 2,
      "target_answer": "La gare est là",
      "meaning": "The station is there",
      "cues": [
        "It means: The station is there",
        "là is the pointing word"
      ],
      "explanation": "La gare est là — the question answered with a single pointing word.",
      "affirmation": "You wrote the whole exchange in one sentence: question asked, place pointed.",
      "id": "fr5052_e5"
    }
  ],
  "summary": {
    "outcome": "Ask où est… ? and route someone with tout droit, à gauche and à droite.",
    "use_example": {
      "german": "Où est la gare ? — Tout droit, puis à gauche",
      "english": "Where is the station? — Straight ahead, then to the left"
    },
    "takeaway": "The accent on où is the question; the route answers in steps with their prepositions.",
    "curiosity_teaser": "Up next on Le Pont ([5131] Le Train, Le Billet & La Gare): see how Où est la gare ? leads directly into Le Train, Le Billet & La Gare."
  },
  "twist": {
    "prompt": "One more, no safety net — ask where the station is:",
    "target_answer": "Où est la gare ?",
    "word_bank": [
      "Où",
      "est",
      "la",
      "gare",
      "Ou",
      "ici"
    ],
    "explanation": "Rebuilding \"Où est la gare ?\" — accent first, verb second, no inversion."
  }
};

export default lesson;
