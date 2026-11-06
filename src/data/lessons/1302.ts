import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1302,
  "slug": "no-do-support-drills",
  "title": "No-do-support Drills",
  "subtitle": "Fifteen questions built with one verb flip — no do, no auxiliary",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "wissen",
    "können",
    "kommen",
    "haben",
    "sein",
    "wann",
    "wo",
    "was"
  ],
  "table_word_ids": [
    "wissen",
    "können",
    "kommen",
    "haben",
    "sein",
    "wann",
    "wo",
    "was",
    "husten",
    "t-shirt",
    "paprika",
    "letzte",
    "krawatte",
    "gerne",
    "angebot",
    "unterschrift"
  ],
  "hook": {
    "title": "The Flip English Forgot",
    "content": "English needs a whole extra verb to ask 'Do you know?'. German needs none: Weißt du? — one flip, subject and verb swap places, question complete. This is not German being fancy; it is the older machinery. Early Modern English still flipped freely — 'Knowest thou?', 'Sawest thou him?' — and only later bolted on do-support. Every German yes/no question is a statement run through a machine English used to own: verb to the front, everything else stays.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Rise of Do",
        "content": "Do-support spread through English questions and negations between 1400 and 1700. 'I know it not' became 'I do not know it'; 'Knowest thou?' became 'Do you know?'. German never ran this upgrade — which is why its questions look archaic and are actually just ancient."
      }
    ]
  },
  "pattern": {
    "title": "Flip Mechanics",
    "content": "Statement: Du weißt es. Question: Weißt du es? Statement: Du kannst kommen. Question: Kannst du kommen? Statement: Er ist da. Question: Ist er da? The rule has one clause: the CONJUGATED verb goes to position 1; everything else holds still. W-questions are the same machine with a W-word taking position 1 and the verb demoted to position 2: Wo ist der Kaffee? Wann kommst du? And with modals, the bracket never opens: Kannst du morgen kommen? — flip the modal, keep the bracket.",
    "footnotes": [],
    "linguist_note": "Intonation-only questions exist in German too — 'Du kommst morgen?' with rising pitch, exactly like English. The verb-first form is the neutral, unmarked way; the rising statement is the surprised way."
  },
  "exercises": [
    {
      "id": "l1302_e1",
      "type": "shift_select",
      "prompt": "Flip it: 'Du weißt es' as a yes/no question:",
      "options": [
        "Wissen du es?",
        "Es weißt du?",
        "Tust du wissen es?",
        "Weißt du es?"
      ],
      "target_answer": "Weißt du es?",
      "meaning": "Do you know it? (Knowest thou it?)",
      "explanation": "Verb to position 1, subject second: Weißt du es? The 'tust du' option is the do-support German never grew."
    },
    {
      "id": "l1302_e2",
      "type": "matching_pairs",
      "prompt": "Match each statement with its flipped question:",
      "matching_pairs": [
        {
          "id": "nd1",
          "english": "Kannst du kommen?",
          "german": "Du kannst kommen"
        },
        {
          "id": "nd2",
          "english": "Ist er da?",
          "german": "Er ist da"
        },
        {
          "id": "nd3",
          "english": "Hast du Zeit?",
          "german": "Du hast Zeit"
        },
        {
          "id": "nd4",
          "english": "Kommst du morgen?",
          "german": "Du kommst morgen"
        }
      ],
      "target_answer": "Du kannst kommen, Er ist da, Du hast Zeit, Du kommst morgen",
      "meaning": "can you come, is he here, do you have time, are you coming tomorrow",
      "explanation": "One flip each: the conjugated verb steps in front of the subject, nothing else moves."
    },
    {
      "id": "l1302_e3",
      "type": "derive",
      "prompt": "Flip: 'du weißt' → question form:",
      "english_hint": "verb first (Knowest thou?)",
      "target_answer": "Weißt du",
      "meaning": "Weißt du? = Do you know?",
      "explanation": "The -st riding in front: Weißt du? — German's Knowest thou?, alive and daily."
    },
    {
      "id": "l1302_e4",
      "type": "literal_gloss",
      "prompt": "How does German build this question word-for-word?",
      "german": "Kommst du morgen mit?",
      "natural": "Are you coming along tomorrow?",
      "options": [
        "Come you tomorrow with?",
        "Are you coming tomorrow with?",
        "You come tomorrow with?",
        "Do you come with tomorrow?"
      ],
      "target_answer": "Come you tomorrow with?",
      "meaning": "Are you coming along tomorrow?",
      "explanation": "German flips the conjugated verb to position 1 ('Kommst du...'), and the separable prefix 'mit' waits at the end of the clause (weißt du das?). [Ref: Tust du morgen kommen?]"
    },
    {
      "id": "l1302_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Do you know where the coffee is?'",
      "target_answer": "Weißt du wo der Kaffee ist",
      "meaning": "Do you know where the coffee is?",
      "vocab_hints": [
        {
          "word": "wo",
          "translation": "where",
          "note": "the embedded question keeps verb-final inside it — der Kaffee ist"
        }
      ],
      "word_bank": [
        "ist",
        "wo",
        "sind",
        "nach",
        "Weißt",
        "der",
        "Kaffee",
        "du"
      ],
      "explanation": "Flip for the main question (Weißt du) — and the embedded wo-clause quietly parks its verb (ist) at the end."
    }
  ],
  "summary": {
    "outcome": "Build yes/no and W-questions with a single verb flip — zero do-support.",
    "use_example": {
      "german": "Weißt du, wo der Kaffee ist?",
      "english": "Do you know where the coffee is?"
    },
    "takeaway": "Verb to position 1 for yes/no questions, position 2 after W-words — the flip English retired and German kept.",
    "curiosity_teaser": "Next: word order & the subordinate clauses — why weil and dass throw the verb to the very end, like Old English did."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from No-do-support Drills (Do you know where the coffee is):",
    "target_answer": "Weißt du wo der Kaffee ist",
    "word_bank": [
      "Kaffee",
      "ist",
      "du",
      "wo",
      "Weißt",
      "nicht",
      "heute",
      "der"
    ],
    "explanation": "Re-assembling \"Weißt du wo der Kaffee ist\" from scratch locks in the structural pattern of No-do-support Drills without relying on short-term echo."
  }
};

export default lesson;
