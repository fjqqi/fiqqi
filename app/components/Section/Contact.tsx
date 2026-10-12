"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PhysicsStickers, { StickerData } from "@/app/components/Section/Hero/PhysicsStickers";
import Button from "@/app/components/ui/Button";
import { FacebookIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "@/app/components/Icons";

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
                className="relative w-full rounded-[32px] sm:rounded-[44px] md:rounded-[52px] bg-[#2d4e16] dark:bg-[#254212] md:backdrop-blur-2xl border border-white/25 dark:border-white/15 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35),0_24px_60px_rgba(45,78,22,0.35)] flex flex-col md:flex-row items-start md:items-center justify-between px-7 sm:px-14 md:px-16 lg:px-20 py-10 md:py-14 md:min-h-[480px] lg:h-[500px] overflow-hidden select-none"
            >
                {/* Subtle Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none rounded-[32px] sm:rounded-[44px] md:rounded-[52px] z-0" />

                {/* Left Static Content */}
                <div className="relative z-10 flex flex-col items-start text-left max-w-xl pointer-events-auto">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-tight">
                        Let’s Work Together
                    </h2>

                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed max-w-md">
                        Open to freelance, product teams and interesting experiments with motion
                    </p>

                    <Button
                        variant="solid"
                        size="lg"
                        onClick={handleCopyEmail}
                        className="mt-6 sm:mt-8 font-mono tracking-widest shadow-xl border-white/10"
                        icon={
                            copied ? (
                                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            )
                        }
                    >
                        {copied ? "COPIED TO CLIPBOARD!" : "FAQIHZAKY43@GMAIL.COM"}
                    </Button>

                    {/* Mobile Social Pills (Instant native touch response, zero frame drops or scroll blocking) */}
                    <div className="flex md:hidden flex-wrap items-center gap-2.5 mt-8 w-full">
                        {SOCIAL_STICKERS.map((s) => (
                            <a
                                key={s.id}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-white/20 text-xs sm:text-sm font-mono tracking-tight active:scale-95 transition-transform ${s.textColor}`}
                            >
                                {s.icon === "facebook" && <FacebookIcon className="w-4 h-4 fill-[#1877F2] dark:fill-[#60a5fa] shrink-0" />}
                                {s.icon === "instagram" && <InstagramIcon className="w-4 h-4 fill-[#E1306C] dark:fill-[#f472b6] shrink-0" />}
                                {s.icon === "telegram" && <TelegramIcon className="w-4 h-4 fill-[#229ED9] dark:fill-[#38bdf8] shrink-0" />}
                                {s.icon === "whatsapp" && <WhatsappIcon className="w-4 h-4 fill-[#25D366] dark:fill-[#4ade80] shrink-0" />}
                                <span>{s.label}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Desktop Falling Stickers Area using PhysicsStickers */}
                <div className="hidden md:block md:absolute md:right-4 md:top-0 md:bottom-0 md:w-[460px] lg:w-[540px] md:h-full z-10 pointer-events-auto overflow-hidden">
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
