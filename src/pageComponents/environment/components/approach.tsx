import { Card } from "@/components/card";
import { Circle } from "lucide-react";

const Approach = () => {
  return (
    <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[30px] md:gap-[40px] px-[20px] sm:px-[40px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Key Focus Areas
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
    title: "Youth Engagement and Education",
    subtitle:
      "We believe the youth are key to driving lasting environmental change. Through workshops, school programs, and leadership training, we educate young people on the importance of environmental conservation and equip them with the tools to advocate for sustainability in their communities.",
  },
  {
    title: "Conservation Projects",
    subtitle:
      "Our conservation initiatives include tree planting, habitat restoration, and biodiversity preservation. By working with local communities, we help protect endangered ecosystems, promote reforestation, and enhance urban green spaces.",
  },
  {
    title: "Climate Action",
    subtitle:
      "We address climate change through advocacy, renewable energy initiatives, and sustainable agriculture practices. Our programs help communities reduce their carbon footprint, adapt to changing climates, and build resilience against environmental challenges.",
  },
  {
    title: "Community Clean-Up and Waste Management",
    subtitle:
      "We organize clean-up drives, promote recycling, and provide training on sustainable waste management practices. These initiatives aim to reduce pollution, protect water sources, and create healthier living environments.",
  },
];
