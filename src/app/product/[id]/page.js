"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Import Swiper styles
import "swiper/css";

import CustomImage from "@/components/ui/CustomImage";
import LoadingIcon from "@/components/ui/loadingIcon/LoadingIcon";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import apiClient from "@/services/apiClient";
import ProductSwiper from "@/components/product/ProductSwiper";
import { productSpecificFields } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { currency } from "@/lib/constants";
import { setCartItems } from "@/redux/slices/cartItemsModalSlice";
import { openAuthModal } from "@/redux/slices/authModalSlice";

function Skeleton() {
  return (
    <>
      <section className="flex items-center justify-center h-[50vh] md:h-full">
        <LoadingIcon />
      </section>
      <section className="py-2 px-2 md:px-4 flex flex-col gap-2 bg-background">
        <div className="w-fit skeleton">Loadibg...: Loadibg...</div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl skeleton">
            Loadibg...
            <br />
            Loadibg...
          </div>

          <div className="text-sm skeleton">
            Loadibg...
            <br />
            Loadibg...
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-fit skeleton">Loadibg...: Loadibg...</div>
          <div className="w-fit skeleton">Loadibg...: Loadibg...</div>
        </div>

        <div className="w-fit skeleton">Loadibg...: Loadibg...</div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl skeleton">
            Loadibg...
            <br />
            Loadibg...
          </div>

          <div className="text-sm skeleton">
            Loadibg...
            <br />
            Loadibg...
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div className="w-fit skeleton">Loadibg...: Loadibg...</div>
          <div className="w-fit skeleton">Loadibg...: Loadibg...</div>
        </div>

        <div className="w-fit skeleton">Loadibg...: Loadibg...</div>

        <div className="flex flex-col gap-1">
          <div className="text-2xl skeleton">
            Loadibg...
            <br />
            Loadibg...
          </div>

          <div className="text-sm skeleton">
            Loadibg...
            <br />
            Loadibg...
          </div>
        </div>
      </section>
    </>
  );
}

