import type { Metadata } from "next";
import FemmesPage from "@/pageComponents/femmes/femmespage";

export const metadata: Metadata = {
  title: "Probono Femmes",
  description: `We envision a world where every woman has the tools,
                  resources, and support to realize her full potential. By
                  addressing systemic challenges and empowering women at every
                  level, we aim to create sustainable change that uplifts entire
                  communities.`,
};

export default function Femmes() {
  return <FemmesPage />;
}
