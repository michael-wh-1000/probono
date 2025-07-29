import { TextParallaxContent } from "@/components/parallax-image";

const Introduction = () => {
  return (
    <div className="pt-[10px] ">
      <TextParallaxContent
        imgUrl="/parallax-images/4.jpg"
        heading="EDUCATORS"
        logoUrl="/logos/educators.svg"
      >
        <div className="py-[40px] md:py-[80px] flex flex-col md:flex-row w-full  md:justify-center items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px]">
          <div className="flex flex-col gap-[30px] px-[20px] md:px-[60px] max-w-[800px]">
            <h1 className="text-[25px] sm:text-[30px] md:text-[35px] xl:text-[40px] font-semibold leading-tight">
              Educators
            </h1>
            <div className="flex flex-col gap-[30px]">
              <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                At ProBono, we believe that education is a powerful catalyst for
                change. Pro Bono Educators is our initiative to make quality,
                holistic education accessible to underprivileged communities. By
                equipping youth with essential knowledge and life skills, we aim
                to empower them to break the cycle of poverty, realize their
                full potential, and contribute meaningfully to society.
              </span>
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[14px] md:text-[16px] xl:text-[18px] font-semibold">
                  Our Vision
                </h2>
                <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                  We envision a world where every child, regardless of their
                  background, has access to a well-rounded education that not
                  only focuses on academics but also fosters critical thinking,
                  creativity, and emotional intelligence.
                </span>
              </div>
            </div>
          </div>
          <img
            src="/images/educators.webp"
            className="w-[80%] object-cover md:w-[400px] lg:w-[550px]  px-[20px] md:px-[40px]"
          />
        </div>
      </TextParallaxContent>
    </div>
  );
};

export default Introduction;
