"use client";

import { Carousel, IconButton } from "@material-tailwind/react";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import React, { useState, useEffect } from "react";

import ProductSetItem from "./productsSet/ProductSetItem";
import ProductSetList from "./productsSet/ProductsSetList";

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

const ProductSetCarousel = () => {
  const [width] = useWindowSize();
  const items = [
    <ProductSetItem key={1} />,
    <ProductSetItem key={2} />,
    <ProductSetItem key={3} />,
    <ProductSetItem key={4} />,
    <ProductSetItem key={5} />,
    <ProductSetItem key={6} />,
    <ProductSetItem key={7} />,
    <ProductSetItem key={8} />,
    <ProductSetItem key={9} />,
    <ProductSetItem key={10} />,
  ];

  const divideItems = () => {
    let perSlide;

    if (width > 1360) perSlide = 3;
    else if (width > 960) perSlide = 2;
    else perSlide = 1;

    const slides = [];

    for (let i = 0; i < items.length; i += perSlide) {
      slides.push(items.slice(i, i + perSlide));
    }

    return slides;
  };

  const renderSlides = () => {
    const slides = divideItems();

    return slides.map((slideItems, index) => (
      <ProductSetList key={index}>{slideItems}</ProductSetList>
    ));
  };

  return (
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
    >
      {renderSlides()}
    </Carousel>
  );
};

export default ProductSetCarousel;
