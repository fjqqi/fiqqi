"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import MarqueeSection from "./MarqueeSection";
import { skills, personal } from "../data";

/* ─── Panels Data ─────────────────────────────────────────── */
const panels = [
  {
    id: "bio",
    tag: "ABOUT ME",
    headingLeft: "Hi, I'm",
    headingRight: personal.name,
    photo: "/about pics/first.png",
    content: "bio" as const,
  },
  {
    id: "speciality",
    tag: "ABOUT ME",
    headingLeft: "My",
    headingRight: "Speciality",
    photo: "/about pics/second.png",
    content: "skills" as const,
  },
  {
    id: "experience",
    tag: "ABOUT ME",
    headingLeft: "My",
    headingRight: "Experience",
    photo: "/about pics/third.png",
    content: "skills" as const,
  },
];

const N = panels.length;
const SCROLL_TRAVEL_VH = 2.4;
const SECTION_VH = 1 + SCROLL_TRAVEL_VH;

/** Smoothstep cubic easing: 0 -> 1 */
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

  useEffect(() => {
    panels.forEach((_, i) => {
      const textEl = panelRefs.current[i];
      const imgEl = imgRefs.current[i];
      if (textEl) {
        gsap.set(textEl, {
          yPercent: i === 0 ? 0 : 100,
          opacity: i === 0 ? 1 : 0,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      }
      if (imgEl) {
        gsap.set(imgEl, { opacity: i === 0 ? 1 : 0 });
      }
    });
  }, []);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrolled = -rect.top;
    const travel = section.offsetHeight - vh;
    if (travel <= 0) return;

    // Normalize progress to [0 ... N-1]
    const rawProgress = Math.max(0, Math.min(1, scrolled / travel));
    const slot = rawProgress * (N - 1); // float from 0 to 2

    // Apply text masking & crisp transitions per panel
    panels.forEach((panel, i) => {
      const textEl = panelRefs.current[i];
      const imgEl = imgRefs.current[i];
      if (!textEl || !imgEl) return;

      let yPercent = 0;
      let opacity = 0;
      let imgOpacity = 0;
      let isVisible = false;

      if (slot < i - 1) {
        // Far below
        yPercent = 100;
        opacity = 0;
        imgOpacity = 0;
      } else if (slot >= i - 1 && slot < i) {
        // Entering from below (as slot goes from i-1 to i)
        const enterProgress = smoothstep(i - 0.75, i - 0.25, slot);
        yPercent = (1 - enterProgress) * 100;
        opacity = enterProgress;
        imgOpacity = enterProgress;
        isVisible = enterProgress > 0.05;
      } else if (slot >= i && slot < i + 1) {
        // Exiting upward (as slot goes from i to i+1)
        const exitProgress = smoothstep(i + 0.25, i + 0.75, slot);
        yPercent = -exitProgress * 100;
        opacity = 1 - exitProgress;
        imgOpacity = 1;
        isVisible = (1 - exitProgress) > 0.05;
      } else {
        // Far above
        yPercent = -100;
        opacity = 0;
        imgOpacity = 0;
      }

      // Apply masking transform
      gsap.set(textEl, {
        yPercent,
        opacity,
        pointerEvents: opacity > 0.7 ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
      });

      gsap.set(imgEl, {
        opacity: imgOpacity,
      });

      // Animate skill bars when panel is stably in view
      if (panel.content === "skills") {
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
                delay: j * 0.06,
              }
            );
          });
        }
        if (opacity < 0.1) {
          barsPlayed.current[i] = false;
        }
      }
    });
  }, []);

  useLenis(onScroll);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ height: `${SECTION_VH * 100}vh` }}
      className="relative z-10"
    >
      {/* Sticky container pinned at top */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden"
      >
        {/* Marquee Banner on top of About Screen */}
        <MarqueeSection />

        {/* Content area right below marquee */}
        <div className="w-full flex-1 max-w-[1100px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 pb-8 pt-4">

          {/* ═══ LEFT: Static photo frame (clean crossfade, no movement) ═══ */}
          <div className="w-[260px] sm:w-[320px] md:w-[360px] flex-shrink-0">
            <div
              className="relative rounded-2xl overflow-hidden border border-card-border shadow-xl bg-card"
              style={{ aspectRatio: "4/5" }}
            >
              {panels.map((panel, i) => (
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

          {/* ═══ RIGHT: Text Masking Viewport ═══ */}
          <div className="relative flex-1 w-full max-w-[540px] h-[340px] md:h-[400px] overflow-hidden">
            {panels.map((panel, i) => (
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
                {/* Tag */}
                <p className="text-[0.8rem] font-bold tracking-[0.18em] uppercase text-primary">
                  {panel.tag}
                </p>

                {/* Heading */}
                <h2 className="text-[clamp(2.4rem,5.2vw,4.2rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-foreground">
                  {panel.headingLeft}{" "}
                  <span className="text-primary font-[900]">
                    {panel.headingRight}
                  </span>
                </h2>

                {/* Content */}
                {panel.content === "bio" ? (
                  <div className="flex flex-col gap-4 mt-1">
                    <p className="text-[0.96rem] sm:text-[1.02rem] leading-[1.75] text-muted">
                      I&apos;m Building etc,{" "}
                      <strong className="text-foreground font-bold">
                        Fresh Like an Apple.
                      </strong>{" "}
                      {personal.bio[0]}
                    </p>
                    <p className="text-[0.96rem] sm:text-[1.02rem] leading-[1.75] text-muted">
                      {personal.bio[1]}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3.5 w-full mt-1">
                    {skills.map((skill, j) => (
                      <div key={skill.name} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-baseline text-[0.88rem] sm:text-[0.92rem]">
                          <span className="font-semibold text-foreground">
                            {skill.name}
                          </span>
                          <span className="font-medium text-muted-light">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Track */}
                        <div className="h-[4px] rounded-full bg-skill-bg overflow-hidden">
                          <div
                            ref={(el) => {
                              skillBarRefs.current[i][j] = el;
                            }}
                            data-width={`${skill.level}%`}
                            className="h-full rounded-full bg-primary"
                            style={{ width: "0%" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
