import React from "react";

const SuccessPage = () => {
  return (
    <div className="pt-[140px] pb-[80px] flex flex-col w-full items-center overflow-clip gap-[40px] sm:gap-[50px] md:gap-[0px] lg:gap-[50px] min-h-screen relative">
      <div className="absolute top-0  h-full overflow-clip w-full -z-10">
        <img
          src="/svg-images/circles.svg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-[10px]">
        <h1 className="text-[25px] font-semibold leading-tight">Success!</h1>
        <span className="text-[16px] text-center">
          Your application has been received.<br></br> You'll receive a response
          email once it has been reviewed
        </span>
      </div>
    </div>
  );
};

export default SuccessPage;
