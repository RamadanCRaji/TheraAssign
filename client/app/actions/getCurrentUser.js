import prisma from "@/lib/prismadb";

import getSession from "./getSession";

export default async function getCurrentUser() {
  try {
    //checking to see if a session exist
    const session = await getSession();

    if (!session?.user?.email) {
      // we do not want to throw any errors because this is not an api route, this is a server action
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
        name: session.user.name,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
}
