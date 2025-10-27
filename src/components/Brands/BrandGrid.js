import apiClientServer from "@/services/apiClientServer";
import BrandCart from "./BrandCart";

export default async function BrandGrid() {
  const res = await apiClientServer.get("/brands", {
    params: {
      page: "1",
      limit: "12",
      fields: `_id, name, image`,
      sort: "createdAt",
    },
  });
  const brands = res.data;

  return (
    <div className="bg-background-secondary py-6">
      <div className="container">
        <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">
          {"Brads"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
          {brands.data.map((item) => {
            return <BrandCart key={item._id} brand={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
