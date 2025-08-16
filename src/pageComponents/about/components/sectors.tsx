"use client";

import clsx from "clsx";
import { motion } from "motion/react";

const Sectors = () => {
  return (
    <div className="bg-gradient-to-r to-orange-secondary from-orange-primary w-full text-white  py-[80px] flex flex-col items-center gap-[40px] relative border-y-[1px] border-black">
      <div className="absolute top-0 h-full overflow-clip w-full">
        <img
          src="/svg-images/circles2.svg"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold ">
        Sectors
      </h1>
      <div className="flex gap-[30px] md:gap-[40px] justify-center flex-wrap px-[20px] md:px-[40px]">
        {sectors.map((sector, index) => (
          <div
            className="flex flex-col items-center gap-[10px] w-fit"
            key={index}
          >
            <h1 className="text-[18px] md:text-[22px] font-Rustico">
              {sector.name}
            </h1>
            <div
              className={clsx(
                "text-[12px] md:text-[14px] min-h-[320px] w-[280px] sm:w-[265px] md:w-[285px] lg:w-[300px] border-[2px] border-white p-[40px] text-center rounded-2xl",
                index === 0
                  ? "bg-pink-950/40"
                  : index === 1
                  ? "bg-pink-400/40"
                  : index === 2
                  ? "bg-teal-700/40"
                  : "bg-amber-400/40"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: "10%" }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "10%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {sector.text}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sectors;

const sectors = [
  {
    name: "Pro Bono Health",
    text: "We are a youth-founded organization that seeks to improve the health status of underprivileged societies in Uganda",
  },
  {
    name: "Pro Bono Femmes",
    text: "Pro Bono Femmes seeks to address gender inequality and gender discrimination in Uganda with a focus on empowering women to be strong and independent. We seek to educate, promote, and upskill women, particularly in underprivileged societies in Uganda.",
  },
  {
    name: "Pro Bono Environment",
    text: "Pro Bono Environment works with the youth in Uganda to conserve and maintain the environment while fighting climate change. We believe every little effort helps, from recycling to planting trees—our actions go a long way in making the world a more conducive place to stay.",
  },
  {
    name: "Pro Bono Educators",
    text: "Pro Bono Educators work with youth to make holistic education accessible for underprivileged societies in Uganda.",
  },
];
