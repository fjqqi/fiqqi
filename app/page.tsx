"use client";

import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
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
  const mainRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const contentSheetRef = useRef<HTMLDivElement>(null);

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

  /* ═══════════════════════════════════════════════
     Hero Depth Parallax (Pure Lenis momentum)
     ═══════════════════════════════════════════════ */
  useLenis(({ scroll }) => {
    const heroInner = heroInnerRef.current;
    if (!heroInner) return;

    const vh = window.innerHeight || 1;
    const progress = Math.min(Math.max(scroll / (vh * 0.85), 0), 1);

    const scale = 1 - progress * 0.1; // 1.0 -> 0.9
    const opacity = 1 - progress * 0.8; // 1.0 -> 0.2
    const y = progress * 50; // 0 -> 50px

    heroInner.style.transform = `scale3d(${scale}, ${scale}, 1) translate3d(0, ${y}px, 0)`;
    heroInner.style.opacity = `${opacity}`;
  });

  /* ═══════════════════════════════════════════════
     Scroll Reveal Observer (Native Performance)
     ═══════════════════════════════════════════════ */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-slide-left, .reveal-slide-right"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mainRef} className="grid-paper relative">
      {/* Dark mode toggle */}
      <button
        className="fixed top-6 right-6 z-[100] w-11 h-11 rounded-full border-[1.5px] border-pill-border bg-card backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-300 text-foreground text-xl p-0 hover:scale-110 hover:border-primary hover:shadow-[0_4px_16px_rgba(29,185,84,0.2)]"
        onClick={toggleDark}
        aria-label="Toggle dark mode"
        id="dark-mode-toggle"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Sticky nav */}
      <StickyNav />

      {/* Grid canvas behind everything */}
      <GridCanvas />

      {/* Cursor-following green glow */}
      <CursorGlow />

      {/* ═══ PINNED HERO (Sticky native pinning) ═══ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-[1]">
        <div
          ref={heroInnerRef}
          className="w-full h-full will-change-transform"
        >
          <HeroSection />
        </div>
      </div>

      {/* ═══ OVERLAPPING CONTENT SHEET (Card Stack) ═══ */}
      <div
        ref={contentSheetRef}
        className="content-sheet relative z-20 bg-background rounded-t-[32px] md:rounded-t-[48px] border-t border-card-border"
      >
        {/* Grab handle indicator */}
        {/* <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-muted-light/30" />
        </div> */}

        {/* About (includes top Marquee on the screen) */}
        <AboutSection />

        {/* Projects (Lenis Horizontal Showcase) */}
        <ProjectsSection />

        {/* Contact + Footer */}
        <ContactSection />
      </div>
    </div>
  );
}
