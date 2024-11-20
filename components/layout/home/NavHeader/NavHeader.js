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

// export default function NavHeader() {
//   const dispatch = useDispatch();

//   const [openNav, setOpenNav] = useState(false);

//   const fetchWishlist = async () => {
//     try {
//       const res = await fetch(`/api/user/wishlist`);

//       const data = await res.json();

//       dispatch(updateWishlist(data.data));
//     } catch (error) {
//       console.error("Error fetching wishlists", error);
//       toast.error("Error fetching wishlists");
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setOpenNav(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   return (
//     <div className="relative bg-teal-900 text-white min-h-[600px]">
//       <nav className=" bg-teal-900 h-max max-w-full rounded-none lg:px-8 lg:py-2">
//         <div className="flex items-center justify-between">
//           <Link href="/">
//             <div className="block sm:max-w-[140px] max-w-[115px]">
//               {/* <Image src="/ridhi-logo.png" alt="logo" width={140} height={65} /> */}
//               E-Commerce
//             </div>
//           </Link>

//           <div className="flex items-center gap-4">
//             <div className="hidden lg:block">
//               <NavList />
//             </div>

//             <div className="flex items-center gap-4">
//               <NavProfile />
//               <IconButton
//                 variant="text"
//                 className="ml-auto h-6 w-6 flex text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//                 ripple={false}
//                 onClick={() => setOpenNav(!openNav)}
//               >
//                 {openNav ? (
//                   <XMarkIcon className="h-6 w-6 text-black" />
//                 ) : (
//                   <Bars3Icon className="h-6 w-6 text-black" />
//                 )}
//               </IconButton>
//             </div>
//           </div>
//         </div>

//         <Collapse open={openNav}>
//           <NavList />
//         </Collapse>
//       </nav>
//       <div className="container  mx-auto px-4 lg:px-8 pt-12 lg:flex lg:items-center lg:justify-between">
//         <div className="lg:w-2/3 mb-8 lg:mb-0">
//           <p className="text-sm uppercase mb-2">Welcome to Ceramic Shop</p>
//           <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
//             Elevate Your Space with Ceramic Elegance
//           </h1>
//           <p className="text-xl mb-6">Starting from just $149.00</p>
//           <a
//             href="/shop"
//             className="inline-block bg-white text-teal-900 font-semibold py-2 px-6 rounded-lg hover:bg-teal-100"
//           >
//             Shop Now
//           </a>
//         </div>

//         <div className="lg:w-1/3 relative">
//           <div className="relative">
//             <div className="absolute top-32 -left-24 bg-white shadow-lg rounded-lg">
//               <Image
//                 src="/home/heroSection/carousel/download1.jpg"
//                 alt="Ceramic Plant"
//                 width={200}
//                 height={300}
//                 className="rounded-lg h-[350px] w-[250px]"
//               />
//             </div>
//             <Image
//               src="/home/heroSection/carousel/download2.jpg"
//               alt="Ceramic Bowls"
//               width={450}
//               height={600}
//               className="rounded-lg h-[450px]"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
