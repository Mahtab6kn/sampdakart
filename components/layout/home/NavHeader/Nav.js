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

const Nav = () => {
  return (
    <>
      <NavHeader />
      <HeaderCategory />
      <Marquee />
    </>
  );
};

export default Nav;
