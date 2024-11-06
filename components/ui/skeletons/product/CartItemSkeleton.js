"use client";

import React from "react";

import { Button, Card } from "@material-tailwind/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const CartItemSkeleton = () => {
  return (
    <Card className="animate-pulse border border-gray-300 rounded-xl p-2.5 flex flex-row gap-3 bg-white shadow-sm">
      <div className="w-4/12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="text-gray-500 bg-gray-100 rounded-md p-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      <div className="flex flex-col justify-between py-1 w-full">
        <p className="w-28 h-3 bg-gray-200 rounded-full">&nbsp;</p>

        <div>
          <div className="flex gap-1 items-center">
            <p className="w-10 h-3 bg-gray-200 rounded-full">&nbsp;</p>

            <p className="w-10 h-3 bg-gray-200 rounded-full">&nbsp;</p>
          </div>
          <p className="text-gray-700 text-sm">&nbsp;</p>
        </div>

        <div className="flex justify-between items-end mr-3 w-full">
          <div className="flex gap-2 items-center">
            <Button color="gray" size="sm" className="p-1.5 text-sm rounded">
              <MinusIcon className="w-3 h-3" />
            </Button>
            <p className="w-3 h-3 bg-gray-200 rounded-full">&nbsp;</p>
            <Button color="gray" size="sm" className="p-1.5 text-sm rounded">
              <PlusIcon className="w-3 h-3" />
            </Button>
          </div>

          <Button
            color="white"
            size="sm"
            variant="text"
            className="shadow-none p-0 hover:shadow-none hover:underline text-red-400"
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItemSkeleton;
