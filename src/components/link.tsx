"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const CustomLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  return (
    <span className="relative group w-fit text-[14px] lg:text-[16px]">
      {children}
      <span
        className={`absolute -bottom-2 -left-2 -right-2 h-0.5 origin-left rounded-full bg-orange-secondary transition-transform duration-300 ease-out group-hover:scale-100 ${
          pathname === href ? "scale-100" : "scale-0"
        }`}
      />
    </span>
  );
};

export default CustomLink;
