import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Coupon from "@/model/coupon";

export async function GET() {
  try {
    await dbConnect();

    const coupon = await Coupon.find();

    return NextResponse.json(coupon, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
