import { NextResponse } from "next/server";

import dbConnect from "@/config/db";

import User from "@/model/user";

import jwt from "jsonwebtoken";

const secret = process.env.NEXTAUTH_SECRET;

export const POST = async (req) => {
  const formData = await req.formData();

  const token = formData.get("token");
  const password = formData.get("password");

  if (!token) {
    return NextResponse.json("Unauthorized Request", { status: 400 });
  }

  if (!password) {
    return NextResponse.json("Password is required", { status: 400 });
  }

  try {
    let userId;

    try {
      const decoded = jwt.verify(JSON.parse(token).token, secret);

      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json("Unauthorized Access", { status: 400 });
    }

    await dbConnect();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json("Invalid user", { status: 401 });
    }

    user.password = password;
    await user.save();

    user.password = undefined;

    return NextResponse.json(
      {
        message: "Password reset successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Cannot Reset Password: Please contact us.", {
      status: 500,
    });
  }
};
