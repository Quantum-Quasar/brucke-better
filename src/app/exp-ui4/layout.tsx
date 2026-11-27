import type { Metadata } from "next";
import "@/components/exp4/p4.css";
import { P4Shell } from "@/components/exp4/P4Shell";

export const metadata: Metadata = {
  title: "Brücke — Learn German through the words you already know",
  robots: { index: false, follow: false },
};

export default function Exp4Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <P4Shell>{children}</P4Shell>
    </>
  );
}
