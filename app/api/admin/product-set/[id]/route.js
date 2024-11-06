import { NextResponse } from "next/server";

import SetOfProduct from "@/model/setOfProduct";

import dbConnect from "@/config/db";

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    if (!id) return NextResponse.json("Id not found", { status: 404 });

    await dbConnect();

    const body = await request.json();

    const updatedSet = await SetOfProduct.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSet) {
      return NextResponse.json("Product not found", { status: 404 });
    }

    return NextResponse.json(updatedSet, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);

    return NextResponse.json(`Error updating product: ${error.message}`, {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    if (!id) return NextResponse.json("Id not found", { status: 404 });

    await dbConnect();

    const deletedSet = await SetOfProduct.findByIdAndDelete(id);

    if (!deletedSet) {
      return NextResponse.json("Product not found", { status: 404 });
    }

    return NextResponse.json("Product deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);

    return NextResponse.json(`Error deleting product: ${error.message}`, {
      status: 500,
    });
  }
}
