"use client";
import Image from "next/image";
import Link from "next/link";

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
          <div className="block sm:max-w-[280px] max-w-[200px]">
            <Image
              src="/footerlogo.png"
              alt="logo"
              width={1000}
              height={1000}
            />
          </div>{" "}
          <p className="mb-6 mt-2 text-white">
            Sampdkart is a trusted platform specializing in selling{" "}
            <strong>religious items</strong>, <strong>idols</strong>, and{" "}
            <strong>musical instruments</strong>. We are dedicated to providing
            high-quality products that enrich spiritual practices and celebrate
            cultural heritage.
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
            <strong>Phone:</strong> +91-912-005-3008
          </p>
          <p className="text-white mb-4">
            <strong>Address:</strong> PNB Road Near Maniramdas Chhawani, Chhoti
            Chhawani, Ayodhya, Uttar Pradesh 224123
          </p>

          <h3 className="text-xl font-semibold text-white mb-4">
            <strong> Follow Us !!</strong>{" "}
          </h3>
          <div className="flex space-x-4  text-2xl">
            <Link href="#">
              <FaFacebook className="text-[#1877F2] hover:scale-110   transition duration-300" />
            </Link>
            <Link href="#">
              <FaInstagram className="text-[#E4405F] hover:scale-110 transition duration-300" />
            </Link>
            <Link href="#">
              <FaYoutube className="text-[#FF0000] hover:scale-110 transition duration-300" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 mt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm px-6">
          <span className="text-white">
            &copy; Sampdkart © {new Date().getFullYear()}, All Rights Reserved
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
