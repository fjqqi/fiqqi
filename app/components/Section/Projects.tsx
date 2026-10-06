"use client";

import SecTitle from "../ui/SecTitle";
import ProjectsSlider from "./Projects/ProjectsSlider";
import { PROJECTS } from "./Projects/projectsData";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        const ctx = gsap.context(() => {
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
        }, section);

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
            ctx.revert();
        };
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative z-20 w-full h-screen min-h-[600px] flex flex-col justify-center overflow-hidden  dark:bg-zinc-950 transition-colors py-8 md:py-12"
        >
            <div className="w-full max-w-7xl mx-auto pt-16 px-6 sm:px-12 md:px-16 text-black dark:text-white shrink-0 mb-6 md:mb-8">
                <SecTitle
                    number="02"
                    title="Selected Work"
                    subtitle="三"
                />
            </div>

            <div className="w-full overflow-hidden pl-6 sm:pl-12 md:px-16">
                <div ref={trackRef} className="w-max">
                    <ProjectsSlider projects={PROJECTS} />
                </div>
            </div>
        </section>
    );
}