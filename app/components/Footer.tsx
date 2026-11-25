"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubIcon, InstagramIcon, TelegramIcon, WhatsappIcon } from "./Icons";
import { useLanguage } from "@/app/context/LanguageContext";
import profile from "@/app/data/profile.json";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

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
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const footer = footerRef.current;
        const content = contentRef.current;
        const wordmark = wordmarkRef.current;
        if (!footer || !content) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // Curtain-reveal parallax: footer content glides down from behind the page edge as it enters
            gsap.fromTo(
                content,
                { yPercent: -35 },
                {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                }
            );

            // Subtle secondary depth parallax on the giant wordmark
            if (wordmark) {
                gsap.fromTo(
                    wordmark,
                    { yPercent: -15 },
                    {
                        yPercent: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: footer,
                            start: "top bottom",
                            end: "bottom bottom",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }
        }, footerRef);

        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(refreshTimer);
            ctx.revert();
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="w-full bg-[#111111] dark:bg-[#0a0a0a] text-white overflow-hidden relative border-t border-white/10"
        >
            <div
                ref={contentRef}
                className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 flex flex-col justify-between will-change-transform"
            >
                {/* Top Grid: Description + Social Icons on Left, 3-Column Links on Right */}
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16">
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
                </div>

                {/* Giant Oversized Brand Wordmark */}
                <div
                    ref={wordmarkRef}
                    className="mt-14 sm:mt-16 md:mt-20 mb-8 sm:mb-10 select-none will-change-transform"
                >
                    <h2 className="text-[clamp(5.5rem,24vw,17rem)] font-bold tracking-tighter leading-[0.88] text-white">
                        ぴき.
                    </h2>
                </div>

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
