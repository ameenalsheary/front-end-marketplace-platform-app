"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

import CloseButton from "./CloseButton";
import Input from "./Input";
import Button from "./Button";

function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentMinPrice = searchParams.get("minPrice");
  const currentMaxPrice = searchParams.get("maxPrice");

  const [priceRange, setPriceRange] = useState({
    min: currentMinPrice || "",
    max: currentMaxPrice || "",
  });

  // Sync with URL changes
  useEffect(() => {
    setPriceRange({
      min: currentMinPrice || "",
      max: currentMaxPrice || "",
    });
  }, [currentMinPrice, currentMaxPrice]);

  const handlePriceChange = (field, value) => {
    if (value !== "" && Number(value) < 0) return;

    setPriceRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyPriceFilter = async () => {
    let { min, max } = priceRange;

    // Validate and swap if needed
    if (min && max && Number(min) > Number(max)) {
      [min, max] = [max, min];
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    min ? params.set("minPrice", min) : params.delete("minPrice");
    max ? params.set("maxPrice", max) : params.delete("maxPrice");

    router.push(`?${params.toString()}`);
  };

  const clearPriceFilter = async () => {
    const params = new URLSearchParams(searchParams);
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">Price Range</h3>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <Input
              id="minPrice"
              type="number"
              size="small"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              min="0"
            />
          </div>

          <span className="text-text">-</span>

          <div className="flex-1">
            <Input
              id="maxPrice"
              type="number"
              size="small"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            onClick={applyPriceFilter}
            variant="primary"
            size="small"
            className="w-full"
          >
            Apply
          </Button>

          <Button
            onClick={clearPriceFilter}
            variant="secondary"
            size="small"
            className="w-full"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

function RatingsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRatingChange = (rating) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentRating = Number(searchParams.get("rating"));

    if (currentRating === rating) {
      params.delete("rating");
    } else {
      params.set("rating", rating);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">Customer reviews</h3>

      <div className="flex flex-col gap-2">
        {Array(4)
          .fill(0)
          .map((_, i) => {
            const currentRating = Number(searchParams.get("rating"));
            const rating = 4 - i;

            return (
              <label
                key={i}
                onClick={() => handleRatingChange(rating)}
                className={clsx(
                  "bg-background-secondary p-1 flex items-center gap-1 rounded-md shadow-sm hover:bg-background-tertiary transition-all cursor-pointer",
                  currentRating === rating &&
                    "bg-background-tertiary border border-border"
                )}
              >
                <input
                  type="radio"
                  name="rating"
                  checked={currentRating === rating}
                  readOnly
                />

                <div className="flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => {
                      const active = j + 1 <= rating;

                      return (
                        <svg
                          key={j}
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

                {rating < 5 && <span className="text-sm">& Up</span>}
              </label>
            );
          })}
      </div>
    </div>
  );
}

export default function SearchSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Filter Button */}
      <div>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Filters
        </Button>
      </div>

      {/* Overlay */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-full h-full bg-overlay z-10 transition-all",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 w-full overflow-auto md:w-[320px] h-full bg-background p-3 flex flex-col gap-6 shadow-md z-20 transform transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <CloseButton onClick={() => setIsOpen(false)} />
        </div>

        <div className="flex flex-col gap-8">
          {/* Price Filter */}
          <PriceFilter />

          {/* Ratings Filter */}
          <RatingsFilter />
        </div>

        <Button
          className="absolute bottom-3 left-3 w-[calc(100%-24px)]"
          onClick={() => setIsOpen(false)}
        >
          Go
        </Button>
      </div>
    </>
  );
}
