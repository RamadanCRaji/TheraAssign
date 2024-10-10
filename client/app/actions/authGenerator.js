import getCurrentUser from "@/app/actions/getCurrentUser";
import { signJwtAccessToken } from "@/lib/jwtCreator";

/**
 *
 * @description check use and generate authentication code
 * @returns EncodedToken of verified user
 */
export async function authGenerator() {
  try {
    // Attempt to retrieve the current user session
    const currentUser = await getCurrentUser();

    // If no user is found, throw an error with a specific message
    if (!currentUser) {
      throw new Error("User not authenticated or session expired.");
    }

    // Destructure to remove sensitive information from the user object
    const { hashedPassword, image, access_token, ...userWithoutPass } =
      currentUser;

    // Sign the JWT token with the user's non-sensitive payload
    const ENCODEDTOKEN = signJwtAccessToken(userWithoutPass);

    // Return the token, wrapped in an object for consistency
    return { token: ENCODEDTOKEN };
  } catch (error) {
    // Consider logging the error here
    throw new Error(`Authentication failed: ${error.message}`);
  }
}
