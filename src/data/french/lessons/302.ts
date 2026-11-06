import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 302,
  "slug": "je-veux-infinitive-gym",
  "title": "Je veux + Infinitive Gym",
  "subtitle": "Chain the converted verbs into real sentences",
  "phase": 1,
  "shift_categories": [
    "ation"
  ],
  "word_ids": [
    "vouloir",
    "visiter",
    "participer",
    "organiser",
    "confirmer",
    "un_peu"
  ],
  "table_word_ids": [
    "vouloir",
    "visiter",
    "participer",
    "organiser",
    "confirmer",
    "un_peu"
  ],
  "hook": {
    "title": "The Want-Verb Is a Train Engine",
    "content": "je veux pulls infinitives the way an engine pulls cars: je veux visiter Paris, je veux organiser une invitation, je veux participer un peu. The second verb never conjugates — it stays in its dictionary form, parked behind the want. This is the same insight as German's modal bracket, wearing French clothes."
  },
  "pattern": {
    "title": "Two Verbs, One Sentence, Zero Stress",
    "content": "The rule: only veux bends. The infinitive stays whole, wherever je veux leaves it. That stability is why the -ation engine matters — every converted verb is another car on the train, usable the moment it's built.",
    "trap_note": "The mind wants the second verb to agree with tu: tu veux participes. No — the infinitive never conjugates: tu veux participer."
  },
  "exercises": [
    {
      "id": "fr302_e1",
      "type": "syntax_builder",
      "prompt": "Assemble: 'You want to visit Paris'",
      "target_answer": "Tu veux visiter Paris",
      "meaning": "You want to visit Paris",
      "word_bank": [
        "visiter",
        "Tu",
        "visites",
        "la",
        "veux",
        "Paris"
      ],
      "explanation": "veux bends, visiter doesn't — the infinitive stays in the dictionary."
    },
    {
      "id": "fr302_e2",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want to get involved a little",
      "cues": [
        "The everyday register: participer (not the formal-sounding English)",
        "the tag rides at the end: un peu",
        "je veux participer un peu"
      ],
      "target_answer": "Je veux participer un peu",
      "meaning": "I want to get involved a little",
      "word_bank": [
        "Je",
        "un",
        "participer",
        "peu",
        "veux",
        "la",
        "participes"
      ],
      "idea_parts": [
        "the want → je veux",
        "the verb → participer",
        "the tag → un peu, last"
      ],
      "explanation": "Formal English, everyday French — register travels in reverse across the Channel."
    },
    {
      "id": "fr302_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you want to organize the invitation",
      "cues": [
        "Noun → verb: organisation → organiser",
        "tu veux + infinitive",
        "l'invitation — the elision fires again"
      ],
      "target_answer": "Tu veux organiser l'invitation",
      "meaning": "You want to organize the invitation",
      "word_bank": [
        "veux",
        "la",
        "l'invitation",
        "Tu",
        "organiser",
        "le"
      ],
      "idea_parts": [
        "the want → tu veux",
        "the verb → organiser",
        "the thing → l'invitation"
      ],
      "explanation": "Two conversions in one sentence: the engine (-ation) and the elision (l').",
      "diagnosis": {
        "slip": "the infinitive picked up an ending",
        "cue": "Only veux conjugates. organiser stays whole after tu veux — the second verb is parked, not driven."
      }
    },
    {
      "id": "fr302_e4",
      "type": "variant_english",
      "prompt": "Which English sentences express the natural thought of 'Je veux participer un peu'?",
      "german": "Je veux participer un peu",
      "meaning": "I want to get involved / participate a little",
      "renderings": [
        "I want to get involved a little",
        "I want to take part a bit"
      ],
      "traps": [
        "I am participating right now",
        "I don't want to participate at all"
      ],
      "target_answer": "I want to get involved a little",
      "explanation": "participer is everyday French for 'getting involved' or 'taking part' — register travels in reverse across the Channel."
    },
    {
      "id": "fr302_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je veux confirmer la réservation",
      "replays": 2,
      "target_answer": "Je veux confirmer la réservation",
      "meaning": "I want to confirm the reservation",
      "cues": [
        "Engine car 1: confirmer (confirmation minus -ation)",
        "Engine car 2: la réservation — with its é",
        "je veux pulls them both"
      ],
      "explanation": "Noun and verb from the same Latin root, one sentence apart.",
      "affirmation": "You kept confirmer bare and gave réservation its é — both conversions held."
    }
  ],
  "summary": {
    "outcome": "Chain converted infinitives after je veux / tu veux with the second verb parked and un-conjugated.",
    "use_example": {
      "german": "Tu veux organiser l'invitation ?",
      "english": "Do you want to organize the invitation?"
    },
    "takeaway": "Only the want-verb bends. The infinitive is parked freight — and every -ation noun is a new car.",
    "curiosity_teaser": "Up next on Le Pont ([303] The -ir & -re Verb Bridges): see how Je veux + Infinitive Gym leads directly into The -ir & -re Verb Bridges."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"You want to visit Paris\" in French:",
    "target_answer": "Tu veux visiter Paris",
    "word_bank": [
      "pas",
      "visiter",
      "Tu",
      "ne",
      "veux",
      "Paris"
    ],
    "explanation": "Re-constructing \"Tu veux visiter Paris\" from the underlying rule cements the pattern of Je veux + Infinitive Gym."
  }
};

export default lesson;
