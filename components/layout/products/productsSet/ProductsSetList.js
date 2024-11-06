const ProductSetList = ({ children }) => {
  return (
    <div className="grid gap-4 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 py-20 px-4">
      {children}
    </div>
  );
};

export default ProductSetList;
