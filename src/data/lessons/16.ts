import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 16,
  "slug": "inseparable-prefixes-ver-be-er",
  "title": "Inseparable Prefixes (ver-, be-, er-)",
  "subtitle": "ver- is English for-: vergessen = forget, verlieren = lose, verboten = forbidden",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "vergessen",
    "verlieren",
    "bekommen",
    "erinnern",
    "erklären",
    "verstehen",
    "versuchen",
    "verkaufen"
  ],
  "table_word_ids": [
    "vergessen",
    "verlieren",
    "verstehen",
    "verkaufen",
    "bekommen",
    "erklären",
    "erinnern",
    "versuchen",
    "cousine",
    "bauch",
    "schwein",
    "soße",
    "kollege",
    "eule",
    "name",
    "nadel"
  ],
  "hook": {
    "title": "The Bound Prefixes",
    "content": "Some prefixes never fly. ver-, be-, and er- are welded to their verbs: they take the stress together, never split, and never leave for the sentence end. And the oldest of them, ver-, has been hiding in English all along: it is for-. vergessen is forget — the same for- plus the same get. verlieren is lose — and English's forlorn is literally 'for-lost', the identical construction. verboten is forbidden. When a German verb starts with ver-, an English for- is usually dead ahead.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The No-ge- Law, Second Verse",
        "content": "Inseparable verbs skip ge- in the participle for the same acoustic reason as -ieren verbs: verstanden (not 'geverstanden'), besucht, erklärt. The prefix and the stress rule you learned in the No-ge- Club now cover a second whole verb family."
      }
    ]
  },
  "pattern": {
    "title": "The ver- for- Ledger, and the be-/er- Workshop",
    "content": "The ver- ledger: vergessen ↔ forget, verlieren ↔ lose (forlorn), verstehen ↔ understand (stehen/stand!), verkaufen ↔ sell (kaufen is the twin of cheap — both from the Latin for 'innkeeper/tradesman'), versuchen ↔ to try. The be- workshop: bekommen means GET, not become — 'come by' something; be- converts meaning the way it does in English bespeak. The er- workshop: erklären is 'make clear' (klar ↔ clear — both borrowed from Latin clarus), erinnern is to remember ('inner-ize' a thing). Stress law: the prefix never takes the stress — verGESsen, beKOMmen, erKLÄren. That unstressed prefix is exactly why inseparables reject ge-, just like -ieren verbs.",
    "footnotes": [],
    "linguist_note": "bekommen vs become is the most famous false friend in the app's deck: both are be + come, but English drifted the compound toward 'turn into' while German kept 'come by/receive'. The Review Hub's false-friend deck covers it in full."
  },
  "exercises": [
    {
      "id": "l16_e1",
      "type": "matching_pairs",
      "prompt": "Match the ver- verbs with their for-/English twins. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "iv1",
          "english": "to forget",
          "german": "vergessen"
        },
        {
          "id": "iv2",
          "english": "to lose",
          "german": "verlieren"
        },
        {
          "id": "iv3",
          "english": "to understand",
          "german": "verstehen"
        },
        {
          "id": "iv4",
          "english": "to sell",
          "german": "verkaufen"
        },
        {
          "id": "recall1",
          "german": "Wir müssen aufwachen",
          "english": "We must wake up"
        },
        {
          "id": "recall2",
          "german": "Wir können zurückkommen",
          "english": "We can come back"
        },
        {
          "id": "recall3",
          "german": "Wir können anrufen",
          "english": "We can call"
        },
        {
          "id": "recall4",
          "german": "Wir müssen einkaufen",
          "english": "We must shop"
        },
        {
          "id": "recall5",
          "german": "Wir können abfahren",
          "english": "We can depart"
        },
        {
          "id": "recall6",
          "german": "Wir können bekommen",
          "english": "We can receive"
        }
      ],
      "target_answer": "vergessen, verlieren, verstehen, verkaufen, Wir müssen aufwachen, Wir können zurückkommen, Wir können anrufen, Wir müssen einkaufen, Wir können abfahren, Wir können bekommen",
      "meaning": "to forget; to lose; to understand; to sell; We must wake up; We can come back; We can call; We must shop; We can depart; We can receive",
      "explanation": "ver- is English for-: for-get, for-lorn (lost), for-bidden — and verstehen stands under it all, like understand."
    },
    {
      "id": "l16_e2",
      "type": "shift_select",
      "prompt": "Find the pair that needs another connection, not the shared one.",
      "options": [
        "pepper → Pfeffer",
        "path → Pfad",
        "pound → Pfund",
        "better → besser"
      ],
      "target_answer": "better → besser",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Pepper, path and pound use P → PF. Better → besser uses T → SS."
    },
    {
      "id": "l16_e3",
      "type": "derive",
      "prompt": "Run the be- workshop: 'Ich _____ einen Kaffee' (to get/receive):",
      "english_hint": "be + come — but it means GET",
      "target_answer": "bekomme",
      "meaning": "Ich bekomme einen Kaffee = I am getting a coffee",
      "explanation": "bekommen = 'come by' → receive. Never 'become' — that is the trap the false-friend deck drills."
    },
    {
      "id": "l16_e4",
      "type": "reverse_cognate",
      "prompt": "What archaic English adjective meaning 'abandoned / hopeless' preserves the old participle of 'verlieren'?",
      "target_answer": "forlorn",
      "meaning": "forlorn — 'utterly lost' (for- + lost)",
      "explanation": "forlorn is for- + the same lose-root as verlieren: the identical prefix, the identical verb, fossilized in English."
    },
    {
      "id": "l16_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "someone asked you to bring the thing, and you have to confess: you have forgotten it",
      "cues": [
        "haben opens the Perfekt bracket: ich habe",
        "Inseparable verbs never take ge-: vergessen closes the bracket, prefix welded on"
      ],
      "target_answer": "Ich habe es vergessen",
      "meaning": "I have forgotten it",
      "word_bank": [
        "vergessen",
        "habe",
        "es",
        "Ich",
        "gegessen"
      ],
      "explanation": "Perfekt bracket with an inseparable verb: 'habe' opens, 'vergessen' closes — no ge- anywhere.",
      "diagnosis": {
        "slip": "ge- crashed the inseparable party",
        "cue": "ver- is welded on — vergessen, never 'gevergessen'. The no-ge- law: inseparables and -ieren verbs skip the prefix."
      }
    }
  ],
  "summary": {
    "outcome": "Decode ver-, be-, er- verbs via their English for-/be- twins and form ge--free participles.",
    "use_example": {
      "german": "Ich habe es vergessen.",
      "english": "I have forgotten it."
    },
    "takeaway": "ver- = for- (vergessen/forget, verlieren/forlorn), be- and er- reshape meaning — and inseparables never take ge-.",
    "curiosity_teaser": "Next: the ver ↔ for- cognate set — vergessen is forget, verboten is forbidden: twelve words, one prefix."
  },
  "twist": {
    "prompt": "Wait — you remember after all: negate it. I have forgotten it becomes I have NOT forgotten it.",
    "target_answer": "Ich habe es nicht vergessen",
    "word_bank": [
      "vergessen",
      "nicht",
      "es",
      "kein",
      "habe",
      "Ich"
    ],
    "explanation": "nicht lands before the participle — inside the Perfekt bracket, where the action dies. And vergessen keeps its ge-free, inseparable dignity."
  }
};

export default lesson;
