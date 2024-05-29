import { Inter } from "next/font/google";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "200", "300", "700"],
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TheraAssign",
  description: "Managing therapy Equipements with precision",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ibm.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
