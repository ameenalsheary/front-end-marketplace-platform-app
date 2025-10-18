// import Pagination from "@mui/material/Pagination";

import { productService } from "@/services/product.service.";
import ProductCard from "./ProductCard";

const specificFields = `
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

export default async function ProductGrid(props) {
  const title = props.title;

  const products = await productService.getProducts({
    page: "1",
    limit: "10",
    sort: "-sold",
    fields: specificFields,
  });

  return (
    <div className="bg-background-secondary py-6">
      <div className="container">
        <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">
          {title}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {products.data.map((item, i) => {
            return <ProductCard product={item} key={i} />;
          })}
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
