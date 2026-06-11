"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-lg transition-transform hover:scale-110 active:scale-95"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
