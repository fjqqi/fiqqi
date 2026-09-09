"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import MarqueeSection from "./MarqueeSection";
import { ABOUT_PANELS, AboutPanelConfig } from "./about/types";
import BioSlide from "./about/BioSlide";
import SpecialitySlide from "./about/SpecialitySlide";
import ExperienceSlide from "./about/ExperienceSlide";

/* ─── Scroll Travel Configuration ─────────────────────────────────────────── */
const N = ABOUT_PANELS.length;

// Additional scroll height per panel transition (in vh units).
// Total scroll height = 1 viewport screen + travel distance for (N - 1) transitions.
const SCROLL_TRAVEL_VH = 2.4;
const SECTION_VH = 1 + SCROLL_TRAVEL_VH;

/**
 * Smoothstep cubic Hermite interpolation:
 * Returns an S-curve easing between 0 and 1.
 * Provides smooth acceleration and deceleration without velocity discontinuities.
 */
function smoothstep(min: number, max: number, value: number) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillBarRefs = useRef<(HTMLDivElement | null)[][]>([[], [], []]);
  const barsPlayed = useRef([false, false, false]);

  /* ───────────────────────────────────────────────────────────────────────────
   * 1. INITIAL GSAP STATE (On Mount)
   * ───────────────────────────────────────────────────────────────────────────
   * Pre-configures all slide elements so:
   * - Slide 0 (Bio) starts in-place at yPercent: 0, opacity: 1
   * - Slides 1 & 2 start hidden below the overflow mask (yPercent: 100, opacity: 0)
   * - Photo 0 is visible; subsequent photos are hidden in the z-stack
   * ─────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    ABOUT_PANELS.forEach((_, i) => {
      const textEl = panelRefs.current[i];
      const imgEl = imgRefs.current[i];
      if (textEl) {
        gsap.set(textEl, {
          yPercent: i === 0 ? 0 : 100, // Move upcoming slides below mask container
          opacity: i === 0 ? 1 : 0,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      }
      if (imgEl) {
        gsap.set(imgEl, { opacity: i === 0 ? 1 : 0 });
      }
    });
  }, []);

  /* ───────────────────────────────────────────────────────────────────────────
   * 2. SCROLL DRIVEN TRANSITIONS (Lenis RAF Loop)
   * ───────────────────────────────────────────────────────────────────────────
   * Evaluated every frame by Lenis smooth scroll:
   * - Maps vertical scroll distance into a normalized floating slot [0 ... N - 1]
   * - Each panel checks its distance to `slot` and applies:
   *     a) Smoothstep entry [i - 0.75 -> i - 0.25]: slides up from 100% -> 0%
   *     b) Stable rest zone [i - 0.25 -> i + 0.25]: 100% visible & readable
   *     c) Smoothstep exit  [i + 0.25 -> i + 0.75]: slides up from 0% -> -100%
   * ─────────────────────────────────────────────────────────────────────────── */
  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = -rect.top; // Pixels scrolled into this section
    const travel = section.offsetHeight - vh; // Total scrollable travel distance
    if (travel <= 0) return;

    // Continuous progress float from 0.0 to (N - 1) [e.g. 0.0 to 2.0]
    const rawProgress = Math.max(0, Math.min(1, scrolled / travel));
    const slot = rawProgress * (N - 1);

    ABOUT_PANELS.forEach((panel, i) => {
      const textEl = panelRefs.current[i];
      const imgEl = imgRefs.current[i];
      if (!textEl || !imgEl) return;

      let yPercent = 0;
      let opacity = 0;
      let imgOpacity = 0;
      let isVisible = false;

      if (slot < i - 1) {
        // [State 1: Far Below] Slide has not started entering yet
        yPercent = 100;
        opacity = 0;
        imgOpacity = 0;
      } else if (slot >= i - 1 && slot < i) {
        // [State 2: Entering] Slide is rising into view through bottom mask edge
        const enterProgress = smoothstep(i - 0.75, i - 0.25, slot);
        yPercent = (1 - enterProgress) * 100; // 100% -> 0%
        opacity = enterProgress;              // 0 -> 1
        imgOpacity = enterProgress;           // Crossfades photo in
        isVisible = enterProgress > 0.05;
      } else if (slot >= i && slot < i + 1) {
        // [State 3: Active / Exiting] Slide is resting, then rises out through top mask edge
        const exitProgress = smoothstep(i + 0.25, i + 0.75, slot);
        yPercent = -exitProgress * 100;       // 0% -> -100%
        opacity = 1 - exitProgress;           // 1 -> 0
        imgOpacity = 1;                       // Stays solid until covered by next photo
        isVisible = 1 - exitProgress > 0.05;
      } else {
        // [State 4: Far Above] Slide has completely exited
        yPercent = -100;
        opacity = 0;
        imgOpacity = 0;
      }

      /* ───────────────────────────────────────────────────────────────────────
       * 3. GSAP MASK & POSITION SET
       * ───────────────────────────────────────────────────────────────────────
       * Uses gsap.set() for instantaneous frame-by-frame updates without adding
       * secondary tween latency over Lenis lerp.
       * ─────────────────────────────────────────────────────────────────────── */
      gsap.set(textEl, {
        yPercent,
        opacity,
        pointerEvents: opacity > 0.7 ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
      });

      gsap.set(imgEl, {
        opacity: imgOpacity,
      });

      /* ───────────────────────────────────────────────────────────────────────
       * 4. SKILL BARS STAGGERED REVEAL (gsap.fromTo)
       * ───────────────────────────────────────────────────────────────────────
       * When a skill slide stabilizes (opacity > 0.8), triggers a one-shot GSAP
       * fromTo tween expanding progress bars from width: 0% to dataset.width.
       * Resets when slide exits (opacity < 0.1) so it replays on reverse scroll.
       * ─────────────────────────────────────────────────────────────────────── */
      if (panel.id !== "bio") {
        if (opacity > 0.8 && !barsPlayed.current[i]) {
          barsPlayed.current[i] = true;
          skillBarRefs.current[i].forEach((bar, j) => {
            if (!bar) return;
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: bar.dataset.width ?? "0%",
                duration: 0.85,
                ease: "power2.out",
                delay: j * 0.06, // Staggered entry per skill bar
              }
            );
          });
        }
        if (opacity < 0.1) {
          barsPlayed.current[i] = false; // Reset trigger for next view
        }
      }
    });
  }, []);

  useLenis(onScroll);

  const renderSlideContent = (panel: AboutPanelConfig, index: number) => {
    switch (panel.id) {
      case "bio":
        return <BioSlide config={panel} />;
      case "speciality":
        return (
          <SpecialitySlide
            config={panel}
            setBarRef={(barIdx, el) => {
              skillBarRefs.current[index][barIdx] = el;
            }}
          />
        );
      case "experience":
        return (
          <ExperienceSlide
            config={panel}
            setBarRef={(barIdx, el) => {
              skillBarRefs.current[index][barIdx] = el;
            }}
          />
        );
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ height: `${SECTION_VH * 100}vh` }}
      className="relative z-10"
    >
      {/* Sticky container pinned at top of viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden"
      >
        {/* Marquee Banner on top of About Screen */}
        <MarqueeSection />

        {/* Content area right below marquee */}
        <div className="w-full flex-1 max-w-[1100px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 pb-8 pt-4">
          {/* Static photo frame container (crossfades photos in z-stack) */}
          <div className="w-full md:w-[360px] flex-shrink-0">
            <div
              className="relative rounded-2xl w-full h-64 md:h-auto overflow-hidden border border-card-border shadow-xl bg-card"
              style={{ aspectRatio: "4/5" }}
            >
              {ABOUT_PANELS.map((panel, i) => (
                <div
                  key={panel.id}
                  ref={(el) => {
                    imgRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    zIndex: i,
                  }}
                >
                  <Image
                    src={panel.photo}
                    alt={`${panel.id} photo`}
                    fill
                    sizes="(max-width: 768px) 320px, 360px"
                    className="object-cover object-center"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Masking Viewport (overflow-hidden serves as the masking window) */}
          <div className="relative flex-1 w-full max-w-[540px] h-[340px] md:h-[400px] overflow-hidden">
            {ABOUT_PANELS.map((panel, i) => (
              <div
                key={panel.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center gap-4 text-left will-change-transform"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  pointerEvents: i === 0 ? "auto" : "none",
                }}
              >
                {renderSlideContent(panel, i)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
