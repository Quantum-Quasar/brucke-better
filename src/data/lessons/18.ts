import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 18,
  "slug": "conversational-past-perfekt",
  "title": "The Conversational Past (Perfekt)",
  "subtitle": "ge- is the old y- (yclept): spoken past with haben/sein + participle at the end",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "haben",
    "sein",
    "genug",
    "machen",
    "sagen",
    "kommen",
    "gehen",
    "essen",
    "ankommen",
    "buchen",
    "hundert",
    "minute",
    "zählen",
    "wochenende",
    "sommer",
    "winter"
  ],
  "table_word_ids": [
    "machen",
    "sagen",
    "kommen",
    "gehen",
    "haben",
    "sein",
    "genug",
    "essen",
    "ankommen",
    "buchen",
    "hundert",
    "minute",
    "zählen",
    "wochenende",
    "sommer",
    "winter"
  ],
  "hook": {
    "title": "The y- You Still Say",
    "content": "Chaucer's English stamped its past participles with y-: yclept ('called'), ybounden, ywis ('certainly'). That y- is German ge- — the same ancient prefix, one sound-shift apart. English threw the prefix away almost everywhere... except one word you said this week: enough. Genug is literally ge- + the root of enough — the everyday word where England's ancient participle prefix still lives. Today you build the spoken past with it: haben or sein in position 2, participle closing the bracket — Ich habe es gemacht, Ich bin gekommen.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "yclept, ywis, genug",
        "content": "Old English ge- weakened to y-/i- in Middle English (yclept = y- + cleopod, 'called'). The prefix then died — but 'enough' (OE ġenōg, ge- + the root) kept its unstressed y- as a plain e-. Genug and enough are the same word, prefix and all."
      }
    ]
  },
  "pattern": {
    "title": "The Bracket Goes to the Past",
    "content": "Weak verbs (the regulars) build the participle ge- + stem + -t: gemacht, gesagt, gespielt, gelernt. Strong verbs (your ablaut family) build ge- + stem + -en with the vowel changed: gekommen, gegangen, getrunken, gegessen. Choose the auxiliary by meaning: have something DONE → haben (Ich habe gegessen); GO somewhere yourself → sein (Ich bin gekommen, Wir sind gegangen). The -ieren verbs from topic 8 keep their no-ge- privilege: studiert, never gestudiert — and so do ver- verbs: verstanden. Everything lands in the bracket you already own: Ich habe gestern Deutsch gelernt.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “every verb builds the past with haben.” Motion and change of state take sein: ich bin gegangen, ich bin gefahren. Ask one question — did I go somewhere, or did I do something to something? Go → sein, do → haben.",
    "linguist_note": "The spoken Perfekt has almost fully replaced the simple past in southern German and colloquial speech — Germans say ich habe gesagt where they once said ich sagte. English did the reverse with 'have said' → 'said'. Two siblings, opposite drifts."
  },
  "exercises": [
    {
      "id": "l18_e1",
      "type": "matching_pairs",
      "prompt": "Match each participle with its English twin:",
      "matching_pairs": [
        {
          "id": "pf1",
          "english": "made",
          "german": "gemacht"
        },
        {
          "id": "pf2",
          "english": "said",
          "german": "gesagt"
        },
        {
          "id": "pf3",
          "english": "come",
          "german": "gekommen"
        },
        {
          "id": "pf4",
          "english": "gone",
          "german": "gegangen"
        },
        {
          "id": "pf5",
          "english": "arrived",
          "german": "angekommen"
        },
        {
          "id": "pf6",
          "english": "booked",
          "german": "gebucht"
        }
      ],
      "target_answer": "gemacht, gesagt, gekommen, gegangen, angekommen, gebucht",
      "meaning": "made, said, come, gone, arrived, booked",
      "explanation": "Weak participles wear ge- + -t; strong ones change the vowel and wear ge- + -en — the same split English shows in made vs come. Separable verbs stack the prefix back on top: an + gekommen."
    },
    {
      "id": "l18_e2",
      "type": "shift_select",
      "prompt": "Which form closes the Perfekt bracket: 'Ich habe es _____' (I have made/done it)?",
      "options": [
        "machen",
        "gemacht",
        "machte",
        "mache"
      ],
      "target_answer": "gemacht",
      "meaning": "Ich habe es gemacht — the ge- participle closes the bracket",
      "explanation": "ge- + stem + -t builds the weak participle: gemacht, gesagt. (It is the same ge- English once wore as y- in yclept.) The calendar loves the bracket too: im Sommer, im Winter, am Wochenende — every calendar word opens a Perfekt story."
    },
    {
      "id": "l18_e3",
      "type": "morpheme_tiles",
      "prompt": "Build the participle of 'zählen' (tale's twin — count your Minuten by the Minute):",
      "tile_options": [
        "zählt",
        "zähl",
        "en",
        "st",
        "ge"
      ],
      "target_answer": "gezählt",
      "meaning": "counted",
      "explanation": "ge- + zähl + t = gezählt: the weak participle formula on the counting verb — zählen is the twin of tale, and tell a tale once meant count a tale."
    },
    {
      "id": "l18_e4d",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ich habe einen Kaffee getrunken",
      "replays": 2,
      "target_answer": "Ich habe einen Kaffee getrunken",
      "meaning": "I drank a coffee / I have drunk a coffee",
      "cues": [
        "habe opens the bracket",
        "The participle is the melody's third note",
        "getrunken sits at the very end"
      ],
      "explanation": "The Perfekt bracket: habe in position 2, the strong participle getrunken at the very end. trinken, trank, getrunken — the third note of the melody closes the door.",
      "affirmation": "You caught the participle at the end of the sentence — that is where German always puts it."
    },
    {
      "id": "l18_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're telling a friend about last night's study session: you learned German yesterday",
      "idea_parts": [
        "who? → ich",
        "the auxiliary → habe in position 2",
        "when? → gestern (yesterday — the y→g twin)",
        "the participle → gelernt, ge- + lern + t, at the very end"
      ],
      "cues": [
        "haben opens, the participle closes: ich habe ... gelernt — ge- + lern + t"
      ],
      "target_answer": "Ich habe gestern Deutsch gelernt",
      "meaning": "I learned German yesterday",
      "word_bank": [
        "Deutsch",
        "gelernt",
        "habe",
        "gestern",
        "bin",
        "Ich"
      ],
      "explanation": "haben opens the bracket, the participle gelernt closes it — the spoken past is your modal frame wearing ge-.",
      "diagnosis": {
        "slip": "the helper was chosen by translation, not by motion",
        "cue": "haben for things you do (gelernt), sein for movement and change (gekommen). Ask: did the body move?"
      }
    }
  ],
  "summary": {
    "outcome": "Form weak and strong participles and tell yesterday's story in the Perfekt bracket.",
    "use_example": {
      "german": "Ich habe gestern Deutsch gelernt.",
      "english": "I learned German yesterday."
    },
    "takeaway": "ge- is the y- of yclept (genug = enough!), haben/sein opens the bracket, the participle closes it.",
    "curiosity_teaser": "Next: Strong Verbs & Ancient Ablaut — sing/sang/sung ↔ singen/sang/gesungen: the vowel melody both languages kept."
  },
  "twist": {
    "prompt": "Different verb, different helper: I learned German yesterday becomes I CAME yesterday. (Movement picks sein.)",
    "target_answer": "Ich bin gestern gekommen",
    "word_bank": [
      "gekommen",
      "gestern",
      "bin",
      "Ich",
      "habe",
      "gelernt"
    ],
    "explanation": "kommen moves the body, so sein opens the bracket and gekommen closes it — the same y-/ge- prefix, a different helper. You just told yesterday's story twice."
  }
};

export default lesson;
