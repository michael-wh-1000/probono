import type { Metadata } from "next";
import HealthPage from "@/pageComponents/health/healthpage";

export const metadata: Metadata = {
  title: "Probono Health",
  description: `At ProBono, we believe that access to quality healthcare is a
                fundamental human right. Our Pro Bono Health initiative is
                dedicated to improving the health and well-being of
                underprivileged communities in Uganda. Through a holistic
                approach, we aim to bridge the healthcare gap and empower these
                communities to lead healthier lives.`,
};

export default function Health() {
  return <HealthPage />;
}
