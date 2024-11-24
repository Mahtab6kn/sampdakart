"use client";

import { IoMdOpen } from "react-icons/io";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useState, useCallback, memo, useEffect } from "react";

import ProductTitle from "./product/ProductTitle";
import ProductFooter from "./product/ProductFooter";
import ProductHeader from "./product/ProductHeader";
import ProductCategory from "./product/ProductCategory";
import ProductColorSize from "./product/ProductColorSize";
import ProductExtraDetails from "./product/ProductExtraDetails";
import { useRouter } from "next/navigation";

const ProductItem = memo(
  ({
    product: {
      _id,
      title,
      images,
      category,
      discount,
      price,
      sizes,
      subCategory,
    },
    isWishlist,
    currency,
    locale,
    exchangeRate,
  }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const [isAddToCart, setIsAddToCart] = useState(false);

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const cart = useSelector((state) => state.cart);

    const isInCart = cart.items?.find((item) => item._id === _id);

    const handleCardClick = () => {
      router.push(`/products/${_id || "/products"}`);
    };

    useEffect(() => {
      if (isInCart) {
        setSelectedSize(isInCart.size);
        setSelectedColor(`${isInCart.color?.name}~${isInCart.color?.hex}`);
      }

      if (sizes.length > 0 && !selectedSize) {
        setSelectedSize(sizes[0].size);
      }
    }, [isInCart, sizes]);

    return (
      <Card
        className="w-full max-w-sm mx-auto shadow-md hover:shadow-lg cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {images[0] && (
          <ProductHeader
            isWishlist={isWishlist}
            title={title}
            id={_id}
            srcs={images[0]}
            isHovered={isHovered}
          />
        )}

        {/* {isAddToCart || isInCart ? (
          <>
            <CardBody className="p-0 mx-4 relative">
              {sizes && (
                <ProductColorSize
                  sizes={sizes}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  setSelectedSize={setSelectedSize}
                  setSelectedColor={setSelectedColor}
                  isInCart={isInCart}
                />
              )}

              <ProductFooter
                productId={_id}
                price={price}
                discount={discount}
                setIsAddToCart={setIsAddToCart}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
            </CardBody>
          </>
        ) : (
          <> */}
        <CardBody className="p-0 mx-4 relative">
          {category && (
            <ProductCategory
              subCategory={subCategory}
              category={category}
              discount={discount}
            />
          )}

          {title && price && (
            <ProductTitle
              title={title}
              price={price}
              discount={discount}
              currency={currency}
              locale={locale}
              exchangeRate={exchangeRate}
            />
          )}

          {/* {sizes && (
              <ProductExtraDetails sizes={sizes} isHovered={isHovered} />
            )} */}
        </CardBody>

        {/* <CardFooter className="pt-0 flex gap-3">
            <Link
              href={`/products/${_id || "/products"}`}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10 w-full py-2 gap-2 font-bold rounded-md transition-all duration-300 ease-in-out px-6"
            >
              <IoMdOpen className="w-4 h-4" />
              View
            </Link> */}

        {/* <Button
            fullWidth
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
            onClick={() => setIsAddToCart(true)}
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            Add to Cart
          </Button> */}
        {/* </CardFooter> */}
        {/* </>
        )} */}
      </Card>
    );
  }
);

ProductItem.displayName = "ProductItem";

export default ProductItem;
