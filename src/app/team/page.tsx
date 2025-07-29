import type { Metadata } from "next";
import TeamPage from "@/pageComponents/team/teampage";

export const metadata: Metadata = {
  title: "Team Members | Probono",
  description: `The team members that help make a difference.`,
};

export default function Team() {
  return <TeamPage />;
}
