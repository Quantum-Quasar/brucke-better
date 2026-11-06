import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 27,
  "slug": "il-faut",
  "title": "il faut",
  "subtitle": "'It is needed' — subjectless necessity (il faut partir) and the subjunctive bridge (il faut que tu sois là)",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "faut",
    "soit",
    "que",
    "savoir",
    "connaître",
    "aller",
    "faire",
    "venir"
  ],
  "table_word_ids": [
    "faut",
    "soit",
    "que",
    "savoir",
    "connaître",
    "aller",
    "faire",
    "venir"
  ],
  "hook": {
    "title": "How French Says 'Must' Without Saying Who",
    "content": "When English expresses necessity, it usually points a finger at a person: 'You have to leave', 'We must reserve a table'. French prefers a smoother, subjectless verb: il faut (/il fo/, 'it is necessary / it is needed', from Latin fallere 'to be lacking' — cousin of fault and fail). Drop any infinitive right behind il faut and it covers 'I must, you must, we have to, one needs to' all at once: Il faut partir ('We/you have to leave'). Il faut réserver ('One needs to book').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why il faut comes from the root of 'fail' and 'fault'",
        "content": "Latin fallere meant 'to slip, be lacking'. What is lacking (il me faut du pain = 'bread is lacking to me') is what you NEED!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Two Doors After il faut: Bare Infinitive vs. que + Subjunctive",
    "content": "Door 1 (general or shared obligation): il faut + bare infinitive: Il faut voir ce film ('You/we have to see this movie'). Door 2 (when you need a SPECIFIC person to do something): il faut que + subject + subjunctive verb! Because il faut expresses a wish/necessity rather than a flat fact, the verb after que steps into the subjunctive mood: Il faut que j'y aille ('I have to go there'), Il faut que ce soit prêt ('It has to be ready' — soit is the subjunctive of être, preserved in English 'Honi soit qui mal y pense'!).",
    "linguist_note": "Impersonal falloir replaced Old French estovoir as the primary modal of necessity; when a subordinate subject is specified, que triggers the present subjunctive.",
    "trap_note": "The shortcut your mind will offer: trying to conjugate faut with je or tu (*je faux). falloir is 100% impersonal — its subject is ALWAYS dummy il (Il faut)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each il faut construction with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Il faut partir",
          "german": "We / you / one must leave"
        },
        {
          "id": "p2",
          "english": "Il ne faut pas attendre",
          "german": "We / you must not wait"
        },
        {
          "id": "p3",
          "english": "Il me faut un billet",
          "german": "I need a ticket (lit. a ticket is needed to me)"
        },
        {
          "id": "p4",
          "english": "Il faut que ce soit bon",
          "german": "It has to be good (subjunctive soit)"
        },
        {
          "id": "p5",
          "english": "Il faut savoir",
          "german": "One must know"
        }
      ],
      "target_answer": "We / you / one must leave, We / you must not wait, I need a ticket (lit. a ticket is needed to me), It has to be good (subjunctive soit), One must know",
      "meaning": "Il faut partir, Il ne faut pas attendre, Il me faut un billet, Il faut que ce soit bon, Il faut savoir",
      "explanation": "il faut takes an infinitive, a noun (with me/te/lui), or que + subjunctive.",
      "id": "fr27_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Il me faut du temps'?",
      "german": "Il me faut du temps",
      "natural": "I need some time",
      "options": [
        "It to-me is-needed of-the time",
        "He me needs the time",
        "I need some time"
      ],
      "target_answer": "It to-me is-needed of-the time",
      "meaning": "Literal structure: It to-me is-needed of-the time",
      "explanation": "il (it) + me (to-me) + faut (is-needed) + du temps (some time).",
      "id": "fr27_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'We have to reserve a table' using the everyday impersonal structure?",
      "options": [
        "Nous faut réserver une table",
        "Il faut réserver une table",
        "Il faut à réserver une table"
      ],
      "target_answer": "Il faut réserver une table",
      "meaning": "We/one must reserve a table",
      "explanation": "Il faut chains directly with the bare infinitive réserver.",
      "id": "fr27_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "it is necessary that it be ready (use prêt)",
      "cues": [
        "It is necessary that it be ready → Il faut que ce soit prêt"
      ],
      "idea_parts": [
        "necessity trigger → Il faut que",
        "subjunctive of c'est → ce soit",
        "adjective → prêt"
      ],
      "target_answer": "Il faut que ce soit prêt",
      "meaning": "It has to be ready",
      "word_bank": [
        "soit",
        "prêt",
        "faut",
        "ce",
        "que",
        "Il",
        "c'est",
        "est"
      ],
      "explanation": "After Il faut que, c'est turns into subjunctive ce soit.",
      "diagnosis": {
        "slip": "used c'est instead of ce soit after il faut que",
        "cue": "Il faut que triggers the subjunctive: ce soit."
      },
      "id": "fr27_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il faut venir avec nous ce soir",
      "replays": 2,
      "target_answer": "Il faut venir avec nous ce soir",
      "meaning": "You/we have to come with us tonight",
      "cues": [
        "Necessity + infinitive: Il faut venir",
        "with us tonight: avec nous ce soir"
      ],
      "explanation": "Il faut venir covers 'you must come' or 'we must come' without pointing a finger.",
      "affirmation": "You heard Il faut venir and avec nous ce soir.",
      "id": "fr27_e5"
    }
  ],
  "summary": {
    "outcome": "Express obligation and need with il faut + infinitive, il me faut + noun, and il faut que + subjunctive.",
    "use_example": {
      "german": "Il faut partir maintenant — il me faut mon manteau.",
      "english": "We have to leave now — I need my coat."
    },
    "takeaway": "il faut never changes its subject; pair it with an infinitive for general necessity or que + subjunctive for a specific person.",
    "curiosity_teaser": "Up next on Le Pont ([2701] It Is Needed): see how il faut leads directly into It Is Needed."
  },
  "twist": {
    "prompt": "Ungraded — 'You must not wait here' (wrap ne...pas around faut):",
    "target_answer": "Il ne faut pas attendre ici",
    "word_bank": [
      "attendre",
      "non",
      "ne",
      "ici",
      "faut",
      "pas",
      "Il",
      "la"
    ],
    "explanation": "Il ne faut pas + infinitive means 'must not' (prohibition)."
  },
  "foreshadow": {
    "line": "Having mastered il faut, look ahead to Topic 28 (qui & que), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 28
  },
  "payoff": {
    "ofLesson": 26,
    "text": "The foundation from Topic 26 (The Would-World) now pays off directly inside il faut: every sentence here builds on that earlier step."
  }
};

export default lesson;
