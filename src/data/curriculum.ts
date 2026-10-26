import type { LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";

// ---------------------------------------------------------------------------
// The Brücke Trail — 30 topics arranged as a linear spine of clusters.
//
// The map is a single undirected graph (see lib/trail-map.ts):
//   · core(n) —core(n+1)           the main line, one node per topic, always in order
//   · core(n) —sprig(n, i)         every sprig of a topic hangs off its core → all
//                                  adjacent nodes unlock at once when the core is
//                                  done, and every sprig can be skipped
//   · branch lessons chain off an attach node (support material, skippable)
//
// ID scheme:  core   = topic id (1–30, topics 1–10 are the authored lessons)
//             sprig  = topicId * 100 + index            (101, 102, … 3003)
//             branch = 5000 + n * 10, lessons +1, +2    (5011, 5012, …)
// ---------------------------------------------------------------------------

export const TOTAL_TOPICS = 30;

export const sprigId = (topicId: number, index: number) => topicId * 100 + index;

const shell = (id: number, title: string, plan: string): LessonShell => ({ id, title, plan });

const authoredCore = (id: number, title: string): LessonShell => ({
  id,
  title,
  plan: "Authored — full content lives in data/lessons.ts.",
  authored: true,
});

export const TOPICS: TopicCluster[] = [
  {
    id: 1,
    title: "The Germanic Core",
    blurb: "Hundreds of German words you already know — strip the -en and English looks back at you.",
    core: authoredCore(1, "The Germanic Core"),
    sprigs: [
      { ...shell(sprigId(1, 1), "Hidden Twins: Body & World", "Direct cognates gym: Arm, Hand, Finger, Haus, Glas, Brot, Ring — recognition drills with gender colors."), authored: true },
      { ...shell(sprigId(1, 2), "First Sentences Gym", "Ich lerne Deutsch pattern drills: assemble 6 simple subject-verb-object sentences from taught cognates."), authored: true },
      { ...shell(sprigId(1, 3), "The Living -en Suffix", "brighten/shorten/deepen: English's own -en verbs as the bridge into German infinitives."), authored: true },
    ],
  },
  {
    id: 2,
    title: "Modal Auxiliaries & The Bracket",
    blurb: "Conjugate one power verb, park the bare infinitive at the end — the Satzklammer.",
    core: authoredCore(2, "Modal Auxiliaries & The Bracket"),
    sprigs: [
      { ...shell(sprigId(2, 1), "will ≠ will", "Drills separating ich will (desire, 'free will') from English future will; sollen ↔ shall."), authored: true },
      { ...shell(sprigId(2, 2), "Bracket Sentences in the Wild", "Ich kann morgen kommen — build 8 bracket sentences with morgen, heute, Deutsch, kommen."), authored: true },
    ],
  },
  {
    id: 3,
    title: "The P → F / FF Shift",
    blurb: "Where English kept P, High German breathed it into F: hope→hoffen, ship→Schiff.",
    core: authoredCore(3, "The P → F / FF Shift"),
    sprigs: [
      { ...shell(sprigId(3, 1), "PF- Openers", "Pfad↔path, Pfund↔pound, Pfeffer↔pepper, Apfel↔apple: the word-initial PF affricate family."), authored: true },
      { ...shell(sprigId(3, 2), "P→F Discrimination Drills", "Mixed shift-select: given 6 f/ff words, decide whether the P→F rule applies and derive the English twin."), authored: true },
    ],
  },
  {
    id: 4,
    title: "The Dental Hardening (TH → D)",
    blurb: "German abolished 'th' 1,300 years ago: think→denken, brother→Bruder, thank→danken.",
    core: authoredCore(4, "The Dental Hardening (TH → D)"),
    sprigs: [
      { ...shell(sprigId(4, 1), "Donner, Bad & Du", "Culture words through TH→D: Donnerstag (thunder-day), Baden-Baden, du/dich ↔ thou/thee."), authored: true },
      { ...shell(sprigId(4, 2), "TH→D Discrimination Drills", "Cross-shift practice: separate TH→D words from P→F and T→S lookalikes."), authored: true },
    ],
  },
  {
    id: 5,
    title: "The Sibilant Shift (T → S / SS / Z)",
    blurb: "water→Wasser, better→besser, two→zwei — English T hisses into German s, ss and z.",
    core: authoredCore(5, "The Sibilant Shift (T → S / SS / Z)"),
    sprigs: [
      { ...shell(sprigId(5, 1), "tw → zw Openers", "zwei, Zwerg, Zwilling, zweimal: the TW→ZW word-initial family and the /ts/ pronunciation of z."), authored: true },
      { ...shell(sprigId(5, 2), "Eszett & the Sharp S", "groß, Straße, muss: when German writes ß, the T→SS story behind it, and ordering a Glas Wasser."), authored: true },
    ],
  },
  {
    id: 6,
    title: "The Velar Shift (K → CH)",
    blurb: "make→machen, book→Buch — K melts into the throaty ch, split into Ach- and Ich-Laut.",
    core: authoredCore(6, "The Velar Shift (K → CH)"),
    sprigs: [
      { ...shell(sprigId(6, 1), "Kitchen & Book Set", "Küche, Buch, Milch, suchen, sprechen: noun+verb CH cognates with seek/beseech and speak/speech pairs."), authored: true },
      { ...shell(sprigId(6, 2), "K→CH Discrimination Drills", "Decide Ach-Laut vs Ich-Laut by the vowel; derive German forms from English k-words."), authored: true },
    ],
  },
  {
    id: 7,
    title: "The Stop Shift (D → T)",
    blurb: "The domino that closed the chain: day→Tag, door→Tür, drink→trinken, dream→Traum.",
    core: authoredCore(7, "The Stop Shift (D → T)"),
    sprigs: [
      { ...shell(sprigId(7, 1), "Double-Shift Detectives", "deep→tief, daughter→Tochter: words needing two shift rules at once, pairing D→T with P→F and GH→CH."), authored: true },
      { ...shell(sprigId(7, 2), "D→T Discrimination Drills", "Mixed drills across all five shifts learned so far — which rule, which direction?"), authored: true },
    ],
  },
  {
    id: 8,
    title: "The Latin Bridge (-ieren)",
    blurb: "500+ free verbs: study→studieren, repair→reparieren — and they never take ge-.",
    core: authoredCore(8, "The Latin Bridge (-ieren)"),
    sprigs: [
      { ...shell(sprigId(8, 1), "-ieren Verb Builder", "Derive 15 -ieren verbs from English -ate/-ize/-ify endings; stress lands on -IE-."), authored: true },
      { ...shell(sprigId(8, 2), "The No-ge- Club", "Participle drills: studiert, not gestudiert — why suffix stress blocks ge-."), authored: true },
    ],
  },
  {
    id: 9,
    title: "Conjugation Roots & The Living Endings",
    blurb: "Shakespeare conjugates German: thou -st → du -st, he learneth → er lernt.",
    core: authoredCore(9, "Conjugation Roots & The Living Endings"),
    sprigs: [
      { ...shell(sprigId(9, 1), "Stem Hunters", "Strip -en at speed: given 12 infinitives, produce stems, then rebuild all persons of lernen and spielen."), authored: true },
      { ...shell(sprigId(9, 2), "Thou -st Drill Circuit", "Timed conjugation circuit: ich/du/er/wir forms across lernen, kommen, trinken, machen, denken."), authored: true },
    ],
  },
  {
    id: 10,
    title: "Pronouns as Case Anchors (The Him-Case)",
    blurb: "Why only masculine changes for direct objects: der→den, ein→einen, er→ihn — him and whom prove it.",
    core: authoredCore(10, "Pronouns as Case Anchors (The Him-Case)"),
    sprigs: [
      { ...shell(sprigId(10, 1), "den / einen / ihn Case Gym", "18 accusative-object drills with table words: Ich trinke den Kaffee, Ich suche ihn."), authored: true },
      { ...shell(sprigId(10, 2), "Him & Whom Proof Texts", "Spot the ancient nasal in English him/them/whom, then mirror it in German mich/dich/ihn/wen."), authored: true },
      { ...shell(sprigId(10, 3), "The Articles Are Pronouns in Disguise", "die = D- + sie, der = D- + er, das = D- + es. Read every German 'the' as a pronoun wearing a hat, then prove it in the dative."), authored: true },
    ],
  },

  // ------------------------- Phase 2 shells (content TBD) -------------------------

  {
    id: 11,
    title: "The Article Grid & the ein-Family",
    blurb: "der/the, das/that, dies/this — determiners are one ancient demonstrative system, and mein ↔ mine.",
    core: authoredCore(11, "The Article Grid & the ein-Family"),
    sprigs: [
      { ...shell(sprigId(11, 1), "Article Gym: 20 Nouns, 3 Colors", "Rapid der/die/das assignment drills reusing every table noun met so far, with gender-color feedback."), authored: true },
      { ...shell(sprigId(11, 2), "jener ↔ yon & the Demonstrative Map", "dieser/jener ↔ this/yon; der/die/das as 'the' with demonstrative force when stressed."), authored: true },
      { ...shell(sprigId(11, 3), "Possessive Ladders", "mein/dein/sein/ihr across all cases met so far; KJV-style 'mine/thine' before-vowel rule."), authored: true },
    ],
  },
  {
    id: 12,
    title: "Nicht & Kein",
    blurb: "The two highest-frequency words after the articles: nicht and not are the same 'no-thing'.",
    core: authoredCore(12, "Nicht & Kein"),
    sprigs: [
      { ...shell(sprigId(12, 1), "kein vs nicht Choice Gym", "Choose kein or nicht across 20 prompts; noun-phrases take kein, verbs take nicht."), authored: true },
      { ...shell(sprigId(12, 2), "The nicht Position Map", "Where nicht lands in bracket sentences, with modal verbs and in subclauses."), authored: true },
    ],
  },
  {
    id: 13,
    title: "Asking Questions",
    blurb: "was↔what, wo↔where, wer↔who — and verb-first questions with no do-support at all.",
    core: authoredCore(13, "Asking Questions"),
    sprigs: [
      { ...shell(sprigId(13, 1), "W-Word Cognate Set", "Match all 8 W-words to their English twins; wer≠where trap drill."), authored: true },
      { ...shell(sprigId(13, 2), "No-do-support Drills", "Transform 15 statements into yes/no and W-questions; compare with archaic English 'Knowest thou?'."), authored: true },
    ],
  },
  {
    id: 14,
    title: "Word Order & Subordinate Clauses",
    blurb: "Verb-second everywhere — until the subclause slams the verb to the end like Old English did.",
    core: authoredCore(14, "Word Order & Subordinate Clauses"),
    sprigs: [
      { ...shell(sprigId(14, 1), "Verb-Second Bootcamp", "Front adverbs and objects while keeping the verb glued to position 2; 15 reorder drills."), authored: true },
      { ...shell(sprigId(14, 2), "weil & dass: the Verb Waits", "Build 12 subclauses; contrast weil-sentences with the bracket from topic 2."), authored: true },
      { ...shell(sprigId(14, 3), "zu + Infinitive Ladders", "Ich habe vor, Deutsch zu lernen: chain zu-clauses onto 10 main clauses."), authored: true },
    ],
  },
  {
    id: 15,
    title: "Separable Verbs & Spatial Prefixes",
    blurb: "German separable prefixes ARE English phrasal verbs: aufgeben = give up, anrufen = call up.",
    core: authoredCore(15, "Separable Verbs & Spatial Prefixes"),
    sprigs: [
      { ...shell(sprigId(15, 1), "Phrasal Verb Mirrors", "Match 15 separable verbs to their phrasal twins: aufwachen/wake up, zurückkommen/come back, ausgeben/give out."), authored: true },
      { ...shell(sprigId(15, 2), "Prefix Flight Path", "Spot the prefix at the sentence end across 15 bracket sentences; rebuild with modals."), authored: true },
    ],
  },
  {
    id: 16,
    title: "Inseparable Prefixes (ver-, be-, er-)",
    blurb: "Bound prefixes that never split — and ver- is English for-: vergessen = forget.",
    core: authoredCore(16, "Inseparable Prefixes (ver-, be-, er-)"),
    sprigs: [
      { ...shell(sprigId(16, 1), "ver ↔ for- Cognate Set", "12 ver- words mapped to English for- words; payoff arc completing the vergessen preview from earlier topics."), authored: true },
      { ...shell(sprigId(16, 2), "be- & er- Verb Factory", "be-/er- as meaning-shapers: bekommen, erinnern, erklären; spot inseparable vs separable by stress."), authored: true },
      { ...shell(sprigId(16, 3), "sich & the Lost Reflexives", "The sich-system and English's lost reflexives (hie thee hence, help yourself): mich/dich/sich/uns, sich waschen with its stem change, sich freuen and sich fühlen."), authored: true },
      { ...shell(sprigId(16, 4), "Reflexive Daily Routines", "The morning round: sich anziehen, aufstehen, aufwachen, einschlafen — separable prefixes plus reflexive pronouns in routine chains."), authored: true },
    ],
  },
  {
    id: 17,
    title: "Numbers, Time & gestern",
    blurb: "elf, zwölf, zwanzig — counting is a shift spiral: drei↔three, zw-↔tw-, gestern↔yesterday.",
    core: authoredCore(17, "Numbers, Time & gestern"),
    sprigs: [
      { ...shell(sprigId(17, 1), "Counting Cognates Gym", "Numbers listening/typing drills: phone numbers, prices, ages; elf≠elf trap."), authored: true },
      { ...shell(sprigId(17, 2), "Days of Thunder", "The weekday etymologies (Donner, Mitte, Sonne) and simple date sentences."), authored: true },
      { ...shell(sprigId(17, 3), "Clock & Calendar Gym", "Wie viel Uhr ist es? — telling time both colloquial and formal ways."), authored: true },
    ],
  },
  {
    id: 18,
    title: "The Conversational Past (Perfekt)",
    blurb: "ge- is the old English y- (yclept): spoken past with haben/sein + participle at the end.",
    core: authoredCore(18, "The Conversational Past (Perfekt)"),
    sprigs: [
      { ...shell(sprigId(18, 1), "ge- ↔ y-: the Ancient Participle", "Participle formation drills for weak verbs; the yclept/genug etymology box."), authored: true },
      { ...shell(sprigId(18, 2), "haben or sein? Choice Gym", "20 past-sentence prompts choosing the right auxiliary; motion vs transitive logic."), authored: true },
      { ...shell(sprigId(18, 3), "Gestern habe ich… Story Drills", "Narrate a weekend in 10 Perfekt sentences using only taught vocabulary."), authored: true },
    ],
  },
  {
    id: 19,
    title: "Strong Verbs & Ancient Ablaut",
    blurb: "The second cognate family: sing/sang/sung ↔ singen/sang/gesungen — vowel melody, not endings.",
    core: authoredCore(19, "Strong Verbs & Ancient Ablaut"),
    sprigs: [
      { ...shell(sprigId(19, 1), "sing/sang/sung Mirrors", "Map 14 English irregulars onto German ablauf pairs; hear the vowel melody."), authored: true },
      { ...shell(sprigId(19, 2), "Ablaut Families I: e→i, a→o", "Class drills: geben/gab, sprechen/sprach, fahren/fuhr with participle forms."), authored: true },
      { ...shell(sprigId(19, 3), "dachte & the Suppletive Irregulars", "think/thought↔denken/dachte, bring/brought↔bringen/brachte, go/went↔gehen/ging."), authored: true },
      { ...shell(sprigId(19, 4), "hatte & war: The Fortress Pasts", "haben and sein keep their simple pasts: hatte ↔ had, war ↔ was — the -te ending is English's own -ed, the storyteller's tense."), authored: true },
      { ...shell(sprigId(19, 5), "konnte, musste & the Frozen Pasts", "The preterite-present modals: konnte↔could, musste↔must, sollte↔should, wollte↔would, durfte↔durst, wusste↔wist — English froze their pasts into presents."), authored: true },
    ],
  },
  {
    id: 20,
    title: "The Dative Case",
    blurb: "The giving case: 'methinks' = mich dünkt. mir↔me, dir↔thee, ihm↔him.",
    core: authoredCore(20, "The Dative Case"),
    sprigs: [
      { ...shell(sprigId(20, 1), "methinks & Dative Survivors", "English dative fossils (methinks, 'give it me') mirrored in German; dem/den/dem grid row."), authored: true },
      { ...shell(sprigId(20, 2), "mir / dir / ihm Pronoun Gym", "20 give/tell/thank drills with dative pronouns."), authored: true },
      { ...shell(sprigId(20, 3), "Dative Verbs: helfen, danken, gefallen", "Verbs that demand dative objects; contrast with accusative verbs from topic 10."), authored: true },
    ],
  },

  // ------------------------- Phase 3 shells (content TBD) -------------------------

  {
    id: 21,
    title: "Compound Noun Engineering",
    blurb: "Handschuh = hand-shoe. German builds words like Lego — and English does too.",
    core: authoredCore(21, "Compound Noun Engineering"),
    sprigs: [
      { ...shell(sprigId(21, 1), "32 Calques Deep-Dive", "The curated compound set with literal glosses and English counterparts."), authored: true },
      { ...shell(sprigId(21, 2), "Compound Builder Workshop", "Assemble 20 compounds from taught nouns; predict gender from the head noun."), authored: true },
      { ...shell(sprigId(21, 3), "Reading Compounds in the Wild", "Split 6-word monsters (Donaudampfschifffahkt-style) into meaning."), authored: true },
    ],
  },
  {
    id: 22,
    title: "Gender Heuristics & Suffix Clues",
    blurb: "Decode gender instead of memorizing: -ung is feminine, -chen is neuter, -er is masculine.",
    core: authoredCore(22, "Gender Heuristics & Suffix Clues"),
    sprigs: [
      { ...shell(sprigId(22, 1), "The Feminine Squad", "-ung/-heit/-keit drills: derive 15 abstract nouns and their genders."), authored: true },
      { ...shell(sprigId(22, 2), "Guess-the-Gender Game", "Timed heuristic game on unseen words with explanation feedback."), authored: true },
    ],
  },
  {
    id: 23,
    title: "Plurals & i-Mutation",
    blurb: "Mann→Männer is man→men: umlaut is English's fossil and German's living tool.",
    core: authoredCore(23, "Plurals & i-Mutation"),
    sprigs: [
      { ...shell(sprigId(23, 1), "English's Fossil Umlauts", "man/men, foot/feet, goose/geese, mouse/mice mapped onto German pairs."), authored: true },
      { ...shell(sprigId(23, 2), "The Five Plural Patterns", "Sort 25 taught nouns into the five plural classes; produce plurals in sentences."), authored: true },
    ],
  },
  {
    id: 24,
    title: "Comparatives & Suppletion",
    blurb: "gut→besser is good→better — the twin suppletion; kalt→kälter fires the umlaut again.",
    core: authoredCore(24, "Comparatives & Suppletion"),
    sprigs: [
      { ...shell(sprigId(24, 1), "Twin Suppletions", "gut/besser/hoch/höher vs good/better/high/higher — the shared irregular story."), authored: true },
      { ...shell(sprigId(24, 2), "-er/-ste Sentence Gym", "20 comparison sentences with als/wie using taught adjectives."), authored: true },
      { ...shell(sprigId(24, 3), "Adjective Endings: the Article's Echo", "Before-noun declension: der kalte Tag vs ein kalter Tag — the adjective carries the flag only when the article doesn't; the 80/20 -en rule; mixed declension after kein/mein."), authored: true },
      { ...shell(sprigId(24, 4), "No Article? The Adjective Goes Strong", "Strong declension before bare nouns: kaltes Wasser, heißer Tee, guter Wein — the adjective does the article's job alone; the capstone's besseren callback."), authored: true },
    ],
  },
  {
    id: 25,
    title: "Hidden Shifts I: V → B",
    blurb: "The quiet family: geben↔give, über↔over, sieben↔seven, Biber↔beaver.",
    core: authoredCore(25, "Hidden Shifts I: V → B"),
    sprigs: [
      { ...shell(sprigId(25, 1), "geben & give Family Tour", "geben/Gabe/vergeben radiation; Perfekt forms gab, gegeben in sentences."), authored: true },
      { ...shell(sprigId(25, 2), "V→B Word Hunt", "Atlas-bridged derivation drills across the whole family."), authored: true },
    ],
  },
  {
    id: 26,
    title: "Hidden Shifts II: GH→CH & Y→G",
    blurb: "The inversion lessons: Nacht↔night, Tochter↔daughter, sagen↔say, gestern↔yesterday.",
    core: authoredCore(26, "Hidden Shifts II: GH→CH & Y→G"),
    sprigs: [
      { ...shell(sprigId(26, 1), "Nacht & Licht: the gh→ch Inversion", "The English gh words that German kept as ch; thought↔dachte double-shift payoff."), authored: true },
      { ...shell(sprigId(26, 2), "Tochter: Double Shift Showdown", "Words carrying both D→T and GH→CH; discrimination drills."), authored: true },
      { ...shell(sprigId(26, 3), "sagen & gestern: the Y→G Twins", "say/sagen, yesterday/gestern and the remaining family words."), authored: true },
    ],
  },
  {
    id: 27,
    title: "Prepositions as Physical Metaphors",
    blurb: "über↔over, unter↔under, durch↔through — and the case each one drags along.",
    core: authoredCore(27, "Prepositions as Physical Metaphors"),
    sprigs: [
      { ...shell(sprigId(27, 1), "über, unter, durch: Metaphor Set", "Spatial drills with the cognate prepositions; picture-based placement."), authored: true },
      { ...shell(sprigId(27, 2), "Case Trigger Gym", "Choose accusative or dative after two-way prepositions across 20 prompts."), authored: true },
      { ...shell(sprigId(27, 3), "Preposition Sentence Ladders", "Full sentences chaining prepositional phrases onto taught verbs."), authored: true },
    ],
  },
  {
    id: 28,
    title: "Verb Families & Root Radiations",
    blurb: "One root, many words: fahren/Fahrt, ziehen/Zug — the way English builds stand/understand.",
    core: authoredCore(28, "Verb Families & Root Radiations"),
    sprigs: [
      { ...shell(sprigId(28, 1), "fahren & its Dynasty", "fahren/Fahrt/abfahren family tree reading with ablauf forms fuhr, gefahren."), authored: true },
      { ...shell(sprigId(28, 2), "ziehen & nehmen Dynasties", "Zug/umziehen/ausziehen; nehmen/nimmt/genommen; radiate each root into 6 derivatives."), authored: true },
    ],
  },
  {
    id: 29,
    title: "sein, Motion & the Idiomatic Mindset",
    blurb: "ist↔is, war↔was — and the human phrases: Wie geht's = 'How goes it?', Mir ist kalt.",
    core: authoredCore(29, "sein, Motion & the Idiomatic Mindset"),
    sprigs: [
      { ...shell(sprigId(29, 1), "ist, war & bin: Being Cognates", "sein conjugation via cognates; war/was sentence drills closing the Perfekt loop."), authored: true },
      { ...shell(sprigId(29, 2), "Wie geht's? — How goes it?", "Greetings and small-talk idioms as archaic English survivals."), authored: true },
      { ...shell(sprigId(29, 3), "Mir ist kalt: Dative Feelings", "Dative-experiencer expressions: mir ist kalt/langweilig/ schlecht; 12 drills."), authored: true },
    ],
  },
  {
    id: 30,
    title: "Capstone: The Bridge Reading",
    blurb: "One connected story built from everything — with the false friends lying in wait.",
    core: authoredCore(30, "Capstone: The Bridge Reading"),
    sprigs: [
      { ...shell(sprigId(30, 1), "A Day in Berlin: Reading", "The capstone passage with tap-to-inspect words and shift annotations."), authored: true },
      { ...shell(sprigId(30, 2), "Trap Watch: False Friends in the Wild", "The 16 curated false friends embedded in context sentences."), authored: true },
      { ...shell(sprigId(30, 3), "The Whole-Trail Review Game", "Mixed-mode synthesis quiz drawing from all 30 topics."), authored: true },
    ],
  },
];

/** Support-material branches: optional mini paths hanging off the spine. */
export const TRAIL_BRANCHES: TrailBranch[] = [
  {
    id: 5010,
    attach: 2,
    title: "The du–Sie Line & Greetings",
    blurb: "One little branch on social register: du ↔ thou, Sie ↔ they, and the greeting formulas.",
    lessons: [
      { ...shell(5011, "du, Sie & the T–V Line", "du↔thou and Sie↔they as the surviving T–V distinction; when to use which; Sie + 3rd-person-plural verb agreement."), authored: true },
      { ...shell(5012, "Greetings & Goodbyes Gym", "Guten Tag, Hallo, Tschüss, Auf Wiedersehen in dialogue drills with the du/Sie switch."), authored: true },
    ],
  },
  {
    id: 5020,
    attach: 5,
    title: "False Friends Preview",
    blurb: "Gift is poison, Rat is advice — a first walk through the cognate traps.",
    lessons: [
      { ...shell(5021, "Gift, Rat & Co.", "Six highest-value false friends from the compendium deck; contrastive recall drills; link-out to the Review Hub deck."), authored: true },
    ],
  },
  {
    id: 5030,
    attach: 9,
    title: "Umlaut Sounds Clinic",
    blurb: "ü, ö, ä — the three mouth positions English never taught you.",
    lessons: [
      { ...shell(5031, "ü, ö, ä — Mouth Positions", "Pronunciation clinic with minimal pairs (schon/schön, Bruder/Brüder) and IPA guidance."), authored: true },
    ],
  },
  {
    id: 5040,
    attach: 19,
    title: "Ablaut Hall of Fame",
    blurb: "A guided tour of all seven strong verb classes and their vowel melodies.",
    lessons: [
      { ...shell(5041, "Tour of the 7 Strong Verb Classes", "Walk every ablaut class with two exemplar verbs each; recognize class by vowel melody."), authored: true },
    ],
  },
  {
    id: 5060,
    attach: 9,
    title: "The Imperative Line",
    blurb: "Commands are the bare stem: Komm! Mach! Iss! — Shakespeare's English gave orders the same way.",
    lessons: [
      { ...shell(5061, "Speak, Hands, for Me!", "The du-command is the bare stem: Komm! Lern! Iss! Sprich! Hilf! — Casca's line from Julius Caesar; the e→i stem-changers that keep their vowel in the command."), authored: true },
      { ...shell(5062, "Kommen Sie! Kommt!", "The other two imperatives: formal Sie-commands (verb first, Sie after — the polite 'they' plural) and ihr-commands (-t); the one irregular, Sei!."), authored: true },
      { ...shell(5063, "Commands in the Wild", "Command chains out in the world: recipes and their infinitive-style commands, dialogues with bitte, and the du/Sie register switch under pressure."), authored: true },
    ],
  },
  {
    id: 5050,
    attach: 27,
    title: "Two-Way Preposition Drill Isle",
    blurb: "The classic stumbling block, isolated: motion takes accusative, location takes dative.",
    lessons: [
      { ...shell(5051, "Motion → Accusative, Location → Dative", "wohin?/wo? pair drills across an/auf/in/hinter/neben/über/unter/vor/zwischen."), authored: true },
      { ...shell(5052, "Wechselpräpositionen Sentence Gym", "20 picture-prompt sentences switching cases by motion vs location."), authored: true },
    ],
  },
  {
    id: 5070,
    attach: 1,
    title: "First Words, First Spoken",
    blurb: "Your first spoken German: saying who you are, where you're from — and the alphabet.",
    lessons: [
      { ...shell(5071, "First Introductions", "ich heiße ↔ archaic hight 'to be called'; ich komme aus; ich wohne; ich bin N Jahre alt — introduction sentences from taught cognates."), authored: true },
      { ...shell(5072, "The Alphabet & buchstabieren", "Das deutsche Alphabet: W = 'veh', V = 'fow', J = 'yot', Z = 'tsett', ß = 'Eszett' — and buchstabieren, the -ieren verb for spelling your name."), authored: true },
    ],
  },
  {
    id: 5090,
    attach: 11,
    title: "Your Family Tree Speaks German",
    blurb: "One cognate-dense branch on the family: Vater, Mutter, Sohn — and Eltern, 'the elder ones'.",
    lessons: [
      { ...shell(5091, "Blood & Kin", "The core kin set as cognates: Vater/father (Verner's law, NOT V→B), Mutter, Sohn, Tochter, Schwester, Bruder, Eltern = 'the elder ones' (frozen comparative)."), authored: true },
      { ...shell(5092, "The Extended Clan", "Grandparents, in-laws and the compound principle: Großvater, Oma/Opa, Onkel, Tante, Geschwister, Enkel, Familie."), authored: true },
    ],
  },
  {
    id: 5080,
    attach: 30,
    title: "The Would-World: Konjunktiv II",
    blurb: "hätte, wäre, könnte, würde — the subjunctive twins of had, were, could, would, and the politeness escalator.",
    lessons: [
      { ...shell(5081, "hätte & wäre: The Subjunctive Twins", "hätte ↔ had's subjunctive, wäre ↔ were: the would-world of wishes and hypotheses — Wenn ich Zeit hätte, Das wäre gut — with English's one fossil, 'if I were'."), authored: true },
      { ...shell(5082, "könnte, würde & the Politeness Escalator", "könnte (could's old job: polite asking), würde (would, the conditional machine) and the four-step politeness escalator from Ein Kaffee! to Könnten Sie...? — plus the wurde/würde umlaut trap."), authored: true },
    ],
  },
  {
    id: 5100,
    attach: 30,
    title: "The Relative Twist",
    blurb: "der/die/das take a third job — relative pronouns — and the verb drops to the basement again.",
    lessons: [
      { ...shell(5101, "The Man That Knows: der/die/das Double Duty", "Subject relatives: Der Mann, der Kaffee trinkt — the relative pronoun is the demonstrative re-employed; OE þe/that; verb-final reuses topic 14's basement rule."), authored: true },
      { ...shell(5102, "Relatives in All Cases", "den and dem as relative objects: der Film, den ich sehe; der Mann, dem ich helfe — the case comes from the relative clause's own verb; English whom is the same fossil."), authored: true },
    ],
  },
  {
    id: 5110,
    attach: 30,
    title: "The Three Whens & the Whether-Word",
    blurb: "wann, als, wenn split English 'when' into three jobs — and ob turns out to be English if's true twin.",
    lessons: [
      { ...shell(5111, "The Three Whens: wann, als, wenn", "The when-split: wann asks the question, als marks the once-only past (and 'than'), wenn repeats and conditions — all verb-final; wann/wenn are doublets, als is also's twin."), authored: true },
      { ...shell(5112, "ob: Whether or Not", "ob as the indirect yes/no word — the 'or not' test — and its true twin, English if (Proto-Germanic *jabai); wenn vs ob; basement word order throughout."), authored: true },
    ],
  },
  // -------------------------------------------------------------------------
  // Campaign 2 — the A1 vocabulary expansion (branches 5120–5310).
  //
  // Purely additive: new ids, new branches appended after 5110, every existing
  // shell, gate, threshold and array position untouched. No branch attaches to
  // topic 1 (the first-node unlock set is asserted verbatim in trail-map.test.ts).
  // Each branch is a two-lesson vocabulary pair that hangs off the topic it
  // extends; lesson 2 chains off lesson 1, so both stay skippable.
  // -------------------------------------------------------------------------
  {
    id: 5120,
    attach: 17,
    title: "Zählen & Zahlen: eins bis hundert",
    blurb: "The counting core you actually use — eins, vier, fünf, sechs, zehn — and the nouns that count for you: die Zahl, die Nummer, die Hälfte.",
    lessons: [
      { ...shell(5121, "Zählen I: eins, vier, fünf, sechs, zehn", "The everyday count: eins/vier/fünf/sechs plus zehn — whose T→S shift (ten) is the same law as Tag/day and two/zwei. drei, zwei, sieben, acht, hundert are already yours."), authored: true },
      { ...shell(5122, "Zählen II: null, die Zahl, die Nummer, die Hälfte, die Million", "Zero and the counting nouns: die Zahl (a count), die Nummer (a number you look up), die Hälfte (half — the doubling prefix), die Million. Every one of them takes a Z, the tsett-letter."), authored: true },
    ],
  },
  {
    id: 5130,
    attach: 17,
    title: "Häufigkeit & Zeitpunkte",
    blurb: "Adverbs of rate and moment: immer, oft, manchmal, selten, einmal — and jetzt, sofort, später, früh, endlich.",
    lessons: [
      { ...shell(5131, "Wie oft? immer, oft, manchmal, selten, einmal", "Frequency adverbs sit where English puts its -ly: Ich komme oft. The -mal doubling behind einmal (einmal, zweimal) is the same machinery as zweimal from topic 5."), authored: true },
      { ...shell(5132, "Wann genau? jetzt, sofort, später, früh, endlich", "Point-in-time adverbs: jetzt, sofort (at once), später, früh (early — one f, the long vowel), endlich (finally). Position: they slot into the V2 frame without disturbing the verb."), authored: true },
    ],
  },
  {
    id: 5140,
    attach: 17,
    title: "Der Kalender: Monate & Feiertage",
    blurb: "All twelve months as a phonetic set, plus Feiertag, Ostern and der Wochentag — the calendar is one of the easiest A1 wins in the language.",
    lessons: [
      { ...shell(5141, "Kalender I: Januar bis Mai", "Januar, Februar, März, April, Mai — the first five month names, close enough to English that you already half-know them; then im Januar, im Mai tells you when."), authored: true },
      { ...shell(5142, "Kalender II: Juni bis Oktober", "Juni, Juli, August, September, Oktober — the second half of the year, with the -us/-er endings intact and September hiding your old -ber friend."), authored: true },
      { ...shell(5143, "Kalender III: November, Dezember, Feiertag, Ostern, Wochentag", "The year's last two months plus the word for a holiday (Feiertag) and the one German holiday English kept (Ostern/easter). Der Wochentag builds the whole week."), authored: true },
    ],
  },
  {
    id: 5150,
    attach: 17,
    title: "Dauer, Termin & Punkt",
    blurb: "How long things last and when they are due: der Moment, dauern, der Termin, die Sekunde, das Datum.",
    lessons: [
      { ...shell(5151, "Dauer & Termin: der Moment, dauern, der Termin, die Sekunde, das Datum", "dauern takes an accusative of length — Die Sitzung dauert zwei Stunden — while der Termin is the appointment and das Datum the date you write at the top."), authored: true },
    ],
  },
  {
    id: 5160,
    attach: 27,
    title: "Wo? Ort & Richtung",
    blurb: "The four here/there words and the compass of the body: hier, dort, drüben, gegenüber, Umweg, links, rechts, geradeaus, oben, unten.",
    lessons: [
      { ...shell(5161, "Ort I: hier, dort, drüben, gegenüber, der Umweg", "Deictics as pure Germanic: hier (here), dort (there, from *þar), drüben (over there), gegenüber (opposite — gegen+über). English kept hier/here and dort/there, but lost drüben and gegenüber as single words and spells the detour with borrowed letters."), authored: true },
      { ...shell(5162, "Richtung I: links, rechts, geradeaus, oben, unten", "Direction as fixed spatial metaphor: left/right, straight ahead (geradeaus), up, down — the same body-relative frame every language inherits from its hearer."), authored: true },
    ],
  },
  {
    id: 5170,
    attach: 27,
    title: "Die Himmelsrichtungen & die Ferne",
    blurb: "hinten plus the four compass points, and the distance words: Nähe, weit, fern, quer, entlang.",
    lessons: [
      { ...shell(5171, "Richtung II: hinten, Norden, Osten, Westen, Süden", "hinten (behind — German hardened the D of the behind-root to T), then the four compass points: Osten and Westen are dawn and evening, Süden the sun side, Norden the old left-hand-of-dawn word."), authored: true },
      { ...shell(5172, "Entfernung: die Nähe, weit, fern, quer, entlang", "Near/far as a single axis — die Nähe, weit, fern — plus quer (across) and entlang (along), the two prepositions that take a path rather than a place."), authored: true },
    ],
  },
  {
    id: 5180,
    attach: 15,
    title: "Die Lehnwörter: was die Engländer ausgeliehen haben",
    blurb: "The borrowings that run the other way — Sofa, Radio, Klavier, Computer, Kino, Hotel, Taxi, Bus, Theater, Hobby.",
    lessons: [
      { ...shell(5181, "Lehnwörter I: Sofa, Radio, Klavier, Computer, Kino", "Five objects English handed over and German pronounced with its own mouth: Klavier (from French clavier), Kino (from cinema), Computer. German writes them, then says them with German rules."), authored: true },
      { ...shell(5182, "Lehnwörter II: Hotel, Taxi, Bus, Theater, das Hobby", "The travel-and-leisure layer: Hotel, Taxi, Bus (Latin), Theater (Greek), Hobby. Note the stress pattern German imposes — Bus is short, Theater is not."), authored: true },
    ],
  },
  {
    id: 5190,
    attach: 20,
    title: "Kleidung & Anziehen",
    blurb: "The everyday wardrobe in two lessons: Schuh, Hose, Hemd, Mantel, Jacke — then Socke, Tasche, Mütze, Schal, Hut.",
    lessons: [
      { ...shell(5191, "Kleidung I: der Schuh, die Hose, das Hemd, der Mantel, die Jacke", "Tragen takes clothes like a subject takes a state: Ich trage einen Mantel. Four of the five are English twins — Schuh, Hose, Mantel, Jacke; das Hemd is the honest loss."), authored: true },
      { ...shell(5192, "Kleidung II: die Socke, die Tasche, die Mütze, der Schal, der Hut", "The small gear, where the borrowing runs both ways: die Socke and English sock share Latin soccus, and der Schal is a loan FROM English shawl. Tasche and Mütze are the honest losses."), authored: true },
    ],
  },
  {
    id: 5200,
    attach: 21,
    title: "Die Wohnung: Räume & Möbel",
    blurb: "Where things live: Zimmer, Wohnung, Flur, Keller, Etage — then Teppich, Schrank, Spiegel, Vorhang, Balkon.",
    lessons: [
      { ...shell(5201, "Wohnen I: das Zimmer, die Wohnung, der Flur, der Keller, die Etage", "The rooms of a flat, and the compound engine that builds the rest: Wohnzimmer, Schlafzimmer, Badezimmer, Esszimmer — one head noun, four different front halves. das Zimmer is English timber's shifted twin."), authored: true },
      { ...shell(5202, "Wohnen II: der Teppich, der Schrank, der Spiegel, der Vorhang, der Balkon", "Furniture and fittings, where die/das flips without warning: der Teppich but das Sofa. The Vorhang (curtain) is a literal 'hang-before' — an inseparable prefix wearing a noun."), authored: true },
    ],
  },
  {
    id: 5210,
    attach: 21,
    title: "Tisch & Küche",
    blurb: "Telling: Gabel, Messer, Flasche, Becher, Kanne — then the kitchen's machines: Herd, Ofen, Seife, Kamm, Klingel.",
    lessons: [
      { ...shell(5211, "Am Tisch: die Gabel, das Messer, die Flasche, der Becher, die Kanne", "Table words with old stories: das Messer is the ancient meat-blade (*matisahsą), and die Flasche, der Becher and die Kanne have English cousins too — flask, beaker, can."), authored: true },
      { ...shell(5212, "In der Küche: der Herd, der Ofen, die Seife, der Kamm, die Klingel", "The kitchen's real estate — der Herd is hearth's cousin, die Seife and soap are twins with Rome holding a loan-copy, and der Ofen is oven's own twin — an f where English wears a v."), authored: true },
    ],
  },
  {
    id: 5220,
    attach: 6,
    title: "Essen I: Fisch, Fleisch, Käse, Suppe, Gemüse",
    blurb: "The German table's backbone: fish, meat, cheese, soup and vegetables.",
    lessons: [
      { ...shell(5221, "Essen I: der Fisch, das Fleisch, der Käse, die Suppe, das Gemüse", "The table's backbone sorted by kinship: Fisch and Fleisch are pure twins (Fleisch is the flesh English narrowed), Käse and Suppe are shared Latin loans, and das Gemüse grew inside German alone."), authored: true },
      { ...shell(5222, "Essen II: das Obst, die Kartoffel, die Tomate, die Gurke, die Zwiebel", "Fruit and vegetables with their passports: Kartoffel is the Italian truffle's name (tartufo), Tomate came from Nahuatl through Spanish, Gurke from Polish ogórek, and Zwiebel is Latin cepula — English chive's grandmother."), authored: true },
    ],
  },
  {
    id: 5230,
    attach: 6,
    title: "Essen III & der Frühstückstisch",
    blurb: "Sweet things — Zucker, Honig, Schokolade, Keks, Torte — and the breakfast set: Frühstück, Brötchen, Marmelade, Toast.",
    lessons: [
      { ...shell(5231, "Essen III: der Zucker, der Honig, die Schokolade, der Keks, die Torte", "The sweet shelf, and three words English is merely spelling: Zucker ← sugar, Keks ← cakes, Torte ← Italian torta. Die Torte is the birthday cake you already know from topic 21."), authored: true },
      { ...shell(5232, "Frühstück: das Frühstück, das Brötchen, die Marmelade, der Toast, die Butter", "The one meal with its own noun: das Frühstück is früh + Stück, the early piece (English named the broken fast instead). The Brötchen is the little bread — the diminutive -chen, the same job as English -let."), authored: true },
    ],
  },
  {
    id: 5240,
    attach: 22,
    title: "Farben",
    blurb: "The colour set in two lessons: rot, blau, grün, schwarz, bunt — then braun, grau, rosa, lila, Farbe.",
    lessons: [
      { ...shell(5241, "Farben I: rot, blau, grün, schwarz, bunt", "The primaries plus bunt (coloured) — where rot is red wearing the D→T hardening (Tag/day's law), blau and grün are pure twins, and schwarz survives in English only as the poetic swarthy."), authored: true },
      { ...shell(5242, "Farben II: braun, grau, rosa, lila, die Farbe", "The second row, all of them noun-shaped adjectives: braun ← brown, grau ← grey, rosa ← rosa, lila ← lilac. die Farbe (colour) is the head noun that compounds them."), authored: true },
    ],
  },
  {
    id: 5250,
    attach: 27,
    title: "Reisen I: Fahrrad, Koffer, Karte, Haltestelle, Dorf",
    blurb: "Getting around on land, and the paperwork that comes with it.",
    lessons: [
      { ...shell(5251, "Reisen I: das Fahrrad, der Koffer, die Karte, die Haltestelle, das Dorf", "Bike, suitcase, map, stop, village: die Karte is English's card/chart by way of Latin charta, and die Haltestelle keeps the D→T shift you drilled in halten (hold)."), authored: true },
      { ...shell(5252, "Reisen II: die Fahrkarte, der Fahrplan, die Abfahrt, die Ankunft, der Flughafen", "The travel-timetable set, and the pair that answers 'when does it leave / when does it arrive' — die Abfahrt freezes fahren, die Ankunft freezes kommen."), authored: true },
    ],
  },
  {
    id: 5260,
    attach: 27,
    title: "Reisen III & Länder I",
    blurb: "Tourists and their luggage, then the country names: Deutschland, Frankreich, England, Spanien, Italien.",
    lessons: [
      { ...shell(5261, "Reisen III: der Ausflug, der Tourist, das Gepäck, der Pass, die Fähre", "The excursion set — der Ausflug (out-trip), das Gepäck (singular collective, no plural in the everyday), der Pass for the border, die Fähre for the crossing."), authored: true },
      { ...shell(5262, "Länder I: Deutschland, Frankreich, England, Spanien, Italien", "Five country names that English mostly abandoned (Deutschland/Germany, Frankreich/France) alongside the ones it kept (England, Spanien/Spain, Italien/Italy)."), authored: true },
    ],
  },
  {
    id: 5270,
    attach: 12,
    title: "Länder II & Sprachen",
    blurb: "Schweiz, Österreich, Türkei, Polen, Irland — plus Sprache and the four language adjectives.",
    lessons: [
      { ...shell(5271, "Länder II: die Schweiz, Österreich, die Türkei, Polen, Irland", "The second row of country names, with their -ei and -land endings intact, and the two that carry an umlaut: die Türkei and Österreich."), authored: true },
      { ...shell(5272, "Sprachen: die Sprache, französisch, englisch, spanisch, italienisch", "Language names as adjectives — ich spreche Französisch — built on Sprache, whose K→CH shift is the same law as Milch and Bücher."), authored: true },
    ],
  },
  {
    id: 5280,
    attach: 18,
    title: "Berufe I & II",
    blurb: "What people do for work: Arzt, Bäcker, Verkäufer, Polizist, Schüler — then Student, Fahrer, Sänger, Bauer, Arbeiter.",
    lessons: [
      { ...shell(5281, "Berufe I: der Arzt, der Bäcker, der Verkäufer, der Polizist, der Schüler", "The five jobs a first conversation needs. Four are built from a word you can see inside them (verkaufen, backen, Polizei, Schule); der Arzt is the odd one out."), authored: true },
      { ...shell(5282, "Berufe II: der Student, der Fahrer, der Sänger, der Bauer, der Arbeiter", "The -er job suffix does the same work English's -er does, but German also feminises and lengthens: die Sängerin, die Arbeiterin. Der Bauer is the farmer, not the builder."), authored: true },
    ],
  },
  {
    id: 5290,
    attach: 18,
    title: "Berufe III & Hobbys I",
    blurb: "Ingenieur, Friseur, Beruf, Pilot, Kellner — then Musik, Sport, Lied, tanzen, malen.",
    lessons: [
      { ...shell(5291, "Berufe III: der Ingenieur, der Friseur, der Beruf, der Pilot, der Kellner", "Beruf is the abstract noun the -er jobs hang under, and the list is where English borrowed hardest: Ingenieur, Pilot. Kellner comes from kelnern — to serve."), authored: true },
      { ...shell(5292, "Hobbys I: die Musik, der Sport, das Lied, tanzen, malen", "What you do with the free time — Musik from the Greek Muses, Sport a reverse loan from English, tanzen the French word English dances to, and das Lied with its lost Old English cousin."), authored: true },
    ],
  },
  {
    id: 5300,
    attach: 13,
    title: "Hobbys II & Menschen",
    blurb: "Party, Gitarre, reiten, Schach, Freizeit — then wir, Schule, Gast, Gruppe, Held.",
    lessons: [
      { ...shell(5301, "Hobbys II: die Party, die Gitarre, reiten, das Schach, die Freizeit", "The past-time set, and die Freizeit — free-time — the compound engine turning Freizeit into Freizeitpark and Freizeitstress."), authored: true },
      { ...shell(5302, "Menschen: wir, die Schule, der Gast, die Gruppe, der Held", "The pronouns and the people around you: wir is the only new pronoun A1 adds, der Gast is guest with Latin hostis as its PIE cousin, and der Held is the Old English hæleþ — the warrior word English let go."), authored: true },
    ],
  },
  {
    id: 5310,
    attach: 24,
    title: "Gefühle & Adjektive",
    blurb: "The emotional set — Liebe, nett, wütend, stolz, Freude — and five high-value adjectives: richtig, falsch, sauber, leer, offen.",
    lessons: [
      { ...shell(5311, "Gefühle: die Liebe, nett, wütend, stolz, die Freude", "The feeling nouns, where the -ung suffix does the same job English's -ness does (Freude/joy, Liebe/love), and wütend/stolz show the dative-free adjective turning back into a noun: der Zorn, der Stolz."), authored: true },
      { ...shell(5312, "Adjektive: richtig, falsch, sauber, leer, offen", "Five adjectives, three of them near-twins of English — richtig/right, falsch/false, offen/open — plus sauber (clean) and leer (empty)."), authored: true },
    ],
  },
];

/**
 * Star gates at the natural family boundaries of the curriculum. Each one closes the
 * stretch of topics that the next stretch is built on, and demands a star count between
 * the stretch's cores (minimum) and all its lessons (maximum):
 *
 *   1–2   sentence basics            ┐
 *   3–7   the five great shifts      ┘→ Shift Gate      14★ of 22 (7 cores min, 22 max)
 *   8–10  -ieren, conjugation, accusative  → Grammar Gate     6★ of 9 (3 min, 9 max)
 *   11–16 determiners, negation, questions, word order, prefixes → Verb-Complex Gate  11★ of 22 (6 min, 22 max)
 *   17–20 numbers, Perfekt, ablaut, dative → Past Gate        9★ of 18 (4 min, 18 max)
 *   21–26 compounds, gender, plurals, hidden shifts → Atlas Gate       11★ of 22 (6 min, 22 max)
 *   27–29 prepositions, verb families, sein & idioms → Capstone Gate    9★ of 11 (3 min, 11 max)
 *   30    capstone
 */
export const TRAIL_GATES: TrailGate[] = [
  {
    id: 1,
    afterTopic: 7,
    requiredStars: 14,
    title: "The Shift Gate",
    why: "Topics 1–7 build your decode engine: sentence basics plus all five great consonant shifts (P→F, TH→D, T→S, K→CH, D→T). Every grammar topic ahead assumes you can decode shift vocabulary on sight — bank 14 of the 22 lessons in this stretch before moving on.",
  },
  {
    id: 2,
    afterTopic: 10,
    requiredStars: 6,
    title: "The Grammar Gate",
    why: "Topics 8–10 land your first grammar: -ieren verbs, the living conjugation endings and the accusative Him-Case. Articles, negation and questions ahead assume solid verbs and direct objects — earn 6 of the 9 lessons in this stretch.",
  },
  {
    id: 3,
    afterTopic: 16,
    requiredStars: 11,
    title: "The Verb-Complex Gate",
    why: "Topics 11–16 assemble the sentence machine: determiners, negation, questions, word order and both prefix families. The past-tense stretch ahead assumes you can build complex sentences — bank 11 of the 22 lessons here.",
  },
  {
    id: 4,
    afterTopic: 20,
    requiredStars: 9,
    title: "The Past Gate",
    why: "Topics 17–20 hand you time, the conversational past, ancient ablaut and the dative case. The word-formation stretch ahead reuses past-tense and case-heavy sentences in every example — earn 9 of the 18 lessons in this stretch.",
  },
  {
    id: 5,
    afterTopic: 26,
    requiredStars: 11,
    title: "The Atlas Gate",
    why: "Topics 21–26 are word formation plus the hidden shifts (V→B, GH→CH, Y→G) that complete all nine Atlas families. The final stretch is pure synthesis across everything — carry 11 of the 22 stars in this stretch with you.",
  },
  {
    id: 6,
    afterTopic: 29,
    requiredStars: 9,
    title: "The Capstone Gate",
    why: "Topics 27–29 close the system: prepositions and their cases, verb families, and sein with the idiomatic mindset. The capstone reading assumes near-complete coverage of the language — earn 9 of the 11 lessons in this stretch.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Authored status lives on the shells themselves, so this module stays light
// enough for the trail map and landing page — importing LESSONS here used to
// pull every lesson body into the client bundle.
const AUTHORED_SHELLS = new Map<number, LessonShell>();
for (const topic of TOPICS) {
  if (topic.core.authored) AUTHORED_SHELLS.set(topic.core.id, topic.core);
  for (const sprig of topic.sprigs) {
    if (sprig.authored) AUTHORED_SHELLS.set(sprig.id, sprig);
  }
}
for (const branch of TRAIL_BRANCHES) {
  for (const lesson of branch.lessons) {
    if (lesson.authored) AUTHORED_SHELLS.set(lesson.id, lesson);
  }
}

export const AUTHORED_LESSON_COUNT = AUTHORED_SHELLS.size;

export const getAuthoredLesson = (lessonId: number) => AUTHORED_SHELLS.get(lessonId);

export const isAuthoredNode = (nodeId: number) => AUTHORED_SHELLS.has(nodeId);

/** Next authored core lesson in spine order after the given one (null = caught up). */
export const getNextPlayableLessonId = (currentId: number): number | null => {
  for (let id = currentId + 1; id <= TOTAL_TOPICS; id++) {
    if (isAuthoredNode(id)) return id;
  }
  return null;
};

/** Flatten topics + branches into the full node list (order: topic by topic). */
export const flattenTrailNodes = () => {
  const nodes: Array<LessonShell & { kind: "core" | "sprig" | "branch"; topicId: number }> = [];
  for (const topic of TOPICS) {
    nodes.push({ ...topic.core, kind: "core", topicId: topic.id });
    for (const sprig of topic.sprigs) nodes.push({ ...sprig, kind: "sprig", topicId: topic.id });
  }
  for (const branch of TRAIL_BRANCHES) {
    for (const lesson of branch.lessons) nodes.push({ ...lesson, kind: "branch", topicId: branch.attach });
  }
  return nodes;
};
