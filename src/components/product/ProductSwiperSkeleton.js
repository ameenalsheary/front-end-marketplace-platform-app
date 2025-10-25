"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCardSkeleton from "./ProductCardSkeleton";

// Import Swiper styles
import "swiper/css";

export default function ProductSwiperSkeleton(props) {
  const title = props.title;

  const [columnsNumber, setColumnsNumber] = useState(null);

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

  return (
    <div className="bg-background py-6">
      <div className="container">
        <h1 className="text-text text-2xl mds:text-3xl pb-6 font-medium capitalize">
          {title}
        </h1>

        {columnsNumber && (
          <Swiper
            spaceBetween={8}
            slidesPerView={columnsNumber + 0.5}
            slidesPerGroup={columnsNumber}
          >
            {Array(columnsNumber + 1)
              .fill(0)
              .map((_, i) => (
                <SwiperSlide key={i}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
