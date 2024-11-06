"use client";

import React from "react";

import { AiOutlineLoading } from "react-icons/ai";

const OnboardBtn = ({ type, onClick, label, isLoading }) => {
  return (
    <button
      type={type}
      className="mt-10 py-4 transition-all duration-500 uppercase rounded-full bg-blue-500 hover:scale-105 active:scale-100 text-white font-semibold w-full cursor-pointer disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {isLoading ? (
        <AiOutlineLoading className="animate-spin mx-auto" size={24} />
      ) : (
        label
      )}
    </button>
  );
};

export default OnboardBtn;
