import React from "react";

const SectionHeading = ({ label, className }) => {
  return (
    <h1
      className={
        "font-aclonica text-3xl text-center md:text-4xl lg:text-5xl " +
        className
      }
    >
      {label}
    </h1>
  );
};

export default SectionHeading;
