"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "../../Icons";

export default function HeroBottom() {
    return (
        <>
            <section className="bg-white dark:bg-black">
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.6,
                    }}
                    className="w-full h-[1px] bg-black/15 dark:bg-white/15 origin-left"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.85,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.75,
                    }}
                    className="bottomHero text-black dark:text-white max-w-7xl mx-auto w-full py-6 md:py-8 px-6 sm:px-12 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                    <h1 className="text-sm tracking-tighter text-center sm:text-left">
                        Based in Makassar, Indonesia
                    </h1>

                    {/* Desktop Buttons (hidden on mobile, where they appear above GreenCard) */}
                    <div className="hidden md:flex items-center gap-2">
                        <motion.div
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: 1.02 }}
                            className="group px-4 py-2 flex items-center font-light tracking-widest gap-2 rounded-full justify-center border border-black/80 dark:border-white/80 cursor-pointer text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <h1>SAY HELLO</h1>
                            <ArrowUpRightIcon className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: 1.02 }}
                            className="group px-4 py-2 flex items-center font-light tracking-widest gap-2 rounded-full justify-center border border-black/80 dark:border-white/80 cursor-pointer text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                        >
                            <h1>SELECTED WORK</h1>
                            <ArrowUpRightIcon className="w-5 h-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}