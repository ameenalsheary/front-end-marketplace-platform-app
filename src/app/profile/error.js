"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background w-full h-full px-2 rounded-lg shadow-sm flex flex-col justify-center items-center gap-2">
      <h1 className="text-center text-lg font-semibold">
        Something went wrong
      </h1>
      <p className="text-sm text-center max-w-sm">
        An unexpected error occurred while loading this page. You can try again
        below.
      </p>
      <button
        className="w-fit text-sm bg-red-500 text-white py-2 px-4 mt-1 rounded-md shadow-md cursor-pointer"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
