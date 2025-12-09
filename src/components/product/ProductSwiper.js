"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import apiClient from "@/services/apiClient";
import ProductSwiperSkeleton from "./ProductSwiperSkeleton";
import ProductCard from "./ProductCard";

// Import Swiper styles
import "swiper/css";

export default function ProductSwiper({ title, params }) {
  const [columnsNumber, setColumnsNumber] = useState(null);
  const [products, setProducts] = useState({
    status: "idle",
    data: null,
  });

  useEffect(() => {
    const checkWindowWidth = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 768) return 2;
      if (window.innerWidth < 1024) return 3;
      if (window.innerWidth < 1280) return 4;
      return 5;
    };

    // set on mount
    setColumnsNumber(checkWindowWidth());

    // update on resize
    const handleResize = () => {
      setColumnsNumber(checkWindowWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      setProducts({
        ...products,
        status: "loading",
      });

      try {
        const res = await apiClient.get(`/products`, { params });

        setProducts({
          status: "succeeded",
          data: res.data.data,
        });
      } catch (err) {
        setProducts({
          status: "failed",
          data: err.response?.data || {
            status: "fail",
            message: "Something went wrong. Please try again.",
          },
        });
      }
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (products.status === "idle" || products.status === "loading") {
    return <ProductSwiperSkeleton title={title} />;
  }

  if (products.status === "succeeded") {
    return (
      <div className="bg-background py-6">
        <div className="container">
          <h1 className="text-2xl pb-3 font-medium capitalize">
            {title}
          </h1>

          {columnsNumber && (
            <Swiper
              spaceBetween={8}
              slidesPerView={columnsNumber + 0.5}
              slidesPerGroup={columnsNumber}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation]}
              className="mySwiper group/mySwiper overflow-hidden"
            >
              {products.data.map((item) => (
                <SwiperSlide key={item._id}>
                  <ProductCard product={item} />
                </SwiperSlide>
              ))}

              {/* Custom buttons */}
              <div className="custom-prev absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 flex items-center justify-center rounded-full shadow-lg cursor-pointer opacity-0 group-hover/mySwiper:opacity-100 transition-opacity duration-300">
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

              <div className="custom-next absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 flex items-center justify-center rounded-full shadow-lg cursor-pointer opacity-0 group-hover/mySwiper:opacity-100 transition-opacity duration-300">
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
          )}
        </div>
      </div>
    );
  }

  if (products.status === "failed") {
    throw new Error("Failed to load products.");
  }
}
