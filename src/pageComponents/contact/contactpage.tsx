"use client";

import { motion } from "motion/react";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-[120px] pb-[80px] flex flex-col md:flex-row w-full  md:justify-center items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px]">
        <div className="flex flex-col gap-[30px] px-[20px] md:px-[60px] max-w-[800px]">
          <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-tight">
            Get in touch with us
          </h1>
          <div className="flex flex-col gap-[30px]">
            <span className="text-[14px] md:text-[16px] lg:text-[18px] text-black/80">
              We’d love to hear from you! Whether you have questions, want to
              collaborate, or need more information about our initiatives, feel
              free to reach out. Connect with us through the channels below, and
              let’s make a difference together.
            </span>
            <div className="flex gap-[20px] sm:gap-[40px] flex-wrap">
              <a
                href="https://www.instagram.com/its_probono?igsh=MThmdmI2c2Nnd3pvbQ%3D%3D&utm_source=qr"
                target="_blank"
              >
                <img
                  src="/blacksocials/instagram.png"
                  className="w-[20px] h-fit"
                />
              </a>
              <a
                href="https://www.linkedin.com/posts/pro-bono-uganda_worldmentalhealthday-probonouganda-youthmentalhealth-activity-7255252481331318785-ebQd?utm_source=share&utm_medium=member_ios"
                target="_blank"
              >
                <img
                  src="/blacksocials/linkedin.png"
                  className="w-[20px] h-fit"
                />
              </a>
              <a
                href="https://x.com/its_probono?s=21&t=jM9Bthqt_LtFj1n3Dp2DaA"
                target="_blank"
              >
                <img src="/blacksocials/x.png" className="w-[20px] h-fit" />
              </a>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="text-[12px] md:text-[14px] font-medium">
                Contact: +256 761237293
              </span>
              <span className="text-[12px] md:text-[14px] font-medium">
                Email: itsprobono256@gmail.com
              </span>
            </div>
          </div>
        </div>
        <motion.img
          initial={{ x: "10%" }}
          whileInView={{ x: 0 }}
          exit={{ x: "10%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src="/images/contact.webp"
          className="w-[80%] object-cover md:w-[400px] lg:w-[550px]  px-[20px] md:px-[40px]"
        />
      </div>
    </motion.div>
  );
};

export default ContactPage;
