import type { Metadata } from "next";
import EnvironmentPage from "@/pageComponents/environment/environmentpage";

export const metadata: Metadata = {
  title: "Probono Environment",
  description: `We strive to combat the environmental challenges facing our
                  planet through innovative solutions, community-driven
                  initiatives, and by empowering young people to take the lead
                  in conservation and climate action`,
};

export default function Environment() {
  return <EnvironmentPage />;
}
