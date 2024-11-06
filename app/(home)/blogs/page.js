import React, { Suspense } from "react";
import BlogCard from "@/components/layout/blogs/BlogCard";
import PaginationBtn from "@/components/ui/PaginationBtn";

async function getBlogs(page = 1, limit = 9) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog?page=${page}&limit=${limit}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}
const page = async ({ searchParams: { page, size } }) => {
  const blogs = await getBlogs(page, size);

  return (
    <main className="relative p-4 sm:p-8 bg-gray-50">
      <h2 className="text-2xl lg:text-4xl font-bold text-center text-pink-500 font-aclonica leading-tight mb-4 sm:mb-8">
        All Blogs
      </h2>

      {blogs.data ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 place-items-center md:place-items-start px-2 sm:px-5 ">
          {blogs.data.map((blog) => (
            <BlogCard key={blog._id} blog={blog} page="user" />
          ))}
        </div>
      ) : (
        <div className="text-center">Blogs Not Found</div>
      )}
      <div className="mt-3">
        <PaginationBtn totalPages={blogs.pagination.totalPages} />
      </div>
    </main>
  );
};

export default page;
