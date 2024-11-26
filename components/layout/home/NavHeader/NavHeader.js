"use client";

import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";

import NavList from "./NavList";
import NavProfile from "./NavProfile";

import { useDispatch } from "react-redux";

import { updateWishlist } from "@/redux/slice/wishlistSlice";

const useCurrencyLocale = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrencyLocale = async () => {
      const currencyLocaleMap = {
        IN: { currency: "INR", locale: "en-IN" },
        US: { currency: "USD", locale: "en-US" },
        GB: { currency: "GBP", locale: "en-GB" },
        CA: { currency: "CAD", locale: "en-CA" },
        AU: { currency: "AUD", locale: "en-AU" },
        AE: { currency: "AED", locale: "en-AE" },
        SG: { currency: "SGD", locale: "en-SG" },
        JP: { currency: "JPY", locale: "ja-JP" },
        DE: { currency: "EUR", locale: "de-DE" },
        FR: { currency: "EUR", locale: "fr-FR" },
        IT: { currency: "EUR", locale: "it-IT" },
        ES: { currency: "EUR", locale: "es-ES" },
        CH: { currency: "CHF", locale: "de-CH" },
        CN: { currency: "CNY", locale: "zh-CN" },
        HK: { currency: "HKD", locale: "en-HK" },
        ZA: { currency: "ZAR", locale: "en-ZA" },
        BR: { currency: "BRL", locale: "pt-BR" },
        RU: { currency: "RUB", locale: "ru-RU" },
        SA: { currency: "SAR", locale: "ar-SA" },
        KR: { currency: "KRW", locale: "ko-KR" },
        MX: { currency: "MXN", locale: "es-MX" },
        MY: { currency: "MYR", locale: "ms-MY" },
        TH: { currency: "THB", locale: "th-TH" },
        SE: { currency: "SEK", locale: "sv-SE" },
        NO: { currency: "NOK", locale: "nb-NO" },
        DK: { currency: "DKK", locale: "da-DK" },
        NZ: { currency: "NZD", locale: "en-NZ" },
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
};

const NavHeader = () => {
  useCurrencyLocale();

  const dispatch = useDispatch();

  const [openNav, setOpenNav] = useState(false);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`/api/user/wishlist`);

      const data = await res.json();

      dispatch(updateWishlist(data.data));
    } catch (error) {
      console.error("Error fetching wishlists", error);
      toast.error("Error fetching wishlists");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-1 lg:px-8 lg:py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="block">
            <Image
              src="/sampdakart-logo.png"
              alt="logo"
              width={120}
              height={20}
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <NavList />
          </div>

          <div className="flex items-center gap-4">
            <NavProfile />
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 flex text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6 text-black" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-black" />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default NavHeader;
