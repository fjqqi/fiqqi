"use client";

import { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import GridCanvas from "./components/GridCanvas";
import { SunIcon, MoonIcon } from "./components/Icons";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import StackSection from "./components/sections/StackSection";
import StickyNav from "./components/StickyNav";
import CursorGlow from "./components/CursorGlow";
import ClientMarquee from "./components/ClientMarquee";
import TextMarquee from "./components/TextMarquee";
import SmoothCursor from "./components/SmoothCursor";

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

  const vhRef = useRef(typeof window !== "undefined" ? window.innerHeight : 800);
  useEffect(() => {
    const onResize = () => { vhRef.current = window.innerHeight; };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLenis(({ scroll }) => {
    const heroInner = heroInnerRef.current;
    if (!heroInner) return;

    const vh = vhRef.current;
    const progress = Math.min(Math.max(scroll / (vh * 0.75), 0), 1);
    // Smoothstep — fluid natural easing
    const ease = progress * progress * (3 - 2 * progress);

    const opacity = 1 - ease;
    const y = ease * 40;

    // Only translateY + opacity — no scale (avoids layout/paint triggers)
    heroInner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    heroInner.style.opacity = opacity.toFixed(3);
    heroInner.style.willChange = "transform, opacity";
    heroInner.style.visibility = progress >= 1 ? "hidden" : "visible";
    heroInner.style.pointerEvents = progress >= 0.85 ? "none" : "auto";
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

      {/* Smooth Dot + Ring Custom Cursor */}
      <SmoothCursor />

      {/* ═══ PINNED HERO (Sticky native pinning) ═══ */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-[1]">
        <div
          ref={heroInnerRef}
          className="w-full h-full"
          style={{ willChange: "transform, opacity" }}
        >
          <HeroSection />
        </div>
      </div>

      {/* ═══ OVERLAPPING CONTENT SHEET (Card Stack) ═══ */}

      <div
        ref={contentSheetRef}
        className="content-sheet -mt-18  border border-solid border-white/10 relative z-20 bg-background "
      >
        <TextMarquee />

        {/* Projects */}
        <ProjectsSection />
        <StackSection />
        {/* Stack & Skills */}


        {/* About (includes top Marquee on the screen) */}
        {/* <AboutSection /> */}
      </div>

      {/* ═══ CONTACT & FOOTER (Outside content sheet, on main page canvas) ═══ */}
      <div className="relative z-20 w-full">
        experience here
        <ContactSection />

      </div>
    </div>
  );
}
