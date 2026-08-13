import { ArrowUpRight } from "./Icons";

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack online store with Next.js, Stripe integration, and real-time inventory management.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    color: "#1db954",
  },
  {
    title: "Dashboard Analytics",
    desc: "Interactive analytics dashboard with live data visualization and customizable widgets.",
    tags: ["React", "D3.js", "Laravel"],
    color: "#f87171",
  },
  {
    title: "Mobile Banking App",
    desc: "Cross-platform banking application with biometric authentication and transaction tracking.",
    tags: ["Flutter", "Dart", "Firebase"],
    color: "#6366f1",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-20 px-6 max-w-[1100px] mx-auto"
    >
      <div className="text-center mb-15">
        <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
          Selected Work
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] tracking-[-0.03em]">
          Projects I&apos;ve built
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-7">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-card backdrop-blur-[10px] border border-card-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-primary dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            <div
              className="h-[200px] flex items-center justify-center border-b border-black/[0.04]"
              style={{
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
              }}
            >
              <span
                className="text-5xl opacity-20 font-black"
                style={{ color: project.color }}
              >
                ✦
              </span>
            </div>
            <div className="p-7">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[1.15rem] font-bold">{project.title}</h3>
                <ArrowUpRight />
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
    </section>
  );
}
