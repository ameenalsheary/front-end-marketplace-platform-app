import Link from "next/link";

import CustomImage from "../ui/CustomImage";

export default function CategoryCard({ category }) {
  const { id, image, name, query } = category;

  return (
    <Link href={`/search?page=1&${query}=${id}`}>
      <div className="cursor-pointer group px-1.5 hover-scale">
        <div className="rounded-full p-1.5 bg-background shadow-md">
          <CustomImage
            src={image}
            fallback="/images/category-placeholder.png"
            width={600}
            height={600}
            alt={"Category image"}
            priority
            className="rounded-full w-full bg-background-tertiary"
          />
        </div>
        <h1 className="pt-1.5 text-center font-medium capitalize line-clamp-2 group-hover:text-primary">
          {name}
        </h1>
      </div>
    </Link>
  );
}
