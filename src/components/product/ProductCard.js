import CustomImage from "../ui/CustomImage";
import FavoriteButton from "../ui/FavoriteButton/FavoriteButton";

export default function ProductCard(props) {
  let {
    // _id,
    title,
    price,
    priceBeforeDiscount,
    discountPercent,
    imageCover,
    quantity,
    // size,
    sold,
    ratingsAverage,
    ratingsQuantity,
    // save,
  } = props.product;

  price = price.toFixed(2).replace(".", ",");
  priceBeforeDiscount
    ? (priceBeforeDiscount = priceBeforeDiscount.toFixed(2).replace(".", ","))
    : null;

  return (
    <div className="bg-background rounded-lg shadow-md h-fit cursor-pointer hover-lift overflow-hidden group">
      <div className="relative p-2.5">
        <CustomImage
          src={imageCover}
          fallback="/images/product-placeholder.png"
          width={500}
          height={690}
          alt={title}
          priority
          className="rounded-t-lg w-full bg-background-tertiary"
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
            <p className="text-green-600 font-semibold">
              -{discountPercent}% off
            </p>
          </div>
        )}
        <div className="text-sm">
          <p>
            <span className="font-semibold">{sold}</span> sold in total
          </p>

          {quantity === 0 ? (
            <p className="text-red-500">Out of stock.</p>
          ) : quantity <= 6 ? (
            <p className="text-orange-500">
              Only <span className="font-semibold">{quantity}</span> left in
              stock.
            </p>
          ) : null}
        </div>

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
        <button className="bg-primary text-[#e5e5e5] px-4 rounded-lg h-10 cursor-pointer font-medium text-base">
          Add to cart
        </button>
      </div>
    </div>
  );
}
