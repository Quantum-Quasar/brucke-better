import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 14,
  "slug": "word-order-subordinate-clauses",
  "title": "Word Order & Subordinate Clauses",
  "subtitle": "Verb-second everywhere — until weil and dass slam the verb to the end",
  "phase": 2,
  "payoff": {
    "ofLesson": 13,
    "text": "Here is the word that undoes it: weil (and its cousin dass). The moment one of them opens a clause, that clause's verb goes to the very end. Everything else about your sentence stays exactly as you learned it in topic 13."
  },
  "shift_categories": [],
  "word_ids": [
    "weil",
    "dass",
    "wissen",
    "können",
    "müssen",
    "morgen",
    "kommen",
    "dunkel",
    "sorge",
    "gleich",
    "meinung",
    "nie",
    "nichts",
    "niemand",
    "katze",
    "hund",
    "kennen",
    "tier"
  ],
  "table_word_ids": [
    "weil",
    "dass",
    "wissen",
    "müssen",
    "kommen",
    "können",
    "morgen",
    "dunkel",
    "sorge",
    "gleich",
    "meinung",
    "nie",
    "nichts",
    "niemand",
    "katze",
    "hund",
    "kennen",
    "tier"
  ],
  "hook": {
    "title": "The Verb Has Two Homes",
    "content": "German main clauses obey one law: the verb lives in position 2. Statement, fronted adverb, whatever — Ich lerne Deutsch. Morgen lerne ich Deutsch. The verb never moves. But walk through a door marked weil or dass and everything changes: the verb is thrown to the very end of the clause — Ich weiß, dass du kommst. Strange? Old English did the same: subordinate clauses parked their verbs late, and German never stopped. weil and dass are not foreign gadgets — dass is literally your that, and weil is your while wearing a new job title.",
    "footnotes": [
      {
        "marker": "1",
        "title": "weil Is while",
        "content": "weil looks like a scholarly loan, but it is a plain descendant of the same Germanic word as English while — Proto-Germanic *hwīlō. It drifted from 'while' to 'because' ('for the while that...' → 'since/as' → 'because') while English kept the time sense."
      }
    ]
  },
  "pattern": {
    "title": "Position 2, Then the Basement",
    "content": "Main clause law: verb in position 2, no matter what fronts it — Morgen komme ich (Tomorrow, I come). Subordinate law: after weil, dass, wenn, the verb goes to the basement, the very last slot — Ich weiß, dass du Deutsch lernst. Ich lerne, weil ich will. Combine with your modal bracket and nothing new appears: Ich kann nicht kommen, weil ich arbeiten muss — a bracket inside a basement; the trapped verb muss waits at the very end.\n\nOne Denglisch ladder, read it the German way first: Ich kann nicht kommen, weil ich arbeiten muss → I can not come, because I must work → I can't come because I have to. Odd in English, exact in German — and Old English agreed with German about where the trapped verb waits.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “weil works like because, so the word order is free.” It is the opposite: weil sends the verb to the very end of its clause. The moment you see weil or dass, that clause's verb goes to the basement. Nothing else about your sentence changes — only the verb's seat moves.",
    "linguist_note": "dass ↔ that is a doublet of das: Proto-Germanic *þat. The spelling difference (das/dass) is a purely German orthographic convention — the two were one word in Old High German (daȥ) as in Old English (þæt)."
  },
  "exercises": [
    {
      "id": "l14_e1",
      "type": "matching_pairs",
      "prompt": "Match each German clause structure with its English meaning:",
      "matching_pairs": [
        {
          "id": "wo1",
          "english": "I know that you are coming",
          "german": "Ich weiß, dass du kommst"
        },
        {
          "id": "wo2",
          "english": "I learn because I want to",
          "german": "Ich lerne, weil ich will"
        },
        {
          "id": "wo3",
          "english": "I know that the dog is big",
          "german": "Ich weiß, dass der Hund groß ist"
        },
        {
          "id": "wo4",
          "english": "I know that you have worry",
          "german": "Ich weiß, dass du Sorge hast"
        },
        {
          "id": "wo5",
          "english": "I know nobody",
          "german": "Ich kenne niemanden"
        },
        {
          "id": "wo6",
          "english": "I know nothing",
          "german": "Ich weiß nichts"
        },
        {
          "id": "wo7",
          "english": "I know your opinion",
          "german": "Ich kenne deine Meinung"
        },
        {
          "id": "wo8",
          "english": "I'm coming right away",
          "german": "Gleich komme ich"
        },
        {
          "id": "wo9",
          "english": "I never come",
          "german": "Ich komme nie"
        }
      ],
      "target_answer": "Ich weiß, dass du kommst, Ich lerne, weil ich will, Ich weiß, dass der Hund groß ist, Ich weiß, dass du Sorge hast, Ich kenne niemanden, Ich weiß nichts, Ich kenne deine Meinung, Gleich komme ich, Ich komme nie",
      "meaning": "I know that you are coming, I learn because I want to, I know that the dog is big, I know that you have worry, I know nobody, I know nothing, I know your opinion, I'm coming right away, I never come",
      "explanation": "Main clauses keep the verb in position 2; dass and weil throw it to the end of their clause. kennen is 'to know a person or thing' — it takes your new nouns along for free."
    },
    {
      "id": "l14_e2",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Ich weiß, dass es dunkel ist.",
      "natural": "I know that it is dark.",
      "options": [
        "I know that it is dark.",
        "I know that it dark is.",
        "I know that is it dark."
      ],
      "target_answer": "I know that it dark is.",
      "meaning": "I know that it is dark.",
      "explanation": "Read it the German way first: 'I know that it dark is.' dass slams the conjugated verb to the end of its clause — Old English's own habit, which German never gave up. The third option over-flips: only the subclause verb waits, never the main one."
    },
    {
      "id": "l14_e3",
      "type": "shift_select",
      "prompt": "Fronting 'Gleich' (right away) in a statement: 'Gleich _____ ich.'",
      "options": [
        "ich komme",
        "komme",
        "kommen",
        "kommst"
      ],
      "target_answer": "komme",
      "meaning": "Gleich komme ich — the verb holds position 2",
      "explanation": "When an adverb takes position 1, the verb stays glued to position 2 and the subject slides to third."
    },
    {
      "id": "l14_e4d",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ich weiß dass du Deutsch lernst",
      "replays": 2,
      "target_answer": "Ich weiß dass du Deutsch lernst",
      "meaning": "I know that you are learning German",
      "cues": [
        "Main clause first: Ich weiß",
        "dass opens the basement",
        "In the basement the verb waits at the very end: lernst"
      ],
      "explanation": "After dass the conjugated verb sinks to the very end. Two clauses, one architecture: weiß holds position 2 in the first, lernst waits at the door of the second.",
      "affirmation": "You heard the basement — the verb at the very end is the sound of a dass-clause."
    },
    {
      "id": "l14_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're reporting on the neighborhood's most punctual animal — you know one thing for sure: the cat is coming. Say it with that.",
      "cues": [
        "Main clause first: Ich weiß — verb in position 2",
        "dass opens the basement: die Katze (the cat, feminine), and kommt waits at the very end"
      ],
      "target_answer": "Ich weiß dass die Katze kommt",
      "meaning": "I know that the cat is coming",
      "vocab_hints": [
        {
          "word": "dass",
          "translation": "that (conjunction)",
          "note": "the exact twin of English that — and it sends the verb to the end"
        },
        {
          "word": "die",
          "translation": "the (feminine)",
          "note": "die Katze — feminine flag, unchanged in the accusative"
        }
      ],
      "word_bank": [
        "weiß",
        "Katze",
        "Ich",
        "die",
        "kommen",
        "kommt",
        "lernt",
        "dass"
      ],
      "explanation": "Main clause verb (weiß) in position 2; after dass, the subclause verb (kommt) waits in the basement — Old English's own habit.",
      "diagnosis": {
        "slip": "the subclause verb stayed upstairs",
        "cue": "dass slams the conjugated verb to the end of its clause — die Katze kommt, with kommt last. The basement is the law."
      }
    }
  ],
  "summary": {
    "outcome": "Build verb-second main clauses and verb-final weil/dass subclauses.",
    "use_example": {
      "german": "Ich weiß, dass die Katze kommt.",
      "english": "I know that the cat is coming."
    },
    "takeaway": "Verb in position 2 in main clauses; after weil and dass it waits in the basement — Old English's own habit.",
    "curiosity_teaser": "Next: the verb-second bootcamp — front adverbs and objects while the verb stays glued to position 2."
  },
  "twist": {
    "prompt": "Basement check: she knows one thing about you — you like the animal. Fold it under dass: she knows that I like the animal.",
    "target_answer": "Sie weiß dass ich das Tier mag",
    "word_bank": [
      "Tier",
      "kommst",
      "mag",
      "Sie",
      "das",
      "ich",
      "weiß",
      "dass"
    ],
    "explanation": "Two clauses, two laws: weiß holds position 2 in the main clause; after dass, mag sinks to the basement's last slot. The person changed — the architecture didn't."
  }
};

export default lesson;
