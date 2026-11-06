import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 701,
  "slug": "sprig-701",
  "title": "Est-ce que Drills",
  "subtitle": "'Is it that': turn statements into questions without moving a single word.",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "est_ce_que",
    "vouloir",
    "avoir",
    "aller",
    "parler",
    "français"
  ],
  "table_word_ids": [
    "est_ce_que",
    "vouloir",
    "avoir",
    "aller",
    "parler",
    "français"
  ],
  "hook": {
    "title": "The Zero-Inversion Question Opener",
    "content": "est-ce que ('is it that') absorbs the question inversion inside itself, leaving your statement untouched after que! And before a vowel-initial pronoun (il, elle, on), que elides to qu': Est-ce qu'il est là ? Est-ce qu'elle parle français ? Est-ce qu'on y va ?",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why Est-ce que is the learner's best friend",
        "content": "With Est-ce que in front, you never have to invert verb and pronoun or worry about word order!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Est-ce que + Consonant Subject; Est-ce qu' + Vowel Subject (il, elle, on)",
    "content": "Snap Est-ce que or Est-ce qu' onto the front of any statement to turn it into a clean question.",
    "linguist_note": "Est-ce que is pronounced /ɛs kə/ before consonants and /ɛs.k‿/ before vowels.",
    "trap_note": "Don't invert the verb when you already used est-ce que (*Est-ce que veux-tu) — keep normal statement order!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each statement with its est-ce que question:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Tu parles français",
          "german": "Est-ce que tu parles français"
        },
        {
          "id": "p2",
          "english": "Vous avez l'heure",
          "german": "Est-ce que vous avez l'heure"
        },
        {
          "id": "p3",
          "english": "Il est ici (vowel subject!)",
          "german": "Est-ce qu'il est ici"
        },
        {
          "id": "p4",
          "english": "Elle vient ce soir (vowel subject!)",
          "german": "Est-ce qu'elle vient ce soir"
        }
      ],
      "target_answer": "Est-ce que tu parles français, Est-ce que vous avez l'heure, Est-ce qu'il est ici, Est-ce qu'elle vient ce soir",
      "meaning": "Tu parles français, Vous avez l'heure, Il est ici (vowel subject!), Elle vient ce soir (vowel subject!)",
      "explanation": "que elides to qu' before il, elle, and on.",
      "id": "fr701_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you turn 'Il a compris' ('He understood') into an est-ce que question?",
      "options": [
        "Est-ce qu'il a compris",
        "Est-ce qu'a-t-il compris",
        "Est-ce que il a compris"
      ],
      "target_answer": "Est-ce qu'il a compris",
      "meaning": "Did he understand?",
      "explanation": "que elides before vowel-initial il: Est-ce qu'il a compris.",
      "id": "fr701_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal structure of 'Est-ce que tu parles français'?",
      "german": "Est-ce que tu parles français",
      "natural": "Do you speak French?",
      "options": [
        "Speak you the French",
        "Is-it that you speak French",
        "Do you speak French?"
      ],
      "target_answer": "Is-it that you speak French",
      "meaning": "Literal structure: Is-it that you speak French",
      "explanation": "Est-ce que literally means 'Is-it that', replacing English 'Do'.",
      "id": "fr701_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "do you have a reservation (polite vous, using Est-ce que)",
      "cues": [
        "Question opener → Est-ce que",
        "you have (polite) → vous avez",
        "a reservation → une réservation"
      ],
      "idea_parts": [
        "opener → Est-ce que",
        "subject + verb → vous avez",
        "object → une réservation"
      ],
      "target_answer": "Est-ce que vous avez une réservation",
      "meaning": "Do you have a reservation?",
      "word_bank": [
        "une",
        "réservation",
        "avez",
        "vous",
        "la",
        "que",
        "as",
        "Est-ce"
      ],
      "explanation": "Est-ce que + vous avez une réservation keeps normal word order.",
      "diagnosis": {
        "slip": "used as instead of avez",
        "cue": "Pair vous with avez after Est-ce que."
      },
      "id": "fr701_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Est-ce que tu veux un café",
      "replays": 2,
      "target_answer": "Est-ce que tu veux un café",
      "meaning": "Do you want a coffee?",
      "cues": [
        "opener: Est-ce que",
        "statement: tu veux un café"
      ],
      "explanation": "Zero word-order change after Est-ce que.",
      "affirmation": "You built the Est-ce que question cleanly.",
      "id": "fr701_e5"
    }
  ],
  "summary": {
    "outcome": "Turn any statement into a question with Est-ce que and elide it to Est-ce qu' before il, elle, on.",
    "use_example": {
      "german": "Est-ce qu'on va au café maintenant ?",
      "english": "Are we going to the café now?"
    },
    "takeaway": "Est-ce que absorbs the inversion so your sentence never has to move.",
    "curiosity_teaser": "Up next on Le Pont ([702] Question-Word Twins): see how Est-ce que Drills leads directly into Question-Word Twins."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"Do you have a reservation\" in French:",
    "target_answer": "Est-ce que vous avez une réservation",
    "word_bank": [
      "ne",
      "Est-ce",
      "avez",
      "réservation",
      "une",
      "pas",
      "vous",
      "que"
    ],
    "explanation": "Re-constructing \"Est-ce que vous avez une réservation\" from the underlying rule cements the pattern of Est-ce que Drills."
  }
};

export default lesson;
