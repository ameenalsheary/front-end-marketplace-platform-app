import apiClientServer from "@/services/apiClientServer";
import SearchSidebar from "@/components/ui/SearchSidebar";
import ProductCard from "@/components/product/ProductCard";
import PaginationSection from "@/components/ui/Pagination";

export default async function SearchPage(props) {
  const { page, query } = await props.searchParams;

  const res = await apiClientServer.get("products", {
    params: {
      page: Number(page) || 1,
      limit: 20,
      search: query || "",
    },
  });

  const products = res.data?.data;
  const { numberOfPages } = res.data?.paginationResults;

  if (products.length > 0) {
    return (
      <div className="bg-background-secondary py-3 lg:py-6">
        <div className="container">
          <div className="flex flex-col gap-3">
            <SearchSidebar />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {products.map((item) => {
                return <ProductCard key={item._id} product={item} />;
              })}
            </div>

            {numberOfPages > 1 && <PaginationSection count={numberOfPages} />}
          </div>
        </div>
      </div>
    );
  }
}
