"use client";

import { useEffect } from "react";

import ErrorDisplay from "@/components/ui/ErrorDisplay";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background-secondary w-full h-screen-minus-header flex flex-col justify-center items-center gap-2">
      <ErrorDisplay
        srcImage="/images/error.png"
        error="Something went wrong."
        description="An unexpected error occurred while loading this page. You can try again below."
        buttonText="Try again"
        onClick={() => reset()}
      />
    </div>
  );
}
