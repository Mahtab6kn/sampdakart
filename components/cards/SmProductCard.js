import Image from "next/image";
import React from "react";
import ImageContainer from "../ui/ImageContainer";
import { useSelector } from "react-redux";

const SmProductCard = ({ product, qty, size, color, colorHex }) => {
  const { currency, locale, exchangeRate } = useSelector(
    (state) => state.currency
  );
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  };
  const amt = product.price - (product.price * product.discount) / 100;
  return (
    <div className="bg-white border shadow-md rounded-lg overflow-hidden mb-2 relative w-full">
      <div className="flex items-start p-2 md:p-3 gap-2">
        <div className="w-4/6 md:w-1/3">
          <ImageContainer image={product.images[0].url} height={150} />
        </div>
        <div className="flex w-full pt-3 md:pt-0">
          <div className="flex flex-col gap-1 w-full ">
            <div className="border border-gray-500 w-fit text-xs px-2 py-1 rounded-md flex items-center gap-1 whitespace-nowrap capitalize">
              {product.category} /
              <span className="">{product.subCategory.name}</span>
            </div>
            <h3 className="text-md font-semibold">{product.title}</h3>

            <div className="flex gap-1 flex-col w-full">
              <div className="flex flex-col gap-1 justify-between">
                <p className="text-sm text-teal-500 font-bold">
                  {formatCurrency(amt * exchangeRate)}{" "}
                  <span className="line-through text-gray-400">
                    {formatCurrency(product.price.toFixed(2) * exchangeRate)}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Quantity: {qty}</p>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <div className="hidden md:block">Size & Color: </div>
                <div className="uppercase">{size}</div> |
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: `${colorHex}` }}
                ></div>
                <div className="capitalize">{color}</div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmProductCard;
