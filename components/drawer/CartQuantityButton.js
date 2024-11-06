import { Button } from "@material-tailwind/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { updateItemQuantity } from "@/redux/slice/cartSlice";

const CartQuantityButton = ({ data, width = 12, height = 12 }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(data.quantity);
  const [hasChanged, setHasChanged] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleItemQuantity = async () => {
    const product = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: data._id,
          quantity,
          color: {
            name: data.color?.name || null,
            hex: data.color?.hex || null,
          },
          size: data.size || null,
        }),
      }
    );

    console.log("product", product);
    console.log(quantity);
    console.log(data);

    const res = await product.json();

    if (product.ok) {
      dispatch(
        updateItemQuantity({
          itemId: data._id,
          quantity,
          color: {
            name: data?.color?.name || "",
            hex: data?.color?.hex || "",
          },
          size: data?.size || "",
        })
      );

      toast.info("Product quantity updated");
    } else {
      toast.error(res);
    }
  };

  useEffect(() => {
    setQuantity(data.quantity);
  }, [data]);

  useEffect(() => {
    if (!hasChanged) return;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      handleItemQuantity();
      setHasChanged(false);
    }, 800);

    setTimeoutId(newTimeoutId);

    return () => clearTimeout(newTimeoutId);
  }, [quantity]);

  return (
    <div className="flex gap-3 items-center justify-center">
      <Button
        color="gray"
        className="p-1.5 rounded disabled:cursor-not-allowed"
        onClick={(e) => {
          if (quantity <= 1) return;

          e.stopPropagation();
          e.preventDefault();

          setQuantity(quantity - 1);
          setHasChanged(true);
        }}
        disabled={quantity <= 1}
      >
        <MinusIcon
          className="mx-auto"
          style={{
            width: width,
            height: height,
          }}
        />
      </Button>

      {quantity}

      <Button
        color="gray"
        className="p-1.5 rounded"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          setQuantity(quantity + 1);
          setHasChanged(true);
        }}
      >
        <PlusIcon
          className="mx-auto"
          style={{
            width: width,
            height: height,
          }}
        />
      </Button>
    </div>
  );
};

export default CartQuantityButton;
