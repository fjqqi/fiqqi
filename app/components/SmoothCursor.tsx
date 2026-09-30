"use client";

import { useEffect, useRef, useState } from "react";

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setIsFinePointer(true);

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let isVisible = false;
    let animId: number;

    // Throttle interactive check: only run DOM query every N frames
    let frameCount = 0;
    let isInteractiveCached = false;

    const show = () => {
      if (isVisible) return;
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const hide = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (ringInnerRef.current) {
        ringInnerRef.current.classList.remove("scale-125", "!border-primary", "scale-75");
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      show();
    };

    const onMouseLeave = () => hide();
    const onMouseDown = () => ringInnerRef.current?.classList.add("scale-75");
    const onMouseUp = () => ringInnerRef.current?.classList.remove("scale-75");

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    const LERP = 0.18;

    const animate = () => {
      // Lerp ring position
      ring.x += (mouse.x - ring.x) * LERP;
      ring.y += (mouse.y - ring.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x.toFixed(2)}px,${ring.y.toFixed(2)}px,0)`;
      }

      // Only check for interactive element every 6 frames (~10fps) — not every rAF
      frameCount++;
      if (frameCount % 6 === 0 && isVisible) {
        const el = document.elementFromPoint(mouse.x, mouse.y) as HTMLElement | null;
        isInteractiveCached = Boolean(
          el?.closest("a, button, [role='button'], input, textarea, select, label")
        );
        if (ringInnerRef.current) {
          if (isInteractiveCached) {
            ringInnerRef.current.classList.add("scale-125", "!border-primary");
          } else {
            ringInnerRef.current.classList.remove("scale-125", "!border-primary");
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99998] pointer-events-none -ml-[18px] -mt-[18px] w-9 h-9 will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.15s ease-out" }}
      >
        <div
          ref={ringInnerRef}
          className="w-full h-full rounded-full border-[1.5px] border-foreground/60 dark:border-white/75 transition-transform duration-150 ease-out"
        />
      </div>

      {/* Center Solid Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99999] pointer-events-none -ml-[3.5px] -mt-[3.5px] w-[7px] h-[7px] rounded-full bg-foreground dark:bg-white will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.15s ease-out" }}
      />
    </>
  );
}
