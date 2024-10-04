import { NextResponse } from "next/server";
import { authGenerator } from "@/app/actions/authGenerator";
const API = "https://thera-assign-backend.vercel.app/api/dashBoardInfo/";

export async function GET(request) {
  try {
    // Get the current user (this function also checks to see if we have a current session)
    const { token: AuthPass } = await authGenerator();

    const response = await fetch(`${API}`, {
      headers: {
        Authorization: `Bearer ${AuthPass}`,
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(response.error);
    }

    const data = await response.json(); // parsing json to an object

    // Return a successful response
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Respond back if something goes wrong
    return new NextResponse(
      JSON.stringify({
        message: "Internal Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// Parameters of NextResponse
// Body: The first parameter can be a string, a Buffer, a JSON object, etc.
// Options: The second parameter is an options object that can include:
// status: HTTP status code (e.g., 200, 404, 500).
// headers: An object containing response headers.
// statusText: Optional status text (default is the standard status text for the given status code).
/**
 * 
 *  if (!AuthPass) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found, you are not allowed to make such a request",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Destructure the user object to remove sensitive information
    const { hashedPassword, image, access_token, ...userWithoutPass } =
      currentUser;
    const userPayload = { ...userWithoutPass };
    const ENCODEDTOKEN = signJwtAccessToken(userPayload);

    // Send request to backend with the token
   
 */
