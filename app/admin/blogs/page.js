"use client";

import { FaMicroblog } from "react-icons/fa";
import { RiApps2AddFill } from "react-icons/ri";

import { useEffect, useState } from "react";

import Heading from "@/components/ui/heading/Heading";
import DefaultBtn from "@/components/ui/buttons/DefaultBtn";

import BlogCard from "@/components/layout/blogs/BlogCard";
import EditBlog from "@/components/modals/admin/blogs/EditBlog";
import CreateBlog from "@/components/modals/admin/blogs/CreateBlog";
import DeleteBlog from "@/components/modals/admin/blogs/DeleteBlog";
import PaginationBtn from "@/components/ui/PaginationBtn";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState({});
  const [selectedBlog, setSelectedBlog] = useState({
    type: "",
    title: "",
    content: "",
    image: "",
  });
  const searchParams = useSearchParams();

  const [meta, setMeta] = useState({});
  const currentPage = searchParams.get("page");

  const btns = [
    <DefaultBtn
      key={1}
      icon={<RiApps2AddFill />}
      title={"Create blog"}
      clickHandler={() => {
        setOpenCreateDialog(true);
      }}
    />,
  ];

  const fetchBlogs = async (page) => {
    try {
      const response = await fetch(`/api/blog?page=${page}size=15`);
      const data = await response.json();
      setBlogs(data.data);
      setMeta(data.pagination);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

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
        <CreateBlog
          open={openCreateDialog}
          setOpen={setOpenCreateDialog}
          setBlogs={setBlogs}
        />
        <DeleteBlog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          deleteBlog={deleteBlog}
          setBlogs={setBlogs}
        />

        <EditBlog
          setBlogs={setBlogs}
          blog={selectedBlog}
          open={openEditDialog}
          setOpen={setOpenEditDialog}
        />

        <div className="my-4">
          <div className="px-2 mb-4">
            <Heading
              icon={
                <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
                  <FaMicroblog size={20} color="white" />
                </div>
              }
              title={"Manage Blogs"}
              buttons={btns}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 place-items-center md:place-items-start px-2 sm:px-5 ">
            {blogs?.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                page="admin"
                setOpenDeleteDialog={setOpenDeleteDialog}
                setDeleteBlog={setDeleteBlog}
                setOpenEditDialog={setOpenEditDialog}
                setSelectedBlog={setSelectedBlog}
              />
            ))}
          </div>
          <div className="mt-3">
            <PaginationBtn totalPages={meta.totalPages} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
