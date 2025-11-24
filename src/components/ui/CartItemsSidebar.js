"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { closeCartItemsModal } from "@/redux/slices/cartItemsModalSlice";
import Button from "./Button";
import CustomImage from "./CustomImage";
import { currency } from "@/lib/constants";

export default function CartItemsSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, cartItems } = useSelector((state) => state.cartItemsModal);

  const handleClose = () => dispatch(closeCartItemsModal());

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-full h-full bg-overlay z-10 transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-full md:w-[420px] h-screen bg-background-secondary p-3 shadow-md z-20 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full grid gap-3 grid-rows-[1fr_auto]">
          <div className="flex flex-col gap-1.5 overflow-auto scrollbar-hide">
            {cartItems.map((item, index) => {
              const { quantity, size, color, price, totalPrice } = item;
              const { _id, title, imageCover } = item.product;

              const description = [
                quantity && `Quantity: ${quantity}`,
                price && `Price: ${price.toFixed(2).replace(".", ",")}`,
                size && `Size: ${String(size).toUpperCase()}`,
                color && `Color: ${color}`,
              ]
                .filter(Boolean)
                .join(" / ");

              const href = size ? `/product/${_id}?size=${size}` : `/product/${_id}`;

              return (
                <Link
                  key={`${_id}-${size}-${color}-${index}`}
                  href={href}
                  onClick={handleClose}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-1.5 bg-background border border-border rounded-md overflow-hidden group">
                    <div className="w-24">
                      <CustomImage
                        src={imageCover}
                        fallback="/images/product-placeholder.png"
                        width={500}
                        height={690}
                        alt={title}
                        priority
                        className="bg-background-secondary"
                      />
                    </div>

                    <div className="p-1.5 flex flex-col gap-1.5">
                      <h1 className="font-semibold line-clamp-1 group-hover:text-primary group-hover:underline">
                        {title}
                      </h1>

                      <p className="text-sm line-clamp-1">{description}</p>

                      <p className="text-lg font-semibold text-primary">
                        {totalPrice.toFixed(2).replace(".", ",")} {currency}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid gap-1.5">
            <Button
              onClick={() => {
                handleClose();
                router.push("/shopping-cart");
              }}
            >
              Checkout
            </Button>

            <Button variant="secondary" onClick={handleClose}>
              Continue shopping
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
