"use client";

import Image from "next/image";
import { clientLogos } from "../data";

export default function ClientMarquee() {
  // Duplicate list for seamless infinite loop
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="w-full pt-6 pb-24 overflow-hidden relative select-none">
      {/* ── Section Title ── */}
      <div className="text-center mb-6 sm:mb-8 px-4">
        <p className="text-base  dark:text-white/80">
          Trusted by Organization and Company
        </p>
      </div>

      {/* ── Marquee Container ── */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right Edge Fade Gradients */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-80 z-10 pointer-events-none bg-gradient-to-r from-background via-background/100 to-transparent" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-80 z-10 pointer-events-none bg-gradient-to-l from-background via-background/100 to-transparent" />

        {/* Scrolling Track */}
        <div className="marquee-track flex items-center gap-4 sm:gap-6 group-hover:[animation-play-state:paused]">
          {duplicatedLogos.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center justify-center h-16 sm:h-24 min-w-[150px] sm:min-w-[190px] px-6 py-3 rounded-2xl bg-white/[0.95] dark:bg-white/[0.90] border border-black/[0.08] dark:border-white/[0.15] shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(29,185,84,0.15)] shrink-0"
              title={client.name}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={140}
                  height={50}
                  className={`max-h-9 sm:max-h-11 w-auto max-w-[130px] sm:max-w-[150px] object-contain transition-all duration-300 ${client.isWhiteArtwork ? "invert" : ""
                    }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
