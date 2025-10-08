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
      <div className="relative">
        {quantity === 0 && (
          <div className="w-full h-full bg-[#0000009f] absolute top-0 left-0 flex justify-center items-center">
            <p className="bg-[#e5e5e5] text-red-500 font-semibold rounded-sm p-0.5 text-sm">
              Out of stock
            </p>
          </div>
        )}

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
      <div className="p-2 flex flex-col gap-0.5">
        <h1 className="text-text font-medium text-lg line-clamp-2 group-hover:text-primary">
          {title}
        </h1>

        <div>
          {priceBeforeDiscount && (
            <div className="text-red-500 text-sm flex gap-1.5">
              <del>{priceBeforeDiscount} USD</del>
              <span className="font-semibold text-green-600">
                {discountPercent}% off
              </span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="text-sm">USD</span>
            <span className="font-semibold text-2xl text-primary">
              {`${price}`}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex gap-1">
          {quantity === 0 ? (
            <p className="text-red-500 text-semibold bg-red-100 px-1 rounded-sm">
              Out of stock
            </p>
          ) : quantity >= 1 && quantity <= 12 ? (
            <p className="text-red-500 bg-red-100 px-1 rounded-sm">
              Only <span className="font-semibold">{quantity}</span> left
            </p>
          ) : (
            <p>
              <span className="font-semibold">{quantity}</span> in stock
            </p>
          )}
          <p>/</p>
          <p>
            <span className="font-semibold">{sold}</span> sold
          </p>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold">{ratingsAverage}</span>
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

        {quantity === 0 ? (
          <button className="bg-button-disabled p-1 rounded-lg cursor-not-allowed">
            Add to cart
          </button>
        ) : (
          <button className="bg-primary text-[#e5e5e5] p-1 rounded-lg cursor-pointer">
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
