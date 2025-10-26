import BrandCartSkeleton from "./BrandCartSkeleton";

export default function BrandGridSkeleton() {
  return (
    <div className="bg-background-secondary py-6">
      <div className="container">
        <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">
          {"Brads"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
          {Array(12)
            .fill(0)
            .map((item, i) => {
              return <BrandCartSkeleton brand={item} key={i} />;
            })}
        </div>
      </div>
    </div>
  );
}
