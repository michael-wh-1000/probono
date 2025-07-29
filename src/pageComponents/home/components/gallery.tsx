const Gallery = () => {
  return (
    <div className="flex justify-center">
      <div className=" bg-white flex flex-col items-center gap-[40px] py-[40px] lg:py-[80px]">
        <h1 className="text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] font-semibold">
          Gallery
        </h1>
        <div className="flex flex-col sm:grid grid-cols-6 grid-rows-10 gap-[10px] w-full px-[30px] md:px-[40px] max-w-[1500px] h-auto sm:h-[800px]">
          <div className="col-span-4 row-span-4">
            <img
              src="/images/8.webp"
              className="w-full h-full object-cover rounded-lg md:rounded-2xl"
            />
          </div>
          <div className="col-span-2 row-span-6 col-start-5">
            <img
              src="/images/9.webp"
              className="w-full h-full object-cover rounded-lg md:rounded-2xl"
            />
          </div>
          <div className="col-span-2 row-span-4 col-start-5 row-start-7">
            <img
              src="/images/6.webp"
              className="w-full h-full object-cover rounded-lg md:rounded-2xl"
            />
          </div>
          <div className="col-span-2 row-span-6 col-start-3 row-start-5">
            <img
              src="/images/5.webp"
              className="w-full h-full object-cover rounded-lg md:rounded-2xl"
            />
          </div>
          <div className="col-span-2 row-span-3 col-start-1 row-start-5">
            <img
              src="/images/7.webp"
              className="w-full h-full object-cover rounded-lg md:rounded-2xl"
            />
          </div>
          <div className="col-span-2 row-span-3 row-start-8">
            <img
              src="/images/10.webp"
              className="w-full h-full object-cover rounded-lg md:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
