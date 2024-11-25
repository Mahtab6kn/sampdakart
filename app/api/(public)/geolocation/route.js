export async function GET(req) {
  try {
    // Using ipinfo.io as it's more reliable and has better free tier
    const response = await fetch(`https://ipinfo.io/json?token=ab76a73d159b18`);
    const data = await response.json();
    console.log({ Location: data });
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
