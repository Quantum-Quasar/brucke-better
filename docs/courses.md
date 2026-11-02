# Courses — French, Spanish and Dutch

Brücke teaches **German** from `word_connections.md` + `src/data/lessons.ts`. The three sibling
courses — *Le Pont* (French), *El Puente* (Spanish), *De Brug* (Dutch) — reuse the same engine
(trail, atlas, review, grading) but are authored as **typed TypeScript modules**, not parsed
from markdown. This page replaces the three per-language design documents; it records the
method they share, what is distinctive per language, and the machine-checked constraints.
**Topic titles, branches, sprigs and gates live in code** (`src/data/<lang>/curriculum-<xx>.ts`) —
read those, not a prose copy that can drift. Counts: `COURSE_COUNTS` in `src/data/word-counts.ts`.

| | French (`fr`) | Spanish (`es`) | Dutch (`nl`) |
|---|---|---|---|
| Lessons / words | 123 / 306 | 123 / 293 | 75 / 390 |
| Shape | 30 cores, 72 sprigs, 15 branches (21 lessons) | 30 cores, 72 sprigs, 15 branches (21 lessons) | 30 cores, 30 sprigs, 15 branches (1 lesson each) |
| Star gates | 5, after topics 7, 10, 14, 21, 26 | 5, after topics 7, 10, 14, 21, 26 | 5, after topics 7, 14, 21, 26, 29 |
| Gender values | `le` / `la` | `el` / `la` | `de` / `het` |
| Bridge | Norman doublets + Latin conversion rules | Latin stems + a few historical sound shifts | the *unshifted* sibling: spelling and vowel bridges |

Every lesson in all three languages ends with a Twist card (`docs-sync.test.ts` asserts it).

## The method every course follows

The German and sibling courses all obey the same design principles (the long form is in
`docs/dont open untill mentioned/thinking-method-short.md`; open it only when working on the
method itself):

1. **Import knowledge.** Teach only what the learner cannot already convert from English.
2. **Reframe the scary parts as sense, not memory** (gender decoded from endings; pronouns as
   "articles on the move"; negation, word order and tenses explained by what English already does).
3. **Weave.** Plant a thread lessons before it pays off.
4. **One thought at a time.** Never ask for a structure whose parts have not each had their moment.
5. **Mask repetition.** Rotate subjects, polarity and surfaces; no prose shared between neighbouring lessons.
6. **Cue, correct correctly, raise consciousness.** Trap notes name the tempting wrong answer before the learner reaches for it.

## French — *Le Pont*

- **Bridge.** After 1066 English absorbed thousands of Norman French words. *Span 1:* Norman
  doublets (English kept the Germanic form, French the Latin one: *warden/gardien*, *estate/état*,
  *castle/château*). *Span 2:* the **conversion engine** — `-ion` nouns (all feminine), `-ation` →
  `-er` verbs, `-ity` → `-ité`, `-ance/-ence`, `-ly` → `-ment`, `-or/-er` → `-eur`, `-able`. These are
  the French "shift families" that drive the *By shift family* deck.
- **Reframes.** Gender decoded from endings (`-ion/-té/-ance` feminine; `-age/-eau/-isme/-ment`
  masculine); `le/la` introduced as "it" and later "pronouns walk left"; `ne … pas` as a sandwich;
  `il y a` as "it has there"; `quatre-vingts` as "four score"; `-é` past = English `-ed`.
- **Traps given whole lessons:** `depuis` (French uses the present where English reaches for the
  present perfect — the biggest negative-transfer trap), possessives agreeing with the *thing*,
  `être` with motion verbs, silent plural `-s`, the `célébrer` trap (the noun loses its whole `-ation`).
- **Branches** include the Nasal Clinic, False Friends Preview, tutoiement, shopping & euros, the
  conditional, and a liaison/elision ear clinic.

## Spanish — *El Puente*

- **Bridge.** English's deep Latinate vocabulary arrived directly and via Norman French; Spanish
  kept those stems alive in everyday speech. Nine families: `-ción`, `-dad`, `-mente`, the `-ar`
  verb engine, `-ico`, `-al` (invariable), and three historical shifts — Latin `f-` → silent `h-`
  (`hacer`/fact), `-ct-` → `-ch-` (`noche`/nocturnal, `leche`/lactose), `pl-/cl-/fl-` → `ll-`
  (`llave`/clef).
- **Reframes.** Gender decoded from `-ción/-dad` (feminine) and `-o/-a`; `lo/la` as "it" with
  pronoun placement taught early; negation is just `no`; **`ser` vs `estar` is *what something is*
  vs *how or where it is*** — not the misleading "permanent vs temporary"; `-ado/-ido` past = `-ed`;
  `gustar` as "it pleases me".
