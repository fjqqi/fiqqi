"use client";

import { useState } from "react";
import { LinkedInIcon, GitHubIcon, InstagramIcon } from "../Icons";
import SpotifyNowPlaying from "../SpotifyNowPlaying";
import GetInTouchModal from "../GetInTouchModal";
import { socials } from "@/app/data";

const socialIconMap: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon />,
  github: <GitHubIcon />,
  instagram: <InstagramIcon />,
};

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden"
    >
      {/* Content wrapper */}
      <div className="flex flex-col items-center text-center z-10 max-w-3xl mx-auto w-full">
        {/* Available Badge */}
        <div className="animate-fade-in-up mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-2 bg-[#1db954]/10 border border-[#1db954]/25 text-[#1db954] px-3.5 py-1.5 rounded-full text-[0.7rem] sm:text-[0.74rem] font-bold tracking-[0.1em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#1db954] shrink-0" />
            Available for New Project
          </span>
        </div>

        {/* Main Heading */}
        <div className="animate-fade-in-up animate-delay-1 text-center mb-4 sm:mb-5">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            Need an Aesthetic
            <br />
            <span className="text-primary">Website</span> or{" "}
            <span className="text-primary">App?</span>
          </h1>
        </div>

        {/* Subline */}
        <div className="animate-fade-in-up animate-delay-2 mb-6 sm:mb-7">
          <p className="text-[0.98rem] sm:text-[1.1rem] text-muted leading-relaxed max-w-[540px] mx-auto font-normal">
            Hi!, I&apos;m Fiqqi -{" "}
            <strong className="text-foreground font-bold">
              I make websites &amp; apps that look good,
              <br className="hidden sm:inline" /> feel intuitive, and are made to be
              remembered
            </strong>
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="animate-fade-in-up animate-delay-3 mb-6 sm:mb-7">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2.5 bg-primary text-white px-6 sm:px-6 py-3.5 rounded-full font-bold text-[0.95rem] sm:text-[1.02rem] cursor-pointer transition-all duration-300 shadow-[0_8px_25px_rgba(29,185,84,0.4)] hover:bg-primary-dark hover:scale-105 hover:shadow-[0_12px_32px_rgba(29,185,84,0.55)]"
          >
            <div className="rounded-full bg-accent w-10 h-10"></div>
            Get in Touch

          </button>
        </div>

        {/* Bottom row: Social icons + divider + Secondary pills */}
        <div className="animate-fade-in-up animate-delay-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          {/* Social icons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#161b16]/95 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-all duration-200 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                {socialIconMap[s.icon]}
              </a>
            ))}
          </div>

          {/* Vertical divider */}
          <div className="w-px h-6 bg-black/15 dark:bg-white/15" />

          {/* Action pills */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="#projects"
              className="group inline-flex items-center gap-1.5 border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#161b16]/95 backdrop-blur-md text-foreground px-4 sm:px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm cursor-pointer transition-all duration-200 hover:border-foreground/30 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.06)] no-underline"
            >
              <span>View Projects</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 group-hover:opacity-100 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              >
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-1.5 border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#161b16]/95 backdrop-blur-md text-foreground px-4 sm:px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm cursor-pointer transition-all duration-200 hover:border-foreground/30 hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.06)] no-underline"
            >
              <span>About Me</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 group-hover:opacity-100 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              >
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </a>
          </div>
        </div>

        {/* Spotify card — centered below */}
        <div className="animate-fade-in-up animate-delay-5 flex justify-center w-full">
          <SpotifyNowPlaying />
        </div>
      </div>

      {/* Get in Touch Modal */}
      <GetInTouchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
