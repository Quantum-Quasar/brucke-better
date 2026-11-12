import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5091,
  "slug": "blood-and-kin",
  "title": "Blood & Kin",
  "subtitle": "Vater ↔ father (Verner's law, not V→B), Mutter, Sohn, Tochter — the family as cognate wall",
  "phase": 2,
  "shift_categories": [
    "th_to_d",
    "d_to_t",
    "y_gh_to_g_ch"
  ],
  "word_ids": [
    "vater",
    "mutter",
    "sohn",
    "schwester",
    "tochter",
    "bruder",
    "eltern",
    "familie",
    "buchstabe"
  ],
  "table_word_ids": [
    "vater",
    "mutter",
    "sohn",
    "tochter",
    "schwester",
    "bruder",
    "eltern",
    "familie",
    "buchstabe",
    "tal",
    "tau",
    "fliege",
    "dachboden",
    "heide",
    "jeder",
    "tauchen",
    "nachtisch",
    "raten",
    "hochhaus"
  ],
  "hook": {
    "title": "The Family Reunion Is a Cognate Wall",
    "content": "The core kin words are almost all exact twins: Mutter/mother (essentially unchanged), Sohn/son (the h was once heard), Bruder/brother (th→d), Schwester/sister (sw→schw), Tochter/daughter (a double-shift showpiece: d→t AND gh→ch). One word wears a warning label: Vater/father is NOT the V→B family — the v in Vater is pronounced [f], and English f ↔ German v=[f] here is Verner's law, the ancient voicing rule that made 'father' and 'Vater' both keep their old f-sound while brothers like geben/give drifted to b. And the parents themselves are a grammar riddle: Eltern is literally 'the elder ones' — a frozen comparative of alt that became the whole word for parents.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Verner's Law in One Breath",
        "content": "Before the Germanic sound shifts, the f/th/h family voiced between vowels under Verner's law — which is why father/Vater both have their ancient fricative while brother/Bruder hardened to b. If V→B applied to Vater, German would say *Bater. It does not: the v IS the [f]. Trust the IPA, not the spelling."
      }
    ]
  },
  "pattern": {
    "title": "Possession Runs on mein/meine",
    "content": "Mein Vater, meine Mutter, mein Sohn, meine Tochter — the possessor echoes the noun's gender (possessive ladders, sprig 1103, at work). Sentences: Mein Bruder lernt Deutsch. Meine Schwester ist Lehrerin. Meine Eltern wohnen in Hamburg (Eltern is plural-only — 'the elders', so meine, not mein). And the diminutive you will hear all day: die Mädchen (girl, neuter because -chen is always neuter) — das Mädchen, not die. Kin vocabulary is where German grammar and cognate memory meet: every family sentence rehearses both.",
    "footnotes": [],
    "linguist_note": "Tochter and daughter are the trail's double-shift trophy: Proto-Germanic *duhtēr → German hardened d→t and gh→ch; English kept both ancient sounds and spelled them daughter. Say both words aloud — you are hearing the same word twice, 1,500 years apart in drift."
  },
  "exercises": [
    {
      "id": "l5091_e1",
      "type": "matching_pairs",
      "prompt": "Match the kin cognates. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "bk1",
          "english": "father (Verner's law, NOT V→B)",
          "german": "der Vater"
        },
        {
          "id": "bk2",
          "english": "mother (essentially unchanged)",
          "german": "die Mutter"
        },
        {
          "id": "bk3",
          "english": "son (the h was once heard)",
          "german": "der Sohn"
        },
        {
          "id": "bk4",
          "english": "daughter (double shift: d→t + gh→ch)",
          "german": "die Tochter"
        },
        {
          "id": "bk5",
          "english": "sister (sw→schw)",
          "german": "die Schwester"
        },
        {
          "id": "bk6",
          "english": "the whole family (every generation under one roof)",
          "german": "die Familie"
        },
        {
          "id": "recall1",
          "german": "Wir können Max heißen",
          "english": "We can be called Max"
        },
        {
          "id": "recall2",
          "german": "Wir können buchstabieren",
          "english": "We can spell"
        },
        {
          "id": "recall3",
          "german": "ein Buchstabe",
          "english": "a letter of the alphabet"
        }
      ],
      "target_answer": "der Vater, die Mutter, der Sohn, die Tochter, die Schwester, die Familie, Wir können Max heißen, Wir können buchstabieren, ein Buchstabe",
      "meaning": "father (Verner's law, NOT V→B); mother (essentially unchanged); son (the h was once heard); daughter (double shift: d→t + gh→ch); sister (sw→schw); the whole family (every generation under one roof); We can be called Max; We can spell; a letter of the alphabet",
      "explanation": "Five twins and one warning label: Vater's v is [f] — Verner's law, not the V→B shift that turned give into geben."
    },
    {
      "id": "l5091_e2",
      "type": "shift_select",
      "prompt": "Tochter ↔ daughter carries TWO shifts: d→t and:",
      "options": [
        "p→f",
        "gh→ch",
        "k→ch as in make",
        "v→b"
      ],
      "target_answer": "gh→ch",
      "meaning": "daughter ↔ Tochter = d→t + gh→ch",
      "explanation": "The silent gh in daughter was once sounded — German Nacht-style ch keeps it: Tochter. Same double shift as Nacht/night."
    },
    {
      "id": "l5091_e3",
      "type": "shift_select",
      "prompt": "Eltern literally means:",
      "options": [
        "the old ones' house",
        "the grandparents",
        "the elder ones",
        "the family tree"
      ],
      "target_answer": "the elder ones",
      "meaning": "Eltern = parents, literally 'the elder ones'",
      "explanation": "A frozen comparative of alt (old): elter- is elder. German says 'the elders' where English coined 'parents'."
    },
    {
      "id": "l5091_e4",
      "type": "reverse_cognate",
      "prompt": "Which English word is the twin of 'Sohn'?",
      "target_answer": "son",
      "meaning": "Sohn ↔ son (Proto-Germanic *sunuz)",
      "explanation": "The h in Sohn was once pronounced — *sunuh- — but the twinship is total: son and Sohn are one word."
    },
    {
      "id": "l5091_e5",
      "type": "syntax_builder",
      "prompt": "Assemble the sentence: 'My parents live in Hamburg'",
      "target_answer": "Meine Eltern wohnen in Hamburg",
      "meaning": "Meine Eltern wohnen in Hamburg = my parents live in Hamburg",
      "vocab_hints": [
        {
          "word": "Eltern",
          "translation": "parents",
          "note": "plural-only: 'the elder ones'"
        },
        {
          "word": "wohnen",
          "translation": "to live / reside",
          "note": "ich wohne in... — the residence verb"
        }
      ],
      "word_bank": [
        "Hamburg",
        "wohnen",
        "wir",
        "Meine",
        "in",
        "weil",
        "Eltern"
      ],
      "explanation": "Eltern is plural, so it takes meine and the -en verb form — the elders, treated as the plural they are. And the moment you meet the rest of die Familie, you ask their names: Wie schreibt man das? — one Buchstabe at a time."
    }
  ],
  "summary": {
    "outcome": "Name the core family with correct possessives, and explain the Verner's-law trap in Vater.",
    "use_example": {
      "german": "Mein Vater ist alt, aber meine Mutter ist Lehrerin.",
      "english": "My father is old, but my mother is a teacher."
    },
    "takeaway": "Mutter, Sohn, Bruder, Schwester, Tochter — all twins; Vater wears Verner's law; Eltern is 'the elder ones' frozen into a noun.",
    "curiosity_teaser": "Next: the extended clan — grandparents, in-laws and the compound principle that builds Großvater from parts you own."
  },
  "twist": {
    "prompt": "Without looking back — build in German: \"The father is here today\"",
    "target_answer": "Der Vater ist heute hier",
    "word_bank": [
      "hier",
      "sehr",
      "ist",
      "nicht",
      "Der",
      "heute",
      "Vater"
    ],
    "explanation": "Building \"Der Vater ist heute hier\" from the lesson's core pattern locks in Blood & Kin."
  }
};

export default lesson;
