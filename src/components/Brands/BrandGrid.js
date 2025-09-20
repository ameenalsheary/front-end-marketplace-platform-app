"use client";

import Pagination from "@mui/material/Pagination";

import BrandCart from "./BrandCart";
import BrandCartSkeleton from "./BrandCartSkeleton";

import res from "./brandsData";

export default function BrandGrid() {
  return (
    <>
      <div className="bg-background-secondary py-6">
        <div className="container">
          <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">{"Brads"}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
            {res.data.map((item, i) => {
              return <BrandCart brand={item} key={i} />;
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
          <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">{"Brads"}</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
            {Array(12)
              .fill(0)
              .map((item, i) => {
                return <BrandCartSkeleton brand={item} key={i} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
