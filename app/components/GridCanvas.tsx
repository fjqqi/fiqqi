"use client";

import { useRef, useEffect, useCallback } from "react";

interface GridCanvasProps {
  cellWidth?: number;
  cellHeight?: number;
  lineColor?: string;
  lineWidth?: number;
  curveRadius?: number;
  curveStrength?: number;
}

export default function GridCanvas({
  cellWidth = 64,
  cellHeight = 28,
  lineWidth = 1,
  curveRadius = 120,
  curveStrength = 18,
}: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    /* Read the CSS variable for grid color */
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue("--grid-color").trim() || "rgba(180,200,180,0.25)";

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    /* Helper: displace a point away from cursor */
    const displace = (px: number, py: number): [number, number] => {
      const dx = px - mx;
      const dy = py - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > curveRadius || dist < 1) return [px, py];
      const factor = (1 - dist / curveRadius) ** 2 * curveStrength;
      const angle = Math.atan2(dy, dx);
      return [px + Math.cos(angle) * factor, py + Math.sin(angle) * factor];
    };

    const cols = Math.ceil(w / cellWidth) + 2;
    const rows = Math.ceil(h / cellHeight) + 2;

    /* Horizontal lines */
    for (let r = 0; r <= rows; r++) {
      const y = r * cellHeight;
      ctx.beginPath();
      for (let c = 0; c <= cols * 4; c++) {
        const rawX = (c / 4) * cellWidth;
        const [nx, ny] = displace(rawX, y);
        if (c === 0) ctx.moveTo(nx, ny);
        else ctx.lineTo(nx, ny);
      }
      ctx.stroke();
    }

    /* Vertical lines */
    for (let c = 0; c <= cols; c++) {
      const x = c * cellWidth;
      ctx.beginPath();
      for (let r = 0; r <= rows * 4; r++) {
        const rawY = (r / 4) * cellHeight;
        const [nx, ny] = displace(x, rawY);
        if (r === 0) ctx.moveTo(nx, ny);
        else ctx.lineTo(nx, ny);
      }
      ctx.stroke();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [cellWidth, cellHeight, lineWidth, curveRadius, curveStrength]);

  /* Animation loop */
  const loop = useCallback(() => {
    draw();
    rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  /* Resize handler */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
    };

    resize();

    /* Observe body height changes */
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    window.addEventListener("resize", resize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* Mouse tracking (page-level) */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.pageX,
        y: e.pageY,
      };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* Start/stop animation loop */
  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
