"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SecTitle from "@/app/components/ui/SecTitle";
import PageHeroHeader, { type MetaStatItem } from "@/app/components/ui/PageHeroHeader";
import { PROJECTS } from "@/app/components/Section/Projects/projectsData";
import WorkProjectCard from "./components/WorkProjectCard";
import Button from "@/app/components/ui/Button";
import { useLanguage } from "@/app/context/LanguageContext";

const WORK_STATS_EN: MetaStatItem[] = [
    { label: "PROJECTS", value: "9" },
    { label: "YEARS", value: "2024 -2026" },
];

const WORK_STATS_ID: MetaStatItem[] = [
    { label: "PROYEK", value: "9" },
    { label: "TAHUN", value: "2024 -2026" },
];

const CATEGORIES = ["ALL", "WEBSITE", "DESIGN", "MOBILE"] as const;

const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.05,
        },
    },
};

const sectionItemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function WorkPage() {
    const { language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<string>("ALL");

    const filteredProjects =
        activeCategory === "ALL"
            ? PROJECTS
            : PROJECTS.filter(
                (p) =>
                    p.type?.toUpperCase() === activeCategory ||
                    p.category?.toUpperCase() === activeCategory
            );

    const stats = language === "id" ? WORK_STATS_ID : WORK_STATS_EN;
    const description =
        language === "id"
            ? "Beberapa proyek dan desain pilihan saya yang dibangun untuk berbagai klien dan agensi."
            : "some of my highlighted project and design for some compnay and my work for ageny lorem ipsum";

    return (
        <>
            <Navbar />

            <main
                id="main-content"
                className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 overflow-x-clip"
            >
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-24 sm:pt-28 md:pt-40 pb-16 md:pb-24 flex flex-col"
                >
                    {/* Section 01: Header */}
                    <motion.div variants={sectionItemVariants}>
                        <SecTitle
                            number="01"
                            title="Projects"
                            subtitle={
                                <span className="w-6 h-[3px] bg-primary dark:bg-lime-600 inline-block rounded-full align-middle" />
                            }
                            mb="mb-4 sm:mb-6 md:mb-10"
                        />
                    </motion.div>

                    {/* Dynamic Hero Header consistent with About and Contact */}
                    <motion.div variants={sectionItemVariants}>
                        <PageHeroHeader
                            titlePrefix="Selected"
                            titleHighlight="Work"
                            description={description}
                            stats={stats}
                        />
                    </motion.div>

                    {/* Filter Category Pills */}
                    <motion.div
                        variants={sectionItemVariants}
                        className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-12"
                    >
                        {CATEGORIES.map((cat) => (
                            <Button
                                key={cat}
                                type="button"
                                variant="toggle"
                                size="md"
                                isActive={activeCategory === cat}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </Button>
                        ))}
                    </motion.div>

                    {/* 2-Column Projects Grid matching mockup */}
                    <motion.div
                        layout
                        variants={sectionItemVariants}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-start"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <WorkProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </>
    );
}
