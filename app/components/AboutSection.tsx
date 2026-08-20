"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const greetings = [
  { text: "Hello!", lang: "English" },
  { text: "こんにちは!", lang: "Japanese" },
  { text: "Bonjour!", lang: "French" },
  { text: "안녕하세요!", lang: "Korean" },
  { text: "¡Hola!", lang: "Spanish" },
  { text: "Ciao!", lang: "Italian" },
  { text: "Olá!", lang: "Portuguese" },
  { text: "Hallo!", lang: "German" },
  { text: "Halo!", lang: "Indonesian" },
  { text: "你好!", lang: "Chinese" },
];

const skills = [
  { name: "Next.js / React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "CSS / Tailwind", level: 90 },
  { name: "Laravel / PHP", level: 78 },
  { name: "Flutter / Dart", level: 72 },
  { name: "UI / UX Design", level: 80 },
];

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

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

  return (
    <section
      id="about"
      className="relative z-10 px-6 max-w-[1100px] mx-auto bg-gree"
    >
      {/* Interactive Top Cards */}
      <div className="relative pt-12 mb-12 flex flex-row gap-4 sm:gap-6 w-full h-[260px] sm:h-[290px] md:h-[310px] select-none">
        {/* Left Box (Photo card) */}
        <div
          onMouseEnter={() => setHoveredCard("left")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative h-full bg-primary rounded-[36px] sm:rounded-[44px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isRightHovered ? "w-[28%]" : "w-[62%]"
            }`}
        >
          <div className="relative w-full h-full overflow-visible">
            <Image
              src="/fiqqi.png"
              alt="Fiqqi"
              width={500}
              height={600}
              priority
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[320px] sm:h-[360px] md:h-[390px] w-auto max-w-none object-contain pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom ${isRightHovered ? "scale-[0.88] sm:scale-90 md:scale-95" : "scale-100"
                }`}
            />
          </div>
        </div>

        {/* Right Box (Hello / Nice to meet you card) */}
        <div
          onMouseEnter={() => setHoveredCard("right")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`relative h-full bg-primary rounded-[36px] sm:rounded-[44px] cursor-pointer flex items-center justify-center overflow-hidden p-4 sm:p-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isRightHovered ? "w-[72%]" : "w-[38%]"
            }`}
        >
          {/* Default Text: Multilingual Hello */}
          <div
            className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${isRightHovered
              ? "opacity-0 scale-75 blur-xs pointer-events-none"
              : "opacity-100 scale-100 blur-none"
              }`}
          >
            <span
              className={`text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight transition-all duration-300 ease-out text-center ${fadeState === "out"
                ? "opacity-0 scale-90 blur-xs translate-y-1"
                : "opacity-100 scale-100 blur-none translate-y-0"
                }`}
            >
              {greetings[greetingIndex].text}
            </span>
          </div>

          {/* Hover Text: Nice to meet you- */}
          <div
            className={`absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center justify-center text-center leading-[0.95] ${isRightHovered
              ? "opacity-100 scale-100 blur-none delay-75"
              : "opacity-0 scale-90 blur-xs pointer-events-none"
              }`}
          >
            <span className="text-3xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight whitespace-nowrap">
              Nice to
            </span>
            <span className="text-3xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight whitespace-nowrap">
              meet you-
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 items-center">
        <div>
          <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            About Me
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.1] tracking-[-0.03em] mb-6">
            Crafting interfaces
            <br />
            that feel <span className="text-primary">alive</span>
          </h2>
          <p className="text-[1.05rem] leading-[1.8] text-muted mb-5 max-w-[480px]">
            I&apos;m a front-end developer with a passion for clean code and
            stunning user interfaces. I specialize in building modern web
            applications with Next.js, React, and Laravel, bringing designs
            to life with pixel-perfect precision.
          </p>
          <p className="text-[1.05rem] leading-[1.8] text-muted max-w-[480px]">
            Beyond the browser, I explore mobile development with Flutter and
            backend systems with Laravel. Every project is an opportunity to
            push boundaries and create something truly uncommon.
          </p>
        </div>

        {/* Skills */}
        <div>
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
                    style={{ width: `${skill.level}%` }}
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

