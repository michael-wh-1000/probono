import type { Metadata } from "next";
import AboutPage from "@/pageComponents/about/aboutpage";

export const metadata: Metadata = {
  title: "About | Probono",
  description: `Pro Bono is a youth-led non-profit organization aimed at impacting
            society positively by establishing outreach programs aimed at
            various sections of society and integrating the communities to meet
            their unique needs.`,
};

export default function About() {
  return <AboutPage />;
}
