"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SecTitle from "../ui/SecTitle";
import { AsteriskIcon } from "@/app/components/Icons";

interface StatItem {
    id: string;
    value: number;
    label: string;
}

const STATS: StatItem[] = [
    {
        id: "experience",
        value: 2,
        label: "years experience",
    },
    {
        id: "Projects",
        value: 27,
        label: "Projects Completed",
    },
    {
        id: "clients",
        value: 5,
        label: "% smaller payload after fixing a memory leak",
    },
    {
        id: "Design",
        value: 99,
        label: "Design Created",
    },
];

function AnimatedCounter({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const duration = 1400;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out expo deceleration
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = Math.round(ease * value);
            setCount(currentVal);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        const frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [isInView, value]);

    return <span ref={ref}>{count}</span>;
}

const MARQUEE_ROW_1 = [
    "NEXT JS",
    "REACT",
    "TAILWIND",
    "JS",
    "VUE",
];

const MARQUEE_ROW_2 = [
    "FLUTTER",
    "HERMES",
    "LARAVEL",
    "PHP",
    "NODE JS",
];

const MARQUEE_ROW_3 = [
    "SUPABASE",
    "POSTGRESQL",
    "MYSQL",
    "AWS",
    "NEXT JS",
];

const MARQUEE_ROW_4 = [
    "FRAMER MOTION",
    "GSAP",
    "FIGMA",
    "PHOTOSHOP",
    "ILLUSTRATOR",
    "CANVA",
];

function MarqueeRow({
    items,
    direction = "left",
    speed = 28,
}: {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
}) {
    // Quadruple items to ensure seamless loop on wide screens
    const base = [...items, ...items];
    const full = [...base, ...base];

    return (
        <div className="relative w-full overflow-hidden flex select-none py-1">
            <motion.div
                className="flex shrink-0 items-center whitespace-nowrap will-change-transform"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {full.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center">
                        <span className="font-black text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider uppercase text-neutral-700 dark:text-neutral-300">
                            {item}
                        </span>
                        <AsteriskIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#5e8239] dark:text-lime-500 shrink-0 mx-3 sm:mx-4 md:mx-5" />
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export default function NumbersSection() {
    return (
        <div className="w-full bg-gray-200/70 dark:bg-zinc-900 transition-colors">
            <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-20 pb-16 text-black dark:text-white">
                <SecTitle
                    number="03"
                    title="Numbers and Stacks"
                    subtitle="いち"
                />

                <div className="w-full max-w-7xl mx-auto">
                    {/* Numbers Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-10 md:gap-x-12 gap-y-10 sm:gap-y-12">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-start"
                            >
                                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none text-black dark:text-white tabular-nums select-none">
                                    <AnimatedCounter value={stat.value} />
                                </div>

                                <p className="mt-3 md:mt-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-[220px]">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}


                    </div>

                    {/* Stacks Marquee Below */}
                    <div className="w-full overflow-hidden border-t mt-20 border-black/15 dark:border-white/15 pt-8 pb-16">
                        <div className="flex flex-col gap-2.5 sm:gap-3.5 md:gap-4">
                            <MarqueeRow items={MARQUEE_ROW_1} direction="left" speed={28} />
                            <MarqueeRow items={MARQUEE_ROW_2} direction="right" speed={34} />
                            <MarqueeRow items={MARQUEE_ROW_3} direction="left" speed={26} />
                            <MarqueeRow items={MARQUEE_ROW_4} direction="right" speed={32} />
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
