import NavBar from "@/components/layout/Navbar";
import ProductGrid from "@/components/product/ProductGrid";
import BrandGrid from "@/components/Brands/BrandGrid";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <ProductGrid title={"Best sellers"} />
      <BrandGrid />
      <Footer />
    </>
  );
}
