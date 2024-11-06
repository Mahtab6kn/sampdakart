"use client";

import { FaTshirt } from "react-icons/fa";
import { RiApps2AddFill } from "react-icons/ri";

import { useEffect, useState } from "react";

import Heading from "@/components/ui/heading/Heading";
import DefaultBtn from "@/components/ui/buttons/DefaultBtn";

import CategoryCard from "@/components/layout/admin/CategoryCard";
import EditCategory from "@/components/modals/admin/category/EditCategory";
import CreateCategory from "@/components/modals/admin/category/CreateCategory";
import DeleteCategory from "@/components/modals/admin/category/DeleteCategory";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    image: "",
    name: "",
    subCategories: [],
  });

  const btns = [
    <DefaultBtn
      key={1}
      icon={<RiApps2AddFill />}
      title={"Create category"}
      clickHandler={() => {
        setOpenCreateDialog(true);
      }}
    />,
  ];

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const [deleteCategory, setDeleteCategory] = useState({});

  return (
    <>
      <div
        className={`grid place-items-center min-h-screen absolute w-full bg-white transition-all duration-700 top-0 ${
          loading ? "opacity-100" : "opacity-0"
        } ${loading ? "z-50" : "-z-50"}`}
      >
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <main
        className={`${
          loading ? "hidden" : "block"
        } transition-all duration-700`}
      >
        <DeleteCategory
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          deleteCategory={deleteCategory}
          setCategories={setCategories}
        />

        <CreateCategory
          open={openCreateDialog}
          setOpen={setOpenCreateDialog}
          setCategories={setCategories}
        />

        <EditCategory
          setCategories={setCategories}
          category={selectedCategory}
          open={openEditDialog}
          setOpen={setOpenEditDialog}
        />

        <div className="my-4">
          <div className="px-8 mb-4">
            <Heading
              icon={
                <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
                  <FaTshirt size={20} color="white" />
                </div>
              }
              title={"Manage Categories"}
              buttons={btns}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 px-10 mx-auto gap-8 place-items-center">
            {categories?.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                setOpenDeleteDialog={setOpenDeleteDialog}
                setDeleteCategory={setDeleteCategory}
                setOpenEditDialog={setOpenEditDialog}
                setSelectedCategory={setSelectedCategory}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
