import { Card } from "@/components/card";
import { Circle } from "lucide-react";

const Approach = () => {
  return (
    <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[30px] md:gap-[40px] px-[20px] sm:px-[40px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Our approach
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
    title: "Access to quality education",
    subtitle:
      "We work to bridge the educational gap by providing free or subsidized learning opportunities to marginalized communities. This includes offering scholarships, school supplies, and infrastructure support to ensure students have a conducive learning environment.",
  },
  {
    title: "Holistic Curriculum Development",
    subtitle:
      "Our programs go beyond traditional academics. We integrate subjects like environmental stewardship, technology, arts, and life skills into our curriculum to prepare students for the complexities of the modern world.",
  },
  {
    title: "Teacher Training and Capacity Building",
    subtitle:
      "To ensure the delivery of quality education, we provide professional development for educators. This includes training in innovative teaching methods, classroom management, and the use of technology to enhance learning.",
  },
  {
    title: "Community Involvement",
    subtitle:
      "Education is a shared responsibility. We actively engage parents, guardians, and community leaders to create a supportive ecosystem that encourages lifelong learning and development.",
  },
];
