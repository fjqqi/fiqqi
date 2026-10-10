"use client";

import { Project } from "./types";
import ProjectBrowserMockup from "./ProjectBrowserMockup";

interface ProjectCardProps {
    project: Project;
    index: number;
    className?: string;
}

export default function ProjectCard({ project, index, className }: ProjectCardProps) {
    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} project`}
            className={`group block shrink-0 p-6 sm:p-7 md:p-8 text-white transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-2xl cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/50 ${
                className ?? "w-[82vw] sm:w-[430px] md:w-[480px] lg:w-[530px]"
            }`}
            style={{ backgroundColor: project.bgColor }}
        >
            {/* Subtle Gradient Accent Overlay for depth */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 bg-gradient-to-b from-white/10 to-transparent"
                aria-hidden="true"
            />

            {/* Card Header: Title + Domain on Left, Category Pill on Right */}
            <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-2xl sm:text-3xl md:text-[34px] font-normal tracking-tight leading-tight text-white truncate">
                        {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light tracking-normal mt-1 truncate group-hover:text-white transition-colors">
                        {project.link}
                    </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/60 px-3.5 py-1 text-[11px] sm:text-xs uppercase tracking-wider text-white font-medium self-start backdrop-blur-xs select-none">
                    {project.category}
                </span>
            </div>

            {/* Browser Window Mockup Frame */}
            <div className="relative z-10 mt-6 sm:mt-7 md:mt-8">
                <ProjectBrowserMockup
                    image={project.image}
                    title={project.title}
                    priority={index < 2}
                />
            </div>
        </a>
    );
}
