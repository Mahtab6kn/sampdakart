import React from "react";
import CategorySkeleton from "./CategorySkeleton";

const CategoryListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center items-center">
      {[...Array(5)].map((_, index) => (
        <CategorySkeleton key={index} />
      ))}
    </div>
  );
};

export default CategoryListSkeleton;
