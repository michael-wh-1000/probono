"use client";

import { motion } from "motion/react";

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
  {
    name: "Ana Dorrin",
    role: "Co-Head, Femmes",
    imageUrl: "/team/4.jpeg",
  },
  {
    name: "Noella Karara",
    role: "Co-Head, Environment",
    imageUrl: "/team/2.jpeg",
  },
  {
    name: "Pendi Nyonyozi",
    role: "Head, Environment",
    imageUrl: "/team/9.jpeg",
  },
  {
    name: "Wokorach Isaac",
    role: "Program Coordinator, Femmes",
    imageUrl: "/team/7.jpeg",
  },
  {
    name: "Jonan K Shema",
    role: "Head, Human Resource",
    imageUrl: "/team/8.jpeg",
  },
  {
    name: "Doreen Akeeza",
    role: "Co-Head, Educators",
    imageUrl: "/team/10.jpg",
  },
  {
    name: "Angel Kisakye",
    role: "Programme Coordinator, Femmes",
    imageUrl: "/team/11.jpg",
  },
  {
    name: "Namara Yvonne",
    role: "Partner Relations Head",
    imageUrl: "/team/12.jpg",
  },
  {
    name: "Samora Tumushabe",
    role: "Media Lead, Educators",
    imageUrl: "/team/13.jpg",
  },
  {
    name: "Emmanuel Kirabo",
    role: "Head of Media Department",
    imageUrl: "/team/14.jpg",
  },
  {
    name: "Natalie Katesi",
    role: "Human Resource Lead",
    imageUrl: "/team/15.jpg",
  },
];

const TeamPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-[120px] flex flex-col items-center gap-[40px]">
        <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold text-center">
          Team Members
        </h1>
        <div className="flex w-full xl:w-[80%] justify-center gap-[60px] xl:gap-[80px] px-[20px] md:px-[40px] flex-wrap">
          {members.map((member, index) => (
            <div
              className="w-[225px] h-[225px] rounded-2xl relative"
              key={index}
            >
              <img
                src={member.imageUrl}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="text-center border-[1px] border-black w-[80%] bg-white py-[6px] md:py-[8px] absolute -bottom-[25px] left-1/2 transform -translate-x-1/2">
                <h3 className="text-[12px] md:text-[14px] lg:text-[16px] font-medium leading-none">
                  {member.name}
                </h3>
                <span className="text-[10px] lg:text-[12px]">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamPage;
