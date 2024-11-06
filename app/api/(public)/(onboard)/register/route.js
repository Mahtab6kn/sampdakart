import { storage } from "@/firebase";
import { NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import User from "@/model/user";

import dbConnect from "@/config/db";

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const file = formData.get("image");

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phoneNumber = formData.get("phoneNumber");

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        { error: "User email already exists" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone Number is required" },
        { status: 400 }
      );
    }

    const phoneExist = await User.findOne({ phoneNumber });

    if (phoneExist) {
      return NextResponse.json(
        { error: "Phone number already exists" },
        { status: 400 }
      );
    }

    let userData;

    if (file) {
      const imageRef = ref(storage, `users/${file.size + file.name}`);

      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer], { type: file.type });

      await uploadBytes(imageRef, blob);

      const imageUrl = await getDownloadURL(imageRef);
      const imageObject = { url: imageUrl, ref: imageRef._location.path_ };

      userData = { name, phoneNumber, email, password, image: imageObject };
    } else {
      userData = { name, phoneNumber, email, password };
    }

    const user = await User.create(userData);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error occurred: ", error);
    return NextResponse.json({ error: "Failed to create user", status: 500 });
  }
};
