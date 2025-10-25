import { Suspense } from "react";

import AdvertisementSwiper from "@/components/advertisement/AdvertisementSwiper";
import CategorySwiper from "@/components/categories/CategorySwiper";
import ProductGrid from "@/components/product/ProductGrid";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import ProductSwiper from "@/components/product/ProductSwiper";
import BrandGrid from "@/components/Brands/BrandGrid";
import BrandGridSkeleton from "@/components/Brands/BrandGridSkeleton";

const productSpecificFields = `
  _id,
  title,
  price,
  priceBeforeDiscount,
  discountPercent,
  imageCover,
  quantity,
  size,
  sold,
  ratingsAverage,
  ratingsQuantity,
`;

export default function Home() {
  return (
    <>
      <AdvertisementSwiper />

      <CategorySwiper
        title={"categories"}
        path={"/categories"}
        params={{
          page: "1",
          limit: "20",
          fields: `_id, name, image`,
          sort: "createdAt",
        }}
      />

      <Suspense fallback={<ProductGridSkeleton title={"Best sellers"} />}>
        <ProductGrid
          title={"Best sellers"}
          params={{
            page: "1",
            limit: "10",
            sort: "-sold",
            fields: productSpecificFields,
          }}
        />
      </Suspense>

      <ProductSwiper
        title={"Offers"}
        params={{
          page: "1",
          limit: "20",
          fields: productSpecificFields,
          sort: "-discountPercent",
        }}
      />

      <Suspense fallback={<BrandGridSkeleton />}>
        <BrandGrid />
      </Suspense>

      <ProductSwiper
        title={"New products"}
        params={{
          page: "1",
          limit: "20",
          fields: productSpecificFields,
        }}
      />

      <Suspense fallback={<ProductGridSkeleton title={"Cheap products"} />}>
        <ProductGrid
          title={"Cheap products"}
          params={{
            page: "1",
            limit: "10",
            fields: productSpecificFields,
            sort: "price",
          }}
        />
      </Suspense>
    </>
  );
}
