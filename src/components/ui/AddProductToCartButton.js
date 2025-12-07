"use client";

import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";
import clsx from "clsx";

import { openAuthModal } from "@/redux/slices/authModalSlice";
import { setCartItems } from "@/redux/slices/cartItemsModalSlice";
import Button from "./Button";
import apiClient from "@/services/apiClient";

export default function AddProductToCartButton({ _id, quantity, size }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authModal);

  const [status, setStatus] = useState("idle");

  const addProductToCart = useCallback(async () => {
    setStatus("loading");

    try {
      const res = await apiClient.post("/customer/shopping-cart", {
        productId: _id,
        quantity: 1,
      });

      dispatch(setCartItems(res.data?.data?.cartItems || []));
      setStatus("succeeded");
    } catch (err) {
      setStatus("failed");
      toast.error("Something went wrong!");
    }
  }, [_id, dispatch]);

  // If sizes exist → no direct add-to-cart
  if (size) {
    return (
      <Link href={`/product/${_id}`}>
        <Button size="small" className="w-full" disabled={quantity === 0}>
          Add to cart
        </Button>
      </Link>
    );
  }

  const handleClick = () => {
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }

    addProductToCart();
  };

  const label =
    status === "loading"
      ? "Adding..."
      : status === "failed"
      ? "Failed! Retry"
      : "Add to cart";

  return (
    <Button
      size="small"
      className={clsx("w-full", {
        "cursor-wait": status === "loading",
      })}
      variant={status === "failed" ? "error" : "primary"}
      disabled={quantity === 0 || status === "loading"}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