function Slider({ images, productId, isFavorite }) {
  const mainSwiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.swiper.slideTo(index);
      setActiveIndex(index);
    }
  };

  const handleMainSlideChange = (swiper) => {
    const index = swiper.activeIndex;
    setActiveIndex(index);

    const thumbsSwiper = thumbsSwiperRef.current?.swiper;
    if (thumbsSwiper) {
      const perView = 5;
      const group = Math.floor(index / perView);
      thumbsSwiper.slideTo(group * perView);
    }
  };

  return (
    <section className={`relative md:sticky top-0 md:top-[calc(75.63px+24px)] h-fit grid grid-cols-[15%_calc(85%-8px)] gap-2`}>
      <div className="absolute top-0 left-0 w-[15%] h-full">
        <Swiper
          ref={thumbsSwiperRef}
          direction="vertical"
          slidesPerView={5}
          slidesPerGroup={1}
          loop={false}
          className="h-full"
        >
          {images.map((srcImage, i) => {
            const active = activeIndex === i;
            return (
              <SwiperSlide
                key={i}
                className="cursor-pointer"
                onClick={() => handleImageClick(i)}
              >
                <CustomImage
                  src={srcImage}
                  fallback="/images/product-placeholder.png"
                  width={500}
                  height={690}
                  alt="Product image"
                  className={`bg-background rounded-md shadow-md ${
                    active ? "border-2 border-primary" : "border border-border"
                  }`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div />
      <div className="bg-background border border-border rounded-md shadow-md overflow-hidden">
        <Swiper
          ref={mainSwiperRef}
          onSlideChange={handleMainSlideChange}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={false}
          className="group/mySwiper"
        >
          {images.map((srcImage, i) => {
            return (
              <SwiperSlide key={i}>
                <CustomImage
                  src={srcImage}
                  fallback="/images/product-placeholder.png"
                  width={500}
                  height={690}
                  alt="Product image"
                  className="w-full"
                />
              </SwiperSlide>
            );
          })}

          {/* Favorite button */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton productId={productId} isFavorite={isFavorite} />
          </div>

          {/* Custom buttons */}
          <div
            className={`custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer opacity-0 group-hover/mySwiper:opacity-100 transition-opacity duration-300 select-none ${
              activeIndex === 0 ? "hidden" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div
            className={`custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer opacity-0 group-hover/mySwiper:opacity-100 transition-opacity duration-300 select-none ${
              activeIndex === images.length - 1 ? "hidden" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

function ProductDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = useMemo(() => description.trim().split(/\s+/), [description]);

  const shortDescription = useMemo(() => {
    const limit = 32;
    if (words.length <= limit) return description;
    return words.slice(0, limit).join(" ") + "...";
  }, [words, description]);

  const shouldShowToggle = words.length > 32;

  return (
    <div>
      <p className="text-muted-foreground">
        {isExpanded ? description : shortDescription}
      </p>

      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-primary font-medium cursor-pointer hover:underline self-start"
        >
          {isExpanded ? "Show Less" : "Learn More"}
        </button>
      )}
    </div>
  );
}

function Informations({ informations }) {
  const {
    _id,
    category,
    title,
    description,
    ratingsAverage,
    ratingsQuantity,
    sizes,
    size,
    quantity,
    price,
    priceBeforeDiscount,
    discountPercent,
    sold,
    brand,
    color,
    group,
  } = informations;

  const searchParams = useSearchParams();
  const urlSize = searchParams.get("size");

  const format = (num) => num.toFixed(2).replace(".", ",");

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authModal);

  const [sizesList, setSizesList] = useState(sizes || []);
  const [sizesInfo, setSizesInfo] = useState({});
  const [checkedSize, setCheckedSize] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [qty, setQty] = useState(1);

  const [shoppingCart, setShoppinCart] = useState({
    status: "idle",
    data: null,
  });

  // ------------------------------------------
  // Initialize sizesInfo (default or selected)
  // ------------------------------------------
  useEffect(() => {
    const hasSizes = sizes.length > 0;

    if (!hasSizes) {
      setSizesInfo({
        size,
        quantity,
        price: format(price),
        ...(priceBeforeDiscount && {
          priceBeforeDiscount: format(priceBeforeDiscount),
        }),
        discountPercent,
      });

      setCheckedSize(true);
      return;
    }

    const matchUrlSize = sizes.find((i) => i.size === urlSize);
    const matchDefault = sizes.find((i) => i.size === size);
    let found = matchUrlSize || matchDefault || sizes[0];
    setCheckedSize(Boolean(matchUrlSize));

    setSizesInfo({
      ...found,
      price: format(found.price),
      ...(found.priceBeforeDiscount && {
        priceBeforeDiscount: format(found.priceBeforeDiscount),
      }),
    });
  }, [discountPercent, price, priceBeforeDiscount, quantity, size, sizes, urlSize]);

  // ------------------------------------------
  // Qty Handlers
  // ------------------------------------------
  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrease = () => {
    if (qty < sizesInfo.quantity) setQty(qty + 1);
  };

  // ------------------------------------------
  // Add to cart
  // ------------------------------------------
  const addProductToCart = async (data) => {
    setShoppinCart((prev) => ({ ...prev, status: "loading" }));

    try {
      const res = await apiClient.post("/customer/shopping-cart", data);

      setShoppinCart({ status: "succeeded", data: res.data });

      const deductedQty = data.quantity;

      setSizesInfo((prev) => ({
        ...prev,
        quantity: prev.quantity - deductedQty,
      }));

      const updatedList = sizesList.map((item) => {
        const active = item._id === sizesInfo._id;
        return {
          ...item,
          quantity: active ? item.quantity - deductedQty : item.quantity,
        };
      });

      setSizesList(updatedList);

      setQty(1);

      dispatch(setCartItems(res.data?.data?.cartItems || []));
    } catch (err) {
      setShoppinCart({
        status: "failed",
        data: err?.response?.data || {
          status: "failed",
          message: "Something went wrong. Please try again.",
        },
      });
    }
  };

  return (
    <section className="relative h-fit py-2 px-2 md:px-4 flex flex-col gap-2 bg-background shadow-md border border-border rounded-md overflow-hidden">
      {shoppingCart.status === "loading" && (
        <div className="absolute z-20 top-0 left-0 w-full h-full cursor-wait" />
      )}

      {category?.name && (
        <section>
          <p>
            Category: <span className="font-medium">{category.name}</span>
          </p>
        </section>
      )}

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <ProductDescription description={description} />
      </div>

      <div className="flex items-center gap-1">
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, i) => {
              const active = i + 1 <= ratingsAverage;
              return (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    active ? "text-yellow-500" : "text-text"
                  } ms-1`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              );
            })}
        </div>

        <p className="text-sm">
          (<span className="font-medium">{ratingsQuantity}</span> reviews)
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          {sizesInfo.priceBeforeDiscount && (
            <del className="text-red-500">
              {sizesInfo.priceBeforeDiscount} {currency}
            </del>
          )}
          {sizesInfo.discountPercent && (
            <span className="text-sm font-semibold text-green-600 bg-green-100 p-1 rounded-sm">
              {sizesInfo.discountPercent}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          <span className="text-2xl font-semibold text-primary">
            {sizesInfo.price}
          </span>
          <span className="text-primary font-bold">{currency}</span>
        </div>
      </div>

      <div className=" flex flex-col md:flex-row gap-2 p-2 bg-background-secondary rounded-md">
        <div className="text-sm flex items-center gap-1">
          {sizesInfo.quantity === 0 ? (
            <p className="text-sm font-semibold text-red-600 bg-red-100 p-1 rounded-sm">
              Out of stock
            </p>
          ) : sizesInfo.quantity >= 1 && sizesInfo.quantity <= 12 ? (
            <p className="text-sm font-semibold text-orange-600 bg-orange-100 p-1 rounded-sm">
              Only <span className="font-medium">{sizesInfo.quantity}</span>{" "}
              left n stock
            </p>
          ) : (
            <>
              <LocalShippingIcon className="text-primary" fontSize="small" />
              <p>
                <span className="font-medium">{sizesInfo.quantity}</span> units
                stock
              </p>
            </>
          )}
        </div>
        <div className="hidden md:block">|</div>
        <div className="text-sm flex items-center gap-1">
          <MonetizationOnIcon className="text-primary" fontSize="small" />
          <p>
            Total sales: <span className="font-medium">${sold}</span>
          </p>
        </div>
      </div>

      <div className="flex gap-1">
        {brand?.name && (
          <section>
            <p>
              Brand: <span className="font-medium">{brand.name}</span>
            </p>
          </section>
        )}

        {color && (
          <section>
            <p>
              Color: <span className="font-medium">{color}</span>
            </p>
          </section>
        )}
      </div>

      {group?.productsIDs.length > 0 && (
        <div className="flex flex-wrap gap-2 py-4">
          {group.productsIDs.map((item, i) => {
            const active = item._id === _id;

            return (
              <Link href={`/product/${item._id}`} key={i}>
                <div
                  className={`w-24 overflow-hidden rounded-sm shadow-sm cursor-pointer hover-scale ${
                    active ? "border-2 border-primary" : "border border-border"
                  }`}
                >
                  <CustomImage
                    src={item.imageCover || ""}
                    fallback="/images/product-placeholder.png"
                    width={500}
                    height={690}
                    alt="Product image"
                    priority
                    className="w-full bg-background-secondary"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {sizesList.length > 0 && (
        <div>
          <div>
            <h1 className="font-semibold">Sizes:</h1>
            {sizeError && (
              <p className="text-sm text-red-500">Please select a size.</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 py-2">
            {sizesList.map((item, i) => {
              const active = item.size === sizesInfo.size && checkedSize;

              return (
                <div
                  key={i}
                  onClick={() => {
                    setSizesInfo({
                      ...item,
                      price: format(item.price),
                      ...(item.priceBeforeDiscount && {
                        priceBeforeDiscount: format(item.priceBeforeDiscount),
                      }),
                    });

                    setCheckedSize(true);

                    setQty(1);

                    setSizeError(false);
                  }}
                  className={`px-4 py-2 font-semibold bg-background-secondary rounded-sm shadow cursor-pointer hover:bg-background-tertiary hover-scale border ${
                    active
                      ? "border-primary"
                      : sizeError
                      ? "border-red-500"
                      : "border-border"
                  } `}
                >
                  {item.size}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h1 className="font-semibold">Quantity</h1>
        <div className="flex gap-1 py-2">
          <div className="flex items-center gap-1 w-fit p-1 border border-border rounded-sm shadow-md">
            <button
              onClick={handleDecrease}
              className="py-2 px-3 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary"
            >
              <RemoveIcon fontSize="small" />
            </button>

            <div className="text-sm py-2 px-4 flex items-center border border-border rounded-sm select-none">
              {qty}
            </div>

            <button
              onClick={handleIncrease}
              className="py-2 px-3 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary"
            >
              <AddIcon fontSize="small" />
            </button>
          </div>

          <Button
            disabled={sizesInfo.quantity === 0}
            onClick={() => {
              if (isAuthenticated) {
                if (!checkedSize) {
                  setSizeError(true);
                  return;
                }

                const { size } = sizesInfo;

                addProductToCart({
                  productId: _id,
                  quantity: qty,
                  size,
                });
              } else dispatch(openAuthModal());
            }}
            className="flex-grow"
          >
            {shoppingCart.status === "loading" ? "Adding..." : "Add to cart"}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState({
    status: "idle",
    data: null,
  });

  useEffect(() => {
    const getProduct = async () => {
      setProduct({
        ...product,
        status: "loading",
      });

      try {
        const res = await apiClient.get(`/products/${productId}`);
        setProduct({
          status: "succeeded",
          data: res.data.data,
        });
      } catch (err) {
        setProduct({
          status: "failed",
          data: err.response?.data || {
            status: "fail",
            message: "Something went wrong. Please try again.",
          },
        });
      }
    };

    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (product.status === "idle" || product.status === "loading") {
    return (
      <div className="bg-background-secondary">
        <div className="container">
          <div className="py-3 md:py-6 grid grid-cols-1 md:grid-cols-[50%_auto] lg:grid-cols-[40%_auto] gap-2">
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  if (product.status === "succeeded") {
    const productImages = [product.data.imageCover, ...product.data.images];

    const productInformations = {
      _id: product.data._id,
      title: product.data.title,
      description: product.data.description,

      price: product.data.price,
      priceBeforeDiscount: product.data.priceBeforeDiscount,
      discountPercent: product.data.discountPercent,

      color: product.data.color,
      quantity: product.data.quantity,
      size: product.data.size,
      sizes: product.data.sizes || [],
      group: product.data.group,

      category: product.data.category,
      brand: product.data.brand,

      sold: product.data.sold,

      ratingsAverage: product.data.ratingsAverage,
      ratingsQuantity: product.data.ratingsQuantity,
    };

    const relations = {
      category: product.data?.category?._id,
      subCategories: product.data?.subCategories,
      underSubCategories: product.data?.underSubCategories,
      brand: product.data?.brand?._id,
    };

    return (
      <div className="bg-background-secondary">
        <div className="container">
          <div className="py-3 md:py-6 grid grid-cols-1 md:grid-cols-[50%_auto] lg:grid-cols-[40%_auto] gap-2">
            <Slider
              images={productImages}
              productId={product.data._id}
              isFavorite={product.data.isFavorite}
            />
            <Informations informations={productInformations} />
          </div>
        </div>
        <ProductSwiper
          title={"Related products"}
          params={{
            page: "1",
            limit: "20",
            sort: "-sold,-ratingsAverage",
            fields: productSpecificFields,
            ...relations,
          }}
        />
      </div>
    );
  }

  if (product.status === "failed") {
    throw product;
  }
}
