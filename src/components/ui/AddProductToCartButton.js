"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { openAuthModal } from "@/redux/slices/authModalSlice";
import { setCartItems } from "@/redux/slices/cartItemsModalSlice";
import Button from "./Button";
import apiClient from "@/services/apiClient";

export default function AddProductToCartButton({ _id, quantity, size }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authModal);

  const [status, setStatus] = useState("idle");

  const addProductToCart = async (data) => {
    setStatus("loading");
    try {
      const res = await apiClient.post("/customer/shopping-cart", data);
      setStatus("succeeded");
      dispatch(setCartItems(res.data?.data?.cartItems || []));
    } catch {
      setStatus("failed");
    }
  };

  // If product has sizes → redirect to product page
  if (size) {
    return (
      <Link href={`/product/${_id}`}>
        <Button size="small" className="w-full" disabled={quantity === 0}>
          Add to cart
        </Button>
      </Link>
    );
  }

  return (
    <Button
      size="small"
      className="w-full"
      disabled={quantity === 0}
      onClick={() => {
        if (isAuthenticated) {
          addProductToCart({ productId: _id, quantity: 1 });
        } else {
          dispatch(openAuthModal());
        }
      }}
    >
      {status === "loading" ? "Adding..." : "Add to cart"}
    </Button>
  );
}
