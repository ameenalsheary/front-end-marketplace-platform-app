import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";

import Providers from "@/app/providers";
import NavBar from "@/components/layout/Navbar";
import Auth from "@/components/layout/Auth";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "EshopApp",
  description: "Modern eCommerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Providers>
          <NavBar />
          <Auth />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
