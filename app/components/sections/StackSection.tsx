"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface TechItem {
    name: string;
    logo?: string;
    icon?: React.ReactNode;
    color?: string;
}

const developmentStack: TechItem[] = [
    { name: "Next.js", logo: "/stacks logo/next.webp" },
    { name: "Laravel", logo: "/stacks logo/laravel.webp" },
    { name: "React", logo: "/stacks logo/react.webp" },
    { name: "Flutter", logo: "/stacks logo/flutter.webp" },
    { name: "Tailwind CSS", logo: "/stacks logo/tailwind.webp" },
    { name: "JavaScript", logo: "/stacks logo/js.webp" },
    {
        name: "TypeScript",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <rect width="24" height="24" rx="4" fill="#3178C6" />
                <path d="M12.5 10H7v2h2.5v7h2.5v-7H12.5v-2zM15 15.2c.7.5 1.5.8 2.3.8.8 0 1.2-.3 1.2-.8 0-.5-.5-.7-1.4-1.1-1.3-.5-2.1-1.3-2.1-2.4 0-1.5 1.2-2.7 3.1-2.7 1 0 1.9.3 2.6.8l-.8 1.8c-.6-.4-1.2-.6-1.8-.6-.7 0-1.1.3-1.1.7 0 .5.4.7 1.3 1.1 1.4.5 2.2 1.3 2.2 2.5 0 1.6-1.3 2.7-3.3 2.7-1.2 0-2.3-.4-3.1-1l.8-1.9z" fill="#FFFFFF" />
            </svg>
        ),
    },
    { name: "Vue.js", logo: "/stacks logo/vue.webp" },
    { name: "PostgreSQL", logo: "/stacks logo/posgre.webp" },
    { name: "Supabase", logo: "/stacks logo/supabase.webp" },
    { name: "AWS", logo: "/stacks logo/aws.webp" },
    {
        name: "Node.js / NPM",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 2L2 7.8v9.4L12 23l10-5.8V7.8L12 2z" fill="#339933" />
                <path d="M12 4.4l7.6 4.4v7.4L12 20.6l-7.6-4.4V8.8L12 4.4z" fill="#215732" />
                <path d="M11 8h2v8h-2V8z" fill="#FFFFFF" />
            </svg>
        ),
    },
];

const designStack: TechItem[] = [
    { name: "Figma", logo: "/stacks logo/figma.webp" },
    { name: "Photoshop (PS)", logo: "/stacks logo/photoshop.webp" },
    { name: "Illustrator (AI)", logo: "/stacks logo/ai.webp" },
    { name: "Canva", logo: "/stacks logo/canva.webp" }
];

function TechCircle({ item }: { item: TechItem }) {
    return (
        <div className="relative group flex flex-col items-center hover:z-30">
            {/* Circle container */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white/80 dark:bg-white/[0.05] backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-primary/50 hover:shadow-[0_6px_20px_rgba(29,185,84,0.2)] cursor-pointer">
                {item.logo ? (
                    <Image
                        src={item.logo}
                        alt={item.name}
                        width={28}
                        height={28}
                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-200 group-hover:scale-105"
                    />
                ) : item.icon ? (
                    item.icon
                ) : (
                    <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color || "#1db954" }}
                    />
                )}
            </div>

            {/* Floating Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-30 whitespace-nowrap bg-foreground text-background text-[0.7rem] sm:text-xs font-semibold px-2.5 py-1 rounded-md shadow-lg">
                {item.name}
            </div>
        </div>
    );
}

export default function StackSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        const els = sectionRef.current?.querySelectorAll(".reveal-on-scroll") ?? [];
        els.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="stack"
            ref={sectionRef}
            className="py-14 sm:py-24 px-5 sm:px-8 max-w-[960px] mx-auto w-full"
        >
            {/* ── Section Header ── */}
            <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
                <h2 className="reveal-on-scroll text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-foreground">
                    My <span className="text-primary">Stack</span>
                </h2>
                <p className="reveal-on-scroll text-muted text-sm sm:text-base max-w-[500px] mt-2.5 leading-relaxed">
                    The tool i used
                </p>
            </div>

            {/* ── 2-Column Grid: Development & Design ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
                {/* ── Card 1: Development ── */}
                <div className="reveal-on-scroll flex flex-col justify-between rounded-2xl border border-black/[0.5] dark:border-white/[0.08] bg-card backdrop-blur-xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all duration-300">
                    <div>
                        {/* Card Header with Icon */}
                        <div className="flex items-center gap-3.5 mb-4">
                            {/* <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full">
                                <span className="text-white font-bold text-2xl">1</span>
                            </div> */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                                    Development
                                </h3>
                            </div>
                        </div>



                        {/* Circular Logo Icons */}
                        <div className="flex flex-wrap gap-3 sm:gap-3.5 pt-1 pb-2">
                            {developmentStack.map((tech) => (
                                <TechCircle key={tech.name} item={tech} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Card 2: Design ── */}
                <div className="reveal-on-scroll stagger-1 flex flex-col justify-between rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-card backdrop-blur-xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all duration-300">
                    <div>
                        {/* Card Header with Icon */}
                        <div className="flex items-center gap-3.5 mb-4">
                            <div className="w-11 h-11 rounded-2xl bg-[#a259ff]/10 border border-[#a259ff]/25 flex items-center justify-center shrink-0 text-[#a259ff]">
                                {/* Pen tool / design icon */}
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                                    <path d="M2 2l7.586 7.586" />
                                    <circle cx="11" cy="11" r="2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                                    Design &amp; Creative
                                </h3>
                                <p className="text-xs text-muted-light">
                                    UI/UX, Visual Assets &amp; Motion
                                </p>
                            </div>
                        </div>

                        <p className="text-muted text-xs sm:text-sm leading-relaxed mb-6">
                            Designing aesthetic, user-first interfaces, vector branding,
                            motion animations, and video content.
                        </p>

                        {/* Circular Logo Icons */}
                        <div className="flex flex-wrap gap-3 sm:gap-3.5 pt-1 pb-2">
                            {designStack.map((tech) => (
                                <TechCircle key={tech.name} item={tech} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