- **Spanish-only sprigs** German does not need: `-er/-ir` verbs, chameleon adjectives (*listo*,
  *aburrido*, *rico*), boot verbs (e→ie, o→ue), diminutives, pronoun hook vs left-walk, three
  distances (*este/ese/aquel*), `tener` expressions, `saber` vs `conocer`, `ojalá` + subjunctive
  triggers, verb dynasties.
- **False-friend traps:** *actualmente* = currently, *embarazada* = pregnant, *librería* = bookshop.

## Dutch — *De Brug*

- **Bridge.** Dutch is **Low Franconian** and skipped the High German consonant shift, so *water*
  stays *water*, *ship* becomes *schip*, *book* becomes *boek*. The early course is a recognition
  course, not a conversion course; the real work is vowels and spelling. Nine correspondence
  families: `sch_sh`, `th_d`, `f_v`, `s_z`, `gh_ch`, `vowel_ij`, `vowel_ui`, `vowel_oe`, `g_y`.
  English *y* splits in Dutch (*yellow/geel* keeps a g; *year/jaar* takes j) — never treat all *y* as *g*.
- **Reframes.** Two genders (`de`/`het`), **no noun case system** (pronouns keep case: *ik/mij*;
  genitive fossils survive: *'s avonds*); V2 word order and verb-final subordinate clauses as
  "English's lost machine"; separable verbs as a bracket; perfect = have/be + `ge-`; the little
  word `er` (existential, locative, partitive, prepositional) gets its own topic.
- **Source corrections to remember** (easy to repeat wrongly): Dutch is Low Franconian — "Low
  German" properly means Low Saxon; Dutch *oe* is /u/, so *book/boek* is a **spelling/cognacy**
  bridge, not an identical sound; weather/*weer* is cognate but is not a `th ↔ d` example; *Ik heb
  honger* is a full sentence, *heb honger* only a fragment.
- Dutch typography: *ij* is two letters, *ë/ï* keep the trema, no English spacing before `?`.

## Where the data lives

```
src/data/<language>/
  compendium-<xx>.ts   # words + correspondence families + compounds + false friends
  curriculum-<xx>.ts   # topics, branches, gates
  lessons-<xx>.ts      # authored lessons (same Lesson shape as German)
  insights-<xx>.ts     # daily insights
  lesson-factory.ts    # (Dutch only) deterministic Lesson builder shared by all specs
```

- `word_connections.md` and `parse-compendium.ts` are **German-only**; the other courses are
  never parsed from markdown.
- Shared field names such as `german_expression` stay as they are (the generated German JSON
  depends on them); the sibling courses fill them with their own language's content, and UI
  labels are parameterised by the active language.
- Wiring: `src/data/languages.ts` (availability), `language-content.ts` (per-language content map),
  `curriculum-registry.ts`, `insights-registry.ts`, `word-counts.ts`, and
  `scripts/export-client-data.ts` (writes `public/data/<lang>/`). The onboarding picker reads
  `LANGUAGES`, so a new language appears there automatically.
- Lesson ids share one numeric space across languages; progress, SRS and word maps are
  language-scoped first, so ids never collide in practice.

## Machine-checked constraints (`src/tests/{french,spanish,dutch}-content.test.ts`)

- **Ids unique** within a language; cores 1–30, sprigs `topicId*100 + n`, branches in the 5000 series.
- **No German leakage:** no prose or exercise may match
  `nicht|ich|wir|aber|auch|noch|schon|haben|werden|ist` (the `GERMAN_FUNCTION_WORDS` regex in
  each suite) or the German-only characters `ä ö ü ß`. Dutch *worden* is fine; avoid *werden*.
- **Prose uniqueness:** no hook, pattern, summary or long string copy-pasted between lessons
  (the sibling of `scripts/audit-wording.ts`, which is German-only).
- **Exercise integrity:** five exercises of ≥ 3 types per lesson; `shift_select`/`literal_gloss`
  options unique and include the target; every `transcribe` bank holds every target token
  plus at least one distractor; every `dictation` has `spoken` + `replays`; every twist bank
  contains its target.
- **Gender** uses the language's own article values; no German articles appear.
- **Counts** are pinned in `docs-sync.test.ts` and `languages.test.ts`; the root README files must
  quote them (see `AGENTS.md`).

## Authoring checklist (per lesson)

1. List every sub-skill the structure needs; each must have had its own moment earlier.
2. Fresh prose per lesson — nothing shared with neighbours.
3. Each `target_answer` is derivable from what the lesson taught; word banks carry plausible distractors.
4. Trap notes pre-empt the *actual* tempting wrong answer.
5. Foreshadow/payoff pairs point at real lesson ids; every foreshadow resolves.
6. `bun run test`, `bun run lint`, `bun run typecheck`, `bun run build`.
