import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1103,
  "slug": "possessive-ladders",
  "title": "Possessive Ladders",
  "subtitle": "mein, dein, sein, ihr across the cases — with the KJV mine/thine rule",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mein",
    "dein",
    "haus",
    "zeit",
    "kind",
    "buch",
    "getränk",
    "tasse",
    "bett",
    "teller",
    "insel",
    "nebel",
    "baum"
  ],
  "table_word_ids": [
    "mein",
    "dein",
    "haus",
    "zeit",
    "kind",
    "buch",
    "getränk",
    "tasse",
    "bett",
    "teller",
    "insel",
    "nebel",
    "baum",
    "sehr",
    "polnisch",
    "essig"
  ],
  "hook": {
    "title": "Mine, Thine, and the Ladder",
    "content": "English ran a rule German still keeps: mine before vowels, my before consonants — 'mine eyes' but 'my house'. German never simplified: mein Haus, but meine Zeit, meinen Kaffee — the possessive declines like ein, every time. And the ladder climbs: mein (my), dein (thy — the exact thine-twin with th→d), sein (his), ihr (her), and the formal Ihr (your, capital — the Sie-companion). Each rung declines identically, so learn one ladder and you own them all.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The KJV Rule Is the German Rule",
        "content": "'Mine eyes have seen' is not archaic decoration — it is the older Germanic system: full form before vowels, reduced before consonants. English kept the full form only before vowels (mine, thine) and then only poetically; German keeps the full declining form everywhere."
      }
    ]
  },
  "pattern": {
    "title": "Climb the Ladder",
    "content": "Rung one — neuter/masculine subjects: mein Haus, dein Haus, sein Haus, ihr Haus (no ending — the ein-family bare form). Rung two — feminine: meine Zeit, deine Zeit, seine Zeit, ihre Zeit (-e, like eine). Rung three — masculine accusative (the Him-Case!): meinen Kaffee, deinen Kaffee, seinen Kaffee, ihren Kaffee (-en, like einen). Rung four — formal: Ihr Haus, Ihre Zeit (capital I, same endings, Sie's twin). The endings never change across the ladder — only the rung does. Und du? Dein Kaffee ist fertig — your coffee is ready, thine, mit thine-umlaut alive.",
    "footnotes": [],
    "linguist_note": "dein ↔ thine is a perfect double: Proto-Germanic *þīnaz gave English thine (kept th) and German dein (hardened th → d). The possessive ladder is the T–V distinction with endings."
  },
  "exercises": [
    {
      "id": "l1103_e1",
      "type": "matching_pairs",
      "prompt": "Match the ladder rungs with their English twins:",
      "matching_pairs": [
        {
          "id": "pl1",
          "english": "my / mine",
          "german": "mein"
        },
        {
          "id": "pl2",
          "english": "thy / thine",
          "german": "dein"
        },
        {
          "id": "pl3",
          "english": "his",
          "german": "sein"
        },
        {
          "id": "pl4",
          "english": "her",
          "german": "ihr"
        },
        {
          "id": "pl5",
          "english": "my bed",
          "german": "mein Bett"
        },
        {
          "id": "pl6",
          "english": "my plate",
          "german": "mein Teller"
        }
      ],
      "target_answer": "mein, dein, sein, ihr, mein Bett, mein Teller",
      "meaning": "my, thy, his, her, my bed, my plate",
      "explanation": "One ladder, four rungs — and dein is literally thine with the dental hardening. The bare rung (no ending) takes the room words with it: mein Bett, mein Teller."
    },
    {
      "id": "l1103_e2",
      "type": "shift_select",
      "prompt": "Feminine rung: 'Ich habe _____ Tasse.' (my — die Tasse):",
      "options": [
        "mein",
        "meiner",
        "meine",
        "meinen"
      ],
      "target_answer": "meine",
      "meaning": "Ich habe meine Tasse = I have my cup",
      "explanation": "Feminine objects take -e, exactly like eine: meine Tasse, meine Insel — while der Baum and der Nebel would wait for the Him-Case (deinen Baum)."
    },
    {
      "id": "l1103_e3",
      "type": "shift_select",
      "prompt": "Him-Case rung: 'Ich trinke _____ Kaffee.' (thy — masculine object):",
      "options": [
        "deiner",
        "dein",
        "deine",
        "deinen"
      ],
      "target_answer": "deinen",
      "meaning": "Ich trinke deinen Kaffee = I drink thy coffee",
      "explanation": "dein copies ein all the way: masculine accusative -en — the Him-Case on the ladder."
    },
    {
      "id": "l1103_e4",
      "type": "reverse_cognate",
      "prompt": "What archaic English possessive (the -n form, like mine) is the twin of 'dein'?",
      "target_answer": "thine",
      "meaning": "thine ↔ dein (th → d)",
      "explanation": "*þīnaz split into thine (English, th kept) and dein (German, th hardened). The KJV's thine is German's daily bread."
    },
    {
      "id": "l1103_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'That is thy drink' (the German way)",
      "target_answer": "Das ist dein Getränk",
      "meaning": "Das ist dein Getränk = That is thy drink",
      "word_bank": [
        "Das",
        "für",
        "Tasse",
        "Getränk",
        "dein",
        "ist",
        "morgen"
      ],
      "explanation": "Getränk is neuter, so dein wears the bare form — no ending. das/that, ist/is, dein/thine — and the drink-word is built on trinken (drink ↔ trinken, d → t)."
    }
  ],
  "summary": {
    "outcome": "Decline mein, dein, sein, ihr through all rungs of the ein-family ladder.",
    "use_example": {
      "german": "Das ist dein Getränk.",
      "english": "That is thy drink."
    },
    "takeaway": "The possessives climb one ladder with ein-endings: -∅, -e, -en — and dein is thine, th hardened to d.",
    "curiosity_teaser": "Next: the nicht Position Map — where exactly the no-thing lands in the sentence."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Possessive Ladders (Das ist dein Getränk = That is thy drink):",
    "target_answer": "Das ist dein Getränk",
    "word_bank": [
      "Das",
      "ist",
      "heute",
      "dein",
      "nicht",
      "Getränk"
    ],
    "explanation": "Re-assembling \"Das ist dein Getränk\" from scratch locks in the structural pattern of Possessive Ladders without relying on short-term echo."
  }
};

export default lesson;
