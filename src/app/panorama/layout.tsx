import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grammar Panorama — Brücke",
  description:
    "The whole German, Dutch, French, or Spanish grammar structure on one page, with links to where each pattern is taught on the trail.",
};

export default function PanoramaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
