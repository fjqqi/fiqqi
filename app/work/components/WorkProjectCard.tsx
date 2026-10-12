"use client";

import { motion } from "framer-motion";
import { Project } from "@/app/components/Section/Projects/types";
import ProjectBrowserMockup from "@/app/components/Section/Projects/ProjectBrowserMockup";

interface WorkProjectCardProps {
    project: Project;
    index: number;
}

export default function WorkProjectCard({ project, index }: WorkProjectCardProps) {
    return (
        <motion.a
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} project`}
            className="group block w-full focus:outline-none"
        >
            {/* Top Colored Box with Browser Mockup */}
            <div
                className="w-full aspect-[4/3] p-6 sm:p-8 md:p-10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
                style={{ backgroundColor: project.bgColor }}
            >
                <div className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <ProjectBrowserMockup
                        image={project.image}
                        title={project.title}
                        priority={index < 4}
                    />
                </div>
            </div>

            {/* Bottom Project Info */}
            <div className="mt-4 sm:mt-5 flex flex-col">
                <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-normal tracking-tight text-black dark:text-white group-hover:text-primary dark:group-hover:text-lime-500 transition-colors">
                    {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 font-light mt-1">
                    {project.category} • {project.link}
                </p>

                {/* Tech Tags */}
                {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 sm:mt-3.5">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full border border-black/20 dark:border-white/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-black/75 dark:text-white/75"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.a>
    );
}
