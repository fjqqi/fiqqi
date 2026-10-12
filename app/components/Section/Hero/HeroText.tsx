"use client";

import { useState } from "react"
import Image from "next/image"
import Guwe from "@/public/guwe.webp"
import InteractiveAsterisk from "@/app/components/ui/InteractiveAsterisk"
import { useLanguage } from "@/app/context/LanguageContext"

import { motion, type Variants } from "framer-motion"

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
    const { language } = useLanguage();

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
                                <InteractiveAsterisk className="w-6 h-6 text-primary dark:text-lime-600" />
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
                            <span className="italic font-serif text-[#3f6212] dark:text-green-900">
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
                        className="text-[15px] sm:text-base leading-snug text-black/80 dark:text-white/80 max-w-70"
                    >
                        {language === "id"
                            ? "Saya bisa bantu bangun web anda dan membuat hal menarik untuk layar"
                            : "Hi, I'm Fiqqi. i love making things for screens. sometimes with pixels, sometimes with code"}
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
                                <InteractiveAsterisk className="w-9 h-9 text-primary dark:text-lime-600" />
                            </div>
                            <span className="italic font-serif text-[#3f6212] dark:text-lime-600">
                                design
                            </span>
                            <span>& code.</span>
                        </motion.div>
                    </div>
                </h1>

                {/* Subtitle: reveals after h1 animation completes */}
                <div className="overflow-hidden mt-6 pb-1 -mb-1 w-8/10">
                    <motion.h4
                        variants={subtextVariants}
                        initial="hidden"
                        animate={h1Done ? "visible" : "hidden"}
                        className="text-lg text-black/80 dark:text-white/80 tracking-tight"
                    >
                        {language === "id" ? (
                            <>
                                Saya bisa bantu bangun <span className="text-primary dark:text-lime-600">web anda</span> dan membuat hal menarik untuk layar.
                                terkadang lewat piksel, terkadang lewat kode
                            </>
                        ) : (
                            <>
                                Hi, I'm <span className="text-primary dark:text-lime-600">Fiqqi</span> and i love making things for screens.
                                sometimes with pixels, sometimes with code
                            </>
                        )}
                    </motion.h4>
                </div>
            </motion.div>
        </div>
    );
}
