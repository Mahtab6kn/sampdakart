import React from "react";

const OverlayContentBtn = ({ setIsAnimated, buttonLabel }) => {
  return (
    <button
      className="py-2 xl:py-3 px-6 bg-transparent rounded-full text-center text-white font-bold uppercase ring-2 ring-white hover:scale-105 hover:bg-white/50 hover:shadow active:scale-95 ease-in hover:text-gray-800 transition-all"
      onClick={(e) => {
        setIsAnimated((prev) => !prev);
      }}
    >
      {buttonLabel}
    </button>
  );
};

export default OverlayContentBtn;
