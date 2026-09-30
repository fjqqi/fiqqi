"use client";

import React from "react";

const marqueeItems = [
  { text: "Clean Code", highlight: false },
  { text: "Aesthetic Design", highlight: false },
  { text: "User Focused", highlight: false },
  { text: "Open To Work", highlight: false },
];

export default function TextMarquee() {
  // 2 sets of items per half for balanced, seamless looping
  const repeatedItems = [...marqueeItems, ...marqueeItems];

  const renderItem = (
    item: { text: string; highlight: boolean },
    key: string | number
  ) => (
    <div key={key} className="inline-flex items-center gap-4 sm:gap-6 shrink-0">
      {item.highlight ? (
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {item.text}
        </span>
      ) : (
        <span className="text-sm sm:text-base font-semibold tracking-normal text-foreground/80 dark:text-white/85 whitespace-nowrap">
          {item.text}
        </span>
      )}
      <span className="text-primary/70 text-xs sm:text-sm select-none w-2"></span>
    </div>
  );

  return (
    <div className="w-full flex justify-center px-4 pt-4 sm:pt-5 pb-3">
      {/* Balanced Medium-Sized Transparent Pill Container */}
      <div className="relative w-full max-w-[800px] sm:max-w-[1000px] overflow-hidden rounded-full bg-transparent  px-4 sm:px-6 select-none group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Marquee Track */}
        <div
          className="marquee-track flex items-center gap-4 sm:gap-6 group-hover:[animation-play-state:paused]"
          style={{ animationDuration: "18s" }}
        >
          {/* First Half */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {repeatedItems.map((item, index) => renderItem(item, `first-${index}`))}
          </div>
          {/* Second Half (Cloned for seamless 50% loop) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0" aria-hidden="true">
            {repeatedItems.map((item, index) => renderItem(item, `second-${index}`))}
          </div>
        </div>
      </div>
    </div>
  );
}
