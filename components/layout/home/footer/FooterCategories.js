"use server";

import { Suspense } from "react";

import TooltipFooter from "@/components/ui/Tooltip";
import FooterCategoriesLoader from "./FooterCategoriesLoader";
import Link from "next/link";

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

const FooterCategories = async () => {
  const data = await getCategories();

  return (
    <>
      <Suspense fallback={<FooterCategoriesLoader />}>
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 px-6 gap-x-6 gap-y-8 text-gray-600 mb-10">
          {data.data.slice(0, 7).map((category, index) => (
            <div key={index} className="border p-3 rounded-md w-full">
              <Link
                href={`/category/${category.name.replaceAll(" ", "-")}`}
                className="font-semibold text-lg capitalize border-b pb-2 border-grey-500 truncate block"
              >
                {category.name}
              </Link>

              <div className="flex flex-col mt-2 space-y-1">
                {category.subCategories
                  .slice(0, 6)
                  .map((subcategory, subIndex) => (
                    <TooltipFooter key={subIndex} label={subcategory.name}>
                      <Link
                        href={`/category/${category.name.replaceAll(" ", "-")}/${subcategory.name.replaceAll(" ", "-")}`}
                        className="text-base capitalize text-gray-500 hover:text-orange-500 cursor-pointer truncate"
                      >
                        {subcategory.name}
                      </Link>
                    </TooltipFooter>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default FooterCategories;
