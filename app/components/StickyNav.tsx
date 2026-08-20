"use client";

import { useState, useEffect } from "react";
import { navLinks } from "../data";

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
      if (window.scrollY <= 80) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-6 right-[4.5rem] z-[100] flex items-center gap-2 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      {/* ── Desktop: always-visible pill with links ── */}
      <div className="hidden md:flex items-center gap-1 bg-card backdrop-blur-xl border-[1.5px] border-pill-border rounded-full px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="px-4 py-1.5 rounded-full text-sm font-semibold text-foreground no-underline transition-all duration-200 hover:bg-primary hover:text-white hover:scale-105"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* ── Mobile: hamburger + expandable pill ── */}
      <div className="flex md:hidden items-center gap-2">
        {/* Expanded links pill */}
        <div
          className={`flex items-center gap-1 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            open ? "max-w-[280px] opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-1 bg-card backdrop-blur-xl border-[1.5px] border-pill-border rounded-full px-2 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold text-foreground no-underline transition-all duration-200 hover:bg-primary hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Hamburger / Close button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          id="sticky-nav-toggle"
          className="w-11 h-11 rounded-full border-[1.5px] border-pill-border bg-card backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-300 text-foreground hover:scale-110 hover:border-primary hover:shadow-[0_4px_16px_rgba(29,185,84,0.2)]"
        >
          <span className="relative w-5 h-5 flex flex-col items-center justify-center gap-[5px]">
            <span className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${open ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
            <span className={`block h-[2px] rounded-full bg-current transition-all duration-300 ${open ? "w-0 opacity-0" : "w-3.5"}`} />
            <span className={`block h-[2px] rounded-full bg-current transition-all duration-300 origin-center ${open ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
          </span>
        </button>
      </div>
    </div>
  );
}
