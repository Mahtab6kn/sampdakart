import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import dbConnect from "@/config/db";

import User from "@/model/user";

export const POST = async (req) => {
  const formData = await req.formData();

  const password = formData.get("password");
  const phoneNumber = formData.get("phoneNumber");

  if (!phoneNumber) {
    return NextResponse.json(
      { error: "Phone Number is required" },
      { status: 400 }
    );
  }

  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid phone number or password" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid phone number or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
