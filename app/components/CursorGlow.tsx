"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      /* Direct DOM mutation — no React state, no rAF loop, just one transform */
      glow.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full"
      style={{
        width: 600,
        height: 600,
        background:
          "radial-gradient(circle at center, rgba(29,185,84,0.10) 0%, rgba(29,185,84,0.04) 35%, transparent 65%)",
        transform: "translate3d(-9999px, -9999px, 0)",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
