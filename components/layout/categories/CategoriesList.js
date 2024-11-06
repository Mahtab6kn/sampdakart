import CategoryItem from "./CategoryItem";

const CategoriesList = ({ categoryData }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center">
      {categoryData.slice(0, 8).map((category) => (
        <CategoryItem key={category.name} category={category} />
      ))}
    </div>
  );
};

export default CategoriesList;
