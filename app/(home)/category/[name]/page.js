import { Suspense } from "react";

import ProductList from "@/components/layout/products/ProductList";
import CategoryPageHeader from "@/components/layout/home/categories/CategoryPageHeader";

import PaginationBtn from "@/components/ui/PaginationBtn";
import ProductListSkeleton from "@/components/ui/skeletons/product/ProductListSkeleton";

async function getCategoryProducts(params, searchParams) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/category/${
      params.name.replaceAll("-", " ")
    }?page=${searchParams.page || 1}&size=12`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

const CategoryPage = async ({ params, searchParams }) => {
  const data = await getCategoryProducts(params, searchParams);

  return (
    <main>
      <CategoryPageHeader category={params} cat={true} />

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={data.data} />
      </Suspense>

      <div className="mb-6">
        <PaginationBtn totalPages={data?.meta?.totalPages} />
      </div>
    </main>
  );
};

export default CategoryPage;
