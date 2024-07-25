import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";
import { signJwtAccessToken, verifyJwt } from "@/lib/jwtCreator";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Remove sensitive information before jwtSignIn
    const { password, ...userWithoutPass } = body;

    if (!userWithoutPass.email || !userWithoutPass.name || !password) {
      return new NextResponse("Missing information", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    // Prepare user payload for JWT
    const userPayload = { ...userWithoutPass };
    const accessToken = signJwtAccessToken(userPayload);
    console.log("Creating user with:", {
      email: userWithoutPass.email,
      name: userWithoutPass.name,
      hashedPassword,
      access_token: token,
    });
    const encrytedToken = await bcrypt.hash(accessToken, 12); //changing the access token and encrypting it
    const user = await prisma.user.create({
      data: {
        email: userWithoutPass.email,
        name: userWithoutPass.name,
        hashedPassword,
        access_token: encrytedToken,
      },
      // // select: {
      // //   id: true,
      // //   email: true,
      // //   name: true,
      // //   access_token: true,
      //   // Do not include hashedPassword and access_token in the output
      // },
    });

    console.log({ user });

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

// there is need to prevent the token from being sent back to the client
