"use client";

import { useEffect, useRef } from "react"
import Image from "next/image"
import Guwe from "@/public/guwe.webp"
import { AsteriskIcon } from "@/app/components/Icons"

function InteractiveAsterisk({ className }: { className: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const targetAngleRef = useRef(0);
    const currentAngleRef = useRef(0);
    const prevAngleRef = useRef<number | null>(null);

    useEffect(() => {
        let animId: number;

        const handlePointerMove = (e: PointerEvent) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Skip calculations if hidden in current responsive layout
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
                // Unwrap angles to always rotate along the shortest path without 360-degree snap jumps
                while (delta > 180) delta -= 360;
                while (delta < -180) delta += 360;
                targetAngleRef.current += delta;
                prevAngleRef.current = deg;
            }
        };

        const update = () => {
            // Smooth lerp interpolation for silky, responsive rotation
            currentAngleRef.current += (targetAngleRef.current - currentAngleRef.current) * 0.15;
            if (ref.current) {
                ref.current.style.transform = `rotate(${currentAngleRef.current}deg)`;
            }
            animId = requestAnimationFrame(update);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        animId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <div ref={ref} className="flex items-center justify-center will-change-transform origin-center">
            <AsteriskIcon className={className} />
        </div>
    );
}

export default function HeroText() {
    return (
        <div>
            {/* Mobile Layout (< md) */}
            <div className="flex md:hidden flex-col items-center text-center">
                <h1 className="text-[2.25rem] sm:text-[2.75rem] tracking-tighter leading-[1.15] font-normal flex flex-col items-center">
                    {/* Line 1: text */}
                    <span>I bring ideas to life</span>

                    {/* Line 2: avatar pill + through + asterisk */}
                    <div className="flex items-center justify-center gap-2.5 mt-2">
                        <div className="border border-black dark:border-white rounded-full w-24 h-11 bg-primary overflow-hidden flex items-center justify-center shrink-0">
                            <Image src={Guwe} alt="" width={100} height={100} className="text-primary w-full h-full" />
                        </div>
                        <span>through</span>
                        <div className="border border-black dark:border-white rounded-full w-11 h-11 flex items-center justify-center shrink-0">
                            <InteractiveAsterisk className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    {/* Line 3: italic serif "design" + & code. */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                            design
                        </span>
                        <span>& code.</span>
                    </div>
                </h1>

                <h4 className="mt-5 text-[15px] sm:text-base leading-snug text-black/80 dark:text-white/80 max-w-[280px]">
                    making things for screens. sometimes with pixels, sometimes with code :3
                </h4>
            </div>

            {/* Desktop Layout (>= md) */}
            <div className="hidden md:block">
                <h1 className="text-[4rem] tracking-tighter leading-[1] font-normal">
                    {/* First line: text + pill */}
                    <div className="flex items-center gap-4">
                        <span>I bring ideas to life</span>
                        <div className="border border-black dark:border-white rounded-full w-36 h-16 bg-primary overflow-hidden flex items-center justify-center">
                            <Image src={Guwe} alt="" width={100} height={100} className="text-primary w-full h-full" />
                        </div>
                    </div>

                    {/* Second line: through + asterisk badge + italic serif "design" + & code. */}
                    <div className="flex items-center gap-4 mt-2">
                        <span>through</span>
                        <div className="border border-black dark:border-white rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                            <InteractiveAsterisk className="w-9 h-9 text-primary" />
                        </div>
                        <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                            design
                        </span>
                        <span>& code.</span>
                    </div>
                </h1>

                <h4 className="mt-6 text-lg">
                    making things for screens — sometimes with pixels, sometimes with code.
                </h4>
            </div>
        </div>
    );
}
