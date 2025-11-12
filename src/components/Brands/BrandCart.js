import Link from "next/link";
import CustomImage from "../ui/CustomImage";

export default function BrandCart(props) {
  const { _id, image, name } = props.brand;

  return (
    <Link href={`/search?page=1&brand=${_id}`}>
      <div className="p-2.5 bg-background rounded-lg shadow-md cursor-pointer hover-lift group">
        <CustomImage
          src={image}
          fallback="/images/brand-placeholder.png"
          width={400}
          height={200}
          alt={name}
          className="rounded-t-lg w-full mb-2.5 bg-background-tertiary"
        />
        <h1 className="text-center font-medium text-lg capitalize line-clamp-1 group-hover:text-primary">
          {name}
        </h1>
      </div>
    </Link>
  );
}
