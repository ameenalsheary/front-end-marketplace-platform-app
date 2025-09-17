export default function BrandCartSkeleton() {
  return (
    <div className="p-2.5 bg-background rounded-lg shadow-md">
      <div className="w-full h-20 rounded-t-lg mb-2.5 skeleton" />
      <h1 className="text-center font-medium text-lg skeleton">Loading...</h1>
    </div>
  );
}
