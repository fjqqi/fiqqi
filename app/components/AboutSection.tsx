"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { greetings, stats, skills } from "../data";

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const isRightHovered = hoveredCard === "right";

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        setFadeState("in");
      }, 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative z-10 px-6 py-16 max-w-[1100px] mx-auto"
    >
      {/* Interactive Top Cards */}
      <div className="relative pt-12 mb-16 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full select-none">
        {/* Left Box (Photo card) */}
        <div
          onMouseEnter={() => setHoveredCard("left")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative bg-primary rounded-[28px] sm:rounded-[44px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
            h-[220px] sm:h-[290px] md:h-[310px]
            ${isRightHovered ? "sm:w-[28%]" : "sm:w-[62%]"} w-full`}
        >
          <div className="relative w-full z-30 h-full overflow-visible">
            <Image
              src="/fiqqi.png"
              alt="Fiqqi"
              width={500}
              height={600}
              priority
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[260px] sm:h-[340px] md:h-[390px] w-auto max-w-none object-contain pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom ${
                isRightHovered ? "scale-[0.88] sm:scale-90" : "scale-100"
              }`}
            />
          </div>
        </div>

        {/* Right Box (Hello / Nice to meet you card) */}
        <div
          onMouseEnter={() => setHoveredCard("right")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative bg-primary rounded-[28px] sm:rounded-[44px] cursor-pointer flex items-center justify-center overflow-hidden p-4 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
            h-[140px] sm:h-[290px] md:h-[310px]
            ${isRightHovered ? "sm:w-[72%]" : "sm:w-[38%]"} w-full`}
        >
          {/* Default Text: Multilingual Hello */}
          <div
            className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${
              isRightHovered ? "opacity-0 scale-75 blur-xs pointer-events-none" : "opacity-100 scale-100 blur-none"
            }`}
          >
            <span
              className={`text-3xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight transition-all duration-300 ease-out text-center ${
                fadeState === "out"
                  ? "opacity-0 scale-90 blur-xs translate-y-1"
                  : "opacity-100 scale-100 blur-none translate-y-0"
              }`}
            >
              {greetings[greetingIndex].text}
            </span>
          </div>

          {/* Hover Text: Nice to meet you */}
          <div
            className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-center text-center leading-[0.95] ${
              isRightHovered ? "opacity-100 scale-100 blur-none delay-75" : "opacity-0 scale-90 blur-xs pointer-events-none"
            }`}
          >
            <span className="text-2xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight whitespace-nowrap">
              Nice to
            </span>
            <span className="text-2xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight whitespace-nowrap">
              meet you-
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Text content */}
        <div className="text-center sm:text-left">
          <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            About Me
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.1] tracking-[-0.03em] mb-6">
            Crafting interfaces
            <br />
            that feel <span className="text-primary">alive</span>
          </h2>
          <p className="text-[1.05rem] leading-[1.8] text-muted mb-5 max-w-[480px] mx-auto sm:mx-0">
            I&apos;m a front-end developer with a passion for clean code and
            stunning user interfaces. I specialize in building modern web
            applications with Next.js, React, and Laravel, bringing designs
            to life with pixel-perfect precision.
          </p>
          <p className="text-[1.05rem] leading-[1.8] text-muted max-w-[480px] mx-auto sm:mx-0">
            Beyond the browser, I explore mobile development with Flutter and
            backend systems with Laravel. Every project is an opportunity to
            push boundaries and create something truly uncommon.
          </p>

          {/* Stats strip */}
          <div className="flex justify-center sm:justify-start gap-8 mt-8 pt-6 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center sm:items-start">
                <span className="text-[2rem] font-[800] leading-none text-foreground tracking-[-0.03em]">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-light font-medium mt-1 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef}>
          <div className="flex flex-col gap-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2 text-[0.9rem] font-semibold">
                  <span>{skill.name}</span>
                  <span className="text-muted-light">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-skill-bg rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-[#34d399] rounded-sm transition-[width] duration-1000 ease-out"
                    style={{
                      width: skillsVisible ? `${skill.level}%` : "0%",
                      transitionDelay: skillsVisible ? `${skills.indexOf(skill) * 100}ms` : "0ms",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
