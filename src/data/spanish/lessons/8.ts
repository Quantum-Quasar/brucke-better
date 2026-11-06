import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 8,
  "slug": "ico-and-al-bridges",
  "title": "The -ico & -al Bridges",
  "subtitle": "Adjectives in -ico with mandatory tildes, and invariable -al cognates",
  "phase": 2,
  "shift_categories": [
    "ico",
    "al"
  ],
  "word_ids": [
    "mágico",
    "público",
    "básico",
    "económico",
    "clásico",
    "fantástico",
    "natural",
    "central",
    "formal",
    "personal"
  ],
  "table_word_ids": [
    "mágico",
    "público",
    "básico",
    "económico",
    "clásico",
    "fantástico",
    "natural",
    "central",
    "formal",
    "personal"
  ],
  "hook": {
    "title": "Two Instant Adjective Bridges",
    "content": "Welcome to Phase 2! Just as -ción and -dad handed you thousands of nouns, two suffixes hand you hundreds of descriptive adjectives on sight: English -ic / -ical becomes Spanish -ico / -ica (mágico, público, básico, económico, clásico, fantástico), and English -al stays spelled -al (natural, central, formal, personal, internacional, cultural)!"
  },
  "pattern": {
    "title": "The Esdrújula Accent on -ico vs Final Stress on -al",
    "content": "Every single -ico/-ica word in Spanish carries a written accent mark on the vowel RIGHT BEFORE -ico: MÁ-gi-co, PÚ-bli-co, BÁ-si-co, fan-TÁS-ti-co! Meanwhile, every -al word stresses the final syllable (na-tu-RAL, cen-TRAL) and NEVER changes for masculine vs feminine in the singular: el hotel central, la casa central!",
    "linguist_note": "Words stressed on the third-from-last syllable (esdrújulas) always carry a written accent mark in Spanish orthography.",
    "trap_note": "Never add an *-a to -al adjectives for feminine nouns (*una idea naturala is impossible). Say una idea natural!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "magical",
          "german": "mágico"
        },
        {
          "id": "p2",
          "english": "public",
          "german": "público"
        },
        {
          "id": "p3",
          "english": "basic",
          "german": "básico"
        },
        {
          "id": "p4",
          "english": "fantastic",
          "german": "fantástico"
        },
        {
          "id": "p5",
          "english": "natural (invariable)",
          "german": "natural"
        },
        {
          "id": "p6",
          "english": "central (invariable)",
          "german": "central"
        }
      ],
      "target_answer": "mágico, público, básico, fantástico, natural, central",
      "meaning": "magical, public, basic, fantastic, natural (invariable), central (invariable)",
      "explanation": "-ic/-ical → accented -ico/-ica; -al → invariable -al.",
      "id": "es8_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Convert 'fantastic' into Spanish by snapping the accented stem and -ico together:",
      "tile_options": [
        "ic",
        "fantást",
        "al",
        "ico"
      ],
      "target_answer": "fantástico",
      "meaning": "fantástico (fantastic)",
      "explanation": "fantástico carries an esdrújula accent on the third syllable from the end.",
      "id": "es8_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert English 'classic / classical' into its masculine Spanish adjective (remember the accent!):",
      "english_hint": "classic → -ico with tilde",
      "target_answer": "clásico",
      "meaning": "classic, classical",
      "explanation": "classic → clásico (single s, accent on á).",
      "id": "es8_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The hotel is central and fantastic'",
      "target_answer": "El hotel es central y fantástico",
      "meaning": "The hotel is central and fantastic",
      "word_bank": [
        "es",
        "fantástica",
        "fantástico",
        "y",
        "El",
        "La",
        "hotel",
        "está",
        "central"
      ],
      "explanation": "El hotel es central (invariable -al) y fantástico (masculine -ico).",
      "id": "es8_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that it is a personal opinion",
      "cues": [
        "It is → Es",
        "a opinion (feminine) → una opinión",
        "personal (after noun, invariable) → personal"
      ],
      "idea_parts": [
        "It is → Es",
        "an opinion → una opinión",
        "personal → personal"
      ],
      "target_answer": "Es una opinión personal",
      "meaning": "It is a personal opinion",
      "word_bank": [
        "personal",
        "mágico",
        "público",
        "opinión",
        "Es",
        "una",
        "un"
      ],
      "explanation": "Es una opinión personal — personal follows opinión and needs no -a ending because it ends in -l!",
      "diagnosis": {
        "slip": "put personal before opinión",
        "cue": "Place descriptive adjectives after the noun in Spanish: una opinión personal."
      },
      "id": "es8_e5"
    }
  ],
  "summary": {
    "outcome": "Convert -ic/-ical adjectives to accented -ico/-ica and use -al adjectives as gender-invariable descriptors.",
    "use_example": {
      "german": "Es un hotel central y fantástico.",
      "english": "It is a central and fantastic hotel."
    },
    "takeaway": "Every -ico/-ica word wears a written tilde; every -al word is gender-invariable in the singular.",
    "curiosity_teaser": "Up next ([801] The Esdrújula Accent Gym): train your voice and eye on the rhythmic antepenultimate stress of -ico words."
  },
  "twist": {
    "prompt": "Assemble: 'The music is fantastic'",
    "target_answer": "La música es fantástica",
    "word_bank": [
      "música",
      "fantástica",
      "La",
      "fantástico",
      "es",
      "está",
      "El"
    ],
    "explanation": "La música (feminine) triggers fantástica (-ica)."
  },
  "foreshadow": {
    "line": "Now that you can describe formal and personal situations, Topic 9 shows how Spanish encodes formal vs personal right into 'you' (tú vs usted).",
    "resolvedIn": 9
  },
  "payoff": {
    "ofLesson": 7,
    "text": "The accent mark rule you saw on question words in Topic 7 now guides your voice on every -ico adjective."
  }
};

export default lesson;
