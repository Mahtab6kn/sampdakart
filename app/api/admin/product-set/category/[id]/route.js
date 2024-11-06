import { NextResponse } from "next/server";

import Product from "@/model/product";

import dbConnect from "@/config/db";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) return NextResponse.json("Product Id not found", { status: 404 });

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json("Product not found", { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json(`Error fetching product: ${error.message}`, {
      status: 500,
    });
  }
}
