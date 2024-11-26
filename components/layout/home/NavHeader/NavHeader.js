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

const NavHeader = () => {
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
