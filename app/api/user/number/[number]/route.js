import { NextResponse } from "next/server";

import dbConnect from "@/config/db";

import User from "@/model/user";

export async function GET(request, { params }) {
  try {
    const { number } = params;

    if (!number)
      return NextResponse.json("Invalid phone number", { status: 400 });

    await dbConnect();

    const user = await User.findOne({ phoneNumber: number });

    if (!user) {
      return NextResponse.json("Phone Number doesn't exist.", { status: 404 });
    }

    return NextResponse.json(user._id, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
