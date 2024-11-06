import React, { useState } from "react";

const ProductDesciption = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const wordCount = description.split(" ").length;

  const shortDescription = description.split(" ").slice(0, 10).join(" ");

  return (
    <div className="font-400 text-sm md:text-md text-gray-500">
      {isExpanded || wordCount <= 10 ? description : shortDescription}

      {wordCount > 10 && (
        <button onClick={toggleExpanded} className="ml-2 text-light-blue-500">
          {isExpanded ? "Show less" : "...more"}
        </button>
      )}
    </div>
  );
};

export default ProductDesciption;
