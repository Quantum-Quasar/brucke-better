import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1401,
  "slug": "singular-vs-plural-possessions",
  "title": "Singular vs Plural Possessions",
  "subtitle": "mi amigo vs mis amigos, su libro vs sus libros, nuestro/nuestra",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "mi",
    "tu_poss",
    "su",
    "nuestro",
    "amigo",
    "hermano",
    "padre",
    "madre",
    "libro",
    "llave"
  ],
  "table_word_ids": [
    "mi",
    "tu_poss",
    "su",
    "nuestro",
    "amigo",
    "hermano",
    "padre",
    "madre",
    "libro",
    "llave"
  ],
  "hook": {
    "title": "One Owner, Many Possessions",
    "content": "In English, 'my book' and 'my books' use the exact same 'my'. In Spanish, if you own two books or two keys, the possessive MUST put on its plural -s: mis libros, tus llaves, sus amigos!"
  },
  "pattern": {
    "title": "Why 'Los Padres' Means 'The Parents'",
    "content": "In Spanish, the masculine plural of family words covers mixed-gender pairs: el padre ('the father') + la madre ('the mother') = mis padres ('my parents'); el hermano + la hermana = mis hermanos ('my brothers and sisters / siblings')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "my friend",
          "german": "mi amigo"
        },
        {
          "id": "p2",
          "english": "my friends",
          "german": "mis amigos"
        },
        {
          "id": "p3",
          "english": "your key",
          "german": "tu llave"
        },
        {
          "id": "p4",
          "english": "your keys",
          "german": "tus llaves"
        },
        {
          "id": "p5",
          "english": "our house (feminine)",
          "german": "nuestra casa"
        },
        {
          "id": "p6",
          "english": "my parents",
          "german": "mis padres"
        }
      ],
      "target_answer": "mi amigo, mis amigos, tu llave, tus llaves, nuestra casa, mis padres",
      "meaning": "my friend, my friends, your key, your keys, our house (feminine), my parents",
      "explanation": "Possessives pluralize whenever the noun they modify is plural.",
      "id": "es1401_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How does Spanish say 'our books' (masculine plural)?",
      "options": [
        "nuestros libros",
        "nuestro libros",
        "nuestras libros"
      ],
      "target_answer": "nuestros libros",
      "meaning": "our books",
      "explanation": "el libro is masculine plural (los libros), so nuestro becomes nuestros.",
      "id": "es1401_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have my keys here'",
      "target_answer": "Tengo mis llaves aquí",
      "meaning": "I have my keys here",
      "word_bank": [
        "está",
        "Tengo",
        "llaves",
        "aquí",
        "mi",
        "llave",
        "mis"
      ],
      "explanation": "Tengo + mis llaves (plural) + aquí.",
      "id": "es1401_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that your parents live in Madrid",
      "cues": [
        "My parents → Mis padres",
        "live (3rd person plural of vivir) → viven",
        "in Madrid → en Madrid"
      ],
      "idea_parts": [
        "My parents → Mis padres",
        "live → viven",
        "in Madrid → en Madrid"
      ],
      "target_answer": "Mis padres viven en Madrid",
      "meaning": "My parents live in Madrid",
      "word_bank": [
        "Mi",
        "Madrid",
        "vivo",
        "padre",
        "Mis",
        "en",
        "padres",
        "viven"
      ],
      "explanation": "Mis padres viven en Madrid.",
      "id": "es1401_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nuestra madre está aquí",
      "replays": 2,
      "target_answer": "Nuestra madre está aquí",
      "meaning": "Our mother is here",
      "cues": [
        "Our (feminine): Nuestra",
        "mother: madre",
        "is here: está aquí"
      ],
      "explanation": "Nuestra madre está aquí.",
      "affirmation": "Clean feminine agreement on nuestra!",
      "id": "es1401_e5"
    }
  ],
  "summary": {
    "outcome": "Pluralize mi/tu/su to mis/tus/sus and match nuestro/a/os/as to any noun.",
    "use_example": {
      "german": "Mis padres están en nuestra casa con mis amigos.",
      "english": "My parents are in our house with my friends."
    },
    "takeaway": "Plural noun = plural possessive (mis, tus, sus, nuestros, nuestras).",
    "curiosity_teaser": "Up next ([1402] Disambiguating su): see why 'su' covers five English words and how Spanish makes it crystal clear."
  },
  "twist": {
    "prompt": "Assemble: 'Where are your keys?'",
    "target_answer": "Dónde están tus llaves",
    "word_bank": [
      "llaves",
      "mi",
      "están",
      "tus",
      "tu",
      "está",
      "Dónde"
    ],
    "explanation": "¿Dónde están tus llaves? uses plural están + tus llaves."
  }
};

export default lesson;
