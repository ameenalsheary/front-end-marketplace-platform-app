import Link from "next/link";

import apiClientServer from "@/services/apiClientServer";
import ProductCard from "@/components/product/ProductCard";
import PaginationSection from "@/components/ui/Pagination";

export default async function FavoritesPage(props) {
  const { page } = await props.searchParams;

  const res = await apiClientServer.get("customer/favorites", {
    params: {
      page: Number(page) || 1,
      limit: 8,
    },
  });

  const favorites = res.data?.data;
  const products = favorites.map((item) => item.productId);
  const { numberOfPages } = res.data?.paginationResults;

  if (products.length > 0) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-3xl font-medium">My Favorites</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 md:gap-4">
          {products.map((item) => {
            return <ProductCard key={item._id} product={item} />;
          })}
        </div>

        {numberOfPages > 1 && <PaginationSection count={numberOfPages} />}
      </div>
    );
  }

  return (
    <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
      <h1 className="text-center text-lg font-semibold">
        Oops! You haven`t saved any products yet.
      </h1>
      <p className="text-sm text-center max-w-sm">
        It seems like you haven`t added any products to your favorites. Browse
        our collection and start saving your favorite items!{" "}
      </p>
      <Link href="/">
        <button className="w-fit text-sm bg-primary text-white py-2 px-4 mt-1 rounded-md shadow-md cursor-pointer">
          Back to home page
        </button>
      </Link>
    </div>
  );
}
