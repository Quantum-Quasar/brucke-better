import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2401,
  "slug": "lesson-2401",
  "title": "I Call Myself",
  "subtitle": "je m'appelle, tu t'appelles, on se voit — reflexive pronouns in everyday interaction.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "appeler",
    "lever",
    "me",
    "te",
    "nous",
    "vous",
    "on",
    "voir",
    "parler",
    "ami"
  ],
  "table_word_ids": [
    "appeler",
    "lever",
    "me",
    "te",
    "nous",
    "vous",
    "on",
    "voir",
    "parler",
    "ami"
  ],
  "hook": {
    "title": "Reflexives for Self-Action and Reciprocal 'Each Other'",
    "content": "When a reflexive verb is plural (nous, vous, ils/elles, or everyday on), the exact same reflexive pronoun se / nous / vous ALSO means 'EACH OTHER': On se voit demain ('We see each other tomorrow'), On s'appelle ce soir ('We'll call each other tonight')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'See you tomorrow!' is On se voit demain",
        "content": "French uses reciprocal On se voit demain ('We see each other tomorrow') as an everyday goodbye!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Singular Reflexive ('Myself/Yourself') → Plural Reciprocal ('Each Other')",
    "content": "Use je me / tu te / il se for actions directed at oneself, and on se / nous nous / vous vous for actions done to each other.",
    "linguist_note": "Romance reflexive clitics encode both reflexive and reciprocal meaning in plural/collective subjects.",
    "trap_note": "When using everyday on for 'we', remember that its reflexive pronoun is se (s' before a vowel): On se voit, On s'appelle!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each reflexive or reciprocal expression with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je m'appelle Marie",
          "german": "My name is Marie (I call myself)"
        },
        {
          "id": "p2",
          "english": "Comment tu t'appelles ?",
          "german": "What is your name? (How do you call yourself?)"
        },
        {
          "id": "p3",
          "english": "On se voit demain !",
          "german": "We'll see each other tomorrow!"
        },
        {
          "id": "p4",
          "english": "On s'appelle ce soir",
          "german": "We'll call each other tonight"
        },
        {
          "id": "p5",
          "english": "Nous nous comprenons",
          "german": "We understand each other"
        }
      ],
      "target_answer": "My name is Marie (I call myself), What is your name? (How do you call yourself?), We'll see each other tomorrow!, We'll call each other tonight, We understand each other",
      "meaning": "Je m'appelle Marie, Comment tu t'appelles ?, On se voit demain !, On s'appelle ce soir, Nous nous comprenons",
      "explanation": "With on, nous, vous, and ils/elles, the reflexive pronoun also means 'each other'.",
      "id": "fr2401_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word breakdown of 'On se voit ce soir'?",
      "german": "On se voit ce soir",
      "natural": "We'll see each other tonight",
      "options": [
        "One oneself/each-other sees this evening",
        "We'll see each other tonight",
        "We see us tonight"
      ],
      "target_answer": "One oneself/each-other sees this evening",
      "meaning": "Literal structure: One oneself/each-other sees this evening",
      "explanation": "on ('one/we') + se ('each other') + voit ('sees').",
      "id": "fr2401_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do two friends say 'We'll call each other tomorrow' using everyday 'on'?",
      "options": [
        "On appelle demain",
        "On s'appelle demain",
        "On nous appelle demain"
      ],
      "target_answer": "On s'appelle demain",
      "meaning": "We'll call each other tomorrow",
      "explanation": "on always pairs with 3rd-person reflexive se (elided to s' before appelle): On s'appelle demain!",
      "id": "fr2401_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we see each other at the café tonight (using On se voit)",
      "cues": [
        "We see each other → On se voit",
        "at the café tonight → au café ce soir"
      ],
      "idea_parts": [
        "reciprocal verb → On se voit",
        "place + time → au café ce soir"
      ],
      "target_answer": "On se voit au café ce soir",
      "meaning": "We'll see each other at the café tonight",
      "word_bank": [
        "ce",
        "la",
        "se",
        "voit",
        "On",
        "nous",
        "au",
        "café",
        "soir"
      ],
      "explanation": "On se voit is the natural everyday way to say 'We'll see each other'.",
      "diagnosis": {
        "slip": "used nous with On",
        "cue": "Pair On with se: On se voit."
      },
      "id": "fr2401_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous nous voyons tous les lundis",
      "replays": 2,
      "target_answer": "Nous nous voyons tous les lundis",
      "meaning": "We see each other every Monday",
      "cues": [
        "Nous nous voyons",
        "tous les lundis"
      ],
      "explanation": "First Nous is 'we'; second nous is 'each other'.",
      "affirmation": "You wrote the double Nous nous cleanly!",
      "id": "fr2401_e5"
    }
  ],
  "summary": {
    "outcome": "Use reflexive verbs both for self-directed actions (je m'appelle) and reciprocal 'each other' actions (on se voit, on s'appelle).",
    "use_example": {
      "german": "On s'appelle demain et on se voit samedi !",
      "english": "We'll call each other tomorrow and see each other Saturday!"
    },
    "takeaway": "With on/nous/vous, reflexive pronouns also mean 'each other' (On se voit !).",
    "curiosity_teaser": "Up next on Le Pont ([2402] The Morning Round): see how I Call Myself leads directly into The Morning Round."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We'll see each other at the café tonight\" in French:",
    "target_answer": "On se voit au café ce soir",
    "word_bank": [
      "soir",
      "voit",
      "pas",
      "au",
      "ne",
      "On",
      "ce",
      "café",
      "se"
    ],
    "explanation": "Re-constructing \"On se voit au café ce soir\" from the underlying rule cements the pattern of I Call Myself."
  }
};

export default lesson;
