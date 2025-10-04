// import Pagination from "@mui/material/Pagination";

import { brandService } from "@/services/brand.service.";
import BrandCart from "./BrandCart";

export default async function BrandGrid() {
  const brands = await brandService.getBrands({
    page: "1",
    limit: "6",
    fields: `
        _id,
        name,
        image,
      `,
    sort: "createdAt",
  });

  return (
    <div className="bg-background py-6">
      <div className="container">
        <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">
          {"Brads"}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
          {brands.data.map((item, i) => {
            return <BrandCart brand={item} key={i} />;
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
