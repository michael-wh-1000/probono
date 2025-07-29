"use client";

import { motion } from "motion/react";
import Link from "next/link";

const VolunteerButton = () => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="bg-gradient-to-r from-orange-primary to-orange-secondary font-rustico text-white  px-[16px] py-[8px] md:px-[18px] md:py-[9px] lg:px-[20px] lg:py-[10px] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] h-fit w-fit border-[1px] border-black"
    >
      <Link href={"/volunteer"} prefetch={true}>
        VOLUNTEER
      </Link>
    </motion.button>
  );
};

export default VolunteerButton;
