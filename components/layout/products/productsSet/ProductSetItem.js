"use client";

import { Card, CardBody } from "@material-tailwind/react";

import Link from "next/link";
import { useState } from "react";

import ProductTitle from "./../product/ProductTitle";
import ProductFooter from "./../product/ProductFooter";
import ProductHeader from "./../product/ProductHeader";
import ProductCategory from "./../product/ProductCategory";
import ProductExtraDetails from "./../product/ProductExtraDetails";

const ProductSetItem = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link href={`/`}>
      <Card
        className="w-full mx-auto shadow-lg max-w-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ProductHeader
          isHovered={isHovered}
          isSet={true}
          srcs={["", "", "", ""]}
        />

        <CardBody className="p-0 mx-4 relative">
          <ProductCategory />

          <ProductTitle />

          <ProductExtraDetails isHovered={isHovered} isSet={true} />
        </CardBody>

        <ProductFooter />
      </Card>
    </Link>
  );
};

export default ProductSetItem;
