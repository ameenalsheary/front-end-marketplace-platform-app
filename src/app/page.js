import { Suspense } from "react";

import AdvertisementSwiper from "@/components/advertisement/AdvertisementSwiper";
import CategorySwiper from "@/components/categories/CategorySwiper";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import BrandGrid from "@/components/Brands/BrandGrid";
import BrandGridSkeleton from "@/components/Brands/BrandGridSkeleton";

export default function Home() {
  return (
    <>
      {/* <AdvertisementSwiper />
      <CategorySwiper title={"categories"} /> */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid title={"Best sellers"} />
      </Suspense>
      {/* <Suspense fallback={<BrandGridSkeleton />}>
        <BrandGrid />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid title={"Best sellers"} />
      </Suspense> */}
    </>
  );
}
