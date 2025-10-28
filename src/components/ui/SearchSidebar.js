"use client";

import { useState } from "react";
import clsx from "clsx";
import CloseButton from "./CloseButton";

export default function SearchSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Filter Button */}
      <div>
        <button
          className="font-semibold text-sm bg-background-tertiary p-2 border border-border rounded-sm shadow-sm cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Filter
        </button>
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
          "fixed top-0 left-0 w-full md:w-[320px] h-full bg-background p-3 flex flex-col gap-3 shadow-md z-20 transform transition-all",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <CloseButton onClick={() => setIsOpen(false)} />
        </div>

        {/* Filters go here */}
      </div>
    </>
  );
}
