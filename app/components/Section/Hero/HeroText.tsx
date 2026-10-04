"use client";

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Guwe from "@/public/guwe.webp"
import { AsteriskIcon } from "@/app/components/Icons"

import { motion, type Variants } from "framer-motion"

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

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.22,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        y: "120%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 1.35,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const subtextVariants: Variants = {
    hidden: {
        y: "115%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function HeroText() {
    const [h1Done, setH1Done] = useState(false);

    return (
        <div>
            {/* Mobile Layout (< md) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex md:hidden flex-col items-center text-center"
            >
                <h1 className="text-[2.25rem] sm:text-[2.75rem] tracking-tighter leading-[1.15] font-normal flex flex-col items-center">
                    {/* Line 1: text */}
                    <div className="overflow-hidden pb-1 -mb-1">
                        <motion.span variants={itemVariants} className="block">
                            I bring ideas to life
                        </motion.span>
                    </div>

                    {/* Line 2: avatar pill + through + asterisk */}
                    <div className="overflow-hidden pb-1 -mb-1 mt-2">
                        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2.5">
                            <div className="border border-black dark:border-white rounded-full w-24 h-11 bg-primary overflow-hidden flex items-center justify-center shrink-0">
                                <Image src={Guwe} alt="" width={100} height={100} className="text-primary w-full h-full" />
                            </div>
                            <span>through</span>
                            <div className="border border-black dark:border-white rounded-full w-11 h-11 flex items-center justify-center shrink-0">
                                <InteractiveAsterisk className="w-6 h-6 text-primary" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Line 3: italic serif "design" + & code. */}
                    <div className="overflow-hidden pb-1 -mb-1 mt-2">
                        <motion.div
                            variants={itemVariants}
                            onAnimationComplete={() => setH1Done(true)}
                            className="flex items-center justify-center gap-2"
                        >
                            <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                                design
                            </span>
                            <span>& code.</span>
                        </motion.div>
                    </div>
                </h1>

                {/* Subtext: reveals after h1 animation completes */}
                <div className="overflow-hidden mt-5 pb-1 -mb-1">
                    <motion.h4
                        variants={subtextVariants}
                        initial="hidden"
                        animate={h1Done ? "visible" : "hidden"}
                        className="text-[15px] sm:text-base leading-snug text-black/80 dark:text-white/80 max-w-[280px]"
                    >
                        making things for screens. sometimes with pixels, sometimes with code :3
                    </motion.h4>
                </div>
            </motion.div>

            {/* Desktop Layout (>= md) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hidden md:block"
            >
                <h1 className="text-[4rem] tracking-tighter leading-[1.1] font-normal">
                    {/* First line: text + pill */}
                    <div className="overflow-hidden pb-1.5 -mb-1.5">
                        <motion.div variants={itemVariants} className="flex items-center gap-4">
                            <span>I bring ideas to life</span>
                            <div className="border border-black dark:border-white rounded-full w-36 h-16 bg-primary overflow-hidden flex items-center justify-center">
                                <Image src={Guwe} alt="" width={100} height={100} className="text-primary w-full h-full" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Second line: through + asterisk badge + italic serif "design" + & code. */}
                    <div className="overflow-hidden pb-2 -mb-2 mt-2">
                        <motion.div
                            variants={itemVariants}
                            onAnimationComplete={() => setH1Done(true)}
                            className="flex items-center gap-4"
                        >
                            <span>through</span>
                            <div className="border border-black dark:border-white rounded-full w-16 h-16 flex items-center justify-center shrink-0">
                                <InteractiveAsterisk className="w-9 h-9 text-primary" />
                            </div>
                            <span className="italic font-serif text-[#3f6212] dark:text-lime-500">
                                design
                            </span>
                            <span>& code.</span>
                        </motion.div>
                    </div>
                </h1>

                {/* Subtitle: reveals after h1 animation completes */}
                <div className="overflow-hidden mt-6 pb-1 -mb-1">
                    <motion.h4
                        variants={subtextVariants}
                        initial="hidden"
                        animate={h1Done ? "visible" : "hidden"}
                        className="text-lg text-black/80 dark:text-white/80"
                    >
                        making things for screens — sometimes with pixels, sometimes with code.
                    </motion.h4>
                </div>
            </motion.div>
        </div>
    );
}
