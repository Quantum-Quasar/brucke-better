import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5091,
  "slug": "lesson-5091",
  "title": "Dont & Où",
  "subtitle": "dont ('of which / whose') for de-verbs and où as relative 'where/when'.",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "dont",
    "où",
    "qui",
    "que",
    "besoin",
    "parler",
    "ville",
    "moment",
    "livre"
  ],
  "table_word_ids": [
    "dont",
    "où",
    "qui",
    "que",
    "besoin",
    "parler",
    "ville",
    "moment",
    "livre"
  ],
  "hook": {
    "title": "Completing the Relative Quartet: qui, que, dont, où",
    "content": "Alongside qui (subject) and que (direct object), dont ('of which / whose / about which') steps in whenever the verb or phrase uses de (parler de → le film dont je parle; avoir besoin de → la chose dont j'ai besoin), and où ('where / when') steps in for BOTH places (la ville où j'habite) AND time nouns (le jour où il est arrivé)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why French says 'le jour où' ('the day where') instead of '*le jour quand'",
        "content": "After a time noun like le jour ('the day') or le moment ('the moment'), French treats time as a space and uses où ('where'): le jour où je t'ai vu!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "de-Verb → dont; Place or Time Noun → où",
    "content": "Choose dont for de-constructions and où for places and time moments.",
    "linguist_note": "Relative adverb où (< Latin ubi) relativizes both spatial and temporal adjuncts, while dont (< dē unde) relativizes de-complements.",
    "trap_note": "Never say *le jour quand for 'the day when' — French always says le jour où!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each relative pronoun from the 4-word quartet with its trigger:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "qui (L'ami qui arrive)",
          "german": "Subject of the following verb"
        },
        {
          "id": "p2",
          "english": "que / qu' (Le livre que je lis)",
          "german": "Direct object of the following clause"
        },
        {
          "id": "p3",
          "english": "dont (Le livre dont j'ai besoin)",
          "german": "Replaces a de-phrase (parler de, avoir besoin de)"
        },
        {
          "id": "p4",
          "english": "où (La ville où j'habite / Le jour où...)",
          "german": "Place ('where') OR Time ('when' after le jour/moment)"
        }
      ],
      "target_answer": "Subject of the following verb, Direct object of the following clause, Replaces a de-phrase (parler de, avoir besoin de), Place ('where') OR Time ('when' after le jour/moment)",
      "meaning": "qui (L'ami qui arrive), que / qu' (Le livre que je lis), dont (Le livre dont j'ai besoin), où (La ville où j'habite / Le jour où...)",
      "explanation": "qui, que, dont, où form the complete 4-piece relative toolkit of French.",
      "id": "fr5091_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'That is the thing that I need' (remembering that 'to need' is 'avoir besoin DE')?",
      "options": [
        "C'est la chose que j'ai besoin",
        "C'est la chose dont j'ai besoin",
        "C'est la chose dont j'en ai besoin"
      ],
      "target_answer": "C'est la chose dont j'ai besoin",
      "meaning": "That is the thing (of which) I have need",
      "explanation": "Because avoir besoin DE takes de, the relative pronoun is dont.",
      "id": "fr5091_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'the day when we arrived'?",
      "options": [
        "le jour quand nous sommes arrivés",
        "le jour que nous sommes arrivés",
        "le jour où nous sommes arrivés"
      ],
      "target_answer": "le jour où nous sommes arrivés",
      "meaning": "the day when (lit. where) we arrived",
      "explanation": "After time nouns like le jour or le moment, French uses où for 'when'!",
      "id": "fr5091_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "this is the city where I lived (use C'est la ville où j'habitais)",
      "cues": [
        "This is the city → C'est la ville",
        "where I lived → où j'habitais"
      ],
      "idea_parts": [
        "pointer + head noun → C'est la ville",
        "locative relative → où j'habitais"
      ],
      "target_answer": "C'est la ville où j'habitais",
      "meaning": "This is the city where I used to live",
      "word_bank": [
        "C'est",
        "ville",
        "où",
        "ou",
        "que",
        "j'habitais",
        "la"
      ],
      "explanation": "où (with grave accent) links la ville to j'habitais.",
      "diagnosis": {
        "slip": "forgot accent on où",
        "cue": "Use accented où ('where') after la ville."
      },
      "id": "fr5091_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Voici le restaurant dont je t'ai parlé",
      "replays": 2,
      "target_answer": "Voici le restaurant dont je t'ai parlé",
      "meaning": "Here is the restaurant I told you about",
      "cues": [
        "Voici le restaurant",
        "dont je t'ai parlé"
      ],
      "explanation": "parler de triggers dont.",
      "affirmation": "You used dont with je t'ai parlé cleanly!",
      "id": "fr5091_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy the complete relative pronoun system (qui, que, dont, où) across subjects, objects, de-verbs, places, and time nouns.",
    "use_example": {
      "german": "Le jour où je suis arrivé dans la ville dont tu parles.",
      "english": "The day when I arrived in the city you're talking about."
    },
    "takeaway": "de-verb → dont; place or 'the day when' → où.",
    "curiosity_teaser": "Up next on Le Pont ([5101] Tout le conditionnel): see how Dont & Où leads directly into Tout le conditionnel."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"This is the city where I used to live\" in French:",
    "target_answer": "C'est la ville où j'habitais",
    "word_bank": [
      "la",
      "ne",
      "C'est",
      "j'habitais",
      "où",
      "pas",
      "ville"
    ],
    "explanation": "Re-constructing \"C'est la ville où j'habitais\" from the underlying rule cements the pattern of Dont & Où."
  }
};

export default lesson;
