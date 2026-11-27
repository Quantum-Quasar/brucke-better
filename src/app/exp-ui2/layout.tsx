import type { Metadata } from "next";
import "@/components/exp2/p2.css";
import { P2Shell } from "@/components/exp2/P2Shell";

export const metadata: Metadata = {
  title: "Brücke — Learn German through the words you already know",
  robots: { index: false, follow: false },
};

export default function Exp2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preload" href="/exp-ui2/GeneralSans-500.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <P2Shell>{children}</P2Shell>
    </>
  );
}
