import Link from "next/link";
import ShimmerImage from "@/components/ui/ShimmerImage";

const CategoryItem = ({ category }) => {
  return (
    <Link
      href={`/category/${category.name.replaceAll(" ", "-")}`}
      className="group flex flex-col items-center p-4 hover:bg-white rounded-xl transition-colors hover:shadow-inner hover:border-gray-100"
    >
      <div className="relative w-full aspect-square rounded-full overflow-hidden border border-gray-500 transition-transform duration-300 group-hover:scale-105">
        <ShimmerImage src={category.image.url} alt={category.name} />
      </div>

      <p className="text-lg mt-2 sm:mt-4 capitalize">{category.name}</p>
    </Link>
  );
};

export default CategoryItem;
