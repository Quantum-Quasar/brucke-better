import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 26,
  "slug": "the-would-world",
  "title": "The Would-World",
  "subtitle": "je voudrais, tu pourrais, je ferais — the conditional politeness escalator and the -ai future tense",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "vouloir",
    "faire",
    "aller",
    "avoir",
    "vin",
    "café"
  ],
  "table_word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "vouloir",
    "faire",
    "aller",
    "avoir",
    "vin",
    "café"
  ],
  "hook": {
    "title": "How Future Stem + Imparfait Ending Creates 'Would'",
    "content": "What is 'would' historically? In English, 'would' is literally the past tense of 'will' ('I wished that I would...'). French builds its Would-World (le conditionnel) using the exact same recipe! It takes the future stem (always ending in the sound /ʁ/) and welds on the -ais/-ait endings from the imparfait (Topic 19): vouloir → je voudrais ('I would like'), pouvoir → tu pourrais ('you could'), faire → je ferais ('I would do/make'), parler → je parlerais ('I would speak').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why the French future tense is literally Infinitive + J'ai",
        "content": "Vulgar Latin formed the future by gluing habēre ('to have') onto the back of the infinitive: parler + ai ('I have to speak') → je parlerai ('I will speak'), parler + as → tu parleras, parler + a → il parlera!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "The Politeness Escalator: je veux → je voudrais",
    "content": "In Topic 1 you learned je veux ('I want'). In a Paris bistro or shop, saying Je veux un café sounds blunt — like banging on the counter. Step onto the conditional escalator and say Je voudrais un café, s'il vous plaît ('I would like a coffee, please') or Tu pourrais m'aider ? ('Could you help me?'). And just like je veux, je voudrais chains directly with any bare infinitive: Je voudrais réserver une table ('I would like to reserve a table').",
    "linguist_note": "Both the synthetic future (-ai, -as, -a) and conditional (-ais, -ais, -ait) are Medieval Romance fusions of the infinitive + present/imperfect of habēre.",
    "trap_note": "The shortcut your mind will offer: using blunt Je veux when ordering in a restaurant or shop. Step up to the conditional Je voudrais for polite requests!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each conditional or future form with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "je voudrais (from vouloir)",
          "german": "I would like"
        },
        {
          "id": "p2",
          "english": "tu pourrais (from pouvoir)",
          "german": "you could (polite request)"
        },
        {
          "id": "p3",
          "english": "je ferais (from faire)",
          "german": "I would do / make"
        },
        {
          "id": "p4",
          "english": "je parlerai (infinitive + ai)",
          "german": "I will speak"
        },
        {
          "id": "p5",
          "english": "je parlerais (infinitive + ais)",
          "german": "I would speak"
        }
      ],
      "target_answer": "I would like, you could (polite request), I would do / make, I will speak, I would speak",
      "meaning": "je voudrais (from vouloir), tu pourrais (from pouvoir), je ferais (from faire), je parlerai (infinitive + ai), je parlerais (infinitive + ais)",
      "explanation": "Future ends in -ai (from j'ai); Conditional ends in -ais (from j'avais).",
      "id": "fr26_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build the conditional 'I would speak' by attaching the imparfait ending -ais to the infinitive parler:",
      "tile_options": [
        "ai",
        "ais",
        "parler",
        "é"
      ],
      "target_answer": "parlerais",
      "meaning": "je parlerais (I would speak)",
      "explanation": "Infinitive parler + -ais = parlerais ('would speak').",
      "id": "fr26_e2"
    },
    {
      "type": "shift_select",
      "prompt": "You are ordering red wine at a restaurant. Which is the polite French phrasing?",
      "options": [
        "Je voudrais du vin rouge, s'il vous plaît",
        "Je veux le vin rouge",
        "J'ai voulu du vin rouge"
      ],
      "target_answer": "Je voudrais du vin rouge, s'il vous plaît",
      "meaning": "I would like some red wine, please",
      "explanation": "Je voudrais softens 'I want' into polite 'I would like'.",
      "id": "fr26_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I would like to reserve a table for tonight",
      "cues": [
        "I would like to reserve a table → Je voudrais réserver une table + for tonight → pour ce soir"
      ],
      "idea_parts": [
        "polite conditional + infinitive → Je voudrais réserver",
        "object → une table",
        "time → pour ce soir"
      ],
      "target_answer": "Je voudrais réserver une table pour ce soir",
      "meaning": "I would like to reserve a table for tonight",
      "word_bank": [
        "une",
        "voudrais",
        "soir",
        "ce",
        "veux",
        "table",
        "Je",
        "pour",
        "la",
        "réserver"
      ],
      "explanation": "Je voudrais pulls the bare infinitive réserver just like je veux.",
      "diagnosis": {
        "slip": "conjugated réserver or used veux",
        "cue": "Use Je voudrais + bare infinitive réserver."
      },
      "id": "fr26_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu pourrais parler plus lentement",
      "replays": 2,
      "target_answer": "Tu pourrais parler plus lentement",
      "meaning": "Could you speak more slowly?",
      "cues": [
        "Could you: Tu pourrais",
        "speak more slowly: parler plus lentement"
      ],
      "explanation": "Tu pourrais + infinitive turns a command into a gentle request.",
      "affirmation": "You heard Tu pourrais parler and the -ment adverb lentement.",
      "id": "fr26_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy je voudrais, tu pourrais, and je ferais for polite requests and hypotheticals, and recognize the -ai future tense.",
    "use_example": {
      "german": "Je voudrais vous demander une information.",
      "english": "I would like to ask you for a piece of information."
    },
    "takeaway": "Future stem (/ʁ/) + -ai is 'will'; Future stem (/ʁ/) + -ais is 'would'.",
    "curiosity_teaser": "Up next on Le Pont ([2601] Je voudrais): see how The Would-World leads directly into Je voudrais."
  },
  "twist": {
    "prompt": "Ungraded — 'What would you do?' (use Qu'est-ce que tu ferais):",
    "target_answer": "Qu'est-ce que tu ferais",
    "word_bank": [
      "faire",
      "tu",
      "fais",
      "Qu'est-ce",
      "que",
      "ferais"
    ],
    "explanation": "fer- (future stem of faire) + -ais = tu ferais ('you would do')."
  },
  "foreshadow": {
    "line": "Having mastered The Would-World, look ahead to Topic 27 (il faut), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 27
  },
  "payoff": {
    "ofLesson": 25,
    "text": "The foundation from Topic 25 (il y a) now pays off directly inside The Would-World: every sentence here builds on that earlier step."
  }
};

export default lesson;
