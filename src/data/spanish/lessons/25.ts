import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 25,
  "slug": "gustar-inverted-liking",
  "title": "Gustar: The Inverted Liking",
  "subtitle": "me gusta el café = coffee pleases me — the subject is the thing liked",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "gustar",
    "gusta",
    "encantar",
    "me",
    "te",
    "nos",
    "le",
    "café",
    "música",
    "libro"
  ],
  "table_word_ids": [
    "gustar",
    "gusta",
    "encantar",
    "me",
    "te",
    "nos",
    "le",
    "café",
    "música",
    "libro"
  ],
  "hook": {
    "title": "Why You Don't 'Like' Coffee in Spanish — Coffee Pleases You!",
    "content": "In English, 'I' am the subject and 'coffee' is the object: 'I like coffee'. In Spanish, the relationship is flipped 180 degrees! The verb gustar (cousin of English 'gusto' and 'disgust') literally means **'to be pleasing to'**. So to say 'I like coffee', Spanish says **Me gusta el café** — word for word: **'To-me is-pleasing the coffee'**! Because 'the coffee' is the grammatical SUBJECT doing the pleasing, it wears its definite article (el café, la música), and if the thing you like is PLURAL ('I like books'), gusta adds an -n to agree with the plural subject: **Me gustan los libros** ('To-me are-pleasing the books')!"
  },
  "pattern": {
    "title": "Never Say *Yo Gusto! Use Me, Te, Le, Nos + Gusta / Gustan",
    "content": "Because the person who likes something is the RECIPIENT of the pleasure, you use the exact same indirect object pronouns from Topic 23: **Me** gusta ('I like'), **Te** gusta ('You like'), **Le** gusta ('He/she/usted likes'), **Nos** gusta ('We like')! And to add emphasis or clarity, put **A mí** me gusta, **A ti** te gusta, **A María** le gusta in front!",
    "linguist_note": "Dative experiencer verbs (Spanish me gusta, Italian mi piace) treat the stimulus as grammatical subject and the human experiencer as indirect object.",
    "trap_note": "Never say *Yo gusto el café — 'Yo gusto' means 'I am pleasing/attractive to people'! Always start with the indirect pronoun: Me gusta..."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I like the coffee (singular subject → gusta)",
          "german": "me gusta el café"
        },
        {
          "id": "p2",
          "english": "I like the books (plural subject → gustan!)",
          "german": "me gustan los libros"
        },
        {
          "id": "p3",
          "english": "do you like music? (with definite article la!)",
          "german": "¿te gusta la música?"
        },
        {
          "id": "p4",
          "english": "we like Madrid",
          "german": "nos gusta Madrid"
        },
        {
          "id": "p5",
          "english": "I love / am enchanted by (works just like gustar)",
          "german": "me encanta"
        }
      ],
      "target_answer": "me gusta el café, me gustan los libros, ¿te gusta la música?, nos gusta Madrid, me encanta",
      "meaning": "I like the coffee (singular subject → gusta), I like the books (plural subject → gustan!), do you like music? (with definite article la!), we like Madrid, I love / am enchanted by (works just like gustar)",
      "explanation": "gusta agrees with singular nouns or infinitives; gustan agrees with plural nouns.",
      "id": "es25_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish gustar ('to taste / to be pleasing to', from Latin gustāre) entered English inside which enthusiastic noun meaning 'eager enjoyment or zest'?",
      "target_answer": "gusto",
      "meaning": "doing something 'with gusto' is doing it with Spanish/Italian pleasure (gustar)!",
      "explanation": "Latin gustus ('taste, relish') gave Spanish el gusto / gustar and English gusto and disgust.",
      "id": "es25_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Why do we say 'Me GUSTA el café' (without -n) but 'Me GUSTAN los libros' (with -n)?",
      "options": [
        "Because the thing liked is the grammatical subject: singular el café takes 3rd-person singular gusta, while plural los libros takes 3rd-person plural gustan!",
        "Because me is plural",
        "Because libros is masculine"
      ],
      "target_answer": "Because the thing liked is the grammatical subject: singular el café takes 3rd-person singular gusta, while plural los libros takes 3rd-person plural gustan!",
      "meaning": "I like coffee vs I like books",
      "explanation": "The verb gustar agrees with the thing that pleases you, never with the person!",
      "id": "es25_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I like music'",
      "target_answer": "Me gusta la música",
      "meaning": "I like music",
      "word_bank": [
        "Me",
        "gusta",
        "Yo",
        "la",
        "gusto",
        "el",
        "música"
      ],
      "explanation": "Me gusta + la música (always include the definite article el/la/los/las with general nouns after gustar!).",
      "id": "es25_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Me gustan los libros'?",
      "german": "Me gustan los libros",
      "natural": "I like books",
      "options": [
        "I like the books",
        "Me pleases the books",
        "To-me are-pleasing the books",
        "I like books"
      ],
      "target_answer": "To-me are-pleasing the books",
      "meaning": "I like books (literal Spanish blueprint: To-me are-pleasing the books)",
      "explanation": "Me ('To-me') + gustan ('are-pleasing') + los libros ('the books' — the grammatical subject).",
      "id": "es25_e5"
    }
  ],
  "summary": {
    "outcome": "Express likes and loves with me/te/le/nos + gusta (singular/infinitive) and gustan (plural) + definite article.",
    "use_example": {
      "german": "Me gusta la música y me gustan mucho los libros.",
      "english": "I like music and I like books very much."
    },
    "takeaway": "The thing liked is the subject: singular/infinitive = gusta; plural noun = gustan!",
    "curiosity_teaser": "Up next ([2501] gusta vs gustan): drill singular nouns, plural nouns, and infinitives after gustar."
  },
  "twist": {
    "prompt": "Assemble: 'Do you like the coffee?'",
    "target_answer": "Te gusta el café",
    "word_bank": [
      "la",
      "Te",
      "café",
      "Tú",
      "el",
      "gustas",
      "gusta"
    ],
    "explanation": "¿Te gusta el café?"
  },
  "foreshadow": {
    "line": "If 'me gusta' means 'it pleases me' ('I like'), what does 'me gustaría' mean? In Topic 26, we unlock the Conditional ('it would please me' = 'I would like') and the Subjunctive!",
    "resolvedIn": 26
  },
  "payoff": {
    "ofLesson": 23,
    "text": "Remember Dative Pronoun Redundancy from Sprig 2302? That's why Spanish says 'A María le gusta el café' ('To María to-her pleases the coffee')!"
  }
};

export default lesson;
