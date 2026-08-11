"use client";

import { useState, useEffect } from "react";
import GridCanvas from "./components/GridCanvas";
import { SunIcon, MoonIcon } from "./components/Icons";
import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import SpotifyRecentlyPlayed from "./components/SpotifyRecentlyPlayed";

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
        className="dark-toggle"
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        id="dark-mode-toggle"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Interactive grid canvas */}
      <GridCanvas />

      {/* Spotify recently played sidebar */}
      <SpotifyRecentlyPlayed />

      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
