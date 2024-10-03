import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    console.log("this is the request we got,", request);

    // Sending a response back
    return NextResponse.json({ message: "message received" });
  } catch (error) {
    console.error("Error reading request:", error);
    return NextResponse.json(
      { error: "Failed to read request" },
      { status: 400 },
    );
  }
}
