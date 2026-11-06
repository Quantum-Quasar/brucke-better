import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2801,
  "slug": "lesson-2801",
  "title": "The Man That Knows",
  "subtitle": "qui for the subject after the gap (l'homme qui parle), que for the object (le café que je veux).",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "qui",
    "que",
    "homme",
    "ville",
    "train",
    "café",
    "parler",
    "vouloir",
    "aimé"
  ],
  "table_word_ids": [
    "qui",
    "que",
    "homme",
    "ville",
    "train",
    "café",
    "parler",
    "vouloir",
    "aimé"
  ],
  "hook": {
    "title": "qui vs. que: The One-Second Look-Ahead Test",
    "content": "Look at the very first word AFTER the gap: (1) Is it a VERB (parle, arrive, est)? Drop in qui (and NEVER elide qui, even before a vowel!). (2) Is it a SUBJECT PRONOUN or NOUN (je, tu, il, Marie)? Drop in que (or qu' before a vowel)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why qui never drops its -i before a vowel, whereas que always drops its -e",
        "content": "To keep subject (qui) and object (qu') distinct, qui NEVER elides (l'homme qui arrive), while que ALWAYS elides before a vowel (le train qu'il prend)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Gap + Verb → qui; Gap + Subject → que / qu'",
    "content": "Run the one-second look-ahead test across people and things alike.",
    "linguist_note": "Case-marked relativizers qui (nominative) and que (accusative) preserve syntactic role transparency.",
    "trap_note": "Never elide qui (*l'ami qu'arrive) and never omit que (*le livre je lis)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Apply the look-ahead test to match each sentence with qui or que/qu':",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "La femme ___ parle (+ verb parle)",
          "german": "qui (La femme qui parle)"
        },
        {
          "id": "p2",
          "english": "Le train ___ arrive (+ vowel verb arrive)",
          "german": "qui (Le train qui arrive — never elides!)"
        },
        {
          "id": "p3",
          "english": "Le café ___ je prends (+ subject je)",
          "german": "que (Le café que je prends)"
        },
        {
          "id": "p4",
          "english": "L'ami ___ il invite (+ vowel subject il)",
          "german": "qu' (L'ami qu'il invite — que elides!)"
        }
      ],
      "target_answer": "qui (La femme qui parle), qui (Le train qui arrive — never elides!), que (Le café que je prends), qu' (L'ami qu'il invite — que elides!)",
      "meaning": "La femme ___ parle (+ verb parle), Le train ___ arrive (+ vowel verb arrive), Le café ___ je prends (+ subject je), L'ami ___ il invite (+ vowel subject il)",
      "explanation": "Look one word to the right: Verb → qui; Subject → que / qu'.",
      "id": "fr2801_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Fill the two blanks: 'C'est un ami ___ habite à Paris et ___ j'aime beaucoup':",
      "options": [
        "qui habite / que j'aime",
        "qui habite / qui j'aime",
        "qu'habite / que j'aime"
      ],
      "target_answer": "qui habite / que j'aime",
      "meaning": "Before verb habite → qui; before subject j' → que",
      "explanation": "habite is a verb (qui); j'aime has subject j' (que).",
      "id": "fr2801_e2"
    },
    {
      "type": "derive",
      "prompt": "Combine 'Voici le gâteau' + 'Je veux le gâteau' into 'Voici le gâteau ___ je veux':",
      "english_hint": "before subject je, use que",
      "target_answer": "Voici le gâteau que je veux",
      "meaning": "Here is the cake that I want",
      "explanation": "Because subject je follows the gap, use que: Voici le gâteau que je veux.",
      "id": "fr2801_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the restaurant that is here is very good",
      "cues": [
        "The restaurant that is here (+ verb est!) → Le restaurant qui est ici",
        "is very good → est très bon"
      ],
      "idea_parts": [
        "head noun + subject relative → Le restaurant qui est ici",
        "main predicate → est très bon"
      ],
      "target_answer": "Le restaurant qui est ici est très bon",
      "meaning": "The restaurant that is here is very good",
      "word_bank": [
        "qui",
        "la",
        "Le",
        "ici",
        "est",
        "que",
        "très",
        "restaurant",
        "est",
        "bon"
      ],
      "explanation": "Because the verb est follows the gap, use qui.",
      "diagnosis": {
        "slip": "used que instead of qui",
        "cue": "Things take qui whenever they are the subject of the following verb!"
      },
      "id": "fr2801_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est le film qu'elle a vu hier",
      "replays": 2,
      "target_answer": "C'est le film qu'elle a vu hier",
      "meaning": "That is the movie she saw yesterday",
      "cues": [
        "C'est le film",
        "qu'elle a vu hier"
      ],
      "explanation": "que elides before vowel-initial subject elle: qu'elle a vu.",
      "affirmation": "You wrote qu'elle with the elided object relative!",
      "id": "fr2801_e5"
    }
  ],
  "summary": {
    "outcome": "Select qui vs. que/qu' instantaneously by checking whether a verb or a subject follows the gap.",
    "use_example": {
      "german": "Le train qui part maintenant est le train que je voulais prendre.",
      "english": "The train that is leaving now is the train that I wanted to take."
    },
    "takeaway": "Verb after the gap → qui (never elides); Subject after the gap → que / qu' (never omitted).",
    "curiosity_teaser": "Up next on Le Pont ([2802] Que Everywhere): see how The Man That Knows leads directly into Que Everywhere."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The restaurant that is here is very good\" in French:",
    "target_answer": "Le restaurant qui est ici est très bon",
    "word_bank": [
      "ne",
      "est",
      "ici",
      "est",
      "bon",
      "très",
      "qui",
      "pas",
      "restaurant",
      "Le"
    ],
    "explanation": "Re-constructing \"Le restaurant qui est ici est très bon\" from the underlying rule cements the pattern of The Man That Knows."
  }
};

export default lesson;
