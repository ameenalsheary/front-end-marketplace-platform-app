import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton(props) {
  const title = props.title;

  return (
    <div className="bg-background-secondary py-6">
      <div className="container">
        <h1 className="text-text text-2xl md:text-3xl pb-3 font-medium">
          {title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 pb-6">
          {Array(10)
            .fill(0)
            .map((_, i) => {
              return (
                <div
                  key={i}
                  className={`
                    ${i + 1 > 9 ? "md:hidden" : ""}
                    ${i + 1 > 8 ? "lg:hidden xl:block" : ""}
                  `}
                >
                  <ProductCardSkeleton key={i} />
                </div>
              );
              return;
            })}
        </div>
      </div>
    </div>
  );
}
