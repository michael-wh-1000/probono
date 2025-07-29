import VolunteerButton from "@/components/volunteerbutton";

const Conclusion = () => {
  return (
    <div>
      <div className="w-full flex flex-col items-center pb-[40px] lg:pb-[80px] gap-[10px] md:gap-[20px] px-[20px] sm:px-[40px]">
        <h1 className="text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold leading-none">
          How You Can Help
        </h1>
        <span className="w-full md:w-[80%] xl:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] text-center text-black/80">
          Join us in our mission to protect the planet. Whether through
          volunteering, donations, or partnerships, your support helps us expand
          our reach and amplify our impact. Together, we can combat climate
          change and build a sustainable future for generations to come.
        </span>
        <VolunteerButton />
      </div>
    </div>
  );
};

export default Conclusion;
