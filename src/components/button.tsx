"use client";

import { motion } from "motion/react";
import React from "react";

export const CustomButton = ({
  type,
  children,
  onClick,
  className,
}: {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        boxShadow: "1px 1px 0px 0px rgba(0, 0, 0, 1)",
      }}
      whileTap={{
        scale: 0.97,
      }}
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-r from-orange-primary to-orange-secondary font-semibold text-white px-[10px] py-[5px] text-[13px] sm:text-[14px] md:text-[15px] h-fit w-fit border-[1px] border-black/50 ${className} rounded-[4px]`}
    >
      {children}
    </motion.button>
  );
};
