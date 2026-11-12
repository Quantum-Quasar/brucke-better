import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2801,
  "slug": "fahren-and-its-dynasty",
  "title": "fahren & its Dynasty",
  "subtitle": "The family tree reading — with the Ablaut forms fuhr and gefahren",
  "phase": 3,
  "shift_categories": [
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "fahren",
    "fahrt",
    "zug",
    "aus",
    "morgen",
    "gestern"
  ],
  "table_word_ids": [
    "fahren",
    "fahrt",
    "zug",
    "gestern",
    "aus",
    "morgen",
    "frühling",
    "sonne",
    "haut",
    "preis",
    "mais",
    "faul",
    "lunge",
    "krankheit",
    "zimt",
    "schießen"
  ],
  "hook": {
    "title": "The Tree, Read Aloud",
    "content": "Yesterday I traveled to Berlin: Ich bin gestern nach Berlin gefahren. The journey was short: Die Fahrt war kurz. I did not drive a car — I rode the train: Ich bin mit dem Zug gefahren. The train departed at eight: Der Zug ist um acht abgefahren. Notice the dynasty working: fahren (the verb), gefahren (its participle), die Fahrt (the journey-noun), abgefahren (departed — the separable prefix rides ON the participle!). One root carries the whole travel story.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Prefixes Ride on Participles",
        "content": "Separable verbs form their participle with the prefix glued back on: abfahren → abgefahren (NOT ge-abfahrt). The ge- goes between prefix and stem: an+ge+kommen, auf+ge+standen. The prefix always wins first position."
      }
    ]
  },
  "pattern": {
    "title": "The Travel Story Machine",
    "content": "The forms: fahren, fuhr, gefahren ↔ fare, fared. The Perfekt with sein: Ich bin gefahren (motion — no object), Ich habe das Auto gefahren (object — haben). The noun: die Fahrt (the journey), die Abfahrt (the departure), die Autofahrt (car ride — the compound law from topic 21 still works). The separable: abfahren, ist abgefahren. Reading plan: any German travel sentence is fahren + a preposition (nach + city, mit + vehicle) + a time word. You can now build all three parts.",
    "footnotes": [],
    "linguist_note": "Ich bin mit dem Zug gefahren — three systems in seven words: sein for motion, mit + dative (the mid-preposition!), and fahren's ablaut in the participle. The dynasty is the curriculum in miniature."
  },
  "exercises": [
    {
      "id": "l2801_e1",
      "type": "matching_pairs",
      "prompt": "The dynasty in Perfekt — match each form with its meaning. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "fd1",
          "english": "I traveled (to Berlin)",
          "german": "Ich bin nach Berlin gefahren"
        },
        {
          "id": "fd2",
          "english": "The train departed",
          "german": "Der Zug ist abgefahren"
        },
        {
          "id": "fd3",
          "english": "The journey was short",
          "german": "Die Fahrt war kurz"
        },
        {
          "id": "fd4",
          "english": "I drove the car",
          "german": "Ich habe das Auto gefahren"
        },
        {
          "id": "recall1",
          "german": "Wir können den Stuhl ziehen",
          "english": "We can pull the chair"
        },
        {
          "id": "recall1b",
          "german": "Wir können aus dem Fenster schauen",
          "english": "We can look out of the window"
        }
      ],
      "target_answer": "Ich bin nach Berlin gefahren, Der Zug ist abgefahren, Die Fahrt war kurz, Ich habe das Auto gefahren, Wir können den Stuhl ziehen, Wir können aus dem Fenster schauen",
      "meaning": "I traveled (to Berlin); The train departed; The journey was short; I drove the car; We can pull the chair; We can look out of the window",
      "explanation": "Motion → sein; object → haben; the prefix rides the participle: ab-ge-fahren."
    },
    {
      "id": "l2801_e2",
      "type": "shift_select",
      "prompt": "Why 'Ich BIN gefahren' but 'Ich HABE das Auto gefahren'?",
      "options": [
        "Motion alone takes sein; a driven object brings haben back",
        "Habe is more polite",
        "fahren takes both randomly",
        "Bin is for trains only"
      ],
      "target_answer": "Motion alone takes sein; a driven object brings haben back",
      "meaning": "The auxiliary flips with transitivity",
      "explanation": "No object → sein (you moved). Object (das Auto) → haben (you did something to it). The choice gym's rule, alive in one verb."
    },
    {
      "id": "l2801_e3",
      "type": "derive",
      "prompt": "Participle check: 'Der Zug ist um acht _____. ' (departed — abfahren):",
      "english_hint": "prefix + ge + fahren",
      "target_answer": "abgefahren",
      "meaning": "departed (abgefahren)",
      "explanation": "ab + ge + fahren: the prefix takes first position, ge- slots inside, the ablaut stays."
    },
    {
      "id": "l2801_e4",
      "type": "reverse_cognate",
      "prompt": "What English word is the twin of 'Fahrt'?",
      "target_answer": "fare",
      "meaning": "fare ↔ Fahrt (fahren's noun)",
      "explanation": "Both from *faraną: English kept 'fare' for payment and 'farewell'; German kept Fahrt for the journey itself."
    },
    {
      "id": "l2801_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Yesterday I traveled to Berlin by train'",
      "target_answer": "Gestern bin ich mit dem Zug nach Berlin gefahren",
      "meaning": "Yesterday I traveled to Berlin by train",
      "word_bank": [
        "aber",
        "dem",
        "nach",
        "bin",
        "Zug",
        "haben",
        "ich",
        "Berlin",
        "mit",
        "gefahren",
        "Gestern"
      ],
      "explanation": "Time (1), verb (2), subject (3), mit + dative, nach + city, participle last — the whole travel machine in one sentence."
    }
  ],
  "summary": {
    "outcome": "Narrate travel with fahren's dynasty: bin gefahren, ist abgefahren, die Fahrt.",
    "use_example": {
      "german": "Gestern bin ich mit dem Zug nach Berlin gefahren.",
      "english": "Yesterday I traveled to Berlin by train."
    },
    "takeaway": "One root runs the railway: fahren/fuhr/gefahren, die Fahrt, abgefahren — motion takes sein, objects bring haben.",
    "curiosity_teaser": "Next: ziehen & nehmen Dynasties — the tow/tug root and the nim root radiate too."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"We drive / fare here today\"",
    "target_answer": "Wir fahren heute hier",
    "word_bank": [
      "fahren",
      "nicht",
      "heute",
      "sehr",
      "hier",
      "Wir"
    ],
    "explanation": "Building \"Wir fahren heute hier\" from the lesson's core pattern locks in fahren & its Dynasty."
  }
};

export default lesson;
