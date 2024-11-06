import { useSession, signOut } from "next-auth/react";

import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { CiLogin } from "react-icons/ci";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ProfileMenuItem from "./ProfileMenuItem";

const NavProfile = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      click: () => router.push("/profile"),
    },
    {
      label: "My Orders",
      icon: ShoppingBagIcon,
      click: () => router.push("/my-orders?page=1&size=12"),
    },
    {
      label: "My Wishlist",
      icon: HeartIcon,
      click: () => router.push("/wishlist?page=1&size=12"),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      click: () => signOut(),
    },
  ];

  const adminMenuItems = [
    {
      label: "Admin",
      icon: Cog6ToothIcon,
      click: () => router.push("/admin/dashboard"),
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      click: () => signOut(),
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  if (status === "loading") {
    return (
      <div className="animate-pulse">
        <Avatar
          as="div"
          variant="circular"
          size="md"
          alt="Profile"
          color="blue-gray"
          className=" p-0.5 cursor-progress"
          src={"/profile.svg"}
        />
      </div>
    );
  } else if (status === "authenticated") {
    if (session.user.role === "admin") {
      const profileIndex = profileMenuItems.findIndex(
        (item) => item.label === "My Profile"
      );

      if (profileIndex !== -1) {
        profileMenuItems[profileIndex] = {
          label: "Admin",
          icon: Cog6ToothIcon,
          click: () => router.push("/admin/dashboard"),
        };
      } else {
        profileMenuItems.unshift({
          label: "Admin",
          icon: Cog6ToothIcon,
          click: () => router.push("/admin/dashboard"),
        });
      }
    }

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center rounded-full p-0"
          >
            <Avatar
              variant="circular"
              size="md"
              alt="profile"
              color="blue-gray"
              className=" p-0.5"
              src={session.user.image.url || "/profile.svg"}
            />
          </Button>
        </MenuHandler>

        <MenuList className="p-1">
          {session.user.role === "admin"
            ? adminMenuItems.map((item, index) => (
                <ProfileMenuItem
                  key={item.label}
                  label={item.label}
                  closeMenu={closeMenu}
                  click={item.click}
                  isLastItem={index === adminMenuItems.length - 1}
                  icon={item.icon}
                />
              ))
            : profileMenuItems.map((item, index) => (
                <ProfileMenuItem
                  key={item.label}
                  label={item.label}
                  closeMenu={closeMenu}
                  click={item.click}
                  isLastItem={index === profileMenuItems.length - 1}
                  icon={item.icon}
                />
              ))}
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <Link
        href={"/login"}
        className="px-4 py-2 text-sm flex items-center gap-1 bg-gradient-to-r from-deep-orange-500 via-red-500 to-pink-500 text-white rounded-3xl hover:scale-105 transition-all active:scale-95"
      >
        Login
        <CiLogin className="w-4 h-4" />
      </Link>
    );
  }
};

export default NavProfile;
