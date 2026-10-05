"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDownRightIcon } from "../Icons";
import GreenCard from "./Hero/GreenCard";
import HeroBottom from "./Hero/HeroBottom";
import HeroText from "./Hero/HeroText";

const buttonContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.35,
        },
    },
};

const buttonItemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function HeroSection() {
    return (
        <div className="w-full flex flex-col  justify-between overflow-x-hidden">
            <main className="w-full max-w-7xl   pb-16 mx-auto flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 text-black dark:text-white">
                <div className="flex-1 flex flex-col md:flex-row w-full justify-between items-center md:py-12 gap-0 md:gap-12">
                    {/* Top Content: HeroText + Mobile Buttons (fills viewport so GreenCard is 30% visible before scroll) */}
                    <div className="w-full md:w-auto flex flex-col items-center md:items-start justify-center min-h-[calc(100dvh-256px-5rem)] md:min-h-0 py-6 md:py-0">
                        <HeroText />

                    </div>

                    {/* Green Card Container: peeks 30% (135px) on mobile at the bottom before scrolling */}
                    <div className="w-full md:w-auto flex flex-col gap-4 justify-center pb-12 md:pb-0">

                        {/* Mobile Buttons: shown only on mobile between text and green card */}
                        <motion.div
                            variants={buttonContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex md:hidden items-center justify-center gap-2.5 sm:gap-4 w-full max-w-[340px] mt-6"
                        >
                            <motion.div
                                variants={buttonItemVariants}
                                whileTap={{ scale: 0.96 }}
                                whileHover={{ scale: 1.02 }}
                                className="group flex-1 py-2.5 px-3 flex items-center justify-center font-light tracking-wider gap-1.5 rounded-full border border-black/80 dark:border-white/80 text-[12px] sm:text-[13px] bg-white dark:bg-zinc-900 shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <h1>SAY HELLO</h1>
                                <ArrowDownRightIcon className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            </motion.div>
                            <motion.div
                                variants={buttonItemVariants}
                                whileTap={{ scale: 0.96 }}
                                whileHover={{ scale: 1.02 }}
                                className="group flex-1 py-2.5 px-3 flex items-center justify-center font-light tracking-wider gap-1.5 rounded-full border border-black/80 dark:border-white/80 text-[12px] sm:text-[13px] bg-white dark:bg-zinc-900 shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <h1>SELECTED WORK</h1>
                                <ArrowDownRightIcon className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                            </motion.div>
                        </motion.div>
                        <GreenCard />
                    </div>
                </div>

            </main>

            <HeroBottom />

        </div>
    );
}