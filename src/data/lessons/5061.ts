import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5061,
  "slug": "speak-hands-for-me",
  "title": "Speak, Hands, for Me!",
  "subtitle": "The du-command is the bare stem: Komm! Lern! Iss! — the imperative you already own",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "kommen",
    "gehen",
    "essen",
    "sprechen",
    "helfen",
    "lernen",
    "trinken",
    "machen"
  ],
  "table_word_ids": [
    "kommen",
    "gehen",
    "essen",
    "sprechen",
    "helfen",
    "lernen",
    "trinken",
    "machen",
    "amerika",
    "geschenk",
    "pilz",
    "schwierig",
    "sterben",
    "wecker",
    "anker"
  ],
  "hook": {
    "title": "The Command You Already Give",
    "content": "Here is a secret: you have been commanding in German your whole life. When you say Speak! or Come here! or Help! — no do-support, no subject, just the bare verb — you are using the ancient Germanic imperative, word for word. German never changed the deal: Komm! Geh! Lern! The du-command is simply the stem with nothing attached — the same weapon Shakespeare's Casca grabs when he shouts 'Speak, hands, for me!' seconds before Caesar falls. English trimmed its endings away; German kept the kit, including a fossil you will recognize: Komm! can wear an optional -e (Komme!), the same final -e that once ended every English command.",
    "footnotes": [
      {
        "marker": "1",
        "interest": true,
        "title": "Speak, Hands, for Me!",
        "content": "Julius Caesar, Act 3, Scene 1: as the conspirators close in, Casca cries 'Speak, hands, for me!' — a bare-stem imperative with no auxiliary. The line is a working demonstration that English's command form is the same construction as Komm! and Sprich!."
      }
    ]
  },
  "pattern": {
    "title": "The Bare Stem — and the Vowel That Stays",
    "content": "The rule is one step: strip -en, and what is left IS the command — lernen → Lern! kommen → Komm! gehen → Geh! trinken → Trink! machen → Mach! No ending, no pronoun. Now the twist you already know from the Thou -st Circuit: verbs whose du-form changes its vowel keep the changed vowel in the command — essen: du isst → Iss! sprechen: du sprichst → Sprich! helfen: du hilfst → Hilf! The command simply borrows whatever stem the du-form uses. (geben will join this club with gib in topic 19.) One warning, honestly: verbs that only UMLAUT in the du-form (du fährst) drop the dots for the command — the command is plain Fahr! The umlaut rides with the -st, not with the stem.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The Optional -e",
        "content": "Komm! and Komme! are both correct — the -e is an older, more formal flavor that survives in songs, poetry and Luther's Bible. English once had the same choice: 'Hear me!' and 'Hear ye!' — and Old English commands ended in the very same -e."
      }
    ]
  },
  "exercises": [
    {
      "id": "l5061_e1",
      "type": "matching_pairs",
      "prompt": "Match each English command with its German twin:",
      "matching_pairs": [
        {
          "id": "im1",
          "english": "come!",
          "german": "Komm!"
        },
        {
          "id": "im2",
          "english": "go!",
          "german": "Geh!"
        },
        {
          "id": "im3",
          "english": "eat!",
          "german": "Iss!"
        },
        {
          "id": "im4",
          "english": "speak!",
          "german": "Sprich!"
        }
      ],
      "target_answer": "Komm, Geh, Iss, Sprich",
      "meaning": "come, go, eat, speak — as commands",
      "explanation": "The command is the bare stem: komm-, geh- — and the e→i stem-changers (Iss!, Sprich!) keep their changed vowel, exactly like their du-forms."
    },
    {
      "id": "l5061_e2",
      "type": "shift_select",
      "prompt": "Command one friend to eat. Du isst — so you say:",
      "options": [
        "Isst!",
        "Esst!",
        "Iss!",
        "Essen Sie!"
      ],
      "target_answer": "Iss!",
      "meaning": "Iss! = eat! (to one friend)",
      "explanation": "essen's du-form is du isst (e→i) — the command keeps that vowel: Iss! The other forms belong to ihr (Esst!) and Sie (Essen Sie!)."
    },
    {
      "id": "l5061_e3",
      "type": "morpheme_tiles",
      "prompt": "Assemble the informal du-command with its object: 'Speak German!'",
      "tile_options": [
        "Deutsch",
        "Sprich",
        "st",
        "t",
        "en"
      ],
      "target_answer": "Sprich Deutsch",
      "meaning": "speak! (German) — speak German!",
      "explanation": "sprechen keeps its e→i vowel in the command: Sprich! — the same stem you drilled in du sprichst."
    },
    {
      "id": "l5061_e4",
      "type": "literal_gloss",
      "prompt": "How does German structure this command word-for-word?",
      "german": "Steh heute früh auf",
      "natural": "Get up early today",
      "options": [
        "Stand today early up",
        "Up-stand early today",
        "You stand today early up",
        "Get up today early"
      ],
      "target_answer": "Stand today early up",
      "meaning": "Get up early today",
      "explanation": "In a du-command, the verb stem 'Steh' takes position 1 with no 'du', while the separable prefix 'auf' still anchors the end of the frame. [Ref: Hilf]"
    },
    {
      "id": "l5061_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the command chain: 'Come and drink tea'",
      "target_answer": "Komm und trink Tee",
      "meaning": "Komm und trink Tee = come and drink tea",
      "vocab_hints": [
        {
          "word": "trink",
          "translation": "drink! (command form)",
          "note": "bare stem of trinken — no ending, no pronoun"
        }
      ],
      "word_bank": [
        "und",
        "trink",
        "mit",
        "Tee",
        "Komm",
        "nicht"
      ],
      "explanation": "Two bare-stem commands chained with und — the way real German dialogue strings orders: Komm! Trink!"
    }
  ],
  "summary": {
    "outcome": "Form du-commands as bare stems, keeping the e→i vowel of stem-changers.",
    "use_example": {
      "german": "Komm und trink Tee!",
      "english": "Come and drink tea!"
    },
    "takeaway": "The du-command is the stem: Lern! Komm! — and stem-changers keep their vowel: Iss! Sprich! Hilf!",
    "curiosity_teaser": "Next: Kommen Sie! Kommt! — the formal and the plural imperatives, plus the one irregular command, Sei!."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Speak, Hands, for Me! (Komm und trink Tee = come and drink tea):",
    "target_answer": "Komm und trink Tee",
    "word_bank": [
      "und",
      "trink",
      "heute",
      "Tee",
      "nicht",
      "Komm"
    ],
    "explanation": "Re-assembling \"Komm und trink Tee\" from scratch locks in the structural pattern of Speak, Hands, for Me! without relying on short-term echo."
  }
};

export default lesson;
