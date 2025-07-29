import HomePage from "@/pageComponents/home/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Probono",
  description: `Pro Bono is a youth-led non-profit organization aimed at impacting
            society positively by establishing outreach programs aimed at
            various sections of society and integrating the communities to meet
            their unique needs.`,
};

export default function Home() {
  return <HomePage />;
}
