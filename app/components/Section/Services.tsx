"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Pic1 from "@/public/services/1.webp";
import Pic2 from "@/public/services/2.webp";
import Pic3 from "@/public/services/3.webp";
import Pic4 from "@/public/services/4.webp";
import Pic5 from "@/public/services/5.webp";
import Pic6 from "@/public/services/6.webp";
import SecTitle from "../ui/SecTitle";

const SERVICES = [
    {
        title: "Design",
        description:
            "Prototypes and design systems in Figma: grids, typography, component states. Design that can be built without surprises in the markup.",
        tags: ["UI / UX", "DESIGN SYSTEM", "PROTOTYPING"],
    },
    {
        title: "Build",
        description:
            "Production-ready web applications built with Next.js, TypeScript, and clean CSS. Fast, accessible, resilient, and responsive across every device.",
        tags: ["NEXT.JS", "TYPESCRIPT", "TAILWIND CSS"],
    },
    {
        title: "Grow",
        description:
            "Continuous performance audits, Core Web Vitals optimization, and conversion-focused iteration to scale traffic into lasting user engagement.",
        tags: ["SEO & PERFORMANCE", "ANALYTICS", "OPTIMIZATION"],
    },
];

export default function ServicesSection() {
    // =========================================================================
    // HOW THIS STICKY PARALLAX SCROLL WORKS:
    //
    // 1. Desktop Layout:
    //    - Left column (.leftsec) is sticky (`md:sticky md:top-22 md:h-screen`).
    //    - Right column (.rightsec) contains all 6 connected images (each `h-[90vh]`).
    //    - As you scroll down the page, .leftsec stays pinned while the 6 images scroll.
    //
    // 2. Mobile Layout (Sticky Screen Container):
    //    - The section has a scroll track (`h-[350vh] md:h-auto`).
    //    - Inside, a sticky container pins the viewport (`sticky top-20 h-[calc(100dvh-5rem)]`).
    //    - Top 42vh is the image aperture (.rightsec). As you scroll the page, the 6-image
    //      strip glides smoothly upward through the aperture.
    //    - Bottom 58vh is .leftsec, remaining pinned in place with title, description,
    //      tags, and progress bar matching your mobile design.
    //
    // 3. Milestone Detection:
    //    - Progress 0.00 - 0.33: Design (Images 1 & 2)
    //    - Progress 0.33 - 0.66: Build  (Images 3 & 4)
    //    - Progress 0.66 - 1.00: Grow   (Images 5 & 6)
    // =========================================================================

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Track scroll progress across the services section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Update active service every 2 pictures scrolled
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) {
            setActiveIndex(0);
        } else if (latest < 0.66) {
            setActiveIndex(1);
        } else {
            setActiveIndex(2);
        }
    });

    // On mobile, the 6-image reel translates up smoothly as the page scrolls
    // (5 out of 6 intervals = 5/6 = 83.333%)
    const mobileY = useTransform(scrollYProgress, [0, 1], ["0%", "-83.333%"]);

    // Smoothly scroll to the target category
    const scrollToService = (index: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top;
        const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
        const targetScroll = scrollTop + (index / 2.2) * totalScrollable;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    const currentService = SERVICES[activeIndex];

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-white dark:bg-zinc-900 transition-colors h-[350vh] md:h-auto"
        >
            {/* Sticky Container on mobile, static flex layout on desktop */}
            <div className="sticky top-20 md:static w-full h-[calc(100dvh-5rem)] md:h-auto flex flex-col md:flex-row items-start overflow-hidden md:overflow-visible">
                {/* Content Section (Mobile bottom 58vh, Desktop left sticky column) */}
                <section className="leftsec order-2 md:order-1 md:sticky md:top-22 w-full md:w-1/2 h-[58vh] md:h-screen flex-1 justify-between flex flex-col max-w-7xl mx-auto px-6 sm:px-12 md:px-16 pt-5 md:pt-16 pb-6 md:pb-40 text-black dark:text-white bg-white dark:bg-zinc-900 shrink-0">
                    <div className="content pl-0 md:pl-28">
                        <SecTitle
                            number="03"
                            title="What can i help with?"
                            subtitle="いち"
                        />
                        <div className="top">
                            <div className="mb-4 md:mb-20">
                                <h1 className="md:text-6xl text-3xl tracking-tighter leading-snug md:leading-tight transition-all duration-200">
                                    {currentService.title}
                                </h1>
                                <p className="text-sm md:text-lg mt-2 md:mt-5 tracking-tight transition-all duration-200 text-neutral-600 dark:text-neutral-300 line-clamp-3 md:line-clamp-none">
                                    {currentService.description}
                                </p>
                            </div>

                            <ul className="flex flex-wrap gap-2">
                                {currentService.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="py-1 px-2.5 md:py-2 md:px-3 flex items-center justify-center font-light tracking-wider gap-1.5 rounded-full border border-black/80 dark:border-white/80 bg-white dark:bg-zinc-900 shadow-sm cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs md:text-sm"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="footer pl-0 md:pl-28 mt-4 md:mt-0">
                        <div className="scrollProgress flex w-full">
                            <div
                                className={`h-[2px] bg-primary transition-all duration-300 ${activeIndex === 0 ? "w-1/3" : activeIndex === 1 ? "w-2/3" : "w-full"
                                    }`}
                            ></div>
                            <div className="h-[2px] bg-gray-200 dark:bg-zinc-800 flex-1"></div>
                        </div>

                        <div className="flex justify-between tracking-tighter mt-3 text-xs md:text-base">
                            <button
                                type="button"
                                onClick={() => scrollToService(0)}
                                className={`cursor-pointer transition-colors ${activeIndex === 0
                                    ? "font-bold text-primary"
                                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                                    }`}
                            >
                                Design
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToService(1)}
                                className={`cursor-pointer transition-colors ${activeIndex === 1
                                    ? "font-bold text-primary"
                                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                                    }`}
                            >
                                Build
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToService(2)}
                                className={`cursor-pointer transition-colors ${activeIndex === 2
                                    ? "font-bold text-primary"
                                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                                    }`}
                            >
                                Grow
                            </button>
                        </div>
                    </div>
                </section>

                {/* Right Column: 6 Images (Mobile top 42vh aperture with continuous scroll, Desktop right 540vh natural scroll) */}
                <section className="rightsec order-1 md:order-2 w-full md:w-1/2 h-[42vh] md:h-auto overflow-hidden md:overflow-visible flex flex-col bg-gray-600 justify-between max-w-7xl mx-auto text-black border-b border-black/15 dark:border-white/15 md:border-b-0 shrink-0">
                    <motion.div
                        className="w-full flex flex-col"
                        style={{ y: isMobile ? mobileY : 0 }}
                    >
                        <div className="h-[42vh] md:h-[90vh] flex-1 shrink-0 relative w-full">
                            <Image src={Pic1} alt="Design 1" className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>

                        <div className="h-[42vh] md:h-[90vh] flex-1 shrink-0 relative w-full">
                            <Image src={Pic2} alt="Design 2" className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>

                        <div className="h-[42vh] md:h-[90vh] flex-1 shrink-0 relative w-full">
                            <Image src={Pic3} alt="Build 1" className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>

                        <div className="h-[42vh] md:h-[90vh] flex-1 shrink-0 relative w-full">
                            <Image src={Pic4} alt="Build 2" className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>

                        <div className="h-[42vh] md:h-[90vh] flex-1 shrink-0 relative w-full">
                            <Image src={Pic5} alt="Grow 1" className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>

                        <div className="h-[42vh] md:h-[90vh] flex-1 shrink-0 relative w-full">
                            <Image src={Pic6} alt="Grow 2" className="w-full h-full object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}