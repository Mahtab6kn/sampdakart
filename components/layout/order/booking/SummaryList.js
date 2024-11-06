import React from "react";
import { products } from "@/utils/productData";
import SmProductCard from "@/components/cards/SmProductCard";

const SummaryList = () => {
  return (
    <div className="flex flex-col gap-2">
      {products.map((product, index) => (
        <SmProductCard key={index} product={product} size="small" />
      ))}
    </div>
  );
};

export default SummaryList;
