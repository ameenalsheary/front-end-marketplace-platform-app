import { useState } from "react";
import Image from "next/image";

export default function CategoryCard(props) {
  const { image, name } = props.category;

  const [categoryImage, setCategoryImageImage] = useState(image);
  const handleImageError = () => {
    setCategoryImageImage("");
  };

  return (
    <div className="cursor-pointer group px-1.5 hover-scale">
      <div className="mb-2.5 rounded-full p-1.5 bg-background shadow-md">
        <Image
          width={600}
          height={600}
          src={
            categoryImage || require("@/public/images/category-placeholder.png")
          }
          alt=""
          className="rounded-full w-full bg-background-tertiary"
          onError={handleImageError}
        />
      </div>
      <h1 className="ext-text text-center font-medium text-lg capitalize line-clamp-2 group-hover:text-primary">
        {name}
      </h1>
    </div>
  );
}
