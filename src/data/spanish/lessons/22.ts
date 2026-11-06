import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 22,
  "slug": "double-object-pronouns",
  "title": "Double Object Pronouns",
  "subtitle": "me lo da, te lo digo — pronouns stacking before the verb, and le lo becoming se lo",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "me",
    "te",
    "nos",
    "le",
    "se",
    "lo",
    "la",
    "dar",
    "decir",
    "explicar"
  ],
  "table_word_ids": [
    "me",
    "te",
    "nos",
    "le",
    "se",
    "lo",
    "la",
    "dar",
    "decir",
    "explicar"
  ],
  "hook": {
    "title": "People Before Things: The Pronoun Highway",
    "content": "In Topic 1 you learned that 'it' (lo / la) walks in front of the verb: Lo quiero ('I want it'). What happens when you have BOTH a person ('to me / to you / to us': me, te, nos) AND a thing ('it': lo, la) — like 'He gives it to me' or 'I tell it to you'? Both pronouns walk in front of the verb, and the rule is universal: **People come BEFORE Things**! Me lo da ('To-me it he-gives'), Te lo digo ('To-you it I-say'), Nos lo explica ('To-us it he-explains')!"
  },
  "pattern": {
    "title": "The Famous 'Se Lo' Rule: Why *Le Lo Becomes 'Se Lo'!",
    "content": "What if you want to say 'I give it to him / to her / to usted'? The indirect pronoun for 'to him / to her / to usted' is le, and 'it' is lo. Try saying *le lo out loud — two L-syllables in a row feel like a tongue-twister! In Old Spanish, *le lo evolved into ge lo and then softened into **se lo**: Se lo doy ('To-him/her/usted it I-give'), Se lo digo ('I tell it to him/her/usted')!",
    "linguist_note": "Latin illī illum evolved in Old Castilian to gelo (/ʒelo/), which later merged phonetically with reflexive se into modern se lo.",
    "trap_note": "Never write *le lo, *le la, *les lo, or *les la! The moment le or les stands before lo/la/los/las, it puts on the disguise 'se'!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to me + it (masculine)",
          "german": "me lo"
        },
        {
          "id": "p2",
          "english": "to you + it (masculine)",
          "german": "te lo"
        },
        {
          "id": "p3",
          "english": "to us + it (masculine)",
          "german": "nos lo"
        },
        {
          "id": "p4",
          "english": "to him/her/usted/them + it (never *le lo!)",
          "german": "se lo"
        },
        {
          "id": "p5",
          "english": "I give (1st sg. of dar)",
          "german": "doy"
        },
        {
          "id": "p6",
          "english": "I say / I tell (1st sg. of decir)",
          "german": "digo"
        }
      ],
      "target_answer": "me lo, te lo, nos lo, se lo, doy, digo",
      "meaning": "to me + it (masculine), to you + it (masculine), to us + it (masculine), to him/her/usted/them + it (never *le lo!), I give (1st sg. of dar), I say / I tell (1st sg. of decir)",
      "explanation": "Indirect person (me, te, nos, se) always precedes direct object (lo, la, los, las).",
      "id": "es22_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish decir ('to say / tell', yo digo 'I say') comes from Latin dīcere. Which English word for 'speaking aloud so someone can write it down' comes from the exact same root?",
      "target_answer": "dictate",
      "meaning": "to dictate (or diction / predict) is literally the Latin root of decir ('to say')!",
      "explanation": "Latin dīcere / dictāre gave Spanish decir (digo) and English dictate, diction, dictionary, predict.",
      "id": "es22_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Why does Spanish say 'Se lo doy' instead of *Le lo doy for 'I give it to him/her'?",
      "options": [
        "Whenever le or les is followed by lo/la/los/las, Spanish changes le/les to se to avoid two L-pronouns in a row",
        "Because se means 'I'",
        "Because doy is reflexive"
      ],
      "target_answer": "Whenever le or les is followed by lo/la/los/las, Spanish changes le/les to se to avoid two L-pronouns in a row",
      "meaning": "I give it to him / her / usted",
      "explanation": "Two L-pronouns in a row (*le lo, *les la) are forbidden in Spanish — the first one always transforms into se!",
      "id": "es22_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I tell it to you'",
      "target_answer": "Te lo digo",
      "meaning": "I tell it to you",
      "word_bank": [
        "Lo",
        "le",
        "lo",
        "digo",
        "Te",
        "te"
      ],
      "explanation": "Te ('to you', person first) + lo ('it', thing second) + digo ('I tell').",
      "id": "es22_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Se lo doy hoy'?",
      "german": "Se lo doy hoy",
      "natural": "I give it to him/her today",
      "options": [
        "It to-him I give today",
        "I give it to him/her today",
        "To-him/her it I-give today",
        "Himself it gives today"
      ],
      "target_answer": "To-him/her it I-give today",
      "meaning": "I give it to him/her today (literal Spanish blueprint: To-him/her it I-give today)",
      "explanation": "Se ('To-him/her/usted') + lo ('it') + doy ('I-give') + hoy ('today').",
      "id": "es22_e5"
    }
  ],
  "summary": {
    "outcome": "Stack indirect + direct object pronouns (me lo, te lo, nos lo) and apply the se lo rule.",
    "use_example": {
      "german": "Te lo digo hoy y se lo doy mañana.",
      "english": "I tell it to you today and I give it to him/her tomorrow."
    },
    "takeaway": "People before things (me lo, te lo, nos lo) — and whenever le/les meets lo/la, it becomes se lo / se la!",
    "curiosity_teaser": "Up next ([2201] The Pronoun Highway Order): drill me lo, te la, and nos lo across dar, decir, and explicar."
  },
  "twist": {
    "prompt": "Assemble: 'I give it to him today'",
    "target_answer": "Se lo doy hoy",
    "word_bank": [
      "lo",
      "digo",
      "Se",
      "Le",
      "me",
      "doy",
      "hoy"
    ],
    "explanation": "Se lo doy hoy (never *Le lo doy!)."
  },
  "foreshadow": {
    "line": "Next in Topic 23: how to choose between lo/la and le when only ONE object pronoun is on stage — plus Spanish's famous 'personal a'!",
    "resolvedIn": 23
  },
  "payoff": {
    "ofLesson": 21,
    "text": "Having mastered single pronouns in Phase 1 and comparisons in Phase 3, you now control two-pronoun clusters in Phase 4."
  }
};

export default lesson;
