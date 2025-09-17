import Image from "next/image";

import FavoriteButton from "../ui/FavoriteButton/FavoriteButton";

export default function ProductCard(props) {
  let {
    title,
    imageCover,
    price,
    priceBeforeDiscount,
    discountPercent,
    ratingsAverage,
    ratingsQuantity,
    quantity,
  } = props.product;

  price = price.toFixed(2).replace(".", ",");
  priceBeforeDiscount
    ? (priceBeforeDiscount = priceBeforeDiscount.toFixed(2).replace(".", ","))
    : null;

  return (
    <div className="bg-background rounded-lg shadow-md h-fit cursor-pointer hover-lift overflow-hidden group">
      <div className="relative p-2.5">
        <Image
          width={500}
          height={690}
          src={imageCover}
          alt="product"
          className="rounded-t-lg w-full bg-background-tertiary"
          onError={(e) => {
            e.target.src = "/images/product-placeholder.png";
          }}
        />
        <FavoriteButton />
      </div>
      <div className="px-4 pb-4 flex flex-col gap-1.5">
        <h1 className="text-text font-medium text-lg line-clamp-2 group-hover:text-primary">
          {title}
        </h1>
        <div className="flex items-center gap-1">
          <span className="text-sm">USD</span>
          <span className="font-semibold text-2xl text-primary">
            {`${price}`}
          </span>
        </div>
        {priceBeforeDiscount && (
          <div className="flex items-center gap-1">
            <span className="text-red-500">
              <del>{priceBeforeDiscount} USD</del>
            </span>
            <span className="font-semibold text-green-600">
              {discountPercent}% off
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          {ratingsAverage}{" "}
          {Array(Math.floor(ratingsAverage))
            .fill(0)
            .map((_, i) => {
              return (
                <span className="text-yellow-400" key={i}>
                  &#9733;
                </span>
              );
            })}{" "}
          ({ratingsQuantity})
        </div>
        {quantity >= 1 && quantity <= 6 && (
          <div className="text-sm text-red-500">
            Only <span className="font-semibold">{quantity}</span> left in
            stock.
          </div>
        )}
        {quantity === 0 && (
          <div className="text-sm text-red-500">Out of stock.</div>
        )}
        <button className="bg-primary text-[#e5e5e5] px-4 rounded-lg h-10 cursor-pointer font-medium text-base">
          Add to cart
        </button>
      </div>
    </div>
  );
}
