import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5072,
  "slug": "lesson-5072",
  "title": "Avez-vous déjà vu ?",
  "subtitle": "questions and déjà inside the passé composé — wrap the auxiliary, keep the participle glued",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "est_ce_que",
    "as",
    "avez",
    "vu",
    "compris",
    "fait",
    "déjà",
    "mangé"
  ],
  "table_word_ids": [
    "est_ce_que",
    "as",
    "avez",
    "vu",
    "compris",
    "fait",
    "déjà",
    "mangé"
  ],
  "hook": {
    "title": "The Past, Turned into Questions",
    "content": "Topic 17 built the -é past: j'ai mangé. The branch's first lesson flipped it negative: je n'ai pas mangé. Now ask it: Est-ce que tu as vu le film ? Avez-vous compris ? The question machinery — est-ce que, or just the raised voice — wraps autour of the auxiliary, and déjà loves to ride along.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Three ways to ask one question",
        "content": "Est-ce que tu as vu ? (the scaffold), Tu as vu ? (the raised voice), and inversion As-tu vu ? (the formal ladder from Topic 7). All three wrap autour of as; the participle never moves.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Question the Auxiliary, Not the Participle",
    "content": "Est-ce que tu as vu le film ? — the question frame sits before avez/as, and the participle (vu, compris, mangé) stays glued to its auxiliary at the end. déjà slots inside the pair: tu as déjà vu.",
    "linguist_note": "déjà is des + ja — 'from already' — the same worn-down 'already' English hears in déjà vu, the phrase it borrowed whole.",
    "trap_note": "Keep the pair glued: as vu, avez compris. The participle never walks off alone — flip or question it, and both halves move together."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each past-tense question with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Have you seen it already?",
          "german": "Tu as déjà vu ?"
        },
        {
          "id": "p2",
          "english": "Did you understand?",
          "german": "Est-ce que tu as compris ?"
        },
        {
          "id": "p3",
          "english": "Have you (vous) already eaten?",
          "german": "Vous avez déjà mangé ?"
        },
        {
          "id": "p4",
          "english": "What did you do?",
          "german": "Qu'est-ce que tu as fait ?"
        }
      ],
      "target_answer": "Tu as déjà vu ?, Est-ce que tu as compris ?, Vous avez déjà mangé ?, Qu'est-ce que tu as fait ?",
      "meaning": "Have you seen it already?, Did you understand?, Have you (vous) already eaten?, What did you do?",
      "explanation": "The frame wraps the auxiliary; vu, compris, mangé, fait stay glued to their half of the verb.",
      "id": "fr5072_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Ask politely: 'Have you (vous) already eaten?'",
      "options": [
        "Vous avez déjà mangé ?",
        "Vous êtes déjà mangé ?",
        "Vous avez déjà manger ?"
      ],
      "target_answer": "Vous avez déjà mangé ?",
      "meaning": "Have you (vous) already eaten?",
      "explanation": "Vous avez déjà mangé ? — avoir's avez, the participle mangé, and déjà riding inside the pair.",
      "id": "fr5072_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the little word that means 'already' and loves the passé composé:",
      "english_hint": "English borrowed the phrase déjà vu whole",
      "target_answer": "déjà",
      "meaning": "already",
      "explanation": "déjà — 'already' — slots between the auxiliary and the participle: tu as déjà vu.",
      "id": "fr5072_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend: did you understand? (use est-ce que)",
      "cues": [
        "the scaffold: Est-ce que",
        "the pair: as compris"
      ],
      "idea_parts": [
        "the question frame → Est-ce que",
        "did you understand → tu as compris ?"
      ],
      "target_answer": "Est-ce que tu as compris ?",
      "meaning": "Did you understand?",
      "word_bank": [
        "Est-ce",
        "que",
        "tu",
        "as",
        "compris",
        "vu",
        "fait"
      ],
      "explanation": "Est-ce que tu as compris ? — the scaffold in front, the pair intact behind.",
      "diagnosis": {
        "slip": "separated the auxiliary from its participle",
        "cue": "as and compris travel together — question them, but never split them."
      },
      "id": "fr5072_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Qu'est-ce que tu as fait hier ?",
      "replays": 2,
      "target_answer": "Qu'est-ce que tu as fait hier ?",
      "meaning": "What did you do yesterday?",
      "cues": [
        "It means: What did you do yesterday?",
        "The pair: as fait"
      ],
      "explanation": "Qu'est-ce que tu as fait hier ? — a question word, the scaffold, and the glued pair.",
      "affirmation": "You wrote a full past-tense question without breaking the pair.",
      "id": "fr5072_e5"
    }
  ],
  "summary": {
    "outcome": "Turn passé composé statements into questions with est-ce que, the raised voice, and déjà.",
    "use_example": {
      "german": "Qu'est-ce que tu as fait hier ?",
      "english": "What did you do yesterday?"
    },
    "takeaway": "Wrap the auxiliary, keep the participle glued — and let déjà ride inside the pair.",
    "curiosity_teaser": "Up next on Le Pont ([18] Motion Takes être): see how Avez-vous déjà vu ? leads directly into Motion Takes être."
  },
  "twist": {
    "prompt": "One more, no safety net — ask with est-ce que: did you see it already?",
    "target_answer": "Est-ce que tu as déjà vu ?",
    "word_bank": [
      "Est-ce",
      "que",
      "tu",
      "as",
      "déjà",
      "vu",
      "compris"
    ],
    "explanation": "Rebuilding \"Est-ce que tu as déjà vu ?\" — scaffold, pair, and déjà inside."
  }
};

export default lesson;
