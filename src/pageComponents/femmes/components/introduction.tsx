import { TextParallaxContent } from "@/components/parallax-image";

const Introduction = () => {
  return (
    <div className="pt-[10px]">
      <TextParallaxContent
        imgUrl="/parallax-images/2.jpg"
        heading="FEMMES"
        logoUrl="/logos/femmes.svg"
      >
        <div className="py-[40px] md:py-[80px] flex flex-col md:flex-row w-full  md:justify-center items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px]">
          <div className="flex flex-col gap-[30px] px-[20px] md:px-[60px] max-w-[800px]">
            <h1 className="text-[25px] sm:text-[30px] md:text-[35px] xl:text-[40px] font-semibold leading-tight">
              Femmes
            </h1>
            <div className="flex flex-col gap-[30px]">
              <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                At ProBono, we are committed to fostering gender equality and
                empowering women to take charge of their futures. Pro Bono
                Femmes is a dedicated initiative aimed at breaking down the
                barriers of gender discrimination and creating opportunities for
                women to thrive as independent, influential contributors to
                society.
              </span>
              <div className="flex flex-col gap-[10px]">
                <h2 className="text-[14px] md:text-[16px] xl:text-[18px] font-semibold">
                  Our Vision
                </h2>
                <span className="text-[14px] md:text-[16px] xl:text-[18px] text-black/80">
                  We envision a world where every woman has the tools,
                  resources, and support to realize her full potential. By
                  addressing systemic challenges and empowering women at every
                  level, we aim to create sustainable change that uplifts entire
                  communities.
                </span>
              </div>
            </div>
          </div>
          <img
            src="/images/femmes.webp"
            className="w-[80%] object-cover md:w-[400px] lg:w-[550px]  px-[20px] md:px-[40px]"
          />
        </div>
      </TextParallaxContent>
    </div>
  );
};

export default Introduction;
