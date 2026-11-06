import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 7,
  "slug": "questions-a-la-francaise",
  "title": "Questions à la Française",
  "subtitle": "Three ladders of asking: rising voice, est-ce que, and inversion — plus cognate question words",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "est_ce_que",
    "où",
    "pourquoi",
    "quand",
    "comment",
    "combien",
    "quel",
    "parce_que"
  ],
  "table_word_ids": [
    "est_ce_que",
    "où",
    "pourquoi",
    "quand",
    "comment",
    "combien",
    "quel",
    "parce_que"
  ],
  "hook": {
    "title": "Three Ways to Ask the Exact Same Question",
    "content": "English forces you to haul in 'do/does/did' and scramble word order just to ask a question. French gives you a three-rung register ladder instead: Rung 1 is pure rising voice (Tu veux le café ?). Rung 2 snaps the question-opener est-ce que ('is it that') onto the front without moving a single word (Est-ce que tu veux le café ?). Rung 3 flips verb and pronoun for formal polish (Veux-tu le café ?).",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why pourquoi is English 'wherefore'",
        "content": "When Juliet asks 'Wherefore art thou Romeo?', she is not asking where he is — she is asking WHY ('for what') he bears that name. French pourquoi is built the exact same way: pour ('for') + quoi ('what')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Question Word + est-ce que + Statement",
    "content": "When you add a question word — où ('where', cousin of ubiquitous), quand ('when'), comment ('how'), combien ('how much'), or pourquoi ('why') — you can slot it right in front of est-ce que and keep normal statement word order: Où est-ce que tu vas ? Pourquoi est-ce que tu veux partir ? Quand est-ce que le train arrive ? And to answer pourquoi ('for what'), use parce que ('by that which' = because).",
    "linguist_note": "est-ce que grammaticalized from 'is it [the case] that...', allowing French to preserve strict Subject-Verb-Object order even inside wh-questions.",
    "trap_note": "The shortcut your mind will offer: confusing pourquoi ('why?') with parce que ('because'). Remember: quoi at the end of pourquoi is 'what?' — it always asks the question!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French question word with its meaning and etymological clue:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "where (Latin ubi → ubiquitous)",
          "german": "où"
        },
        {
          "id": "p2",
          "english": "why (for-what)",
          "german": "pourquoi"
        },
        {
          "id": "p3",
          "english": "because (by-that-which)",
          "german": "parce que"
        },
        {
          "id": "p4",
          "english": "when (Latin quando)",
          "german": "quand"
        },
        {
          "id": "p5",
          "english": "how much / how many",
          "german": "combien"
        }
      ],
      "target_answer": "où, pourquoi, parce que, quand, combien",
      "meaning": "where (Latin ubi → ubiquitous), why (for-what), because (by-that-which), when (Latin quando), how much / how many",
      "explanation": "où wears a grave accent to distinguish it from ou ('or'); pourquoi asks and parce que answers.",
      "id": "fr7_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Où est-ce que tu es'?",
      "german": "Où est-ce que tu es",
      "natural": "Where are you?",
      "options": [
        "Where do you be",
        "Where is-it that you are",
        "Where are you?"
      ],
      "target_answer": "Where is-it that you are",
      "meaning": "Literal structure: Where is-it that you are",
      "explanation": "est-ce que is literally 'is-it that', letting tu es stay in statement order.",
      "id": "fr7_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you answer 'Pourquoi tu veux partir ?' ('Why do you want to leave?') with 'Because it is late'?",
      "options": [
        "Pourquoi c'est tard",
        "Est-ce que c'est tard",
        "Parce que c'est tard"
      ],
      "target_answer": "Parce que c'est tard",
      "meaning": "Because it is late",
      "explanation": "Pourquoi asks 'why?'; parce que answers 'because'.",
      "id": "fr7_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you are asking a friend where the café is",
      "cues": [
        "Where → Où (with the grave accent ù)",
        "is → est",
        "the café → le café"
      ],
      "idea_parts": [
        "question word → Où",
        "verb → est",
        "subject → le café"
      ],
      "target_answer": "Où est le café",
      "meaning": "Where is the café?",
      "word_bank": [
        "café",
        "le",
        "Pourquoi",
        "Où",
        "est",
        "la"
      ],
      "explanation": "Short questions with être simply invert: Où est le café ?",
      "diagnosis": {
        "slip": "forgot the accent or word order",
        "cue": "Start with Où + est + le café."
      },
      "id": "fr7_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Pourquoi est-ce que tu veux partir",
      "replays": 2,
      "target_answer": "Pourquoi est-ce que tu veux partir",
      "meaning": "Why do you want to leave?",
      "cues": [
        "Why: Pourquoi",
        "question machine: est-ce que",
        "statement: tu veux partir"
      ],
      "explanation": "Pourquoi + est-ce que lets tu veux partir stay untouched.",
      "affirmation": "You chained Pourquoi and est-ce que without scrambling the verb.",
      "id": "fr7_e5"
    }
  ],
  "summary": {
    "outcome": "Ask questions across all three French registers and pair où, pourquoi, quand, comment, combien with est-ce que.",
    "use_example": {
      "german": "Pourquoi est-ce que tu es ici ? — Parce que je veux te voir.",
      "english": "Why are you here? — Because I want to see you."
    },
    "takeaway": "est-ce que is your universal question adapter: snap it after any question word and keep normal sentence order.",
    "curiosity_teaser": "Up next on Le Pont ([701] Est-ce que Drills): see how Questions à la Française leads directly into Est-ce que Drills."
  },
  "twist": {
    "prompt": "Ungraded — ask 'When do you want to confirm?' using est-ce que:",
    "target_answer": "Quand est-ce que tu veux confirmer",
    "word_bank": [
      "est-ce",
      "Où",
      "confirmer",
      "que",
      "Quand",
      "veux",
      "tu",
      "la"
    ],
    "explanation": "Quand + est-ce que + tu veux confirmer — zero word-order inversion needed."
  },
  "foreshadow": {
    "line": "Having mastered Questions à la Française, look ahead to Topic 8 (The -eur Bridge), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 8
  },
  "payoff": {
    "ofLesson": 6,
    "text": "The foundation from Topic 6 (The -ité & -ance Bridges) now pays off directly inside Questions à la Française: every sentence here builds on that earlier step."
  }
};

export default lesson;
