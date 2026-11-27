import type { Metadata } from "next";
import "@/components/exp3/p3.css";
import { P3Shell } from "@/components/exp3/P3Shell";
import { P3_PALETTE_BOOT } from "@/components/exp3/p3-palette";

export const metadata: Metadata = {
  title: "Brücke — Learn German through the words you already know",
  robots: { index: false, follow: false },
};

export default function Exp3Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/exp-ui3/PixelifySans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <script dangerouslySetInnerHTML={{ __html: P3_PALETTE_BOOT }} />
      <P3Shell>{children}</P3Shell>
    </>
  );
}
