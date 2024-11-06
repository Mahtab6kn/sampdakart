import React, { Suspense } from "react";

import PaginationBtn from "@/components/ui/PaginationBtn";
import SectionHeading from "@/components/ui/SectionHeading";

import ProductList from "@/components/layout/products/ProductList";

import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";

async function getProducts(page = 1, size = 12) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?page=${page}&size=${size}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch all Products",
        status: res.status,
        data: [],
        meta: { page, size, totalPages: 1, totalItems: 0 },
      };
    }

    const data = await res.json();

    return {
      success: true,
      message: "Products fetched successfully",
      data: data.data,
      meta: data.meta,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the products",
      data: [],
      meta: { page, size, totalPages: 1, totalItems: 0 },
    };
  }
}

const page = async ({ searchParams: { page, size } }) => {
  const data = await getProducts(page, size);

  return (
    <main className="my-10">
      <SectionHeading label="All Products" className="text-pink-400" />

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={data.data} />
      </Suspense>

      <PaginationBtn totalPages={data.meta.totalPages} />
    </main>
  );
};

export default page;
