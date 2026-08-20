import { ArrowUpRight } from "./Icons";
import { projects } from "../data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 max-w-[1100px] mx-auto">
      <div className="text-center mb-16">
        <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
          Selected Work
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] tracking-[-0.03em]">
          Projects I&apos;ve built
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group bg-card backdrop-blur-[10px] border border-card-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-3 hover:shadow-[0_24px_64px_rgba(29,185,84,0.12),0_8px_24px_rgba(0,0,0,0.08)] hover:border-primary/40 dark:hover:shadow-[0_24px_64px_rgba(29,185,84,0.15),0_8px_24px_rgba(0,0,0,0.5)] shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
          >
            {/* Card preview */}
            <div
              className="h-[200px] relative flex items-center justify-center border-b border-black/[0.04] overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
              }}
            >
              {/* Large project number */}
              <span
                className="absolute right-5 bottom-3 text-[5rem] font-[900] leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                style={{ color: `${project.color}18` }}
              >
                {project.num}
              </span>
              {/* Accent dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: `radial-gradient(${project.color} 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Center icon */}
              <span
                className="relative text-5xl opacity-30 font-black transition-all duration-500 group-hover:opacity-50 group-hover:scale-110"
                style={{ color: project.color }}
              >
                ✦
              </span>
            </div>

            <div className="p-7">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[1.15rem] font-bold">{project.title}</h3>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight />
                </span>
              </div>
              <p className="text-[0.9rem] leading-[1.7] text-muted mb-5">
                {project.desc}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full border-[1.5px] border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      <div className="text-center mt-12">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-[1.5px] border-pill-border text-foreground px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_4px_20px_rgba(29,185,84,0.12)] hover:scale-105 no-underline"
        >
          View all on GitHub
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
