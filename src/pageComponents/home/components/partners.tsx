import Marquee from "react-fast-marquee";

const imageLinks = [
  "/logos/smartgirls.png",
  "/logos/roofings.png",
  "/logos/stanbic.png",
  "/logos/yli.png",
  "/logos/booksnchess.png",
  "/logos/budoleague.png",
  "/logos/mydoctor.png",
  "/logos/safeplaces.png",
  "/logos/ysa.JPG",
  "/logos/girlpower.JPG",
  "/logos/artcee.png",
  "/logos/youngeye.PNG",
];

const Partners = () => {
  return (
    <div>
      <div className="flex justify-between px-[20px] sm:justify-center w-full sm:gap-[80px] md:gap-[150px] lg:gap-[200px] xl:gap-[250px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
        <div className="flex flex-col items-center w-fit text-center">
          <img src="/icons/people.png" className="w-[20px] sm:w-[30px]" />
          <h1 className="text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] xl:text-[55px] font-semibold leading-tight">
            100
            <span className="font-medium sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[50px]">
              +
            </span>
          </h1>
          <span className="text-black/60 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
            Volunteers
          </span>
        </div>
        <div className="flex flex-col items-center w-fit text-center">
          <img src="/icons/hands.png" className=" w-[20px] sm:w-[30px]" />
          <h1 className="text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] xl:text-[55px] font-semibold leading-tight">
            10
            <span className="font-medium sm:text-[35px] md:text-[40px] lg:text-[45px] xl:text-[50px]">
              +
            </span>
          </h1>
          <span className="text-black/60 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
            Partner Organisations
          </span>
        </div>
        <div className="flex flex-col items-center w-fit text-center">
          <img src="/icons/clock.png" className="w-[20px] sm:w-[30px]" />
          <h1 className="text-[35px] sm:text-[40px] md:text-[45px] lg:text-[50px] xl:text-[55px] font-semibold leading-tight">
            5
          </h1>
          <span className="text-black/60 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px]">
            Years of impact
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[40px] items-center pb-[40px] md:pb-[60px] lg:pb-[80px]">
        <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
          Our Partners
        </h1>
        <Marquee speed={25}>
          <div className="flex gap-[80px] sm:gap-[90px] md:gap-[100px] lg:gap-[110px] xl:gap-[120px] px-[40px] sm:px-[45px] md:px-[50px] lg:px-[55px] xl:px-[60px] items-center">
            {imageLinks.map((imageLink) => (
              <img
                src={imageLink}
                className="h-[40px] sm:h-[45px] md:h-[50px] lg:h-[55px] xl:h-[60px] aspect-auto"
                key={imageLink}
              />
            ))}

            <img
              src="/logos/gifftid.png"
              className="h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] xl:h-[40px] aspect-auto"
            />
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Partners;
