import { FaUser } from "react-icons/fa";

import React from "react";

import Heading from "@/components/ui/heading/Heading";

import ProfileCard from "@/components/layout/profile/ProfileSection";
import ProfileWishlist from "@/components/layout/profile/ProfileWishlist";

const page = () => {
  return (
    <main className="flex flex-col">
      <div className="flex-grow m-5 flex flex-col gap-5">
        <Heading
          icon={
            <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
              <FaUser size={20} color="white" />
            </div>
          }
          title="Profile"
        />

        <div className="space-y-16">
          <ProfileCard />
          <ProfileWishlist />
        </div>
      </div>
    </main>
  );
};

export default page;
