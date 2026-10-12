"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "../../Icons";
import Button from "../../ui/Button";

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
                    className="w-full h-px bg-black/10 dark:bg-white/15 origin-left"
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
                        <Button
                            href="/contact"
                            size="md"
                            icon={<ArrowUpRightIcon className="w-4 h-4  stroke-[2.5]" />}
                        >
                            SAY HELLO
                        </Button>
                        <Button
                            href="/work"
                            size="md"
                            icon={<ArrowUpRightIcon className="w-4 h-4  stroke-[2.5]" />}
                        >
                            SELECTED WORK
                        </Button>
                    </div>
                </motion.div>
            </section>
        </>
    );
}