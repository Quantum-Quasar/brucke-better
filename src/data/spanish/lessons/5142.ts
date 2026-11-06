import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5142,
  "slug": "musica-cine-libros-pasiones",
  "title": "La Música, El Cine & Los Libros",
  "subtitle": "Talking about music, cinema, and books with me gusta / me encanta + definite article",
  "phase": 4,
  "shift_categories": [
    "ico"
  ],
  "word_ids": [
    "música",
    "cine",
    "libro",
    "gustar",
    "gusta",
    "encantar",
    "clásico",
    "mucho",
    "ir",
    "vamos"
  ],
  "table_word_ids": [
    "música",
    "cine",
    "libro",
    "gustar",
    "gusta",
    "encantar",
    "clásico",
    "mucho",
    "ir",
    "vamos"
  ],
  "hook": {
    "title": "Why Spanish Always Says 'Me Gusta LA Música' (With the Article)!",
    "content": "In English, when you talk about something in general, you drop 'the': 'I love music', 'I like classic books', 'Cinema is fantastic'. In Spanish, remember from Topic 25 that the thing liked is the grammatical SUBJECT of *gustar / encantar* — and in Spanish, general subjects ALWAYS wear their definite article (**el, la, los, las**): **Me encanta la música**, **Me gusta el cine**, **Me gustan los libros clásicos**!"
  },
  "pattern": {
    "title": "Going to the Movies: Vamos al Cine",
    "content": "Because el cine ('the cinema / movie theater') is masculine, 'going to the movies' uses our mandatory contraction **a + el = al**: **Vamos al cine esta noche** ('Let's go to the movies tonight')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I love music (requires la!)",
          "german": "me encanta la música"
        },
        {
          "id": "p2",
          "english": "I like cinema (requires el!)",
          "german": "me gusta el cine"
        },
        {
          "id": "p3",
          "english": "I like classic books (plural → gustan + los!)",
          "german": "me gustan los libros clásicos"
        },
        {
          "id": "p4",
          "english": "let's go to the movies (a + el = al)",
          "german": "vamos al cine"
        },
        {
          "id": "p5",
          "english": "classical music",
          "german": "la música clásica"
        }
      ],
      "target_answer": "me encanta la música, me gusta el cine, me gustan los libros clásicos, vamos al cine, la música clásica",
      "meaning": "I love music (requires la!), I like cinema (requires el!), I like classic books (plural → gustan + los!), let's go to the movies (a + el = al), classical music",
      "explanation": "After gustar and encantar, noun subjects always keep their definite article (el, la, los, las).",
      "id": "es5142_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I love classical music' in Spanish?",
      "options": [
        "*Me encanta música clásica",
        "Me encanta la música clásica",
        "*Yo encanto la música clásica"
      ],
      "target_answer": "Me encanta la música clásica",
      "meaning": "I love classical music",
      "explanation": "Always include la before música: Me encanta la música clásica.",
      "id": "es5142_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Let's go to the movies tonight'",
      "target_answer": "Vamos al cine esta noche",
      "meaning": "Let's go to the movies tonight",
      "word_bank": [
        "este",
        "al",
        "Vamos",
        "noche",
        "esta",
        "el",
        "cine",
        "a"
      ],
      "explanation": "Vamos + al (a + el) + cine + esta noche.",
      "id": "es5142_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you like classic books very much ('Me gustan mucho los libros clásicos')",
      "cues": [
        "To me are pleasing (plural) → Me gustan",
        "very much → mucho",
        "the classic books → los libros clásicos"
      ],
      "idea_parts": [
        "I like very much → Me gustan mucho",
        "classic books → los libros clásicos"
      ],
      "target_answer": "Me gustan mucho los libros clásicos",
      "meaning": "I like classic books very much",
      "word_bank": [
        "libros",
        "clásicos",
        "el",
        "Me",
        "gusta",
        "los",
        "mucho",
        "gustan",
        "clásico"
      ],
      "explanation": "Me gustan mucho los libros clásicos.",
      "id": "es5142_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me encanta la música y el cine",
      "replays": 2,
      "target_answer": "Me encanta la música y el cine",
      "meaning": "I love music and cinema",
      "cues": [
        "I love: Me encanta",
        "the music: la música",
        "and the cinema: y el cine"
      ],
      "explanation": "Me encanta la música y el cine.",
      "affirmation": "Cultural passions with gustar and encantar mastered!",
      "id": "es5142_e5"
    }
  ],
  "summary": {
    "outcome": "Express cultural passions using me gusta/gustan and me encanta/encantan with mandatory definite articles.",
    "use_example": {
      "german": "Me encanta la música clásica, me gustan los libros y vamos al cine esta noche.",
      "english": "I love classical music, I like books, and we're going to the movies tonight."
    },
    "takeaway": "Never drop el/la/los/las when naming things you like after gustar or encantar!",
    "curiosity_teaser": "Next branch ([5151] El Cuerpo, La Ropa & Los Colores): discover why la mano is feminine despite ending in -o!"
  },
  "twist": {
    "prompt": "Assemble: 'Do you like cinema?'",
    "target_answer": "Te gusta el cine",
    "word_bank": [
      "cine",
      "gusta",
      "Te",
      "gustan",
      "el",
      "la",
      "Tú"
    ],
    "explanation": "¿Te gusta el cine?"
  }
};

export default lesson;
