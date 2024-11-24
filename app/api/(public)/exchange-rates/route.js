export async function GET(req) {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXC_RATE_API_KEY}/latest/INR`
    );

    if (!response.ok) {
      throw new Error("Exchange rate API response was not ok");
    }

    const data = await response.json();
    console.log(data);

    return Response.json(data); // Return the complete response from the exchange rate API
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch exchange rates",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
