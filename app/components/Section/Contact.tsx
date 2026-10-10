"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PhysicsStickers, { StickerData } from "@/app/components/Section/Hero/PhysicsStickers";

const SOCIAL_STICKERS: StickerData[] = [
    {
        id: "facebook",
        label: "Facebook",
        textColor: "text-[#1877F2] dark:text-[#60a5fa]",
        icon: "facebook",
        href: "https://facebook.com",
    },
    {
        id: "instagram",
        label: "Instagram",
        textColor: "text-[#E1306C] dark:text-[#f472b6]",
        icon: "instagram",
        href: "https://instagram.com/faqihzaky",
    },
    {
        id: "telegram",
        label: "Telegram",
        textColor: "text-[#229ED9] dark:text-[#38bdf8]",
        icon: "telegram",
        href: "https://t.me/faqihzaky",
    },
    {
        id: "whatsapp",
        label: "Whatsapp",
        textColor: "text-[#25D366] dark:text-[#4ade80]",
        icon: "whatsapp",
        href: "https://wa.me/6281234567890",
    },
];

export default function ContactSection() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("faqihzaky43@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-20 md:py-32">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full min-h-[440px] sm:min-h-[460px] md:h-[480px] lg:h-[500px] rounded-[36px] sm:rounded-[46px] md:rounded-[52px] bg-[#2d4e16] dark:bg-[#254212] backdrop-blur-2xl border border-white/25 dark:border-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_24px_60px_rgba(45,78,22,0.35)] flex flex-col md:flex-row items-start md:items-center justify-between px-8 sm:px-14 md:px-16 lg:px-20 py-10 md:py-14 overflow-hidden will-change-transform select-none"
            >
                {/* Subtle Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none rounded-[36px] sm:rounded-[46px] md:rounded-[52px] z-0" />

                {/* Frosted Grain / Noise Texture (matching GreenCard) */}
                {/* <div
                    className="hidden md:block absolute inset-0 pointer-events-none rounded-[36px] sm:rounded-[46px] md:rounded-[52px] opacity-25 dark:opacity-35 mix-blend-overlay z-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                /> */}

                {/* Left Static Content */}
                <div className="relative z-10 flex flex-col items-start text-left max-w-xl pointer-events-auto">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
                        Let’s Work Together
                    </h2>

                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed max-w-md">
                        Open to freelance, product teams and interesting experiments with motion
                    </p>

                    <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-black text-white hover:bg-neutral-900 active:scale-95 transition-all text-xs sm:text-sm font-mono tracking-widest uppercase shadow-xl cursor-pointer mt-6 sm:mt-8 border border-white/10"
                    >
                        <span>{copied ? "COPIED TO CLIPBOARD!" : "FAQIHZAKY43@GMAIL.COM"}</span>
                        {copied ? (
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Right Falling Stickers Area using PhysicsStickers */}
                <div className="relative md:absolute md:right-4 md:top-0 md:bottom-0 w-full md:w-[460px] lg:w-[540px] h-[340px] md:h-full z-10 pointer-events-auto overflow-hidden">
                    <PhysicsStickers
                        stickers={SOCIAL_STICKERS}
                        floorOffset={30}
                        triggerOnScroll={true}
                        size="lg"
                    />
                </div>
            </motion.div>
        </section>
    );
}
