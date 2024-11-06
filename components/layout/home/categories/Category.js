import CategoriesList from "../../categories/CategoriesList";

import categoryData from "@/utils/categoryData";

function Category() {
  return (
    <div className="relative p-4 sm:p-8 bg-gray-50">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-[#0052D4] font-aclonica leading-tight mb-4 sm:mb-8">
        Categories you may like
      </h2>

      <CategoriesList categoryData={categoryData} />
    </div>
  );
}

export default Category;
