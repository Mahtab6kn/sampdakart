"use client";
import Heading from "@/components/ui/heading/Heading";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdCall, IoMdHelpCircleOutline } from "react-icons/io";

const Help = () => {
  return (
    <div className="rounded-lg flex flex-col gap-4 border-2 border-gray-500 w-full p-4">
      <Heading
        icon={
          <div className="inline-block pr-1">
            <IoMdHelpCircleOutline size={25} color="red" />
          </div>
        }
        title={"HELP"}
      />
      <div className="flex flex-col gap-3">
        <p>
          Read the{" "}
          <Link href="#" className="text-blue-500 underline">
            Cancelation Policy
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-blue-500  underline">
            Refund Policy
          </Link>{" "}
          before the canceling the order
        </p>
        <Button
          variant="outlined"
          className="text-red-500 border-red-500  w-fit py-2 px-3"
        >
          Cancel Order
        </Button>
      </div>
      <div className="h-[1px] bg-gray-300"></div>
      <div className="flex flex-col gap-3">
        <p className="text-gray-500">
          Contact us for any enquiry, we are available to serve you 24/7
        </p>
        <div className="flex gap-5">
          <Button
            variant="outlined"
            className="text-[#11998E] border-[#11998E] shadow-none w-fit flex gap-1 items-center py-2 px-3"
          >
            <IoMdCall size={18} />
            Call us
          </Button>
          <Button className="text-white bg-[#11998E] border-[#11998E] w-fit gap-1 flex relative items-center px-3 md:px-6 py-2">
            <FaWhatsapp className=" text-sm md:text-base" />
            Chat on whatsapp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Help;
