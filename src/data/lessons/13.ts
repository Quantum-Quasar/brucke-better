import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 13,
  "slug": "asking-questions",
  "title": "Asking Questions",
  "subtitle": "was, wo, wer, wann — pure cognates, verb-first questions, zero do-support",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "was",
    "wo",
    "wer",
    "wann",
    "wie",
    "warum",
    "wohin",
    "kommen",
    "wissen"
  ],
  "table_word_ids": [
    "was",
    "wo",
    "wer",
    "wann",
    "wie",
    "warum",
    "wohin",
    "kommen",
    "wissen",
    "ohr",
    "nein",
    "ernst",
    "kappe",
    "tiger",
    "rezeption",
    "fliehen"
  ],
  "foreshadow": {
    "line": "One warning before you go: there is a little three-letter word that undoes everything you just learned about where the verb sits. You have not met it. It is coming.",
    "resolvedIn": 14
  },
  "hook": {
    "title": "The W-Word Family Reunion",
    "content": "German question words are not vocabulary to memorize — they are your own W-words with the h shaved off. was ↔ what, wo ↔ where, wer ↔ who, wann ↔ when, wohin ↔ whither. English spelled the old hw- as wh; German spelled it w and let the h go. One trap is built into the family: WER asks who and WO asks where — they swapped expectations exactly where English learners least expect. And German asks questions the way Early Modern English did: Kommst du? — 'Knowest thou?' Verb first, no do-support, no machinery.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Romeo Spoke German",
        "interest": true,
        "content": "warum is the structural twin of wherefore — wo (where) + um (for), 'for-what', exactly as wherefore is 'for-what'. Juliet's 'Wherefore art thou Romeo?' asks WHY, not where — and warum asks the same question the same way."
      }
    ]
  },
  "pattern": {
    "title": "The W-Grid and the Verb-First Flip",
    "content": "The grid: was ↔ what, wo ↔ where, wer ↔ who, wann ↔ when, wie ↔ how (its root is why's — English split one ancient word into how and why; German's wie covers the how-job, warum the why-job), wohin ↔ whither (wo + hin, 'to where'). Questions build two ways: W-questions start with the W-word and keep the verb second — Wo ist der Kaffee? Wann kommst du? Yes/no questions flip the verb in front of the subject — Kommst du? Weißt du das? ist er da? No do, no auxiliary, just the ancient flip.\n\nOne Denglisch ladder, read it the German way first: Weißt du das? → Know you that? → Do you know that? The middle line is word-for-word German — verb flipped, no helper — and it was ordinary English not so long ago.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “questions need do.” German has no do in questions and never did — it flips subject and verb, exactly as English still does with can and must. Kann ich kommen? is Can I come? with nothing added at all.",
    "linguist_note": "English used to flip verbs too: 'Knowest thou?', 'Sawest thou him?' The do-support ('Do you know?') only spread in Early Modern English. German questions are the older machinery, still running."
  },
  "exercises": [
    {
      "id": "l13_e1",
      "type": "matching_pairs",
      "prompt": "Match the W-words with their English twins:",
      "matching_pairs": [
        {
          "id": "qw1",
          "english": "what",
          "german": "was"
        },
        {
          "id": "qw2",
          "english": "where",
          "german": "wo"
        },
        {
          "id": "qw3",
          "english": "who",
          "german": "wer"
        },
        {
          "id": "qw4",
          "english": "when",
          "german": "wann"
        }
      ],
      "target_answer": "was, wo, wer, wann",
      "meaning": "what, where, who, when",
      "explanation": "One family: English kept the h of the ancient hw-, German let it go."
    },
    {
      "id": "l13_e2",
      "type": "shift_select",
      "prompt": "Take the pair that belongs to a different connection family.",
      "options": [
        "seek → suchen",
        "week → Woche",
        "good → gut",
        "speak → sprechen"
      ],
      "target_answer": "good → gut",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Speak, seek and week use K → CH. Good → gut uses D → T."
    },
    {
      "id": "l13_e3",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "your friend said they might visit — ask it straight out: are you coming tomorrow?",
      "cues": [
        "Yes/no questions flip the verb in front: kommst, then du",
        "Add the time word at the end: morgen"
      ],
      "target_answer": "Kommst du morgen",
      "meaning": "Are you coming tomorrow?",
      "vocab_hints": [
        {
          "word": "morgen",
          "translation": "tomorrow",
          "note": "twin of 'morrow' — the word hiding inside to-morrow"
        }
      ],
      "word_bank": [
        "kommen",
        "morgen",
        "Kommst",
        "du"
      ],
      "explanation": "The verb takes position 1 and the subject falls in behind — no do, no helper: 'Comest thou tomorrow?' in modern dress."
    },
    {
      "id": "l13_e4d",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Wo wohnst du jetzt",
      "replays": 2,
      "target_answer": "Wo wohnst du jetzt",
      "meaning": "Where do you live now",
      "cues": [
        "The question word opens: Wo",
        "Verb in position 2: wohnst",
        "du comes after the verb"
      ],
      "explanation": "A question word takes position 1, the verb takes position 2, and the subject follows. English uses do for this; German never needed it.",
      "affirmation": "You wrote the word order from the sound alone — wo, verb, subject, and no do anywhere."
    },
    {
      "id": "l13_e5",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Wann kommst du?",
      "natural": "When are you coming?",
      "options": [
        "When you come?",
        "When come you?",
        "When are you coming?"
      ],
      "target_answer": "When come you?",
      "meaning": "When are you coming?",
      "explanation": "'When come you?' is the German way: the verb flips in front of du, no helper needed. Modern English inserted do instead; German kept the ancient flip — 'Knowest thou?' was still good English in Shakespeare's day."
    }
  ],
  "summary": {
    "outcome": "Ask W-questions and verb-first yes/no questions with zero do-support.",
    "use_example": {
      "german": "Wo ist der Kaffee?",
      "english": "Where is the coffee?"
    },
    "takeaway": "The W-words are your W-words with the h shaved off — and German questions flip the verb like 'Knowest thou?'",
    "curiosity_teaser": "Next: the w-word cognate set — all eight w-words matched to their English twins, wer≠where trap included."
  },
  "twist": {
    "prompt": "Same words, but now ask it: 'You know it.' Put the question into German — no do, just the flip.",
    "target_answer": "Weißt du es",
    "word_bank": [
      "Weißt",
      "du",
      "wissen",
      "es"
    ],
    "explanation": "The verb takes position 1 and du falls in behind it — the ancient flip ('Knowest thou?'). The -st ending holds: weißt, like thou knowest."
  }
};

export default lesson;
