import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 602,
  "slug": "k-to-ch-discrimination-drills",
  "title": "K→CH Discrimination Drills",
  "subtitle": "Predict the ch-sound, derive unseen forms, and catch the k-impostors",
  "phase": 1,
  "shift_categories": [
    "k_to_ch"
  ],
  "word_ids": [
    "machen",
    "kochen",
    "brechen",
    "sprechen",
    "suchen",
    "buch",
    "milch",
    "woche",
    "kirche",
    "rauch",
    "acht",
    "recht",
    "kauen",
    "knochen",
    "riechen",
    "koch",
    "weich",
    "süß"
  ],
  "table_word_ids": [
    "kirche",
    "rauch",
    "acht",
    "recht",
    "brechen",
    "machen",
    "kochen",
    "sprechen",
    "suchen",
    "buch",
    "milch",
    "woche",
    "kauen",
    "knochen",
    "riechen",
    "koch",
    "weich",
    "süß",
    "solch",
    "bleich",
    "handwerker",
    "stockwerk"
  ],
  "hook": {
    "title": "The Compass, Then the Impostors",
    "content": "Two skills today. First, prediction: given any German ch-word, place its sound on the vowel compass — back vowel growls, front vowel whispers — before you ever hear it. Second, suspicion: not every German k is waiting to become a ch. Kirche (church), Rauch (smoke), acht (eight), Recht (right) already finished their journey — their ch hides English gh-words (kirk's cousin, reek, eight, right). And Latin loans like Kaffee and Kamera kept their hard k forever. The compass points at sounds; the impostor check points at history.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The gh-Sisterhood",
        "content": "acht/Recht/Nacht/Licht carry English eight/right/night/light — words where English spelled the gh and then stopped pronouncing it. German never stopped. When English speakers 'lost' the gh, they were only finishing a shift German had already made audible."
      }
    ]
  },
  "pattern": {
    "title": "Derive, Then Verify",
    "content": "Derivation drill: make → machen (Ach), cook → kochen (Ach), break → brechen (Ich — front vowel e), book → Buch (Ach), milk → Milch (Ich via l). Impostor check: Kaffee, Kamera, Kind — hard k stays (Latin loans, or k in a safe position). And the finished-shift words: Kirche (church/kirk), Rauch (reek/smoke), acht (eight), recht (right) — their ch is the ghost of an English gh. One root, three costumes: k, ch, and silent gh.",
    "footnotes": [],
    "linguist_note": "The compass has one refinement: ch after consonants l and r takes the Ich-Laut even after back vowels (Milch, Kirche) — the consonant pulls the tongue forward with it."
  },
  "exercises": [
    {
      "id": "l602_e1",
      "type": "shift_select",
      "prompt": "Predict the sound: how does the 'ch' of 'brechen' sound?",
      "options": [
        "Silent, like English gh",
        "Ach-Laut [x] — a throaty growl after a back vowel",
        "Like k",
        "Ich-Laut [ç] — a soft whisper after the front vowel e"
      ],
      "target_answer": "Ich-Laut [ç] — a soft whisper after the front vowel e",
      "meaning": "brechen uses the Ich-Laut",
      "explanation": "Front vowel e pulls the tongue forward: brechen, sprechen, Milch, riechen all whisper — and weich too, its k gone soft with the word for soft."
    },
    {
      "id": "l602_e2",
      "type": "matching_pairs",
      "prompt": "Match the ch-words with their English twins — the silent-gh set, plus two K → CH cousins. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "kd1",
          "english": "eight",
          "german": "acht"
        },
        {
          "id": "kd2",
          "english": "right",
          "german": "Recht"
        },
        {
          "id": "kd3",
          "english": "reek / smoke",
          "german": "Rauch"
        },
        {
          "id": "kd4",
          "english": "kirk / church",
          "german": "Kirche"
        },
        {
          "id": "kd5",
          "english": "to chew",
          "german": "kauen"
        },
        {
          "id": "kd6",
          "english": "bone",
          "german": "Knochen"
        },
        {
          "id": "recall1",
          "german": "Wir können riechen",
          "english": "We can smell"
        },
        {
          "id": "spaced1",
          "german": "Der Kuchen ist weich und süß",
          "english": "The cake is soft and sweet"
        }
      ],
      "target_answer": "acht, Recht, Rauch, Kirche, kauen, Knochen, Wir können riechen, Der Kuchen ist weich und süß",
      "meaning": "eight; right; reek / smoke; kirk / church; to chew; bone; We can smell; The cake is soft and sweet",
      "shift_hint": "K → CH / gh → ch",
      "explanation": "English spelled the guttural gh and silenced it; German spells it ch and still sounds it. kauen is the mirror image: English chew shifted k to ch, German kept the k — the reverse of kirk/Kirche."
    },
    {
      "id": "l602_e3",
      "type": "shift_select",
      "prompt": "Which of these German k-words will NEVER become a ch — and why?",
      "options": [
        "Kaffee — loanwords kept their hard k",
        "Koch — the shift skips cook-words",
        "Kuchen — cake-words are exempt",
        "Küche — ch words reject k"
      ],
      "target_answer": "Kaffee — loanwords kept their hard k",
      "meaning": "Loanwords escape the shift",
      "explanation": "The shift only hit native Germanic words standing in Germany around 500 AD. Kaffee arrived centuries later, k intact."
    },
    {
      "id": "l602_e4",
      "type": "derive",
      "prompt": "Derive unseen: English 'break' → German verb (mind the front vowel):",
      "english_hint": "bre + the whispering ch + en",
      "shift_hint": "K → CH (Ich-Laut)",
      "target_answer": "brechen",
      "meaning": "to break",
      "explanation": "break → brechen: k → Ich-Laut [ç] after front vowel e (the vowel also widened to ei in the English twin)."
    },
    {
      "id": "l602_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The cook finds the cake sweet'",
      "target_answer": "Der Koch findet den Kuchen süß",
      "meaning": "The cook finds the cake sweet",
      "vocab_hints": [
        {
          "word": "den",
          "translation": "the (masculine object)",
          "note": "der Kuchen becomes den Kuchen as the thing found — the him-case arrives properly soon"
        }
      ],
      "word_bank": [
        "den",
        "findet",
        "nach",
        "Kuchen",
        "Küche",
        "mit",
        "Der",
        "Koch",
        "süß"
      ],
      "explanation": "The cook renders his verdict: der Koch findet den Kuchen süß — k softened to ch in his title, and süß keeps its ß from the sibilant shift."
    }
  ],
  "summary": {
    "outcome": "Predict Ach- vs Ich-Laut for any ch-word and identify k-impostors and finished gh-shifts.",
    "use_example": {
      "german": "Der Koch findet den Kuchen süß.",
      "english": "The cook finds the cake sweet."
    },
    "takeaway": "The vowel steers the ch-sound; loanwords keep k; and Kirche, Rauch, acht, Recht are English gh-words still sounding their ghost.",
    "curiosity_teaser": "Next: the stop shift (D → T) — the consonant domino: day becomes Tag, drink becomes trinken."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from K→CH Discrimination Drills (The cook finds the cake sweet):",
    "target_answer": "Der Koch findet den Kuchen süß",
    "word_bank": [
      "Der",
      "heute",
      "findet",
      "Koch",
      "nicht",
      "den",
      "süß",
      "Kuchen"
    ],
    "explanation": "Re-assembling \"Der Koch findet den Kuchen süß\" from scratch locks in the structural pattern of K→CH Discrimination Drills without relying on short-term echo."
  }
};

export default lesson;
