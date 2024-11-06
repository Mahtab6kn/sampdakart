import React from "react";

const ProductExtraDetails = ({ isHovered, isSet = false, sizes }) => {
  if (isSet) return null;

  return (
    <div
      className="space-y-3 absolute top-0 bg-gradient-to-b from-transparent to-black w-full py-4 px-2 left-0 z-10"
      style={{
        transform: isHovered ? "translateY(-100%)" : "translateY(0%)",
        transition: "all 0.3s",
        opacity: isHovered ? 1 : 0,
      }}
    >
      <div className="flex gap-1.5 pt-10">
        <h3 className="font-medium text-white text-sm">Sizes: </h3>

        <div className="flex gap-2">
          {sizes.slice(0, 6).map((size) => (
            <span
              key={size.size}
              className="px-2 py-1 border rounded-md text-xs text-white uppercase"
            >
              {size.size}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5">
        <h3 className="font-medium text-white text-sm">Colors:</h3>

        <div className="flex gap-2 items-center">
          <div className="flex gap-1.5">
            <h3 className="font-medium text-white text-sm">Colors:</h3>

            <div className="flex gap-2 items-center">
              {Array.from(
                new Set(
                  sizes.flatMap((size) =>
                    size.colours.map((color) => color.colour.hex)
                  )
                )
              )
                .slice(0, 8)
                .map((hex, index) => (
                  <span
                    key={hex}
                    className="w-4 h-4 border-2 rounded-full text-xs text-white"
                    style={{ backgroundColor: hex }}
                  ></span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExtraDetails;
