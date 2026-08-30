"use client";

import { useRef, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "./Icons";
import { projects } from "../data";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const updateScroll = useCallback(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const rect = container.getBoundingClientRect();
    const totalScrollable = container.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    // ── 1. If section has NOT reached top of viewport yet, keep Card #1 at 0%
    if (rect.top > 0) {
      track.style.transform = "translate3d(0px, 0, 0)";
      if (progressBarRef.current) progressBarRef.current.style.width = "6%";
      if (progressTextRef.current) progressTextRef.current.textContent = `01 / 0${projects.length}`;
      return;
    }

    // ── 2. Section is pinned at top: 0 ──
    const scrolled = -rect.top;
    // Initial 60px hold so user sees Card #1 fully before horizontal panning begins
    const startHold = 60;
    const scrollRange = Math.max(1, totalScrollable - startHold);
    const effectiveScrolled = Math.max(0, scrolled - startHold);
    const progress = Math.min(Math.max(effectiveScrolled / scrollRange, 0), 1);

    const padding = window.innerWidth < 768 ? 40 : 120;
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + padding);
    const translateX = -(progress * maxTranslate);

    track.style.transform = `translate3d(${translateX}px, 0, 0)`;

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${Math.max(6, progress * 100)}%`;
    }
    if (progressTextRef.current) {
      const currentItem = Math.min(
        projects.length,
        Math.floor(progress * projects.length) + 1
      );
      progressTextRef.current.textContent = `0${currentItem} / 0${projects.length}`;
    }
  }, []);

  // Update on Lenis smooth scroll
  useLenis(updateScroll);

  // Initial sync & resize listener
  useEffect(() => {
    updateScroll();
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => window.removeEventListener("resize", updateScroll);
  }, [updateScroll]);

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative z-10 w-full"
      style={{ height: "300vh" }}
    >
      {/* ── Sticky Pinned Viewport Frame ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 md:py-12 overflow-hidden bg-background select-none">
        {/* ── Minimalist Header ── */}
        <div className="px-6 md:px-14 lg:px-18 flex items-end justify-between border-b border-border/70 pb-4 w-full">
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary mb-1">
              Showcase
            </p>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-[800] tracking-[-0.03em] leading-none">
              Selected Works
            </h2>
          </div>

          {/* Dynamic Progress & Scroll Hint */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-muted">
              <span ref={progressTextRef} className="font-mono text-foreground">
                01 / 0{projects.length}
              </span>
              <span className="hidden sm:inline text-muted-light">•</span>
              <span className="hidden sm:inline text-muted-light font-normal text-[0.75rem]">
                SCROLL TO EXPLORE →
              </span>
            </div>

            {/* Clean Progress line */}
            <div className="w-28 sm:w-40 h-1 bg-border/60 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-primary rounded-full transition-[width] duration-75 ease-out"
                style={{ width: "20%" }}
              />
            </div>
          </div>
        </div>

        {/* ── Horizontal Scrolling Track ── */}
        <div className="relative w-full flex-1 flex items-center overflow-visible my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-7 md:gap-10 pl-6 md:pl-14 lg:pl-18 pr-12 md:pr-28 will-change-transform flex-nowrap"
          >
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block no-underline w-[min(520px,78vw)] sm:w-[540px] md:w-[580px] shrink-0 cursor-pointer"
              >
                {/* ── Minimalist Screen Mockup (Lenis.dev Style) ── */}
                <div
                  className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-black/[0.07] dark:border-white/[0.08] bg-[#0c130d] shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-[1.015] group-hover:border-primary/40 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col justify-between p-6 sm:p-8"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.color}15 0%, #0c140e 100%)`,
                  }}
                >
                  {/* Subtle Grid Texture in preview */}
                  <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${project.color} 1px, transparent 1px), linear-gradient(to bottom, ${project.color} 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Top Bar inside mockup */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-white/10 text-white/90 backdrop-blur-md border border-white/10">
                      {project.category}
                    </span>

                    <span className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary">
                      <ArrowUpRight />
                    </span>
                  </div>

                  {/* Center Hero Typography / Graphic */}
                  <div className="relative z-10 my-auto text-center py-4">
                    <h4
                      className="text-2xl sm:text-3xl md:text-4xl font-[900] tracking-tight uppercase leading-tight text-white/90 transition-transform duration-500 group-hover:scale-[1.03]"
                      style={{
                        textShadow: `0 0 30px ${project.color}40`,
                      }}
                    >
                      {project.title}
                    </h4>
                  </div>

                  {/* Bottom Bar: Badge tag */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="text-[0.65rem] font-bold tracking-wider px-2.5 py-0.5 rounded uppercase text-white shadow-xs"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.badge}
                    </span>

                    <div className="flex gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.65rem] font-medium px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Title & Meta Info Below Card ── */}
                <div className="mt-3.5 px-1 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-light font-normal mt-0.5">
                      {project.client}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore ↗
                  </span>
                </div>
              </a>
            ))}

            {/* ── End Card: GitHub Showcase CTA ── */}
            <div className="w-[280px] sm:w-[320px] shrink-0 pr-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group aspect-[16/10] w-full rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-center items-center text-center border border-dashed border-border hover:border-primary bg-card/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] no-underline block"
              >
                <span className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  →
                </span>
                <h4 className="text-lg font-bold text-foreground mb-1">
                  More on GitHub
                </h4>
                <p className="text-xs text-muted-light max-w-[200px]">
                  Explore all open-source repositories & experiments.
                </p>
              </a>
              <div className="mt-3.5 px-1">
                <h3 className="text-lg font-bold text-foreground">GitHub Archive</h3>
                <p className="text-xs text-muted-light mt-0.5">Open Source • Utilities</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Section Subtitle ── */}
        <div className="px-6 md:px-14 lg:px-18 flex items-center justify-between text-[0.7rem] text-muted-light/80 pt-2">
          <span>CURATED WORK</span>
          <span>DRAG OR SCROLL VERTICALLY</span>
        </div>
      </div>
    </div>
  );
}
