import { NextResponse } from "next/server";
import { authGenerator } from "@/app/actions/authGenerator";
const API = "http://localhost:3001/api/patient/discharge";

export async function DELETE(request) {
  try {
    // Get the current user (this function also checks to see if we have a current session)
    const { token: AuthPass } = await authGenerator();
    const incomingRequest = await request.json();
    const response = await fetch(`${API}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AuthPass}`,
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(incomingRequest),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg);
    }

    const data = await response.text();

    // Return a successful response
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
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
