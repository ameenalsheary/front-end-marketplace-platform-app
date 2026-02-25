"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';

import apiClient from "@/services/apiClient";
import CustomImage from "@/components/ui/CustomImage";
import Input from "@/components/ui/Input";
import LoadingOverlay from "@/components/ui/LoadingIcon";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utilities/formatPrice";
import { currency } from "@/lib/constants";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import SuccessReactConfetti from "@/components/ui/SuccessReactConfetti";
import CheckOutSidebar from "@/components/sidebars/CheckOutSidebar";

function ItemCard({ item, updateItemQuantity, removeItem }) {
  const {
    _id,
    title,
    imageCover,
    productQuantity,
    itemQuantity,
    size,
    color,
    price,
    totalPrice
  } = item;

  const href = size ? `/product/${_id}?size=${size}` : `/product/${_id}`;

  const des = [
    itemQuantity !== undefined && `Quantity: ${itemQuantity}`,
    price !== undefined && `Price: ${formatPrice(price)}`,
    size !== undefined && `Size: ${String(size).toUpperCase()}`,
    color !== undefined && `Color: ${color}`,
  ].filter(Boolean).join(" / ");

  const [quantityControl, setQuantityControl] = useState(itemQuantity);
  const quantityRef = useRef(itemQuantity); // Store the current quantity
  const debounceTimeout = useRef(null); // Reference for timeout

  // Update quantity with debounce
  useEffect(() => {
    if (quantityRef.current !== quantityControl) {
      // Clear previous timeout
      clearTimeout(debounceTimeout.current);

      // Set a new timeout
      debounceTimeout.current = setTimeout(() => {
        updateItemQuantity({
          productId: _id,
          size,
          quantity: quantityControl,
        });
        quantityRef.current = quantityControl; // Update the reference
      }, 500);
    }

    // Cleanup timeout on component unmount or re-render
    return () => clearTimeout(debounceTimeout.current);
  }, [quantityControl, _id, size, updateItemQuantity]);

  const incrementQuantity = () => {
    if (quantityControl < productQuantity + itemQuantity) {
      setQuantityControl((prevQuantity) => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantityControl > 1) {
      setQuantityControl((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-1.5 bg-background shadow-md rounded-md overflow-hidden group">
      <div className="w-26 md:w-30">
        <Link href={href}>
          <CustomImage
            src={imageCover}
            fallback="/images/product-placeholder.png"
            width={500}
            height={690}
            alt={"Product image"}
            priority
            className="w-full bg-background-secondary"
          />
        </Link>
      </div>

      <div className="p-1.5 flex flex-col gap-1.5">
        <Link href={href}>
          <h1 className="w-[calc(100%-24px)] font-semibold line-clamp-1 group-hover:text-primary group-hover:underline cursor-pointer">
            {title}
          </h1>
        </Link>

        <p className="text-sm line-clamp-1">
          {des}
        </p>

        <p className="text-lg font-semibold text-primary">
          {formatPrice(totalPrice)} {currency}
        </p>

        <div className="mt-auto self-end flex items-center gap-0.5 w-fit p-0.5 border border-border rounded-sm">
          <button
            className="p-1 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary"
            onClick={() => decrementQuantity()}
          >
            <RemoveIcon fontSize="small" />
          </button>

          <div className="text-sm py-1 px-3 flex items-center border border-border rounded-sm select-none">
            {quantityControl}
          </div>

          <button
            className="p-1 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary"
            onClick={() => incrementQuantity()}
          >
            <AddIcon fontSize="small" />
          </button>
        </div>

        <button
          className="absolute top-1.5 right-1.5 bg-background cursor-pointer hover-scale"
          onClick={() => removeItem({ productId: _id, size })}
        >
          <DeleteIcon className="text-error" />
        </button>
      </div>
    </div>
  )
}

function OrderSummary({ pricing, coupon, applyCoupon }) {
  const { taxPrice, shippingPrice, totalPrice, totalPriceAfterDiscount } = pricing;
  const { couponCode, couponDiscount, discountedAmount } = coupon;
  const couponApplied = Boolean(couponCode);

  return (
    <div className="relative grid gap-3 p-1.5 bg-background rounded-md shadow-md">
      {
        !couponApplied && (
          <>
            <h1 className="font-semibold text-lg">
              APPLY COUPON
            </h1>

            <Formik
              initialValues={{ couponCode: "" }}
              validationSchema={Yup.object({
                couponCode: Yup.string()
                  .required("Coupon code is required")
                  .min(3, "Coupon code must be at least 3 characters")
                  .max(32, "Coupon code cannot exceed 32 characters"),
              })}
              onSubmit={({ couponCode }) => applyCoupon({ couponCode })}
            >
              {({ isSubmitting, values, handleChange, errors, touched }) => (
                <Form>
                  <LoadingOverlay show={isSubmitting} />

                  <div className="grid gap-1.5">
                    <Input
                      name="couponCode"
                      placeholder="Coupon code"
                      size="small"
                      value={values.couponCode}
                      onChange={handleChange}
                      error={touched.couponCode && !!errors.couponCode}
                      errorText={touched.couponCode && errors.couponCode}
                    />

                    <Button
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )
      }

      <h1 className="font-semibold text-lg">
        ORDER SUMMARY
      </h1>

      <div className="grid gap-1.5">
        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Tax Price:
          </span>
          <span className="font-semibold text-primary">
            {taxPrice} {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Shipping Price:
          </span>
          <span className="font-semibold text-primary">
            {shippingPrice} {currency}
          </span>
        </div>

        <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
          <span>
            Total Price:
          </span>
          {
            couponApplied ? (
              <del className="font-semibold text-error">
                {totalPrice} {currency}
              </del>) : (
              <span className="font-semibold text-primary">
                {totalPrice} {currency}
              </span>)
          }
        </div>

        {
          couponApplied && (
            <>
              <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                <span>
                  Price After Discount:
                </span>
                <span className="font-semibold text-success">
                  {totalPriceAfterDiscount} {currency}
                </span>
              </div>

              <div className="w-full h-0.5 my-1.5 bg-primary" />

              <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                <span>
                  Coupon Code:
                </span>
                <span className="font-semibold text-primary">
                  {couponCode}
                </span>
              </div>

              <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                <span>
                  Coupon Discount:
                </span>
                <span className="font-semibold text-primary">
                  -{couponDiscount}{"%"}
                </span>
              </div>

              <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                <span>
                  Discounted Amount:
                </span>
                <span className="font-semibold text-primary">
                  -{discountedAmount} {currency}
                </span>
              </div>
            </>
          )
        }

        <CheckOutSidebar />
      </div>
    </div >
  )
}

const getProductQuantity = (shoppingCartItem) => {
  if (shoppingCartItem.product.sizes.length > 0) {
    const size = shoppingCartItem.product.sizes.filter(
      (item) => item.size === shoppingCartItem.size
    );

    return size[0].quantity;
  } else {
    return shoppingCartItem.product.quantity;
  }
};

export default function ShoppingCartPage() {
  const [shoppingCart, setShoppinCart] = useState({
    status: "idle",
    data: null,
  });

  const setLoading = () =>
    setShoppinCart((prev) => ({ ...prev, status: "loading" }));

  const setSuccess = (data) =>
    setShoppinCart({ status: "succeeded", data });

  const setError = (err) =>
    setShoppinCart({
      status: "failed",
      data:
        err?.response?.data || {
          status: "failed",
          message: "Something went wrong. Please try again.",
        },
    });

  // ---------------------------
  // Fetch Shopping Cart
  // ---------------------------
  const getShoppingCart = async () => {
    setLoading();
    try {
      const res = await apiClient.get("/customer/shopping-cart");
      setSuccess(res.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getShoppingCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------
  // Update Quantity
  // ---------------------------
  const updateItemQuantity = async (data) => {
    setLoading();
    try {
      const res = await apiClient.put("/customer/shopping-cart", data);
      setSuccess(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // ---------------------------
  // Remove Item
  // ---------------------------
  const removeItem = async (data) => {
    setLoading();
    try {
      const res = await apiClient.delete("/customer/shopping-cart", { data });
      setSuccess(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // ---------------------------
  // Apply Coupon
  // ---------------------------
  const applyCoupon = async (data) => {
    try {
      const res = await apiClient.put(
        "/customer/shopping-cart/apply-coupon",
        data
      );
      setSuccess(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // ---------------------------
  // Loading
  // ---------------------------
  if (shoppingCart.status === "idle" || shoppingCart.status === "loading") {
    return (
      <div className="min-h-screen-minus-header bg-background-secondary">
        <div className="container">
          <div className="py-3 lg:py-6">
            <h1 className="text-2xl pb-3 font-medium capitalize">
              Shopping cart
            </h1>

            <div className="grid lg:grid-cols-[65%_35%] xl:grid-cols-[70%_30%] gap-3">
              <div className="flex flex-col gap-3">
                {
                  Array(3).fill(0).map((_, i) => {
                    return (
                      <div key={i} className="grid grid-cols-[auto_1fr] bg-background rounded-md">
                        <div className="w-26 h-[137.78px] md:w-30 md:h-[159.66px] skeleton" />

                        <div className="p-1.5 flex flex-col gap-1.5">
                          <h1 className="w-[calc(100%-24px)] skeleton">
                            {"Loading..."}
                          </h1>

                          <p className="w-[60%] text-sm skeleton">
                            {"Loading..."}
                          </p>

                          <p className="w-fit text-lg skeleton">
                            {"Loading..."}
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div className={`sticky top-0 lg:top-[calc(75.63px+12px)] h-fit`}>
                <div className="grid gap-3 p-1.5 bg-background rounded-md">
                  <h1 className="font-semibold text-lg">
                    ORDER SUMMARY
                  </h1>

                  <div className="grid gap-1.5">
                    <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                      <span>
                        Tax Price:
                      </span>
                      <span className="skeleton">
                        {"Loading..."}
                      </span>
                    </div>

                    <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                      <span>
                        Shipping Price:
                      </span>
                      <span className="skeleton">
                        {"Loading..."}
                      </span>
                    </div>

                    <div className="p-1.5 text-sm flex justify-between bg-background-secondary rounded-sm shadow-sm border border-border">
                      <span>
                        Total Price
                      </span>
                      <span className="skeleton">
                        {"Loading..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div >
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------
  // Empty Cart
  // ---------------------------
  if (
    shoppingCart.status === "succeeded" &&
    shoppingCart.data?.data?.cartItems.length === 0
  ) {
    return (
      <div className="bg-background-secondary">
        <div className="container">
          <div className="w-full h-screen-minus-header flex flex-col justify-center items-center gap-2">
            <ErrorDisplay
              srcImage="/images/empty-cart.png"
              error="Your shopping cart is empty."
              description="Looks like you haven't added any items to your cart yet. Start shopping now and fill it with your favorite products!"
              buttonText="Back to home page"
              ButtonVariant="primary"
              eventHandler="GO_TO"
              href="/"
            />
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------
  // Success – Has Items
  // ---------------------------
  if (
    shoppingCart.status === "succeeded" &&
    shoppingCart.data?.data?.cartItems.length > 0
  ) {
    const cartItems = shoppingCart.data?.data?.cartItems.map((item) => {
      return {
        _id: item.product._id,
        title: item.product.title,
        imageCover: item.product.imageCover,
        productQuantity: getProductQuantity(item),
        itemQuantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.price,
        totalPrice: item.totalPrice,
      };
    });

    const pricingRaw = shoppingCart.data?.data?.pricing;
    const couponRaw = shoppingCart.data?.data?.coupon;

    const pricing = {
      taxPrice: formatPrice(pricingRaw?.taxPrice),
      shippingPrice: formatPrice(pricingRaw?.shippingPrice),
      totalPrice: formatPrice(pricingRaw?.totalPrice),
      totalPriceAfterDiscount: formatPrice(pricingRaw?.totalPriceAfterDiscount),
    };

    const coupon = {
      couponCode: couponRaw?.couponCode,
      couponDiscount: couponRaw?.couponDiscount,
      discountedAmount: formatPrice(couponRaw?.discountedAmount),
    };

    return (
      <>
        {`${shoppingCart.data?.message}`.startsWith(
          "Price discount applied"
        ) && <SuccessReactConfetti />}

        <div className="min-h-screen-minus-header bg-background-secondary">
          <div className="container">
            <div className="py-3 lg:py-6">
              <h1 className="text-2xl pb-3 font-medium capitalize">
                Shopping cart
              </h1>

              <div className="grid lg:grid-cols-[65%_35%] xl:grid-cols-[70%_30%] gap-3">
                <div className="flex flex-col gap-3">
                  {
                    cartItems.map((item, i) => {
                      return (
                        <ItemCard
                          key={item._id + i}
                          item={item}
                          updateItemQuantity={updateItemQuantity}
                          removeItem={removeItem}
                        />
                      )
                    })
                  }
                </div>

                <div className={`h-fit`}>
                  <OrderSummary pricing={pricing} coupon={coupon} applyCoupon={applyCoupon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ---------------------------
  // Error
  // ---------------------------
  if (shoppingCart.status === "failed") {
    throw new Error("Failed to load shopping cart data");
  }
}
