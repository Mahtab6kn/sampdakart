import { NextResponse } from "next/server";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Product from "@/model/product";
import dbConnect from "@/config/db";
import { checkAuthorization } from "@/config/checkAuthorization";
import { storage } from "@/firebase";

export async function POST(request) {
  try {
    let imageObjects;

    const isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized" || !isAdmin) {
      return NextResponse.json("Unauthorized Request", { status: 401 });
    }

    const formData = await request.formData();

    const title = formData.get("title");
    const price = formData.get("price");
    const discount = formData.get("discount");
    const visibility = formData.get("visibility");
    const description = formData.get("description");
    const category = formData.get("category");
    const subCategory = JSON.parse(formData.get("subCategory"));
    const fabric = formData.get("fabric");
    const brand = formData.get("brand");
    const sizes = JSON.parse(formData.get("sizes"));
    const files = formData.getAll("images");

    if (
      !title ||
      !price ||
      !discount ||
      !description ||
      !category ||
      !subCategory ||
      !visibility ||
      !fabric ||
      !brand
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (sizes.length < 1) {
      return NextResponse.json(
        { error: "Add a minimum of 1 size!" },
        { status: 400 }
      );
    }

    if (files.length < 4) {
      return NextResponse.json(
        { error: "Add a minimum of 4 images!" },
        { status: 400 }
      );
    }

    await dbConnect();

    const productExist = await Product.findOne({ title });

    if (productExist) {
      return NextResponse.json(
        { error: "Product title already exists" },
        { status: 400 }
      );
    }

    imageObjects = await Promise.all(
      files.map(async (file) => {
        const imageRef = ref(
          storage,
          `products/${title}/${file.size + file.name}`
        );

        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);

        return { url: imageUrl, ref: imageRef.fullPath };
      })
    );

    const productData = {
      title,
      price,
      discount,
      visibility,
      description,
      category,
      subCategory,
      fabric,
      brand,
      sizes,
      images: imageObjects,
    };

    const product = await Product.create(productData);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error saving product:", error);

    if (imageObjects) {
      await Promise.all(
        imageObjects.map(async (img) => {
          await deleteObject(ref(storage, img.ref));
        })
      );
    }

    return NextResponse.json(`Error saving product: ${error.message}`, {
      status: 500,
    });
  }
}
