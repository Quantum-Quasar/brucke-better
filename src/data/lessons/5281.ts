import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5281,
  "slug": "berufe-i-arzt-baecker-verkaeufer-polizist-schueler",
  "title": "Berufe I: der Arzt, der Bäcker, der Verkäufer, der Polizist, der Schüler",
  "subtitle": "five jobs for a first conversation — one Greek double-door, one bake, and the prefix English wrote as for-",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "arzt",
    "bäcker",
    "verkäufer",
    "polizist",
    "schüler",
    "termin",
    "computer",
    "österreich",
    "verkaufen",
    "kaufen",
    "brot",
    "lehrer",
    "auto",
    "helfen",
    "mann",
    "buch"
  ],
  "table_word_ids": [
    "arzt",
    "bäcker",
    "verkäufer",
    "polizist",
    "schüler",
    "termin",
    "computer",
    "österreich",
    "verkaufen",
    "kaufen",
    "brot",
    "lehrer",
    "auto",
    "helfen",
    "mann",
    "buch"
  ],
  "hook": {
    "title": "Five Jobs, Four Recipes",
    "content": "der Bäcker is the honest one: backen — English bake, the same Proto-Germanic verb — plus the doer-suffix -er, exactly English's baker. der Verkäufer runs on verkaufen, the shopping verb you already own: ver- + kaufen, and ver- is the prefix English wrote as for- (verboten/forbidden, vergeben/forgive — same old *fra-, 'away'). The gem hides inside: Kauf and English cheap are twins — one old trader-word that German kept as the noun and English narrowed to 'low price', which is why London's old market street is called Cheapside. der Polizist borrows Greek through Latin: Polizei is Greek politeia, 'the city's business' — the same Greek word English took as police, and policy is a cousin; the -ist tail is Greek's agent ending, the same one in artist and dentist. der Schüler borrows a different Greek word: Schule is Greek scholē, 'leisure' — Greek thinking time, turned into lecture, then school; scholar is that same Greek word through Latin. And der Arzt came by the medical door: Latin archiater, 'chief healer', from Greek archi- + iatros — a court physician's title that German heard and kept whole.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Two Greek Doors, One Profession",
        "content": "English and German both wanted a word for the person who treats the sick, and both went shopping in Greek — but at different stalls. German took archiater, the 'chief healer', and squeezed it into Arzt. English took cheirourgia, 'hand-work', and after a long detour through French it arrived as surgeon. Different Greek words, different doors, one profession."
      }
    ]
  },
  "pattern": {
    "title": "Jobs After sein Go Bare",
    "content": "Two rules carry the lesson. 1. After sein, the profession drops the article: Ich bin Verkäufer, Ich bin Lehrer — not ein Verkäufer. English keeps the a; German trusts the noun. 2. The job does its verb: der Bäcker verkauft Brot, der Arzt hilft mir — hilft is helfen's vowel-changed third person, and the doer-suffixes split cleanly: -er for native makes (Bäcker, Verkäufer), -ist for the borrowed Greek ones (Polizist). Plural preview: der Arzt umlauts — die Ärzte — while die Schüler and die Bäcker stay flat.",
    "footnotes": [],
    "linguist_note": "The -er of Verkäufer and the -er of English baker, seller, buyer are the same suffix doing the same job on both sides of the channel — German and English agree on agents. -ist is the Greek -istēs both languages borrowed through Latin. And the pair Kauf/cheap is a reminder that some twins diverge in meaning, not in sound: same trader-word, one kept the trade, one kept the discount."
  },
  "exercises": [
    {
      "id": "l5281_e1",
      "type": "matching_pairs",
      "prompt": "The first-conversation jobs — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "jb1",
          "english": "The baker sells bread",
          "german": "Der Bäcker verkauft Brot"
        },
        {
          "id": "jb2",
          "english": "The doctor helps me",
          "german": "Der Arzt hilft mir"
        },
        {
          "id": "jb3",
          "english": "The policeman knows the man",
          "german": "Der Polizist kennt den Mann"
        },
        {
          "id": "jb4",
          "english": "The pupil reads the book",
          "german": "Der Schüler liest das Buch"
        },
        {
          "id": "jb5",
          "english": "I am a teacher",
          "german": "Ich bin Lehrer"
        },
        {
          "id": "jb6",
          "english": "The pupil from Austria reads at the computer",
          "german": "Der Schüler aus Österreich liest am Computer"
        },
        {
          "id": "jb7",
          "english": "I have an appointment with the doctor",
          "german": "Ich habe einen Termin beim Arzt"
        }
      ],
      "target_answer": "Der Bäcker verkauft Brot, Der Arzt hilft mir, Der Polizist kennt den Mann, Der Schüler liest das Buch, Ich bin Lehrer, Der Schüler aus Österreich liest am Computer, Ich habe einen Termin beim Arzt",
      "meaning": "sell, help, know, read, be a profession",
      "explanation": "Note pair five: after bin the article vanishes — Ich bin Lehrer, not ein Lehrer. The job words do their verbs: the baker verkauft, the Arzt hilft, the Schüler liest."
    },
    {
      "id": "l5281_e2",
      "type": "shift_select",
      "prompt": "'Ich bin _____.' (I am a baker) — which form does German actually say?",
      "options": [
        "einen Bäcker",
        "der Bäcker",
        "ein Bäcker",
        "Bäcker"
      ],
      "target_answer": "Bäcker",
      "meaning": "professions after sein take no article",
      "explanation": "After sein, German states the profession bare: Ich bin Bäcker. The article English needs (a) is exactly the word German leaves at home — one of the first habits worth building."
    },
    {
      "id": "l5281_e3",
      "type": "reverse_cognate",
      "prompt": "German took Greek's 'chief healer' (archiater → Arzt). English took Greek's 'hand-work' (cheirourgia → ___). What is the English word?",
      "options": [
        "surgeon",
        "medic",
        "doctor",
        "physician"
      ],
      "target_answer": "surgeon",
      "meaning": "surgeon is cheirourgia, 'hand-work' — Greek through French",
      "explanation": "surgeon walked from Greek cheirourgia ('hand-work' — cheir is hand) through Latin and Old French into English, while Arzt walked from Greek archiatros ('chief healer') through medieval Latin into German. Two doors from the same language, no borrowing between them."
    },
    {
      "id": "l5281_e4",
      "type": "morpheme_tiles",
      "prompt": "Assemble: 'The salesman sells the car'",
      "tile_options": [
        "Der",
        "Bäcker",
        "Verkäufer",
        "Auto",
        "verkauft",
        "das"
      ],
      "target_answer": "Der Verkäufer verkauft das Auto",
      "meaning": "The salesman sells the car",
      "explanation": "Der Verkäufer verkauft — the profession and its verb are the same word under the suffix, exactly like baker/bakes. The bank's Bäcker reminds you the frame is generic: Der Bäcker verkauft Brot."
    },
    {
      "id": "l5281_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'The doctor helps the child'",
      "target_answer": "Der Arzt hilft dem Kind",
      "meaning": "The doctor helps the child",
      "vocab_hints": [
        {
          "word": "hilft",
          "translation": "helps",
          "note": "helfen in its vowel-changed third person: ich helfe, du hilfst, er hilft. helfen also pulls its helper into the dative — dem Kind, mir."
        }
      ],
      "word_bank": [
        "Polizist",
        "Kind",
        "Verkäufer",
        "hilft",
        "Mann",
        "Der",
        "Arzt",
        "dem"
      ],
      "explanation": "Der Arzt hilft dem Kind — helfen gives its object the dative (dem Kind), the same case you saw in Der Arzt hilft mir. The bank holds two more job words: Der Polizist hilft dem Kind works identically."
    }
  ],
  "summary": {
    "outcome": "Name the five first-conversation jobs, say Ich bin + profession with no article, and split the -er and -ist suffix families.",
    "use_example": {
      "german": "Ich bin Verkäufer — ich verkaufe das Auto.",
      "english": "I am a salesman — I am selling the car."
    },
    "takeaway": "Bäcker is bake + -er; ver- is English for- and Kauf is cheap's twin; Polizist and Schüler are Greek borrowings like police and school; Arzt and surgeon are two different Greek doors to one profession.",
    "curiosity_teaser": "Next: the -er jobs — der Student, der Fahrer, der Sänger, der Bauer, der Arbeiter — and the dweller-family hiding inside Bauer."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Berufe I: der Arzt, der Bäcker, der Verkäufer, der Polizist, der Schüler (The doctor helps the child):",
    "target_answer": "Der Arzt hilft dem Kind",
    "word_bank": [
      "Der",
      "nicht",
      "Kind",
      "Arzt",
      "heute",
      "hilft",
      "dem"
    ],
    "explanation": "Re-assembling \"Der Arzt hilft dem Kind\" from scratch locks in the structural pattern of Berufe I: der Arzt, der Bäcker, der Verkäufer, der Polizist, der Schüler without relying on short-term echo."
  }
};

export default lesson;
