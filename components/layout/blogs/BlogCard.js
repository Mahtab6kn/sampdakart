"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Link from "next/link";

const BlogCard = ({
  blog,
  setOpenDeleteDialog,
  setDeleteBlog,
  setOpenEditDialog,
  setSelectedBlog,
  page,
}) => {
  const { data: session, status } = useSession();
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <>
      <Card className="w-full min-h-[510px] max-w-[26rem] shadow-lg border group pt-5">
        <div className="relative w-[350px] h-[250px] mx-auto flex items-center justify-center group ">
          <div className="w-[320px] h-[210px] bg-amber-100 -rotate-12 rounded-md transition-transform duration-300 ease-in-out group-hover:rotate-12"></div>
          <Image
            src={blog.image.url}
            alt="Blog Image"
            width={328}
            height={230}
            className="absolute top-2 left-2 z-10 object-cover object-top rounded-md group w-[328px] h-[225px]"
          />
        </div>
        <CardBody>
          <div className="flex justify-between mb-3 gap-3 md:gap-5">
            <div className="text-center w-fit px-3 py-1 bg-amber-500 rounded-md text-sm text-white">
              {blog.type}
            </div>
            <div className="text-gray-400 flex items-center">
              <span
                className={`${
                  session?.user?.role === "admin" && page != "user"
                    ? "group-hover:hidden"
                    : ""
                }`}
              >
                {formatDate(blog.createdAt)}
              </span>
              {session?.user?.role === "admin" && page != "user" && (
                <span className="hidden group-hover:flex gap-2">
                  <FaRegEdit
                    size={23}
                    color="gray"
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenEditDialog(true);
                      setSelectedBlog(blog);
                    }}
                  />
                  <MdOutlineDelete
                    size={25}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      setOpenDeleteDialog(true);
                      setDeleteBlog(blog);
                    }}
                  />
                </span>
              )}
            </div>
          </div>
          <h1 className="font-bold mb-2">
            {blog.title?.length > 40
              ? blog.title.substring(0, 40) + "..."
              : blog.title}
          </h1>
          <Typography color="gray">
            {blog.description?.length > 100
              ? blog.description.substring(0, 100) + "..."
              : blog.description}
          </Typography>
        </CardBody>
        <CardFooter className="mx-auto sm:mx-0 pt-0">
          <Link href={`/blogs/${blog._id}`}>
            <Button
              size="lg"
              color="amber"
              className="py-2 px-3 text-xs flex gap-[6px]"
            >
              Read More
              <IoMdArrowForward size={15} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default BlogCard;
