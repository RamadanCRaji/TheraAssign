import { NextResponse } from "next/server";
import { authGenerator } from "@/app/actions/authGenerator";
const API = "http://localhost:3001/api/wheelchair/available";

export async function GET(request) {
  try {
    // Get the current user (this function also checks to see if we have a current session)
    const { token: AuthPass } = await authGenerator();
    const response = await fetch(`${API}`, {
      headers: {
        Authorization: `Bearer ${AuthPass}`,
      },
      method: "GET",
      credentials: "include",
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
