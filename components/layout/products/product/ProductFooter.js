"use client";

import { TiArrowBack } from "react-icons/ti";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Button, CardFooter } from "@material-tailwind/react";

import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart, updateCart } from "@/redux/slice/cartSlice";

import CartQuantityButton from "@/components/drawer/CartQuantityButton";

const ProductFooter = ({
  productId,
  price,
  discount,
  setIsAddToCart,
  selectedSize,
  selectedColor,
}) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const isInCart = cart.items?.find((item) => item._id === productId);

  const colourHex = selectedColor.split("~");

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isInCart && selectedSize !== isInCart?.size) {
      toast.warning(
        "Please remove the product from the cart to update size and color."
      );
    }

    if (!selectedSize) {
      toast.warning("Please select a size.");
      return;
    }

    if (!selectedColor) {
      toast.warning("Please select a color.");
      return;
    }

    const product = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          color: {
            name: colourHex[0],
            hex: colourHex[1],
          },
          size: selectedSize,
        }),
      }
    );

    const data = await product.json();

    if (product.ok) {
      dispatch(addItemToCart(data));

      dispatch(
        updateCart({
          totalQuantity: cart.totalQuantity + 1,
          totalPrice:
            Number(cart.totalPrice) +
            Number((price - (discount / 100) * price).toFixed(2)),
        })
      );

      toast.success("Product added to cart.");
    } else {
      toast.error(data);
    }
  };

  return (
    <CardFooter className="pt-0 px-0 mt-auto min-h-16 space-y-3">
      {isInCart ? (
        <CartQuantityButton
          data={{
            _id: productId,
            quantity: isInCart.quantity,
            color: {
              name: isInCart.color?.name || "",
              hex: isInCart.color?.hex || "",
            },
            size: isInCart.size || "",
          }}
          width={20}
          height={20}
          isInCart={isInCart}
        />
      ) : (
        <div className="flex gap-3 mt-auto">
          <Button
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={(e) => setIsAddToCart(false)}
          >
            <TiArrowBack className="w-4 h-4" />
          </Button>

          <Button
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </div>
      )}
    </CardFooter>
  );
};

export default ProductFooter;
