import { NextResponse } from "next/server";
import SetOfProduct from "@/model/setOfProduct";
import dbConnect from "@/config/db";

export async function GET() {
  try {
    await dbConnect();

    const sets = await SetOfProduct.find();

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

export async function POST(request) {
  try {
    const body = await request.json();

    await dbConnect();

    const newSet = new SetOfProduct(body);
    const savedSet = await newSet.save();

    return NextResponse.json(savedSet, { status: 201 });
  } catch (error) {
    console.error("Error saving set of product:", error);

    return NextResponse.json(`Error saving set of product: ${error.message}`, {
      status: 500,
    });
  }
}
