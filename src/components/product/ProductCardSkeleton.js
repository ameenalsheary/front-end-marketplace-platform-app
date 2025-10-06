export default function ProductCardSkeleton() {
  return (
    <div className="bg-background rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="w-full h-60 rounded-t-lg skeleton"></div>
      </div>
      <div className="p-2 flex flex-col gap-1.5">
        <h1 className="text-lg line-clamp-2 skeleton">
          Loading...
          <br />
          Loading...
        </h1>
        <div className="flex items-center gap-1">
          <span className="text-sm skeleton">USD</span>
          <span className="text-2xl skeleton">000.00</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="skeleton">
            <del>000.00</del>
          </span>
          <span className="skeleton">00% off</span>
        </div>
        <div className="skeleton">0.0 (000)</div>
      </div>
    </div>
  );
}
