"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#upcoming", label: "Upcoming" },
  { href: "#today", label: "Today" },
  { href: "#groups", label: "Group Stage" },
  { href: "#knockout", label: "Knockout" },
  { href: "#venues", label: "Venues" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-md shadow-black/5"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="text-2xl">⚽</span>
          <span className="bg-gradient-to-r from-wc-green via-wc-gold to-wc-blue bg-clip-text text-transparent">
            WC 2026 Schedule
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-wc-green dark:text-slate-300 dark:hover:text-wc-gold"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-lg"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-4 mb-3 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-wc-green/10 dark:text-slate-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
