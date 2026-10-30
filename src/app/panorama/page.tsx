// ponytail: the grammar panorama — the second Atlas, for structure instead of sound.
// Automatically adapts to the learner's active language (German, Dutch, French,
// or Spanish) while allowing one-click structural comparison across all four courses.
//
// This is a Server Component on purpose: the footer's lesson links are resolved
// by title from each language's curriculum (data/panorama-links.ts), which means
// loading the lesson data. Doing that here keeps it out of the client bundle —
// the interactive half is app/panorama/PanoramaView.tsx.

import { PANORAMA_LINKS } from "@/data/panorama-links";
import { PanoramaView } from "./PanoramaView";

export default function PanoramaPage() {
  return <PanoramaView linksByLanguage={PANORAMA_LINKS} />;
}
