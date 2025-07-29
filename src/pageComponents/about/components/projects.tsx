"use client";

import { motion } from "motion/react";

const katusuroImages = [
  "/images/13.webp",
  "/images/11.webp",
  "/images/12.webp",
];
const mubendeImages = ["/images/15.webp", "/images/14.webp", "/images/16.webp"];
const mtnImages = [
  "/projects/mtn/1.jpg",
  "/projects/mtn/2.jpg",
  "/projects/mtn/3.jpg",
  "/projects/mtn/4.jpg",
  "/projects/mtn/5.jpg",
  "/projects/mtn/6.jpg",
  "/projects/mtn/7.jpg",
  "/projects/mtn/8.jpg",
  "/projects/mtn/9.jpg",
  "/projects/mtn/10.jpg",
  "/projects/mtn/11.jpg",
  "/projects/mtn/12.jpg",
];
const kalerweImages = [
  "/projects/kalerwe/1.jpg",
  "/projects/kalerwe/2.jpg",
  "/projects/kalerwe/3.jpg",
  "/projects/kalerwe/4.jpg",
  "/projects/kalerwe/5.jpg",
  "/projects/kalerwe/6.jpg",
  "/projects/kalerwe/7.jpg",
];

const Projects = () => {
  return (
    <div className="flex flex-col py-[40px] lg:py-[80px] gap-[30px] md:gap-[40px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold text-center">
        Some Projects
      </h1>
      <div className="flex flex-col gap-[30px]">
        <div className="w-full flex flex-col items-center gap-[20px] px-[20px] md:px-[40px]">
          <h2 className="text-center text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium">
            The outreach by Smart Girls and Pro Bono in Katusuro
          </h2>
          <div className="flex gap-[20px] sm:gap-[30px] md:gap-[50px] flex-wrap justify-center">
            {katusuroImages.map((image, index) => (
              <motion.img
                src={image}
                key={index}
                // initial={{ opacity: 0, y: 30 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{
                //   duration: 0.6,
                //   ease: "easeOut",
                //   delay: index * 0.2,
                // }}
                // viewport={{ once: true }}
                className="w-full max-w-[350px] aspect-[5/4] object-cover rounded-2xl "
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-[20px] px-[20px] md:px-[40px]">
          <h2 className="text-center text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium">
            The Food Drive in Mubende
          </h2>
          <div className="flex gap-[20px] sm:gap-[30px] md:gap-[50px] flex-wrap justify-center">
            {mubendeImages.map((image, index) => (
              <motion.img
                src={image}
                key={index}
                className="w-full max-w-[350px] aspect-[5/4] object-cover rounded-2xl "
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-[20px] px-[20px] md:px-[40px]">
          <h2 className="text-center text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium">
            Mtn Partnership
          </h2>
          <video controls className="w-full max-w-[800px] rounded-2xl">
            <source src="/projects/mtn/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="flex gap-[20px] sm:gap-[30px] md:gap-[50px] flex-wrap justify-center">
            {mtnImages.map((image, index) => (
              <motion.img
                src={image}
                key={index}
                className="w-full max-w-[350px] aspect-[5/4] object-cover rounded-2xl"
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-[20px] px-[20px] md:px-[40px]">
          <h2 className="text-center text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-medium">
            Kalerwe Outreach
          </h2>
          <div className="flex gap-[20px] sm:gap-[30px] md:gap-[50px] flex-wrap justify-center">
            {kalerweImages.map((image, index) => (
              <motion.img
                src={image}
                key={index}
                className="w-full max-w-[350px] aspect-[5/4] object-cover rounded-2xl "
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
