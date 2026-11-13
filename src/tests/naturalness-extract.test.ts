import { describe, it, expect } from "vitest";
import { BUCKETS, bucketName, extractNaturalnessRows, normalizeKey } from "../lib/naturalness-extract";

// Native-speaker naturalness review extraction (spec: docs/ideas to add in
// future/native-speaker-naturalness-audit.md, Option B). The extraction is a
// review packet, not a correctness gate — these tests pin its invariants:
// full provenance, deterministic output, exactly-one-bucket, and a corpus size
// that does not silently shrink when a surface stops being extracted.

const { rows, stats } = extractNaturalnessRows();

describe("Naturalness extraction — row shape", () => {
  it("gives every row non-empty German and provenance of the form <lessonId> · <surface>", () => {
    for (const row of rows) {
      expect(row.german.trim().length, `row ${row.id} has empty German`).toBeGreaterThan(0);
      expect(row.sources.length, `row ${row.id} (${row.german}) has no provenance`).toBeGreaterThan(0);
      for (const source of row.sources) {
        expect(source, `row ${row.id} provenance is malformed`).toMatch(/^\d+ · [a-z_]+( · [a-z_]+)+$/);
      }
    }
  });

  it("keeps all occurrences of a sentence that appears on several surfaces", () => {
    // lesson 8 drills "Der Computer funktioniert nicht" as a transcribe target
    // and shows "Der Computer funktioniert nicht." as its use_example
    const merged = rows.find((r) => normalizeKey(r.german) === "der computer funktioniert nicht");
    expect(merged, "lesson 8 sentence missing from extraction").toBeDefined();
    expect(merged!.sources).toContain("8 · transcribe · target_answer");
    expect(merged!.sources).toContain("8 · summary · use_example");
  });

  it("lists every original spelling when a sentence is authored with variants", () => {
    const merged = rows.find((r) => normalizeKey(r.german) === "der computer funktioniert nicht");
    expect(merged!.originals.some((o) => o.endsWith("."))).toBe(true);
    expect(merged!.originals.some((o) => !o.endsWith("."))).toBe(true);
  });
});

describe("Naturalness extraction — corpus size", () => {
  it("extracts at least the floor justified by the current surfaces", () => {
    // Actual extraction: 2,387 distinct rows (mixed prose 506 + single words &
    // phrases 843 + the structural buckets). The floor leaves headroom for small
    // content edits but fails if a whole surface stops being extracted.
    expect(rows.length).toBeGreaterThanOrEqual(2_200);
  });

  it("pins the two largest surfaces so their loss is named, not inferred", () => {
    const mixedProse = stats.perBucket["mixed-prose"] ?? 0;
    const singleWords = stats.perBucket["single-words-phrases"] ?? 0;
    // 179 hooks + 179 patterns + 150 vocab notes, deduplicated
    expect(mixedProse).toBeGreaterThanOrEqual(450);
    // matching cards + short answers dominate this bucket
    expect(singleWords).toBeGreaterThanOrEqual(700);
  });
});

describe("Naturalness extraction — bucketing", () => {
  it("lands every sentence in exactly one bucket of the fixed bucket list", () => {
    const slugs = new Set(BUCKETS.map((b) => b.slug));
    const seen = new Map<string, number>();
    for (const row of rows) {
      expect(slugs.has(row.bucket), `row ${row.id} (${row.german}) landed in unknown bucket "${row.bucket}"`).toBe(true);
      seen.set(row.bucket, (seen.get(row.bucket) ?? 0) + 1);
    }
    // the per-bucket counts must reconstruct the full corpus — no double counting
    const total = [...seen.values()].reduce((n, c) => n + c, 0);
    expect(total).toBe(rows.length);
    for (const bucket of BUCKETS) {
      expect(stats.perBucket[bucket.slug] ?? 0).toBe(seen.get(bucket.slug) ?? 0);
    }
  });

  it("keeps 'other' below the reported heuristic threshold", () => {
    // Keyword bucketing cannot name every structure; ~12% of rows currently have
    // no marker (subordinate-clause variants, fixed expressions, card lists).
    const otherShare = (stats.perBucket["other"] ?? 0) / rows.length;
    expect(otherShare, `other bucket grew to ${Math.round(otherShare * 100)}% — the bucket heuristics need a new rule`).toBeLessThan(0.15);
  });
});

describe("Naturalness extraction — packet hygiene", () => {
  it("never ships an English-only row on a German surface", () => {
    // reverse_cognate / variant_english / literal_gloss target_answers are
    // authored English; the German test must keep them out of the packet.
    // Mixed-prose rows are whole teaching paragraphs that may start in English —
    // their German is embedded, so they are exempt here by design.
    const englishLeading = rows.filter(
      (r) => r.bucket !== "mixed-prose" && /^(the|this|that|these|those|we|they|i|you|he|she|it|there)\b/i.test(r.german)
    );
    expect(
      englishLeading.map((r) => `${r.id}: ${r.german}`),
      "English-by-design answers leaked into the packet"
    ).toEqual([]);
  });

  it("assigns unique stable ids of the form <bucket>-<n>", () => {
    const ids = rows.map((r) => r.id);
    expect(new Set(ids).size).toBe(rows.length);
    for (const row of rows) {
      expect(row.id).toMatch(new RegExp(`^${row.bucket}-\\d{3,}$`));
    }
  });

  it("is deterministic — two extractions produce byte-identical rows and stats", () => {
    const second = extractNaturalnessRows();
    expect(JSON.stringify(second.rows)).toBe(JSON.stringify(rows));
    expect(JSON.stringify(second.stats)).toBe(JSON.stringify(stats));
  });

  it("names every bucket in the summaries it emits", () => {
    for (const bucket of BUCKETS) {
      expect(bucketName(bucket.slug)).toBe(bucket.name);
    }
  });
});
