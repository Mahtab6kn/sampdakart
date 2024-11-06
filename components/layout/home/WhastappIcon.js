"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";

const WhastappIcon = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="fixed left-5 bottom-5  md:left-6 md:bottom-6  z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link
        href="https://wa.me/919909338631"
        className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center hover:cursor-pointer"
      >
        <BsWhatsapp color="white" className="text-xl" />
      </Link>

      {showTooltip && (
        <div className="w-28 text-center absolute left-12 bottom-3 bg-green-500 text-white text-xs rounded py-1 px-2 border">
          WhatsApp Now
        </div>
      )}
    </div>
  );
};

export default WhastappIcon;
