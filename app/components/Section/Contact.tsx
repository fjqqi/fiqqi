"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import SecTitle from "@/app/components/ui/SecTitle";
import Button from "@/app/components/ui/Button";
import InteractiveAsterisk from "@/app/components/ui/InteractiveAsterisk";
import { ArrowUpRightIcon } from "@/app/components/Icons";
import { useLanguage } from "@/app/context/LanguageContext";
import profile from "@/app/data/profile.json";

interface ContactSectionProps {
    className?: string;
    sectionNumber?: string;
    sectionSubtitle?: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const DIRECT_CHANNELS = [
    {
        label: "WHATSAPP",
        value: profile.phone.display,
        href: profile.phone.whatsapp,
    },
    {
        label: "INSTAGRAM",
        value: profile.socials.instagram.handle,
        href: profile.socials.instagram.url,
    },
    {
        label: "TELEGRAM",
        value: profile.socials.telegram.handle,
        href: profile.socials.telegram.url,
    },
    {
        label: "LINKEDIN",
        value: profile.socials.linkedin.handle,
        href: profile.socials.linkedin.url,
    },
];

export default function ContactSection({
    className = "",
    sectionNumber = "05",
    sectionSubtitle = "五",
}: ContactSectionProps) {
    const { language } = useLanguage();
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isIndonesian = language === "id";

    return (
        <section
            id="contact"
            className={`w-full max-w-7xl mx-auto text-gray-800 dark:text-white ${
                className || "px-6 sm:px-12 md:px-16 py-20 md:py-28"
            }`}
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="w-full flex flex-col"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants}>
                    <SecTitle
                        number={sectionNumber}
                        title={isIndonesian ? "Contact" : "Contact"}
                        subtitle={sectionSubtitle}
                        mb="mb-6 sm:mb-8 md:mb-12"
                    />
                </motion.div>

                {/* Availability Status Pill */}
                <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 dark:border-white/15 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-800/80 dark:text-white/80">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        {isIndonesian
                            ? "Tersedia untuk proyek baru"
                            : "Open to new projects"}
                    </span>
                </motion.div>

                {/* Main Editorial Headline + Interactive Asterisk */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12"
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-normal text-gray-800 dark:text-white leading-[1.02]">
                                {isIndonesian ? "Mari" : "Let’s Work"}{" "}
                                <span className="font-serif italic text-primary dark:text-lime-600 font-normal">
                                    {isIndonesian ? "Berkolaborasi" : "Together"}
                                </span>
                            </h2>

                            <div className="border border-black dark:border-white rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                                <InteractiveAsterisk className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary dark:text-lime-600" />
                            </div>
                        </div>

                        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-800/75 dark:text-white/75 font-light leading-relaxed max-w-xl">
                            {isIndonesian
                                ? "Terbuka untuk freelance, kolaborasi tim produk, dan pembuatan website maupun desain antarmuka modern."
                                : "Open to freelance, product teams, and thoughtful digital experiences across web development and UI/UX design."}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
                        <Button
                            variant="solid"
                            size="lg"
                            href="/contact"
                            icon={<ArrowUpRightIcon className="w-4 h-4" />}
                        >
                            {isIndonesian ? "Mulai Proyek" : "Start a Project"}
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleCopyEmail}
                            className="font-mono tracking-wider"
                            icon={
                                copied ? (
                                    <svg
                                        className="w-4 h-4 text-emerald-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-3.5 h-3.5 opacity-70"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                )
                            }
                        >
                            {copied
                                ? isIndonesian
                                    ? "TERSALIN!"
                                    : "COPIED!"
                                : profile.email.toUpperCase()}
                        </Button>
                    </div>
                </motion.div>

                {/* Direct Channels Architectural Grid */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-black/15 dark:border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                >
                    {DIRECT_CHANNELS.map((channel) => (
                        <a
                            key={channel.label}
                            href={channel.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-1.5 py-1 transition-colors"
                        >
                            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50">
                                {channel.label}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium tracking-tight text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-lime-500 transition-colors">
                                <span className="truncate">{channel.value}</span>
                                <ArrowUpRightIcon className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        </a>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
