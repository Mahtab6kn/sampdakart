import React from "react";
import CartItemSkeleton from "./CartItemSkeleton";

const CartListSkeleton = () => {
  return (
    <section className="flex-grow overflow-scroll space-y-3 hide-scroll">
      {[...Array(3)].map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </section>
  );
};

export default CartListSkeleton;
