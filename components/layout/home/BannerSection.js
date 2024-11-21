import Image from "next/image";
import React from "react";

const BannerSection = () => {
  return (
    <div className="w-full my-5 mx-auto px-5">
      <Image
        src={"/home/ownerBanner.png"}
        width={500}
        height={500}
        className="w-full h-96"
      />
    </div>
  );
};

export default BannerSection;
