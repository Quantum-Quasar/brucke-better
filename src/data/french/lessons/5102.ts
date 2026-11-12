import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5102,
  "slug": "lesson-5102",
  "title": "Le conditionnel poli",
  "subtitle": "pourrais and voudrais in action: the conditional as the politeness lever",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "vouloir",
    "faire"
  ],
  "table_word_ids": [
    "voudrais",
    "pourrais",
    "ferais",
    "vouloir",
    "faire"
  ],
  "hook": {
    "title": "The Escalator, Climbed",
    "content": "Lesson 5101 built the whole would-world. Now put it to work: Je voudrais un café. Pourriez-vous m'aider ? The -ais ending is French's politeness lever — the same verb, one step softer. Nothing is hypothetical about Je voudrais un café; you really do want that coffee.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why the past softens the ask",
        "content": "The -ais ending came from the imparfait. Framing a request one step back — 'I would like' instead of 'I want' — puts distance between you and the demand. English borrowed the same trick: 'I wanted to ask…'.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Would-Maker, Request-Maker",
    "content": "Je voudrais un café. Est-ce que vous pourriez m'aider ? On le ferait. The verb's would-form does the softening; the rest of the sentence keeps its everyday order.",
    "linguist_note": "pouvoir is Latin posse — English kept the root in 'possible'. The conditional ending -ais is the imparfait's own softness, borrowed for politeness.",
    "trap_note": "The stem bends while the ending carries 'would': pou- → pour- (pourrais, pourriez), vou- → voudr- (voudrais). Learn the bend once and all three verbs follow."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each polite request with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I would like a coffee",
          "german": "Je voudrais un café"
        },
        {
          "id": "p2",
          "english": "Could you help me?",
          "german": "Pourriez-vous m'aider ?"
        },
        {
          "id": "p3",
          "english": "I would do it",
          "german": "Je le ferais"
        },
        {
          "id": "p4",
          "english": "I could come back",
          "german": "Je pourrais revenir"
        }
      ],
      "target_answer": "Je voudrais un café, Pourriez-vous m'aider ?, Je le ferais, Je pourrais revenir",
      "meaning": "I would like a coffee, Could you help me?, I would do it, I could come back",
      "explanation": "voudrais, pourriez, ferais, pourrais — the would-ending on three everyday verbs.",
      "id": "fr5102_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Order politely at the counter:",
      "options": [
        "Je voudrais un café",
        "Je veux un café",
        "Je voudrais avoir un café"
      ],
      "target_answer": "Je voudrais un café",
      "meaning": "I would like a coffee",
      "explanation": "Je voudrais un café — voudrais already contains 'would like'; piling on avoir over-builds the order.",
      "id": "fr5102_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the would-form of pouvoir for 'you' (vous):",
      "english_hint": "the stem bends: pou- → pour-",
      "target_answer": "pourriez",
      "meaning": "you could (polite)",
      "explanation": "pourriez — the bent stem of pouvoir with the conditional -iez: Pourriez-vous… ?",
      "id": "fr5102_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask politely: could you help me? (vous, inversion)",
      "cues": [
        "the bent stem: Pourriez",
        "inversion with a hyphen: Pourriez-vous"
      ],
      "idea_parts": [
        "could you → Pourriez-vous",
        "help me → m'aider ?"
      ],
      "target_answer": "Pourriez-vous m'aider ?",
      "meaning": "Could you help me?",
      "word_bank": [
        "Pourriez-vous",
        "m'aider",
        "voudrais",
        "café",
        "réserver"
      ],
      "explanation": "Pourriez-vous m'aider ? — the politeness lever on the inversion ladder from Topic 7.",
      "diagnosis": {
        "slip": "kept the straight stem pou-",
        "cue": "The stem bends before the conditional: pou- becomes pour-."
      },
      "id": "fr5102_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je voudrais réserver une table",
      "replays": 2,
      "target_answer": "Je voudrais réserver une table",
      "meaning": "I would like to reserve a table",
      "cues": [
        "It means: I would like to reserve a table",
        "The would-form: voudrais + infinitive"
      ],
      "explanation": "Je voudrais réserver une table — the standard opening line of every French reservation.",
      "affirmation": "You wrote the politeness lever doing real work in a real sentence.",
      "id": "fr5102_e5"
    }
  ],
  "summary": {
    "outcome": "Make polite requests with voudrais and pourriez, using the conditional as the softness lever.",
    "use_example": {
      "german": "Pourriez-vous m'aider ?",
      "english": "Could you help me?"
    },
    "takeaway": "The -ais ending is the soft lever: would inside the verb, politeness in the air.",
    "curiosity_teaser": "Up next on Le Pont ([27] il faut): see how Le conditionnel poli leads directly into il faut."
  },
  "twist": {
    "prompt": "One more, no safety net — say: I would like to reserve a table:",
    "target_answer": "Je voudrais réserver une table",
    "word_bank": [
      "Je",
      "voudrais",
      "réserver",
      "une",
      "table",
      "veux"
    ],
    "explanation": "Rebuilding \"Je voudrais réserver une table\" — the would-form plus a plain infinitive."
  }
};

export default lesson;
