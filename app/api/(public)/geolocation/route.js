import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Extract client IP from headers
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("remote-addr") ||
      "";

    // If no client IP, fallback to default (use server's IP)
    const ip = clientIp || "me";

    // Fetch location details for the extracted IP
    const response = await fetch(
      `https://ipinfo.io/${ip}/json?token=ab76a73d159b18`
    );

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
