import axios from "axios";
import https from "https";

export async function GET(req, context) {
  try {
    const params = await context.params;  

    console.log("Request Params:", params);

    if (!params?.id) {
      return new Response(JSON.stringify({ error: "Car ID is required" }), { status: 400 });
    }

    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.get("https://www.freetestapi.com/api/v1/cars", { httpsAgent: agent });

    console.log("Fetched cars data:", response.data);

    const car = response.data.find((c) => c.id.toString() === params.id.toString());

    if (!car) {
      return new Response(JSON.stringify({ error: "Car not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(car), { status: 200 });
  } catch (error) {
    console.error("API fetch error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
  }
}
