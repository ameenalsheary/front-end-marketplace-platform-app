import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Providers from "@/app/providers";
import AuthChecker from "@/components/layout/AuthChecker";
import { ToastContainer } from "react-toastify";
import NavBar from "@/components/layout/Navbar";
import Auth from "@/components/layout/Auth";
import PhoneNumber from "@/components/layout/PhoneNumber";
import CartItemsSidebar from "@/components/sidebars/CartItemsSidebar";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        {/* Global Providers */}
        <Providers>
          {/* Auth Checker */}
          <AuthChecker />

          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          {/* Navbar */}
          <NavBar />

          {/* Auth Modal */}
          <Auth />

          {/* Phone number Modal */}
          <PhoneNumber />

          {/* Cart Items Sidebar */}
          <CartItemsSidebar />

          {/* Page Content */}
          {children}

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
