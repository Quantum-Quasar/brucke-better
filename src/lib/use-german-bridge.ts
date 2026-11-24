"use client";

import { useEffect, useState } from "react";
import type { GermanBridgeEntry } from "@/data/dutch/german-bridge";

export interface GermanBridgeModule {
  formatGermanDutchPair: (entry: GermanBridgeEntry) => string;
  lookupGermanBridge: (key: string) => GermanBridgeEntry | null;
}

let cachedModule: GermanBridgeModule | null = null;
let pendingPromise: Promise<GermanBridgeModule> | null = null;

function loadGermanBridge(): Promise<GermanBridgeModule> {
  if (cachedModule) return Promise.resolve(cachedModule);
  if (!pendingPromise) {
    pendingPromise = import("@/data/dutch/german-bridge").then((mod) => {
      cachedModule = {
        formatGermanDutchPair: mod.formatGermanDutchPair,
        lookupGermanBridge: mod.lookupGermanBridge,
      };
      return cachedModule;
    });
  }
  return pendingPromise;
}

/**
 * Lazily loads the Dutch↔German bridge dataset only when the learner is
 * studying Dutch with `dutchFromGerman` enabled.
 */
export function useGermanBridge(enabled: boolean): GermanBridgeModule | null {
  const [mod, setMod] = useState<GermanBridgeModule | null>(() => (enabled ? cachedModule : null));

  useEffect(() => {
    if (!enabled) return;
    if (cachedModule) {
      setMod(cachedModule);
      return;
    }
    let cancelled = false;
    void loadGermanBridge().then((loaded) => {
      if (!cancelled) setMod(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return enabled ? mod : null;
}
