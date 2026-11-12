import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5032,
  "slug": "lesson-5032",
  "title": "False Friends II: The Second Deck",
  "subtitle": "sensible, monnaie, assister, coin, formidable, notice — six more words wearing costumes",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "trap_sensible",
    "trap_monnaie",
    "trap_assister",
    "trap_coin",
    "trap_formidable",
    "trap_notice"
  ],
  "table_word_ids": [
    "trap_sensible",
    "trap_monnaie",
    "trap_assister",
    "trap_coin",
    "trap_formidable",
    "trap_notice"
  ],
  "hook": {
    "title": "The Traps Keep Coming",
    "content": "Lesson 5031 walked the first trap deck. Here is the second: sensible means sensitive, monnaie means small change, assister means to attend, coin means corner, formidable means wonderful, and notice is the instruction leaflet. Six costumes, six French meanings underneath.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why the meanings drift",
        "content": "The Channel carried these words in both directions across nine centuries. Each shore kept the word but bent the meaning — which is exactly how doublets like hôtel/hospital happened.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Decoy Spelling, French Truth",
    "content": "Before you trust a familiar word, ask what the French means — not what English would say in its place. The spelling is the costume; the French meaning is the person wearing it.",
    "linguist_note": "formidable once frightened people (Latin formido, 'dread'); modern French uses it for pure praise: C'est formidable !",
    "trap_note": "assister always drags its à with it: assister à un concert. Without the à, French reads it as helping — the meaning you almost picked."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French trap word with its REAL meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "sensitive",
          "german": "sensible"
        },
        {
          "id": "p2",
          "english": "small change",
          "german": "monnaie"
        },
        {
          "id": "p3",
          "english": "to attend",
          "german": "assister à"
        },
        {
          "id": "p4",
          "english": "corner",
          "german": "coin"
        },
        {
          "id": "p5",
          "english": "instruction manual",
          "german": "notice"
        }
      ],
      "target_answer": "sensible, monnaie, assister à, coin, notice",
      "meaning": "sensitive, small change, to attend, corner, instruction manual",
      "explanation": "Five costumes stripped: the French meanings are the only truth the sentence will honour.",
      "id": "fr5032_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Your friend says: 'Elle est très sensible.' What did you just learn about her?",
      "options": [
        "She is very sensitive",
        "She is very sensible",
        "She is very fashion-conscious"
      ],
      "target_answer": "She is very sensitive",
      "meaning": "She is very sensitive",
      "explanation": "sensible feels things deeply; the 'sensible' you wanted would be raisonnable.",
      "id": "fr5032_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the French word that looks like money metal but names a corner:",
      "english_hint": "'mon coin' is my neck of the woods",
      "target_answer": "coin",
      "meaning": "corner; area",
      "explanation": "coin is a corner — the coins in your pocket are pièces, and la monnaie is the change.",
      "id": "fr5032_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say this concert is wonderful",
      "cues": [
        "this concert → ce concert",
        "praise in French is formidable"
      ],
      "idea_parts": [
        "this concert → Ce concert",
        "is wonderful → est formidable"
      ],
      "target_answer": "Ce concert est formidable",
      "meaning": "This concert is wonderful",
      "word_bank": [
        "Ce",
        "concert",
        "est",
        "formidable",
        "coin",
        "sensible"
      ],
      "explanation": "Ce concert est formidable — formidable praise, zero fear left inside it.",
      "diagnosis": {
        "slip": "read formidable as 'fearsome'",
        "cue": "In modern French, formidable is high praise — the dread stayed in the Latin."
      },
      "id": "fr5032_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'ai assisté au concert",
      "replays": 2,
      "target_answer": "J'ai assisté au concert",
      "meaning": "I attended the concert",
      "cues": [
        "It means: I attended the concert",
        "assister à = to attend, never to assist"
      ],
      "explanation": "J'ai assisté au concert — attended, watched, but helped nobody.",
      "affirmation": "You wrote the trap in its natural habitat — assister with its à.",
      "id": "fr5032_e5"
    }
  ],
  "summary": {
    "outcome": "Sidestep the second trap deck by asking what the French means before trusting the spelling.",
    "use_example": {
      "german": "C'est un concert formidable — j'ai assisté hier",
      "english": "It's a wonderful concert — I attended yesterday"
    },
    "takeaway": "A familiar spelling is a costume; ask for the French meaning first.",
    "curiosity_teaser": "Up next on Le Pont ([3] The -ation Engine): see how False Friends II: The Second Deck leads directly into The -ation Engine."
  },
  "twist": {
    "prompt": "One more, from memory — say 'It's wonderful':",
    "target_answer": "C'est formidable",
    "word_bank": [
      "C'est",
      "formidable",
      "coin",
      "est",
      "sensible"
    ],
    "explanation": "\"C'est formidable\" — the trap word doing what modern French actually uses it for: praise."
  }
};

export default lesson;
