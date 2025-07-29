import Link from "next/link";
import React from "react";

export default function Sectors() {
  return (
    <div className="flex flex-col gap-[40px] items-center py-[40px] md:py-[60px] lg:py-[80px]">
      <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
        Our Sectors
      </h1>
      <div className="w-full flex flex-wrap justify-center  gap-[20px] px-[20px] md:px-[30px] lg:px-[40px] xl:px-[50px]">
        <Link
          href={"/femmes"}
          className="flex flex-col bg-pink-400 w-full max-w-[350px] items-center justify-center gap-[20px] text-white p-[20px] rounded-2xl hover:brightness-90 transition-all group"
        >
          <img
            src={"/logos/femmes.svg"}
            className="w-[50px] group-hover:scale-85 transition-all"
          />
          <span className="font-rustico text-[18px] text-center">
            PROBONO FEMMES
          </span>
        </Link>

        <Link
          href={"/educators"}
          className="flex flex-col bg-orange-400 w-full max-w-[350px]  items-center justify-center gap-[20px] text-white p-[20px] rounded-2xl hover:brightness-90 transition-all group"
        >
          <img
            src={"/logos/educators.svg"}
            className="w-[50px] group-hover:scale-85 transition-all"
          />
          <span className="font-rustico text-[18px] text-center">
            PROBONO EDUCATORS
          </span>
        </Link>
        <Link
          href={"/health"}
          className="flex flex-col bg-pink-950 w-full max-w-[350px]  items-center justify-center gap-[20px] text-white p-[20px] rounded-2xl hover:brightness-90 transition-all group"
        >
          <img
            src={"/logos/health.svg"}
            className="w-[50px] group-hover:scale-85 transition-all"
          />
          <span className="font-rustico text-[18px] text-center">
            PROBONO HEALTH
          </span>
        </Link>
        <Link
          href={"/environment"}
          className="flex flex-col bg-teal-700 w-full max-w-[350px]  items-center justify-center gap-[20px] text-white p-[20px] rounded-2xl hover:brightness-90 transition-all group"
        >
          <img
            src={"/logos/environment.svg"}
            className="w-[50px] group-hover:scale-85 transition-all"
          />
          <span className="font-rustico text-[18px] text-center">
            PROBONO ENVIRONMENT
          </span>
        </Link>
      </div>
    </div>
  );
}
