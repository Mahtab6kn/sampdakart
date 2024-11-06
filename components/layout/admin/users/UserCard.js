"use client";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { Card, Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function UserCard({ user }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(
      new Date(user.createdAt).toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [user.createdAt]);
  return (
    <Card className="w-full p-4 border">
      <div className="mx-0 flex items-center gap-4 pt-0 pb-4">
        <Avatar
          size="lg"
          variant="circular"
          src={user.image.url}
          alt="tania andrew"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <div className="capitalize text-lg font-semibold">{user.name}</div>
            {/* <button
              className="text-red-300 hover:text-red-500"
              title="Delete category"
            >
              <MdDeleteOutline size={25} />
            </button> */}
          </div>
          <div className="text-xs">{formattedDate}</div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-pink-500">
            <EnvelopeIcon className="w-4 h-4" />
            <span className="truncate"> {user.email}</span>
          </div>
          <div className="flex items-center gap-1 text-teal-500">
            <PhoneIcon className="w-4 h-4" /> {user.phoneNumber}
          </div>
        </div>
      </div>
    </Card>
  );
}
