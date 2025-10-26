// import Pagination from "@mui/material/Pagination";

import apiClientServer from "@/services/apiClientServer";
import ProductCard from "./ProductCard";

export default async function ProductGrid({ title, params }) {
  const res = await apiClientServer.get("/products", { params });
  const products = res.data;

  return (
    <div className="bg-background-secondary py-6">
      <div className="container">
        <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">
          {title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {products.data.map((item, i) => (
            <div
              key={i}
              className={`
                ${i + 1 > 9 ? "md:hidden" : ""}
                ${i + 1 > 8 ? "lg:hidden xl:block" : ""}
              `}
            >
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* <Pagination
          count={6}
          // page={2}
          siblingCount={0}
          size="large"
          className="pt-6"
        /> */}
      </div>
    </div>
  );
}
