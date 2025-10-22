"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// Import Swiper styles
import "swiper/css";

import CustomImage from "@/components/ui/CustomImage";

function Slider() {
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
    <section className="relative h-fit grid grid-cols-[15%_calc(85%-8px)] gap-2">
      <div className="absolute top-0 left-0 w-[15%] h-full">
        <Swiper
          ref={thumbsSwiperRef}
          direction="vertical"
          slidesPerView={5}
          slidesPerGroup={1}
          loop={false}
          className="h-full"
        >
          {Array(6)
            .fill(0)
            .map((_, i) => {
              const active = activeIndex === i;
              return (
                <SwiperSlide
                  key={i}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(i)}
                >
                  <CustomImage
                    src={""}
                    fallback="/images/product-placeholder.png"
                    width={500}
                    height={690}
                    alt=""
                    className={`bg-background rounded-md shadow-md ${
                      active
                        ? "border-2 border-primary"
                        : "border border-border"
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
          {Array(6)
            .fill(0)
            .map((_, i) => {
              return (
                <SwiperSlide key={i}>
                  <CustomImage
                    src={""}
                    fallback="/images/product-placeholder.png"
                    width={500}
                    height={690}
                    alt=""
                    className="w-full"
                  />
                </SwiperSlide>
              );
            })}

          {/* Custom buttons */}
          <div className="custom-prev absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer opacity-0 group-hover/mySwiper:opacity-100 transition-opacity duration-300">
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

          <div className="custom-next absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 flex items-center justify-center rounded-full shadow-md cursor-pointer opacity-0 group-hover/mySwiper:opacity-100 transition-opacity duration-300">
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

function Informations() {
  const [showMore, setShowMore] = useState(false);
  const text = `Your essential companion is now even more powerful. Introducing temperature sensing for deeper insights into women’s health. Crash Detection to get help in an emergency Sleep stages to better understand your sleep. And new ways to train using the enhanced Workout app. The future of health never looked so good. Smooth and seamless. The edge of design. Apple Watch Series 8 features a big, brilliant Always-On display. Narrow borders push the screen right to the edge, resulting in an elegant integration with the curvature of the case. Always-On Retina display. Take it all in. Get it all done. The bright Always-On screen makes detailed watch faces look stunning and easy to read, even when your wrist is down. The large display accommodates all your favorite complications and makes tapping, typing, and swiping a snap.`;

  return (
    <section className="py-2 px-2 md:px-4 flex flex-col gap-2 bg-background shadow-md border border-border rounded-md">
      <section>
        <p>
          Category: <span className="font-medium">electronics & mobiles</span>
        </p>
      </section>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">
          {
            "Watch Series 8 GPS + Cellular 45mm Silver Aluminium Case With White Sport Band"
          }
        </h1>

        <div>
          <p className="text-sm text-muted-foreground">
            {showMore ? text : text.split(" ").slice(0, 40).join(" ") + "..."}
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="text-primary font-medium cursor-pointer hover:underline self-start"
          >
            {showMore ? "Show Less" : "Learn More"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex">
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 ms-1 text-text"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>

        <p className="text-sm">
          (<span className="font-medium">1325</span> reviews)
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-primary">$150.00</span>
        <del className="text-red-500">$190.00</del>
        <span className="text-sm font-semibold text-green-600 bg-green-100 px-0.5 py-1 rounded-sm">
          30% OFF
        </span>
      </div>

      <div className=" flex flex-col md:flex-row gap-2 p-2 bg-background-secondary rounded-md">
        <div className="text-sm flex items-center gap-1">
          <LocalShippingIcon className="text-primary" fontSize="small" />
          <p>
            <span className="font-medium">1,512</span> units stock
          </p>
        </div>
        <div className="hidden md:block">|</div>
        <div className="text-sm flex items-center gap-1">
          <MonetizationOnIcon className="text-primary" fontSize="small" />
          <p>
            Total sales: <span className="font-medium">$45.225</span>
          </p>
        </div>
      </div>

      <section>
        <p>
          brand: <span className="font-medium">Apple</span>
        </p>
      </section>

      <div className="flex flex-wrap gap-2 py-4">
        {Array(6)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                className="w-24 overflow-hidden border border-border rounded-sm shadow-sm cursor-pointer hover-scale"
                key={i}
              >
                <CustomImage
                  src={""}
                  fallback="/images/product-placeholder.png"
                  width={500}
                  height={690}
                  alt=""
                  priority
                  className="w-full bg-background-secondary"
                />
              </div>
            );
          })}
      </div>

      <div>
        <h1 className="font-semibold">Sizes:</h1>
        <div className="flex flex-wrap gap-3 py-2">
          {["XS", "S", "M", "L", "XL", "XXL", "3Xl", "4XL"].map((item, I) => {
            return (
              <div
                className="px-4 py-2 font-semibold bg-background-secondary border border-border rounded-sm shadow cursor-pointer hover:bg-background-tertiary hover-scale"
                key={I}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h1 className="font-semibold">Quantity</h1>
        <div className="flex gap-1 py-2">
          <div className="flex items-center gap-1 w-fit p-1 border border-border rounded-sm shadow-md">
            <button className="py-2 px-3 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary">
              <RemoveIcon fontSize="small" />
            </button>
            <div className="text-sm py-2 px-4 flex items-center border border-border rounded-sm select-none">
              1
            </div>
            <button className="py-2 px-3 flex items-center rounded-sm cursor-pointer hover:bg-background-secondary active:bg-background-tertiary">
              <AddIcon fontSize="small" />
            </button>
          </div>
          <button className="text-center flex-grow bg-primary text-[#e5e5e5] font-semibold rounded-md shadow-md cursor-pointer">
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <div className="bg-background-secondary">
      <div className="container">
        <div className="py-4 md:py-6 grid grid-cols-1 md:grid-cols-[40%_auto] gap-2">
          <Slider />
          <Informations />
        </div>
      </div>
    </div>
  );
}
