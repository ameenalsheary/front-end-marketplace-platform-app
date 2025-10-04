"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import CustomImage from "../ui/CustomImage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const images = [
  "images/1.svg",
  "images/2.svg",
  "images/3.svg",
  "images/4.svg",
  "images/5.svg",
  "images/6.svg",
  "images/7.svg",
  "images/8.svg",
];

export default function AdvertisementSwiper() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <CustomImage
                src={item}
                fallback="/images/advertisement-placeholder.svg"
                width={1440}
                height={250}
                alt="Advertisement"
                priority
                className="bg-background-secondary w-full"
              />
            </SwiperSlide>
          );
        })}
        {/* Custom buttons */}
        <div className="custom-prev absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 items-center justify-center rounded-full shadow-lg cursor-pointer hidden lg:flex">
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

        <div className="custom-next absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-background text-text w-10 h-10 items-center justify-center rounded-full shadow-lg cursor-pointer hidden lg:flex">
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
  );
}
