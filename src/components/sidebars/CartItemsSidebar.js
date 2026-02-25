"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import Link from "next/link";

import { closeCartItemsModal } from "@/redux/slices/cartItemsModalSlice";
import OverlayContainer from "../ui/OverlayContainer";
import Button from "../ui/Button";
import CustomImage from "../ui/CustomImage";
import { formatPrice } from "@/lib/utilities/formatPrice";
import { currency } from "@/lib/constants";

export default function CartItemsSidebar() {
  const dispatch = useDispatch();
  const { isOpen, cartItems } = useSelector((state) => state.cartItemsModal);
  const scrollRef = useRef(null);
  const router = useRouter();

  const handleClose = () => dispatch(closeCartItemsModal());

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  return (
    <OverlayContainer
      isOpen={isOpen}
      title="Cart items"
      onClose={handleClose}
      transition="left"
      width="sm"
    >
      <div className="h-[calc(100vh-12px-28px-12px-12px)] grid gap-3 grid-rows-[1fr_auto]">
        <div
          ref={scrollRef}
          className="flex flex-col gap-1.5 overflow-auto scrollbar-hide"
        >
          {cartItems.map((item, index) => {
            const { quantity, size, color, price, totalPrice } = item;
            const { _id, title, imageCover } = item.product;

            const description = [
              quantity && `Quantity: ${quantity}`,
              price && `Price: ${formatPrice(price)}`,
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
                      alt={"Product image"}
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
                      {formatPrice(totalPrice)} {currency}
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
    </OverlayContainer>
  );
}
