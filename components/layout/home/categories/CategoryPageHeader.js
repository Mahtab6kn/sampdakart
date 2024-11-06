"use client";

import { FaHome } from "react-icons/fa";
import { Breadcrumbs } from "@material-tailwind/react";

import Link from "next/link";
import Image from "next/image";

const CategoryPageHeader = ({ category, cat }) => {
  const categoryName = category.name ? category.name.replaceAll("-", " ") : "";

  const categorySub = category.sub ? category.sub.replaceAll("-", " ") : "";
  const banner = (categoryName) => {
    switch (categoryName.slice(0, 3).toLowerCase()) {
      case "leh":
        return "/home/categoryBanners/lehenga.jpg";
      case "sar":
        return "/home/categoryBanners/saree.jpg";
      case "gow":
        return "/home/categoryBanners/gown.jpg";
      case "pla":
        return "/home/categoryBanners/plazo.jpg";
      case "sui":
        return "/home/categoryBanners/suit.jpg";
      case "kur":
        return "/home/categoryBanners/Kurti.jpg";
      default:
        return "/home/categoryBanners/default.jpg";
    }
  };

  return (
    <div className="pt-4 px-6">
      <div className="w-full h-[111px]  sm:h-[400px] relative mb-5">
        <Image
          fill
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={banner(categoryName)}
          alt={categoryName}
          className=" w-full  object-fill"
        />
      </div>
      <div className="lg:flex md:flex block justify-between items-center">
        <div>
          <p className="lg:text-4xl md:text-3xl text-2xl font-bold text-blue-500 uppercase">
            Top booked {cat ? categoryName : categorySub}
          </p>

          {cat ? (
            <Breadcrumbs className="px-3 py-1 mt-2 mb-4">
              <Link href={"/"} className="opacity-60 hover:text-blue-400">
                <FaHome />
              </Link>

              <p className="capitalize">{categoryName}</p>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs className="px-3 py-1 mt-2 mb-4">
              <Link href={"/"} className="opacity-60">
                <FaHome />
              </Link>

              <Link href={`/category/${category.name}`} className="opacity-60">
                <p className="capitalize">{categoryName}</p>
              </Link>

              <p className="capitalize">{categorySub}</p>
            </Breadcrumbs>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPageHeader;
