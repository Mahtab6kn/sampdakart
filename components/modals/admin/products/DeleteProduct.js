"use client";

import { RxCross1 } from "react-icons/rx";
import { MdDeleteSweep, MdOutlineError } from "react-icons/md";
import { Button, Dialog, IconButton } from "@material-tailwind/react";

import { toast } from "sonner";
import Image from "next/image";

import Heading from "@/components/ui/heading/Heading";

const DeleteProduct = ({ open, setOpen, product, setProducts }) => {
  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/product/${product._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }

      toast.success("Product deleted successfully");

      setProducts((prev) => {
        return prev.filter((prod) => prod._id !== product._id);
      });

      setOpen(false);
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return (
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
            <MdDeleteSweep size={20} color="white" />
          </div>
        }
        title={"Delete Product"}
        buttons={[
          <IconButton key={1} variant="text" onClick={handleOpen}>
            <RxCross1 size={20} />
          </IconButton>,
        ]}
      />
      {product?.title && (
        <div className="w-full h-full flex border p-4  bg-white rounded-xl">
          {product?.images && (
            <Image
              src={product.images[0].url}
              alt="Image"
              width={150}
              style={{
                filter: `${
                  product.visibility ? "grayscale(0)" : "grayscale(100%)"
                }`,
              }}
              height={150}
              className="w-40 aspect-square object-top rounded-full object-cover"
            />
          )}

          <div className="p-4 w-full flex flex-col gap-1">
            <div
              style={{
                background: `${product.subCategory?.colour}`,
              }}
              className="w-fit font-medium text-black py-0.5 rounded-md px-2 text-sm truncate "
            >
              {product.category} / {product.subCategory?.name}
            </div>

            <h2 className="text-x lg:text-3xl font-bold text-pink-500">
              {product.title}
            </h2>

            <div className="flex gap-1 items-center">
              <div className="text-pink-500 font-semibold">
                ₹
                {(
                  product.price -
                  (product.discount / 100) * product.price
                ).toFixed(2)}
              </div>

              <div className="text-xs line-through">₹{product.price}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 bg-red-50 text-red-700 px-4 py-1 rounded-md">
        <MdOutlineError />
        <div>Are you sure you want to delete this Product?</div>
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
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteProduct;
