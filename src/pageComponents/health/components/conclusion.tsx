import VolunteerButton from "@/components/volunteerbutton";

const Conclusion = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[10px] md:gap-[20px] px-[20px] sm:px-[40px]">
        <h1 className="text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-none">
          Get Involved
        </h1>
        <span className="w-full md:w-[80%] xl:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] text-center text-black/80">
          Whether you’re a medical professional, volunteer, or donor, your
          support is vital. Together, we can bring hope and healing to those who
          need it the most.
        </span>
        <VolunteerButton />
      </div>
    </div>
  );
};

export default Conclusion;
