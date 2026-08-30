"use client";

import { useRef, useEffect, useCallback } from "react";

interface GridCanvasProps {
  cellWidth?: number;
  cellHeight?: number;
  lineWidth?: number;
}

export default function GridCanvas({
  cellWidth = 64,
  cellHeight = 28,
  lineWidth = 1,
}: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    /* Read the CSS variable for grid color */
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue("--grid-color").trim() || "rgba(180,200,180,0.25)";

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    const cols = Math.ceil(w / cellWidth) + 1;
    const rows = Math.ceil(h / cellHeight) + 1;

    /* Draw simple straight grid lines — no per-frame math */
    ctx.beginPath();

    /* Horizontal lines */
    for (let r = 0; r <= rows; r++) {
      const y = r * cellHeight;
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }

    /* Vertical lines */
    for (let c = 0; c <= cols; c++) {
      const x = c * cellWidth;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }

    ctx.stroke();
    ctx.restore();
  }, [cellWidth, cellHeight, lineWidth]);

  /* Resize handler — draw once on viewport, then only on resize/theme change */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw();
    };

    resize();

    window.addEventListener("resize", resize, { passive: true });

    /* Redraw on theme change */
    const observer = new MutationObserver(() => {
      requestAnimationFrame(draw);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
