"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SecTitle from "@/app/components/ui/SecTitle";
import { useLanguage } from "@/app/context/LanguageContext";

const EXPERIENCES_EN = [
    {
        id: "makassarwebsite",
        rolePrefix: "Frontend",
        roleSuffix: "Developer",
        company: "MakassarWebsite.com",
        period: "2024 - Present",
        description:
            "Responsible for front-end architecture, building responsive web applications with Next.js, and crafting tactile UI interactions.",
    },
    {
        id: "sankreatif",
        rolePrefix: "Graphic",
        roleSuffix: "Designer",
        company: "San Kreatif Studio",
        period: "2025 - Present",
        description:
            "Responsible for brand identity systems, typography guidelines, and digital marketing creative assets.",
    },
];

const EXPERIENCES_ID = [
    {
        id: "makassarwebsite",
        rolePrefix: "Frontend",
        roleSuffix: "Developer",
        company: "MakassarWebsite.com",
        period: "2024 - Sekarang",
        description:
            "Bertanggung jawab atas arsitektur front-end, membangun aplikasi web responsif dengan Next.js, dan merancang interaksi UI yang taktil.",
    },
    {
        id: "sankreatif",
        rolePrefix: "Graphic",
        roleSuffix: "Designer",
        company: "San Kreatif Studio",
        period: "2025 - Sekarang",
        description:
            "Bertanggung jawab atas sistem identitas brand, panduan tipografi, dan aset kreatif digital marketing.",
    },
];

export default function ExperienceSection() {
    const { language } = useLanguage();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const experiences = language === "id" ? EXPERIENCES_ID : EXPERIENCES_EN;

    return (
        <section className="w-full pt-4 pb-12 sm:pb-16 md:pb-24">
            {/* Section Header: 02 Experience */}
            <SecTitle number="02" title="Experience" subtitle="経歴" mb="mb-0" />

            {/* Experience Rows */}
            <div className="mt-6 sm:mt-8 flex flex-col">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                            duration: 0.75,
                            delay: idx * 0.12,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div
                            onMouseEnter={() => setHoveredId(exp.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setHoveredId(hoveredId === exp.id ? null : exp.id)}
                            className="py-3.5 sm:py-4 flex flex-col md:flex-row items-start justify-between gap-2.5 sm:gap-4 group cursor-pointer transition-colors"
                        >
                            {/* Badge */}
                            <div className="w-auto md:w-[260px] shrink-0">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-[4px] bg-primary dark:bg-lime-600 text-white text-xs sm:text-sm md:text-base">
                                    <span>{exp.rolePrefix}</span>
                                    <span className="font-serif italic font-normal text-white">
                                        {exp.roleSuffix}
                                    </span>
                                </span>
                            </div>

                            {/* Company & Simple Inline Description */}
                            <div className="flex-1 w-full">
                                <div className="flex items-baseline justify-between gap-2 md:block">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tighter text-black dark:text-white group-hover:text-primary dark:group-hover:text-lime-400 transition-colors">
                                        {exp.company}
                                    </h3>
                                    {/* Mobile inline period */}
                                    <span className="md:hidden text-xs sm:text-sm tracking-tight font-normal text-black/60 dark:text-white/60 font-sans shrink-0">
                                        {exp.period}
                                    </span>
                                </div>

                                <AnimatePresence>
                                    {hoveredId === exp.id && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                            className="text-xs sm:text-sm text-black/60 dark:text-white/60 font-light leading-relaxed max-w-xl overflow-hidden"
                                        >
                                            {exp.description}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Period on desktop */}
                            <div className="hidden md:block shrink-0 text-right">
                                <span className="text-sm sm:text-base tracking-tight font-normal text-black/80 dark:text-white/80 font-sans">
                                    {exp.period}
                                </span>
                            </div>
                        </div>

                        {/* Divider Line */}
                        {idx < experiences.length - 1 && (
                            <div className="w-full h-px bg-black/15 dark:bg-white/15 my-4" />
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
