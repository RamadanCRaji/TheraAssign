import jwt from "jsonwebtoken";

const DEFAULT_SIGN_OPTION = {
  expiresIn: "1h",
  algorithm: "HS256", // Define the algorithm used for signing the token
};

const DEFAULT_REFRESH_TOKEN_OPTIONS = {
  expiresIn: "7d", // Refresh tokens usually have longer lifespans
  algorithm: "HS256",
};

export function signJwtAccessToken(jwtPayload, isAccessToken = true) {
  const secretKey = process.env.NEXTAUTH_SECRET; // Ensure this environment variable is set correctly
  const options = isAccessToken
    ? DEFAULT_SIGN_OPTION
    : DEFAULT_REFRESH_TOKEN_OPTIONS;

  const token = jwt.sign(jwtPayload, secretKey, options); // creating a token
  return token;
}

export function verifyJwt(token) {
  // used to verify the token is actually valid
  try {
    const secretKey = process.env.NEXTAUTH_SECRET; // Use the same environment variable
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error(error.message);
    return null; // Return null or handle the error appropriately
  }
}
