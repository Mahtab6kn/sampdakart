import { NextResponse } from "next/server";

import dbConnect from "@/config/db";

import Category from "@/model/category";
import { checkAuthorization } from "@/config/checkAuthorization";

export async function POST(request) {
  try {
    const isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized" || !isAdmin) {
      return NextResponse.json("Unauthorized Request", { status: 401 });
    }

    await dbConnect();

    const data = await request.json();

    if (!data.name) {
      return NextResponse.json("Invalid data.", { status: 400 });
    }

    if (!data.image.url) {
      return NextResponse.json("Invalid image.", { status: 400 });
    }

    const categoryExists = await Category.findOne({ name: data.name });

    if (categoryExists) {
      return NextResponse.json("Category already exists.", { status: 400 });
    }

    const category = await Category.create(data);

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
