// ponytail: the panorama footer's "where this is taught" links, resolved from
// the curriculum instead of hand-written ids.
//
// The bug this file exists to kill: the panorama used to hard-code `/trail/N`
// beside a hand-written "Topic N · …" label, and the two drifted from the
// curriculum (German's dative is topic 20, not 19; French's `ne … pas` is topic
// 4, not 12; Spanish's ser/estar is topic 5, not 9). A link now names the lesson
// by its *title* in that language's own curriculum, and both the `href` and the
// visible topic number are derived from the lesson that is actually found — so
// the label and the destination cannot disagree. src/tests/panorama-links.test.ts
// asserts every named title resolves, is authored, and that the topic number in
// the label is the one the lesson id encodes.

import { getLanguageContent } from "./language-content";
import { lessonHref } from "@/lib/routes";
import type { PanoramaLanguageId } from "./panorama-data";

/** A link into the trail. The id is looked up from the title, never written. */
export interface LessonLinkSpec {
  kind: "lesson";
  /** Exact title of the lesson in that language's own curriculum. */
  lessonTitle: string;
  desc: string;
}

/** A link to a non-lesson page (the phonological Atlas). */
export interface PageLinkSpec {
  kind: "page";
  href: string;
  label: string;
  desc: string;
}

export type PanoramaLinkSpec = LessonLinkSpec | PageLinkSpec;

export interface PanoramaLink {
  href: string;
  /** Visible label: "Topic 12 · <the lesson's real title>". */
  label: string;
  desc: string;
  /** Resolved lesson id, or null for page links. */
  lessonId: number | null;
  /** Topic number claimed by the label, or null for page links. */
  topic: number | null;
}

export interface CurriculumEntry {
  id: number;
  title: string;
  topic: number;
  kind: "core" | "sprig" | "branch";
}

/**
 * Topic number encoded by a lesson id, per the scheme in data/curriculum.ts:
 * core = the topic id itself (1–30), sprig = topicId * 100 + index, branch =
 * 5000 + n * 10 (a branch carries no topic of its own — its attach node does).
 */
export function topicNumberOfLessonId(lessonId: number): number | null {
  if (!Number.isInteger(lessonId) || lessonId <= 0) return null;
  if (lessonId < 100) return lessonId;
  if (lessonId < 5000) return Math.floor(lessonId / 100);
  return null;
}

const entryCache = new Map<PanoramaLanguageId, CurriculumEntry[]>();

function curriculumEntries(languageId: PanoramaLanguageId): CurriculumEntry[] {
  const cached = entryCache.get(languageId);
  if (cached) return cached;

  const content = getLanguageContent(languageId);
  const entries: CurriculumEntry[] = [];
  for (const topic of content.topics) {
    entries.push({ id: topic.core.id, title: topic.core.title, topic: topic.id, kind: "core" });
    for (const sprig of topic.sprigs) {
      entries.push({ id: sprig.id, title: sprig.title, topic: topic.id, kind: "sprig" });
    }
  }
  for (const branch of content.trailBranches) {
    for (const lesson of branch.lessons) {
      entries.push({ id: lesson.id, title: lesson.title, topic: branch.attach, kind: "branch" });
    }
  }

  entryCache.set(languageId, entries);
  return entries;
}

/** The curriculum lesson with this exact title, or undefined. */
export function findLessonByTitle(
  languageId: PanoramaLanguageId,
  title: string
): CurriculumEntry | undefined {
  return curriculumEntries(languageId).find((entry) => entry.title === title);
}

function resolveLink(languageId: PanoramaLanguageId, spec: PanoramaLinkSpec): PanoramaLink | null {
  if (spec.kind === "page") {
    return { href: spec.href, label: spec.label, desc: spec.desc, lessonId: null, topic: null };
  }

  const entry = findLessonByTitle(languageId, spec.lessonTitle);
  // An unresolved title would mean a silently wrong link, so render nothing —
  // the test suite is what makes that impossible to ship.
  if (!entry) return null;

  const topic = topicNumberOfLessonId(entry.id) ?? entry.topic;
  return {
    href: lessonHref(languageId, entry.id),
    label: `Topic ${topic} · ${entry.title}`,
    desc: spec.desc,
    lessonId: entry.id,
    topic,
  };
}

/**
 * The authored link list per language, keyed by the panorama grid each link
 * belongs to. Order follows the grids top to bottom, so the footer reads as a
 * map of the page.
 */
