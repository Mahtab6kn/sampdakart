import { NextResponse } from "next/server";

import SetOfProduct from "@/model/setOfProduct";

import dbConnect from "@/config/db";

export async function GET() {
  try {
    await dbConnect();

    const sets = await SetOfProduct.find({ visibility: true });

    return NextResponse.json(sets, { status: 200 });
  } catch (error) {
    console.error("Error fetching set of products:", error);

    return NextResponse.json(
      `Error fetching set of products: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
