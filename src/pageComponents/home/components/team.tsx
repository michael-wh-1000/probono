"use client";

import { motion } from "motion/react";
import Link from "next/link";

const members = [
  {
    name: "Aiko Olwit",
    role: "Founder",
    imageUrl: "/team/5.jpeg",
  },
  {
    name: "Joel Atuhaire",
    role: "Head, Educators",
    imageUrl: "/team/1.jpeg",
  },
  {
    name: "Nishala Kirabo",
    role: "Head, Finances",
    imageUrl: "/team/6.jpeg",
  },
  {
    name: "Matsiko Timothy",
    role: "Co-Head, Femmes",
    imageUrl: "/team/3.jpeg",
  },
];

const Team = () => {
  return (
    <div className="pt-[40px] pb-[60px] md:pt-[80px] md:pb-[120px] flex flex-col items-center gap-[40px] bg-mild-orange/50">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold text-center">
        Team Members
      </h1>
      <div className="flex w-full justify-center gap-[60px] xl:gap-[80px] px-[20px] md:px-[40px] flex-wrap">
        {members.map((member, index) => (
          <div className="w-[225px] h-[225px] rounded-2xl relative" key={index}>
            <img
              src={member.imageUrl}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="text-center border-[1px] border-black w-[80%] bg-white py-[6px] md:py-[8px] absolute -bottom-[25px] left-1/2 transform -translate-x-1/2">
              <h3 className="text-[12px] md:text-[14px] lg:text-[16px] font-medium leading-none">
                {member.name}
              </h3>
              <span className="text-[10px] lg:text-[12px]">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="mt-[40px] bg-gradient-to-r from-orange-primary to-orange-secondary font-rustico text-white  px-[16px] py-[8px] md:px-[18px] md:py-[9px] lg:px-[20px] lg:py-[10px] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] h-fit w-fit border-[1px] border-black"
      >
        <Link href={"/team"} prefetch={true}>
          VIEW ALL
        </Link>
      </motion.button>
    </div>
  );
};

export default Team;
