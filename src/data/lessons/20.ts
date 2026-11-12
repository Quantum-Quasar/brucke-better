import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 20,
  "slug": "the-dative-case",
  "title": "The Dative Case",
  "subtitle": "The giving case: mir↔me, dir↔thee, ihm↔him — and the methinks fossils",
  "phase": 3,
  "payoff": {
    "ofLesson": 1003,
    "text": "Remember sprig 1003 leaving this open: 'you have not met the case that moves die either.' Here it is. 'To her' is ihr, and when an article has to mean 'to the lady', it is still D- + the pronoun: D- + ihr = der. So die Frau becomes der Frau — not because someone changed a table, but because the case changed which pronoun the D- is holding."
  },
  "shift_categories": [],
  "word_ids": [
    "mir",
    "dir",
    "ihm",
    "mit",
    "bei",
    "helfen",
    "danken",
    "gefallen",
    "geben"
  ],
  "table_word_ids": [
    "mir",
    "dir",
    "ihm",
    "helfen",
    "danken",
    "mit",
    "bei",
    "gefallen",
    "geben",
    "euro",
    "luft",
    "sauer",
    "gewitter",
    "welt",
    "langeweile",
    "fall"
  ],
  "hook": {
    "title": "The Case of the Receiver",
    "content": "The accusative marks what gets acted on. The dative marks who gets the result — the receiver. Ich gebe ihm das Buch: I give the book TO HIM. English once wore this case openly: 'Give it ME' (the archaic British phrasing), 'methinks' ('it thinks TO ME'), 'I give it THEE'. German never stopped: mir (to me), dir (to thee), ihm (to him) — each one a twin of an English fossil. And a whole club of German verbs demands the dative: helfen, danken, gefallen. You do not 'help someone' in German — you help TO someone.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Methinks, the Dative Fossil",
        "content": "Methinks is not 'me thinking' — it is 'it seems TO ME' (OE mē þyncþ), the dative experiencer. German still says the same thing the same way: Mir ist kalt is 'it is cold TO ME'. English buried the dative; German made it a lifestyle."
      }
    ]
  },
  "pattern": {
    "title": "The Receiver's Toolbox",
    "content": "The pronouns first: mir ↔ me (to me), dir ↔ thee (to thee), ihm ↔ him (to him) — the same words with the same ancient jobs. The prepositions that always drag the dative along: aus (out of), bei (by — the exact twin of by), mit (with — the twin of mid, as in midwife), nach (after), seit (since), von (from), zu (to). The dative verbs: helfen (Ich helfe dir), danken (Ich danke dir — you already said it!), gefallen (Es gefällt mir — it falls well to me), geben (Gib mir das Buch). When both objects appear, English word order does the dative's job ('give HIM the book'); German marks it on the words: gib ihm das Buch — ihm = to-him (dative), das Buch = accusative.\n\nOne Denglisch ladder, read it the German way first: Gib ihm das Buch → Give to-him the book → Give him the book. The middle line shows the case on the page: the 'to' lives inside ihm.",
    "footnotes": [],
    "linguist_note": "The dative articles: dem (masculine/neuter), der (feminine), den (+ -n) in the plural. Notice dem keeps the ancient m, while the accusative softened it to n (ihn, wen) — one nasal, two case stories."
  },
  "exercises": [
    {
      "id": "l20_e1",
      "type": "matching_pairs",
      "prompt": "Match the dative pronouns with their English twins. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "dt1",
          "english": "to me / me",
          "german": "mir"
        },
        {
          "id": "dt2",
          "english": "to thee / thee",
          "german": "dir"
        },
        {
          "id": "dt3",
          "english": "to him / him",
          "german": "ihm"
        },
        {
          "id": "dt4",
          "english": "with",
          "german": "mit"
        },
        {
          "id": "recall1",
          "german": "Ich bin schwach",
          "english": "I am weak"
        },
        {
          "id": "recall2",
          "german": "Wir dürfen wünschen",
          "english": "We may wish"
        }
      ],
      "target_answer": "mir, dir, ihm, mit, Ich bin schwach, Wir dürfen wünschen",
      "meaning": "to me / me; to thee / thee; to him / him; with; I am weak; We may wish",
      "explanation": "The dative pronouns are English fossils alive in German: 'give it me', 'I give it thee', 'give it him' — plus mit/mid."
    },
    {
      "id": "l20_e2",
      "type": "shift_select",
      "prompt": "Which pair does not use the clue shared by its three companions?",
      "options": [
        "thirst → Durst",
        "earth → Erde",
        "think → denken",
        "apple → Apfel"
      ],
      "target_answer": "apple → Apfel",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Thirst, earth and think use TH → D. Apple → Apfel uses P → PF."
    },
    {
      "id": "l20_e3",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Gib ihm das Buch.",
      "natural": "Give him the book.",
      "options": [
        "Give the book to he.",
        "Give to him the book.",
        "Give him the book."
      ],
      "target_answer": "Give to him the book.",
      "meaning": "Give him the book.",
      "explanation": "German keeps the 'to' audible inside the dative pronoun — ihm IS 'to him'. English used to say 'give it me'; German never stopped."
    },
    {
      "id": "l20_e4",
      "type": "derive",
      "prompt": "Give it to me: 'Gib _____ das Buch!' (to me):",
      "english_hint": "the archaic 'give it me' — dative of ich",
      "target_answer": "mir",
      "meaning": "Gib mir das Buch = Give me the book",
      "explanation": "The receiver takes the dative: mir — the same case English fossilized in 'give it me'."
    },
    {
      "id": "l20_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "a friend is carrying something heavy: you offer the ancient verb — I help thee",
      "cues": [
        "helfen is a dative verb: the help goes TO someone — ich helfe dir"
      ],
      "target_answer": "Ich helfe dir",
      "meaning": "I help you (to-thee)",
      "word_bank": [
        "dich",
        "hilft",
        "Ich",
        "dir",
        "helfe"
      ],
      "explanation": "helfen + dative: 'Ich helfe dir' — help goes TO the person, as English once said 'I help thee' with a to.",
      "diagnosis": {
        "slip": "the dative verb was fed an accusative",
        "cue": "helfen refuses the Him-Case: ich helfe dir (to-thee), never 'ich helfe dich'. Helping goes TO someone."
      }
    }
  ],
  "summary": {
    "outcome": "Use mir, dir, ihm and the dative verbs helfen, danken, gefallen correctly.",
    "use_example": {
      "german": "Ich helfe dir.",
      "english": "I help you (help to-thee)."
    },
    "takeaway": "The dative marks the receiver: mir/dir/ihm ↔ 'give it me/thee/him' — and helfen, danken, gefallen demand it.",
    "curiosity_teaser": "Next: methinks & Dative Survivors — the English dative fossils mirrored in German, dem/den/dem grid row."
  },
  "twist": {
    "prompt": "Same verb, different receiver: I help thee becomes I help HIM. (The dative pronoun has three faces.)",
    "target_answer": "Ich helfe ihm",
    "word_bank": [
      "dir",
      "helfe",
      "ihm",
      "ihn",
      "Ich"
    ],
    "explanation": "dir → ihm: both dative, both English fossils ('give it thee' → 'give it him'). ihn would be the accusative — helfen refuses it."
  }
};

export default lesson;
