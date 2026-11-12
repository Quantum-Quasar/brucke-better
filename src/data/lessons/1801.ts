import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1801,
  "slug": "ge-y-ancient-participle",
  "title": "ge- ↔ y-: the Ancient Participle",
  "subtitle": "Participle formation drills — and the yclept/genug etymology box",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "genug",
    "machen",
    "sagen",
    "lernen",
    "wandern",
    "kaufen",
    "tragen",
    "ankommen",
    "buchen",
    "wochenende",
    "sommer",
    "winter"
  ],
  "table_word_ids": [
    "machen",
    "sagen",
    "lernen",
    "wandern",
    "kaufen",
    "genug",
    "tragen",
    "ankommen",
    "buchen",
    "wochenende",
    "sommer",
    "winter",
    "sandale",
    "beide",
    "kunde"
  ],
  "hook": {
    "title": "The Prefix That Survived in One Word",
    "content": "Weak-verb participles are pure assembly: ge- + stem + -t. gesagt. gelernt. gemacht. The formula is so regular it is boring — which is why the etymology is worth the whole lesson: that ge- is the prefix English wore down to y- and then dropped. Yclept ('called'), ywis ('surely'), ybounden — Chaucer's participles are German participles with a y. And one ge- word escaped the purge entirely — enough, whose initial e- IS the old ge-, standing today inside genug's twin. Say genug and you are pronouncing Chaucer's grammar.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The One-Word Museum",
        "content": "genug ← OE ġenōg ← Proto-Germanic *ganōgaz: ge- + *nōgaz 'to reach, attain'. 'Enough' reached the same word through the same route. It is the only everyday English word where the ancient participial prefix survives in place — a one-word museum of the entire system."
      }
    ]
  },
  "pattern": {
    "title": "The Weak-Participle Assembly Line",
    "content": "Feed a regular verb into the line: stem + ge- in front + -t at the back. lernen → gelernt, sagen → gesagt, machen → gemacht, kaufen → gekauft. Vowel? Untouched — that is what makes it weak (regular). Motion verbs ride sein instead of haben and keep the same participle: wandern → (ist) gewandert. The -ieren and ver- verbs keep skipping ge-: studiert, verstanden. And genug is your mnemonic anchor: every ge- you stamp from now on is the same ancient prefix that enough smuggled into English.",
    "footnotes": [],
    "linguist_note": "The ge- zone: only verbs with FIRST-syllable stress take it. Words whose stress moved (ver-, be-, er- verbs; -ieren verbs) reject ge- — the acoustic law from the No-ge- Club now explains the whole map."
  },
  "exercises": [
    {
      "id": "l1801_e1",
      "type": "morpheme_tiles",
      "prompt": "Assembly line: build the participle of 'lernen':",
      "tile_options": [
        "st",
        "lern",
        "t",
        "ge",
        "en"
      ],
      "target_answer": "gelernt",
      "meaning": "learned / studied (participle)",
      "explanation": "ge- + stem + -t: gelernt. Weak participles never touch the vowel."
    },
    {
      "id": "l1801_e2",
      "type": "shift_select",
      "prompt": "Which everyday English word still carries the ancient ge- prefix?",
      "options": [
        "enough (the e- is the old y-/ge-)",
        "against",
        "earlier",
        "between"
      ],
      "target_answer": "enough (the e- is the old y-/ge-)",
      "meaning": "enough ↔ genug — the ge- survivor",
      "explanation": "OE ġenōg → enough: the unstressed y- reduced to e-. Genug is the same word, prefix intact. The weekend file uses the same bracket: Am Wochenende habe ich alles gebucht — buchen (book) took its beech-wood name before it took your reservation."
    },
    {
      "id": "l1801_e3",
      "type": "matching_pairs",
      "prompt": "Match each infinitive with its participle (the last one breaks the -t pattern — a preview). Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "gy1",
          "english": "sagen → ?",
          "german": "gesagt"
        },
        {
          "id": "gy2",
          "english": "kaufen → ?",
          "german": "gekauft"
        },
        {
          "id": "gy3",
          "english": "machen → ?",
          "german": "gemacht"
        },
        {
          "id": "gy4",
          "english": "wandern → ?",
          "german": "gewandert"
        },
        {
          "id": "gy5",
          "english": "tragen → ?",
          "german": "getragen"
        },
        {
          "id": "recall1",
          "german": "Wir können genug sagen",
          "english": "We can say enough"
        },
        {
          "id": "recall2",
          "german": "Wir können morgen ankommen",
          "english": "We can arrive tomorrow"
        },
        {
          "id": "recall2b",
          "german": "Wir können das Haus buchen",
          "english": "We can book the house"
        },
        {
          "id": "recall3",
          "german": "Wir können das Kleid kaufen und tragen",
          "english": "We can buy and wear the dress"
        }
      ],
      "target_answer": "gesagt, gekauft, gemacht, gewandert, getragen, Wir können genug sagen, Wir können morgen ankommen, Wir können das Haus buchen, Wir können das Kleid kaufen und tragen",
      "meaning": "sagen → ?; kaufen → ?; machen → ?; wandern → ?; tragen → ?; We can say enough; We can arrive tomorrow; We can book the house; We can buy and wear the dress",
      "explanation": "ge- + stem + -t for the first four — even the motion verb gewandert, which just switches its auxiliary to sein. getragen sneaks in -en instead of -t: the strong verbs are coming (next lesson)."
    },
    {
      "id": "l1801_e4",
      "type": "shift_select",
      "prompt": "Which auxiliary does 'wandern' take in the Perfekt?",
      "options": [
        "either, freely",
        "sein — motion verbs ride sein: Wir sind gewandert",
        "haben",
        "werden"
      ],
      "target_answer": "sein — motion verbs ride sein: Wir sind gewandert",
      "meaning": "Motion verbs take sein",
      "explanation": "Going somewhere under your own power → sein. Wandern is the textbook case: Wir sind gestern gewandert. Ankommen rides sein too — arrival is motion's finish line."
    },
    {
      "id": "l1801_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"We hiked yesterday\"",
      "target_answer": "Wir sind gestern gewandert",
      "meaning": "We hiked yesterday",
      "word_bank": [
        "gestern",
        "Winter",
        "Wir",
        "sind",
        "gewandert",
        "Sommer"
      ],
      "explanation": "sein opens the bracket for motion, gewandert closes it: 'Wir sind gestern gewandert'.",
      "idea": "We hiked yesterday",
      "idea_parts": [
        "We",
        "hiked yesterday (verb in position 2)"
      ],
      "cues": [
        "Start with \"Wir\" and anchor \"sind\" in position 2.",
        "Close the frame with \"gewandert\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Assemble weak participles at speed and pick haben vs sein by motion.",
    "use_example": {
      "german": "Wir sind gestern gewandert.",
      "english": "We hiked yesterday."
    },
    "takeaway": "ge- + stem + -t builds the weak participle — the same ge- that English kept only inside enough.",
    "curiosity_teaser": "Next: haben or sein? — the choice gym where motion decides the auxiliary."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from ge- ↔ y-: the Ancient Participle (We hiked yesterday):",
    "target_answer": "Wir sind gestern gewandert",
    "word_bank": [
      "sind",
      "gewandert",
      "gestern",
      "Wir",
      "heute",
      "nicht"
    ],
    "explanation": "Re-assembling \"Wir sind gestern gewandert\" from scratch locks in the structural pattern of ge- ↔ y-: the Ancient Participle without relying on short-term echo."
  }
};

export default lesson;
