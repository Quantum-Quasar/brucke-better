# Brücke — learn German through familiar words

**Start with something familiar. Build something you can use.**

*Wasser* looks like *water*. *Handschuh* breaks into “hand” and “shoe.” Connections like these can make a word easier to remember, but they are a starting point, not a promise that every German word follows one conversion rule. Brücke pairs short explanations with examples, practice and spaced repetition.

## What it is

Four surfaces, one learning engine:

- **The Trail** — 30 topic clusters and 179 lessons, including extra practice and reading stories. Lessons introduce a useful pattern, show examples, then let you practise. Star quotas and checkpoint tests gate later stretches; missed answers return for correction or guided re-learning.
- **The Sound Shift Atlas** — an optional visual reference for word families and sound correspondences, with highlighted letters and short practice drills. You do not need to study historical linguistics to take a lesson.
- **The Grammar Panorama** — an optional reference map of German structure, including articles, the verb bracket, adjective endings and tense patterns. No levels or gating.
- **The Review Hub** — SuperMemo SM-2 spaced repetition with **10 review deck types** for vocabulary and example sentences: due, learned, shift family, domain, weakest words, recent lessons, compounds & traps, sentence patterns, article & gender, and everything. A separate failed-sentence-process queue replays the exercise that went wrong, up to 15 per session, without changing stars or word mastery. Four word-review styles are available overall; Article & Gender uses multiple choice only.

Start with **Continue lesson**, **Review learned words**, or **Practise difficult words**. Advanced practice filters are tucked under **More practice options**. The article drill practises the usual singular definite article for gendered nouns in German, Dutch, French and Spanish; it does not teach cases or articles in sentence context. Gender is hidden before recall so the answer is not given away.

Lessons mix supported word-building, sentence production, translation and listening. Historical notes are optional. Explanations should be short and grounded in the meaning and example: keep a useful memory aid, or teach the word plainly when the connection is shaky. There is no requirement to prove every historical derivation or add citations before teaching a word.

The same engine also runs French, Spanish and Dutch courses. The German compendium contains **1226 words**; the [canonical project guide](./docs/README.md) describes course coverage and implementation.

German cores from Topic 5 include mixed-pattern recognition. Each taught German word
has assessed retrieval in at least two distinct lessons; this is a practice floor,
not a guaranteed number of repetitions needed to learn it. Exact-form subtitle
frequency ranks help prioritize tied word reviews, with corpus limits shown in the drawer.
Appearance starts with 12 themes and six fonts; the full collections remain available.

## Links, storage and privacy

Lessons and atlas details open as client-rendered overlays with short shareable query URLs that include the learning language, such as `/?lesson=1&lang=de`. Opening, changing and closing a view replaces the current history entry; copying a link or reloading restores the selected view and language. Moving to another top-level tab creates normal navigation history. Legacy lesson and atlas paths still redirect; lessons are not server-rendered pages.

The app uses **Next.js 16.4.1** (declared `^16.4.1`, locked in `bun.lock`) with static top-level tabs and browser-rendered lesson content. Progress is local-first, with JSON backup export/import. There are no accounts or telemetry; accounts, cross-device recovery and optional privacy-respecting tracking remain future ideas, not implemented features. Use `bun run test` for current automated test totals rather than a manually pinned marketing count.

**The pitch in one line:** *Learn useful German by connecting familiar words, trying the pattern, and practising what needs another look.*
