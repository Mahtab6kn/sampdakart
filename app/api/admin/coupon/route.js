import { NextResponse } from "next/server";

import dbConnect from "@/config/db";
import Coupon from "@/model/coupon";

export async function POST(request) {
  try {
    await dbConnect();

    const data = await request.json();

    const couponAvailable = await Coupon.findOne({ code: data.code });

    if (couponAvailable) {
      return NextResponse.json("Coupon already exists.", { status: 400 });
    }

    const coupon = await Coupon.create(data);

    return NextResponse.json(coupon, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
