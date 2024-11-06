import { NextResponse } from "next/server";

import SetOfProduct from "@/model/setOfProduct";

import dbConnect from "@/config/db";

export async function GET() {
  try {
    await dbConnect();

    const set = await SetOfProduct.aggregate([
      { $sort: { orderCount: -1 } },
      { $limit: 10 },
      { $project: { orderCount: 0 } },
    ]);

    return NextResponse.json(set, { status: 200 });
  } catch (error) {
    console.error("Error fetching most booked set of products:", error);

    return NextResponse.json(
      `Error fetching most booked set of products: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
