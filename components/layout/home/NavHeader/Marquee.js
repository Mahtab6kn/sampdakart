import React from "react";

const Marquee = () => {
  const marqueeItems = [
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 2",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 3",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 4",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 5",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 6",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 7",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 8",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 9",
    "Free shipping on orders INR 1499 | 25000+ Designs I Made To Measure 10",
  ];

  return (
    <div className="overflow-x-hidden bg-white  w-full">
      <div className="animate-marquee whitespace-nowrap">
        {marqueeItems.map((item, index) => (
          <span key={index} className="text-sm text-red-500 mx-4">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
