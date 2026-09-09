"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ShareIcon } from "../Icons";
import { projects } from "@/app/data";

export default function ProjectsSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleShare = async (e: React.MouseEvent, project: typeof projects[0], index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const url = project.demoUrl || project.href;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <section id="projects" className="py-0 sm:py-20 px-6 max-w-[920px] mx-auto w-full">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-6xl font-[800] tracking-[-0.03em] leading-tight">
          Selected <span className="text-primary">Work</span>
        </h2>
        <p className="text-white/80 text-sm sm:text-lg max-w-[440px] mt-2 leading-relaxed">
          A showcase of modern web applications, platforms, and digital systems built with precision.
        </p>
      </div>

      {/* ── Projects Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {projects.map((project, index) => {
          const targetUrl = project.demoUrl || project.href;
          const isCopied = copiedIndex === index;

          return (
            <div
              key={project.title}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* ── Preview Image Card ── */}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#0c0e0c] shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:shadow-[0_14px_36px_rgba(0,0,0,0.14)] dark:group-hover:shadow-[0_14px_36px_rgba(0,0,0,0.6)] cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    priority={index === 0}
                  />

                  {/* Gradient vignette on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </a>

                {/* ── Title & Action Buttons ── */}
                <div className="mt-3.5 sm:mt-4 flex items-center justify-between gap-3">
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-foreground group-hover:text-primary transition-colors flex-1 min-w-0"
                  >
                    <h3 className="text-base sm:text-lg font-bold tracking-tight truncate leading-snug">
                      {project.title}
                    </h3>
                  </a>

                  {/* Circular Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Share Button */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => handleShare(e, project, index)}
                        className="w-9 h-9 rounded-full bg-card dark:bg-[#181a18] text-foreground dark:text-white border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/15 cursor-pointer shadow-xs"
                        aria-label={`Share ${project.title}`}
                        title="Share / Copy Link"
                      >
                        <ShareIcon size={15} />
                      </button>

                      {/* Tooltip feedback */}
                      {isCopied && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[0.65rem] font-semibold px-2 py-0.5 rounded shadow-md animate-fade-in pointer-events-none whitespace-nowrap">
                          Copied!
                        </div>
                      )}
                    </div>

                    {/* External Link Button */}
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-card dark:bg-[#181a18] text-foreground dark:text-white border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-white hover:border-primary cursor-pointer shadow-xs"
                      aria-label={`Open ${project.title}`}
                      title="View Project"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>

                {/* ── Pills / Tech Tags (Matching screenshot) ── */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[0.72rem] sm:text-xs font-medium bg-black/[0.05] dark:bg-[#181a18] text-foreground dark:text-white/90 border border-black/[0.08] dark:border-white/10 hover:border-primary/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom GitHub Banner ── */}
      <div className="mt-10 sm:mt-14 text-center">
        <a
          href="https://github.com/fiqqi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-card-border shadow-xs text-foreground font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-md no-underline group"
        >
          <span>Explore More Projects on GitHub</span>
          <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    </section>
  );
}
