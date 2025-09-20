export default function CategoryCardSkeleton() {
  return (
    <div className="px-1.5">
      <div className="size-24 mb-2.5 rounded-full shadow-md ml-auto mr-auto skeleton"></div>
      <h1 className="ext-text text-center font-medium skeleton">
        Loading...
        <br />
        Loading...
      </h1>
    </div>
  );
}
