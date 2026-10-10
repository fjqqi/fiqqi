"use client";

import SecTitle from "../ui/SecTitle";
import ProjectsSlider from "./Projects/ProjectsSlider";
import ProjectCard from "./Projects/ProjectCard";
import { PROJECTS } from "./Projects/projectsData";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [showAllMobile, setShowAllMobile] = useState(false);

    const mobileProjects = showAllMobile ? PROJECTS : PROJECTS.slice(0, 4);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const getScrollAmount = () => {
                return Math.max(0, track.scrollWidth - window.innerWidth + 160);
            };

            gsap.to(track, {
                x: () => -getScrollAmount(),
                ease: "none",

                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    anticipatePin: 0.2,
                },
            });
        });

        // Ensure all preceding sections (Hero, Approach, fonts) have laid out
        // before calculating the pinned trigger position
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 150);

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(refreshTimer);
            window.removeEventListener("resize", handleResize);
            mm.revert();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
        return () => clearTimeout(timer);
    }, [showAllMobile]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-20 w-full min-h-0 md:min-h-[600px] md:h-screen flex flex-col justify-start md:justify-center overflow-visible md:overflow-hidden dark:bg-zinc-950 transition-colors py-12 md:py-12"
        >
            <div className="w-full max-w-7xl mx-auto pt-4 md:pt-16 px-6 sm:px-12 md:px-16 text-black dark:text-white shrink-0 mb-6 md:mb-8">
                <SecTitle
                    number="02"
                    title="Selected Work"
                    subtitle="三"
                />
            </div>

            {/* Mobile: Vertically Scrolled Project List (Max 4 by default) */}
            <div className="flex md:hidden flex-col gap-6 px-6 sm:px-12 w-full max-w-7xl mx-auto">
                {mobileProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        className="w-full"
                    />
                ))}

                {PROJECTS.length > 4 && (
                    <div className="flex justify-center pt-2 pb-4">
                        <button
                            type="button"
                            onClick={() => setShowAllMobile((prev) => !prev)}
                            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white text-sm font-medium tracking-tight backdrop-blur-sm transition-all duration-300 active:scale-95 shadow-sm cursor-pointer"
                        >
                            <span>{showAllMobile ? "View less projects" : "View more projects"}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 ${showAllMobile ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop: Pinned Horizontal Slider */}
            <div className="hidden md:block w-full overflow-hidden pl-6 sm:pl-12 md:px-16">
                <div ref={trackRef} className="w-max">
                    <ProjectsSlider projects={PROJECTS} />
                </div>
            </div>
        </section>
    );
}