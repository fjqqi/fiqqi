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
      className="relative z-10 py-30 px-6 max-w-[1100px] mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-15 items-center">
        <div>
          <p className="text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            About Me
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.1] tracking-[-0.03em] mb-6">
            Crafting interfaces
            <br />
            that feel <span className="text-primary">alive</span>
          </h2>
          <p className="text-[1.05rem] leading-[1.8] text-muted mb-5 max-w-[480px]">
            I&apos;m a front-end developer with a passion for clean code and
            stunning user interfaces. I specialize in building modern web
            applications with Next.js, React, and TypeScript, bringing designs
            to life with pixel-perfect precision.
          </p>
          <p className="text-[1.05rem] leading-[1.8] text-muted max-w-[480px]">
            Beyond the browser, I explore mobile development with Flutter and
            backend systems with Laravel. Every project is an opportunity to
            push boundaries and create something truly uncommon.
          </p>
        </div>

        {/* Skills */}
        <div>
          <div className="flex flex-col gap-6">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2 text-[0.9rem] font-semibold">
                  <span>{skill.name}</span>
                  <span className="text-muted-light">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-skill-bg rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-[#34d399] rounded-sm transition-[width] duration-1000 ease-out"
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
