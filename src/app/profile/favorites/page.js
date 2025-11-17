import apiClientServer from "@/services/apiClientServer";
import ProductCard from "@/components/product/ProductCard";
import PaginationSection from "@/components/ui/Pagination";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

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
      <div className="flex flex-col">
        <h1 className="text-2xl pb-3 font-medium capitalize">
          My Favorites
        </h1>

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
      <ErrorDisplay
        srcImage="/images/heart.png"
        error="Oops! You haven`t saved any products yet."
        description="It seems like you haven`t added any products to your favorites. Browse our collection and start saving your favorite items!"
        buttonText="Back to home page"
        ButtonVariant="primary"
        eventHandler="GO_TO"
        href="/"
      />
    </div>
  );
}
