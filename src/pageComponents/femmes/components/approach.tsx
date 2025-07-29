import { Card } from "@/components/card";
import { Circle } from "lucide-react";

const Approach = () => {
  return (
    <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[30px] md:gap-[40px] px-[20px] sm:px-[40px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Key Pillars of Pro Bono Femmes
      </h1>
      <div className="flex w-full gap-[20px] sm:gap-[40px] flex-wrap justify-center">
        {approach.map((item, index) => (
          <div
            className="w-[320px] lg:w-[400px] xl:w-[650px] min-h-[200px]"
            key={index}
          >
            <Card title={item.title} subtitle={item.subtitle} Icon={Circle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Approach;

const approach = [
  {
    title: "Education and Skill Development",
    subtitle:
      "We provide access to education, vocational training, and life skills programs that equip women with the knowledge and tools they need to succeed. From literacy programs to tech and business training, we ensure women are prepared for diverse career paths.",
  },
  {
    title: "Economic Empowerment",
    subtitle:
      "Economic independence is critical for women’s empowerment. We facilitate access to microfinance, business mentorship, and entrepreneurial opportunities to help women start and grow their businesses, improving their financial stability and that of their families.",
  },
  {
    title: "Advocacy and Awareness",
    subtitle:
      "We challenge harmful gender norms and practices through community dialogues, media campaigns, and policy advocacy. Our goal is to create a more equitable society where women’s voices are heard and respected.",
  },
  {
    title: "Support Networks",
    subtitle:
      "Pro Bono Femmes builds strong support systems for women, including mentorship programs, peer groups, and access to counseling services. These networks provide a safe space for women to share experiences, seek advice, and grow together.",
  },
];
