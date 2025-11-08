"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import apiClient from "@/services/apiClient";
import CategorySwiperSkeleton from "./CategorySwiperSkeleton";
import CategoryCard from "./CategoryCard";

// Import Swiper styles
import "swiper/css";

export default function CategorySwiper({
  title,
  path,
  params,
  query = "category",
}) {
  const [columnsNumber, setColumnsNumber] = useState(null);
  const [categories, setCategories] = useState({
    status: "idle",
    data: null,
  });

  useEffect(() => {
    const checkWindowWidth = () => {
      if (window.innerWidth < 640) return 3;
      if (window.innerWidth < 768) return 4;
      if (window.innerWidth < 1024) return 5;
      if (window.innerWidth < 1280) return 7;
      return 9;
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
    setCategories({
      ...categories,
      status: "loading",
    });

    const getCategories = async () => {
      try {
        const res = await apiClient.get(path, { params });

        setCategories({
          status: "succeeded",
          data: res.data.data,
        });
      } catch (err) {
        setCategories({
          status: "failed",
          data: err.response?.data || {
            status: "fail",
            message: "Something went wrong. Please try again.",
          },
        });
      }
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (categories.status === "idle" || categories.status === "loading") {
    return <CategorySwiperSkeleton title={title} />;
  }

  if (categories.status === "succeeded" && categories.data.length > 0) {
    return (
      <div className="bg-background py-3 md:py-6">
        <div className="container">
          {title && (
            <h1 className="text-2xl mds:text-3xl pb-3 font-medium capitalize">
              {title}
            </h1>
          )}

          {columnsNumber && (
            <Swiper
              spaceBetween={0}
              slidesPerView={columnsNumber + 0.5}
              slidesPerGroup={columnsNumber}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation]}
              className="mySwiper group/mySwiper"
            >
              {categories.data.map((item) => (
                <SwiperSlide key={item._id}>
                  <CategoryCard
                    category={{
                      id: item._id,
                      image: item.image,
                      name: item.name,
                      query,
                    }}
                  />
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

  if (categories.status === "failed") {
    throw categories;
  }
}
