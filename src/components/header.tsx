"use client";

import CustomLink from "./link";
import FlyoutLink from "./dropdown-menu";
import { SectionContent } from "./section-content";
import { useEffect, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import CollapsibleMenu from "./collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full bg-white py-[20px] flex items-center justify-between px-[20px] lg:px-[100px] z-20">
      <AnimatedHamburgerButton active={isMenuOpen} setActive={setIsMenuOpen} />
      <Link href={"/"} prefetch={true}>
        <img
          src="/logos/probono.png"
          className="w-[100px] md:w-[120px] lg:w-[150px]"
        />
      </Link>
      <nav className="w-[70%] hidden md:block">
        <ul className="w-full flex justify-evenly font-medium">
          <CustomLink href="/">
            <Link href={"/"} prefetch={true}>
              HOME
            </Link>
          </CustomLink>

          <FlyoutLink
            FlyoutContent={SectionContent}
            hrefs={["/femmes", "/environment", "/educators", "/health"]}
          >
            SECTORS
          </FlyoutLink>
          <CustomLink href="/about">
            <Link href={"/about"} prefetch={true}>
              ABOUT
            </Link>
          </CustomLink>
          <CustomLink href="/blog">
            <a href="https://probonoug.medium.com/" target="_blank">
              BLOG
            </a>
          </CustomLink>
          <CustomLink href="/team">
            <Link href={"/team"} prefetch={true}>
              TEAM
            </Link>
          </CustomLink>
          <CustomLink href="contact">
            <Link href={"/contact"} prefetch={true}>
              CONTACT
            </Link>
          </CustomLink>
        </ul>
      </nav>
      <motion.button
        whileHover={{
          scale: 1.03,
          boxShadow: "3px 3px 0px 0px rgba(0, 0, 0, 1)",
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="bg-gradient-to-r from-orange-primary to-orange-secondary font-rustico text-white px-[16px] py-[8px] sm:text-[12px] md:text-[16px] lg:text-[18px] h-fit w-fit border-[1px] border-black"
      >
        DONATE
      </motion.button>
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isMenuOpen ? 0 : "-100%", opacity: isMenuOpen ? 1 : 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          bounce: 0.2,
        }}
        className={`h-screen w-screen absolute top-0 left-0 bg-white  z-30 md:hidden`}
      >
        <div className="text-[20px] flex flex-col gap-[30px] py-[100px] pl-[30px] font-semibold text-black/80 cursor-pointer z-50">
          <span className="hover:text-black cursor-pointer">
            <Link href={"/"} prefetch={true}>
              Home
            </Link>
          </span>
          <span className="hover:text-black cursor-pointer">
            <Link href={"/about"} prefetch={true}>
              About
            </Link>
          </span>
          <CollapsibleMenu
            trigger="Sectors"
            className="w-full"
            textStyles="text-[20px] cursor-pointer font-semibold p-0 flex justify-start items-center gap-[10px]"
          >
            <div className="pt-[10px] flex flex-col gap-[10px] text-[16px] font-semibold text-black/60">
              <span className="hover:underline hover:text-black cursor-pointer">
                <Link href={"/educators"} prefetch={true}>
                  Educators
                </Link>
              </span>
              <span className="hover:underline hover:text-black cursor-pointer">
                <Link href={"/environment"} prefetch={true}>
                  Environment
                </Link>
              </span>
              <span className="hover:underline hover:text-black cursor-pointer">
                <Link href={"/femmes"} prefetch={true}>
                  Femmes
                </Link>
              </span>
              <span className="hover:underline hover:text-black cursor-pointer">
                <Link href={"/health"} prefetch={true}>
                  Health
                </Link>
              </span>
            </div>
          </CollapsibleMenu>
          <span className="hover:text-black cursor-pointer">
            <a href="https://probonoug.medium.com/" target="_blank">
              Blog
            </a>
          </span>
          <span className="hover:text-black cursor-pointer">
            <Link href={"/team"} prefetch={true}>
              Team
            </Link>
          </span>
          <div className="hover:text-black cursor-pointer">
            <Link href={"/contact"} prefetch={true}>
              Contact
            </Link>
          </div>
          <div className="flex gap-[40px] flex-wrap">
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
          <div className="absolute left-0 top-0 overflow-clip w-full h-full -z-10">
            <img
              src="/svg-images/circles.svg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;

const AnimatedHamburgerButton = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className="relative h-10 w-10 rounded-full bg-white/0 transition-colors hover:bg-white/20 z-40 md:hidden"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-[3px] w-10 bg-black"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "25%" }} // Increased spacing
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-[3px] w-10 bg-black"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-[3px] w-5 bg-black" // Restored to half width
          style={{
            x: "-50%",
            y: "50%",
            bottom: "25%", // Increased spacing
            left: "calc(50% + 10px)", // Restored offset
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["25%", "50%", "50%"], // Adjusted for more spacing
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "25%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["25%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "25%"],
      left: "calc(50% + 10px)", // Restored offset for half-width effect
    },
  },
};
