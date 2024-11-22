"use client";
import Link from "next/link";
import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

const page = () => {
  return (
    <section className="p-6 text-gray-700">
      <div className="text-center">
        <h2 className="text-amber-500 text-2xl font-semibold">
          Contact Information
        </h2>
        <p className="mt-2 text-gray-600">
          Write to us or call us, get quick response powered by our advanced
          customer support team.
        </p>
      </div>

      <div className="mt-6 space-y-4 w-full md:w-7/12 pl-2 md:pl-8 md:mx-auto">
        <div className="flex ">
          <FaMapMarkerAlt className="text-amber-500 text-xl sm:text-lg mr-4" />
          <div>
            <p className="font-semibold">Ghsoting Tech</p>
            <p>
              1st Floor, S/460 , Bashant vihar Market, near Panch Shiv Mandir,
              Kankarbagh Colony, Patna, Bihar 800020
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <FaPhoneAlt className="text-amber-500 text-base mr-4" />
          <div>
            <p>
              Call: <span className="font-semibold">+91-111-222-3333</span>
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <IoMailSharp className="text-amber-500 text-lg mr-4" />
          <div>
            <p>
              Mail:{" "}
              <span className="font-semibold">ghostingtech@gmail.com</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-amber-500 text-lg font-semibold">FOLLOW US !!</h3>
        <div className="flex justify-center mt-4 space-x-4">
          <Link
            href="https://www.youtube.com/"
            className="text-red-600 text-2xl"
          >
            <FaYoutube />
          </Link>
          <Link
            href="https://www.facebook.com/"
            className="text-[#1877F2] text-2xl"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://www.instagram.com/"
            className="text-[#E4405F] text-2xl"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
