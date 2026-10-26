import { ConstellationDetailClient } from "@/components/atlas/ConstellationDetailClient";
import { compendium as data } from "@/data/compendium";
import { frenchCompendium } from "@/data/french/compendium-fr";
import { spanishCompendium } from "@/data/spanish/compendium-es";
import { getAtlasFamilies } from "@/lib/atlas-families";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CompendiumData } from "@/lib/types";

// 100% SSG: only the authored shift families plus the unshifted layer may
// render; anything else 404s at the router level instead of hitting a
// dynamic server render
export const dynamicParams = false;

// Each family id is owned by the language(s) whose compendium defines it. A
// family id is shared across atlases only by coincidence of naming, so the
// server tells the client which language(s) can actually render this route.
const COMPENDIA_BY_LANGUAGE: ReadonlyArray<readonly [languageId: string, compendium: CompendiumData]> = [
  ["de", data],
  ["fr", frenchCompendium],
  ["es", spanishCompendium],
];

function getOwnerLanguageIds(familyId: string): string[] {
  return COMPENDIA_BY_LANGUAGE.filter(([, compendium]) =>
    getAtlasFamilies(compendium).some((family) => family.id === familyId)
  ).map(([languageId]) => languageId);
}

/** The first authored family with this id, shared by metadata and the page. */
function resolveFamily(familyId: string) {
  for (const [languageId, compendium] of COMPENDIA_BY_LANGUAGE) {
    const match = getAtlasFamilies(compendium).find((entry) => entry.id === familyId);
    if (match) return { languageId, family: match };
  }
  return null;
}

// Union across languages: each compendium owns its family ids and the client
// resolves the id against the active language's data, so one static page per
// family id serves every course.
export function generateStaticParams() {
  const ids = new Set<string>();
  for (const [, compendium] of COMPENDIA_BY_LANGUAGE) {
    for (const family of getAtlasFamilies(compendium)) {
      ids.add(family.id);
    }
  }
  return [...ids].map((family) => ({ family }));
}

interface PageProps {
  params: Promise<{ family: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { family } = await params;
  const resolved = resolveFamily(family);
  if (resolved) {
    return {
      title: `${resolved.family.name} — Atlas — Brücke`,
      description: resolved.family.phonetic_rule,
    };
  }
  return { title: "Atlas — Brücke" };
}

export default async function ConstellationDetailPage({ params }: PageProps) {
  const { family } = await params;
  const ownerLanguageIds = getOwnerLanguageIds(family);
  // Unknown ids already 404 via dynamicParams = false; this guards the case of
  // a family that no authored compendium actually defines.
  if (ownerLanguageIds.length === 0) notFound();
  const resolved = resolveFamily(family);
  return (
    <ConstellationDetailClient
      familyId={family}
      ownerLanguageIds={ownerLanguageIds}
      serverFamily={
        resolved
          ? {
              symbol: resolved.family.symbol,
              name: resolved.family.name,
              phonetic_rule: resolved.family.phonetic_rule,
            }
          : undefined
      }
    />
  );
}
