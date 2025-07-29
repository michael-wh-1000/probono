"use client";

import { motion } from "motion/react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="md:px-0 overflow-hidden relative">
      <div className="absolute top-0  h-full overflow-clip w-full -z-10">
        <img
          src="/svg-images/circles.svg"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        initial={{ y: "-30px" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-[120px] flex items-center flex-col gap-[30px] lg:gap-[50px] mb-[60px]"
      >
        <h1 className="text-[40px] md:text-[45px] lg:text-[55px] xl:text-[65px] font-bold leading-tight text-center px-[20px] md:px-0">
          Empowering Communities <br /> Inspiring Change
        </h1>
        <div className=" flex flex-col items-center md:flex-row gap-[20px] md:gap-[5px] lg:gap-[40px] relative px-[20px] md:px-0">
          <div className="max-w-[400px] text-center md:text-left">
            <span className="md:text-[16px] lg:text-[18px]">
              Join us in empowering communities and transforming lives.
              Together, we can make a difference.
            </span>
          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="bg-gradient-to-r from-orange-primary to-orange-secondary font-rustico text-white px-[20px] py-[10px] lg:px-[25px] lg:py-[12.5px] xl:px-[30px] xl:py-[15px] text-[18px] lg:text-[22px] h-fit w-fit border-[1px] border-black"
          >
            <Link href="/about" prefetch={true}>
              LEARN MORE
            </Link>
          </motion.button>
          <img
            src={"/svg-images/arrow.svg"}
            className="absolute hidden md:block md:-bottom-[50px] md:left-[140px] md:w-[230px] lg:w-[270px]"
          />
          <img
            src={"/svg-images/arrow2.svg"}
            className="absolute bottom-[10px] hidden sm:block right-[20px] sm:right-[50px] w-[55px] sm:w-[70px] md:hidden"
          />
        </div>
      </motion.div>
      <div className="flex flex-col sm:grid grid-cols-10 grid-rows-4 gap-[10px] p-[10px] ml-0 md:ml-[60px] lg:ml-[70px] xl:ml-[80px]  md:h-[250px] lg:h-[320px] relative">
        <motion.div
          initial={{ x: "-80px" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex w-[60px] lg:w-[70px] xl:w-[80px] h-[400px] lg:h-[500px] xl:h-[600px] absolute -left-[60px] lg:-left-[70px] xl:-left-[80px] bottom-[10px] bg-gradient-to-b from-orange-secondary to-orange-primary border-y-[1px] border-r-[1px] border-black flex-col items-center justify-center gap-[80px] lg:gap-[100px] rounded-tr-lg rounded-br-lg"
        >
          <a
            href="https://www.instagram.com/its_probono?igsh=MThmdmI2c2Nnd3pvbQ%3D%3D&utm_source=qr"
            target="_blank"
          >
            <img
              src="/socials/instagram.png"
              className="w-[16px] lg:w-[20px] h-fit"
            />
          </a>
          <a
            href="https://www.linkedin.com/posts/pro-bono-uganda_worldmentalhealthday-probonouganda-youthmentalhealth-activity-7255252481331318785-ebQd?utm_source=share&utm_medium=member_ios"
            target="_blank"
          >
            <img
              src="/socials/linkedin.png"
              className="w-[16px] lg:w-[20px] h-fit"
            />
          </a>
          <a
            href="https://x.com/its_probono?s=21&t=jM9Bthqt_LtFj1n3Dp2DaA"
            target="_blank"
          >
            <img src="/socials/x.png" className="w-[16px] lg:w-[20px] h-fit" />
          </a>
        </motion.div>
        <div className="hidden lg:block w-[186px] xl:w-[256px] aspect-square absolute right-[10px]  -top-[186px] xl:-top-[256px]">
          <img
            src={"/images/1.webp"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="col-span-4 row-span-4 w-full aspect-[4/3] hidden sm:block sm:w-auto sm:aspect-auto">
          <img
            src={"/images/3.webp"}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="col-span-6 row-span-4 col-start-5 w-full aspect-[4/3] sm:w-auto sm:aspect-auto">
          <img
            src="/images/2.webp"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
