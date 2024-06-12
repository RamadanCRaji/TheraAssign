// Import necessary modules and components
import bcrypt from "bcrypt"; // Used for password hashing
import NextAuth from "next-auth/next"; // Main NextAuth import for Next.js
import CredentialsProvider from "next-auth/providers/credentials"; // Provider for email and password authentication

import GithubProvider from "next-auth/providers/github"; // Provider for GitHub OAuth
import GoogleProvider from "next-auth/providers/google"; // Provider for Google OAuth
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Adapter to integrate Prisma with NextAuth
import prisma from "@/lib/prismadb"; // Importing the Prisma client for database interactions

// Configuration object for NextAuth
export const authOptions = {
  adapter: PrismaAdapter(prisma), // Configuring NextAuth to use Prisma for session and user management
  providers: [
    // GitHub OAuth provider configuration
    GithubProvider({
      clientId: process.env.GITHUB_ID, // Client ID from GitHub OAuth app
      clientSecret: process.env.GITHUB_SECRET, // Client secret from GitHub OAuth app
    }),
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // Client ID from Google OAuth app
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Client secret from Google OAuth app (Typo corrected)
    }),
    // Credentials provider for email and password login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" }, // Email input configuration
        password: { label: "Password", type: "password" }, // Password input configuration
      },
      async authorize(credentials) {
        // Authorization function to validate user credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials"); // Basic validation to ensure data is entered
        }

        // Retrieve user from the database by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        // Check if user exists and has a hashed password set
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid credentials"); // Error if no user or no hashed password
          // Explanation:
          // - User must exist with a hashed password to log in.
          // - If a user registered via OAuth (Google/Github) without a separate password, they cannot use this method. or a hashedPassword cannot exist for them at all
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
console.log(handler);

// Notes:
// - The CredentialsProvider is used for users who prefer to log in using email and password instead of OAuth options like Google or GitHub.
// - This setup ensures that users can choose from multiple authentication methods, enhancing accessibility and user choice.
