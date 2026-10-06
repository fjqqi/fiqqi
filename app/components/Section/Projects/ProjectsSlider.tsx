"use client";

import { Project } from "./types";
import ProjectCard from "./ProjectCard";

interface ProjectsSliderProps {
    projects: Project[];
}

export default function ProjectsSlider({ projects }: ProjectsSliderProps) {
    return (
        <div className="relative w-max flex  py-2 select-none">
            {projects.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                />
            ))}

            {/* Right breathing room */}
            <div
                className="w-4 sm:w-8 shrink-0"
                aria-hidden="true"
            />
        </div>
    );
}