"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SecTitle from "@/app/components/ui/SecTitle";

interface StackCategory {
    id: string;
    label: string;
    items: {
        name: string;
        role: string;
        level: string;
        description: string;
    }[];
}

const CATEGORIES: StackCategory[] = [
    {
        id: "engineering",
        label: "Engineering",
        items: [
            {
                name: "Next.js (App Router)",
                role: "Full-Stack React Framework",
                level: "Daily Driver",
                description: "Server Components, Server Actions, Route Handlers, and Turbopack for ultra-fast production web apps.",
            },
            {
                name: "React 19 & TypeScript",
                role: "Component Architecture",
                level: "Advanced",
                description: "Writing strictly typed, reusable hooks and state logic with clean concurrency and zero runtime surprises.",
            },
            {
                name: "Tailwind CSS v4",
                role: "Modern Styling Engine",
                level: "Expert",
                description: "Clean utility-first workflows, custom design tokens, dark mode variants, and responsive fluid layouts.",
            },
            {
                name: "Node.js & APIs",
                role: "Backend & Data Integration",
                level: "Proficient",
                description: "RESTful architectures, webhooks, authentication flows, and serverless edge functions.",
            },
        ],
    },
    {
        id: "motion",
        label: "Motion & Physics",
        items: [
            {
                name: "Framer Motion",
                role: "Declarative UI Animations",
                level: "Advanced",
                description: "Layout projections, gestural interactions, spring physics, and scroll-linked timeline sequences.",
            },
            {
                name: "GSAP & ScrollTrigger",
                role: "Complex Visual Choreography",
                level: "Proficient",
                description: "Pinned parallax sections, timeline scrubbing, and multi-stage SVG transformations.",
            },
            {
                name: "Matter.js",
                role: "2D Rigid-Body Physics",
                level: "Interactive",
                description: "Interactive gravity, collision mechanics, and bouncy draggable sticker badges.",
            },
            {
                name: "Lenis",
                role: "Smooth Scroll Engine",
                level: "Integration",
                description: "Silky 60fps momentum scrolling that bridges native scroll events with high-performance animations.",
            },
        ],
    },
    {
        id: "design",
        label: "Design & Systems",
        items: [
            {
                name: "Figma",
                role: "Design & Prototyping",
                level: "Advanced",
                description: "Building scalable atomic design systems, auto layouts, variable modes, and interactive prototypes.",
            },
            {
                name: "UI & Interaction Design",
                role: "Spatial UX & Visual Hierarchy",
                level: "Specialist",
                description: "Crafting editorial typography, glassmorphic surfaces, tactile buttons, and intentional whitespace.",
            },
            {
                name: "Design Systems",
                role: "Tokens & Component Consistency",
                level: "Advanced",
                description: "Translating color palettes, typography scales, and component specs directly into maintainable code.",
            },
            {
                name: "Accessibility & Usability",
                role: "Inclusive Experience",
                level: "Standard",
                description: "Keyboard navigation, screen reader semantics, color contrast ratios, and touch-target compliance.",
            },
        ],
    },
    {
        id: "tools",
        label: "Tools & Ecosystem",
        items: [
            {
                name: "Git & GitHub",
                role: "Version Control",
                level: "Daily Driver",
                description: "Clean git history, branching workflows, PR reviews, and CI/CD automation pipelines.",
            },
            {
                name: "Vercel & Cloud",
                role: "Edge Deployment",
                level: "Production",
                description: "Continuous deployments, preview environments, analytics, and instant global CDN distribution.",
            },
            {
                name: "VS Code & Terminal",
                role: "Development Environment",
                level: "Customized",
                description: "Zsh environment, custom vim motions, linting rules, and strict TypeScript configurations.",
            },
            {
                name: "Supabase & Postgres",
                role: "Database & Backend Service",
                level: "Intermediate",
                description: "Relational database tables, row-level security policies, and real-time client subscriptions.",
            },
        ],
    },
];

export default function AboutStack() {
    const [activeTab, setActiveTab] = useState<string>("engineering");

    const activeCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

    return (
        <section className="w-full bg-zinc-100/70 dark:bg-zinc-950/70 py-20 transition-colors border-y border-black/10 dark:border-white/10">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 text-black dark:text-white">
                <SecTitle
                    number="03"
                    title="The Toolkit & Stack"
                    subtitle="道具"
                />

                {/* Category Navigation Pills */}
                <div className="flex flex-wrap items-center gap-2 mt-8 mb-10">
                    {CATEGORIES.map((cat) => {
                        const isActive = cat.id === activeTab;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                type="button"
                                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all cursor-pointer ${isActive
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Stack Cards Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        {activeCategory.items.map((item, idx) => (
                            <div
                                key={item.name}
                                className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-sm hover:border-primary/50 dark:hover:border-primary/50 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <h4 className="text-lg sm:text-xl font-semibold tracking-tight group-hover:text-primary dark:group-hover:text-lime-400 transition-colors">
                                            {item.name}
                                        </h4>
                                        <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/60 dark:text-white/60 shrink-0">
                                            {item.level}
                                        </span>
                                    </div>
                                    <p className="text-xs font-mono uppercase tracking-wider text-primary dark:text-lime-400 mb-4">
                                        {item.role}
                                    </p>
                                    <p className="text-sm leading-relaxed text-black/70 dark:text-white/70 font-light">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-black/40 dark:text-white/40 font-mono">
                                    <span>#{activeTab}</span>
                                    <span>0{idx + 1}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
