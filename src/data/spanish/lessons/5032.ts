import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5032,
  "slug": "lesson-5032",
  "title": "False Friends II: The Second Deck",
  "subtitle": "constipado, carpeta, fábrica, pretender, soportar, bizarro — six more costumes to strip",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "trap_constipado",
    "trap_carpeta",
    "trap_fábrica",
    "trap_pretender",
    "trap_soportar",
    "trap_bizarro"
  ],
  "table_word_ids": [
    "trap_constipado",
    "trap_carpeta",
    "trap_fábrica",
    "trap_pretender",
    "trap_soportar",
    "trap_bizarro"
  ],
  "hook": {
    "title": "The Traps Keep Coming",
    "content": "Lesson 5031 walked the first trap deck. Here is the second: constipado is a head cold (not constipated!), carpeta is a folder, fábrica is a factory, pretender is to try for something, soportar is to put up with, and bizarro means brave and gallant. Six costumes, six Spanish meanings underneath.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The cold you should not translate",
        "content": "constipado comes from Latin constipāre ('to press together') — in Spanish it caught a cold and kept it. Telling a pharmacist you are constipado means your nose is blocked, nothing more.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Decoy Spelling, Spanish Truth",
    "content": "Before you trust a familiar-looking word, ask what the Spanish means — not what English would say in its place. The spelling is the costume; the Spanish meaning is the person wearing it.",
    "linguist_note": "bizarro kept its old Italian sense of 'gallant' in Spanish while English bent it toward 'strange' — the same word, two different tempers.",
    "trap_note": "pretender looks like pretending but means to aim at something: pretendo un puesto = 'I'm after the job'. Pretending is fingir."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each Spanish trap word with its REAL meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to have a head cold",
          "german": "estar constipado"
        },
        {
          "id": "p2",
          "english": "folder",
          "german": "carpeta"
        },
        {
          "id": "p3",
          "english": "factory",
          "german": "fábrica"
        },
        {
          "id": "p4",
          "english": "to put up with",
          "german": "soportar"
        },
        {
          "id": "p5",
          "english": "brave, gallant",
          "german": "bizarro"
        }
      ],
      "target_answer": "estar constipado, carpeta, fábrica, soportar, bizarro",
      "meaning": "to have a head cold, folder, factory, to put up with, brave/gallant",
      "explanation": "Five costumes stripped: the Spanish meanings are the only truth the sentence will honour.",
      "id": "es5032_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Your colleague says: 'Estoy constipado.' What is actually wrong?",
      "options": [
        "He has a head cold",
        "He is constipated",
        "He is nervous"
      ],
      "target_answer": "He has a head cold",
      "meaning": "He has a head cold",
      "explanation": "constipado is the common cold — the embarrassing meaning stays English-only.",
      "id": "es5032_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the Spanish word that looks like 'carpet' but names a folder:",
      "english_hint": "an office word, not a floor word",
      "target_answer": "carpeta",
      "meaning": "folder",
      "explanation": "carpeta — the paper lives between its covers, not on the floor.",
      "id": "es5032_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say the factory is modern",
      "cues": [
        "the factory → la fábrica (accent on the á)",
        "modern → moderna"
      ],
      "idea_parts": [
        "the factory → La fábrica",
        "is modern → es moderna"
      ],
      "target_answer": "La fábrica es moderna",
      "meaning": "The factory is modern",
      "word_bank": [
        "La",
        "fábrica",
        "es",
        "moderna",
        "carpeta",
        "buena"
      ],
      "explanation": "La fábrica es moderna — fábrica builds things; fabric is la tela.",
      "diagnosis": {
        "slip": "read fábrica as 'fabric'",
        "cue": "The accent on á marks the factory; cloth would be la tela."
      },
      "id": "es5032_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "No soporto la sopa",
      "replays": 2,
      "target_answer": "No soporto la sopa",
      "meaning": "I can't stand the soup",
      "cues": [
        "It means: I can't stand the soup",
        "soportar = to put up with, never to transport"
      ],
      "explanation": "No soporto la sopa — soportar carries burdens, and apparently this soup is one of them.",
      "affirmation": "You wrote the trap word doing its real job: putting up with things.",
      "id": "es5032_e5"
    }
  ],
  "summary": {
    "outcome": "Sidestep the second trap deck by asking what the Spanish means before trusting the spelling.",
    "use_example": {
      "german": "Estoy constipado, no voy a trabajar",
      "english": "I have a cold, I'm not going to work"
    },
    "takeaway": "A familiar spelling is a costume; ask for the Spanish meaning first.",
    "curiosity_teaser": "Up next ([3] The -ar Engine: Verbs from Nouns): strip -ación whole and turn a thousand nouns into verbs!"
  },
  "twist": {
    "prompt": "One more, from memory — say: the factory is modern:",
    "target_answer": "La fábrica es moderna",
    "word_bank": [
      "La",
      "fábrica",
      "es",
      "moderna",
      "carpeta",
      "buena"
    ],
    "explanation": "Rebuilding \"La fábrica es moderna\" — accent on á, ser for character, nothing pretended."
  }
};

export default lesson;
