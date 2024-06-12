import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing information", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Creating user with:", {
      email,
      name,
      hashedPassword,
    });
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error:", error.message);
    console.error("Error details:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Error", details: error.message }),
      { status: 500 },
    );
  }
}
