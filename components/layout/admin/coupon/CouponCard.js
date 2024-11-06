"use client";
import DeleteCoupon from "@/components/modals/admin/coupon/DeleteCoupon";
import React, { useState } from "react";
import { IoMdCopy } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const CouponCard = ({ coupon, setCouponCode }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      toast.success(`Copied to clipboard ${coupon.code}`);
    });
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 text-white rounded-lg px-8 py-4 flex items-center justify-between max-w-sm relative overflow-hidden group w-full">
      <div className="w-9 h-9 bg-white rounded-full absolute top-1/3 -right-5"></div>
      <div className="w-9 h-9 bg-white rounded-full absolute top-1/3 -left-5"></div>

      <RxCross2
        className="absolute top-2.5 right-3 cursor-pointer hover:scale-125 hidden group-hover:block"
        color="white"
        size={20}
        onClick={() => {
          setOpenDeleteDialog(true);
        }}
      />

      <div className="w-full">
        <p className="text-lg lg:text-xl  font-bold w-full">
          {coupon.discount}% OFF
        </p>

        <div className="text-xs">
          <span className="text-gray-100">MAX: </span>

          <span className="text-red-400 font-medium">
            <span>&#8377;</span> {coupon.maxAmt}.00
          </span>
        </div>

        <div className="flex gap-1 mt-2">
          <p className="">{coupon.code}</p>
          <span className="mt-1 cursor-pointer hover:scale-110" onClick={copy}>
            <IoMdCopy />
          </span>
        </div>
      </div>

      <div className="text-right pt-8 pr-2 w-full">
        <div className="text-xl">
          <p className="text-sm w-full">Min Purchase</p>

          <p className="text-green-400 font-bold">
            <span>&#8377;</span>
            {coupon.minAmt}.00
          </p>
        </div>
      </div>

      <DeleteCoupon
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        coupon={coupon}
        setCouponCode={setCouponCode}
      />
    </div>
  );
};

export default CouponCard;
