export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

import Product from "@/model/product";

import dbConnect from "@/config/db";
import { checkAuthorization } from "@/config/checkAuthorization";

export async function GET(request, { params }) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized") {
      isAdmin = false;
    }

    const page = searchParams.get("page") || 1;
    const pageSize = searchParams.get("size") || 12;

    const { name } = params;

    if (!name)
      return NextResponse.json("Category name not found", { status: 404 });

    const skip = (page - 1) * pageSize;

    await dbConnect();

    let products = [];
    let totalProducts = 0;

    if (isAdmin) {
      products = await Product.find({ category: name })
        .select("-description -orders -updatedAt -createdAt")
        .skip(parseInt(skip))
        .limit(parseInt(pageSize))
        .exec();
      totalProducts = await Product.countDocuments({
        category: name,
      });
    } else {
      products = await Product.find({ category: name, visibility: true })
        .select("-description -visibility -orders -updatedAt -createdAt")
        .skip(parseInt(skip))
        .limit(parseInt(pageSize))
        .exec();
      totalProducts = await Product.countDocuments({
        category: name,
        visibility: true,
      });
    }

    if (!products || products.length === 0) {
      return NextResponse.json("No products found for the specified category", {
        status: 404,
      });
    }
    return NextResponse.json(
      {
        data: products,
        meta: {
          page: parseInt(page),
          pageSize,
          totalPages: Math.ceil(totalProducts / pageSize),
          totalResults: totalProducts,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(`Error fetching products: ${error.message}`, {
      status: 500,
    });
  }
}
