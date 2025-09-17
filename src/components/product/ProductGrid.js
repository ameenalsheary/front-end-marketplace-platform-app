"use client";

import Pagination from "@mui/material/Pagination";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

import res from "./productsData";

export default function ProductGrid(props) {
  const title = props.title;
  return (
    <>
      <div className="bg-background-secondary py-6">
        <div className="container">
          <h1 className="text-text text-3xl pb-3 font-medium">{title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
            {res.data.map((item, i) => {
              return <ProductCard product={item} key={i} />;
            })}
          </div>
          <Pagination
            count={6}
            // page={2}
            siblingCount={0}
            size="large"
            className="pt-6"
          />
        </div>
      </div>
      <div className="bg-background-secondary py-6">
        <div className="container">
          <h1 className="text-text text-3xl pb-3 font-medium">{title}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 pb-6">
            {Array(5)
              .fill(0)
              .map((_, i) => {
                return <ProductCardSkeleton key={i} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
