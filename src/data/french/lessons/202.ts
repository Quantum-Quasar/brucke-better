import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 202,
  "slug": "ion-discrimination-drills",
  "title": "-ION Discrimination Drills",
  "subtitle": "la or l' — decide at speed, then build the pronoun",
  "phase": 1,
  "shift_categories": [
    "ion"
  ],
  "word_ids": [
    "collection",
    "invitation",
    "réservation",
    "complication",
    "passion",
    "tradition"
  ],
  "table_word_ids": [
    "collection",
    "invitation",
    "réservation",
    "complication",
    "passion",
    "tradition"
  ],
  "hook": {
    "title": "Mixed Set, One Rule",
    "content": "No new words here — just speed. Every item is an -ION noun you've met; your job is the glance: vowel or consonant after the article? This is also your first learning-consciousness moment: don't hunt for a rule about which nouns are feminine. The ending already told you."
  },
  "pattern": {
    "title": "The Two-Move Check",
    "content": "Move one: is the noun -ION? Then it's feminine — la. Move two: does it start with a vowel? Then l'. Everything else in the sentence (je veux, the left-walking pronoun) is machinery you already own. Two glances, one conversion, thousands of words.",
    "trap_note": "After several l' answers in a row, the mind starts auto-piloting l' everywhere. La passion, la complication — the consonant restarts the article."
  },
  "exercises": [
    {
      "id": "fr202_e1",
      "type": "shift_select",
      "prompt": "'The passion':",
      "options": [
        "l'passion",
        "la passion",
        "le passion"
      ],
      "target_answer": "la passion",
      "meaning": "the passion",
      "explanation": "p is a consonant — the full article returns. Watch for the auto-pilot l'."
    },
    {
      "id": "fr202_e2",
      "type": "shift_select",
      "prompt": "'The invitation':",
      "options": [
        "la invitation",
        "le invitation",
        "l'invitation"
      ],
      "target_answer": "l'invitation",
      "meaning": "the invitation",
      "explanation": "i-nvitation opens with a vowel: l'. Merci pour l'invitation."
    },
    {
      "id": "fr202_e3",
      "type": "derive",
      "prompt": "Convert with article: 'the complication'",
      "target_answer": "la complication",
      "meaning": "the complication",
      "explanation": "Two nasal Ns, both thought not said — and a consonant c, so la stays whole."
    },
    {
      "id": "fr202_e4",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want it — the it is the reservation",
      "cues": [
        "la réservation — the é tells you where the stress lands",
        "it → la, walking left",
        "je la veux"
      ],
      "target_answer": "Je la veux",
      "meaning": "I want it (the reservation)",
      "word_bank": [
        "l'",
        "le",
        "veux",
        "la",
        "Je"
      ],
      "explanation": "Third it today — and the move is identical every time: check the article, walk it left.",
      "idea_parts": [
        "who wants? → je",
        "it (la réservation) → la, placed before veux",
        "result → Je la veux"
      ]
    },
    {
      "id": "fr202_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu veux la complication",
      "replays": 2,
      "target_answer": "Tu veux la complication",
      "meaning": "Do you want the complication?",
      "cues": [
        "tu veux — the want question",
        "la — consonant restart, no elision",
        "the two nasals: -tion, compli-"
      ],
      "explanation": "A nonsense question — the sentences are scaffolding, the moves are the lesson.",
      "affirmation": "You wrote la, not l' — the auto-pilot didn't get you."
    }
  ],
  "summary": {
    "outcome": "Decide la vs l' at speed across a mixed -ION set, and keep the pronoun's la intact after the left-walk.",
    "use_example": {
      "german": "Merci pour l'invitation — j'accepte la complication.",
      "english": "Thanks for the invitation — I accept the complication."
    },
    "takeaway": "Two glances per noun: -ION → feminine; vowel → elide. The rule is in the word, not in a list.",
    "curiosity_teaser": "Up next on Le Pont ([5031] Actuellement, Librairie & Co.): see how -ION Discrimination Drills leads directly into Actuellement, Librairie & Co.."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want it (the reservation)\" in French:",
    "target_answer": "Je la veux",
    "word_bank": [
      "pas",
      "veux",
      "Je",
      "la",
      "ne"
    ],
    "explanation": "Re-constructing \"Je la veux\" from the underlying rule cements the pattern of -ION Discrimination Drills."
  }
};

export default lesson;
