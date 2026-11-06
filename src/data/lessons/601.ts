import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 601,
  "slug": "kitchen-and-book-set",
  "title": "Kitchen & Book Set",
  "subtitle": "Küche, Buch, Milch, suchen, sprechen — and the seek/beseech proof",
  "phase": 1,
  "shift_categories": [
    "k_to_ch"
  ],
  "word_ids": [
    "küche",
    "buch",
    "milch",
    "suchen",
    "sprechen",
    "kochen",
    "woche",
    "machen",
    "knochen",
    "riechen",
    "koch",
    "weich",
    "zunge",
    "süß"
  ],
  "table_word_ids": [
    "küche",
    "buch",
    "milch",
    "suchen",
    "sprechen",
    "kochen",
    "woche",
    "machen",
    "knochen",
    "riechen",
    "koch",
    "weich",
    "zunge",
    "süß",
    "welch",
    "mittwoch"
  ],
  "hook": {
    "title": "English Did It Too — Twice",
    "content": "English will swear it never softened a k into a ch. Then you catch it in the act — inside its own noun-verb pairs. Seek became beseech (and German says suchen). Speak became speech (and German says sprechen). English performed the velar shift exactly once per pair, keeping the k-version as the everyday verb and the ch-version as the fancy one. German performed it everywhere: Küche (kitchen), Buch (book), Milch (milk), Koch (cook). Your kitchen is a museum of both outcomes.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Kirk and Kirche",
        "content": "Both English kirk (still the word for 'church' in Scotland) and German Kirche descend from Greek kyriakon ('the Lord's house'). Scottish English kept the k; German melted it to ch — the same word on two sides of one shift."
      }
    ]
  },
  "pattern": {
    "title": "The Household CH Set",
    "content": "cook → kochen, kitchen → Küche, book → Buch, milk → Milch, week → Woche, seek → suchen, speak → sprechen, break → brechen. The vowel compass still steers the sound: after back vowels the throat growls (kochen, Buch, Woche — Ach-Laut), after front vowels and l it whispers (Küche, Milch, sprechen — Ich-Laut). English even kept the whisper: the ch of speech and beseech is the same soft sound German writes in sprechen and suchen.",
    "footnotes": [],
    "linguist_note": "Buch and book both lengthened their vowel and lost the k in German only: book's k stayed because English never ran the shift; Buch's k became the Ach-Laut [x] after the back vowel u."
  },
  "exercises": [
    {
      "id": "l601_e1",
      "type": "matching_pairs",
      "prompt": "Match the household words through the K → CH lens:",
      "matching_pairs": [
        {
          "id": "kb1",
          "english": "milk",
          "german": "Milch"
        },
        {
          "id": "kb2",
          "english": "book",
          "german": "Buch"
        },
        {
          "id": "kb3",
          "english": "to seek",
          "german": "suchen"
        },
        {
          "id": "kb4",
          "english": "to speak",
          "german": "sprechen"
        },
        {
          "id": "kb5",
          "english": "bone (twin: knuckle)",
          "german": "Knochen"
        },
        {
          "id": "kb6",
          "english": "to smell",
          "german": "riechen"
        },
        {
          "id": "kb7",
          "english": "cook (the person)",
          "german": "Koch"
        }
      ],
      "target_answer": "Milch, Buch, suchen, sprechen, Knochen, riechen, Koch",
      "meaning": "milk, book, to seek, to speak, bone, to smell, cook",
      "shift_hint": "K → CH",
      "explanation": "English softened the k in beseech and speech; German softened it in every one of these words — the cook's own title, Koch, wears the shift on its face."
    },
    {
      "id": "l601_e2",
      "type": "shift_select",
      "prompt": "Why does 'Buch' growl (Ach-Laut) but 'Milch' whispers (Ich-Laut)?",
      "options": [
        "Buch is older than Milch",
        "Milch is a French loanword",
        "The two sounds are interchangeable",
        "The vowel decides: back vowel u → Ach-Laut, front vowel i → Ich-Laut"
      ],
      "target_answer": "The vowel decides: back vowel u → Ach-Laut, front vowel i → Ich-Laut",
      "meaning": "The vowel compass of the German ch",
      "explanation": "a, o, u pull the tongue back (Buch, kochen, Woche); e, i, ä, ö, ü and l/r whisper forward (Milch, sprechen, Küche) — weich whispers too: k went soft, and the word for soft went with it."
    },
    {
      "id": "l601_e3",
      "type": "derive",
      "prompt": "Apply the shift: English 'week' → German:",
      "english_hint": "week → w + ech",
      "shift_hint": "K → CH",
      "target_answer": "Woche",
      "meaning": "die Woche — the week",
      "explanation": "week → Woche: k softened to ch after the back vowel o (with the usual vowel alignment)."
    },
    {
      "id": "l601_e4",
      "type": "reverse_cognate",
      "prompt": "What English verb pair proves English also ran k → ch — seek became...?",
      "target_answer": "beseech",
      "meaning": "beseech (the ch-form of seek)",
      "explanation": "seek/beseech is English's own k→ch pair — and beseech's vowel matches suchen exactly."
    },
    {
      "id": "l601_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"The tongue finds the cake sweet\"",
      "target_answer": "Die Zunge findet den Kuchen süß",
      "meaning": "The tongue finds the cake sweet",
      "vocab_hints": [
        {
          "word": "den",
          "translation": "the (masculine object)",
          "note": "der Kuchen becomes den Kuchen when it is what's found — the him-case you will meet properly soon"
        }
      ],
      "word_bank": [
        "findet",
        "süß",
        "Zunge",
        "Kuchen",
        "Die",
        "Küche",
        "den",
        "dem",
        "du"
      ],
      "explanation": "finden takes the object straight on: die Zunge findet den Kuchen süß — the tongue renders its verdict, and every ch in the kitchen whispers.",
      "idea": "The tongue finds the cake sweet",
      "idea_parts": [
        "The tongue finds",
        "the cake sweet (verb in position 2)"
      ],
      "cues": [
        "Start with \"Die\" and anchor \"Zunge\" in position 2.",
        "Close the frame with \"süß\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Use the household CH set in a real sentence and steer Ach- vs Ich-Laut by vowel.",
    "use_example": {
      "german": "Die Zunge findet den Kuchen süß.",
      "english": "The tongue finds the cake sweet."
    },
    "takeaway": "Küche, Buch, Milch, suchen, sprechen — the kitchen set proves the velar shift, and English's seek/beseech proves English ran it too.",
    "curiosity_teaser": "Next: K→CH discrimination — predict the ch-sound of unseen words and catch the k-impostors."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Kitchen & Book Set (The tongue finds the cake sweet):",
    "target_answer": "Die Zunge findet den Kuchen süß",
    "word_bank": [
      "Zunge",
      "süß",
      "heute",
      "Die",
      "findet",
      "den",
      "Kuchen",
      "nicht"
    ],
    "explanation": "Re-assembling \"Die Zunge findet den Kuchen süß\" from scratch locks in the structural pattern of Kitchen & Book Set without relying on short-term echo."
  }
};

export default lesson;
