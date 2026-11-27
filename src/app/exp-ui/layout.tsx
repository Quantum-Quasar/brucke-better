import type { Metadata } from "next";
import "@/components/exp/exp.css";
import { ExpShell } from "@/components/exp/ExpShell";

export const metadata: Metadata = {
  title: "Brücke — Learn German through the words you already know",
  robots: { index: false, follow: false },
};

export default function ExpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/exp-ui/SchibstedGrotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <ExpShell>{children}</ExpShell>
    </>
  );
}
