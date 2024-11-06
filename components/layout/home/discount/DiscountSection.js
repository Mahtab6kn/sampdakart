import SectionHeading from "@/components/ui/SectionHeading";
import React from "react";
import DiscountStickerList from "./DiscountStickerList";

const DiscountSection = () => {
  return (
    <div>
      <SectionHeading label="Filter by discount" className="text-teal-500" />
      <DiscountStickerList />
    </div>
  );
};

export default DiscountSection;
