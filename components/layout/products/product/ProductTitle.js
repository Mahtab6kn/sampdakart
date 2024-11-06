import React from "react";

const ProductTitle = ({ title, price, discount }) => {
  return (
    <div className="space-y-3 z-30 bg-white px-2 relative">
      <h2 className="text-lg font-bold capitalize truncate">{title}</h2>

      <div className="flex items-end gap-1.5 pb-6">
        <p className="leading-none font-medium text-black">
          ₹ <span>{(price - (discount / 100) * price).toFixed(2)}</span>
        </p>

        <p className="line-through text-xs leading-none">
          ₹ <span>{price}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductTitle;
