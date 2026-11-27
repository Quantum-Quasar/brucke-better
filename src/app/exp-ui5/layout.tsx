import type { Metadata } from "next";
import "@/components/exp5/e5.css";
import { E5Shell } from "@/components/exp5/E5Shell";

export const metadata: Metadata = {
  title: "Brücke — Learn German through the words you already know",
  robots: { index: false, follow: false },
};

export default function E5Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/exp-ui/SchibstedGrotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <E5Shell>{children}</E5Shell>
    </>
  );
}
