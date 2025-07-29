import { Card } from "@/components/card";
import { Circle } from "lucide-react";

const Approach = () => {
  return (
    <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[30px] md:gap-[40px] px-[20px] sm:px-[40px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Our Approach
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
    title: "Targeted Interventions",
    subtitle:
      "We identify and address critical health issues affecting vulnerable populations. This includes offering free medical camps, vaccinations, maternal and child health services, and providing essential medications to those who cannot afford them.",
  },
  {
    title: "Health Education",
    subtitle:
      "Prevention is at the core of our efforts. We conduct community workshops and awareness campaigns on hygiene, nutrition, disease prevention, and sexual and reproductive health. Our goal is to equip individuals with the knowledge to make informed decisions about their health.",
  },
  {
    title: "Advocacy",
    subtitle:
      "We advocate for equitable healthcare policies by collaborating with local governments and international organizations. By amplifying the voices of marginalized communities, we strive to influence policy changes that ensure sustainable healthcare solutions.",
  },
];
