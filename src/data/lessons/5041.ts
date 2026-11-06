import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5041,
  "slug": "tour-of-the-7-strong-verb-classes",
  "title": "Tour of the 7 Strong Verb Classes",
  "subtitle": "Walk every ablaut class with two exemplar verbs — recognize class by vowel melody",
  "phase": 3,
  "shift_categories": [
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "singen",
    "trinken",
    "finden",
    "geben",
    "fahren",
    "schlafen",
    "ziehen",
    "sprechen",
    "kommen",
    "schreiben"
  ],
  "table_word_ids": [
    "singen",
    "trinken",
    "finden",
    "geben",
    "fahren",
    "schlafen",
    "ziehen",
    "sprechen",
    "kommen",
    "schreiben",
    "scheinen",
    "viel",
    "muskel",
    "pille",
    "automat"
  ],
  "hook": {
    "title": "The Hall of Fame",
    "content": "Proto-Germanic sorted its strong verbs into seven classes by vowel melody — and the numbering is still on the wall in every German grammar. You have met members of every class already; this tour hangs them in order. Class I: ei–ei–ie? German'sreiben-family — schreiben, schrieb. Class II: ziehen, zog. Class III: singen, sang, gesungen and finden, fand. Class IV: sprechen, sprach — the -n- verbs. Class V: geben, gab. Class VI: fahren, fuhr. Class VII: schlafen, schlief — the old reduplicating class that survives as a simple vowel change. Two exemplars each, and the hall is yours.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Class VII's Secret",
        "content": "The seventh class was once the REDUPLICATING class — ancients said *lelōb 'they let'. German smoothed it to a vowel change (schlafen, schlief; fallen, fiel) with no consonant doubling. Gothic, the fossil language, still shows the reduplication: fai-falh 'hid'. The hall's oldest room."
      }
    ]
  },
  "pattern": {
    "title": "The Seven Rooms",
    "content": "Room I (ei–ei–ie): schreiben, schrieb, geschrieben ↔ describe, described — the scribe family. Room II (ie–o–o): ziehen, zog, gezogen — the tow family. Room III (i–a–u): singen, sang, gesungen; trinken, trank; finden, fand, gefunden — the biggest room, with English sing/drink/find beside them. Room IV (e–a–o): sprechen, sprach, gesprochen; kommen? no — kommen is its own oddity (kam, gekommen); stehlen (steal — stahl!). Room V (e–a–e): geben, gab, gegeben; nehmen, nahm, genommen — the give/take room. Room VI (a–u–a): fahren, fuhr, gefahren — the fare family. Room VII (ä/au–ie): schlafen, schlief; fallen, fiel — the reduplicating relics. Walk it twice and the melodies stick.",
    "footnotes": [],
    "linguist_note": "The classes are defined by the PIE root syllable's structure (e/o ablaut + following consonant), which is why verbs that look unrelated share melodies: Germanic inherited the room assignments wholesale, and both languages redecorated independently."
  },
  "exercises": [
    {
      "id": "l5041_e1",
      "type": "matching_pairs",
      "prompt": "Match each verb to its class melody:",
      "matching_pairs": [
        {
          "id": "sc1",
          "english": "schreiben (Room I)",
          "german": "schrieb / geschrieben"
        },
        {
          "id": "sc2",
          "english": "ziehen (Room II)",
          "german": "zog / gezogen"
        },
        {
          "id": "sc3",
          "english": "sprechen (Room IV)",
          "german": "sprach / gesprochen"
        },
        {
          "id": "sc4",
          "english": "schlafen (Room VII)",
          "german": "schlief / geschlafen"
        }
      ],
      "target_answer": "schrieb / geschrieben, zog / gezogen, sprach / gesprochen, schlief / geschlafen",
      "meaning": "the four distinctive melodies",
      "explanation": "ei–ie, ie–o–o, e–a–o, and the reduplicating relic — four of the seven rooms on one wall."
    },
    {
      "id": "l5041_e2",
      "type": "shift_select",
      "prompt": "A NEW verb: 'werfen' (to throw) goes 'warf, geworfen'. Which room does it live in?",
      "options": [
        "Room IV — the e–a–o room, with sprechen, sprach, gesprochen",
        "Room VI with fahren (u-past)",
        "No room — it is a weak verb",
        "Room III — the i–a–u room, with singen and trinken"
      ],
      "target_answer": "Room IV — the e–a–o room, with sprechen, sprach, gesprochen",
      "meaning": "werfen follows the e–a–o melody",
      "explanation": "werfen, warf, geworfen — hear the melody and you know the room, even for verbs you have never studied. That is the hall's power."
    },
    {
      "id": "l5041_e3",
      "type": "shift_select",
      "prompt": "Which room holds the REDUPLICATING relic (once *le-lōb-style forms)?",
      "options": [
        "Room V — geben",
        "Room VII — schlafen, schlief; fallen, fiel",
        "Room I — schreiben",
        "Room II — ziehen"
      ],
      "target_answer": "Room VII — schlafen, schlief; fallen, fiel",
      "meaning": "The oldest room in the hall",
      "explanation": "Class VII reduplicated its past in the ancient language; German smoothed it to a vowel change, Gothic kept the doubling."
    },
    {
      "id": "l5041_e4",
      "type": "reverse_cognate",
      "prompt": "Which English verb shares Room VI's melody with 'fahren, fuhr'?",
      "target_answer": "fare",
      "meaning": "fare/fared ↔ fahren/fuhr",
      "explanation": "Same class, same root, same a–u slide — English and German filed it in the same room 2,000 years ago."
    },
    {
      "id": "l5041_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the German sentence for 'We drank water and sang':",
      "target_answer": "Wir haben Wasser getrunken und gesungen",
      "meaning": "We drank water and sang",
      "vocab_hints": [
        {
          "word": "getrunken",
          "translation": "drunk (participle)",
          "note": "Room III: i–a–u — trinken, trank, getrunken"
        }
      ],
      "word_bank": [
        "getrunken",
        "Wir",
        "Wasser",
        "sehr",
        "ein",
        "haben",
        "und",
        "gesungen"
      ],
      "explanation": "Two Room III participles (getrunken, gesungen) chained behind one haben — the hall of fame, live."
    }
  ],
  "summary": {
    "outcome": "Place any strong verb in its class by vowel melody and predict its forms.",
    "use_example": {
      "german": "Wir haben Wasser getrunken und gesungen.",
      "english": "We drank water and sang."
    },
    "takeaway": "Seven rooms, two exemplars each — hear the melody, know the class, predict the paradigm.",
    "curiosity_teaser": "Next: Motion → Accusative, Location → Dative — the two-way preposition drill isle."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We sing here today\"",
    "target_answer": "Wir singen heute hier",
    "word_bank": [
      "nicht",
      "heute",
      "Wir",
      "singen",
      "hier",
      "sehr"
    ],
    "explanation": "Building \"Wir singen heute hier\" from the lesson's core pattern locks in Tour of the 7 Strong Verb Classes."
  }
};

export default lesson;
