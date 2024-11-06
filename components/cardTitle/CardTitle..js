import Image from "next/image";
import React from "react";

const CardTitle = ({ data, size, borderColor }) => {
  const borderColorClass = borderColor || "#0052D4";
  const textSize = size === "small" ? "text-md" : "text-lg";


  return (
    <div
      className={`flex items-center h-14 py-3 mb-4 gap-2 border-b-2`}
      style={{ borderColor: borderColorClass }}
    >
      <Image
        src={data.icon}
        width={size === "small" ? 20 : 25}
        height={size === "small" ? 12 : 20}
        alt={data.name}
      />
      <span className={`${textSize} font-semibold  `}>
        {data.name}
      </span>
    </div>
  );
};

export default CardTitle;
