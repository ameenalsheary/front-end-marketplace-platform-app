"use client";
import { useDispatch, useSelector } from "react-redux";

import { openAuthModal } from "@/redux/slices/authModalSlice";
import Button from "./Button";

export default function AddProductToCartButton({ quantity }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authModal);

  return (
    <Button
      size="small"
      className="w-full"
      disabled={quantity === 0}
      onClick={() => {
        if (!isAuthenticated) dispatch(openAuthModal());
      }}
    >
      Add to cart
    </Button>
  );
}
