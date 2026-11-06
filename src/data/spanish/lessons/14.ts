import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 14,
  "slug": "possessives-agree-with-thing",
  "title": "Possessives Agree with the Thing",
  "subtitle": "mi, tu, su, mis, tus, sus — possessives agree with the possession, not the owner",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mi",
    "tu_poss",
    "su",
    "nuestro",
    "padre",
    "madre",
    "hermano",
    "amigo",
    "casa",
    "libro"
  ],
  "table_word_ids": [
    "mi",
    "tu_poss",
    "su",
    "nuestro",
    "padre",
    "madre",
    "hermano",
    "amigo",
    "casa",
    "libro"
  ],
  "hook": {
    "title": "Look at the Possession, Not the Owner!",
    "content": "In English, you choose 'his' or 'her' by looking at the owner ('Paul's mother' = his mother; 'María's book' = her book). In Spanish, possessives look forward at the THING OWNED! Mi ('my'), tu ('your', informal — no accent!), and su ('his, her, its, your-formal, or their') only change for SINGULAR vs PLURAL: mi libro → mis libros, tu amigo → tus amigos, su casa → sus casas! Meanwhile, nuestro ('our') changes for both gender and number: nuestro padre, nuestra madre, nuestros amigos, nuestras casas."
  },
  "pattern": {
    "title": "Unaccented 'tu' ('your') vs Accented 'tú' ('you')",
    "content": "Here is why written accents matter so much in Spanish: tú (with an accent) is the subject pronoun 'you' (Tú tienes), while tu (without an accent) is the possessive 'your' (tu casa 'your house')!",
    "linguist_note": "Latin meus, tuus, suus reduced in proclitic position to mi, tu, su before nouns.",
    "trap_note": "Never write an accent on possessive tu ('your': tu libro) or mi ('my': mi casa). Accented tú means 'you' and accented mí means 'me' after a preposition (para mí)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "my (singular / plural: mis)",
          "german": "mi"
        },
        {
          "id": "p2",
          "english": "your (informal, no accent! / plural: tus)",
          "german": "tu"
        },
        {
          "id": "p3",
          "english": "his, her, your-formal, their (plural: sus)",
          "german": "su"
        },
        {
          "id": "p4",
          "english": "our (nuestro / nuestra / nuestros / nuestras)",
          "german": "nuestro"
        },
        {
          "id": "p5",
          "english": "father (plural los padres = parents)",
          "german": "el padre"
        },
        {
          "id": "p6",
          "english": "mother",
          "german": "la madre"
        }
      ],
      "target_answer": "mi, tu, su, nuestro, el padre, la madre",
      "meaning": "my (singular / plural: mis), your (informal, no accent! / plural: tus), his, her, your-formal, their (plural: sus), our (nuestro / nuestra / nuestros / nuestras), father (plural los padres = parents), mother",
      "explanation": "mi/tu/su add -s for plural possessions (mis/tus/sus); nuestro agrees in both gender and number.",
      "id": "es14_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish hermano ('brother', hermana 'sister') comes from Latin frāter germānus ('full/genuine brother'). Which English adjective meaning 'closely relevant or belonging to the same family of ideas' is its exact twin?",
      "target_answer": "germane",
      "meaning": "something 'germane' to a topic belongs to the same nuclear family!",
      "explanation": "Latin germānus ('of the same parents/seed') gave English germane and Spanish hermano.",
      "id": "es14_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'my friends' in Spanish?",
      "options": [
        "mi amigos",
        "mis amigo",
        "mis amigos"
      ],
      "target_answer": "mis amigos",
      "meaning": "my friends",
      "explanation": "Because amigos is plural, mi adds -s: mis amigos.",
      "id": "es14_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Our family is big'",
      "target_answer": "Nuestra familia es grande",
      "meaning": "Our family is big",
      "word_bank": [
        "grande",
        "Nuestra",
        "Nuestras",
        "familia",
        "Nuestro",
        "está",
        "es"
      ],
      "explanation": "la familia is feminine singular, so nuestro becomes nuestra: Nuestra familia es grande.",
      "id": "es14_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend where their house is: 'Where is your house?'",
      "cues": [
        "Where is (location) → ¿Dónde está",
        "your (unaccented tu) house → tu casa?"
      ],
      "idea_parts": [
        "Where is → Dónde está",
        "your house → tu casa"
      ],
      "target_answer": "Dónde está tu casa",
      "meaning": "Where is your house?",
      "word_bank": [
        "es",
        "tú",
        "tus",
        "tu",
        "mi",
        "casa",
        "Dónde",
        "está"
      ],
      "explanation": "¿Dónde está tu casa? — unaccented tu means 'your'.",
      "diagnosis": {
        "slip": "used accented tú before casa",
        "cue": "tú with a tilde means 'you'; unaccented tu means 'your': tu casa."
      },
      "id": "es14_e5"
    }
  ],
  "summary": {
    "outcome": "Match mi/mis, tu/tus, su/sus in number and nuestro/a/os/as in gender and number with the possession.",
    "use_example": {
      "german": "Mi padre, mi madre y mis hermanos viven en nuestra casa.",
      "english": "My father, my mother, and my siblings live in our house."
    },
    "takeaway": "mi, tu, and su care only whether the possession is singular or plural; nuestro cares about gender too.",
    "curiosity_teaser": "Up next ([1401] Singular vs Plural Possessions): drill mi/mis, tu/tus, and nuestro/nuestra across family and objects."
  },
  "twist": {
    "prompt": "Assemble: 'They are my friends'",
    "target_answer": "Son mis amigos",
    "word_bank": [
      "Es",
      "Son",
      "amigos",
      "Están",
      "mis",
      "mi"
    ],
    "explanation": "Son mis amigos — plural verb son + plural mis amigos."
  },
  "foreshadow": {
    "line": "You just unlocked the Sentence Gate! In Topic 15, we count from 1 to 100 and discover why Spanish expresses age and hunger with tener.",
    "resolvedIn": 15
  },
  "payoff": {
    "ofLesson": 13,
    "text": "In Topic 13 you saw para mí ('for me', with an accent); now you see why unstressed mi ('my', no accent) omits the tilde!"
  }
};

export default lesson;