export const PANORAMA_LINK_SPECS: Record<PanoramaLanguageId, PanoramaLinkSpec[]> = {
  de: [
    {
      kind: "lesson",
      lessonTitle: "Pronouns as Case Anchors (The Him-Case)",
      desc: "the pronoun test behind the whole article table.",
    },
    {
      kind: "lesson",
      lessonTitle: "The Article Grid & the ein-Family",
      desc: "der/die/das read as D- plus er, sie, es.",
    },
    {
      kind: "lesson",
      lessonTitle: "The Dative Case",
      desc: "dem/den/dem — the same pronoun test, one case later.",
    },
    {
      kind: "lesson",
      lessonTitle: "Modal Auxiliaries & The Bracket",
      desc: "the modal opens position 2 and the infinitive closes the sentence.",
    },
    {
      kind: "lesson",
      lessonTitle: "Word Order & Subordinate Clauses",
      desc: "dass and weil send the verb to the basement.",
    },
    {
      kind: "lesson",
      lessonTitle: "Separable Verbs & Spatial Prefixes",
      desc: "the prefix that flies to the end — still a verb in the bracket.",
    },
    {
      kind: "lesson",
      lessonTitle: "Adjective Endings: the Article's Echo",
      desc: "why the adjective only waves a flag after der/die/das and ein.",
    },
    {
      kind: "lesson",
      lessonTitle: "No Article? The Adjective Goes Strong",
      desc: "großer Baum, großes Haus — the adjective carrying the definite feeling alone.",
    },
    {
      kind: "lesson",
      lessonTitle: "The Conversational Past (Perfekt)",
      desc: "haben/sein plus participle: the past a learner actually speaks.",
    },
    {
      kind: "lesson",
      lessonTitle: "Strong Verbs & Ancient Ablaut",
      desc: "sing/sang/gesungen — where aß and ging come from.",
    },
    {
      kind: "page",
      href: "/atlas",
      label: "The Sound Shift Atlas",
      desc: "the consonant panorama, with its own drills.",
    },
  ],
  fr: [
    {
      kind: "lesson",
      lessonTitle: "Pronouns Walk Left",
      desc: "le, la, les, lui, leur before the conjugated verb — the clitic magnet.",
    },
    {
      kind: "lesson",
      lessonTitle: "en & y",
      desc: "the locative and partitive slots: j'y vais, j'en veux.",
    },
    {
      kind: "lesson",
      lessonTitle: "Ne...Pas: The Sandwich",
      desc: "wrapping negation around the first verb.",
    },
    {
      kind: "lesson",
      lessonTitle: "The -é Past",
      desc: "the passé composé built on avoir, with the participle outside the clamp.",
    },
    {
      kind: "lesson",
      lessonTitle: "Motion Takes être",
      desc: "the motion verbs that build the same past on être.",
    },
    {
      kind: "page",
      href: "/atlas",
      label: "The Sound Shift Atlas",
      desc: "all 9 French-English philological bridges.",
    },
  ],
  es: [
    {
      kind: "lesson",
      lessonTitle: "Ser & Estar: The Two Beings",
      desc: "essence versus state and physical location.",
    },
    {
      kind: "lesson",
      lessonTitle: "The -ado / -ido Past",
      desc: "haber plus -ado/-ido: the unbreakable compound past.",
    },
    {
      kind: "lesson",
      lessonTitle: "Pronoun Hook vs Left-Walk: lo quiero vs quiero verlo",
      desc: "why the pronoun walks left of the conjugated verb but hooks onto an infinitive.",
    },
    {
      kind: "lesson",
      lessonTitle: "Double Object Pronouns",
      desc: "pronouns stacking before the verb, and le lo becoming se lo.",
    },
    {
      kind: "lesson",
      lessonTitle: "Direct vs Indirect Objects: lo/la vs le",
      desc: "which slot takes lo/la and which takes le/les.",
    },
    {
      kind: "page",
      href: "/atlas",
      label: "The Sound Shift Atlas",
      desc: "all 9 Castilian-English philological bridges.",
    },
  ],
};

const resolvedCache = new Map<PanoramaLanguageId, PanoramaLink[]>();

/** The resolved footer links for a language (unresolvable specs are dropped). */
function panoramaLinksFor(languageId: PanoramaLanguageId): PanoramaLink[] {
  const cached = resolvedCache.get(languageId);
  if (cached) return cached;

  const links = PANORAMA_LINK_SPECS[languageId]
    .map((spec) => resolveLink(languageId, spec))
    .filter((link): link is PanoramaLink => link !== null);

  resolvedCache.set(languageId, links);
  return links;
}

export const PANORAMA_LINKS: Record<PanoramaLanguageId, PanoramaLink[]> = {
  de: panoramaLinksFor("de"),
  fr: panoramaLinksFor("fr"),
  es: panoramaLinksFor("es"),
};
