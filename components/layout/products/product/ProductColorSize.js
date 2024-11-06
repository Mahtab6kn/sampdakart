"use client";

import React from "react";

const ProductColorSize = ({
  sizes,
  selectedSize,
  selectedColor,
  setSelectedSize,
  setSelectedColor,
}) => {
  return (
    <div className="my-6 space-y-3">
      <div className="[&>div]:min-w-0 w-full flex items-center gap-6">
        <div className="text-gray-700 text-md font-semibold capitalize">
          Sizes:
        </div>

        <select
          className="border border-gray-300 rounded-md p-2 outline-none w-full disabled:cursor-not-allowed"
          label="Select your size"
          value={selectedSize?.toUpperCase()}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Select your size</option>

          {sizes.map((item) => (
            <option
              key={item.size}
              className="uppercase"
              value={item.size.toUpperCase()}
            >
              {item.size.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="[&>div]:min-w-0 w-full flex items-center gap-4">
        <div className="text-gray-700 text-md font-semibold capitalize">
          Colour:
        </div>

        <select
          value={selectedSize && (selectedColor?.toUpperCase() || "")}
          onChange={(e) => setSelectedColor(e.target.value)}
          label="Select your color"
          className="w-full [&>div]:min-w-0 border border-gray-300 rounded-md p-2 outline-none"
          disabled={!selectedSize}
        >
          <option value="">Select your color</option>

          {sizes
            .filter(
              (item) =>
                !selectedSize.toLowerCase() ||
                item.size.toLowerCase() === selectedSize.toLowerCase()
            )
            .flatMap((size) => size.colours)
            .map((color, idx) => {
              const isOutOfStock = Number(color.quantity) === 0;

              if (isOutOfStock) return null;

              return (
                <option
                  key={color.colour.name}
                  value={`${color.colour.name.toUpperCase()}~${
                    color.colour.hex
                  }`}
                  className="uppercase"
                >
                  {color.colour.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default ProductColorSize;
