"use client";

import Image from "next/image";
import MePic from "@/public/me.webp";
import { motion, type Variants } from "framer-motion";
import PageHeroHeader, { type MetaStatItem } from "@/app/components/ui/PageHeroHeader";

const ABOUT_STATS: MetaStatItem[] = [
    { label: "BASED IN", value: "Makassar, INA" },
    { label: "EXPERIENCE", value: "Since 2022" },
    { label: "LANGUANGE", value: "INDO - ENG C1" },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.1,
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
            {/* Dynamic Page Hero Header matching Contact */}
            <PageHeroHeader
                titlePrefix="About"
                titleHighlight="Me"
                description="Hi. Im Fiqqi Im a Frontend Web Developer"
                stats={ABOUT_STATS}
            />

            {/* Photo + 3 Paragraphs Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 mt-6 sm:mt-10 md:mt-16 gap-6 sm:gap-8 md:gap-12 items-start pb-8 sm:pb-12 md:pb-16">
                {/* Left Column: Photo */}
                <motion.div variants={imageVariants} className="md:col-span-5 w-full">
                    <div className="relative w-full aspect-[4/4.5] overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-sm">
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
                            href="/contact"
                            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-black dark:border-white text-black dark:text-white text-[11px] sm:text-xs font-light tracking-wider uppercase inline-flex items-center gap-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                        >
                            <span>CONTACT</span>
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
                            href="https://drive.google.com/file/d/12Wn6d5WhnpKf5145MKd29kVlEg5oSRzN/view?usp=drive_link"
                            target="_blank"
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
