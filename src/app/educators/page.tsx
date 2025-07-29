import type { Metadata } from "next";
import EducatorsPage from "@/pageComponents/educators/educatorspage";

export const metadata: Metadata = {
  title: "Probono Educators",
  description: `We envision a world where every child, regardless of their
                  background, has access to a well-rounded education that not
                  only focuses on academics but also fosters critical thinking,
                  creativity, and emotional intelligence.`,
};

export default function Educators() {
  return <EducatorsPage />;
}
