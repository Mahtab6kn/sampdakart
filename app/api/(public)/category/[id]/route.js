import { NextResponse } from "next/server";

import dbConnect from "@/config/db";

import Category from "@/model/category";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id)
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );

    await dbConnect();

    const category = await Category.findById(id);

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
