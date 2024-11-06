import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const CategoryCard = ({
  category,
  setOpenDeleteDialog,
  setSelectedCategory,
  setOpenEditDialog,
  setDeleteCategory
}) => {
  
  return (
    <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden border bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <Image
        src={category.image?.url}
        alt="category image"
        width={150}
        height={150}
        className="w-full lg:max-w-44 h-64 lg:h-44 object-cover"
      />
      <div className="p-4 w-full flex flex-col">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-x lg:text-3xl font-bold text-pink-500">
            {category.name}
          </h2>
          <div className="flex space-x-2">
            <button
              className="text-gray-500 hover:text-gray-800"
              title="Edit category"
              onClick={() => {
                setOpenEditDialog(true);
                setSelectedCategory(category);
              }}
            >
              <FiEdit size={20} />
            </button>
            <button
              className="text-red-300 hover:text-red-500"
              title="Delete category"
              onClick={() => {
                setOpenDeleteDialog(true)
                setDeleteCategory(category)
              }}
            >
              <MdDeleteOutline size={25} />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-start items-start gap-2 mt-4 overflow-y-auto">
          {category?.subCategories.map((tag, index) => (
            <span
              key={index}
              style={{ background: `${tag.colour}` }}
              className="px-3 py-2 h-fit text-xs font-semibold rounded-md leading-none mb-0 flex gap-1 items-center"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;