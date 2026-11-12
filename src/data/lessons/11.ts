import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 11,
  "slug": "article-grid-and-ein-family",
  "title": "The Article Grid & the ein-Family",
  "subtitle": "der/the, das/that, dieser/this, mein/mine — one ancient demonstrative system",
  "phase": 2,
  "payoff": {
    "ofLesson": 4,
    "text": "That D is back. der, die and das all begin with the hardened TH of 'the' — the shift you met in topic 4, doing its second job. Every German article is D- plus the pronoun that would replace the noun."
  },
  "shift_categories": [],
  "word_ids": [
    "der",
    "die",
    "das",
    "dieser",
    "mein",
    "kein",
    "haus",
    "zeit",
    "bett",
    "teller",
    "stuhl",
    "fenster",
    "löffel",
    "setzen",
    "sitzen",
    "halten"
  ],
  "table_word_ids": [
    "der",
    "das",
    "dieser",
    "mein",
    "kein",
    "haus",
    "die",
    "zeit",
    "bett",
    "teller",
    "stuhl",
    "fenster",
    "löffel",
    "setzen",
    "sitzen",
    "halten"
  ],
  "hook": {
    "title": "The Is a Demonstrative in Disguise",
    "content": "English speakers feel that German articles are arbitrary. They are not: der, die, das are the same ancient demonstrative word that gave English the — and its cousins that and this. Das ist mein Haus says 'That is mine house', and every word is a twin: das ↔ that, ist ↔ is, mein ↔ mine (the King James Bible still says 'mine eyes'). The ein-family — ein, kein, mein, dein — is one grid with one behavior, and kein is literally 'not one', the same construction as English none.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The That/Das Doublet",
        "content": "Both English that and German das descend from Proto-Germanic *þat — the neuter of the ancient demonstrative. Old English had sē/sēo/þæt ('the/that'); the article and the demonstrative were one word doing two jobs, and German simply never split them apart."
      }
    ]
  },
  "pattern": {
    "title": "The Grid and the Family",
    "content": "Read the grid as one decomposition instead of three memorised words: der = D- + er (he), die = D- + sie (she/they), das = D- + es (it), and dieser = dies- + er for pointing close. The ein-family declines as one word: ein → einen (topic 10's Him-Case), and kein and mein copy it exactly. Before das Haus: das ist mein Haus, ich habe kein Haus. Before der Kaffee as an object: ich trinke keinen Kaffee — the full Him-Case, -en and all. Before die Zeit: ich habe keine Zeit. Every family member marches in step: ein, kein, mein, dein — same endings, same grid, because they are all the same demonstrative doing the same job.",
    "footnotes": [],
    "linguist_note": "mein ↔ mine is exact: Proto-Germanic *mīnaz. English later reduced unstressed mine to my before nouns ('my house') while German kept the full form — the KJV's 'mine eyes have seen' is the older system both languages once shared."
  },
  "exercises": [
    {
      "id": "l11_e1",
      "type": "matching_pairs",
      "prompt": "Match the demonstrative and possessive twins:",
      "matching_pairs": [
        {
          "id": "ag1",
          "english": "this",
          "german": "dieser"
        },
        {
          "id": "ag2",
          "english": "that (neuter)",
          "german": "das"
        },
        {
          "id": "ag3",
          "english": "mine / my",
          "german": "mein"
        },
        {
          "id": "ag4",
          "english": "no / not any",
          "german": "kein"
        },
        {
          "id": "ag5",
          "english": "my bed",
          "german": "mein Bett"
        },
        {
          "id": "ag6",
          "english": "the chair",
          "german": "der Stuhl"
        },
        {
          "id": "ag7",
          "english": "the spoon",
          "german": "der Löffel"
        }
      ],
      "target_answer": "dieser, das, mein, kein, mein Bett, der Stuhl, der Löffel",
      "meaning": "this, that, my/mine, no, my bed, the chair, the spoon",
      "explanation": "One ancient demonstrative system split across two languages — and the room words slot into it: das ist mein Bett, der Stuhl ist neu."
    },
    {
      "id": "l11_e2",
      "type": "shift_select",
      "prompt": "Three pairs share a clue; which pair asks you to switch clues?",
      "options": [
        "two → zwei",
        "ship → Schiff",
        "ape → Affe",
        "ripe → reif"
      ],
      "target_answer": "two → zwei",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Ship, ape and ripe use P → F/FF. Two → zwei uses T → Z."
    },
    {
      "id": "l11_e3",
      "type": "derive",
      "prompt": "Negate the possession: 'Ich habe _____ Zeit' (kein + feminine die Zeit):",
      "english_hint": "kein takes -e for feminine nouns",
      "target_answer": "keine",
      "meaning": "Ich habe keine Zeit = I have no time",
      "explanation": "kein declines like ein: before die Zeit it takes -e. English none is the same 'not one' construction."
    },
    {
      "id": "l11_e4",
      "type": "reverse_cognate",
      "prompt": "What older English possessive is the exact twin of 'mein'?",
      "target_answer": "mine",
      "meaning": "mine (twin of German mein)",
      "explanation": "Both descend from Proto-Germanic *mīnaz. 'Mine eyes' in the KJV is mein's living English relative."
    },
    {
      "id": "l11_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're showing someone around your new room: point at the window and say that is my window",
      "cues": [
        "Every word is a twin: das ↔ that, ist ↔ is, mein ↔ mine",
        "Pointing word first, verb second, then what's yours: Das ist mein Fenster"
      ],
      "target_answer": "Das ist mein Fenster",
      "meaning": "That is my window",
      "word_bank": [
        "Fenster",
        "mein",
        "ist",
        "meine",
        "Das"
      ],
      "explanation": "One sentence, four cognates — the demonstrative system you already spoke in King James English, now pointing at a window."
    }
  ],
  "summary": {
    "outcome": "Use dieser, mein, and kein with correct endings across the ein-family grid.",
    "use_example": {
      "german": "Das ist mein Fenster.",
      "english": "That is my window."
    },
    "takeaway": "der/die/das and the/that/this are one demonstrative system; ein, kein, mein, dein decline as one family.",
    "curiosity_teaser": "Next: the article gym — twenty nouns, three colors: rapid der/die/das reps with every table noun."
  },
  "twist": {
    "prompt": "Same grid, new job — negate the noun: I have no time. (kein declines exactly like ein.)",
    "target_answer": "Ich habe keine Zeit",
    "word_bank": [
      "Zeit",
      "keine",
      "Ich",
      "nicht",
      "kein",
      "habe"
    ],
    "explanation": "Zeit is feminine, so kein wears its feminine dress: keine. nicht is for verbs — nouns get the 'not one' word. You just negated without a not."
  }
};

export default lesson;
