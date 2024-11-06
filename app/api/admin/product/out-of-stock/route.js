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

    const products = await Product.find({
      sizes: {
        $elemMatch: {
          "colours.quantity": 0,
        },
      },
    })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .select("-sizes -description -visibility -orders -updatedAt -createdAt")
      .populate("category")
      .exec();

    const totalProducts = await Product.countDocuments({
      sizes: {
        $elemMatch: {
          "colours.quantity": 0,
        },
      },
    });
    const totalPages = Math.ceil(totalProducts / limit);

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
    console.error("Error fetching out of stock products:", error);

    return NextResponse.json(
      `Error fetching out of stock products: ${error.message}`,
      { status: 500 }
    );
  }
}
