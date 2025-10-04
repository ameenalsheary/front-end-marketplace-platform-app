"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import CategoryCardSkeleton from "./CategoryCardSkeleton";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function CategorySwiperSkeleton(props) {
  const title = props.title;

  const [columnsNumber, setColumnsNumber] = useState(null);

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
    <div className="bg-background py-6 min-h-[258px]">
      <div className="container">
        <h1 className="text-text text-2xl mds:text-3xl pb-6 font-medium capitalize">
          {title}
        </h1>
        {columnsNumber && (
          <Swiper
            spaceBetween={0}
            slidesPerView={columnsNumber + 0.5}
            slidesPerGroup={columnsNumber}
          >
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <SwiperSlide key={i}>
                  <CategoryCardSkeleton />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
