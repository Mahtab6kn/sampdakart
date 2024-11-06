import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import { checkAuthorization } from "@/config/checkAuthorization";
import Blog from "@/model/blog";

export async function POST(request) {
  try {
    const isAdmin = await checkAuthorization(request);

    if (isAdmin === "Unauthorized" || !isAdmin) {
      return NextResponse.json("Unauthorized Request", { status: 401 });
    }

    await dbConnect();

    const data = await request.json();

    const blog = await Blog.create(data);

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
