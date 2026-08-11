const skills = [
  { name: "Next.js / React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "CSS / Tailwind", level: 90 },
  { name: "Laravel / PHP", level: 78 },
  { name: "Flutter / Dart", level: 72 },
  { name: "UI / UX Design", level: 80 },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 24px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div className="about-grid">
        <div>
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
            About Me
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Crafting interfaces
            <br />
            that feel <span style={{ color: "var(--green)" }}>alive</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--muted)",
              marginBottom: 20,
              maxWidth: 480,
            }}
          >
            I&apos;m a front-end developer with a passion for clean code and
            stunning user interfaces. I specialize in building modern web
            applications with Next.js, React, and TypeScript, bringing designs
            to life with pixel-perfect precision.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--muted)",
              maxWidth: 480,
            }}
          >
            Beyond the browser, I explore mobile development with Flutter and
            backend systems with Laravel. Every project is an opportunity to
            push boundaries and create something truly uncommon.
          </p>
        </div>

        {/* Skills */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {skills.map((skill) => (
              <div key={skill.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  <span>{skill.name}</span>
                  <span style={{ color: "var(--muted-light)" }}>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
