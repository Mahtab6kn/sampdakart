"use client";

import { useState } from "react";

import AuthForm from "./AuthForm";
import AuthOverlaySlider from "./AuthOverlaySlider";

const AuthContainer = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const overlayBg = "bg-amber-500";

  return (
    <>
      <AuthForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />

      <div
        id="overlay-container"
        className={`absolute top-0 left-1/2 w-0 lg:w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 lg:block hidden ${
          isAnimated ? "-translate-x-full" : ""
        }`}
      >
        <div
          id="overlay"
          className={`${overlayBg} relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
            isAnimated ? "translate-x-1/2" : "translate-x-0"
          }`}
        >
          <AuthOverlaySlider
            isAnimated={isAnimated}
            setIsAnimated={setIsAnimated}
          />
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
