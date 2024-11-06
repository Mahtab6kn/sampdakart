import { Suspense } from "react";
import ProductCarousel from "../products/ProductCarousel";
import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";

async function getSareeProduct(params) {
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
        message: "Failed to fetch saree product",
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
    console.error("Error fetching saree product:", error);

    return {
      success: false,
      message: "An error occurred while fetching the saree product",
      data: [],
    };
  }
}
const SareeCollection = async () => {
  const data = await getSareeProduct("saree");
  if (data.length === 0) {
    return null;
  }
  return (
    <>
      <Suspense fallback={<ProductListSkeleton />}>
        {data.data && (
          <ProductCarousel products={data.data.data} label="Saree Collection" />
        )}
      </Suspense>
    </>
  );
};

export default SareeCollection;
