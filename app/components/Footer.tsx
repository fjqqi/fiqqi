"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GithubIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "./Icons";
import { useLanguage } from "@/app/context/LanguageContext";
import profile from "@/app/data/profile.json";

const SOCIAL_ICON_LINKS = [
    {
        label: "Instagram",
        href: profile.socials.instagram.url,
        icon: InstagramIcon,
    },
    {
        label: "GitHub",
        href: profile.socials.github.url,
        icon: GithubIcon,
    },
    {
        label: "Telegram",
        href: profile.socials.telegram.url,
        icon: TelegramIcon,
    },
    {
        label: "WhatsApp",
        href: profile.phone.whatsapp,
        icon: WhatsappIcon,
    },
];

const LINK_COLUMNS = [
    [
        { label: "Home", href: "/", external: false },
        { label: "Work", href: "/work", external: false },
        { label: "About", href: "/about", external: false },
        { label: "Contact", href: "/contact", external: false },
    ],
    [
        { label: "Email", href: `mailto:${profile.email}`, external: true },
        { label: "WhatsApp", href: profile.phone.whatsapp, external: true },
        { label: "Telegram", href: profile.socials.telegram.url, external: true },
        { label: "LinkedIn", href: profile.socials.linkedin.url, external: true },
    ],
    [
        { label: "GitHub", href: profile.socials.github.url, external: true },
        { label: "Instagram", href: profile.socials.instagram.url, external: true },
        {
            label: "CV (EN)",
            href: profile.cv.en,
            external: true,
        },
        {
            label: "CV (ID)",
            href: profile.cv.id,
            external: true,
        },
    ],
];

export default function Footer() {
    const year = new Date().getFullYear();
    const { language } = useLanguage();

    return (
        <footer className="w-full bg-[#111111] dark:bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/10">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 flex flex-col justify-between">
                {/* Top Grid: Description + Social Icons on Left, 3-Column Links on Right */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row justify-between gap-12 md:gap-16"
                >
                    {/* Left Column */}
                    <div className="flex flex-col justify-between gap-10 md:gap-16 max-w-xs">
                        <p className="text-sm text-white/60 font-light leading-relaxed">
                            {language === "id"
                                ? "Web developer & desainer UI/UX yang merancang antarmuka web modern, cepat, dan fungsional."
                                : "Web developer & UI/UX designer crafting thoughtful interfaces through design & code."}
                        </p>

                        {/* Circular Social Icon Buttons */}
                        <div className="flex items-center gap-3">
                            {SOCIAL_ICON_LINKS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={item.label}
                                        className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 text-white/80 hover:text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: 3-Column Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 sm:gap-x-14 md:gap-x-16 gap-y-8">
                        {LINK_COLUMNS.map((column, colIdx) => (
                            <div key={colIdx} className="flex flex-col gap-3">
                                {column.map((item) =>
                                    item.external ? (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                                            rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                            className="text-sm text-white/55 hover:text-white transition-colors font-light"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="text-sm text-white/55 hover:text-white transition-colors font-light"
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Giant Oversized Brand Wordmark */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-14 sm:mt-16 md:mt-20 mb-8 sm:mb-10 select-none"
                >
                    <h2 className="text-[clamp(5.5rem,24vw,17rem)] font-bold tracking-tighter leading-[0.88] text-white">
                        ぴき.
                    </h2>
                </motion.div>

                {/* Bottom Copyright Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white/40 font-light">
                    <div className="flex items-center gap-4">
                        <a
                            href={`mailto:${profile.email}`}
                            className="hover:text-white/75 transition-colors"
                        >
                            {profile.email}
                        </a>
                        <span>Makassar, INA</span>
                    </div>
                    <p>© {year} Fiqqi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
