import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1202,
  "slug": "sprig-1202",
  "title": "Future Gym",
  "subtitle": "Near-future sentences chaining je vais / tu vas / on va with converted verbs.",
  "phase": 2,
  "shift_categories": [
    "ation"
  ],
  "word_ids": [
    "aller",
    "je_vais",
    "vas",
    "va",
    "allons",
    "allez",
    "confirmer",
    "organiser",
    "visiter",
    "préparer",
    "demain",
    "ce_soir"
  ],
  "table_word_ids": [
    "aller",
    "je_vais",
    "vas",
    "va",
    "allons",
    "allez",
    "confirmer",
    "organiser",
    "visiter",
    "préparer",
    "demain",
    "ce_soir"
  ],
  "hook": {
    "title": "Chaining Near-Future Plans With Your -ation Verbs",
    "content": "Combine Topic 12's near future (aller) with Topic 3's -ation verb engine (confirmer, organiser, visiter, préparer, réserver, célébrer): only aller conjugates; the second verb stays parked in its bare -er infinitive form!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Negating the near future: wrap aller, leave the infinitive outside",
        "content": "In On ne va pas attendre ('We are not going to wait'), ne...pas wraps only the conjugated auxiliary va!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "aller (Conjugated) + Infinitive (Parked)",
    "content": "Run the near-future formula across positive, negative, and question sentences.",
    "linguist_note": "Periphrastic future with aller + infinitive is the default spoken future for planned events.",
    "trap_note": "Never put pas after the infinitive (*Je ne vais partir pas) — pas hugs the form of aller (Je ne vais pas partir)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each near-future plan with its French sentence:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am going to prepare the coffee",
          "german": "Je vais préparer le café"
        },
        {
          "id": "p2",
          "english": "Are you going to confirm?",
          "german": "Tu vas confirmer ?"
        },
        {
          "id": "p3",
          "english": "We (on) are going to organize the dinner",
          "german": "On va organiser le dîner"
        },
        {
          "id": "p4",
          "english": "We (nous) are going to visit the city",
          "german": "Nous allons visiter la ville"
        },
        {
          "id": "p5",
          "english": "Are you (polite) going to reserve?",
          "german": "Vous allez réserver ?"
        }
      ],
      "target_answer": "Je vais préparer le café, Tu vas confirmer ?, On va organiser le dîner, Nous allons visiter la ville, Vous allez réserver ?",
      "meaning": "I am going to prepare the coffee, Are you going to confirm?, We (on) are going to organize the dinner, We (nous) are going to visit the city, Are you (polite) going to reserve?",
      "explanation": "Every person of aller chains directly to the bare infinitive.",
      "id": "fr1202_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Negate 'On va attendre' ('We are going to wait'):",
      "options": [
        "On va ne pas attendre",
        "On ne va attendre pas",
        "On ne va pas attendre"
      ],
      "target_answer": "On ne va pas attendre",
      "meaning": "We are not going to wait",
      "explanation": "ne...pas wraps the conjugated auxiliary va; attendre waits outside.",
      "id": "fr1202_e2"
    },
    {
      "type": "derive",
      "prompt": "Build the near future: 'She is going to celebrate' (Elle + va + celebrate):",
      "english_hint": "célébration → célébrer",
      "target_answer": "Elle va célébrer",
      "meaning": "She is going to celebrate",
      "explanation": "Elle va + bare infinitive célébrer.",
      "id": "fr1202_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am going to prepare the reservation tomorrow",
      "cues": [
        "I am going to prepare → Je vais préparer",
        "the reservation tomorrow → la réservation demain"
      ],
      "idea_parts": [
        "near future → Je vais préparer",
        "object + time → la réservation demain"
      ],
      "target_answer": "Je vais préparer la réservation demain",
      "meaning": "I am going to prepare the reservation tomorrow",
      "word_bank": [
        "vais",
        "réservation",
        "Je",
        "la",
        "demain",
        "préparer",
        "le",
        "vas"
      ],
      "explanation": "préparer stays in its infinitive form after Je vais.",
      "diagnosis": {
        "slip": "conjugated préparer",
        "cue": "Keep préparer in the infinitive after Je vais."
      },
      "id": "fr1202_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Vous allez visiter l'université demain",
      "replays": 2,
      "target_answer": "Vous allez visiter l'université demain",
      "meaning": "You are going to visit the university tomorrow",
      "cues": [
        "Vous allez visiter",
        "l'université demain"
      ],
      "explanation": "allez (/ale/) and visiter (/vizite/) both end in /e/.",
      "affirmation": "You distinguished conjugated allez (-ez) from infinitive visiter (-er)!",
      "id": "fr1202_e5"
    }
  ],
  "summary": {
    "outcome": "Chain aller across all persons with converted -er/-ir/-re infinitives in positive, negative, and question sentences.",
    "use_example": {
      "german": "Ce soir, on va préparer un bon dîner et célébrer.",
      "english": "Tonight, we're going to prepare a good dinner and celebrate."
    },
    "takeaway": "Conjugate aller, park the infinitive, and hug aller with ne...pas when negating.",
    "curiosity_teaser": "Up next on Le Pont ([13] à, de, chez): see how Future Gym leads directly into à, de, chez."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am going to prepare the reservation tomorrow\" in French:",
    "target_answer": "Je vais préparer la réservation demain",
    "word_bank": [
      "la",
      "Je",
      "vais",
      "ne",
      "réservation",
      "demain",
      "préparer",
      "pas"
    ],
    "explanation": "Re-constructing \"Je vais préparer la réservation demain\" from the underlying rule cements the pattern of Future Gym."
  }
};

export default lesson;
