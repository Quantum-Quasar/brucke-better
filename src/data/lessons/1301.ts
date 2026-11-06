import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1301,
  "slug": "w-word-cognate-set",
  "title": "W-Word Cognate Set",
  "subtitle": "All eight W-words matched to their English twins — and the wer≠where trap",
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
    "gehen",
    "katze",
    "hund",
    "kennen",
    "tier",
    "kurz",
    "laut",
    "leise",
    "billig",
    "nie",
    "nichts",
    "niemand"
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
    "gehen",
    "katze",
    "hund",
    "kennen",
    "tier",
    "kurz",
    "laut",
    "leise",
    "billig",
    "nie",
    "nichts",
    "niemand"
  ],
  "hook": {
    "title": "Eight Words, One Ancient Family",
    "content": "Here is the full set, laid out on one table: was (what), wo (where), wer (who), wann (when), wie (how/why), warum (wherefore), wohin (whither), and — for the return trip — woher (whence, 'where-from'). English whittled this family down to a handful of survivors; German kept every branch. Both languages spelled the ancient hw- their own way: English wh-, German w-. Which means every German W-word is your own question word, one letter and one dropped h away.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Missing Eighth Twin",
        "content": "woher (from where?) is the twin of whence — 'where-from'. WOHER kommst du? asks where you are coming FROM, and WOHIN gehst du? asks where you are going TO. whence/whither, woher/wohin — both languages once kept the full four-way compass."
      }
    ]
  },
  "pattern": {
    "title": "The Trap Is Built In",
    "content": "The trap: WER looks like WHERE but asks WHO. WO looks like WHO (or 'woe') but asks WHERE. The twins are honest — wer ↔ who (one dropped h, an a→e vowel drift), wo ↔ where — but the shapes swapped. Then the drift words: wie covers 'how' (though its root is why's — English split one word into how and why), warum is the wherefore twin, wann is when with the hw- intact as w-. Drill the set until the trap disarms itself: wer=who, wo=where, never crossed.",
    "footnotes": [],
    "linguist_note": "All eight descend from the Proto-Indo-European interrogative *kʷi/*kʷo — the same stem that gave Latin qu- words (quid, quo, quando). English who/what/when/where/why/whether/which and German wer/was/wann/wo/welch are one family tree, split across two alphabets."
  },
  "exercises": [
    {
      "id": "l1301_e1",
      "type": "matching_pairs",
      "prompt": "The full set — match each W-word with its twin:",
      "matching_pairs": [
        {
          "id": "ws1",
          "english": "what",
          "german": "was"
        },
        {
          "id": "ws2",
          "english": "when",
          "german": "wann"
        },
        {
          "id": "ws3",
          "english": "why / wherefore",
          "german": "warum"
        },
        {
          "id": "ws4",
          "english": "whither (where to)",
          "german": "wohin"
        },
        {
          "id": "ws5",
          "english": "where is the dog",
          "german": "wo ist der Hund"
        },
        {
          "id": "ws6",
          "english": "who knows the animal",
          "german": "wer kennt das Tier"
        },
        {
          "id": "ws7",
          "english": "how short",
          "german": "wie kurz"
        },
        {
          "id": "ws8",
          "english": "who never comes",
          "german": "wer kommt nie"
        }
      ],
      "target_answer": "was, wann, warum, wohin, wo ist der Hund, wer kennt das Tier, wie kurz, wer kommt nie",
      "meaning": "what, when, why, whither, where is the dog, who knows the animal, how short, who never comes",
      "explanation": "One ancient family: English wh-, German w-, one dropped h between them — and the W-words take any verb or noun you own along: kennen (to know a thing or person) included."
    },
    {
      "id": "l1301_e2",
      "type": "shift_select",
      "prompt": "Trap drill: 'Wer kommt?' — what is being asked?",
      "options": [
        "WHO is coming?",
        "WHY is (he) coming?",
        "WHERE is (he) coming?",
        "WHEN is (he) coming?"
      ],
      "target_answer": "WHO is coming?",
      "meaning": "wer = WHO, never where",
      "explanation": "wer ↔ who: the a→e drift moved the vowel, never the meaning. wo is where; wer is who. And the answer can be nothing at all: Was weißt du? — Nichts."
    },
    {
      "id": "l1301_e3",
      "type": "shift_select",
      "prompt": "Trap drill, remixed: 'Warum ist das Getränk nicht billig?' — what is being asked?",
      "options": [
        "WHERE is the drink not cheap?",
        "WHY is the drink not cheap?",
        "WHO is the drink not cheap?",
        "WHEN is the drink not cheap?"
      ],
      "target_answer": "WHY is the drink not cheap?",
      "meaning": "warum = WHY, the wherefore twin",
      "explanation": "warum ↔ wherefore — 'for what'. The lookalike trap works in both directions: wo looks like who, warum sounds like warm — the meaning lives in the -um."
    },
    {
      "id": "l1301_e4",
      "type": "spoken_turn_reply",
      "prompt": "Answer the question in German:",
      "spoken_question": "Wo ist das Buch?",
      "question_meaning": "Where is the book?",
      "reply_idea": "Reply that the book is here.",
      "cues": [
        "Start with Das Buch...",
        "Put ist in second position, then hier."
      ],
      "word_bank": [
        "Buch",
        "Das",
        "dort",
        "wer",
        "hier",
        "ist"
      ],
      "target_answer": "Das Buch ist hier",
      "meaning": "The book is here",
      "explanation": "Wo asks where; your reply keeps the verb ist in second position: Das Buch ist hier."
    },
    {
      "id": "l1301_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'How loud is the cat?'",
      "target_answer": "Wie laut ist die Katze",
      "meaning": "How loud is the cat?",
      "word_bank": [
        "Wie",
        "Niemand",
        "leise",
        "Katze",
        "laut",
        "ist",
        "die"
      ],
      "explanation": "W-question, verb second, then the subject — and whatever adjectives you own (laut, leise, kurz, billig) can ride in the wie-slot."
    }
  ],
  "summary": {
    "outcome": "Recall all eight W-words with their twins and defeat the wer/wo trap.",
    "use_example": {
      "german": "Wie laut ist die Katze?",
      "english": "How loud is the cat?"
    },
    "takeaway": "The W-words are one family — English wh-, German w- — and the trap is structural: wer=who, wo=where.",
    "curiosity_teaser": "Next: No-do-support Drills — transform statements into questions with the verb flip alone."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from W-Word Cognate Set (How loud is the cat):",
    "target_answer": "Wie laut ist die Katze",
    "word_bank": [
      "heute",
      "nicht",
      "Katze",
      "Wie",
      "die",
      "laut",
      "ist"
    ],
    "explanation": "Re-assembling \"Wie laut ist die Katze\" from scratch locks in the structural pattern of W-Word Cognate Set without relying on short-term echo."
  }
};

export default lesson;
