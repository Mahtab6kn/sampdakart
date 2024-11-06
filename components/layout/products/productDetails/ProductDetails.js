import React from "react";
import { BiDetail } from "react-icons/bi";

const ProductDetails = ({ fabric, brand }) => {
  return (
    <div className="flex flex-col gap-1 bg-gray-100 px-4 py-2 rounded-md">
      <div className="text-md mb-1 font-semibold flex items-center gap-1 text-gray-700">
        <BiDetail />
        Product Detail
      </div>

      <div className="flex flex-row items-center gap-1">
        <div className="text-gray-600 text-sm">Fabric : </div>

        <div className="text-gray-600 text-sm capitalize">{fabric}</div>
      </div>

      <div className="flex flex-row items-center gap-1">
        <div className="text-gray-600 text-sm">Brand : </div>

        <div className="text-gray-600 text-sm capitalize">{brand}</div>
      </div>
    </div>
  );
};

export default ProductDetails;
