"use client";

import { ProductCard } from "@/components/layout/admin/products/ProductCard";
import DeleteProduct from "@/components/modals/admin/products/DeleteProduct";
import PaginationBtn from "@/components/ui/PaginationBtn";
import { Button, Option, Select } from "@material-tailwind/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaTshirt } from "react-icons/fa";
import { toast } from "sonner";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [showSubCategory, setShowSubCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const currentPage = searchParams.get("page") || 1;

  const fetchProducts = async (page) => {
    try {
      const res = await fetch(
        `/api/product?size=8&page=${page}&category=${
          category || "all"
        }&subCategory=${selectedSubCategory || "all"}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data);
      setMeta(data.meta);
    } catch (err) {
      toast.error("Error fetching products!");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching categories!");
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, category, selectedSubCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFilterByCategory = (val) => {
    setShowSubCategory([]);
    setSelectedSubCategory("");
    setCategory(val);
    const selectedCategory = categories.find((cat) => cat.name === val);
    if (selectedCategory) setShowSubCategory(selectedCategory.subCategories);
  };

  const handleFilterBySubCategory = (val) => {
    setSelectedSubCategory(val);
  };
  return (
    <>
      <DeleteProduct
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        product={selectedProduct}
        setProducts={setProducts}
      />
      <div className="px-2 md:px-10 my-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
                  <FaTshirt size={20} color="white" />
                </div>
                <h2 className="text-sm lg:text-lg">Manage Products</h2>
              </div>
              <Link key="create-product" href="/admin/products/create-product">
                <Button className="rounded" variant="gradient" color="pink">
                  Create Product
                </Button>
              </Link>
            </div>
            <div className="w-full lg:w-[32rem] flex gap-4 items-center">
              <Select
                label="Categories"
                color="pink"
                onChange={(value) => handleFilterByCategory(value)}
                className="w-full"
              >
                {categories.map((category) => (
                  <Option key={category._id} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              {showSubCategory.length > 0 && (
                <Select
                  label="Sub Categories"
                  color="pink"
                  value={selectedSubCategory}
                  className="w-full"
                  onChange={(value) => handleFilterBySubCategory(value)}
                >
                  {showSubCategory.map((subCategory) => (
                    <Option key={subCategory._id} value={subCategory.name}>
                      {subCategory.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>
          <div className="rounded-full w-full bg-gradient-to-r from-red-400 to-pink-400 h-1"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              setOpenDeleteDialog={setOpenDeleteDialog}
              setSelectedProduct={setSelectedProduct}
            />
          ))}
        </div>
        <div className="mt-4">
          <PaginationBtn totalPages={meta.totalPages} />
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductPage />
    </Suspense>
  );
};

export default Page;
