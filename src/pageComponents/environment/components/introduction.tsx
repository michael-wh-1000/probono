import { TextParallaxContent } from "@/components/parallax-image";

const Introduction = () => {
  return (
    <div className="pt-[10px]">
      <TextParallaxContent
        imgUrl="/parallax-images/1.jpg"
        heading="ENVIRONMENT"
        logoUrl="/logos/environment.svg"
      >
        <div className="py-[40px] md:py-[80px] flex flex-col md:flex-row w-full  md:justify-center items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px]">
          <div className="flex flex-col gap-[30px] px-[20px] md:px-[60px] max-w-[800px]">
            <h1 className="text-[25px] sm:text-[30px] md:text-[35px] xl:text-[40px] font-semibold leading-tight">
              Environment
            </h1>
            <div className="flex flex-col gap-[30px]">
              <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                At ProBono, we recognize that the health of our planet is
                directly linked to the well-being of future generations. Pro
                Bono Environment is our commitment to promoting environmental
                sustainability and taking decisive action against climate
                change. By engaging youth and communities in conservation
                efforts, we aim to foster a culture of environmental stewardship
                and ensure a greener, healthier future for all.
              </span>
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[14px] md:text-[16px] xl:text-[18px] font-semibold">
                  Our Mission
                </h2>
                <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                  We strive to combat the environmental challenges facing our
                  planet through innovative solutions, community-driven
                  initiatives, and by empowering young people to take the lead
                  in conservation and climate action
                </span>
              </div>
            </div>
          </div>
          <img
            src="/images/environment.webp"
            className="w-[80%] object-cover md:w-[400px] lg:w-[550px]  px-[20px] md:px-[40px]"
          />
        </div>
      </TextParallaxContent>
    </div>
  );
};

export default Introduction;
