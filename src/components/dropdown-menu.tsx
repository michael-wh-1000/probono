"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const FlyoutLink = ({
  children,
  FlyoutContent,
  hrefs,
}: {
  children: React.ReactNode;
  FlyoutContent?: React.ElementType;
  hrefs: string[];
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <span className="relative flex items-center gap-[5px]">
        {children}
        <ChevronDown
          size={16}
          style={{
            transform: showFlyout ? "rotate(180deg)" : "rotate(0)",
          }}
          className="transition-transform duration-300"
        />
        <span
          style={{
            transform:
              showFlyout || hrefs.includes(pathname)
                ? "scaleX(1)"
                : "scaleX(0)",
          }}
          className={
            "absolute -bottom-2 -left-2 -right-2 h-0.5 origin-left rounded-full bg-orange-secondary transition-transform duration-300 ease-out"
          }
        />
      </span>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black "
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white border-black border-l-[1px] border-t-[1px]" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlyoutLink;
