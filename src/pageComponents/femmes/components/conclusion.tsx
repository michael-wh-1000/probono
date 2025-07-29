import VolunteerButton from "@/components/volunteerbutton";

const Conclusion = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[10px] md:gap-[20px] px-[20px] sm:px-[40px]">
        <h1 className="text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-none">
          Join Us in Advancing Gender Equality
        </h1>
        <span className="w-full md:w-[80%] xl:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] text-center text-black/80">
          Whether you’re a volunteer, partner, or donor, your support fuels our
          mission to empower women and dismantle gender-based inequalities.
          Together, we can create a future where women and men stand as equals,
          driving progress and innovation.
        </span>
        <VolunteerButton />
      </div>
    </div>
  );
};

export default Conclusion;
