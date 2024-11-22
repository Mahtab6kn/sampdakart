import Image from "next/image";
import React from "react";

const BannerSection = () => {
  return (
    <div className="w-full my-5 mx-auto px-5">
      <Image
        src={"/home/BannerImg.jpg"}
        width={1000}
        height={1000}
        className="w-full h-96 hidden md:block"
      />
      <Image
        src={"/mobBanner.jpg"}
        width={1000}
        height={1000}
        className="w-full h-96 md:hidden"
      />
    </div>
  );
};

export default BannerSection;
