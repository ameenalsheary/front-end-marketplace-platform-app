"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background-secondary w-full h-full rounded-lg flex flex-col justify-center items-center gap-2">
      <button
        className="button bg-red-500 text-[#e5e5e5] py-2 px-12 rounded-md"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
