import { Suspense } from "react";
import ProductCarousel from "../products/ProductCarousel";
import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";

async function getMusicalProduct(params) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/category/${params}`,
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
        message: "Failed to fetch musical product",
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
    console.error("Error fetching musical product:", error);

    return {
      success: false,
      message: "An error occurred while fetching the musical product",
      data: [],
    };
  }
}
const MusicalCollection = async () => {
  const data = await getMusicalProduct("musical");
  if (!data.success || !data.data || data.data.data.length === 0) {
    // Return null if data is unavailable or empty
    return null;
  }

  return (
    <>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductCarousel
          products={data.data.data}
          label="Musical Instrument Collection"
        />
      </Suspense>
    </>
  );
};

export default MusicalCollection;
