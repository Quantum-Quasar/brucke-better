# De Brug — the Dutch course design

> The Dutch sibling of Brücke (German: *die Brücke*), Le Pont (French) and El Puente
> (Spanish). Same app, same method, same bridge — crossed from the North Sea side.
> This document is the Thinking Method blueprint for the Dutch course: what it
> teaches, in what order, and why. Every lesson in `src/data/dutch/lessons-nl.ts`
> must be justifiable against this document and against the guidebook's ten
> principles (`thinking-method.md` §1.1–§1.10).

## 0. What the method demands (non-negotiables)

1. **We import knowledge.** Dutch is the closest major West Germanic language to
   English. The learner already owns thousands of Dutch words in English dress:
   *water, hand, arm, finger, house/huis, book/boek, bread/brood, milk/melk,
   fish/vis, grass/gras, green/groen, cold/koud, warm, good/goed, come/komen,
   drink/drinken, sing/zingen, swim/zwemmen, help/helpen, find/vinden, see/zien,
   hear/horen, think/denken, thank/danken, work/werken, sleep/slapen.*
2. **We reframe.** Dutch's unfamiliar parts become sense, not memory:
   - **Dutch is the unshifted sibling.** English and Dutch both descend from West
     Germanic; Dutch is **Low Franconian** and did not undergo the High German
     consonant shift. German turned *water* into *Wasser* and *ship* into
     *Schiff*; Dutch kept *water* and *schip*. The early course is therefore a
     recognition course, not a conversion course: the consonants mostly line up,
     and the learner's job is to hear the Dutch vowels and spelling.
   - **The vowels are the real work.** English *book/foot/good* ↔ Dutch
     *boek/voet/goed* is a **spelling** bridge, not an identical sound: Dutch *oe*
     is /u/, English *oo* is not always the same vowel. The course says this
     explicitly.
   - **Gender is two-way, not three-way.** Dutch nouns are **de** (common) or
     **het** (neuter). There is **no noun case system**; pronouns keep case
     (*ik/mij, hij/hem*) and genitive fossils survive (*'s avonds*), but nouns
     and articles do not inflect for case as they do in German.
   - **Word order is English's lost machine.** Dutch main clauses are **V2**
     (finite verb second), fronting causes inversion, and subordinate clauses are
     verb-final. English speakers already know inversion from questions; Dutch
     generalises it.
   - **Separable verbs are a bracket, not a vocabulary list.** *opbellen*,
     *meebrengen*, *aankomen*: the prefix waits at the end. One idea, two halves.
   - **The perfect tense is have/be + ge-.** *ik heb gewerkt*, *ik ben gekomen* —
     the same helper split English knows from "I have worked / I have come", plus
     the Dutch *ge-* participle.
3. **We weave.** Threads are planted lessons before they pay off: *de/het* is
   introduced as a colour, then decoded through compounds and diminutives; V2 in
   topic 12 is reused by inversion in questions, modals, separable verbs and
   subordinate clauses; *er* in topic 24 harvests the locative and partitive
   threads planted much earlier.
4. **One thought at a time.** No lesson asks for a structure whose parts haven't
   each had their own moment. The vowel bridges arrive before the present tense;
   the present tense arrives before negation and V2; the perfect arrives only
   after both past tenses.
5. **We mask repetition.** Drills rotate subjects, polarity, time words and
   surfaces. No neighbouring lesson shares prose; `src/tests/dutch-content.test.ts`
   enforces the same duplicate-prose ban as the French and Spanish suites.
6. **We cue, we correct correctly, we raise consciousness.** Trap notes name the
   over-simplification before the learner reaches for it (*"niet"* before a
   definite noun, *"geen"* before an indefinite one; *ik ben twintig*, never
   *ik heb twintig jaar*; *de/het* is lexical, not semantic).

## 1. The bridge, precisely

The Dutch bridge has three spans:

- **Span 1 — the consonant twins.** English and Dutch share the unshifted
  Germanic consonants, with regular spellings:
  - **sh ↔ sch**: ship/schip, shoe/schoen, sheep/schaap, shoulder/schouder,
    sharp/scherp.
  - **th ↔ d**: brother/broeder, three/drie, think/denken, thank/danken,
    thing/ding, other/ander, mother/moeder, father/vader, thousand/duizend,
    tooth/tand. (Weather/weer is cognate, but Dutch lost the d; do not use it as
    a th↔d example.)
  - **f ↔ v**: father/vader, foot/voet, full/vol, fish/vis, fire/vuur,
    free/vrij, friend/vriend, five/vijf.
  - **s ↔ z**: sun/zon, summer/zomer, sea/zee, salt/zout, seven/zeven,
    sing/zingen, son/zoon, south/zuid.
  - **gh ↔ ch/g**: night/nacht, light/licht, right/recht, eight/acht,
    daughter/dochter, thought/gedachte.
  - **English y splits in Dutch**: yellow/geel and yield/gelden keep a g; year/jaar,
    yes/ja, young/jong and your/jouw take Dutch j. Do not treat all English y as g.
  - **g ↔ g**: gold/goud, good/goed, goose/gans, green/groen, grass/gras,
    guest/gast, give/geven.
  - **w ↔ w, t ↔ t, p ↔ p, k ↔ k**: water, wind, word/woord, work/werk;
    eat/eten, street/straat, better/beter, let/laten; pepper/peper,
    apple/appel, ship/schip, hope/hopen, sleep/slapen; book/boek,
    make/maken, milk/melk, seek/zoeken.
- **Span 2 — the vowel bridges.** Dutch spelling does the work:
  - **ij ↔ English i/y**: ice/ijs, iron/ijzer, wine/wijn, five/vijf, mine/mijn,
    time/tijd, line/lijn, ride/rijden.
  - **ui ↔ English ou/ow**: house/huis, mouse/muis, out/uit, south/zuid,
    thousand/duizend, brown/bruin.
  - **oe ↔ English oo/u (spelling)**: book/boek, foot/voet, good/goed,
    blood/bloed, door/deur, cool/koel, school/school, sweet/zoet.
  - **aa/ee/oo/uu**: long vowels; *maan/moon, jaar/year, naam/name, steen/stone,
    brood/bread, rood/red, muur/wall, uur/hour.*
  - **eu/ei/au/ou** are Dutch diphthongs; teach the sound with the spelling.
- **Span 3 — the grammar English lost.** V2, inversion, verb-final subordinate
  clauses, separable prefixes, *de/het*, *niet/geen*, *er*, reflexives and the
  perfect tense. These are the real course; the vocabulary is the free part.

These become the compendium's **correspondence families** (`compendium-nl.ts`),
which drive the Atlas-style "By correspondence family" review deck exactly as the
German/French/Spanish families do.

## 2. Course architecture (30 topics)

### Phase 1 — the decode engine

1. **The Dutch Inside Your English** — the unshifted sibling; water/water,
   ship/schip, book/boek; *ik ben*, *jij bent*, *het is*; first sentences.
2. **The SCH Bridge** — English sh ↔ Dutch sch; *schip, schoen, schaap,
   schouder*; one sound, three letters.
3. **The TH → D Bridge** — *broeder, drie, denken, danken*; the dental fricative
   English kept and Dutch hardened.
4. **The F → V & S → Z Bridges** — *vader, voet, vis; zon, zee, zout*; Dutch
   voicing and final devoicing.
5. **The GH → CH Bridge** — *nacht, licht, recht, acht*; the throat sound that
   English spells with gh.
6. **The Vowel Bridges** — *ijs, huis, boek*; Dutch's real phonological work.
7. **G, CH & Dutch Spelling** — *geel, goed*; the g/ch contrast, final
   devoicing (*hond* but *honden*), and why Dutch writes *t* for *d* at a word's
   end. *Year/jaar* belongs here as a y↔j twin, not a y↔g one.

### Phase 2 — the sentence machine

8. **Zijn & Hebben** — *ik ben, jij bent, hij is; ik heb*; age with *zijn*
   (*ik ben twintig*), not *hebben*.
9. **De & Het: Gender Without Case** — two articles, no noun case; decode from
   compounds (*het hoofd* + *de stad* → *de hoofdstad*), endings and diminutives.
   The adjective `-e` belongs here: *een groot huis* but *het grote huis*.
10. **The Present Tense** — stem + *-t/-en*; *ik werk, jij werkt, wij werken*;
    the *-t* that disappears in inversion.
11. **Niet & Geen** — *niet* for verbs/adjectives/definite nouns, *geen* for
    indefinite nouns; placement after the verb cluster.
12. **Word Order: The Dutch Bracket** — V2, fronting, inversion; time–manner–place.
13. **Modals & the Final Infinitive** — *kan, moet, mag, wil, zal*; the second
    verb waits at the end.
14. **Separable Verbs** — *opbellen, meebrengen, aankomen*; the prefix walks to
    the end.

### Phase 3 — time travel

15. **Numbers & Time** — *een, twee, drie*; *half drie* = half past two; the
    Dutch clock counts toward the next hour.
16. **Days, Months & Dates** — *maandag, januari, vandaag, morgen, gisteren*;
    *op maandag, in januari*.
17. **The Weak Past** — *werk→werkte, maak→maakte*; *-te/-de* by the stem's last
    sound.
18. **The Strong Past** — *kom→kwam, zie→zag, geef→gaf*; the ablaut English still
    knows as *sing/sang*.
19. **The Perfect Tense** — *ik heb gewerkt, ik ben gekomen*; *hebben/zijn* + the
    *ge-* participle.
20. **The Future & the Would-World** — *gaan + infinitive* for plans; *zou* for
    the polite conditional.
21. **Comparatives & Superlatives** — *groter, grootst; beter, best*; *dan* and
    *als*.

### Phase 4 — the deep engine

22. **Pronouns & Possessives** — object pronouns (*mij/me, jou/je, hem, haar*),
    possessives (*mijn, jouw, zijn, haar*), and the polite *u*.
23. **Reflexives & Daily Routine** — *ik was me, ik voel me*; Dutch uses a
    reflexive where English often uses nothing.
24. **Er: The Little Word That Does Everything** — existential (*er is*),
    locative (*ik ben er*), partitive (*ik heb er twee*), prepositional (*erop*).
25. **Subordinate Clauses** — *omdat, dat, als*; the verb leaves second place and
    waits at the end.
26. **Relative Clauses & Connectors** — *die/dat, wie, wat*; *maar, hoewel, als*.

### Phase 5 — synthesis

27. **The Continuous & Position Verbs** — *aan het werken*, *zitten te lezen*;
    Dutch builds "is doing" with a posture verb.
28. **Dutch Idioms & Directness** — *lekker, gezellig, doe normaal, graag*;
    desire with *zin hebben* and *trek hebben*.
29. **Diminutives & Word Formation** — *-je, -tje, -pje, -etje*; the diminutive
    changes the article to *het* and makes new words.
30. **Capstone: De Brug Reading** — one connected Dutch story; every bridge,
    tense and connector in plain sight.

### Cluster sprigs (one per topic)

Each core topic has one side drill, from *Hidden Twins: Body & Home* (101) to
*De Brug Review* (3001). They are skippable and each practices exactly one
sub-skill of its core.

### Support branches (15, one lesson each)

| id | attach | title |
| --- | --- | --- |
| 5010 | 1 | First Words, First Spoken |
| 5020 | 2 | The Sound Gym |
| 5030 | 3 | False Friends Preview |
| 5040 | 9 | The T–V Line |
| 5050 | 12 | In de Stad |
| 5060 | 15 | Shopping & Euros |
| 5070 | 17 | The Past in the Wild |
| 5080 | 23 | De Hele Dag |
| 5090 | 26 | Connectors |
| 5100 | 20 | The Would-World |
| 5110 | 8 | Have & Hunger |
| 5120 | 13 | Eten & Drinken |
| 5130 | 14 | Reizen |
| 5140 | 22 | Familie & Beroepen |
| 5150 | 30 | Lichaam & Kleding |

### Star gates (5)

1. **The Twin Gate** — after topic 7. Topics 1–7 install the decode engine.
2. **The Sentence Gate** — after topic 14. V2, modals, negation, separable verbs.
3. **The Past Gate** — after topic 21. Both pasts, the perfect, future, comparison.
4. **The Engine Gate** — after topic 26. Pronouns, reflexives, *er*, clauses.
5. **The Capstone Gate** — after topic 29.

## 3. Where the data lives

```
src/data/dutch/
  compendium-nl.ts     # words + correspondence families + compounds + false friends
  curriculum-nl.ts     # NL_TOPICS, NL_TRAIL_BRANCHES, NL_TRAIL_GATES
  lessons-nl.ts        # authored Dutch lesson specs + NL_LESSONS
  insights-nl.ts       # DailyInsight[] — Dutch expressions + etymologies
  lesson-factory.ts    # deterministic Lesson builder (shared by all Dutch specs)
```

- **`word_connections.md` is not touched** — it is the German compendium's source
  of truth and the build pipeline (`parse-compendium.ts`) is German-only. Dutch is
  authored directly as typed TypeScript and machine-checked by
  `src/tests/dutch-content.test.ts`.
- `WordEntity.german_expression`-style field names stay as-is (the generated
  German JSON depends on them); Dutch fills them with Dutch content.
- Language wiring: `languages.ts` adds `nl` as available; `language-content.ts`
  maps `nl → { compendium: dutchCompendium, topics: NL_TOPICS, … }`;
  `curriculum-registry.ts`, `insights-registry.ts`, `word-counts.ts`,
  `scripts/export-client-data.ts` and the client loaders add the `nl` branch.
  The onboarding language picker reads `LANGUAGES`, so Dutch appears there
  automatically.

## 4. Machine-checked constraints for Dutch content

- **Ids**: cores 1–30; sprigs `topicId*100 + 1`; branches 5000-series with one
  lesson each. All ids unique within Dutch data.
- **No German leakage**: no Dutch lesson prose or exercise may contain the
  German function words the French/Spanish tests ban (`nicht, ich, wir, aber,
  auch, noch, schon, haben, werden, ist`) or German-only vowels (`ä ö ü ß`).
  Dutch *worden* is fine; avoid *werden* in prose because it is also a German
  form. Dutch trema words with *ü* are avoided in course content.
- **Prose uniqueness**: no hook, pattern, summary or long string is copy-pasted
  between lessons (test-enforced).
- **Exercise integrity**: every lesson has five exercises of at least three
  types; every `shift_select`/`literal_gloss` has unique options including the
  target; every `transcribe` word bank contains every target token plus 1–3
  distractors; every `dictation` has `spoken` + `replays`; every twist bank
  contains its target.
- **Gender**: Dutch words carry `gender: "de" | "het"` (or `null`); no German
  articles appear.
- **Docs counts**: German counts are untouched; the atlas page count grows from
  28 to 37 because Dutch adds nine unique correspondence families. README,
  `docs/README.md`, `AUDIT_MANIFEST.md` and `docs-sync.test.ts` are updated
  together.

## 5. Authoring checklist (per lesson)

1. One thought at a time — list every sub-skill the new structure needs; each
   must have had its own moment earlier.
2. Fresh prose per lesson — no sentences shared with neighbours.
3. Every exercise's `target_answer` derivable from what the lesson taught; word
   banks include 1–3 plausible distractors.
4. Trap notes preempt the *actual* tempting wrong answer.
5. Foreshadow/payoff pairs point at real lesson ids; every foreshadow resolves.
6. Dutch typography: *ij* is two letters, *ë/ï* keep the trema, no English
   spacing before *?*.
7. Run `bun run test`, `bun run lint`, `bun run typecheck`, `bun run build`.

## 6. Source corrections adopted

The research pass corrected four claims that are easy to repeat:
- Dutch is **Low Franconian**, a West Germanic language; "Low Germanic" is a
  loose label and "Low German" properly means Low Saxon.
- Dutch has no **noun** case system, but pronouns retain case (*ik/mij*) and
  genitive fossils survive (*'s avonds*).
- Dutch *oe* is /u/; English *oo* is not the same vowel. The *book/boek* pair is
  a spelling/cognacy bridge, not a sound correspondence.
- *Ik heb honger* is a full sentence; *heb honger* is only a fragment.
