import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3,
  "slug": "p-to-f-shift",
  "title": "The P → F / FF Shift",
  "subtitle": "How English preserved what German transformed",
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
    "apfel",
    "pfeffer",
    "pfad",
    "lust",
    "teuer",
    "fernsehen",
    "einsteigen",
    "aussteigen"
  ],
  "table_word_ids": [
    "hoffen",
    "helfen",
    "schlafen",
    "schiff",
    "affe",
    "reif",
    "apfel",
    "pfeffer",
    "pfad",
    "lust",
    "teuer",
    "fernsehen",
    "einsteigen",
    "aussteigen",
    "pforte",
    "schlafzimmer",
    "hüfte",
    "würfel"
  ],
  "hook": {
    "title": "The Medieval Sound Wave",
    "content": "Between 500 and 700 AD, a phonetic wave swept northward across the southern German highlands. English, safely isolated across the North Sea, preserved the ancient Germanic sounds. One of the cleanest rules: wherever English kept 'P', High German shifted it into 'F' or double 'FF'.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Second Sound Shift",
        "content": "Also known as the High German Consonant Shift (Zweite Lautverschiebung), separating Low German/English from High German."
      }
    ]
  },
  "pattern": {
    "title": "Post-Vocalic P becomes F / FF",
    "content": "After a vowel, English 'P' systematically becomes German 'F' or 'FF'. Hope becomes hoffen. Help becomes helfen. Sleep becomes schlafen. Ship becomes Schiff (a ship's captain is still called a skipper in English!). Ape becomes Affe. Ripe becomes reif (reifen means 'to ripen'). At the start of words, drop the German 'F' in 'PF-' to reveal the English twin: Pfad ↔ path, Pfund ↔ pound, Pfeffer ↔ pepper, Apfel ↔ apple!",
    "footnotes": [
      {
        "marker": "2",
        "title": "Gemination",
        "content": "Short vowels triggered a double 'ff' (hoffen, Schiff), while long vowels and liquids took single 'f' (schlafen, helfen)."
      }
    ],
    "linguist_note": "At the start of words, Germanic P shifted to PF (path → Pfad, pound → Pfund, pipe → Pfeife). After vowels, it shifted to F or FF (ship → Schiff, sleep → schlafen). English borrowed the Low German nautical word 'skipper' (literally 'Schiff-er', ship-master)."
  },
  "exercises": [
    {
      "id": "l3_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German verb for English 'hope' using the P → FF shift:",
      "tile_options": [
        "en",
        "helph",
        "st",
        "schlaf",
        "hoff"
      ],
      "target_answer": "hoffen",
      "meaning": "to hope",
      "shift_hint": "P → FF",
      "affirmation": "You breathed the p into ff and pulled the ending on — the shift is becoming a reflex.",
      "explanation": "Post-vocalic P shifted into double FF + infinitive -en = hoffen."
    },
    {
      "id": "l3_e2",
      "type": "matching_pairs",
      "prompt": "Match the English words with their P → F/FF German cognates:",
      "matching_pairs": [
        {
          "id": "pf1",
          "english": "ship",
          "german": "Schiff"
        },
        {
          "id": "pf2",
          "english": "help",
          "german": "helfen"
        },
        {
          "id": "pf3",
          "english": "sleep",
          "german": "schlafen"
        },
        {
          "id": "pf4",
          "english": "ape",
          "german": "Affe"
        },
        {
          "id": "pf5",
          "english": "apple",
          "german": "Apfel"
        },
        {
          "id": "pf6",
          "english": "to board / get on",
          "german": "einsteigen"
        },
        {
          "id": "pf7",
          "english": "to get off",
          "german": "aussteigen"
        }
      ],
      "target_answer": "Schiff, helfen, schlafen, Affe, Apfel, einsteigen, aussteigen",
      "meaning": "ship, to help, to sleep, ape, apple, to board, to get off",
      "shift_hint": "P → F/FF",
      "affirmation": "Four p-words read straight through the shift — and the last two ride the modal bracket you built last topic.",
      "explanation": "English post-vocalic P regularly corresponds to German F or FF — and PF- opens the word in Apfel. einsteigen and aussteigen are the bracket infinitives from the last topic, back for another ride."
    },
    {
      "id": "l3_e3",
      "type": "shift_select",
      "prompt": "At the market stall: 'Der Apfel ist reif — aber zu teuer.' What consonant shift connects English 'ripe' and German 'reif'?",
      "target_answer": "P → F/FF",
      "meaning": "English ripe ↔ German reif (P → F)",
      "options": [
        "T → S/SS",
        "K → CH",
        "TH → D",
        "P → F/FF"
      ],
      "shift_hint": "P → F",
      "affirmation": "You read reif backwards to ripe — every German f whispers its English p origin.",
      "explanation": "Voiceless stop P shifted into fricative F after a long vowel: ripe ↔ reif, on a fruit that is reif but, alas, zu teuer."
    },
    {
      "id": "l3_e4",
      "type": "derive",
      "prompt": "Apply the P → FF shift: English: 'sleep' → German verb:",
      "english_hint": "slee·p· → schla·f·en",
      "shift_hint": "P → F",
      "affirmation": "You heard schl- where English says sl-, and the p breathed into f — sleep became schlafen.",
      "target_answer": "schlafen",
      "meaning": "to sleep",
      "explanation": "English sl- becomes schl- and p shifts to f."
    },
    {
      "id": "l3_e5",
      "type": "transcribe",
      "prompt": "You want to say:",
      "idea": "you hope your friend feels like coming along: I hope you have the craving (the Lust)",
      "cues": [
        "Who hopes? → ich hoffe — hope is a regular verb here: hoff- + -e",
        "Who has the Lust? → du hast Lust — hast is haben's du-form (have ↔ haben: the same ancient verb)",
        "Run it straight through: no 'that', no comma between the two clauses"
      ],
      "target_answer": "Ich hoffe du hast Lust",
      "meaning": "I hope you feel like it (have the craving)",
      "vocab_hints": [
        {
          "word": "hast",
          "translation": "have (du form)",
          "note": "haben = to have — ich habe, du hast. English 'have' and German 'haben' are the same ancient verb; Lust = desire, the noun English kept as 'lust'"
        }
      ],
      "word_bank": [
        "hast",
        "du",
        "Lust",
        "hoffe",
        "Ich",
        "kommst"
      ],
      "explanation": "German lets 'I hope' run straight into 'you have the Lust' — no 'that', no comma. And hoffen is your P → F hope wearing a working ending."
    }
  ],
  "summary": {
    "outcome": "Use a familiar English p-word to help recognize related German f/ff words.",
    "use_example": {
      "german": "Ich hoffe, du hast Lust.",
      "english": "I hope you feel like it."
    },
    "takeaway": "Every time you see German 'f' or 'ff' in a core word, test whether replacing it with 'p' creates an English word.",
    "curiosity_teaser": "Next: the PF- openers — path becomes Pfad, pound becomes Pfund: the word-initial explosion of the shift."
  },
  "twist": {
    "prompt": "Same hope, new cargo: this time you hope your friend is in — I hope you want to watch TV. Put it in German.",
    "target_answer": "Ich hoffe du willst fernsehen",
    "word_bank": [
      "kommst",
      "du",
      "hoffe",
      "fernsehen",
      "Ich",
      "willst"
    ],
    "explanation": "Two clauses, so the full sentence takes a comma: Ich hoffe, du willst fernsehen. The modal willst takes the bare infinitive fernsehen at the end — no zu, no 'that' — and the person lives in willst, not in fernsehen."
  }
};

export default lesson;
