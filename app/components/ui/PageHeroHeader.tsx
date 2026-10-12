"use client";

import { motion, type Variants } from "framer-motion";
import InteractiveAsterisk from "./InteractiveAsterisk";

export interface MetaStatItem {
    label: string;
    value: string;
}

export interface PageHeroHeaderProps {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    stats: MetaStatItem[];
    showAsterisk?: boolean;
    className?: string;
}

const titleVariants: Variants = {
    hidden: {
        y: "120%",
        opacity: 0,
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 1.25,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const badgeVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.75,
        rotate: -30,
        y: "100%",
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: "0%",
        transition: {
            duration: 1.1,
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

export default function PageHeroHeader({
    titlePrefix,
    titleHighlight,
    description,
    stats,
    showAsterisk = true,
    className = "",
}: PageHeroHeaderProps) {
    return (
        <div className={`w-full ${className}`.trim()}>
            {/* Big Headline: Prefix + Highlight ✳ */}
            <div className="pt-2 sm:pt-0 pb-3 sm:pb-6 flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="overflow-hidden pb-2 -mb-2">
                    <motion.h1
                        variants={titleVariants}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-normal text-black dark:text-white flex items-center gap-2 sm:gap-4 flex-wrap"
                    >
                        <span>{titlePrefix}</span>
                        <span className="font-serif italic text-primary dark:text-lime-600 font-normal">
                            {titleHighlight}
                        </span>
                    </motion.h1>
                </div>

                {/* Interactive Moving Asterisk badge */}
                {showAsterisk && (
                    <div className="overflow-hidden pb-1 -mb-1">
                        <motion.div
                            variants={badgeVariants}
                            className="border border-black dark:border-white rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 flex items-center justify-center shrink-0"
                        >
                            <InteractiveAsterisk className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-primary dark:text-lime-600" />
                        </motion.div>
                    </div>
                )}
            </div>

            {/* Under Headline Meta Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 pt-2">
                <div className="overflow-hidden pb-1 -mb-1">
                    <motion.p
                        variants={subtextVariants}
                        className="text-sm sm:text-base text-black/85 dark:text-white/85 font-normal max-w-xs leading-snug"
                    >
                        {description}
                    </motion.p>
                </div>

                <div className="overflow-hidden pb-1 -mb-1">
                    <motion.div
                        variants={subtextVariants}
                        className="flex items-center gap-6 sm:gap-8 md:gap-14 flex-wrap"
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col">
                                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-black/50 dark:text-white/50 mb-1">
                                    {stat.label}
                                </span>
                                <span className="text-xs sm:text-sm md:text-base font-medium text-black dark:text-white tracking-tighter">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
