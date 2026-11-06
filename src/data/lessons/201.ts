import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 201,
  "slug": "will-not-will",
  "title": "will ≠ will",
  "subtitle": "English turned 'will' into a future machine — German kept its ancient job: wanting",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "wollen",
    "sollen",
    "können",
    "müssen",
    "mögen",
    "lust",
    "teuer",
    "deutsch",
    "bier",
    "kuchen",
    "wurst"
  ],
  "table_word_ids": [
    "wollen",
    "sollen",
    "können",
    "müssen",
    "mögen",
    "lust",
    "teuer",
    "deutsch",
    "bier",
    "kuchen",
    "wurst",
    "weniger",
    "mikrowelle",
    "auch",
    "münze",
    "dusche"
  ],
  "hook": {
    "title": "The Word English Broke",
    "content": "In ancient Germanic, 'will' meant one thing: desire. English eventually bent it into a future-tense machine — 'it will rain' desires nothing. German never bent it. Ich will ein Bier is a confession of thirst, not a weather forecast. The proof lives inside English itself: free will, will to live, against my will, last will and testament. Every time you use those phrases, you are using German's will. And the twin of soll is shall — thou shalt not kill is, word for word, du sollst nicht töten.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The World as Will",
        "interest": true,
        "content": "Schopenhauer titled his masterwork Die Welt als Wille und Vorstellung (1818) — 'The World as Will and Representation'. German philosophers could pick 'Wille' precisely because the word still meant raw wanting, the meaning English buried under its future tense."
      },
      {
        "marker": "2",
        "title": "Thou Shalt ↔ Du Sollst",
        "content": "Luther's Ten Commandments say Du sollst nicht töten; the King James Bible says Thou shalt not kill. Same verb, same ending, same commandment — preserved in two languages that otherwise let 'shall' and 'soll' drift apart."
      }
    ]
  },
  "pattern": {
    "title": "The Desire Modals: wollen, sollen, mögen",
    "content": "ich will = I want (du willst, er will). ich soll = I am supposed to / shall (du sollst). ich mag = I like — the twin of English may/might, which also once meant 'to have the power to'. And ich möchte is its polite sibling: 'I would like'. Watch the endings: du willst keeps the Shakespearean -st (thou willest), and none of these ever takes zu before the infinitive — the desire travels bare: Ich will schwimmen. Meanwhile möchten softens desire into politeness: Ich möchte einen Kaffee — I would like a coffee.",
    "footnotes": [],
    "linguist_note": "All five modals drop the -t in the 3rd person exactly as English does: he can, he will, he must — never he cans. German: er kann, er will, er muss. A shared fossil of Proto-Germanic."
  },
  "exercises": [
    {
      "id": "l201_e1",
      "type": "shift_select",
      "prompt": "A friend says: 'Ich will ein Bier.' What did she tell you?",
      "options": [
        "She wants a beer — right now",
        "She can drink a beer",
        "She must drink a beer",
        "She will bring a beer someday"
      ],
      "target_answer": "She wants a beer — right now",
      "meaning": "ich will = I want (desire, not future)",
      "explanation": "German kept 'will' in its ancient desire sense — the meaning English preserves only in 'free will' and 'will to live'."
    },
    {
      "id": "l201_e2",
      "type": "matching_pairs",
      "prompt": "Match the desire modals with their English twins:",
      "matching_pairs": [
        {
          "id": "wm1",
          "english": "I want",
          "german": "ich will"
        },
        {
          "id": "wm2",
          "english": "you shall",
          "german": "du sollst"
        },
        {
          "id": "wm3",
          "english": "I like",
          "german": "ich mag"
        },
        {
          "id": "wm4",
          "english": "we must",
          "german": "wir müssen"
        },
        {
          "id": "wm5",
          "english": "I feel like cake",
          "german": "ich habe Lust auf Kuchen"
        },
        {
          "id": "wm6",
          "english": "I want the sausage",
          "german": "ich will die Wurst"
        }
      ],
      "target_answer": "ich will, du sollst, ich mag, wir müssen, ich habe Lust auf Kuchen, ich will die Wurst",
      "meaning": "I want, you shall, I like, we must, I feel like cake, I want the sausage",
      "explanation": "wollen ↔ will, sollen ↔ shall, mögen ↔ may — and die Lust is the desire noun hiding inside English 'lust'."
    },
    {
      "id": "l201_e3",
      "type": "shift_select",
      "prompt": "The beer costs twenty euro. Your verdict: 'zu teuer.' What does 'zu teuer' mean?",
      "options": [
        "on sale",
        "too expensive",
        "well earned",
        "too early"
      ],
      "target_answer": "too expensive",
      "meaning": "zu teuer = too expensive",
      "explanation": "teuer is the true twin of English 'dear' — English d hardened to German t, then 'dear' drifted toward 'beloved' while teuer stayed with price. zu = too."
    },
    {
      "id": "l201_e4",
      "type": "derive",
      "prompt": "Express desire: 'Ich _____ schwimmen' (I want to swim):",
      "english_hint": "ich-form of wollen (want/intend)",
      "target_answer": "will",
      "meaning": "Ich will schwimmen = I want to swim",
      "explanation": "ich will + bare infinitive — no zu, no future reading, just wanting."
    },
    {
      "id": "l201_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "you and your friend are declaring a shared goal: you both want to learn German",
      "cues": [
        "Who wants? → wir, so the modal takes -en: wir wollen",
        "What? → Deutsch",
        "The bare infinitive closes the bracket: lernen goes last"
      ],
      "target_answer": "Wir wollen Deutsch lernen",
      "meaning": "We want to learn German",
      "word_bank": [
        "wollen",
        "lernen",
        "Wir",
        "willst",
        "Deutsch",
        "lernt"
      ],
      "explanation": "wollen agrees with wir (-en) and the bare infinitive closes the bracket — desire travels bare, no zu."
    }
  ],
  "summary": {
    "outcome": "Use ich will / ich möchte for desire and never misread a German 'will' as the future.",
    "use_example": {
      "german": "Ich möchte einen Kaffee, und du willst ein Bier.",
      "english": "I would like a coffee, and you want a beer."
    },
    "takeaway": "German will = want (free will), soll = shall, mag = may — the desire modals English bent or buried.",
    "curiosity_teaser": "Next: the modal bracket out in the wild — how 'Ich kann morgen kommen' packs three facts into one frame."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from will ≠ will (We want to learn German):",
    "target_answer": "Wir wollen Deutsch lernen",
    "word_bank": [
      "lernen",
      "wollen",
      "Deutsch",
      "nicht",
      "Wir",
      "heute"
    ],
    "explanation": "Re-assembling \"Wir wollen Deutsch lernen\" from scratch locks in the structural pattern of will ≠ will without relying on short-term echo."
  }
};

export default lesson;
