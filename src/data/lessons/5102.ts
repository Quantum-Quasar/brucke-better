import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5102,
  "slug": "relatives-in-all-cases",
  "title": "Relatives in All Cases",
  "subtitle": "den and dem: the case comes from the relative clause's own verb — whom proves it",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "film",
    "mann",
    "frau",
    "kind",
    "sehen",
    "helfen",
    "geben",
    "buch",
    "freund",
    "freundlich",
    "lehrer",
    "person"
  ],
  "table_word_ids": [
    "film",
    "mann",
    "frau",
    "sehen",
    "helfen",
    "kind",
    "geben",
    "buch",
    "freund",
    "freundlich",
    "lehrer",
    "person",
    "niesen",
    "vorname",
    "brief"
  ],
  "hook": {
    "title": "Whom Still Works Here",
    "content": "The man whom I see. The friend whom I gave it to. English's whom is dying at the street level — but it is exactly the case machine German's relative pronouns still run. The case of the relative pronoun comes from ITS OWN clause: the film that I see — the film is the thing SEEN, so German says den (accusative): der Film, den ich sehe. The man I help — helping goes TO someone (the dative club from topic 20), so dem: der Mann, dem ich helfe. The relative pronoun doesn't take orders from the noun it points at; it takes orders from the verb of its own clause.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Case Interview",
        "content": "To find the relative pronoun's case, ask: what job does it do INSIDE the relative clause? Subject of sehe? nominative (der/die/das). Direct object? accusative (den/die/das). Receiver? dative (dem/der/dem). The noun outside decides gender and number; the clause inside decides case. Two interviews, one pronoun."
      }
    ]
  },
  "pattern": {
    "title": "The Case Roster",
    "content": "Nominative (subject): Der Film, der gefällt? — keep it simple: der Mann, der kommt. Accusative (direct object): der Film, den ich sehe; die Frau, die ich sehe (die serves both nominative and accusative — feminine didn't split); das Kind, das ich sehe. Dative (receiver): der Mann, dem ich helfe; die Frau, der ich helfe (feminine dative is der!); dem Kind, dem ich das Buch gebe — the double-object verb from topic 20, giving the thing (das Buch, accusative) to the receiver (dem, dative). The basement rule holds through every case: the clause verb waits at the end.\n\nAlongside relative clauses, formal German links two nouns with Genitive possession ('of the'): masculine and neuter nouns use 'des' + noun-s (das Haus des Freundes, der Name des Lehrers), while feminine and plural nouns use 'der' (die Tür der Schule). Prepositions like 'trotz' (despite), 'wegen' (because of), and 'während' (during) also call for this genitive frame.",
    "footnotes": [],
    "linguist_note": "whom ↔ wen/wem: English's wh-family (who/whom/whose) is the same interrogative-relative system as German wer/wen/wem. whom kept the accusative -m; German's dem/ihm wear the same ancient dative -m ending. The case is older than both languages' differences."
  },
  "exercises": [
    {
      "id": "l5102_e1",
      "type": "matching_pairs",
      "prompt": "The case roster — match each relative clause with its reading:",
      "matching_pairs": [
        {
          "id": "cr1",
          "english": "the film (that) I see",
          "german": "der Film, den ich sehe"
        },
        {
          "id": "cr2",
          "english": "the man I help",
          "german": "der Mann, dem ich helfe"
        },
        {
          "id": "cr3",
          "english": "the woman (that) I see",
          "german": "die Frau, die ich sehe"
        },
        {
          "id": "cr4",
          "english": "the child I give the book to",
          "german": "das Kind, dem ich das Buch gebe"
        },
        {
          "id": "cr5",
          "english": "the friend (whom) I see",
          "german": "der Freund, den ich sehe"
        },
        {
          "id": "cr6",
          "english": "the person who is friendly",
          "german": "die Person, die freundlich ist"
        },
        {
          "id": "cr7",
          "english": "the teacher I help",
          "german": "der Lehrer, dem ich helfe"
        }
      ],
      "target_answer": "der Film, den ich sehe, der Mann, dem ich helfe, die Frau, die ich sehe, das Kind, dem ich das Buch gebe, der Freund, den ich sehe, die Person, die freundlich ist, der Lehrer, dem ich helfe",
      "meaning": "accusative and dative relatives in action",
      "explanation": "sehen acts ON (den, accusative); helfen and geben give TO (dem, dative). The clause's verb sets the case."
    },
    {
      "id": "l5102_e2",
      "type": "shift_select",
      "prompt": "Why is it 'der Film, DEN ich sehe'?",
      "options": [
        "The film is the subject of the clause",
        "Film is feminine",
        "The film is the OBJECT of see — accusative job",
        "sehen demands the dative"
      ],
      "target_answer": "The film is the OBJECT of see — accusative job",
      "meaning": "den = accusative relative pronoun",
      "explanation": "The relative pronoun plays the object role inside its clause: der Film, den ich sehe — 'which I see', with whom's case logic."
    },
    {
      "id": "l5102_e3",
      "type": "shift_select",
      "prompt": "The dative club strikes again: 'Der Mann, _____ ich helfe.' (I help):",
      "options": [
        "den",
        "das",
        "der",
        "dem"
      ],
      "target_answer": "dem",
      "meaning": "Der Mann, dem ich helfe = the man I help",
      "explanation": "helfen is a dative verb — helping goes TO someone — so the relative pronoun takes dative: dem."
    },
    {
      "id": "l5102_e4",
      "type": "reverse_cognate",
      "prompt": "Which English pronoun still wears the accusative case-marking that 'den' carries?",
      "target_answer": "whom",
      "meaning": "whom ↔ den/wen — the fossil accusative",
      "explanation": "whom, wen, wem, ihm, dem all share the ancient -m case ending. English retired whom; German still clocks in daily."
    },
    {
      "id": "l5102_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Der Film den ich sehe ist gut",
      "meaning": "Der Film, den ich sehe, ist gut",
      "vocab_hints": [
        {
          "word": "den",
          "translation": "whom/which (accusative)",
          "note": "the film is being seen — object job inside the clause"
        }
      ],
      "word_bank": [
        "aus",
        "Film",
        "den",
        "sehe",
        "ist",
        "Der",
        "ich",
        "gut",
        "wenn"
      ],
      "explanation": "sehe closes the relative basement; ist holds position 2 of the main clause — two verbs, two floors, one case interview passed.",
      "spoken": "Der Film den ich sehe ist gut",
      "replays": 3,
      "cues": [
        "Meaning: \"Der Film, den ich sehe, ist gut\"",
        "Opens with \"Der Film\" and ends with \"gut\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Build accusative and dative relative clauses, deriving the case from the clause's own verb.",
    "use_example": {
      "german": "Der Mann, dem ich helfe, liest das Buch, das ich sehe.",
      "english": "The man I help is reading the book that I see."
    },
    "takeaway": "Gender from the noun outside, case from the verb inside: den for objects, dem for receivers — whom's living twin.",
    "curiosity_teaser": "This relative branch ends here — more side paths wait on the map, and the whole compendium waits in review."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Relatives in All Cases (Der Film, den ich sehe, ist gut):",
    "target_answer": "Der Film den ich sehe ist gut",
    "word_bank": [
      "gut",
      "den",
      "sehe",
      "Film",
      "heute",
      "ich",
      "Der",
      "nicht",
      "ist"
    ],
    "explanation": "Re-assembling \"Der Film den ich sehe ist gut\" from scratch locks in the structural pattern of Relatives in All Cases without relying on short-term echo."
  }
};

export default lesson;
