"use client";

import { motion } from "motion/react";

const Values = () => {
  return (
    <div className="bg-gradient-to-r to-orange-secondary from-orange-primary w-full text-white  py-[80px] flex flex-col items-center gap-[40px] relative border-y-[1px] border-black">
      <div className="absolute top-0 h-full overflow-clip w-full">
        <img
          src="/svg-images/circles2.svg"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Our Values
      </h1>
      <div className="md:w-[600px] lg:w-[800px] h-full relative flex flex-col md:flex-row gap-[40px] md:gap-0 md:justify-between">
        <div className="flex flex-col gap-[40px] md:gap-[200px]">
          <div className="flex flex-col items-center gap-[10px] w-fit relative">
            <h1 className="text-[20px] md:text-[24px] font-rustico">
              RESULTS DRIVEN
            </h1>
            <div className="text-[14px]  md:text-[16px] w-[250px] border-[2px] border-white p-[40px] text-center rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: "10%" }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "10%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                We harvest extraordinary results through our culture of
                collaboration and tech strategy
              </motion.div>
            </div>
            <img
              src="/svg-images/line1.svg"
              className="absolute hidden md:block top-[98.5%] left-[45%] scale-[91%] lg:top-[107%] lg:left-[84%] lg:scale-[173%]"
            />
            <img
              src="/svg-images/line5.svg"
              className="absolute block md:hidden top-[96%] left-[0%] scale-[86%]"
            />
          </div>
          <div className="flex flex-col items-center gap-[10px] w-fit relative">
            <h1 className="text-[20px] md:text-[24px] font-rustico">
              DIVE DEEP
            </h1>
            <div className="text-[14px] md:text-[16px] w-[250px] border-[2px] border-white p-[40px] text-center rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: "10%" }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "10%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                We analyse the core hardships of society and unravel them with
                our practical and sustainable skills
              </motion.div>
            </div>
            <img
              src="/svg-images/line3.svg"
              className="absolute hidden md:block  top-[98.5%] left-[45%] scale-[91%] lg:top-[105.2%] lg:left-[84%] lg:scale-[173%]"
            />
            <img
              src="/svg-images/line6.svg"
              className="absolute block md:hidden top-[96%] right-[0%] scale-[86%]"
            />
          </div>
          <div className="flex flex-col items-center gap-[10px] w-fit relative">
            <h1 className="text-[20px] md:text-[24px] font-rustico">
              EARN TRUST
            </h1>
            <div className="text-[14px] md:text-[16px] w-[250px] border-[2px] border-white p-[40px] text-center rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: "10%" }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "10%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                We stand for transparency. This creates an environment for
                people to be authentic in projects
              </motion.div>
            </div>
            <img
              src="/svg-images/line5.svg"
              className="absolute block md:hidden top-[96.5%] left-[0%] scale-[85.3%]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[40px] md:gap-[200px] md:mt-[200px]">
          <div className="flex flex-col items-center gap-[10px] w-fit relative">
            <h1 className="text-[20px] md:text-[24px] font-rustico">
              THINK BIG
            </h1>
            <div className="text-[14px] md:text-[16px] w-[250px] border-[2px] border-white p-[40px] text-center rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: "10%" }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "10%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                We believe that everyone can have an impressive idea which can
                be executed in society for good of others
              </motion.div>
            </div>
            <img
              src="/svg-images/line2.svg"
              className="absolute hidden md:block top-[98.5%] right-[45%] scale-[92%] lg:top-[106%] lg:right-[84%] lg:scale-[173.5%]"
            />
            <img
              src="/svg-images/line6.svg"
              className="absolute block md:hidden top-[96.5%] right-[0%] scale-[85.5%]"
            />
          </div>
          <div className="flex flex-col items-center gap-[10px] w-fit relative">
            <h1 className="text-[20px] md:text-[24px] font-rustico">
              INCLUSION
            </h1>
            <div className="text-[14px] md:text-[16px] w-[250px] border-[2px] border-white p-[40px] text-center rounded-2xl">
              <motion.div
                initial={{ opacity: 0, y: "10%" }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "10%" }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                We generate energies that attract individual potential and
                create equal opportunities
              </motion.div>
            </div>
            <img
              src="/svg-images/line4.svg"
              className="absolute hidden md:block top-[98%] right-[45%] scale-[92%] lg:top-[111.5%] lg:right-[84%] lg:scale-[174%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;
