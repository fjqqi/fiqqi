"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SecTitle from "../ui/SecTitle";

const PARAGRAPH =
    "I help brands stand out online: interfaces where considered design, restrained motion and honest performance all pull in one direction — turning an idea into a product people actually use.";

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline-block mr-[0.25em] last:mr-0 text-black dark:text-white"
        >
            {children}
        </motion.span>
    );
}

export default function ApproachSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.85", "start 0.35"],
    });

    const words = PARAGRAPH.split(" ");
    const step = 1 / words.length;

    return (
        <div className="w-full bg-gray-200/70 dark:bg-zinc-900 transition-colors">
            <section className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-20 text-black dark:text-white">
                <SecTitle
                    number="01"
                    title="Approach"
                    subtitle="いち"
                />

                <div
                    ref={containerRef}
                    className="md:text-6xl text-xl tracking-tighter font-light leading-snug md:leading-tight"
                >
                    {words.map((word, i) => {
                        const start = i * step;
                        const end = Math.min(1, start + step * 1.5);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}