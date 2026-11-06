import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2202,
  "slug": "guess-the-gender-game",
  "title": "Guess-the-Gender Game",
  "subtitle": "Unseen words, suffix laws, explanation feedback — the exam of the suffix court",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "wahrnehmung",
    "zeit",
    "straße",
    "butter",
    "zwilling",
    "frau",
    "mann",
    "kind"
  ],
  "table_word_ids": [
    "wahrnehmung",
    "zeit",
    "straße",
    "butter",
    "zwilling",
    "frau",
    "mann",
    "kind",
    "kühl",
    "knopf",
    "zitrone",
    "höflich",
    "körper",
    "rezept",
    "priester"
  ],
  "hook": {
    "title": "Unseen Words, Known Laws",
    "content": "Today's words were deliberately never taught. That is the point. You will meet Zeitung, Gesundheit, Lehrer, Zwilling, Mädchen — words from the wild — and guess their gender from the suffix alone. der? die? das? The laws you own: -ung/-heit/-keit/-schaft → die, -chen/-lein → das, verb+-er → der, plain -e → usually die, -zeug → das. Guess, then read the explanation: every answer teaches the law behind the word. This is the exam where guessing IS the method.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why Guessing Works",
        "content": "German gender is roughly half suffix-predictable, and the suffixes cover exactly the high-frequency vocabulary. Guessing from suffixes beats memorizing articles one by one — and every wrong guess still installs the law."
      }
    ]
  },
  "pattern": {
    "title": "The Exam Walkthrough",
    "content": "die Zeitung — Zeit + ung: the -ung factory. die Gesundheit — gesund + heit. der Lehrer — lehren (to teach) + er: the agent law. der Zwilling — the -ling law (your twin word!). das Mädchen — the -chen law, the famous paradox. die Butter — plain -e, usually feminine. das Feuerzeug — the -zeug law. der Montag? weekdays end in Tag — der by the head-word law. Each guess activates a law; each law covers thousands of words. Score yourself, then re-read the suffix court from the Gender Heuristics lesson.",
    "footnotes": [],
    "linguist_note": "The suffix laws are historical regularities, not dictionary conventions: -ung nouns are feminine because the suffix itself was feminine in Proto-Germanic. The laws predate the dictionary — which is why they still hold."
  },
  "exercises": [
    {
      "id": "l2202_e1",
      "type": "shift_select",
      "prompt": "Unseen word: 'die Zeitung' (newspaper). Which law made it feminine?",
      "options": [
        "-ung is masculine",
        "It is an exception",
        "-ung: Zeit + ung — the abstract-noun factory",
        "Because time is feminine"
      ],
      "target_answer": "-ung: Zeit + ung — the abstract-noun factory",
      "meaning": "die Zeitung — the -ung law at work",
      "explanation": "Zeitung is literally 'a timing' — your taught word Zeit with the feminine -ung stamp."
    },
    {
      "id": "l2202_e2",
      "type": "shift_select",
      "prompt": "Unseen word: 'der Lehrer' (teacher). Which law?",
      "options": [
        "plain -e law",
        "no law — memorize it",
        "the -chen law",
        "verb + -er: the agent law, always der"
      ],
      "target_answer": "verb + -er: the agent law, always der",
      "meaning": "der Lehrer — the agent law",
      "explanation": "lehren (to teach) + -er → der. Same factory as der Sauger (dust-sucker) and der Fernseher (far-seer)."
    },
    {
      "id": "l2202_e3",
      "type": "shift_select",
      "prompt": "Unseen word: 'das Mädchen' (girl). Which law outranks the meaning?",
      "options": [
        "-chen: ALWAYS neuter",
        "-e: usually feminine",
        "-ling: masculine",
        "No law applies"
      ],
      "target_answer": "-chen: ALWAYS neuter",
      "meaning": "das Mädchen — the -chen law",
      "explanation": "The diminutive -chen is the most exceptionless gender law in German — even 'the girl' becomes das."
    },
    {
      "id": "l2202_e4",
      "type": "shift_select",
      "prompt": "Unseen word: 'der Zwilling' (twin). Which law?",
      "options": [
        "plain -e: feminine",
        "-ling: masculine",
        "-chen: neuter",
        "-ung: feminine"
      ],
      "target_answer": "-ling: masculine",
      "meaning": "der Zwilling — the -ling law",
      "explanation": "Your own twin word! The -ling suffix (duckling's German sister) stamps masculine: der Zwilling, der Lehrling (apprentice)."
    },
    {
      "id": "l2202_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Die Zeitung ist gut",
      "meaning": "Die Zeitung ist gut = The newspaper is good",
      "word_bank": [
        "gut",
        "hier",
        "Die",
        "auf",
        "ist",
        "Zeitung"
      ],
      "explanation": "One unseen word, one law, one correct article — the guess-the-gender method paying out.",
      "spoken": "Die Zeitung ist gut",
      "replays": 3,
      "cues": [
        "Meaning: \"Die Zeitung ist gut = The newspaper is good\"",
        "Opens with \"Die Zeitung\" and ends with \"gut\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Guess the gender of unseen nouns from suffix laws and explain every choice.",
    "use_example": {
      "german": "Die Zeitung ist gut.",
      "english": "The newspaper is good."
    },
    "takeaway": "-ung/-heit/-keit/-schaft → die, -chen/-zeug → das, -er/-ling → der — the laws cover the wild.",
    "curiosity_teaser": "Next: plurals & i-mutation — Mann becomes Männer the way man becomes men: umlaut is English's own fossil."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Guess-the-Gender Game (Die Zeitung ist gut = The newspaper is good):",
    "target_answer": "Die Zeitung ist gut",
    "word_bank": [
      "Die",
      "nicht",
      "gut",
      "ist",
      "Zeitung",
      "heute"
    ],
    "explanation": "Re-assembling \"Die Zeitung ist gut\" from scratch locks in the structural pattern of Guess-the-Gender Game without relying on short-term echo."
  }
};

export default lesson;
