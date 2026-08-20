"use client";

import { useState, useEffect } from "react";
import GridCanvas from "./components/GridCanvas";
import { SunIcon, MoonIcon } from "./components/Icons";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import StickyNav from "./components/StickyNav";
import CursorGlow from "./components/CursorGlow";


export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <div className="grid-paper">
      {/* Dark mode toggle */}
      <button
        className="fixed top-6 right-6 z-[100] w-11 h-11 rounded-full border-[1.5px] border-pill-border bg-card backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-300 text-foreground text-xl p-0 hover:scale-110 hover:border-primary hover:shadow-[0_4px_16px_rgba(29,185,84,0.2)]"
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        id="dark-mode-toggle"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Sticky nav — appears on scroll beside dark mode toggle */}
      <StickyNav />

      {/* Interactive grid canvas */}
      <GridCanvas />

      {/* Cursor-following green glow */}
      <CursorGlow />

      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* Marquee — GPU layer promoted to avoid scroll jank */}
      <div className="relative z-30 mt-10 sm:-mt-60 md:-mt-80" style={{ willChange: "transform" }}>
        <MarqueeSection />
      </div>

      <div className="relative z-10 bg-background">
        <AboutSection />
      </div>

      <div className="relative z-10">
        <ProjectsSection />
      </div>

      <ContactSection />
    </div>
  );
}
