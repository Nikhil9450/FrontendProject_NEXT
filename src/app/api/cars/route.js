// import axios from "axios";
// import https from "https";

// export async function GET() {
//   try {
//     const agent = new https.Agent({ rejectUnauthorized: false });

//     const response = await axios.get("https://www.freetestapi.com/api/v1/cars", {
//       httpsAgent: agent, 
//     });

//     return new Response(JSON.stringify(response.data), { status: 200 });
//   } catch (error) {
//     console.error("API fetch error:", error.message);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
//   }
// }

import axios from "axios";
import https from "https";

export async function GET() {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.get("https://www.freetestapi.com/api/v1/cars", { httpsAgent: agent });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    console.error("API fetch error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}