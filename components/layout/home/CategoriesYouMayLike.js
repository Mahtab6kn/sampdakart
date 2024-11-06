import Link from "next/link";
import { Suspense } from "react";

import CategoriesList from "../categories/CategoriesList";

import SectionHeading from "@/components/ui/SectionHeading";
import CategoryListSkeleton from "@/components/ui/skeletons/category/CategoryListSkeleton";

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch categories",
        status: res.status,
        data: [],
      };
    }

    const data = await res.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the categories",
      data: [],
    };
  }
}

const CategoriesYouMayLike = async () => {
  const data = await getCategories();
  if (data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="relative p-4 sm:p-8 bg-gray-50 space-y-12 text-center mb-10">
        <SectionHeading
          label="Categories You May Like"
          className="text-blue-500"
        />

        <Suspense fallback={<CategoryListSkeleton />}>
          <CategoriesList categoryData={data.data} />
        </Suspense>

        <div className="mt-12 pb-6">
          <Link
            href="/category"
            className="rounded-full border border-blue-500 capitalize px-8 py-3 hover:shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out mx-auto"
          >
            View All
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoriesYouMayLike;
