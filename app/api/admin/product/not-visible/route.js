import { NextResponse } from "next/server";

import Product from "@/model/product";

import dbConnect from "@/config/db";
import { checkAuthorization } from "@/config/checkAuthorization";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized" || !isAdmin) {
      return NextResponse.json("Unauthorized Request", { status: 401 });
    }

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    await dbConnect();

    const products = await Product.find({ visibility: false })
      .select("-sizes -orders -createdAt -updatedAt -description -visibility")
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("category")
      .exec();

    const totalProducts = await Product.countDocuments({ visibility: false });
    const totalPages = Math.ceil(totalProducts / limit);

    if (products.length === 0) {
      return NextResponse.json("No products found", { status: 404 });
    }

    return NextResponse.json(
      {
        data: products,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching not-visible products:", error);

    return NextResponse.json(
      `Error fetching not-visible products: ${error.message}`,
      { status: 500 }
    );
  }
}
