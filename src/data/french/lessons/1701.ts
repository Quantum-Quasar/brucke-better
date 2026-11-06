import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1701,
  "slug": "lesson-1701",
  "title": "Participle Twins",
  "subtitle": "mangé, décidé, parlé, trouvé, donné, aimé, fini, compris, pris, vu — the -é/-i/-u participle system.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mangé",
    "décidé",
    "parlé",
    "trouvé",
    "donné",
    "aimé",
    "fini",
    "compris",
    "pris",
    "fait",
    "vu"
  ],
  "table_word_ids": [
    "mangé",
    "décidé",
    "parlé",
    "trouvé",
    "donné",
    "aimé",
    "fini",
    "compris",
    "pris",
    "fait",
    "vu"
  ],
  "hook": {
    "title": "The Three Participle Families: -é, -i, and the Short Irregulars",
    "content": "Over 85% of verbs end in -er and swap -er for -é (mangé, décidé, parlé, trouvé, donné, aimé). Regular -ir verbs swap -ir for -i (finir → fini). And the four ultra-common irregulars give you short participles inside English cognates: fait ('done/made' ↔ fact), pris / compris ('taken/understood' ↔ prize/comprised), and vu ('seen' ↔ déjà vu)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How English 'déjà vu' teaches you voir's participle for free",
        "content": "'déjà vu' is literally French for 'already seen' (déjà + vu, the past participle of voir 'to see')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "J'ai + Participle (-é / -i / fait / pris / compris / vu)",
    "content": "Drill the high-frequency participles with j'ai, tu as, il a, nous avons, vous avez.",
    "linguist_note": "Weak participles (-é, -i, -u) contrast with Latin sigmatic/dental survivors (pris, fait).",
    "trap_note": "Never use the bare participle without avoir (*Je compris, *Je vu) — always include the auxiliary: J'ai compris, J'ai vu!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each infinitive with its past participle and English cognate clue:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "parler / trouver (-er → -é)",
          "german": "parlé / trouvé (trove)"
        },
        {
          "id": "p2",
          "english": "finir / choisir (-ir → -i)",
          "german": "fini / choisi"
        },
        {
          "id": "p3",
          "english": "faire (to do/make)",
          "german": "fait (fact / feat)"
        },
        {
          "id": "p4",
          "english": "prendre / comprendre",
          "german": "pris / compris (prize / comprised)"
        },
        {
          "id": "p5",
          "english": "voir (to see)",
          "german": "vu (déjà vu)"
        }
      ],
      "target_answer": "parlé / trouvé (trove), fini / choisi, fait (fact / feat), pris / compris (prize / comprised), vu (déjà vu)",
      "meaning": "parler / trouver (-er → -é), finir / choisir (-ir → -i), faire (to do/make), prendre / comprendre, voir (to see)",
      "explanation": "Once you know -é, -i, fait, pris/compris, and vu, you can form 95% of spoken past sentences.",
      "id": "fr1701_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "French trouvé ('found', participle of trouver) gave English which word for a 'treasure found'?",
      "target_answer": "trove",
      "meaning": "treasure trove ↔ trouvé ('found')",
      "explanation": "A 'treasure trove' is literally Old French trésor trové ('treasure found')!",
      "id": "fr1701_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I have already seen this film / I already saw this film'?",
      "options": [
        "J'ai vu déjà ce film",
        "Je déjà vu ce film",
        "J'ai déjà vu ce film"
      ],
      "target_answer": "J'ai déjà vu ce film",
      "meaning": "I have already seen this film",
      "explanation": "Short adverbs like déjà sit right between the auxiliary (ai) and the participle (vu)!",
      "id": "fr1701_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I found the house and I took a coffee",
      "cues": [
        "I found the house → J'ai trouvé la maison",
        "and I took/had a coffee → et j'ai pris un café"
      ],
      "idea_parts": [
        "first past action → J'ai trouvé la maison",
        "second past action → et j'ai pris un café"
      ],
      "target_answer": "J'ai trouvé la maison et j'ai pris un café",
      "meaning": "I found the house and had a coffee",
      "word_bank": [
        "le",
        "un",
        "la",
        "pris",
        "prendre",
        "et",
        "café",
        "j'ai",
        "maison",
        "J'ai",
        "trouvé"
      ],
      "explanation": "Both verbs repeat their auxiliary (J'ai trouvé... et j'ai pris).",
      "diagnosis": {
        "slip": "omitted the second j'ai",
        "cue": "Use J'ai trouvé and j'ai pris."
      },
      "id": "fr1701_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous avons déjà fini le travail",
      "replays": 2,
      "target_answer": "Nous avons déjà fini le travail",
      "meaning": "We have already finished the work",
      "cues": [
        "Nous avons déjà fini",
        "le travail"
      ],
      "explanation": "déjà slots between avons and fini.",
      "affirmation": "You placed déjà right inside the verb bracket!",
      "id": "fr1701_e5"
    }
  ],
  "summary": {
    "outcome": "Produce -é, -i, fait, pris, compris, and vu participles with avoir and slot déjà between auxiliary and participle.",
    "use_example": {
      "german": "J'ai déjà pris mon billet et j'ai fait ma valise.",
      "english": "I already got my ticket and packed my suitcase."
    },
    "takeaway": "Short adverbs like déjà sit between avoir and the participle: J'ai déjà vu.",
    "curiosity_teaser": "Up next on Le Pont ([1702] Hier j'ai… Story Drills): see how Participle Twins leads directly into Hier j'ai… Story Drills."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I found the house and had a coffee\" in French:",
    "target_answer": "J'ai trouvé la maison et j'ai pris un café",
    "word_bank": [
      "ne",
      "J'ai",
      "la",
      "pas",
      "et",
      "j'ai",
      "café",
      "pris",
      "un",
      "maison",
      "trouvé"
    ],
    "explanation": "Re-constructing \"J'ai trouvé la maison et j'ai pris un café\" from the underlying rule cements the pattern of Participle Twins."
  }
};

export default lesson;
