import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 22,
  "slug": "en-and-y",
  "title": "en & y",
  "subtitle": "j'en veux ('I want some / of it') and j'y vais ('I'm going there') — the two adverbial pronouns that walk left",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "en_pron",
    "y",
    "vouloir",
    "aller",
    "avoir",
    "pain",
    "café",
    "deux"
  ],
  "table_word_ids": [
    "en_pron",
    "y",
    "vouloir",
    "aller",
    "avoir",
    "pain",
    "café",
    "deux"
  ],
  "hook": {
    "title": "Two Tiny Words That Save You From Repeating Whole Phrases",
    "content": "Suppose someone asks 'Are you going to Paris?' In English you say 'Yes, I'm going THERE.' In French, 'there' is the single letter y (/i/, from Latin ibi), and like every French pronoun it walks left in front of the verb: J'y vais ('I there go')! Now suppose someone asks 'Do you want some coffee (du café)?' In English you say 'Yes, I want SOME' or 'I have TWO (of them).' In French, 'of it / of them / some' is en (/ɑ̃/, from Latin inde), and it walks left too: J'en veux ('I of-it want'), J'en ai deux ('I of-them have two')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How y and en are already inside phrases you know",
        "content": "You have heard 'Allons-y !' ('Let's go [there]!') and 'Il y a' ('It there has' = there is). That y is this exact place pronoun!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "de-Phrase → en, à-Place → y",
    "content": "Here is the clean mechanical trigger: (1) If the phrase you are replacing starts with de, du, de la, des, or a number/quantity (du pain, de l'eau, trois cafés), replace the noun with en before the verb: Tu veux du pain ? → Oui, j'en veux. Tu as des frères ? → Oui, j'en ai deux. (2) If the phrase you are replacing is a PLACE introduced by à, au, en, dans, or chez (à Paris, au café, chez moi), replace the whole place phrase with y before the verb: Tu vas au café ? → Oui, j'y vais!",
    "linguist_note": "Latin pronominal adverbs inde ('thence / from there') and ibi ('there') grammaticalized into clitic pronouns en and y across Gallo-Romance and Italian (ne / ci).",
    "trap_note": "The shortcut your mind will offer: leaving off en when stating a bare number in an answer (*J'ai deux for 'I have two [of them]'). In French, you MUST include en ('of them'): J'en ai deux!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each question with its natural French pronoun response using y or en:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Tu vas à Paris ? (place with à)",
          "german": "Oui, j'y vais (I'm going there)"
        },
        {
          "id": "p2",
          "english": "Tu veux du café ? (quantity with du)",
          "german": "Oui, j'en veux (I want some)"
        },
        {
          "id": "p3",
          "english": "Tu es chez toi ? (place with chez)",
          "german": "Oui, j'y suis (I am there)"
        },
        {
          "id": "p4",
          "english": "Tu as des billets ? (plural with des)",
          "german": "Oui, j'en ai deux (I have two of them)"
        }
      ],
      "target_answer": "Oui, j'y vais (I'm going there), Oui, j'en veux (I want some), Oui, j'y suis (I am there), Oui, j'en ai deux (I have two of them)",
      "meaning": "Tu vas à Paris ? (place with à), Tu veux du café ? (quantity with du), Tu es chez toi ? (place with chez), Tu as des billets ? (plural with des)",
      "explanation": "Places take y ('there'); de-phrases and quantities take en ('of it / of them').",
      "id": "fr22_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'J'en ai deux'?",
      "german": "J'en ai deux",
      "natural": "I have two of them",
      "options": [
        "I have two of them",
        "I there have two",
        "I of-them have two"
      ],
      "target_answer": "I of-them have two",
      "meaning": "Literal structure: I of-them have two",
      "explanation": "en means 'of it / of them' and stands between j' and ai.",
      "id": "fr22_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Someone asks 'Tu vas au restaurant ce soir ?' How do you answer 'Yes, I am going there'?",
      "options": [
        "Oui, j'y vais",
        "Oui, je le vais",
        "Oui, j'en vais"
      ],
      "target_answer": "Oui, j'y vais",
      "meaning": "Yes, I am going there",
      "explanation": "au restaurant is a place phrase (à + le), so y replaces it and je elides to j': J'y vais.",
      "id": "fr22_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want some (speaking of bread: du pain)",
      "cues": [
        "I of-it want → J'en veux (je elides before en)"
      ],
      "idea_parts": [
        "subject → J'",
        "partitive pronoun → en",
        "verb → veux"
      ],
      "target_answer": "J'en veux",
      "meaning": "I want some (of it)",
      "word_bank": [
        "Je",
        "J'en",
        "J'y",
        "veux",
        "le"
      ],
      "explanation": "Because du pain starts with de, en replaces it and je elides to J'en veux.",
      "diagnosis": {
        "slip": "used le or y instead of en",
        "cue": "Partitive du pain is replaced by en: J'en veux."
      },
      "id": "fr22_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "On y va maintenant",
      "replays": 2,
      "target_answer": "On y va maintenant",
      "meaning": "Let's go there now / We're going there now",
      "cues": [
        "Subject + there + go: On y va",
        "now: maintenant"
      ],
      "explanation": "On y va (/ɔ̃.n‿i va/) is the everyday French way to say 'Let's go!'.",
      "affirmation": "You heard On y va and maintenant clearly.",
      "id": "fr22_e5"
    }
  ],
  "summary": {
    "outcome": "Replace de/partitive/quantity phrases with en and place phrases with y, positioning both right before the verb.",
    "use_example": {
      "german": "Tu vas à la boulangerie ? — Oui, j'y vais et j'en prends deux.",
      "english": "Are you going to the bakery? — Yes, I'm going there and getting two of them."
    },
    "takeaway": "à + place becomes y ('there'); de + thing/quantity becomes en ('of it').",
    "curiosity_teaser": "Up next on Le Pont ([2201] en: Of It): see how en & y leads directly into en: Of It."
  },
  "twist": {
    "prompt": "Ungraded — 'I don't want any (of it)' (wrap n'...pas around en veux):",
    "target_answer": "Je n'en veux pas",
    "word_bank": [
      "n'en",
      "ne",
      "veux",
      "J'en",
      "Je",
      "pas"
    ],
    "explanation": "Inside the negation sandwich, ne elides before en: Je n'en veux pas!"
  },
  "foreshadow": {
    "line": "Having mastered en & y, look ahead to Topic 23 (Pronouns Walk Left), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 23
  },
  "payoff": {
    "ofLesson": 21,
    "text": "The foundation from Topic 21 (Plus, Moins, aussi) now pays off directly inside en & y: every sentence here builds on that earlier step."
  }
};

export default lesson;
