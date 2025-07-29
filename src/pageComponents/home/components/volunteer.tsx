"use client";

import VolunteerButton from "@/components/volunteerbutton";
import { motion } from "motion/react";

const Volunteer = () => {
  return (
    <div className="py-[80px] flex flex-col md:flex-row w-full md:justify-start xl:justify-center items-center gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px] relative overflow-clip">
      <div className="flex flex-col gap-[30px] px-[20px] md:px-[40px]">
        <div className="">
          <span className="text-[10px] md:text-[12px] lg:text-[14px] text-black/60">
            BECOME A VOLUNTEER
          </span>
          <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-tight">
            Create impact where it matters
          </h1>
        </div>
        <div className="flex flex-col gap-[30px]">
          <div className="flex gap-[10px]">
            <img src="/icons/flower.png" className="w-[20px] h-fit mt-[2px]" />
            <div className="w-fit">
              <h2 className="text-[14px] md:text-[16px] lg:text-[18px] font-medium">
                Empower communities
              </h2>
              <span className="text-[10px] md:text-[12px] lg:text-[14px] text-black/60">
                Teach, rehabilitate and support underprivileged communities
              </span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <img src="/icons/flower.png" className="w-[20px] h-fit mt-[2px]" />
            <div className="w-fit">
              <h2 className="text-[14px] md:text-[16px] lg:text-[18px] font-medium">
                Transform health
              </h2>
              <span className="text-[10px] md:text-[12px] lg:text-[14px] text-black/60">
                Improve healthcare access for underserved populations
              </span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <img src="/icons/flower.png" className="w-[20px] h-fit mt-[2px]" />
            <div className="w-fit">
              <h2 className="text-[14px] md:text-[16px] lg:text-[18px] font-medium">
                Empower communities
              </h2>
              <span className="text-[10px] md:text-[12px] lg:text-[14px] text-black/60">
                Fight climate change through tree planting and sustainability
                projects
              </span>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <img src="/icons/flower.png" className="w-[20px] h-fit mt-[2px]" />
            <div className="w-fit">
              <h2 className="text-[14px] md:text-[16px] lg:text-[18px] font-medium">
                Think big
              </h2>
              <span className="text-[10px] md:text-[12px] lg:text-[14px] text-black/60">
                Turn bold ideas into actionable solutions with passionate teams
              </span>
            </div>
          </div>
        </div>
        <VolunteerButton />
      </div>
      <motion.img
        src="/images/volunteer.webp"
        className="w-[80%] object-cover md:w-[300px] md:scale-125 lg:scale-100 lg:w-[550px]  px-[20px] md:px-[40px]"
      />
    </div>
  );
};

export default Volunteer;
