import { NextResponse } from "next/server";

import Product from "@/model/product";

import dbConnect from "@/config/db";
import { checkAuthorization } from "@/config/checkAuthorization";

export async function GET(request, { params }) {
  try {
    let isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized") {
      isAdmin = false;
    }

    const { id } = params;

    if (!id) return NextResponse.json("Product Id not found", { status: 404 });

    await dbConnect();

    let product;

    if (isAdmin) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ _id: id, visibility: true });
    }

    product.orderCount = product.orders.length;
    product.orders = undefined;

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);

    return NextResponse.json(`Error fetching product: ${error.message}`, {
      status: 500,
    });
  }
}
