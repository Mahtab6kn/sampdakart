"use client";

import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import { addToWishlist, removeFromWishlist } from "@/redux/slice/wishlistSlice";

const WishlistBtn = ({ productId }) => {
  const dispatch = useDispatch();

  const [isAnimating, setIsAnimating] = useState(false);

  const wishlist = useSelector((state) => state.wishlist.items);

  const isInWishlist = wishlist ? wishlist.includes(productId) : false;

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      setIsAnimating(true);

      const action = isInWishlist ? "remove" : "add";

      setTimeout(async () => {
        setIsAnimating(false);
      }, 300);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/wishlist`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, action }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (action === "add") {
          dispatch(addToWishlist(productId));
        } else {
          dispatch(removeFromWishlist(productId));
        }

        toast.success(
          `Product ${action === "add" ? "added to" : "removed from"} wishlist.`
        );
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || error.data || error || "Something went wrong"
      );
    }
  };

  return (
    <button
      className={`flex items-center justify-center mt-2 w-8 h-8 bg-transparent p-0 z-40 absolute right-5 ${
        isAnimating ? "wishlist-animation-in" : ""
      } ${isInWishlist ? "text-red-500" : "text-gray-500"}`}
      onClick={handleWishlistToggle}
    >
      <HeartIcon
        className={`w-8 h-8 ${isInWishlist ? "fill-red-500" : "fill-gray-300"}`}
      />
    </button>
  );
};

export default WishlistBtn;
