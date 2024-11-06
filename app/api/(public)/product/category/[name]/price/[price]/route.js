import { NextResponse } from "next/server";

import Product from "@/model/product";

import dbConnect from "@/config/db";

export async function GET(request, { params }) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get("page") || 1;
    const pageSize = searchParams.get("size") || 10;

    const { id, price } = params;

    if (!id) return NextResponse.json("Category Id not found", { status: 404 });

    const skip = (page - 1) * pageSize;

    const sortOrder = price === "asc" ? 1 : -1;

    await dbConnect();

    let products = [];

    if (isAdmin) {
      products = await Product.find({
        category: id,
      })
        .select("-sizes -description -visibility -orders -updatedAt -createdAt")
        .sort({ price: sortOrder })
        .skip(parseInt(skip))
        .limit(parseInt(pageSize))
        .exec();
    } else {
      products = await Product.find({
        category: id,
        visibility: true,
      })
        .select("-sizes -description -visibility -orders -updatedAt -createdAt")
        .sort({ price: sortOrder })
        .skip(parseInt(skip))
        .limit(parseInt(pageSize))
        .exec();
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(`Error fetching products: ${error.message}`, {
      status: 500,
    });
  }
}
