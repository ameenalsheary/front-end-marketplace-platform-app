"use client";

import clsx from "clsx";

import CloseButton from "./CloseButton";

const transitionMap = {
  left: {
    open: "translate-x-0",
    closed: "-translate-x-full",
  },
  right: {
    open: "translate-x-0",
    closed: "translate-x-full",
  },
  top: {
    open: "translate-y-0",
    closed: "-translate-y-full",
  },
  bottom: {
    open: "translate-y-0",
    closed: "translate-y-full",
  },
  fade: {
    open: "scale-100 opacity-100",
    closed: "scale-95 opacity-0",
  },
}

const alignMap = {
  left: "items-center justify-start",
  center: "items-center justify-center",
  right: "items-center justify-end",
}

const widthMap = {
  sm: "md:w-96",
  md: "md:w-130",
  lg: "md:w-[48rem]",
}

export default function OverlayContainer({
  isOpen,
  title,
  onClose,
  children,
  transition = "fade",     // left | right | top | bottom | fade
  align = "center",        // left | center | right
  width = "md",            // sm | md | lg
}) {
  const t = transitionMap[transition]

  return (
    <div
      className={clsx(
        "px-3 fixed flex inset-0 z-10 bg-overlay backdrop-blur-sm transition-all",
        alignMap[align],
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          "w-full p-3 bg-background rounded-md shadow-md flex flex-col gap-3",
          widthMap[width],
          isOpen ? t.open : t.closed
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {title}
          </h1>
          <CloseButton onClick={onClose} />
        </div>

        {children}
      </div>
    </div>
  )
}
