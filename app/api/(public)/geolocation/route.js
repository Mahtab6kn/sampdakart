import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=ab76a73d159b18`);

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data = await response.json();
    console.log({ Location: data });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching location:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
