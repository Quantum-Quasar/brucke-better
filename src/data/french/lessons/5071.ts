import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5071,
  "slug": "lesson-5071",
  "title": "Je n'ai pas mangé",
  "subtitle": "The sandwich wraps the auxiliary (je n'ai pas compris, tu n'as pas vu) and déjà slots inside.",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "mangé",
    "compris",
    "vu",
    "pris",
    "fait",
    "déjà",
    "pas",
    "ne",
    "rien",
    "jamais",
    "avoir"
  ],
  "table_word_ids": [
    "mangé",
    "compris",
    "vu",
    "pris",
    "fait",
    "déjà",
    "pas",
    "ne",
    "rien",
    "jamais",
    "avoir"
  ],
  "hook": {
    "title": "Where the Negation Sandwich Sits in the Passé Composé",
    "content": "When a verb has two parts — the auxiliary (j'ai, tu as, je suis) and the past participle (mangé, compris, vu, allé) — the sandwich ALWAYS hugs the conjugated auxiliary, leaving the participle outside at the end: Je n'ai pas mangé, Je n'ai pas compris, Je n'ai jamais vu ce film, Je n'ai rien fait!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Notice how English 'I have never seen / I have already eaten' uses the EXACT same slot!",
        "content": "French puts pas, jamais, rien, and déjà in the exact same middle slot where English puts 'not / never / already' between 'have' and 'seen'!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Subject + ne + Auxiliary + pas/jamais/rien/déjà + Participle",
    "content": "Wrap the auxiliary, never the participle!",
    "linguist_note": "French negative and aspectual adverbs occupy the post-auxiliary position above the past participle.",
    "trap_note": "Never put pas, jamais, rien, or déjà after the participle (*Je n'ai compris pas) — slot them between the auxiliary and the participle!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each past negative or adverbial sentence with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je n'ai pas compris",
          "german": "I didn't understand / haven't understood"
        },
        {
          "id": "p2",
          "english": "Tu n'as pas mangé ?",
          "german": "Haven't you eaten? / Didn't you eat?"
        },
        {
          "id": "p3",
          "english": "Je n'ai jamais vu ça",
          "german": "I have never seen that"
        },
        {
          "id": "p4",
          "english": "Il n'a rien dit / rien fait",
          "german": "He said nothing / did nothing"
        },
        {
          "id": "p5",
          "english": "Nous avons déjà réservé",
          "german": "We have already reserved"
        }
      ],
      "target_answer": "I didn't understand / haven't understood, Haven't you eaten? / Didn't you eat?, I have never seen that, He said nothing / did nothing, We have already reserved",
      "meaning": "Je n'ai pas compris, Tu n'as pas mangé ?, Je n'ai jamais vu ça, Il n'a rien dit / rien fait, Nous avons déjà réservé",
      "explanation": "pas, jamais, rien, and déjà all stand between the auxiliary and the participle!",
      "id": "fr5071_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word order of 'Je n'ai rien fait'?",
      "german": "Je n'ai rien fait",
      "natural": "I didn't do anything",
      "options": [
        "I not-have nothing done",
        "I did nothing not",
        "I didn't do anything"
      ],
      "target_answer": "I not-have nothing done",
      "meaning": "Literal structure: I not-have nothing done",
      "explanation": "rien ('nothing') stands right between n'ai and the participle fait!",
      "id": "fr5071_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I have never visited Lyon'?",
      "options": [
        "Je n'ai visité jamais Lyon",
        "Je n'ai jamais visité Lyon",
        "Je jamais n'ai visité Lyon"
      ],
      "target_answer": "Je n'ai jamais visité Lyon",
      "meaning": "I have never visited Lyon",
      "explanation": "ne...jamais wraps the auxiliary ai, right before visité.",
      "id": "fr5071_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I did not understand the question",
      "cues": [
        "I not-have step → Je n'ai pas",
        "understood the question → compris la question"
      ],
      "idea_parts": [
        "negated auxiliary → Je n'ai pas",
        "participle + object → compris la question"
      ],
      "target_answer": "Je n'ai pas compris la question",
      "meaning": "I did not understand the question",
      "word_bank": [
        "question",
        "la",
        "le",
        "comprendre",
        "Je",
        "compris",
        "pas",
        "n'ai"
      ],
      "explanation": "n'ai pas hugs the auxiliary ai; compris follows after pas.",
      "diagnosis": {
        "slip": "put pas after compris",
        "cue": "Put pas between n'ai and compris: Je n'ai pas compris."
      },
      "id": "fr5071_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Elle n'est pas venue hier soir",
      "replays": 2,
      "target_answer": "Elle n'est pas venue hier soir",
      "meaning": "She didn't come last night",
      "cues": [
        "Elle n'est pas",
        "venue hier soir"
      ],
      "explanation": "In the être house too, n'...pas wraps the auxiliary est: Elle n'est pas venue.",
      "affirmation": "You wrapped n'est pas around the auxiliary before venue!",
      "id": "fr5071_e5"
    }
  ],
  "summary": {
    "outcome": "Position ne…pas, ne…jamais, ne…rien, and déjà around the auxiliary in the passé composé.",
    "use_example": {
      "german": "Je n'ai jamais vu ce film, mais j'ai déjà lu le livre.",
      "english": "I've never seen this movie, but I've already read the book."
    },
    "takeaway": "In the past tense, pas, jamais, rien, and déjà always sit between the auxiliary and the participle.",
    "curiosity_teaser": "Up next on Le Pont ([5072] Avez-vous déjà vu ?): see how Je n'ai pas mangé leads directly into Avez-vous déjà vu ?"
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I did not understand the question\" in French:",
    "target_answer": "Je n'ai pas compris la question",
    "word_bank": [
      "très",
      "compris",
      "la",
      "Je",
      "ne",
      "n'ai",
      "pas",
      "question"
    ],
    "explanation": "Re-constructing \"Je n'ai pas compris la question\" from the underlying rule cements the pattern of Je n'ai pas mangé."
  }
};

export default lesson;
