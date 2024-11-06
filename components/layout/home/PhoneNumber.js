"use client";

import Link from "next/link";
import React, { useState } from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";

const PhoneNumber = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div
        className="fixed right-5 bottom-5 md:right-6 w-15 h-15 bg-light-blue-100  z-50  rounded-full p-2"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Link
          href="tel:+919909338631"
          className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center hover:cursor-pointer p-2 heartbeat"
        >
          <PhoneIcon color="white" fontSize={20} />
        </Link>

        {showTooltip && (
          <div className="w-28 bg-blue-500 text-center absolute right-12 bottom-3  text-white text-xs rounded py-1 px-2 border">
            Call Now
          </div>
        )}
      </div>
    </>
  );
};

export default PhoneNumber;
