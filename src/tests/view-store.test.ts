import { describe, expect, it } from "vitest";
import { parseStoredView, useViewStore } from "@/lib/view-store";
import { getAtlasFamily, getFamilyOwnerLanguageIds, UNSHIFTED_FAMILY_ID } from "@/lib/atlas-families";
import { compendium } from "@/data/compendium";
import { getNextPlayableLessonIdFrom } from "@/data/curriculum-core";
import { GERMAN_CURRICULUM } from "@/data/curriculum";
import { getNextPlayableLessonIdFor } from "@/data/curriculum-registry";

describe("persisted view state", () => {
  it("returns empty maps for missing or malformed storage", () => {
    expect(parseStoredView(null)).toEqual({
      trailByLanguage: {},
      atlasFilterByLanguage: {},
      rosterByFamily: {},
      masterByLanguage: {},
    });
    expect(parseStoredView("{not json")).toEqual(parseStoredView(null));
    expect(parseStoredView("[]")).toEqual(parseStoredView(null));
  });

  it("keeps valid positions and drops unknown languages", () => {
    const parsed = parseStoredView(
      JSON.stringify({
        trailByLanguage: {
          de: { nodeId: 12, gateId: 2 },
          xx: { nodeId: 1, gateId: 1 },
        },
        atlasFilterByLanguage: { fr: "ion", xx: "no" },
        rosterByFamily: { ion: { query: "port", visible: 120 } },
        masterByLanguage: { es: { zoom: 1.25, nodeId: "node-3" } },
      })
    );

    expect(parsed.trailByLanguage).toEqual({ de: { nodeId: 12, gateId: 2 } });
    expect(parsed.atlasFilterByLanguage).toEqual({ fr: "ion" });
    expect(parsed.rosterByFamily).toEqual({ ion: { query: "port", visible: 120 } });
    expect(parsed.masterByLanguage).toEqual({ es: { zoom: 1.25, nodeId: "node-3" } });
  });

  it("clamps out-of-range zoom, roster size and text length", () => {
    const parsed = parseStoredView(
      JSON.stringify({
        trailByLanguage: { de: { nodeId: 1.5, gateId: "2" } },
        atlasFilterByLanguage: { de: "x".repeat(500) },
        rosterByFamily: { th_to_d: { query: "y".repeat(500), visible: 99999 } },
        masterByLanguage: { de: { zoom: 99, nodeId: "z".repeat(500) } },
      })
    );

    expect(parsed.trailByLanguage.de).toEqual({ nodeId: null, gateId: null });
    expect(parsed.atlasFilterByLanguage.de).toHaveLength(200);
    expect(parsed.rosterByFamily.th_to_d.query).toHaveLength(200);
    expect(parsed.rosterByFamily.th_to_d.visible).toBe(1000);
    expect(parsed.masterByLanguage.de.zoom).toBe(2.6);
    expect(parsed.masterByLanguage.de.nodeId).toHaveLength(200);
  });

  it("rejects prototype-polluting family keys", () => {
    const parsed = parseStoredView(
      '{"rosterByFamily":{"__proto__":{"query":"polluted","visible":60},"constructor":{"query":"polluted","visible":60},"safe":{"query":"kept","visible":60}}}'
    );

    expect(Object.keys(parsed.rosterByFamily)).toEqual(["safe"]);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});

describe("atlas family ownership", () => {
  it("maps the unshifted layer to every available atlas", () => {
    expect(getFamilyOwnerLanguageIds(UNSHIFTED_FAMILY_ID).sort()).toEqual(
      ["de", "es", "fr", "nl"].sort()
    );
  });

  it("finds the defining course for authored family ids", () => {
    expect(getFamilyOwnerLanguageIds("th_to_d")).toContain("de");
    expect(getFamilyOwnerLanguageIds("cion")).toContain("es");
    expect(getFamilyOwnerLanguageIds("not_a_family")).toEqual([]);
  });

  it("never resolves prototype members as families or views", () => {
    expect(getAtlasFamily(compendium, "__proto__")).toBeUndefined();
    expect(getAtlasFamily(compendium, "constructor")).toBeUndefined();
    expect(getFamilyOwnerLanguageIds("__proto__")).toEqual([]);

    useViewStore.getState().openAtlasFamily("__proto__", []);
    expect(useViewStore.getState().subView).toBeNull();
  });
});

describe("next playable lesson", () => {
  it("matches the synchronous registry for the default course", () => {
    expect(getNextPlayableLessonIdFrom(GERMAN_CURRICULUM, 1)).toBe(
      getNextPlayableLessonIdFor("de", 1)
    );
    expect(getNextPlayableLessonIdFrom(GERMAN_CURRICULUM, 1)).not.toBeNull();
  });

  it("returns null outside the trail", () => {
    expect(getNextPlayableLessonIdFrom(GERMAN_CURRICULUM, 999999)).toBeNull();
  });
});
