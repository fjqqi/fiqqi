"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import MePic from "@/public/me.webp";
import { AsteriskIcon } from "@/app/components/Icons";

function InteractiveAsterisk({ className }: { className: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const targetAngleRef = useRef(0);
    const currentAngleRef = useRef(0);
    const prevAngleRef = useRef<number | null>(null);

    useEffect(() => {
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
            // Do not compute or animate on mobile touch scroll
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
        <div ref={ref} className="flex items-center justify-center will-change-transform origin-center">
            <AsteriskIcon className={className} />
        </div>
    );
}

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.75, rotate: -30 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const LOREM_TEXT =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet consectetur adipiscing elit quisque faucibus ex sapien. Quisque faucibus ex sapien vitae pellentesque sem placerat. Vitae pellentesque sem placerat in id cursus mi.";

export default function GetToKnowMe() {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            {/* Big Headline: About Me ✳ */}
            <motion.div
                variants={fadeUpVariants}
                className="pt-2 sm:pt-0 pb-3 sm:pb-6 flex items-center gap-3 sm:gap-4 flex-wrap"
            >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-normal text-black dark:text-white flex items-center gap-2 sm:gap-4">
                    <span>About</span>
                    <span className="font-serif italic text-primary dark:text-lime-400 font-normal">
                        Me
                    </span>
                </h1>

                {/* Moving Asterisk badge matching Hero */}
                <motion.div
                    variants={badgeVariants}
                    className="border border-black dark:border-white rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 flex items-center justify-center shrink-0"
                >
                    <InteractiveAsterisk className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary dark:text-lime-400" />
                </motion.div>
            </motion.div>

            {/* Under Headline Meta Row */}
            <motion.div
                variants={fadeUpVariants}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 pt-2"
            >
                <p className="text-sm sm:text-base text-black/85 dark:text-white/85 font-normal max-w-xs leading-snug">
                    Hi. Im Fiqqi Im a Frontend Web Developer
                </p>

                <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-8 md:gap-14">
                    <div className="flex flex-col">
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1">
                            BASED IN
                        </span>
                        <span className="text-xs sm:text-sm md:text-base font-medium text-black dark:text-white tracking-tighter">
                            Makassar, INA
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1">
                            EXPERIENCE
                        </span>
                        <span className="text-xs sm:text-sm md:text-base font-medium text-black dark:text-white tracking-tighter">
                            Since 2022
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1">
                            LANGUANGE
                        </span>
                        <span className="text-xs sm:text-sm md:text-base font-medium text-black dark:text-white tracking-tighter">
                            INDO - ENG C1
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Photo + 3 Paragraphs Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 mt-6 sm:mt-10 md:mt-16 gap-6 sm:gap-8 md:gap-12 items-start pb-8 sm:pb-12 md:pb-16">
                {/* Left Column: Photo */}
                <motion.div variants={imageVariants} className="md:col-span-5 w-full">
                    <div className="relative w-full aspect-[4/4.5] rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-sm">
                        <Image
                            src={MePic}
                            alt="Fiqqi"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 42vw"
                            className="object-cover contrast-[1.05]"
                        />
                    </div>
                </motion.div>

                {/* Right Column: 3 Paragraphs + 3 Buttons */}
                <motion.div
                    variants={fadeUpVariants}
                    className="md:col-span-7 flex flex-col h-full space-y-4"
                >
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        {LOREM_TEXT}
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        {LOREM_TEXT}
                    </p>

                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#3a3a3a] dark:text-zinc-300 font-light">
                        {LOREM_TEXT}
                    </p>

                    {/* Button Pills Row */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            href="mailto:faqihzaky43@gmail.com"
                            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-black dark:border-white text-black dark:text-white text-[11px] sm:text-xs font-light tracking-wider uppercase inline-flex items-center gap-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                        >
                            <span>CONNECT</span>
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4l8 8m0 0H6m6 0V6" />
                            </svg>
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            href="mailto:faqihzaky43@gmail.com?subject=Hire%20Inquiry"
                            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-black dark:border-white text-black dark:text-white text-[11px] sm:text-xs font-light tracking-wider uppercase inline-flex items-center gap-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                        >
                            <span>HIRE ME</span>
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4l8 8m0 0H6m6 0V6" />
                            </svg>
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            href="mailto:faqihzaky43@gmail.com?subject=CV%20Request%20-%20Fiqqi"
                            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-black dark:border-white text-black dark:text-white text-[11px] sm:text-xs font-light tracking-wider uppercase inline-flex items-center gap-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                        >
                            <span>DOWNLOAD CV</span>
                            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4l8 8m0 0H6m6 0V6" />
                            </svg>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
