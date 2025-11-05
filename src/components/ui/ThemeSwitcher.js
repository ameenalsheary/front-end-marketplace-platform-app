"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const themes = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      {themes.map(({ label, value }) => (
        <label
          key={value}
          className={clsx(
            "flex-grow bg-background p-3 flex items-center gap-1 rounded-md shadow-sm hover:bg-background-tertiary transition-all cursor-pointer",
            theme === value && "bg-background-tertiary"
          )}
          onClick={() => setTheme(value)}
        >
          <input type="radio" name="theme" checked={theme === value} readOnly />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
