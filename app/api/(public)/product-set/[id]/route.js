import { NextResponse } from "next/server";

import SetOfProduct from "@/model/setOfProduct";

import dbConnect from "@/config/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id)
      return NextResponse.json("Set of product Id not found", { status: 404 });

    await dbConnect();

    const setOfProduct = await SetOfProduct.findById(id);

    if (!setOfProduct) {
      return NextResponse.json("Set of product not found", { status: 404 });
    }

    return NextResponse.json(setOfProduct, { status: 200 });
  } catch (error) {
    console.error("Error fetching Set of product:", error);

    return NextResponse.json(
      `Error fetching Set of product: ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
