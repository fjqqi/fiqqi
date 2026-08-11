export default function MarqueeSection() {
  return (
    <section
      style={{
        overflow: "hidden",
        borderTop: "2px solid var(--border)",
        borderBottom: "2px solid var(--border)",
        padding: "20px 0",
        background: "var(--marquee-bg)",
      }}
    >
      <div className="marquee-track">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              padding: "0 40px",
              color: "var(--foreground)",
              opacity: 0.9,
            }}
          >
            just call me if you need a frontend developer ✦ just call me if
            you need a frontend developer ✦&nbsp;
          </span>
        ))}
      </div>
    </section>
  );
}
