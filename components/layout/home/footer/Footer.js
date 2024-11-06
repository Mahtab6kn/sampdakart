"use client";
import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

// import FooterCategories from "./FooterCategories";
// import Image from "next/image";

// const Footer = async () => {
//   const footerInfo = {
//     links: [
//       { href: "/privacy-policy", text: "Privacy Policy" },
//       { href: "/terms-and-condition", text: "Terms Of Condition" },
//       { href: "/refund-policy", text: "Refund Policy" },
//       { href: "/shipping-policy", text: "Shipping Policy" },
//     ],
//   };

//   return (
//     <footer className="bg-white pt-10 container mx-auto border-t border-gray-200 mt-10">
//       <div className="flex flex-col items-center">
//         <h2 className="text-3xl font-semibold mb-6">Categories</h2>

//         <FooterCategories />

//         <div className="mb-10 px-6">
//           <h3 className="text-lg font-semibold mb-4">Ridhi Suman Fabric</h3>
//           <p className="text-gray-600">
//             Aims to make it easier for every community in the world to carry out
//             various buying and selling transactions online. It is one of the
//             worlds online buying and selling sites whose development is
//             relatively fast. You can sell products online at the slabshop
//             besides being able to enjoy the process of buying various products
//             more quickly and effectively. You can sign up for the exclusive
//             slabshop Seller community if you want to launch your own business.
//           </p>
//         </div>
//       </div>

// <div className="border-t border-gray-200 py-4">
//   <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-6">
//     <span>&copy; Ridhi Suman © 2024-2025, All Rights Reserved</span>

//     <div className="grid grid-cols-2 gap-4 md:flex mt-4 md:mt-0">
//       {footerInfo.links.map((link, index) => (
// <Link
//   key={index}
//   href={link.href}
//   className="hover:underline text-xs"
// >
//   {link.text}
// </Link>
//       ))}
//     </div>
//     <div className="flex gap-1 mt-4 md:mt-0">
//       Designed and maintain by
//       <Link
//         href={"https://ghosting.in"}
//         target="_blank"
//         className="flex gap-1 items-center"
//       >
//         <div className="font-semibold text-amber-500">Ghosting Tech</div>
//         <Image
//           src={"/ghosting.png"}
//           width={20}
//           height={20}
//           alt="Ghosting Tech Logo"
//         />
//       </Link>
//     </div>
//   </div>
// </div>
//     </footer>
//   );
// };

// export default Footer;
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const footerInfo = {
    links: [
      { href: "/privacy-policy", text: "Privacy Policy" },
      { href: "/terms-and-condition", text: "Terms Of Condition" },
      { href: "/refund-policy", text: "Refund Policy" },
      { href: "/shipping-policy", text: "Shipping Policy" },
      { href: "/blogs", text: "Blogs" },
      { href: "/contactUs", text: "Contact Us" },
    ],
  };
  async function getCategories() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        return {
          success: false,
          message: "Failed to fetch categories",
          status: res.status,
          data: [],
        };
      }

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while fetching the categories",
        data: [],
      };
    }
  }

  useEffect(() => {
    getCategories();
    setTimeout(() => setIsVisible(true), 500); // Delay for fade-in effect
  }, []);

  return (
    <footer
      className={`bg-[#030637] pt-10 px-4 lg:px-20 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Intro */}
        <div className="col-span-1">
          <h2 className="text-3xl font-bold text-pink-500 mb-4 flex items-center justify-center">
            <div className="block sm:max-w-[200px] max-w-[200px]">
              <Image src="/ghosting.png" alt="logo" width={100} height={65} />
            </div>{" "}
          </h2>
          <p className="mb-6 text-white">
            Welcome to Ghoting Tech Fabrics, a platform for seamless online
            buying and selling. Join the exclusive Seller community to launch
            your business and enjoy faster, more effective transactions
            worldwide.
          </p>
        </div>

        {/* Our Products */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            <strong> Our Products</strong>{" "}
          </h3>
          <ul className="text-white space-y-2">
            {categories?.slice(0, 7).map((product, index) => (
              <li
                key={index}
                className="hover:scale-105  transition duration-300"
              >
                <Link href={`/category/${product.name}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            <strong>Quick Links</strong>{" "}
          </h3>
          <ul className="text-white space-y-2">
            {footerInfo.links.map((link, index) => (
              <li
                key={index}
                className="hover:scale-105 text-base transition duration-300"
              >
                <Link key={index} href={link.href}>
                  {link.text}
                </Link>{" "}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            <strong>Contact Info</strong>
          </h3>
          <p className="text-white mb-4">
            <strong>Phone:</strong> +91-111-222-3333
          </p>
          <p className="text-white mb-4">
            <strong>Address:</strong> 1st Floor, S/460 , Bashant vihar Market,
            near Panch Shiv Mandir, Kankarbagh Colony, Patna, Bihar 800020
          </p>

          <h3 className="text-xl font-semibold text-white mb-4">
            <strong> Follow Us !!</strong>{" "}
          </h3>
          <div className="flex space-x-4  text-2xl">
            <Link href={"https://www.facebook.com/Riddhisumanfabrics/"}>
              <FaFacebook className="text-[#1877F2] hover:scale-110   transition duration-300" />
            </Link>
            <Link href={"https://www.instagram.com/riddhisumanfabrics62/"}>
              <FaInstagram className="text-[#E4405F] hover:scale-110 transition duration-300" />
            </Link>
            <Link href={"https://www.youtube.com/@Riddhisumanlehenga1"}>
              <FaYoutube className="text-[#FF0000] hover:scale-110 transition duration-300" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 mt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-6">
          <span className="text-white">
            &copy; Ghosting Tech © {new Date().getFullYear()}, All Rights
            Reserved
          </span>

          <div className="flex gap-1 mt-4 md:mt-0 text-white">
            Designed and maintain by
            <Link
              href={"https://ghosting.in"}
              target="_blank"
              className="flex gap-1 items-center"
            >
              <Image
                src={"/ghosting.png"}
                width={20}
                height={20}
                alt="Ghosting Tech Logo"
              />
              <div className="font-semibold text-amber-500">Ghosting Tech</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
