import VolunteerButton from "@/components/volunteerbutton";

const Conclusion = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[40px] gap-[10px] md:gap-[20px] px-[20px] sm:px-[40px]">
        <h1 className="text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-none">
          Why Holistic Education Matters
        </h1>
        <span className="w-full md:w-[80%] xl:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] text-center text-black/80">
          Holistic education nurtures well-rounded individuals who are not only
          academically capable but also socially conscious, emotionally
          resilient, and equipped to navigate life’s challenges. This approach
          ensures that every student can thrive in an increasingly
          interconnected and dynamic world.
        </span>
      </div>
      <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[10px] md:gap-[20px] px-[20px] sm:px-[40px]">
        <h1 className="text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-none">
          Get Involved
        </h1>
        <span className="w-full md:w-[80%] xl:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] text-center text-black/80">
          You can help transform lives through education. Whether by
          volunteering as a mentor, donating learning materials, or supporting
          our infrastructure projects, your contribution makes a tangible
          difference. Together, we can empower the next generation to build a
          brighter future for themselves and their communities.
        </span>
        <VolunteerButton />
      </div>
    </div>
  );
};

export default Conclusion;
