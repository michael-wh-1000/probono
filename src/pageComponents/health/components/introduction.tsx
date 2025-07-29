import { TextParallaxContent } from "@/components/parallax-image";

const Introduction = () => {
  return (
    <div className="pt-[10px]">
      <TextParallaxContent
        imgUrl="/parallax-images/10.jpg"
        heading="HEALTH"
        logoUrl="/logos/health.svg"
      >
        <div className="py-[40px] md:py-[80px] flex flex-col md:flex-row w-full  md:justify-center items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px]">
          <div className="flex flex-col gap-[30px] px-[20px] md:px-[60px] max-w-[800px]">
            <h1 className="text-[25px] sm:text-[30px] md:text-[35px] xl:text-[40px] font-semibold leading-tight">
              Health
            </h1>
            <div className="flex flex-col gap-[30px]">
              <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                At ProBono, we believe that access to quality healthcare is a
                fundamental human right. Our Pro Bono Health initiative is
                dedicated to improving the health and well-being of
                underprivileged communities in Uganda. Through a holistic
                approach, we aim to bridge the healthcare gap and empower these
                communities to lead healthier lives.
              </span>
            </div>
          </div>
          <img
            src="/images/health.webp"
            className="w-[80%] object-cover md:w-[400px] lg:w-[550px]  px-[20px] md:px-[40px]"
          />
        </div>
      </TextParallaxContent>
    </div>
  );
};

export default Introduction;
