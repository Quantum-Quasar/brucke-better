import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5022,
  "slug": "lesson-5022",
  "title": "Minimal Pairs: Pain, Vin & Vingt",
  "subtitle": "one never-arriving N, different vowels — hear the difference before you say it",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "pain",
    "vin",
    "vingt",
    "bon",
    "blanc",
    "maison"
  ],
  "table_word_ids": [
    "pain",
    "vin",
    "vingt",
    "bon",
    "blanc",
    "maison"
  ],
  "hook": {
    "title": "The Nasal Family Reunion",
    "content": "Lesson 5021 taught the trick: think the N, never arrive at it. Now meet the family together — pain, vin, vingt, bon, blanc all end in a French nasal, and what separates them is the vowel the N never gets to finish. Hold the vowel, point it toward the N, and stop.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why minimal pairs",
        "content": "pain and vin differ only in their nasal vowel, which is why French ears never confuse bread with wine. Training the ear on near-twins is how the vowels separate themselves.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Same Trick, Different Vowel",
    "content": "Each nasal word pairs a vowel with a never-arriving N: pain, vin, vingt, bon, blanc, maison. The spelling changes — ain, in, in, on, an — but the instruction to your mouth is always the same.",
    "linguist_note": "Nasal vowels are French's oldest sound signature: Latin never had them, and no other Romance language kept them like this.",
    "trap_note": "vingt ends in a silent T as well as a nasal N when it stands alone — but before ans the T wakes up in liaison: vingt ans."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each nasal word with its English twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "bread",
          "german": "pain"
        },
        {
          "id": "p2",
          "english": "wine",
          "german": "vin"
        },
        {
          "id": "p3",
          "english": "twenty",
          "german": "vingt"
        },
        {
          "id": "p4",
          "english": "good",
          "german": "bon"
        },
        {
          "id": "p5",
          "english": "white",
          "german": "blanc"
        }
      ],
      "target_answer": "pain, vin, vingt, bon, blanc",
      "meaning": "bread, wine, twenty, good, white",
      "explanation": "Five nasal words, five different vowels, one shared instruction: think the N.",
      "id": "fr5022_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which word is 'twenty'?",
      "options": [
        "vingt",
        "vin",
        "pain"
      ],
      "target_answer": "vingt",
      "meaning": "twenty",
      "explanation": "vingt and vin share the sharp nasal — the final T (silent alone) is the giveaway on paper.",
      "id": "fr5022_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the nasal word for 'bread' — the word whose root English kept in 'pantry':",
      "english_hint": "a pantry is literally the bread-room",
      "target_answer": "pain",
      "meaning": "bread",
      "explanation": "Latin panis → pain: think the N, don't say it, and the pantry explains the root.",
      "id": "fr5022_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say the bread is good",
      "cues": [
        "the bread → le pain",
        "is good → est bon"
      ],
      "idea_parts": [
        "the bread → Le pain",
        "is good → est bon"
      ],
      "target_answer": "Le pain est bon",
      "meaning": "The bread is good",
      "word_bank": [
        "Le",
        "pain",
        "est",
        "bon",
        "vin",
        "blanc",
        "vingt"
      ],
      "explanation": "Le pain est bon — two nasal words holding one sentence together.",
      "diagnosis": {
        "slip": "pronounced the final N of pain",
        "cue": "Point the vowel toward N and stop — the consonant never arrives."
      },
      "id": "fr5022_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le vin blanc est bon",
      "replays": 2,
      "target_answer": "Le vin blanc est bon",
      "meaning": "The white wine is good",
      "cues": [
        "It means: The white wine is good",
        "Two nasal words in a row: vin, blanc"
      ],
      "explanation": "Le vin blanc est bon — an order built entirely from the nasal family.",
      "affirmation": "You heard three nasal words and wrote them all.",
      "id": "fr5022_e5"
    }
  ],
  "summary": {
    "outcome": "Tell pain, vin, vingt, bon and blanc apart by their nasal vowels and order white wine with them.",
    "use_example": {
      "german": "Le vin blanc est bon",
      "english": "The white wine is good"
    },
    "takeaway": "One never-arriving N, many vowels — the spelling changes, the trick stays.",
    "curiosity_teaser": "Up next on Le Pont ([2] The -ION Bridge): see how Minimal Pairs: Pain, Vin & Vingt leads directly into The -ION Bridge."
  },
  "twist": {
    "prompt": "One more, no safety net — order white wine:",
    "target_answer": "Le vin blanc",
    "word_bank": [
      "Le",
      "vin",
      "blanc",
      "pain",
      "est",
      "bon"
    ],
    "explanation": "\"Le vin blanc\" is the order itself — adjective after noun, both words nasal."
  }
};

export default lesson;
