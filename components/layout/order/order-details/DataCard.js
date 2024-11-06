import React from "react";

const DataCard = ({ icon, title, data }) => {
  return (
    <div className="flex gap-2">
      <div className="text-gray-500">{icon}</div>
      <div className="text-sm font-medium text-gray-700">
        {title}
        <div
          className={`text-sm text-gray-500 mt-1 
         ${title === "Email" ? "lowercase" : "capitalize"} `}
        >
          {data}
        </div>
      </div>
    </div>
  );
};

export default DataCard;
