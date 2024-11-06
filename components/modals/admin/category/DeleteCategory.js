"use client";
import Heading from "@/components/ui/heading/Heading";
import { storage } from "@/firebase";
import { Dialog, Button, IconButton } from "@material-tailwind/react";
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import { FaTshirt } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

const DeleteCategory = ({ open, setOpen, deleteCategory, setCategories }) => {
  const handleOpen = () => setOpen(!open);


  const handleDeleteCategory = async () => {
    try {
      if (deleteCategory.image?.ref) {
        try {
          await deleteObject(ref(storage, deleteCategory.image.ref));
        } catch (error) {
          console.warn("Failed to delete image:", error);
        }
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/${deleteCategory._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success(`Category ${deleteCategory.name} deleted successfully!`);
        setCategories((prev) =>
          prev.filter((c) => c._id !== deleteCategory._id)
        );
        handleOpen();
      } else {
        const errorData = await res.json();
        toast.error(`Failed to delete category: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1 },
          unmount: { scale: 0 },
        }}
        className="p-6 flex flex-col gap-4"
      >
        <Heading
          icon={
            <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
              <FaTshirt size={20} color="white" />
            </div>
          }
          title={"Category details"}
          buttons={[
            <IconButton key={1} variant="text" onClick={handleOpen}>
              <RxCross1 size={20} />
            </IconButton>,
          ]}
        />
        <div className="w-full h-full flex border p-4  bg-white rounded-xl">
          <Image
            src={deleteCategory.image?.url}
            alt="Image"
            width={150}
            height={150}
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="p-4 w-full flex flex-col">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-x lg:text-3xl font-bold text-pink-500">
                {deleteCategory.name}
              </h2>
            </div>
            <div className="w-full text-black flex flex-wrap justify-start items-start gap-2 mt-4 overflow-y-auto">
              {deleteCategory?.subCategories?.map((tag, index) => (
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
        <div className="flex items-center gap-1 bg-red-50 text-red-700 px-4 py-1 rounded-md">
          <MdOutlineError />
          <div>Are you sure you want to delete this category?</div>
        </div>
        <div className="flex justify-end items-center gap-4">
          <Button
            variant="outlined"
            size="sm"
            className="rounded"
            color="red"
            onClick={handleOpen}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            size="sm"
            className="rounded"
            color="red"
            type="submit"
            onClick={handleDeleteCategory}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteCategory;
