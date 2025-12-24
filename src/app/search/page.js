import apiClientServer from "@/services/apiClientServer";
import SearchSidebar from "@/components/sidebars/SearchSidebar";
import CategorySwiper from "@/components/categories/CategorySwiper";
import ProductCard from "@/components/product/ProductCard";
import PaginationSection from "@/components/ui/Pagination";
import ErrorDisplay from "@/components/ui/ErrorDisplay";

export default async function SearchPage(props) {
  const {
    page,
    query,
    minPrice,
    maxPrice,
    rating,
    category,
    sub_category,
    under_sub_category,
    brand
  } = await props.searchParams;

  const res = await apiClientServer.get("products", {
    params: {
      page: Number(page) || 1,
      limit: 20,
      search: query || undefined,
      "price[gte]": Number(minPrice) || undefined,
      "price[lte]": Number(maxPrice) || undefined,
      "ratingsAverage[gte]": Number(rating) || undefined,
      category: category || undefined,
      subCategories: sub_category || undefined,
      underSubCategories: under_sub_category || undefined,
      brand: brand || undefined
    },
  });

  const products = res.data?.data;
  const { numberOfPages } = res.data?.paginationResults;

  return (
    <div className="min-h-screen-minus-header bg-background-secondary">
      {category && (
        <CategorySwiper
          path={"/subcategories"}
          params={{
            page: "1",
            limit: "20",
            fields: `_id, name, image`,
            sort: "createdAt",
            category,
          }}
          query="sub_category"
        />
      )}

      {sub_category && (
        <CategorySwiper
          path={"/undersubcategories"}
          params={{
            page: "1",
            limit: "20",
            fields: `_id, name, image`,
            sort: "createdAt",
            subCategory: sub_category,
          }}
          query="under_sub_category"
        />
      )}

      {products.length > 0 ? (
        <div className="container">
          <div className="flex flex-col gap-3 py-3 lg:py-6">
            <SearchSidebar />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
              {products.map((item) => {
                return <ProductCard key={item._id} product={item} />;
              })}
            </div>

            {numberOfPages > 1 && <PaginationSection count={numberOfPages} />}
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex flex-col justify-center items-center">
          <ErrorDisplay
            srcImage="/images/no-results.png"
            error="No result found."
            description="Try searching for something else or go back to the previous page."
            buttonText="Go back"
            ButtonVariant="primary"
            eventHandler="GO_BACK"
          />
        </div>
      )}
    </div>
  );
}
