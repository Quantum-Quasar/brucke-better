import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 302,
  "slug": "p-to-f-discrimination-drills",
  "title": "P→F Discrimination Drills",
  "subtitle": "Which f-words are true p-shifts — and which are ancient f impostors?",
  "phase": 1,
  "shift_categories": [
    "p_to_pf_f"
  ],
  "word_ids": [
    "hoffen",
    "helfen",
    "schlafen",
    "schiff",
    "affe",
    "reif",
    "scharf",
    "greifen",
    "treffen",
    "stumpf",
    "pflug",
    "pflanze",
    "pfirsich"
  ],
  "table_word_ids": [
    "hoffen",
    "helfen",
    "schlafen",
    "reif",
    "scharf",
    "greifen",
    "schiff",
    "affe",
    "treffen",
    "stumpf",
    "pflug",
    "pflanze",
    "pfirsich",
    "irgendwo",
    "geschäft",
    "pflaster"
  ],
  "hook": {
    "title": "The F Police",
    "content": "Not every German f descends from an English p. Most do — hoffen, helfen, Schiff, Affe, reif — but German also has honest, ancient f-words that were never anything else: Flug (flight) and fressen. The skill you build today is the customs check: when you meet a German f-word, ask whether trading its f for a p produces an English word. hoffen → hope? Stamp it through. Flug → 'plug'? No — Flug is native Germanic f, kin to fly and flight, which also start with f.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Two F's, Two Ages",
        "content": "Proto-Germanic already owned an f (from an even older PIE p — Grimm's Law, thousands of years before the High German Shift). fly/flight/Flug carry that ancient f. The High German Shift (500–700 AD) is a second, younger wave that turned remaining p's into f's and pf's."
      }
    ]
  },
  "pattern": {
    "title": "The Customs Check: Swap f for p",
    "content": "Run the swap test: hoffen → hoppen? hope! helfen → help! schlafen — the schl- cluster hides 'sleep' with p → f: sleep → schlafen. Schiff → skipper's Schiff: ship (and a ship-master is still a skipper in English). Affe → ape. reif → ripe. scharf → sharp. greifen → grip. Now the impostors: Flug (fly/flight), frei (free), Fisch (fish), Feuer (fire) — no p hides inside these; their f is the ancient Germanic one English shares. Impostors are cognates too — just not students of this shift.",
    "footnotes": [],
    "linguist_note": "The swap test has a third outcome: stumpf (stump/blunt) shows final p → pf, and treffen pairs the P→F shift with D → T (English dræpan, 'to strike' — the same root as drape). Mixed-shift words are the exception, not the rule."
  },
  "exercises": [
    {
      "id": "l302_e1",
      "type": "matching_pairs",
      "prompt": "Pass the customs check — match each German f-word to its English p-twin. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "pd1",
          "english": "hope",
          "german": "hoffen"
        },
        {
          "id": "pd2",
          "english": "help",
          "german": "helfen"
        },
        {
          "id": "pd3",
          "english": "sharp",
          "german": "scharf"
        },
        {
          "id": "pd4",
          "english": "grip",
          "german": "greifen"
        },
        {
          "id": "pd5",
          "english": "plant",
          "german": "Pflanze"
        },
        {
          "id": "pd6",
          "english": "peach",
          "german": "Pfirsich"
        },
        {
          "id": "recall1",
          "german": "Der Pfeffer ist scharf",
          "english": "The pepper is hot (spicy)"
        },
        {
          "id": "recall2",
          "german": "der Affe",
          "english": "the ape"
        }
      ],
      "target_answer": "hoffen, helfen, scharf, greifen, Pflanze, Pfirsich, Der Pfeffer ist scharf, der Affe",
      "meaning": "hope; help; sharp; grip; plant; peach; The pepper is hot (spicy); the ape",
      "shift_hint": "P → F/FF",
      "explanation": "Swapping f for p exposes the English twin hiding in each German word — and Pflanze does the double shift: p → pf up front, t → z at the back."
    },
    {
      "id": "l302_e2",
      "type": "shift_select",
      "prompt": "German 'Flug' (flight) — is its f a product of the P → F shift?",
      "options": [
        "Flug has no English cognate at all",
        "Yes — but only in northern Germany",
        "Yes — Flug is 'plug' with the p shifted",
        "No — Flug is an ancient f-word, kin to English fly and flight"
      ],
      "target_answer": "No — Flug is an ancient f-word, kin to English fly and flight",
      "meaning": "Not every f is a shifted p — some f's are ancestral",
      "explanation": "Flug and flight share the older Germanic f. The p → f shift is a younger wave; it only hit words that still had a p."
    },
    {
      "id": "l302_e3",
      "type": "shift_select",
      "prompt": "Which German word is the true p-shift twin of English 'sleep'?",
      "options": [
        "schlafen",
        "schlagen",
        "schreiben",
        "schneiden"
      ],
      "target_answer": "schlafen",
      "meaning": "to sleep (p → f)",
      "shift_hint": "P → F",
      "explanation": "sleep → schlafen: the sl- cluster became schl- and p became f. The other three verbs have no p inside."
    },
    {
      "id": "l302_e4",
      "type": "reverse_cognate",
      "prompt": "Swap the f back: what English verb is the twin of 'treffen' (to meet/strike)?",
      "english_hint": "d + r + the p-word",
      "target_answer": "drape",
      "meaning": "to drape / strike (root of treffen)",
      "explanation": "treffen is a double-shift word: English dræpan 'to strike' → d → t and p → ff. Modern English kept the root in drape."
    },
    {
      "id": "l302_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "it's late and your friend is still up, so you tell her: I hope you sleep",
      "cues": [
        "Who hopes? → ich hoffe (your P → FF verb, working ending and all)",
        "Who sleeps? → du schläfst — schlaf- + the thou-ending -st",
        "Sleep is the p-shift word: English sleep → schlafen, here in its du form"
      ],
      "target_answer": "Ich hoffe du schläfst",
      "meaning": "I hope you sleep",
      "vocab_hints": [
        {
          "word": "schläfst",
          "translation": "sleep (du form)",
          "note": "stem schlaf- + the Shakespearean -st (thou sleepest); the ä is the du-vowel change"
        }
      ],
      "word_bank": [
        "hoffe",
        "schläfst",
        "schlafen",
        "Ich",
        "hoffst",
        "du"
      ],
      "explanation": "'Ich hoffe' + 'du schläfst' — the p-shift verb takes the ancient thou-ending: thou sleepest → du schläfst."
    }
  ],
  "summary": {
    "outcome": "Sort German f-words into true p-shifts and ancestral f cognates on sight.",
    "use_example": {
      "german": "Ich hoffe, du schläfst gut.",
      "english": "I hope you sleep well."
    },
    "takeaway": "Swap f for p: if an English word appears, it is the P→F shift at work; if not, the f is an honest ancient one.",
    "curiosity_teaser": "Next: the dental hardening up close — thunder-day, bath towns, and why du is really thou."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from P→F Discrimination Drills (I hope you sleep):",
    "target_answer": "Ich hoffe du schläfst",
    "word_bank": [
      "Ich",
      "du",
      "nicht",
      "heute",
      "hoffe",
      "schläfst"
    ],
    "explanation": "Re-assembling \"Ich hoffe du schläfst\" from scratch locks in the structural pattern of P→F Discrimination Drills without relying on short-term echo."
  }
};

export default lesson;
