"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onLeave = () => {
      posRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    // Smooth lerp loop — no state updates, direct DOM mutation for 60fps
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      const glow = glowRef.current;
      if (glow) {
        const cx = lerp(currentRef.current.x, posRef.current.x, 0.08);
        const cy = lerp(currentRef.current.y, posRef.current.y, 0.08);
        currentRef.current = { x: cx, y: cy };
        glow.style.transform = `translate(${cx - 400}px, ${cy - 400}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[2] w-[800px] h-[800px] rounded-full will-change-transform"
      style={{
        background:
          "radial-gradient(circle at center, rgba(29,185,84,0.13) 0%, rgba(29,185,84,0.05) 35%, transparent 70%)",
        transform: "translate(-9999px, -9999px)",
        // Slightly stronger in dark mode via a second layer
        filter: "blur(2px)",
      }}
    />
  );
}
