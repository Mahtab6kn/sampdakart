import { NextResponse } from "next/server";

import dbConnect from "@/config/db";

import Category from "@/model/category";
import { checkAuthorization } from "@/config/checkAuthorization";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    let isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized") {
      isAdmin = false;
    }

    await dbConnect();

    const categories = await Category.find().select("-createdAt -updatedAt");

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
