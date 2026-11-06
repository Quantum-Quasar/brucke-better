import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 30,
  "slug": "capstone-le-pont-reading",
  "title": "Capstone: Le Pont Reading",
  "subtitle": "Walking across Le Pont in Paris — every conversion bridge, tense frame, and left-walking pronoun in one living story",
  "phase": 5,
  "shift_categories": [
    "ion",
    "ation",
    "ite",
    "ance",
    "e",
    "ment",
    "eur",
    "able",
    "doublet"
  ],
  "word_ids": [
    "ville",
    "université",
    "liberté",
    "différence",
    "exactement",
    "possible",
    "docteur",
    "hôtel",
    "comprendre",
    "voudrais",
    "faut",
    "depuis"
  ],
  "table_word_ids": [
    "ville",
    "université",
    "liberté",
    "différence",
    "exactement",
    "possible",
    "docteur",
    "hôtel",
    "comprendre",
    "voudrais",
    "faut",
    "depuis"
  ],
  "hook": {
    "title": "Look How Much French Was Already Inside Your Head",
    "content": "Read this Paris paragraph out loud and watch every topic from the trail light up at once: 'J'habite à Paris depuis deux ans. Hier, quand je suis sorti de l'hôtel, j'ai vu mon ami qui est professeur à l'université. Il m'a dit : « Il faut célébrer ce soir ! J'ai réservé une table au restaurant dont tu parles. » Naturellement, j'ai répondu : « Tu as raison, j'ai très faim — on y va ! »' Every single clause is built from the 9 conversion bridges and the mental-theatre rules you now own.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why you never needed a phrasebook",
        "content": "A phrasebook hands you frozen sentences you cannot alter. A conversion engine hands you the blueprint so you can build sentences you have never heard before.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Nine Bridges and Five Engines in One Glance",
    "content": "You now hold the complete architecture of Le Pont: (1) The 9 Vocabulary Bridges (-ion, -ation→-er, -ité, -ance, -é↔-ed, -ment, -eur, -able, and Norman doublets like hôtel/hospital). (2) The Left-Walking Pronouns (le, la, lui, leur, me, te, se, y, en). (3) The Ne...Pas Sandwich. (4) The Four Time Frames (Present + depuis, Near Future je vais + inf, Passé Composé avoir/être + participle, Imparfait -ais/-ait). (5) The Polite & Necessary Moods (je voudrais, il faut que).",
    "linguist_note": "English is the most Latinized Germanic language in the world; French is the most Germanicized Romance language — which makes the Channel the richest cognate bridge on earth.",
    "trap_note": "Never revert to translating English word-for-word when under pressure: pause, picture the thought (who acts? does a pronoun walk left? is the state possessed with avoir?), and let the French engine assemble it."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each conversion bridge from the course with its flagship example:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "-ION & -ITÉ (100% feminine)",
          "german": "la réservation / l'université"
        },
        {
          "id": "p2",
          "english": "-ATION → -ER verb engine",
          "german": "confirmation → confirmer"
        },
        {
          "id": "p3",
          "english": "-LY → -MENT adverb bridge",
          "german": "exactement / naturellement"
        },
        {
          "id": "p4",
          "english": "Passé composé + Imparfait",
          "german": "j'ai vu / c'était"
        },
        {
          "id": "p5",
          "english": "Left-walking pronouns (y / en / lui)",
          "german": "j'y vais / j'en veux / je lui parle"
        }
      ],
      "target_answer": "la réservation / l'université, confirmation → confirmer, exactement / naturellement, j'ai vu / c'était, j'y vais / j'en veux / je lui parle",
      "meaning": "-ION & -ITÉ (100% feminine), -ATION → -ER verb engine, -LY → -MENT adverb bridge, Passé composé + Imparfait, Left-walking pronouns (y / en / lui)",
      "explanation": "All nine bridges and five syntactic engines work together in real French.",
      "id": "fr30_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Il m'a dit qu'il faut partir'?",
      "german": "Il m'a dit qu'il faut partir",
      "natural": "He told me that we have to leave",
      "options": [
        "He me told that one must leaving",
        "He to-me has said that it is-needed to-leave",
        "He told me that we have to leave"
      ],
      "target_answer": "He to-me has said that it is-needed to-leave",
      "meaning": "Literal structure: He to-me has said that it is-needed to-leave",
      "explanation": "m' ('to me') walks before a dit ('has said'), and qu'il faut partir expresses necessity.",
      "id": "fr30_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences capture the full meaning of 'J'habite ici depuis trois ans et j'adore la ville'?",
      "german": "J'habite ici depuis trois ans et j'adore la ville",
      "meaning": "I have been living here for three years and I love the city",
      "renderings": [
        "I've lived here for three years and I love the city",
        "I have been living here for three years and I adore the town"
      ],
      "traps": [
        "I lived here three years ago and left the city",
        "I am going to live here for three years"
      ],
      "target_answer": "I've lived here for three years and I love the city",
      "explanation": "Present tense + depuis shows the three-year stay is still ongoing today.",
      "id": "fr30_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I would like to reserve a table because we are going to celebrate tonight",
      "cues": [
        "Je voudrais réserver une table parce que nous allons célébrer ce soir"
      ],
      "idea_parts": [
        "polite request → Je voudrais réserver une table",
        "reason → parce que nous allons célébrer ce soir"
      ],
      "target_answer": "Je voudrais réserver une table parce que nous allons célébrer ce soir",
      "meaning": "I would like to reserve a table because we are going to celebrate tonight",
      "word_bank": [
        "ce",
        "voudrais",
        "table",
        "que",
        "parce",
        "la",
        "célébrer",
        "nous",
        "soir",
        "Je",
        "veux",
        "réserver",
        "une",
        "allons"
      ],
      "explanation": "Combines conditional je voudrais + -ation verb réserver + parce que + near future nous allons célébrer.",
      "diagnosis": {
        "slip": "used veux or forgot que after parce",
        "cue": "Chain Je voudrais réserver une table + parce que nous allons célébrer ce soir."
      },
      "id": "fr30_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu as raison, c'était une excellente décision",
      "replays": 2,
      "target_answer": "Tu as raison, c'était une excellente décision",
      "meaning": "You are right, it was an excellent decision",
      "cues": [
        "You have reason: Tu as raison",
        "it was an excellent decision: c'était une excellente décision"
      ],
      "explanation": "Synthesizes avoir raison, imparfait c'était, feminine agreement, and the -ion bridge.",
      "affirmation": "You completed the spine dictation across all five phases!",
      "id": "fr30_e5"
    }
  ],
  "summary": {
    "outcome": "Read, hear, and assemble multi-clause French sentences combining all 9 conversion bridges, tenses, and pronouns.",
    "use_example": {
      "german": "Je comprends maintenant le français que j'avais déjà dans la tête.",
      "english": "I now understand the French that I already had inside my head."
    },
    "takeaway": "You didn't memorize a foreign language from scratch — you unlocked the French half of your own English.",
    "curiosity_teaser": "Up next on Le Pont ([3001] A Day in Paris: Reading): see how Capstone: Le Pont Reading leads directly into A Day in Paris: Reading."
  },
  "twist": {
    "prompt": "Final spine twist — 'I understand the French that you speak':",
    "target_answer": "Je comprends le français que tu parles",
    "word_bank": [
      "parles",
      "la",
      "français",
      "tu",
      "Je",
      "comprends",
      "que",
      "le",
      "qui"
    ],
    "explanation": "Je comprends + le français + object relative que + tu parles — congratulations on crossing Le Pont!"
  },
  "payoff": {
    "ofLesson": 29,
    "text": "The foundation from Topic 29 (The French Mind) now pays off directly inside Capstone: Le Pont Reading: every sentence here builds on that earlier step."
  }
};

export default lesson;
