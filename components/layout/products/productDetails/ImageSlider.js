"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import ImageContainer from "@/components/ui/ImageContainer";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

const ImageSlider = ({ data = [] }) => {
  const [active, setActive] = useState(data[0]?.url || "");

  const [width] = useWindowSize();

  const slides = useMemo(() => {
    let perSlide;

    if (width > 960) perSlide = 3;
    else if (width > 720) perSlide = 2;
    else perSlide = 2;

    const slides = [];

    for (let i = 0; i < data.length; i += perSlide) {
      slides.push(data.slice(i, i + perSlide));
    }

    return slides;
  }, [data, width]);

  const renderSlides = () => {
    return slides.map((slideItems, slideIndex) => (
      <div key={slideIndex} className="flex gap-2">
        {slideItems.map((slide, index) => (
          <div key={index} className="h-40 w-auto">
            <Image
              onClick={() => setActive(slide.url)}
              src={slide.url}
              className="h-full w-11/12  cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
              width={160}
              height={160}
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="grid gap-4 w-full p-5 md:w-1/3">
      <ImageContainer image={active} />

      <Carousel
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-white/50 shadow rounded-full hover:bg-white/70 hover:scale-105 active:scale-100 transition-all duration-100 z-30"
          >
            <ChevronLeftIcon className="h-6 w-6 text-black" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-white/50 shadow rounded-full hover:bg-white/70 hover:scale-105 active:scale-100 transition-all duration-100 z-30"
          >
            <ChevronRightIcon className="h-6 w-6 text-black" />
          </IconButton>
        )}
        className="flex gap-4"
        loop
        autoplay
        interval={3000}
      >
        {renderSlides()}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
