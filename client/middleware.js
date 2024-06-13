import { withAuth } from "next-auth/middleware";
export default withAuth({
  pages: {
    signIn: "/",
  },
});
export const config = {
  matcher: ["/main/:path*"],
};

//creating a way to protect all my routes after the 'main/'
