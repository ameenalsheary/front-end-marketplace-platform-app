"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import res from "./categoriesData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CategorySwiper(props) {
  const title = props.title;

  const [columnsNumber, setColumnsNumber] = useState(null); // safe default

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

  return (
    <>
      <div className="bg-background-secondary py-6">
        <div className="container">
          <h1 className="text-text text-2xl mds:text-3xl pb-6 font-medium capitalize">
            {title}
          </h1>
          {columnsNumber && (
            <Swiper
              spaceBetween={0}
              slidesPerView={columnsNumber + 0.5}
              slidesPerGroup={columnsNumber}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation, Pagination]}
              className="mySwiper group/mySwiper"
            >
              {res.data.map((item, i) => (
                <SwiperSlide key={i + 1}>
                  <CategoryCard
                    category={{ image: item.image, name: item.name }}
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
      <div className="bg-background py-6">
        <div className="container">
          <h1 className="text-text text-2xl mds:text-3xl pb-6 font-medium capitalize">
            {title}
          </h1>
          {columnsNumber && (
            <Swiper
              spaceBetween={0}
              slidesPerView={columnsNumber + 0.5}
              slidesPerGroup={columnsNumber}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              modules={[Navigation, Pagination]}
              className="mySwiper group/mySwiper"
            >
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <SwiperSlide key={i + 1}>
                    <CategoryCardSkeleton />
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
