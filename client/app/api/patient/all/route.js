import { NextResponse } from "next/server";
import { authGenerator } from "@/app/actions/authGenerator";
const API = "https://thera-assign-backend.vercel.app/api/patient/all";

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
      const errorMsg = await response.text();
      throw new Error(response.errorMsg);
    }

    const data = await response.json();

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
