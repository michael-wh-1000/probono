"use client";

import { motion } from "motion/react";

const WhoWeAre = () => {
  return (
    <div className="mt-[120px] pb-[80px] flex flex-col md:flex-row w-full  md:justify-center items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px]">
      <div className="flex flex-col gap-[30px] px-[20px] md:px-[60px] max-w-[800px]">
        <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-tight">
          Who we are
        </h1>
        <div className="flex flex-col gap-[30px]">
          <span className="text-[14px] md:text-[16px] lg:text-[18px] text-black/80">
            Pro Bono is a youth-led non-profit organization aimed at impacting
            society positively by establishing outreach programs aimed at
            various sections of society and integrating the communities to meet
            their unique needs.
          </span>
          <span className="text-[14px] md:text-[16px] lg:text-[18px] text-black/80">
            We invite partners, stakeholders, and supporters to join us in our
            mission to create a brighter, more equitable future for all
            Ugandans.
          </span>
        </div>
      </div>
      <motion.img
        initial={{ x: "10%" }}
        whileInView={{ x: 0 }}
        exit={{ x: "10%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        src="/images/about.webp"
        className="w-[80%] object-cover md:w-[400px] lg:w-[550px]  px-[20px] md:px-[40px]"
      />
    </div>
  );
};

export default WhoWeAre;
