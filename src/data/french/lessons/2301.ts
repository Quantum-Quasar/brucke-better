import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2301,
  "slug": "lesson-2301",
  "title": "The Full Left-Walk",
  "subtitle": "je te vois, tu me comprends, il nous écoute — direct object pronouns walking before the verb.",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "me",
    "te",
    "le",
    "la",
    "nous",
    "vous",
    "voir",
    "comprendre",
    "inviter",
    "attendre"
  ],
  "table_word_ids": [
    "me",
    "te",
    "le",
    "la",
    "nous",
    "vous",
    "voir",
    "comprendre",
    "inviter",
    "attendre"
  ],
  "hook": {
    "title": "The Full Left-Walk: Direct Objects Across Every Person",
    "content": "Direct object pronouns walk left of the verb across all persons: me/m' ('me'), te/t' ('you'), le/l' ('him/it'), la/l' ('her/it'), nous ('us'), vous ('you'), les ('them'). And in an infinitive chain (Je veux te voir, Je vais l'inviter), the pronoun stands right in front of the infinitive!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'I am waiting for you' is simply Je t'attends",
        "content": "Because attendre already has 'for' built inside its meaning, 'you' is a direct object: te elides before attends → Je t'attends!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Single Verb: Pronoun Before Verb; Infinitive Chain: Pronoun Before Infinitive",
    "content": "Place direct object pronouns before the conjugated verb or before the infinitive.",
    "linguist_note": "Modern French places object clitics immediately before the lexical infinitive in modal/aspectual constructions.",
    "trap_note": "Don't add pour in 'I am waiting for you' (*J'attends pour toi) — use a direct left-walking pronoun: Je t'attends!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each French sentence with its English meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Je te vois",
          "german": "I see you"
        },
        {
          "id": "p2",
          "english": "Je t'attends (no 'for' needed!)",
          "german": "I am waiting for you"
        },
        {
          "id": "p3",
          "english": "Tu m'écoutes ? (no 'to' needed!)",
          "german": "Are you listening to me?"
        },
        {
          "id": "p4",
          "english": "Il nous comprend",
          "german": "He understands us"
        },
        {
          "id": "p5",
          "english": "Je vais t'inviter (before infinitive!)",
          "german": "I am going to invite you"
        }
      ],
      "target_answer": "I see you, I am waiting for you, Are you listening to me?, He understands us, I am going to invite you",
      "meaning": "Je te vois, Je t'attends (no 'for' needed!), Tu m'écoutes ? (no 'to' needed!), Il nous comprend, Je vais t'inviter (before infinitive!)",
      "explanation": "me, te, le, la elide to m', t', l' before a vowel; in infinitive chains, the pronoun hugs the infinitive.",
      "id": "fr2301_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Where does 'you' (te) go in 'I want to see you tonight'?",
      "options": [
        "Je veux voir te ce soir",
        "Je veux te voir ce soir",
        "Je te veux voir ce soir"
      ],
      "target_answer": "Je veux te voir ce soir",
      "meaning": "I want to see you tonight",
      "explanation": "te is the object of voir, so it stands right in front of voir: Je veux te voir!",
      "id": "fr2301_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word structure of 'Je vais l'inviter'?",
      "german": "Je vais l'inviter",
      "natural": "I am going to invite him/her",
      "options": [
        "I am going to invite him/her",
        "I him/her go to invite",
        "I go him/her-to-invite"
      ],
      "target_answer": "I go him/her-to-invite",
      "meaning": "Literal structure: I go him/her-to-invite",
      "explanation": "l' stands right in front of the infinitive inviter.",
      "id": "fr2301_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am waiting for you at the station",
      "cues": [
        "I you wait-for → Je t'attends",
        "at the station → à la gare"
      ],
      "idea_parts": [
        "subject + object + verb → Je t'attends",
        "location → à la gare"
      ],
      "target_answer": "Je t'attends à la gare",
      "meaning": "I am waiting for you at the station",
      "word_bank": [
        "te",
        "la",
        "Je",
        "t'attends",
        "pour",
        "gare",
        "à"
      ],
      "explanation": "te elides before attends: Je t'attends.",
      "diagnosis": {
        "slip": "used pour or un-elided te",
        "cue": "attendre needs no 'for', and te elides to t': Je t'attends."
      },
      "id": "fr2301_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Est-ce que vous me comprenez bien",
      "replays": 2,
      "target_answer": "Est-ce que vous me comprenez bien",
      "meaning": "Do you understand me well?",
      "cues": [
        "Est-ce que",
        "vous me comprenez bien"
      ],
      "explanation": "me walks left of comprenez.",
      "affirmation": "You placed me right before comprenez!",
      "id": "fr2301_e5"
    }
  ],
  "summary": {
    "outcome": "Place direct object pronouns before conjugated verbs and before infinitives.",
    "use_example": {
      "german": "Je t'attends ici et je vais t'aider.",
      "english": "I'm waiting for you here and I'm going to help you."
    },
    "takeaway": "Single verb: Je te vois; Infinitive chain: Je veux te voir.",
    "curiosity_teaser": "Up next on Le Pont ([2302] lui & leur): see how The Full Left-Walk leads directly into lui & leur."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am waiting for you at the station\" in French:",
    "target_answer": "Je t'attends à la gare",
    "word_bank": [
      "ne",
      "à",
      "Je",
      "la",
      "t'attends",
      "gare",
      "pas"
    ],
    "explanation": "Re-constructing \"Je t'attends à la gare\" from the underlying rule cements the pattern of The Full Left-Walk."
  }
};

export default lesson;
