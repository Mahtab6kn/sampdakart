"use client";

import { Carousel, IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import React, { useState, useEffect, useMemo, Suspense } from "react";

import ProductList from "./ProductList";

import SectionHeading from "@/components/ui/SectionHeading";
import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";

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

const useCurrencyLocale = () => {
  const [currency, setCurrency] = useState("INR");
  const [locale, setLocale] = useState("en-IN");
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchCurrencyLocale = async () => {
      const currencyLocaleMap = {
        IN: { currency: "INR", locale: "en-IN" },
        US: { currency: "USD", locale: "en-US" },
        GB: { currency: "GBP", locale: "en-GB" },
        CA: { currency: "CAD", locale: "en-CA" },
        AU: { currency: "AUD", locale: "en-AU" },
        // Add more country mappings as needed
      };

      try {
        // Fetch user's geolocation
        const locationRes = await fetch("/api/geolocation");
        const locationData = await locationRes.json();

        if (locationData?.country) {
          const { currency: userCurrency, locale: userLocale } =
            currencyLocaleMap[locationData.country] || currencyLocaleMap.IN;

          setCurrency(userCurrency);
          setLocale(userLocale);

          if (userCurrency !== "INR") {
            // Fetch exchange rates
            const ratesRes = await fetch("/api/exchange-rates");
            const ratesData = await ratesRes.json();

            if (
              ratesData.conversion_rates &&
              ratesData.conversion_rates[userCurrency]
            ) {
              setExchangeRate(ratesData.conversion_rates[userCurrency]);
            } else {
              console.error("Currency not found in response:", userCurrency);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching location or rates:", error);
      }
    };

    fetchCurrencyLocale();
  }, []);

  return { currency, locale, exchangeRate };
};
const ProductCarousel = ({ products, label = "" }) => {
  const [width] = useWindowSize();
  const { currency, locale, exchangeRate } = useCurrencyLocale();

  const slides = useMemo(() => {
    let perSlide;

    if (width > 1360) perSlide = 4;
    else if (width > 960) perSlide = 3;
    else if (width > 720) perSlide = 2;
    else perSlide = 1;

    const slides = [];

    for (let i = 0; i < products?.length; i += perSlide) {
      slides.push(products.slice(i, i + perSlide));
    }

    return slides;
  }, [products, width]);

  const renderSlides = () => {
    return slides.map((slideItems, index) => (
      <ProductList
        key={index}
        products={slideItems}
        currency={currency}
        locale={locale}
        exchangeRate={exchangeRate}
      />
    ));
  };

  return (
    <section className="my:0">
      {label.length !== 0 && (
        <SectionHeading label={label} className="text-[#FF8225]" />
      )}

      <Suspense fallback={<ProductListSkeleton />}>
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
      </Suspense>
    </section>
  );
};

export default ProductCarousel;
