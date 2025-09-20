import NavBar from "@/components/layout/Navbar";
import AdvertisementSwiper from "@/components/advertisement/AdvertisementSwiper";
import CategorySwiper from "@/components/categories/CategorySwiper";
import ProductGrid from "@/components/product/ProductGrid";
import BrandGrid from "@/components/Brands/BrandGrid";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <AdvertisementSwiper />
      <CategorySwiper title={"categories"} />
      <ProductGrid title={"Best sellers"} />
      <BrandGrid />
      <Footer />
    </>
  );
}
