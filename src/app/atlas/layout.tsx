import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atlas — Brücke",
  description:
    "Explore cognate families, sound correspondences, compounds, and false friends across the German, Dutch, French, and Spanish courses.",
};

export default function AtlasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
