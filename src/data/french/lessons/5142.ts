import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5142,
  "slug": "lesson-5142",
  "title": "La Musique, Le Cinéma & Le Livre",
  "subtitle": "Talking about arts, cinema, books, and passions with aimer and préférer.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "musique",
    "cinéma",
    "livre",
    "histoire",
    "aimé",
    "préférer",
    "aller",
    "voir"
  ],
  "table_word_ids": [
    "musique",
    "cinéma",
    "livre",
    "histoire",
    "aimé",
    "préférer",
    "aller",
    "voir"
  ],
  "hook": {
    "title": "Cultural Passions: La Musique, Le Cinéma & Les Livres",
    "content": "Because aimer ('to like/love'), adorer ('to adore'), and préférer ('to prefer') talk about a passion as a whole category, they ALWAYS take the definite article le, la, l', les: J'aime la musique ('I love music'), J'adore le cinéma ('I love cinema'), Je préfère les livres ('I prefer books')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'le livre' is a book, 'la librairie' is a bookshop, and 'la bibliothèque' is a library",
        "content": "Latin liber ('book') gave French le livre and la librairie ('bookshop'), while Greek bibliothēkē gave French la bibliothèque ('lending library')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "aimer / adorer / préférer + le / la / l' / les",
    "content": "Always include the definite article when talking about your cultural passions.",
    "linguist_note": "Generic objects of verbs of appreciation require definite determiners in French.",
    "trap_note": "Never drop la or le in 'I love music and cinema' (*J'aime musique et cinéma) — always say J'aime la musique et le cinéma!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each cultural passion phrase with its French equivalent:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I love music (definite la!)",
          "german": "J'aime la musique"
        },
        {
          "id": "p2",
          "english": "I prefer the movies / cinema (definite le!)",
          "german": "Je préfère le cinéma"
        },
        {
          "id": "p3",
          "english": "a good book (masculine le livre)",
          "german": "un bon livre"
        },
        {
          "id": "p4",
          "english": "at the cinema (à + le)",
          "german": "au cinéma"
        },
        {
          "id": "p5",
          "english": "at the bookshop (false friend!)",
          "german": "à la librairie"
        }
      ],
      "target_answer": "J'aime la musique, Je préfère le cinéma, un bon livre, au cinéma, à la librairie",
      "meaning": "I love music (definite la!), I prefer the movies / cinema (definite le!), a good book (masculine le livre), at the cinema (à + le), at the bookshop (false friend!)",
      "explanation": "Passions always wear their definite article after aimer and préférer.",
      "id": "fr5142_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I like music and French cinema'?",
      "options": [
        "J'aime la musique et le cinéma français",
        "J'aime musique et cinéma français",
        "J'aime de la musique et du cinéma français"
      ],
      "target_answer": "J'aime la musique et le cinéma français",
      "meaning": "aimer always takes definite la musique and le cinéma",
      "explanation": "Never leave nouns bare or use partitives after aimer.",
      "id": "fr5142_e2"
    },
    {
      "type": "derive",
      "prompt": "Translate 'I prefer the book' using 'Je préfère' + 'the book':",
      "english_hint": "le livre is masculine",
      "target_answer": "Je préfère le livre",
      "meaning": "I prefer the book",
      "explanation": "Je préfère le livre.",
      "id": "fr5142_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "we are going to the cinema tonight because I love this movie (use ce film)",
      "cues": [
        "We go to the cinema tonight → On va au cinéma ce soir",
        "because I love this movie → parce que j'aime ce film"
      ],
      "idea_parts": [
        "plan → On va au cinéma ce soir",
        "reason → parce que j'aime ce film"
      ],
      "target_answer": "On va au cinéma ce soir parce que j'aime ce film",
      "meaning": "We're going to the cinema tonight because I love this movie",
      "word_bank": [
        "ce",
        "On",
        "au",
        "soir",
        "parce",
        "cinéma",
        "va",
        "à",
        "que",
        "ce",
        "la",
        "film",
        "j'aime"
      ],
      "explanation": "au cinéma (à + le) + parce que j'aime ce film.",
      "diagnosis": {
        "slip": "used à cinéma",
        "cue": "Fuse à + le into au cinéma."
      },
      "id": "fr5142_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'ai acheté un bon livre à la librairie",
      "replays": 2,
      "target_answer": "J'ai acheté un bon livre à la librairie",
      "meaning": "I bought a good book at the bookshop",
      "cues": [
        "J'ai acheté un bon livre",
        "à la librairie"
      ],
      "explanation": "un bon livre (masculine) + à la librairie (bookshop).",
      "affirmation": "You paired un bon livre and à la librairie cleanly.",
      "id": "fr5142_e5"
    }
  ],
  "summary": {
    "outcome": "Discuss music, cinema, books, and passions using mandatory definite articles after aimer, adorer, and préférer.",
    "use_example": {
      "german": "J'adore la musique, mais ce soir je préfère lire un bon livre.",
      "english": "I love music, but tonight I prefer to read a good book."
    },
    "takeaway": "After aimer/adorer/préférer, always keep le, la, l', les (J'aime la musique).",
    "curiosity_teaser": "Up next on Le Pont ([5151] La Tête, La Main & Le Cœur): see how La Musique, Le Cinéma & Le Livre leads directly into La Tête, La Main & Le Cœur."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We're going to the cinema tonight because I love this movie\" in French:",
    "target_answer": "On va au cinéma ce soir parce que j'aime ce film",
    "word_bank": [
      "au",
      "film",
      "parce",
      "On",
      "pas",
      "ce",
      "que",
      "soir",
      "ne",
      "ce",
      "j'aime",
      "va",
      "cinéma"
    ],
    "explanation": "Re-constructing \"On va au cinéma ce soir parce que j'aime ce film\" from the underlying rule cements the pattern of La Musique, Le Cinéma & Le Livre."
  }
};

export default lesson;
