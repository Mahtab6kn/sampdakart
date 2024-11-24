import React, { useEffect, useState } from "react";

const ProductTitle = ({
  title,
  price,
  discount,
  currency,
  locale,
  exchangeRate,
}) => {
  const convertedPrice = price * exchangeRate;
  const discountedPrice = convertedPrice - (discount / 100) * convertedPrice;

  // Format price using Intl.NumberFormat
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  };

  return (
    <div className="space-y-3 z-30 bg-white px-2 relative">
      <h2 className="text-lg font-bold capitalize truncate">{title}</h2>

      <div className="flex items-end gap-1.5 pb-6">
        <p className="leading-none font-medium text-black">
          {formatCurrency(discountedPrice)}
        </p>

        <p className="line-through text-xs leading-none">
          {formatCurrency(convertedPrice)}
        </p>
      </div>
    </div>
  );
};

export default ProductTitle;
