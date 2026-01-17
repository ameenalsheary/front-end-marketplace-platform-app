"use client";

import clsx from "clsx";
import CloseButton from "./CloseButton";

const TRANSITIONS = {
  left: { open: "translate-x-0", closed: "-translate-x-full" },
  right: { open: "translate-x-0", closed: "translate-x-full" },
  fade: { open: "scale-100 opacity-100", closed: "scale-95 opacity-0" },
};

const WIDTHS = {
  sm: "md:w-96",
  md: "md:w-130",
  lg: "md:w-[48rem]",
};

export default function OverlayContainer({
  isOpen,
  title,
  onClose,
  children,
  transition = "fade", // left | right | fade
  width = "md",        // sm | md | lg
}) {
  const isLeft = transition === "left";
  const isRight = transition === "right";
  const isSidebar = isLeft || isRight;

  const { open, closed } = TRANSITIONS[transition] ?? TRANSITIONS.fade;

  const overlayLayout = isSidebar
    ? isLeft
      ? "items-stretch justify-start"
      : "items-stretch justify-end"
    : "px-3 items-center justify-center";

  const panelRadius = isSidebar
    ? isLeft
      ? "rounded-tr-md rounded-br-md"
      : "rounded-tl-md rounded-bl-md"
    : "rounded-md";

  return (
    <div
      onClick={onClose}
      className={clsx(
        "fixed inset-0 z-10 flex bg-overlay backdrop-blur-sm transition-all",
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
        overlayLayout
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "w-full p-3 flex flex-col gap-3 bg-background shadow-md transition-all",
          panelRadius,
          WIDTHS[width],
          isOpen ? open : closed
        )}
      >
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{title}</h1>
          <CloseButton onClick={onClose} />
        </header>

        {children}
      </div>
    </div>
  );
}
