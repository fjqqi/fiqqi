"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SecTitle from "@/app/components/ui/SecTitle";
import Button from "@/app/components/ui/Button";
import ProjectBrowserMockup from "@/app/components/Section/Projects/ProjectBrowserMockup";
import { PROJECTS } from "@/app/components/Section/Projects/projectsData";
import { useLanguage } from "@/app/context/LanguageContext";

/* ─── Animation Variants ───────────────────────────────── */

const pageVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
};

const heroReveal: Variants = {
    hidden: { opacity: 0, y: "120%" },
    visible: {
        opacity: 1,
        y: "0%",
        transition: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
    },
};

/* ─── Helper ───────────────────────────────────────────── */

function findProject(slug: string) {
    return PROJECTS.find((p) => p.id === slug) ?? null;
}

/** Returns the next project in the list, wrapping around. */
function getNextProject(currentId: string) {
    const idx = PROJECTS.findIndex((p) => p.id === currentId);
    return PROJECTS[(idx + 1) % PROJECTS.length];
}

/* ─── Page Component ───────────────────────────────────── */

export default function ProjectDetailClient({
    slug,
}: {
    slug: string;
}) {
    const { language } = useLanguage();
    const project = findProject(slug);

    if (!project) notFound();

    const description =
        project.description?.[language] ??
        project.description?.en ??
        (language === "id"
            ? "Detail proyek segera hadir."
            : "Project details coming soon.");

    const nextProject = getNextProject(project.id);

    return (
        <>
            <Navbar />

            <main
                id="main-content"
                className="w-full min-h-screen bg-white dark:bg-black text-gray-800 dark:text-white transition-colors duration-200 overflow-x-clip"
            >
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-24 sm:pt-28 md:pt-40 pb-16 md:pb-24 flex flex-col"
                >
                    {/* ── Back Link ─────────────────────────── */}
                    <motion.div variants={fadeUp}>
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-gray-800/60 dark:text-white/60 hover:text-primary dark:hover:text-lime-500 transition-colors mb-6 sm:mb-8 group"
                        >
                            <svg
                                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            {language === "id" ? "Kembali" : "Back to work"}
                        </Link>
                    </motion.div>

                    {/* ── Section Title ─────────────────────── */}
                    <motion.div variants={fadeUp}>
                        <SecTitle
                            number="01"
                            title={project.category}
                            subtitle={
                                <span className="w-6 h-[3px] bg-primary dark:bg-lime-600 inline-block rounded-full align-middle" />
                            }
                            mb="mb-4 sm:mb-6 md:mb-10"
                        />
                    </motion.div>

                    {/* ── Hero Title ────────────────────────── */}
                    <motion.div variants={fadeUp} className="pb-4 sm:pb-8">
                        <div className="overflow-hidden pb-2 -mb-2">
                            <motion.h1
                                variants={heroReveal}
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight font-normal text-gray-800 dark:text-white leading-tight"
                            >
                                {project.title}
                            </motion.h1>
                        </div>
                    </motion.div>

                    {/* ── Meta Row ──────────────────────────── */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-black/10 dark:border-white/10"
                    >
                        <div className="flex items-center gap-6 sm:gap-8 md:gap-14 flex-wrap">
                            {project.role && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-1">
                                        {language === "id" ? "PERAN" : "ROLE"}
                                    </span>
                                    <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 dark:text-white tracking-tighter">
                                        {project.role}
                                    </span>
                                </div>
                            )}
                            {project.client && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-1">
                                        {language === "id" ? "KLIEN" : "CLIENT"}
                                    </span>
                                    <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 dark:text-white tracking-tighter">
                                        {project.client}
                                    </span>
                                </div>
                            )}
                            {project.year && (
                                <div className="flex flex-col">
                                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-1">
                                        {language === "id" ? "TAHUN" : "YEAR"}
                                    </span>
                                    <span className="text-xs sm:text-sm md:text-base font-medium text-gray-800 dark:text-white tracking-tighter">
                                        {project.year}
                                    </span>
                                </div>
                            )}
                        </div>

                        {project.url && project.url !== "-" && (
                            <Button
                                variant="outline"
                                size="lg"
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                icon={
                                    <svg
                                        className="w-3.5 h-3.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                }
                            >
                                {language === "id"
                                    ? "Lihat Live"
                                    : "Visit Live Site"}
                            </Button>
                        )}
                    </motion.div>

                    {/* ── Hero Browser Mockup ───────────────── */}
                    <motion.div variants={fadeUp} className="mt-8 sm:mt-12 md:mt-16">
                        <div
                            className="w-full p-6 sm:p-10 md:p-14 lg:p-16 flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl"
                            style={{ backgroundColor: project.bgColor }}
                        >
                            <div className="w-full max-w-5xl">
                                <ProjectBrowserMockup
                                    image={project.image}
                                    title={project.title}
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Description & Tech ────────────────── */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_320px] gap-10 md:gap-16"
                    >
                        {/* Left: Description */}
                        <div>
                            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-gray-800 dark:text-white mb-4 sm:mb-6">
                                {language === "id"
                                    ? "Tentang Proyek"
                                    : "About the Project"}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-800/80 dark:text-white/80 leading-relaxed font-light whitespace-pre-line">
                                {description}
                            </p>
                        </div>

                        {/* Right: Details Sidebar */}
                        <div className="flex flex-col gap-6">
                            {/* Tech Stack */}
                            {project.tags && project.tags.length > 0 && (
                                <div>
                                    <h3 className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-3">
                                        {language === "id"
                                            ? "TEKNOLOGI"
                                            : "TECH STACK"}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1.5 rounded-full border border-black/15 dark:border-white/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-gray-800/75 dark:text-white/75"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Category */}
                            <div>
                                <h3 className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-3">
                                    {language === "id" ? "KATEGORI" : "CATEGORY"}
                                </h3>
                                <span className="px-3.5 py-1.5 rounded-full border border-black/15 dark:border-white/15 text-[11px] sm:text-xs uppercase tracking-wider text-gray-800/80 dark:text-white/80 font-medium">
                                    {project.category}
                                </span>
                            </div>

                            {/* Website Link */}
                            {project.url && project.url !== "-" && (
                                <div>
                                    <h3 className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-3">
                                        {language === "id" ? "WEBSITE" : "WEBSITE"}
                                    </h3>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary dark:text-lime-500 hover:underline underline-offset-4 font-medium"
                                    >
                                        {project.link}
                                    </a>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* ── Gallery (if available) ────────────── */}
                    {project.gallery && project.gallery.length > 0 && (
                        <motion.div variants={fadeUp} className="mt-12 sm:mt-16 md:mt-20">
                            <h2 className="text-lg sm:text-xl font-medium tracking-tight text-gray-800 dark:text-white mb-6 sm:mb-8">
                                {language === "id" ? "Galeri" : "Gallery"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                {project.gallery.map((img, i) => (
                                    <div
                                        key={img}
                                        className="relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10"
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} screenshot ${i + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Next Project ──────────────────────── */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-16 sm:mt-20 md:mt-28 pt-10 sm:pt-12 border-t border-black/10 dark:border-white/10"
                    >
                        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-gray-800/50 dark:text-white/50 mb-4">
                            {language === "id"
                                ? "PROYEK SELANJUTNYA"
                                : "NEXT PROJECT"}
                        </p>

                        <Link
                            href={`/work/${nextProject.id}`}
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
                        >
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-gray-800 dark:text-white group-hover:text-primary dark:group-hover:text-lime-500 transition-colors">
                                {nextProject.title}
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full border border-black/20 dark:border-white/20 text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-800/60 dark:text-white/60 font-medium">
                                    {nextProject.category}
                                </span>
                                <svg
                                    className="w-5 h-5 text-gray-800/40 dark:text-white/40 group-hover:text-primary dark:group-hover:text-lime-500 transition-all group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </>
    );
}
