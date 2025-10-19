"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background-secondary w-full h-screen-minus-header flex flex-col justify-center items-center gap-2">
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="text-sm text-center max-w-sm">
        An unexpected error occurred while loading this page. You can try again below.
      </p>
      <button
        className="w-fit text-sm bg-red-500 text-white py-2 px-6 rounded-md cursor-pointer"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
