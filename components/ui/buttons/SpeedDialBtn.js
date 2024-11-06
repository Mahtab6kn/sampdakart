import React from "react";

import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  SlSocialFacebook,
  SlSocialInstagram,
  SlSocialYoutube,
} from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import { PlusIcon } from "@heroicons/react/24/outline";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdMailOutline, MdOutlineLocalPhone } from "react-icons/md";

const SpeedDialBtn = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton
            size="lg"
            color="black"
            className=" rounded-full hover:transition-transform hover:scale-105"
          >
            <IoShareSocialOutline
              color="white"
              className="h-5 w-5 -rotate-45 transition-transform group-hover:rotate-6 "
            />
          </IconButton>
        </SpeedDialHandler>

        <SpeedDialContent className="rounded-full ">
          <SpeedDialAction className=" border border-blue-gray-200 shadow-xl">
            <FaXTwitter className="h-5 w-5" />
          </SpeedDialAction>

          <SpeedDialAction className="border border-blue-gray-200 shadow-xl">
            <SlSocialYoutube className="h-5 w-5" />
          </SpeedDialAction>

          <SpeedDialAction className="border border-blue-gray-200 shadow-xl">
            <SlSocialInstagram className="h-5 w-5" />
          </SpeedDialAction>

          <SpeedDialAction className="border border-blue-gray-200 shadow-xl">
            <SlSocialFacebook className="h-5 w-5" />
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>

      <SpeedDial>
        <SpeedDialHandler>
          <IconButton
            size="lg"
            color="black"
            className="rounded-full hover:transition-transform hover:scale-105 "
          >
            <PlusIcon
              color="white"
              className="h-5 w-5 transition-transform group-hover:rotate-45"
            />
          </IconButton>
        </SpeedDialHandler>

        <SpeedDialContent className="rounded-full">
          <SpeedDialAction className="border border-blue-gray-200 shadow-xl">
            <MdOutlineLocalPhone className="h-5 w-5" />
          </SpeedDialAction>

          <SpeedDialAction className="border border-blue-gray-200 shadow-xl">
            <MdMailOutline className="h-5 w-5" />
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
};

export default SpeedDialBtn;
