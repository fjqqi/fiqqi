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
      style={{
        padding: "80px 24px 120px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--green)",
            marginBottom: 12,
          }}
        >
          Selected Work
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          Projects I&apos;ve built
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 28,
        }}
      >
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <div
              style={{
                height: 200,
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <span
                style={{
                  fontSize: "3rem",
                  opacity: 0.2,
                  fontWeight: 900,
                  color: project.color,
                }}
              >
                ✦
              </span>
            </div>
            <div style={{ padding: 28 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                  {project.title}
                </h3>
                <ArrowUpRight />
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "var(--muted)",
                  marginBottom: 20,
                }}
              >
                {project.desc}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: 50,
                      border: "1.5px solid var(--border)",
                      color: "var(--muted)",
                    }}
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
