"use client";

import dynamic from "next/dynamic";

// Dynamically import the icon with SSR disabled
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"), {
  ssr: false,
  loading: () => <div className="w-6 h-6 skeleton rounded-full" />, // Fallback while loading
});

export default function CloseButton({ onClick, className }) {
  return (
    <button
      className={`text-red-500 cursor-pointer ${className || ""}`}
      onClick={onClick}
    >
      <CloseIcon />
    </button>
  );
}
