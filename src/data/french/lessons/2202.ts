import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2202,
  "slug": "lesson-2202",
  "title": "y: There",
  "subtitle": "y replaces à/dans/chez + place: Tu vas à Paris ? — Oui, j'y vais.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "y",
    "aller",
    "être",
    "habiter",
    "rester",
    "ville",
    "gare",
    "hôtel",
    "on"
  ],
  "table_word_ids": [
    "y",
    "aller",
    "être",
    "habiter",
    "rester",
    "ville",
    "gare",
    "hôtel",
    "on"
  ],
  "hook": {
    "title": "y: The Pronoun for 'There' and 'To It'",
    "content": "Whenever a place has already been mentioned (à Paris, au restaurant, dans la maison, chez le docteur), French replaces the entire prepositional place phrase with y (/i/) right before the verb: J'y vais ('I'm going there'), J'y suis ('I am there'), Je veux y aller ('I want to go there')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Where y stands in an infinitive chain: right before the infinitive!",
        "content": "In Je veux aller à Paris, y belongs to aller, so it stands right before aller: Je veux y aller!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Place Phrase (à / au / dans / en / chez + Place) → y Before the Verb",
    "content": "Position y before a single conjugated verb (J'y vais) or right before the infinitive in a chain (Je vais y rester).",
    "linguist_note": "Locative clitic y (< Latin ibi) climbs to the pre-infinitival slot in modern French.",
    "trap_note": "In an infinitive chain ('I want to go there'), don't put y before veux (*J'y veux aller) — put y right before aller: Je veux y aller!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each y sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "J'y vais maintenant",
          "german": "I'm going there now"
        },
        {
          "id": "p2",
          "english": "Elle y habite depuis trois ans",
          "german": "She has lived there for three years"
        },
        {
          "id": "p3",
          "english": "Nous y sommes",
          "german": "We are there / Here we are!"
        },
        {
          "id": "p4",
          "english": "Je veux y aller demain",
          "german": "I want to go there tomorrow"
        },
        {
          "id": "p5",
          "english": "Je n'y vais pas",
          "german": "I am not going there"
        }
      ],
      "target_answer": "I'm going there now, She has lived there for three years, We are there / Here we are!, I want to go there tomorrow, I am not going there",
      "meaning": "J'y vais maintenant, Elle y habite depuis trois ans, Nous y sommes, Je veux y aller demain, Je n'y vais pas",
      "explanation": "y stands directly before the verb (or infinitive) whose place it replaces.",
      "id": "fr2202_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Where does 'y' go in 'I am going to stay there' (using je vais + rester)?",
      "options": [
        "Je vais y rester",
        "Je vais rester y",
        "J'y vais rester"
      ],
      "target_answer": "Je vais y rester",
      "meaning": "I am going to stay there",
      "explanation": "In an infinitive chain, y stands right before the infinitive it modifies: Je vais y rester!",
      "id": "fr2202_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'Nous y sommes déjà'?",
      "german": "Nous y sommes déjà",
      "natural": "We are already there",
      "options": [
        "We are there already",
        "We there are already",
        "We are already there"
      ],
      "target_answer": "We there are already",
      "meaning": "Literal structure: We there are already",
      "explanation": "y ('there') stands between Nous and sommes.",
      "id": "fr2202_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want to go there with you (use Je veux y aller avec toi)",
      "cues": [
        "I want to-there-go → Je veux y aller + with you → avec toi"
      ],
      "idea_parts": [
        "want + y + infinitive → Je veux y aller",
        "companion → avec toi"
      ],
      "target_answer": "Je veux y aller avec toi",
      "meaning": "I want to go there with you",
      "word_bank": [
        "aller",
        "J'y",
        "y",
        "toi",
        "avec",
        "veux",
        "la",
        "Je"
      ],
      "explanation": "y stands right before the infinitive aller.",
      "diagnosis": {
        "slip": "placed y before veux",
        "cue": "Place y right before the infinitive: Je veux y aller."
      },
      "id": "fr2202_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Tu vas à la gare ? Oui, j'y vais",
      "replays": 2,
      "target_answer": "Tu vas à la gare ? Oui, j'y vais",
      "meaning": "Are you going to the station? Yes, I'm going there",
      "cues": [
        "Tu vas à la gare",
        "Oui, j'y vais"
      ],
      "explanation": "à la gare is replaced by y in J'y vais.",
      "affirmation": "You replaced à la gare with j'y vais cleanly.",
      "id": "fr2202_e5"
    }
  ],
  "summary": {
    "outcome": "Replace any place phrase (à, au, dans, chez + place) with y before the verb or infinitive.",
    "use_example": {
      "german": "C'est une belle ville — je voudrais y habiter.",
      "english": "It's a beautiful city — I would like to live there."
    },
    "takeaway": "Single verb: J'y vais; Infinitive chain: Je veux y aller.",
    "curiosity_teaser": "Up next on Le Pont ([23] Pronouns Walk Left): see how y: There leads directly into Pronouns Walk Left."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I want to go there with you\" in French:",
    "target_answer": "Je veux y aller avec toi",
    "word_bank": [
      "veux",
      "Je",
      "avec",
      "aller",
      "ne",
      "pas",
      "toi",
      "y"
    ],
    "explanation": "Re-constructing \"Je veux y aller avec toi\" from the underlying rule cements the pattern of y: There."
  }
};

export default lesson;
