"use client";

import { Carousel, IconButton } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import React, { useState, useEffect, useMemo, Suspense } from "react";

import ProductList from "./ProductList";

import SectionHeading from "@/components/ui/SectionHeading";
import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrencyLocale,
  setExchangeRate,
} from "@/redux/slice/currencySlice";

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
  const dispatch = useDispatch();
  const { currency, locale, exchangeRate } = useSelector(
    (state) => state.currency
  );

  useEffect(() => {
    const fetchCurrencyLocale = async () => {
      const currencyLocaleMap = {
        IN: { currency: "INR", locale: "en-IN" },
        US: { currency: "USD", locale: "en-US" },
        // Add other country mappings...
      };

      try {
        const locationRes = await fetch("/api/geolocation");
        const locationData = await locationRes.json();

        if (locationData?.country) {
          const { currency: userCurrency, locale: userLocale } =
            currencyLocaleMap[locationData.country] || {};

          if (userCurrency && userLocale) {
            dispatch(
              setCurrencyLocale({ currency: userCurrency, locale: userLocale })
            );

            if (userCurrency !== "INR") {
              const cachedRates = JSON.parse(
                localStorage.getItem("exchangeRates")
              );
              const cachedTimestamp = localStorage.getItem(
                "exchangeRatesTimestamp"
              );

              const isCacheValid =
                cachedRates &&
                cachedTimestamp &&
                new Date().getTime() - cachedTimestamp < 24 * 60 * 60 * 1000;

              if (isCacheValid) {
                dispatch(setExchangeRate(cachedRates[userCurrency] || 1));
              } else {
                const ratesRes = await fetch("/api/exchange-rates");
                const ratesData = await ratesRes.json();

                if (ratesData.conversion_rates) {
                  localStorage.setItem(
                    "exchangeRates",
                    JSON.stringify(ratesData.conversion_rates)
                  );
                  localStorage.setItem(
                    "exchangeRatesTimestamp",
                    new Date().getTime()
                  );

                  dispatch(
                    setExchangeRate(
                      ratesData.conversion_rates[userCurrency] || 1
                    )
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCurrencyLocale();
  }, [dispatch]);

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
      <ProductList key={index} products={slideItems} />
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
