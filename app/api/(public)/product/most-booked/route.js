import { NextResponse } from "next/server";

import Product from "@/model/product";

import dbConnect from "@/config/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const mostBookedProducts = await Product.aggregate([
      { $match: { visibility: true } },

      {
        $addFields: {
          ordersCount: {
            $size: "$orders",
          },
        },
      },

      {
        $sort: {
          ordersCount: -1,
        },
      },

      { $limit: 12 },

      {
        $project: {
          title: 1,
          category: 1,
          images: {
            $slice: ["$images", 1],
          },
          discount: 1,
          price: 1,
          ordersCount: 1,
          sizes: 1,
          _id: 1,
          subCategory: 1,
        },
      },
    ]);

    return NextResponse.json(mostBookedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching most booked products:", error);

    return NextResponse.json(
      `Error fetching most booked products: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
