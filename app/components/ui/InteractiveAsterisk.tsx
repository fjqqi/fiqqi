"use client";

import { useEffect, useRef } from "react";
import { AsteriskIcon } from "@/app/components/Icons";

interface InteractiveAsteriskProps {
    className?: string;
}

export default function InteractiveAsterisk({
    className = "w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary dark:text-lime-600",
}: InteractiveAsteriskProps) {
    const ref = useRef<HTMLDivElement>(null);
    const targetAngleRef = useRef(0);
    const currentAngleRef = useRef(0);
    const prevAngleRef = useRef<number | null>(null);

    useEffect(() => {
        // Completely disable on mobile and touch devices: zero event listeners, zero RAF loops
        const isDesktopWithMouse =
            typeof window !== "undefined" &&
            window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
            !("ontouchstart" in window);

        if (!isDesktopWithMouse) return;

        let animId: number = 0;
        let isAnimating = false;

        const update = () => {
            const diff = targetAngleRef.current - currentAngleRef.current;
            if (Math.abs(diff) < 0.05) {
                currentAngleRef.current = targetAngleRef.current;
                if (ref.current) {
                    ref.current.style.transform = `rotate(${currentAngleRef.current}deg)`;
                }
                isAnimating = false;
                animId = 0;
                return;
            }

            currentAngleRef.current += diff * 0.15;
            if (ref.current) {
                ref.current.style.transform = `rotate(${currentAngleRef.current}deg)`;
            }
            animId = requestAnimationFrame(update);
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;

            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) return;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const deg = rad * (180 / Math.PI);

            if (prevAngleRef.current === null) {
                prevAngleRef.current = deg;
                currentAngleRef.current = deg;
                targetAngleRef.current = deg;
            } else {
                let delta = deg - prevAngleRef.current;
                while (delta > 180) delta -= 360;
                while (delta < -180) delta += 360;
                targetAngleRef.current += delta;
                prevAngleRef.current = deg;
            }

            if (!isAnimating) {
                isAnimating = true;
                animId = requestAnimationFrame(update);
            }
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            if (animId) cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div ref={ref} className="flex items-center justify-center md:will-change-transform origin-center">
            <AsteriskIcon className={className} />
        </div>
    );
}
