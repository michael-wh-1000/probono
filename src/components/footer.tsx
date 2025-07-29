import Link from "next/link";
import CollapsibleMenu from "./collapsible";

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-orange-primary to-orange-secondary text-white py-[60px] px-[20px] md:px-[50px] flex flex-col gap-[40px] relative overflow-hidden border-t-[1px] border-black">
      <div className="flex flex-col md:flex-row gap-[50px] md:gap-0 justify-between z-10">
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-[15px]">
            <img src="/logos/probono-alternate.png" className="w-[100px]" />
            <span className="text-[12px]">
              Empowering communities, Inspiring change
            </span>
          </div>
          <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[20px] md:gap-[40px] flex-wrap">
              <a
                href="https://www.instagram.com/its_probono?igsh=MThmdmI2c2Nnd3pvbQ%3D%3D&utm_source=qr"
                target="_blank"
              >
                <img src="/socials/instagram.png" className="w-[15px] h-fit" />
              </a>
              <a
                href="https://www.linkedin.com/posts/pro-bono-uganda_worldmentalhealthday-probonouganda-youthmentalhealth-activity-7255252481331318785-ebQd?utm_source=share&utm_medium=member_ios"
                target="_blank"
              >
                <img src="/socials/linkedin.png" className="w-[15px] h-fit" />
              </a>
              <a
                href="https://x.com/its_probono?s=21&t=jM9Bthqt_LtFj1n3Dp2DaA"
                target="_blank"
              >
                <img src="/socials/x.png" className="w-[15px] h-fit" />
              </a>
            </div>
            <span className="text-[12px]">Contact: +256 761237293</span>
            <span className="text-[12px]">Email: itsprobono256@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <span>Quick Links</span>
          <div className="text-[12px] text-white/80 flex flex-col gap-[10px]">
            <span className="cursor-pointer">
              <Link href={"/home"} prefetch={true}>
                Home
              </Link>
            </span>
            <span className="cursor-pointer">
              <Link href={"/about"} prefetch={true}>
                About
              </Link>
            </span>
            <div>
              <CollapsibleMenu
                trigger="Sectors"
                className="w-full"
                textStyles="cursor-pointer text-[12px] p-0 flex justify-start items-center gap-[5px]"
              >
                <div className="pt-[5px] flex flex-col gap-[5px] text-white/60">
                  <span className="cursor-pointer hover:underline">
                    <Link href={"/educators"} prefetch={true}>
                      Educators
                    </Link>
                  </span>
                  <span className="cursor-pointer hover:underline">
                    <Link href={"/environment"} prefetch={true}>
                      Environment
                    </Link>
                  </span>
                  <span className="cursor-pointer hover:underline">
                    <Link href={"/femmes"} prefetch={true}>
                      Femmes
                    </Link>
                  </span>
                  <span className="cursor-pointer hover:underline">
                    <Link href={"/health"} prefetch={true}>
                      Health
                    </Link>
                  </span>
                </div>
              </CollapsibleMenu>
            </div>
            <div className="cursor-pointer">
              <a href="https://probonoug.medium.com/">Blog</a>
            </div>
            <span className="cursor-pointer">
              <Link href={"/team"} prefetch={true}>
                Team
              </Link>
            </span>
            <span className="cursor-pointer">
              <Link href={"/contact"} prefetch={true}>
                Contact
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-white/40 via-white to-white/40"></div>
      <h2 className="text-[14px] font-medium text-center z-10">
        @2025 Probono
      </h2>
      <div className="absolute left-0 top-0 overflow-clip w-full h-full">
        <img
          src="/svg-images/circles.svg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
