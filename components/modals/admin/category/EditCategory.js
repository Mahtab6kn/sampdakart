"use client";
import { HiOutlineUpload } from "react-icons/hi";
import Image from "next/image";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  Dialog,
  IconButton,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import Heading from "@/components/ui/heading/Heading";
import { FaTshirt } from "react-icons/fa";
import colours from "@/libs/colours";
import { toast } from "sonner";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase";

const EditCategory = ({ open, setOpen, category, setCategories }) => {
  const handleOpen = () => setOpen(!open);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
    subCategories: [],
  });
  const [newImage, setNewImage] = useState(null);
  const [subCategory, setSubCategory] = useState({
    name: "",
    colour: "",
  });

  useEffect(() => {
    if (category.name) {
      setFormData({
        name: category.name,
        image: category.image, //suppose image is an path like: "/upload/category/saree.png"
        subCategories: category.subCategories,
      });
    }
  }, [category]);

  const [pending, setPending] = useState(false);

  const handleUpdateCategory = async (e) => {
    try {
      e.preventDefault();
      if (!formData.name) {
        toast.warning("Category name is required");
        return;
      }
      setPending(true);

      let imageObject = formData.image;

      if (newImage) {
        if (formData.image?.ref) {
          try {
            await deleteObject(ref(storage, formData.image.ref));
          } catch (err) {
            toast.error("Failed to delete image");
          }
        }
        const imageRef = ref(
          storage,
          `categories/${newImage.size + newImage.name}`
        );
        await uploadBytes(imageRef, newImage);
        const imageUrl = await getDownloadURL(imageRef); // Get the image URL directly
        imageObject = { url: imageUrl, ref: imageRef._location.path_ };
      }

      const postData = {
        ...formData,
        image: imageObject,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/category/${category._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const responseData = await res.json(); // Assuming the response is JSON

      if (res.ok) {
        toast.success(`Updated ${formData.name} category`);
        handleOpen();
        setFormData({
          name: "",
          image: null,
          subCategories: [],
        });
        setCategories((prev) => {
          return prev.map((cat) =>
            cat._id === category._id ? responseData : cat
          );
        });
      } else {
        toast.error(`Error updating category: ${responseData.message}`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setPending(false);
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
        className="p-6"
      >
        <Heading
          icon={
            <div className="bg-gradient-to-r from-red-400 to-pink-400 p-1 rounded-full inline-block">
              <FaTshirt size={20} color="white" />
            </div>
          }
          title={"Edit categories"}
          buttons={[
            <IconButton key={1} variant="text" onClick={handleOpen}>
              <RxCross1 size={20} />
            </IconButton>,
          ]}
        />
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleUpdateCategory}
        >
          <div className="flex flex-col items-center">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center space-x-4 border rounded-md p-4 w-full"
            >
              {formData.image?.url ? (
                <div className="relative w-12 h-12">
                  {newImage ? (
                    <Image
                      src={URL.createObjectURL(newImage)}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src={formData.image?.url}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
              <div className="flex-grow pl-2">
                <p className="text-gray-500">Edit Profile Image</p>
                <p className="text-sm text-gray-400">PNG or JPG</p>
              </div>
              <div className="ml-auto">
                <HiOutlineUpload className="w-6 h-6 text-gray-500" />
              </div>
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setNewImage(e.target.files[0]);
              }}
            />
          </div>
          <Input
            label="Category name"
            value={formData.name}
            required
            onChange={(e) => {
              setFormData((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <div className="flex flex-col lg:flex-row gap-2 items-center justify-center">
            <Input
              label="Sub category"
              value={subCategory.name}
              onChange={(e) => {
                setSubCategory((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
            <div className="flex gap-2 items-center justify-center w-full">
              <Select
                label="Choose a colour"
                value={subCategory.colour}
                onChange={(e) => {
                  setSubCategory((prev) => {
                    return { ...prev, colour: e };
                  });
                }}
              >
                {colours.map((color) => {
                  return (
                    <Option key={color.name} value={color.hex}>
                      <div className="flex items-center gap-2">
                        <div
                          style={{ background: color.hex }}
                          className="w-4 h-4 rounded-lg"
                        ></div>
                        {color.name}
                      </div>
                    </Option>
                  );
                })}
              </Select>
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (!subCategory.colour && !subCategory.name) {
                    return;
                  }
                  setFormData((prev) => {
                    return {
                      ...prev,
                      subCategories: [...prev.subCategories, subCategory],
                    };
                  });
                  setSubCategory({ name: "", colour: "" });
                }}
              >
                <IoIosAddCircleOutline size={35} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {formData.subCategories.map((category) => {
              return (
                <div
                  key={category.name}
                  style={{ border: `2px solid ${category.colour}` }}
                  className={`w-fit flex gap-2 items-center justify-between p-1.5 h-full rounded-md`}
                >
                  <div className="flex gap-1 items-center text-xs">
                    <div
                      style={{ background: category.colour }}
                      className="w-3 h-3 rounded-lg"
                    ></div>
                    {category.name}
                  </div>
                  <button
                    onClick={() => {
                      setFormData((prev) => {
                        return {
                          ...prev,
                          subCategories: prev.subCategories.filter(
                            (c) => c.name !== category.name
                          ),
                        };
                      });
                    }}
                  >
                    <RxCross1 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end items-center gap-4">
            <Button
              variant="outlined"
              color="blue"
              onClick={handleOpen}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="blue"
              disabled={pending}
              type="submit"
            >
              {pending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default EditCategory;
