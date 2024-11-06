"use client";

import { useState, useEffect, useRef } from "react";
import { GiChessKing, GiCutDiamond, GiWorld, GiFactory } from "react-icons/gi"; // Example icons

const StatsCard = ({ Icon, number, label, duration }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true); // Start counting when the element is in view
        }
      },
      { threshold: 0.5 } // 50% of the card should be visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return; // Only start counting if the element is visible

    let start = 0;
    const end = parseInt(number);
    if (start === end) return;

    let incrementTime = (duration / end) * 1000; // Calculate time per increment
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end); // Ensure it ends on the exact number
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [isVisible, number, duration]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center text-center p-4"
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-red-100 hover:scale-110 transition-transform duration-300 ease-in-out">
        <Icon className="w-10 h-10" color="red" />
      </div>
      <div className="text-4xl font-bold mt-4 text-red-600">{count}+</div>
      <div className="text-gray-600 mt-2">{label}</div>
    </div>
  );
};

const StateSection = () => {
  return (
    <div className="pt-5 pb-12 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
        Why Choose GhostingTech E-Commerce?
      </h2>
      <p className="text-center text-gray-700 mb-12 px-5 md:mx-32">
        GhostingTech E-Commerce sets the standard with cutting-edge designs,
        top-tier fabrics, and unmatched craftsmanship. Discover a new level of
        style with us—where innovation seamlessly blends with elegance and
        quality.
      </p>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          Icon={GiChessKing}
          number="32"
          label="Years in Textile Industry"
          duration={2}
        />
        <StatsCard
          Icon={GiCutDiamond}
          number="1000"
          label="Retailers, Traders, Wholesalers"
          duration={3}
        />
        <StatsCard
          Icon={GiWorld}
          number="30"
          label="Countries Exported To"
          duration={2}
        />
        <StatsCard
          Icon={GiFactory}
          number="10"
          label="Lacs Pieces Per Month"
          duration={2}
        />
      </div>
    </div>
  );
};

export default StateSection;
