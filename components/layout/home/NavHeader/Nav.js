"use client";
import NavHeader from "./NavHeader";
import Marquee from "./Marquee";
import HeaderCategory from "./category/HeaderCategory";
import { useDispatch } from "react-redux";
import {
  setCurrencyLocale,
  setExchangeRate,
} from "@/redux/slice/currencySlice";
import { useEffect } from "react";

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

const Nav = () => {
  useCurrencyLocale();

  return (
    <>
      <NavHeader />
      <HeaderCategory />
      <Marquee />
    </>
  );
};

export default Nav;
