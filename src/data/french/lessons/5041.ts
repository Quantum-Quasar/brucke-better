import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5041,
  "slug": "lesson-5041",
  "title": "Tutoyer & Vouvoyer",
  "subtitle": "Choosing tu vs vous as social verbs, and how on ('one/the man') became spoken French's everyday 'we'.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "tu",
    "vous",
    "on",
    "nous",
    "homme",
    "parler",
    "aller",
    "ami"
  ],
  "table_word_ids": [
    "tu",
    "vous",
    "on",
    "nous",
    "homme",
    "parler",
    "aller",
    "ami"
  ],
  "hook": {
    "title": "Why French Turned 'tu' and 'vous' Into Action Verbs: tutoyer & vouvoyer",
    "content": "French has two verbs just to name the social register choice: tutoyer ('to say tu to someone') and vouvoyer ('to say vous to someone')! When two colleagues become friends, one asks: On peut se tutoyer ? ('Can we use tu with each other?'). And notice that 'we' is expressed by on — the worn-down form of Latin homō ('man/one')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How Latin homō ('man') split into two French words: l'homme and on",
        "content": "Stressed as a noun, Latin homō became l'homme ('the man'). Unstressed in front of a verb, it wore down to on (/ɔ̃/)!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "On se tutoie ? ('Shall we use tu?') and On = Spoken 'We'",
    "content": "Use vous with strangers until invited to switch (On se tutoie ?), and use on + 3rd-person singular verb as your everyday spoken 'we'.",
    "linguist_note": "Grammaticalization of Latin nominative homō into the subject clitic on is unique to Gallo-Romance.",
    "trap_note": "Remember: even when on means 'we', its reflexive pronoun is se (On se tutoie) and its verb is singular (On va, On est)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each social pronoun or verb with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "tutoyer quelqu'un",
          "german": "to address someone as 'tu'"
        },
        {
          "id": "p2",
          "english": "vouvoyer quelqu'un",
          "german": "to address someone as 'vous'"
        },
        {
          "id": "p3",
          "english": "On peut se tutoyer ?",
          "german": "Can we use 'tu' with each other?"
        },
        {
          "id": "p4",
          "english": "on (from Latin homo 'man')",
          "german": "we (everyday speech) / one / people"
        }
      ],
      "target_answer": "to address someone as 'tu', to address someone as 'vous', Can we use 'tu' with each other?, we (everyday speech) / one / people",
      "meaning": "tutoyer quelqu'un, vouvoyer quelqu'un, On peut se tutoyer ?, on (from Latin homo 'man')",
      "explanation": "tutoyer and vouvoyer name the social register choice directly.",
      "id": "fr5041_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "The pronoun 'on' ('one / we') is the unstressed twin of which French noun meaning 'man' (from Latin homō)?",
      "target_answer": "homme",
      "meaning": "l'homme ↔ on (both from Latin homō)",
      "explanation": "Latin nominative homō became unstressed on; accusative hominem became homme!",
      "id": "fr5041_e2"
    },
    {
      "type": "shift_select",
      "prompt": "A new colleague smiles and asks 'On se tutoie ?' What are they inviting you to do?",
      "options": [
        "Go get a coffee together",
        "Speak English instead of French",
        "Switch from polite 'vous' to informal 'tu'"
      ],
      "target_answer": "Switch from polite 'vous' to informal 'tu'",
      "meaning": "se tutoyer = to address each other as 'tu'",
      "explanation": "On se tutoie ? is the classic French milestone of friendship.",
      "id": "fr5041_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we are going to the café together (using everyday On va)",
      "cues": [
        "We go to the café → On va au café + together → ensemble"
      ],
      "idea_parts": [
        "subject + verb → On va",
        "destination + adverb → au café ensemble"
      ],
      "target_answer": "On va au café ensemble",
      "meaning": "We are going to the café together",
      "word_bank": [
        "allons",
        "ensemble",
        "à",
        "va",
        "café",
        "On",
        "au"
      ],
      "explanation": "On va replaces Nous allons in everyday conversation.",
      "diagnosis": {
        "slip": "used allons with On",
        "cue": "Pair On with singular va."
      },
      "id": "fr5041_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ici, tout le monde se tutoie",
      "replays": 2,
      "target_answer": "Ici, tout le monde se tutoie",
      "meaning": "Here, everyone uses 'tu' with each other",
      "cues": [
        "Ici, tout le monde",
        "se tutoie"
      ],
      "explanation": "tout le monde ('everyone') is singular in French!",
      "affirmation": "You wrote tout le monde se tutoie cleanly.",
      "id": "fr5041_e5"
    }
  ],
  "summary": {
    "outcome": "Understand tutoyer/vouvoyer and use on (the worn-down twin of homme) for everyday 'we'.",
    "use_example": {
      "german": "Au travail, on se tutoie tous.",
      "english": "At work, we all use 'tu' with each other."
    },
    "takeaway": "Wait for 'On se tutoie ?' to switch from vous to tu — and use on for everyday 'we'.",
    "curiosity_teaser": "Up next on Le Pont ([5042] On: The Everyday We): see how Tutoyer & Vouvoyer leads directly into On: The Everyday We."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We are going to the café together\" in French:",
    "target_answer": "On va au café ensemble",
    "word_bank": [
      "pas",
      "va",
      "On",
      "ne",
      "au",
      "café",
      "ensemble"
    ],
    "explanation": "Re-constructing \"On va au café ensemble\" from the underlying rule cements the pattern of Tutoyer & Vouvoyer."
  }
};

export default lesson;
