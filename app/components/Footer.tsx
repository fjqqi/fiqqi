"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/fjqqi" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com/faqihzaky" },
    { label: "Telegram", href: "https://t.me/faqihzaky" },
];

const NAV_LINKS = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "#contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#2d4e16] dark:bg-[#1e3a0d] text-white overflow-hidden relative">
            {/* Subtle grain overlay */}
            {/* <div
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            /> */}

            {/* Top border shimmer */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative z-10">

                {/* Big headline */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="pt-16 md:pt-24 pb-10 md:pb-16 border-b border-white/15"
                >
                    <p className="text-white/50 text-xs sm:text-sm font-light tracking-[0.2em] uppercase mb-6">
                        Let's build something bold
                    </p>
                    <h2 className="text-[clamp(3rem,10vw,9rem)] font-bold tracking-tighter leading-[0.9] text-white">
                        ぴき.
                    </h2>
                    <p className="mt-6 text-white/60 text-base sm:text-lg font-light max-w-md leading-relaxed">
                        Web developer crafting thoughtful interfaces through design & code.
                    </p>
                </motion.div>

                {/* Bottom grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="py-10 md:py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-0"
                >
                    {/* Left — availability + email */}
                    <div className="flex flex-col gap-5">
                        <a
                            href="mailto:faqihzaky43@gmail.com"
                            className="group flex items-center gap-3 text-white/75 hover:text-white transition-colors text-sm font-mono tracking-widest uppercase"
                        >
                            <span className="w-6 h-px bg-white/40 group-hover:w-10 group-hover:bg-white transition-all duration-300" />
                            faqihzaky43@gmail.com
                        </a>
                    </div>

                    {/* Right — nav + social */}
                    <div className="flex gap-12 sm:gap-16">
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-1">Pages</span>
                            {NAV_LINKS.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="text-sm text-white/60 hover:text-white transition-colors font-light"
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-1">Social</span>
                            {SOCIAL_LINKS.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-white/60 hover:text-white transition-colors font-light"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Copyright bar */}
                <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-xs text-white/30 font-light tracking-wide">
                        © {year} Faqih Zaky — All rights reserved
                    </p>
                    <p className="text-xs text-white/25 font-light tracking-wide">
                        Next.js · Framer Motion · Matter.js
                    </p>
                </div>
            </div>
        </footer>
    );
}
