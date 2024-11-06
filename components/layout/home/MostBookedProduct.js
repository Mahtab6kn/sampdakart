import { Suspense } from "react";

import ProductCarousel from "../products/ProductCarousel";
import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";

async function getMostBookedProduct() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/most-booked`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch most booked product",
        status: res.status,
        data: [],
      };
    }

    const data = await res.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error fetching most booked product:", error);

    return {
      success: false,
      message: "An error occurred while fetching the most booked product",
      data: [],
    };
  }
}

const MostBookedProduct = async () => {
  const data = await getMostBookedProduct();
  if (data.length === 0) {
    return null;
  }
  return (
    <>
      <Suspense fallback={<ProductListSkeleton />}>
        {data.data && (
          <ProductCarousel products={data.data} label="Most Booked Products" />
        )}
      </Suspense>
    </>
  );
};

export default MostBookedProduct;
