import { NextResponse } from "next/server";

import Blog from "@/model/blog";
import dbConnect from "@/config/db";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) return NextResponse.json("Blog Id not found", { status: 404 });

    await dbConnect();

    const blog = await Blog.findById(id);

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);

    return NextResponse.json(`Error fetching blog: ${error.message}`, {
      status: 500,
    });
  }
}
