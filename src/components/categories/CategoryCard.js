import CustomImage from "../ui/CustomImage";

export default function CategoryCard({ category }) {
  const { image, name } = category;

  return (
    <div className="cursor-pointer group px-1.5 hover-scale">
      <div className="mb-2.5 rounded-full p-1.5 bg-background shadow-md">
        <CustomImage
          src={image}
          fallback="/images/category-placeholder.png"
          width={600}
          height={600}
          alt={name}
          priority
          className="rounded-full w-full bg-background-tertiary"
        />
      </div>
      <h1 className="ext-text text-center font-medium text-lg capitalize line-clamp-2 group-hover:text-primary">
        {name}
      </h1>
    </div>
  );
}
